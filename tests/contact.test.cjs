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
const contact = load('src/lib/contact.ts');
const secret = 'test-only-secret-at-least-32-characters';
const valid = { name: 'Mario Rossi', email: 'mario@example.com', subject: 'Informazioni', message: 'Vorrei informazioni.', website: '' };

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
  for (const invalid of [null, {}, { ...valid, website: 'spam' }, { ...valid, email: 'a@b\nBcc:x@y.com' }, { ...valid, name: '\r\nInjected' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, subject: ' ' }]) {
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
    localStorage: { getItem: () => choice },
    window: { gtag: (...args) => calls.push(args) },
  });
  testModule.exports.trackContactSubmission();
  assert.equal(calls.length, 0);
  choice = 'accepted';
  testModule.exports.trackContactSubmission();
  assert.equal(calls.length, 1);
  assert.equal(JSON.stringify(calls[0]), JSON.stringify(['event', 'generate_lead', { form_id: 'contact', transport_type: 'beacon' }]));
});
