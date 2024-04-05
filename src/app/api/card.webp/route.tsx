import { draw } from "@/lib/draw";
import { Transformer } from "@napi-rs/image";

export async function GET(request: Request) {
  const svg = await draw(request);

  const webp = await Transformer.fromSvg(svg).crop(0, 0, 480, 180).webp();

  return new Response(webp, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, immutable, no-transform, max-age=60",
    },
  });
}
