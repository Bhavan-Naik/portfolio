export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);

  // /blr, /mum, etc.
  const city = params.path;

  const ROUTES = {
    blr: "https://metro-planner-do4a.onrender.com/",
  };

  const targetBase = ROUTES[city];

  // if city not configured yet
  if (!targetBase) {
    return new Response("City not available yet", { status: 404 });
  }

  // remove /metro-planner/blr → "/"
  const newPath = url.pathname.replace(`/metro-planner/${city}`, "");

  const targetURL = targetBase + (newPath || "/") + url.search;

  const modifiedRequest = new Request(targetURL, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  return fetch(modifiedRequest);
}