/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness for Node and transpiled server modules. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest } = require('next/server');

function load(path, overrides = {}) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const testModule = { exports: {} };
  vm.runInNewContext(output, {
    module: testModule, exports: testModule.exports, require: (name) => overrides[name] || require(name),
    Buffer, process, console: { error() {} },
  }, { filename: path });
  return testModule.exports;
}
const contexts = load('src/lib/contact-context.ts');
const contact = load('src/lib/contact.ts', { '@/lib/contact-context': contexts });
const secret = 'test-only-secret-at-least-32-characters';
const valid = { name: 'Mario Rossi', email: 'mario@example.com', subject: 'Informazioni', message: 'Vorrei informazioni.', website: '' };

test('Beauty and sales accept an omitted phone, validate supplied numbers and distinguish requests', () => {
  const beauty = { sector: 'parrucchieri-saloni', form_location: 'sector_page' };
  for (const context of [beauty, contexts.salesContactContext]) {
    for (const phone of [undefined, '', '   ']) {
      assert.ok(contact.validateContact({ ...valid, context, phone }));
    }
    for (const phone of [null, {}, 123456789, '123', 'not-a-number', '+39 333 123 4567\n']) {
      assert.equal(contact.validateContact({ ...valid, context, phone }), null);
    }
    assert.equal(contact.validateContact({ ...valid, context, phone: '+39 333 123 4567' }).phone, '+39 333 123 4567');
  }
  for (const subject of [undefined, '', 'Noleggio registratore di cassa']) {
    assert.equal(contact.validateContact({ ...valid, context: contexts.salesContactContext, subject }).subject, contexts.SALES_CONTACT_SUBJECT);
  }
  assert.equal(contexts.contactContextForPath(contexts.SALES_PATH).form_location, 'sales_page');
  assert.equal(contexts.contactContextForPath(`${contexts.SALES_PATH}/`).form_location, 'sales_page');
  assert.equal(contexts.parseContactContext({ sector: 'parrucchieri-saloni', form_location: 'sales_page' }), null);
});

test('rental validates the municipality and fixes the request subject without changing generic forms', () => {
  const payload = { ...valid, name: 'Mario Rossi, Bar Centrale', phone: '+39 333 123 4567', municipality: ' Pergine Valsugana ', context: contexts.rentalContactContext };
  const form = contact.validateContact(payload);
  assert.equal(form.municipality, 'Pergine Valsugana');
  assert.equal(form.subject, 'Noleggio registratore di cassa');
  assert.equal(form.phone, '+39 333 123 4567');
  for (const phone of [undefined, '', '   ', '123', 'not-a-number', '+39 333 123 4567\n']) {
    assert.equal(contact.validateContact({ ...payload, phone }), null);
  }
  for (const municipality of [undefined, '', '   ', 123, {}, 'a'.repeat(121), 'Pergine\nTrento', 'Pergine\x00']) {
    assert.equal(contact.validateContact({ ...payload, municipality }), null);
  }
  assert.equal(contact.validateContact({ ...valid, municipality: 123 }).municipality, '');
  assert.equal(contexts.contactContextForPath(contexts.RENTAL_PATH).form_location, 'rental_page');
  assert.equal(contexts.contactContextForPath(`${contexts.RENTAL_PATH}/`).form_location, 'rental_page');
  assert.equal(contexts.parseContactContext({ sector: 'ristoranti', form_location: 'rental_page' }), null);
});

test('receipts reject tampering, wrong keys and expiration', () => {
  const token = contact.createReceipt(secret, 1000);
  assert.ok(contact.readReceipt(token, secret, 2000));
  assert.equal(contact.readReceipt(token, 'wrong', 2000), null);
  assert.equal(contact.readReceipt(token + 'x', secret, 2000), null);
  assert.equal(contact.readReceipt(token, secret, 601000), null);
  assert.equal(contact.readReceipt(undefined, secret), null);
});

test('validation rejects spam, header injection and oversized fields', () => {
  assert.ok(contact.validateContact(valid));
  for (const invalid of [null, {}, { ...valid, website: 'spam' }, { ...valid, email: 'a@b\nBcc:x@y.com' }, { ...valid, name: '\r\nInjected' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, subject: '\n' }, { ...valid, subject: 'x'.repeat(201) }]) {
    assert.equal(contact.validateContact(invalid), null);
  }
});

test('attempt limit expires after ten minutes', () => {
  for (let i = 0; i < 5; i++) assert.equal(contact.allowAttempt('unit-limit', 1000), true);
  assert.equal(contact.allowAttempt('unit-limit', 1001), false);
  assert.equal(contact.allowAttempt('unit-limit', 601000), true);
});

