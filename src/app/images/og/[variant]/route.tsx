import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ variant: "generale" }, { variant: "ristoranti" }];
}

// Social cards are composed in code from existing brand assets, with no external requests.
export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (variant !== "generale" && variant !== "ristoranti") return new Response(null, { status: 404 });
  const restaurant = variant === "ristoranti";
  const [logo, photo] = await Promise.all([
    readFile(join(process.cwd(), "public/images/logo-mifro.png")),
    readFile(join(process.cwd(), restaurant ? "public/images/ristorazione.png" : "public/images/hero.jpg")),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f0f7fc", color: "#12334d", fontFamily: "sans-serif" }}>
      <div style={{ width: 660, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders embedded images, not a browser DOM. */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="Mifro" width={240} height={88} style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 5, width: 65, background: "#f2a000", marginBottom: 24 }} />
          <div style={{ fontSize: 49, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 }}>
            {restaurant ? "Casse e gestionali per il tuo ristorante" : "Casse, POS e assistenza in Trentino"}
          </div>
          <div style={{ fontSize: 24, color: "#4e6275", marginTop: 22, lineHeight: 1.4 }}>Scelta, installazione e supporto con i tecnici Mifro.</div>
        </div>
        <div style={{ fontSize: 21, color: "#00558f" }}>Dal 1990 in Trentino · mifro.it</div>
      </div>
      <div style={{ width: 540, display: "flex", background: "white", borderLeft: "1px solid #d8e2eb" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Embedded image for the social card. */}
        <img src={`data:image/${restaurant ? "png" : "jpeg"};base64,${photo.toString("base64")}`} alt="" width={540} height={630} style={{ objectFit: restaurant ? "contain" : "cover" }} />
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
