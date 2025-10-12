# Using Gemini via a Free Cloudflare Worker Proxy

This app can call Gemini without exposing an API key by using a tiny Cloudflare Worker (free tier) in `cloudflare-worker/`.

## Steps
1) Deploy the Worker (see `cloudflare-worker/README.md`). It produces a URL like:
   https://mohnish-gemini-proxy.your-subdomain.workers.dev/

2) Point the React app at the proxy:
   - Create `.env.production` in the project root with:
     
     REACT_APP_GEMINI_PROXY_URL=https://mohnish-gemini-proxy.your-subdomain.workers.dev/

   - Build and deploy to GitHub Pages as usual.

Notes
- Do not ship `REACT_APP_GEMINI_API_KEY` in production; the app already prefers the proxy if provided.
- For local dev, you can either also set `REACT_APP_GEMINI_PROXY_URL` or temporarily use `REACT_APP_GEMINI_API_KEY` locally only.
