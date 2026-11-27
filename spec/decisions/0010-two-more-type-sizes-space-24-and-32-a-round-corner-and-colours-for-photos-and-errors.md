# 0010. Two more type sizes, space 24 and 32, a round corner, and colours for photos and errors

- Status: Accepted
- Date: 2026-11-27

## Context

PhotoMatch's plan step 2.87 moves its styles onto the tokens. Counted in its `App.css` on 2026-11-27: 13 of its 57 text sizes are off Graphite's scale, 14 and 15 px for panel and dialog headings, 18 and 20 px for the welcome's and About's titles; its dialogs use 24 px of padding nine times; it draws circles and pills; it shows white text on black scrims over photos, a backdrop behind them, and error text in its own red. What was read on 2026-11-27: Microsoft's Windows type ramp has a Subtitle of 20/28 epx; Apple's macOS Title 3 is 15 pt (from a summary of Apple's page: unchecked).

The owner's picks that day, of the choices laid out: "go with your recommendations": two more sizes, `heading` 15 px and `display` 20 px; PhotoMatch's off-scale spaces and corners snapped to the scale, with space 24 and 32 and a round corner added; and four colour purposes in the design system, the overlays that describe a photo, clipping's and focus's, left to PhotoMatch.

## Decision

**The tokens gain `font.size.heading` 15 px and `font.size.display` 20 px, with their lines, 20 and 28 px; `space.24` and `space.32`; `radius.full`; and, in each theme, `color.backdrop`, `color.on-photo`, `color.scrim`, `color.scrim-soft` and `color.error`, the error checked at 4.5:1 on the canvas, panels, captions and popovers.**

- **Over a photo,** the same in every theme, as a photo can be of any brightness: `on-photo` white, `scrim` black at 72% behind text, `scrim-soft` black at 45% behind a button.
- **The backdrop,** PhotoMatch's own: `#111112` dark and `#e9e9ec` light.
- **The error,** `#ff8a80` dark, PhotoMatch's own; `#b12424` light, PhotoMatch's `#c62828` stepped darker until 4.6:1 on every light surface, as its own is 3.88:1 on Graphite light's canvas.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Only 11, 12 and 13 px | The welcome and About lose their headings' weight |
| The colours over photos and errors kept in PhotoMatch | Colours outside the design system, and an error red under 4.5:1 unnoticed |
| The overlays that describe a photo as tokens | They describe the photo, not the interface, and some are set in PhotoMatch's Settings |

## Consequences

- **PhotoMatch's light error text is a step darker.**
- **PhotoDev and PhotoBook** find the same purposes when they move.

## Assumptions to verify

- [x] The error red at 4.5:1 or more everywhere it's checked: on 2026-11-27, 69 pairs, the light red on the canvas 4.60:1.

## Sources

- PhotoMatch's `App.css`, counted on 2026-11-27; the owner, on 2026-11-27.
- Microsoft's Typography in Windows, read on 2026-11-27; Apple's Human Interface Guidelines, Typography, through a summary.
