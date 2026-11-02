# CSS position playground

An interactive, zero-dependency demo of the five CSS `position` values — `static`, `relative`, `absolute`, `fixed`, and `sticky` — with overlapping boxes so you can *see* which ones get removed from the normal document flow.

## Run it

Open `index.html` in a browser. No build step, no dependencies.

Or serve it locally:

```bash
npx serve .
# or
python3 -m http.server
```

## How to use it

- Pick a `position` value with the buttons.
- Drag the `top` / `left` sliders to offset box **B**.
- Scroll inside the viewport frame to watch `sticky` stick and `fixed` stay put.
- Watch box **C**: if it jumps up into B's spot, B has left the flow.

## Cheat sheet

| Value      | Keeps its space?            | `top`/`left` measured from              | Scrolls with page?            |
|------------|-----------------------------|-----------------------------------------|-------------------------------|
| `static`   | Yes                         | Ignored                                 | Yes                           |
| `relative` | Yes (gap stays behind)      | Its own normal position                 | Yes                           |
| `absolute` | **No** — out of flow        | Nearest non-`static` ancestor           | Yes                           |
| `fixed`    | **No** — out of flow        | The viewport                            | No                            |
| `sticky`   | Yes                         | Scroll container, once threshold is hit | Until its parent scrolls away |

## Real-world patterns

```css
/* relative + absolute: badge on a product card */
.card  { position: relative; }
.badge { position: absolute; top: 8px; right: 8px; }

/* fixed: floating chat button */
.chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }

/* sticky: table header that follows you */
thead th { position: sticky; top: 0; background: white; }
```

## Gotchas

- `z-index` only works on positioned elements (anything but `static`).
- `sticky` needs a `top`/`bottom` value, and breaks if an ancestor has `overflow: hidden`.
- `fixed` anchors to an ancestor instead of the viewport if that ancestor has `transform`, `filter`, or `perspective`. This demo uses that trick on purpose so the "fixed" box stays inside the frame.