let sequence = 0;
function request(body = valid, options = {}) {
  return new NextRequest('https://mifro.example/api/contact', {
    method: 'POST',
    headers: { origin: 'https://mifro.example', 'content-type': 'application/json', 'x-vercel-forwarded-for': `test-${++sequence}`, ...options.headers },
    body: options.raw ?? JSON.stringify(body),
  });
}

test('rental email carries activity, municipality and usage period through the existing SMTP flow', async () => {
  process.env.SMTP_USER = 'sender@gmail.com';
  process.env.SMTP_PASSWORD = 'test-password';
  process.env.CONTACT_FORM_SECRET = secret;
  process.env.CONTACT_TO = 'recipient@example.com';
  let mail;
  const route = load('src/app/api/contact/route.ts', {
    '@/lib/contact': contact,
    nodemailer: { createTransport: () => ({ sendMail: async (message) => { mail = message; return { accepted: ['recipient@example.com'] }; }, close() {} }) },
  });
  const response = await route.POST(request({ ...valid, name: 'Mario Rossi, Bar Centrale', phone: '+39 333 123 4567', municipality: 'Pergine Valsugana', message: 'Cassa da dicembre per sei mesi.', context: contexts.rentalContactContext }));
  assert.equal(response.status, 200);
  assert.equal(mail.subject, 'Nuova richiesta dal sito Mifro: Noleggio registratore di cassa');
  assert.match(mail.text, /Nome e attività: Mario Rossi, Bar Centrale/);
  assert.match(mail.text, /Comune: Pergine Valsugana/);
  assert.match(mail.text, /Telefono: \+39 333 123 4567/);
  assert.match(mail.text, /Cassa da dicembre per sei mesi/);
  assert.match(mail.text, /Posizione modulo: rental_page/);
  assert.doesNotMatch(mail.text, /2 giorni/);
  assert.equal(mail.replyTo.address, valid.email);
  assert.ok(response.cookies.get(contact.RECEIPT_COOKIE));
});

test('sales and Beauty email carry distinct interests without requiring a phone or sending real mail', async () => {
  process.env.SMTP_USER = 'sender@gmail.com';
  process.env.SMTP_PASSWORD = 'test-password';
  process.env.CONTACT_FORM_SECRET = secret;
  process.env.CONTACT_TO = 'recipient@example.com';
  let mail;
  const route = load('src/app/api/contact/route.ts', {
    '@/lib/contact': contact,
    nodemailer: { createTransport: () => ({ sendMail: async (message) => { mail = message; return { accepted: ['recipient@example.com'] }; }, close() {} }) },
  });
  for (const [context, subject] of [
    [contexts.salesContactContext, contexts.SALES_CONTACT_SUBJECT],
    [{ sector: 'parrucchieri-saloni', form_location: 'sector_page' }, 'Pagina web e agenda online per il mio salone'],
  ]) {
    const response = await route.POST(request({ ...valid, subject, context, phone: '' }));
    assert.equal(response.status, 200);
    assert.equal(mail.subject, `Nuova richiesta dal sito Mifro: ${subject}`);
    assert.ok(mail.text.includes(`Settore: ${context.sector}`));
    assert.ok(mail.text.includes(`Posizione modulo: ${context.form_location}`));
    assert.doesNotMatch(mail.text, /Telefono:|Claudio richiama/);
    assert.equal(mail.replyTo.address, valid.email);
    assert.ok(response.cookies.get(contact.RECEIPT_COOKIE));
  }
});

