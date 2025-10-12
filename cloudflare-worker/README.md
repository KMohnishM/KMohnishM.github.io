# Cloudflare Worker: Gemini Proxy (Free Tier)

A tiny, free-to-run proxy that keeps your Gemini API key server-side and exposes a single POST endpoint for your React app. Perfect for GitHub Pages where you can’t keep secrets in the client.

## What you get
- Secure: GEMINI_API_KEY stored as a Worker secret
- Simple: POST `/` with `{ message, history }`
- Compatible: Works with your React app via `REACT_APP_GEMINI_PROXY_URL`

## Quick Start (≈5 minutes)

1. Install Wrangler (one-time)
   - Windows PowerShell:
     ```powershell
     npm i -g wrangler
     ```

2. Login
   ```powershell
   wrangler login
   ```

3. Set your Gemini key as a secret (never committed):
   ```powershell
   cd cloudflare-worker
   wrangler secret put GEMINI_API_KEY
   # Paste your key when prompted
   ```

4. Deploy (free by default)
   ```powershell
   npm run deploy
   ```
   Wrangler prints the Worker URL, e.g. `https://mohnish-gemini-proxy.your-subdomain.workers.dev/`

5. Wire the React app
   - In your React project, set (public) env var used at build-time:
     - For local build: create `.env.production` in project root:
       ```
       REACT_APP_GEMINI_PROXY_URL=https://mohnish-gemini-proxy.your-subdomain.workers.dev/
       ```
     - Build your site and deploy to GitHub Pages. Do NOT set `REACT_APP_GEMINI_API_KEY` in the client.

That’s it. Your site calls the Worker; the Worker calls Gemini with the server-side key.

## Request format
- POST `/` with JSON body:
```json
{
  "message": "user text",
  "history": [{"role": "user", "text": "Hi"}, {"role": "assistant", "text": "Hello!"}]
}
```

## Response format
```json
{ "reply": "...assistant text..." }
```

## Dev locally (optional)
```powershell
cd cloudflare-worker
npm run dev
```
Wrangler serves at localhost and “mocks” the Worker.

## Notes
- CORS is enabled for all origins by default; restrict if you prefer.
- Update the prompt inside `src/index.ts` if you want a different tone.
