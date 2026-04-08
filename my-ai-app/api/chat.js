export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { message } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] }),
  });

  const data = await response.json();
  const outText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error!";
  return new Response(JSON.stringify({ text: outText }), { headers: { 'Content-Type': 'application/json' } });
}