test('route only authorizes thank-you after SMTP acceptance', async () => {
  process.env.SMTP_USER = 'sender@gmail.com';
  process.env.SMTP_PASSWORD = 'test-password';
  process.env.CONTACT_FORM_SECRET = secret;
  process.env.CONTACT_TO = 'recipient@example.com';
  let fail = false;
  let sent = 0;
  let mail;
  const route = load('src/app/api/contact/route.ts', {
    '@/lib/contact': contact,
    nodemailer: { createTransport: () => ({
      sendMail: async (message) => { sent++; mail = message; if (fail) throw new Error('mock SMTP failure'); return { accepted: ['recipient@example.com'] }; },
      close() {},
    }) },
  });
  let response = await route.POST(request());
  assert.equal(response.status, 200);
  assert.equal(sent, 1);
  assert.equal(mail.to, 'recipient@example.com');
  assert.equal(mail.replyTo.address, valid.email);
  assert.ok(!mail.html);
  const cookie = response.cookies.get(contact.RECEIPT_COOKIE).value;
  assert.ok(contact.readReceipt(cookie, secret));
  assert.match(response.headers.get('set-cookie'), /HttpOnly/i);

  response = await route.POST(request(valid, { headers: { cookie: `${contact.RECEIPT_COOKIE}=${cookie}` } }));
  assert.equal(response.status, 429);
  assert.equal(sent, 1);

  fail = true;
  response = await route.POST(request());
  assert.equal(response.status, 502);
  assert.equal(response.headers.get('set-cookie'), null);

  for (const [req, status] of [
    [request(valid, { headers: { origin: 'https://other.example' } }), 403],
    [request(valid, { headers: { 'content-type': 'text/plain' } }), 415],
    [request({ ...valid, website: 'bot' }), 400],
    [request(valid, { raw: '{' }), 400],
    [request(valid, { raw: 'x'.repeat(32769) }), 413],
  ]) assert.equal((await route.POST(req)).status, status);
  assert.equal(sent, 2);
  delete process.env.SMTP_PASSWORD;
  assert.equal((await route.POST(request())).status, 503);
});

