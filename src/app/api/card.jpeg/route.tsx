import { draw } from "@/lib/draw";
import { Transformer } from "@napi-rs/image";

export async function GET(request: Request) {
  const svg = await draw(request);

  const jpeg = await Transformer.fromSvg(svg).crop(0, 0, 480, 180).jpeg();

  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, immutable, no-transform, max-age=60",
    },
  });
}
