# Azhar — Portfolio (Hong Kong Client Project)

A pixel-accurate, dependency-free recreation of the original Framer portfolio site
<https://powerful-herring-025226.framer.app/> — built as plain HTML, CSS and
JavaScript. **No framework, no build step, no bundler.**

Live preview: **<https://mithun-srinivasan.github.io/hong-kong-client-project/>**

---

## Stack

| File | Purpose |
| --- | --- |
| `index.html` | Semantic markup. Every section is commented and named after its role (`intro`, `works`, `projects`, `side-projects`, `miscs`, `info`, `testimonials`, `timezone`). |
| `styles.css` | Hand-written CSS (15 numbered, commented sections) reproducing the original flexbox layout, the Framer breakpoints and the type system. |
| `fonts.css` | The 42 `Inter` `@font-face` subsets that the original uses, served locally from `fonts/`. |
| `script.js` | Three small progressive enhancements: the live clock, scroll-triggered video playback and the hairline-rule draw-in animation. |
| `fonts/` | 42 `.woff2` Inter subsets (local — no external font requests). |
| `images/` | The two project videos, the two GIF covers, the video poster, the avatar and the favicons. |

Total weight ≈ 16 MB, of which ≈ 14 MB is the two project videos.

## Run it locally

Because the page uses relative paths only, opening `index.html` directly works.
A tiny static server is nicer for testing video autoplay:

```bash
# Python
python -m http.server 8123 --bind 0.0.0.0

# or Node
npx serve .
```

Then open <http://127.0.0.1:8123/index.html>.

## How the original was matched

* **Layout** — the original is 100 % flexbox, so the same fractional `flex` values
  (`flex: .4 0 0`, `flex: .35 0 0`, …) are reused; those particular values are what
  produce the original's column distribution.
* **Type** — 15 px / 500 weight / `letter-spacing: 0.0094em` / `line-height: 1.5em`,
  plus Framer's OpenType feature switches (`blwf`, `cv09`, `cv03`, `cv04`, `cv11`).
  `1rem` is pinned to 15 px (`html { font-size: 93.75% }`) exactly like Framer does.
* **Breakpoints** — identical to the Framer project: desktop ≥ 1200 px,
  tablet 600 – 1199.98 px, mobile ≤ 599.98 px.
* **Responsive variants** — Framer ships different *content* per breakpoint. The
  side-project and misc components carry an empty title (and no year) on mobile,
  so those elements are hidden below 600 px, exactly like the original.
* **Motion** — videos start playing when they scroll into view, the hairline rules
  draw themselves in, and the clock shows the visitor's local time with a sweeping
  second hand.

### Verification

The recreation was diffed against the live original in a headless browser at
1425 px / dpr 1:

* document height **8878 px** — identical to the original;
* every section's bounding box matched to within a few pixels at
  **1440 / 768 / 390** px;
* a full-page pixel diff returned **≈ 0.17 %** differing pixels, all of it in the
  live clock digits and in video / GIF animation frames.

## Differences from the original

* The **"Made in Framer" badge** (and its artwork) was removed on request.
* Everything else — layout, type, images, videos, animations, the ElevenLabs
  "Talk to an agent" widget — behaves like the original.
