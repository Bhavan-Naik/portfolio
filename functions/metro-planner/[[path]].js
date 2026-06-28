export async function onRequest() {
  const res = await fetch("https://metro-planner-do4a.onrender.com/");
  return new Response(await res.text());
}