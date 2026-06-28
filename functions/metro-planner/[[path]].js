export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const targetBase = "https://metro-planner-do4a.onrender.com/";

  const targetURL =
    targetBase + url.pathname.replace("/metro-planner/blr", "");

  const init = {
    method: request.method,
  };

  // ONLY attach body for non-GET/HEAD safely
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  return fetch(targetURL, init);
}