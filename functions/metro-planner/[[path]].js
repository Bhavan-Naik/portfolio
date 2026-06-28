export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);

  const ROUTES = {
    blr: "https://metro-planner-do4a.onrender.com/"
  };

  const city = params.path;
  const targetBase = ROUTES[city];

  if (!targetBase) {
    return new Response("City not available yet", { status: 404 });
  }

  const pathAfterCity =
    url.pathname.replace(`/metro-planner/${city}`, "");

  const targetURL =
    targetBase + (pathAfterCity || "/") + url.search;

  try {
    const response = await fetch(targetURL, {
      method: request.method,
      headers: request.headers,
      body: request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
    });

    return response;

  } catch (err) {
    return new Response("Proxy error: " + err.message, {
      status: 502
    });
  }
}