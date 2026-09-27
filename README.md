# Metalix interactive brochure (demo)

The 12-page *Smart Sheet Metal Factory* PDF brochure rebuilt as an interactive
website in English, German, French and Chinese. Next.js 16 on Vercel.

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to the visitor's language
npm run build        # checks translations first, then builds
npm run check:i18n   # de / fr / zh must match the English structure exactly
```

## Where things live

| Path | What |
|---|---|
| `content/en.ts` | All English text, transcribed from the PDF. The source of truth. |
| `content/de.ts`, `fr.ts`, `zh.ts` | Translations, typed against `en.ts` — a missing key fails the build. |
| `components/sections/` | One file per brochure page (Hero … Service). |
| `components/demos/` | Interactive pieces: hero laser canvas, toolpath sim, 3D bending (three.js), nesting, cost model. |
| `components/chrome.tsx` | Top bar, language switcher, Explore palette (`/` or Ctrl+K), section rail, smooth scroll. |
| `proxy.ts` | `/` → `/en`, `/de`, `/fr` or `/zh` from the saved choice or `Accept-Language`. |
| `public/img/` | Photos cropped from the PDF pages. |

## Notes

- Language switching happens in place (no reload); the URL changes too, so every
  language is a real, shareable page.
- Numbers inside the demos (utilization %, cost index, Gantt lanes) are illustrative and
  labelled as such on the page. Figures quoted from the brochure are shown as-is.
- Append `?nosmooth` to a URL to turn off smooth scrolling (handy for scripted screenshots).
- Contact block shows the brochure's China office details (Shanghai Hymore).
