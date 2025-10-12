export interface Env {
  GEMINI_API_KEY: string;
}

// Minimal Cloudflare Worker proxy for Gemini
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const reqId = (globalThis as any).crypto?.randomUUID ? (globalThis as any).crypto.randomUUID() : Math.random().toString(36).slice(2);
    const start = Date.now();

    if (request.method === 'OPTIONS') {
      console.log(JSON.stringify({ level: 'info', reqId, event: 'preflight', origin: request.headers.get('origin') || '' }));
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    if (request.method !== 'POST') {
      console.warn(JSON.stringify({ level: 'warn', reqId, event: 'method_not_allowed', method: request.method }));
      return json({ error: 'Use POST /' }, 405, request);
    }

    try {
      const { message, history } = await request.json().catch(() => ({ message: '', history: [] }));
      if (!message || typeof message !== 'string') {
        console.warn(JSON.stringify({ level: 'warn', reqId, event: 'bad_request', reason: 'missing_message' }));
        return json({ error: 'Missing message' }, 400, request);
      }

      const systemPrompt = `You are the friendly portfolio assistant for Mohnish Kodukulla. Be natural, helpful, and concise (1–3 short sentences). Use prior messages as context to avoid repeating info.`;

      const context = Array.isArray(history) && history.length
        ? '\n\nConversation so far:\n' + history.slice(-6).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')
        : '';

      const prompt = `${systemPrompt}${context}\n\nUser: ${message}\nAssistant:`;

      // Call Gemini REST directly
      console.log(JSON.stringify({
        level: 'info', reqId, event: 'gemini_request',
        messageLen: message.length,
        historyLen: Array.isArray(history) ? history.length : 0,
        origin: request.headers.get('origin') || ''
      }));
      const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(env.GEMINI_API_KEY);
      const body = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      };

      const gRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!gRes.ok) {
        const err = await safeText(gRes);
        console.error(JSON.stringify({ level: 'error', reqId, event: 'gemini_error', status: gRes.status, durationMs: Date.now() - start, detailsLen: err?.length || 0 }));
        return json({ error: 'Gemini error', details: err }, 502, request);
      }

      const data = await gRes.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

      console.log(JSON.stringify({ level: 'info', reqId, event: 'gemini_success', durationMs: Date.now() - start, replyLen: reply?.length || 0 }));
      return json({ reply }, 200, request);
    } catch (e: any) {
      console.error(JSON.stringify({ level: 'error', reqId, event: 'unhandled', durationMs: Date.now() - start, message: e?.message || String(e) }));
      return json({ error: 'Unhandled', details: e?.message || String(e) }, 500, request);
    }
  },
};

export default worker;

function json(obj: any, status = 200, request?: Request): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}

function corsHeaders(request?: Request): Record<string, string> {
  const origin = request?.headers.get('origin') || '*';
  const reqHeaders = request?.headers.get('access-control-request-headers') || 'Content-Type';
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': reqHeaders,
    'Access-Control-Max-Age': '86400',
  };
}

async function safeText(res: Response): Promise<string> {
  try { return await res.text(); } catch { return ''; }
}