test('analytics sends only a lead event with consent and never contact data', () => {
  const output = ts.transpileModule(fs.readFileSync('src/lib/analytics.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const testModule = { exports: {} };
  const calls = [];
  let choice = 'rejected';
  vm.runInNewContext(output, {
    exports: testModule.exports, module: testModule,
    require: (name) => name === '@/lib/contact-context' ? contexts : require(name),
    localStorage: { getItem: () => choice },
    window: { gtag: (...args) => calls.push(args) },
  });
  testModule.exports.trackContactSubmission();
  assert.equal(calls.length, 0);
  choice = 'accepted';
  testModule.exports.trackContactSubmission();
  assert.equal(calls.length, 1);
  assert.equal(JSON.stringify(calls[0]), JSON.stringify(['event', 'generate_lead', { form_id: 'contact', sector: 'generico', form_location: 'contact_page', transport_type: 'beacon' }]));
});


test('context accepts only known sector/location pairs and supports legacy payloads', () => {
  assert.equal(contact.validateContact(valid).context.sector, 'generico');
  for (const sector of contexts.contactSectors.filter((s) => s !== 'generico')) {
    const form = contact.validateContact({ ...valid, phone: '+39 333 123 4567', context: { sector, form_location: 'sector_page', email: 'must-not-propagate@example.com' } });
    assert.equal(form.context.sector, sector);
    assert.equal(JSON.stringify(Object.keys(form.context)), JSON.stringify(['sector', 'form_location']));
  }
  for (const context of [null, [], {}, { sector: 'unknown', form_location: 'sector_page' }, { sector: 'ristoranti', form_location: '/?email=personal' }, { sector: 'ristoranti', form_location: 'contact_page' }, { sector: 'generico', form_location: 'sector_page' }]) {
    assert.equal(contact.validateContact({ ...valid, context }), null);
  }
});

test('only generic contact allows a missing or blank subject', () => {
  for (const subject of [undefined, '', '   ']) {
    assert.equal(contact.validateContact({ ...valid, subject }).subject, contexts.DEFAULT_CONTACT_SUBJECT);
    assert.equal(contact.validateContact({ ...valid, phone: '+39 333 123 4567', subject, context: { sector: 'ristoranti', form_location: 'sector_page' } }), null);
  }
  for (const subject of [null, 12, {}, '\r\nBcc: spam@example.com']) assert.equal(contact.validateContact({ ...valid, subject }), null);
});

test('existing callback sector forms require a usable phone number; generic and legacy requests remain valid', () => {
  for (const sector of contexts.contactSectors.filter((value) => value !== 'generico' && value !== 'parrucchieri-saloni')) {
    const payload = { ...valid, context: { sector, form_location: 'sector_page' } };
    for (const phone of [undefined, '', '   ', null, 3331234567, {}, '123', 'x'.repeat(41), '+'.repeat(8), '1234567890123456', '+39 333 123 4567\r\nBcc: injected@example.com', '\n3331234567', 'chiama Mario']) {
      assert.equal(contact.validateContact({ ...payload, phone }), null);
    }
    for (const phone of ['+39 333 123 4567', '0461 512777', '+44 (0)20 1234-5678', '0039 3331234567']) {
      assert.equal(contact.validateContact({ ...payload, phone: ` ${phone} ` }).phone, phone);
    }
  }
  assert.ok(contact.validateContact(valid));
  assert.ok(contact.validateContact({ ...valid, phone: '', context: contexts.defaultContactContext }));
});

test('missing recipient fails closed; accepted mail carries validated context and generic subject', async () => {
  process.env.SMTP_USER = 'sender@gmail.com';
  process.env.SMTP_PASSWORD = 'test-password';
  process.env.CONTACT_FORM_SECRET = secret;
  let mail;
  let accepted = true;
  const route = load('src/app/api/contact/route.ts', {
    '@/lib/contact': contact,
    nodemailer: { createTransport: () => ({ sendMail: async (message) => { mail = message; return { accepted: accepted ? ['recipient@example.com'] : [] }; }, close() {} }) },
  });
  for (const recipient of [undefined, '', '  ', 'invalid', 'a@example.com,b@example.com']) {
    if (recipient === undefined) delete process.env.CONTACT_TO;
    else process.env.CONTACT_TO = recipient;
    const response = await route.POST(request());
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('set-cookie'), null);
    assert.equal(mail, undefined);
  }
  process.env.CONTACT_TO = 'recipient@example.com';
  const sectorContext = { sector: 'ristoranti', form_location: 'sector_page' };
  let response = await route.POST(request({ ...valid, context: sectorContext }));
  assert.equal(response.status, 400);
  assert.equal(mail, undefined);
  response = await route.POST(request({ ...valid, phone: '+39 333 123 4567', context: sectorContext, to: 'attacker@example.com' }));
  assert.equal(response.status, 200);
  assert.equal(mail.to, 'recipient@example.com');
  assert.match(mail.text, /Settore: ristoranti/);
  assert.match(mail.text, /Posizione modulo: sector_page/);
  assert.match(mail.text, /Telefono: \+39 333 123 4567/);
  assert.match(mail.text, /Claudio richiama il visitatore entro un massimo di 2 giorni lavorativi/);
  response = await route.POST(request({ ...valid, subject: undefined }));
  assert.equal(response.status, 200);
  assert.match(mail.subject, /Richiesta di informazioni dal sito/);
  accepted = false;
  response = await route.POST(request());
  assert.equal(response.status, 502);
  assert.equal(response.headers.get('set-cookie'), null);
});


test('lead and contact clicks remain distinct, allowlisted and consent-gated', () => {
  const output = ts.transpileModule(fs.readFileSync('src/lib/analytics.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const testModule = { exports: {} };
  const calls = [];
  let choice = null;
  let storageThrows = false;
  vm.runInNewContext(output, {
    exports: testModule.exports, module: testModule,
    require: (name) => name === '@/lib/contact-context' ? contexts : require(name),
    localStorage: { getItem: () => { if (storageThrows) throw new Error('blocked'); return choice; } },
    window: { gtag: (...args) => calls.push(args) },
  });
  const analytics = testModule.exports;
  const context = { sector: 'ristoranti', form_location: 'sector_page', email: 'private@example.com', phone: '+39 333 123 4567', message: 'private' };
  for (choice of [null, 'rejected']) {
    analytics.trackContactSubmission(context);
    analytics.trackContactClick('phone', '/soluzioni/ristoranti');
    assert.equal(calls.length, 0);
  }
  choice = 'accepted';
  analytics.trackContactSubmission(context);
  analytics.trackContactClick('phone', '/soluzioni/ristoranti');
  analytics.trackContactClick('whatsapp', '/');
  analytics.trackContactClick('phone', '/contatti');
  analytics.trackContactClick('phone', '/prodotti-assistenza');
  analytics.trackContactClick('phone', '/unknown/private@example.com');
  assert.equal(calls.length, 6);
  assert.equal(calls.filter((entry) => entry[1] === 'generate_lead').length, 1);
  assert.equal(calls[0][2].sector, 'ristoranti');
  assert.equal(calls[1][2].channel, 'phone');
  assert.equal(calls[1][2].page_type, 'sector_page');
  assert.equal(calls[2][2].channel, 'whatsapp');
  assert.equal(calls[2][2].page_type, 'home');
  assert.equal(calls[3][2].page_type, 'contact_page');
  assert.equal(calls[4][2].page_type, 'support_page');
  assert.equal(calls[5][2].page_type, 'other');
  assert.ok(!JSON.stringify(calls).includes('private'));
  assert.ok(!JSON.stringify(calls).includes('333 123 4567'));
  analytics.trackContactSubmission({ sector: 'not-allowed', form_location: 'sector_page' });
  analytics.trackContactClick('private@example.com', '/');
  storageThrows = true;
  assert.doesNotThrow(() => analytics.trackContactSubmission(context));
  assert.doesNotThrow(() => analytics.trackContactClick('phone', '/'));
  assert.equal(calls.length, 6);
});
