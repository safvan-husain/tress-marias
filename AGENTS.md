<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Single Next.js 16 app (`tress-marias`), a static marketing/booking site. No backend, database, or env vars required.
- Package manager is npm (`package-lock.json`). Scripts live in `package.json`: `npm run dev` (Turbopack dev server on port 3000), `npm run build`, `npm run lint`.
- No automated test suite is configured; verify changes via lint, build, and manual testing in the browser.
- The build/dev warning `Failed to find font override values for font 'Google Sans Flex'` is benign and can be ignored.
- The booking flow does not call any API — submitting opens an external `wa.me` WhatsApp link (see `app/lib/whatsapp.ts`), so don't expect a server-side request when testing bookings.
