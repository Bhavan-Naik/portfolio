export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const targetBase = "https://metro-planner.onrender.com";

  // ALWAYS forward to root app
  const targetURL = targetBase + url.pathname.replace("/metro-planner/blr", "");

  return fetch(targetURL, {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" ? undefined : request.body,
  });
}