import { draw } from "@/lib/draw";

export const runtime = "edge";

export async function GET(request: Request) {
  return new Response(await draw(request), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, immutable, no-transform, max-age=60",
    },
  });
}
