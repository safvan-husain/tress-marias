<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single static/client-rendered Next.js 16 (App Router) marketing + booking site ("Tres Marias"). There is **no backend, database, auth, or API** — all content is static (`app/data/services.ts`, `data/*.md`) and "booking" just builds WhatsApp `wa.me`/`api.whatsapp.com` deep links (`app/lib/whatsapp.ts`). Running the Next.js dev server alone exercises the whole product.

- Dev server: `npm run dev` (http://localhost:3000). The update script already runs `npm install`.
- Lint: `npm run lint`. Build: `npm run build`. There is **no test suite** (no test script/runner/files), so don't expect `npm test` to work.
- No env vars / `.env` are needed. Remote Unsplash images and Google Fonts require internet but are cosmetic-only; the app and core flows work offline (booking links still generate fine).
- `next build` emits a harmless warning: "Failed to find font override values for font `Google Sans Flex`" — expected, not an error.
