# Official Assembly Website V1

Next.js static demo for Assemblywoman Carmen Morales' official assembly website.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub Pages demo

The site is configured for static export with `output: "export"` and can be deployed from GitHub Actions. The workflow sets `NEXT_PUBLIC_GITHUB_PAGES=true` so links and assets are prefixed for:

```text
/Official-Assembly-Website-V1
```

## Future Vercel and Supabase

The Supabase client is prepared in `src/lib/supabase.ts`, but it returns `null` until both public env vars are configured:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

When the site moves to Vercel, add those values in the Vercel project environment settings. Do not expose service role keys in this frontend project.
