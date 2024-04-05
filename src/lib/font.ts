const cache = new Map<string, Promise<ArrayBuffer>>();

export async function getFont(req: Request, file: string) {
  const url = new URL(req.url);

  url.pathname = file;

  const key = url.toString();

  const cached = cache.get(key);

  if (cached) return cached;

  const res = await fetch(url, {
    cache: "force-cache",
  });

  const promise = res.arrayBuffer();

  cache.set(key, promise);

  return promise;
}
