@AGENTS.md

# Metalix interactive brochure — project notes

The 12-page PDF *Metalix_SheetMetal_SmartFactory_Brochure_12p_EN.pdf* (one folder up) rebuilt
as an interactive **demo** website in English, German, French and Chinese.

- Live: https://metalix-demo.vercel.app (Vercel project `metalix-demo`, scope "Pavel's projects")
- Repo: https://github.com/spashap/MetalixDemo — **push to `main` deploys to production
  automatically** (GitHub ↔ Vercel connected in the dashboard). No preview gate.
- Stack: Next.js 16 (App Router, Turbopack), React 19, three.js, Lenis. Node 24 pinned in
  `package.json` (the build runs a `.ts` script with Node's type stripping).
- This is a **website**, not an offline deliverable: the parent folder's "single self-contained
  HTML from `file://`" rule does **not** apply here.

## Commands

```bash
npm run dev          # localhost:3000; "/" redirects by cookie → Accept-Language → en
npm run build        # runs check:i18n first, then next build
npm run check:i18n   # de/fr/zh must match en.ts exactly (keys, array lengths, no empty strings)
vercel ls metalix-demo   # see deploys after a push (~20 s build)
```

## Layout

| Path | What |
|---|---|
| `content/en.ts` | All English text, transcribed from the PDF. Source of truth; `Dict = typeof en`. |
| `content/{de,fr,zh}.ts` | Typed `: Dict` — a missing key fails `tsc`; array lengths checked by the script. |
| `content/locales.ts` | Locale list, native names, `hreflang` (`zh` → `zh-Hans`). |
| `app/[lang]/` | Root layout + page; 4 statically generated routes. `proxy.ts` handles `/`. |
| `components/i18n.tsx` | Client-side language switch in place (no reload): swaps dict, `history.replaceState` to `/xx`, sets `lang`/title/cookie, plays the wipe. |
| `components/chrome.tsx` | Top bar, language switcher (hover previews the tagline), Explore palette (`/`, Ctrl+K), section rail, scroll-spy, reveal, spotlight/tilt, Lenis. |
| `components/ui.tsx` | `Scramble`, `Count`, `SectionHead`, `CapTabs`, `Steps`, `Kpi`, `Marquee`, icons. |
| `components/sections/` | One file per brochure page, in order (Hero … Service). |
| `components/demos/` | `HeroCanvas`, `Toolpath` (+ shared `Seg`), `Bend3D`, `NestDemo`. |
| `public/img/` | Images cropped from 2.5× page renders (`../pages`, `../crops`, outside the repo). |

Section ids (also the Explore/rail order): `hero about factory cnckad mbend mrobot mtube nesting estimation mes erp service`.

## Adding or changing text

Edit `content/en.ts`, then the same key in all three other files, then `npm run check:i18n`.
Keep `" · "` separators where they exist — some components split on them (Factory flow cards,
MBend KPIs). The PDF has no text layer (outlined vectors); text was read from page renders.

## Domain rules the demos must respect (from the user — sheet-metal expert)

**Punch (`Toolpath`, punch mode):** inner features before the outer contour; every hit overlaps.
- Round holes → round tool (Ø14), spiral **from the centre outwards**, then a finishing ring.
- Rectangular holes → square tool (14), **snake along X**, row by row.
- Outer contour → rectangular tool (30×8) on the **scrap side**, rotated to each edge; runs one
  tool-width past **convex** corners (no web left), stops at **concave** corners (never bite the part).
- Hits drawn **yellow**; readout shows the active tool.

**Laser (`Toolpath`, laser mode):** the pierce splashes/burns, so it is always **in the scrap**
(inside holes, outside the outer contour), followed by a short **lead-in** (arc or straight) onto the
contour, then a small overcut and **lead-out** back into the scrap. Pierce flash + burn mark shown.

**Hero:** laser cutting **only** — the user found punching ugly there. HUD shows Nesting/Cutting/Bending.

## Content decisions

- Numbers inside demos (nest utilization, cost index, MES Gantt) are **illustrative** and labelled
  on the page. Brochure figures (30000+, 3×, -90% …) are shown as printed.
- Sentences clipped by the PDF's own layout were completed sensibly; page 2's "Inside this
  brochure" list was dropped (the Explore palette replaces it).
- Contact block = the brochure's China office (Shanghai Hymore). Chinese company name kept in
  English on purpose — the official Chinese name is unknown; don't invent one.
- MRobot shows the official video `irELBj5UiWE` (MetalixCncKad channel): autoplays **muted**
  (browsers forbid sound), loops, pauses off-screen via the YouTube postMessage API; the thumbnail
  button plays with sound; reduced-motion users get click-to-play. No `hl` param — it would reload
  the player on language switch.

## Testing traps (see also `../../docs/testing-playbook.md`)

- **The Chrome extension window may not render frames** → scroll-reveal, IntersectionObserver
  and rAF animations look broken (blank sections). Take a throwaway screenshot to force a frame,
  then the real one. Don't "fix" code from that symptom.
- **Lenis fights scripted `scrollIntoView`** → append `?nosmooth` to the URL for testing.
- **Window resize doesn't take on a maximised window** → phone width via a temporary
  `public/_harness.html` with 390 px iframes (delete it afterwards).
- A YouTube embed opened top-level shows "configuration error" — it needs a host page; not a bug.
- To inspect a finished demo state, force it with injected CSS (e.g. `.toolpath .hit{opacity:1}`).

## View counter (footer)

`app/api/views/route.ts` — one POST per page load (language switch doesn't count). Upstash Redis
store `metalix-views` (Vercel Marketplace, free plan, env `KV_REST_API_*`; `vercel env pull` for
local). `views:total` = INCR every load; `views:visitors` = set of `vid` cookie ids (2-year cookie),
SCARD = unique. Bot user-agents are not counted. No env vars → 204 → footer shows nothing.
**Local testing writes to the production counters** — reset afterwards with
`DEL views:total views:visitors` (Upstash REST: POST `["DEL",…]` with `KV_REST_API_TOKEN`).

## Open items

- German/French/Chinese written by Claude — industry terms need a native Metalix reviewer.
- ERP hub connector wires are barely visible between the columns (cosmetic).
- Photos/logo are crops from the PDF (no source files exist).

## Phase 2 (planned, not started): chatbot widget

Discussed and recommended: one server route + chat widget; knowledge = brochure text + scraped
metalix.net (get Metalix's OK), ~50K tokens, sent whole with **prompt caching** — no RAG/router
needed at this size. Claude Haiku 4.5 ≈ $0.05–0.12 per 6-message conversation (Sonnet 5 ≈
$0.10–0.25; prices as of the June 2026 table — re-check). Store knowledge split by product and log
token usage so a router/embedding search can be added later if it grows past ~150K tokens or
traffic gets high. Ollama self-hosting: free per token but needs an always-on GPU host (Vercel
can't run it); break-even vs Haiku ≈ 6–14K conversations/month; weaker multilingual quality.
Must add: API key as a Vercel env var (user adds it), per-IP rate limit, answer/length caps,
provider spend limit. The user hasn't chosen the provider/model yet.
