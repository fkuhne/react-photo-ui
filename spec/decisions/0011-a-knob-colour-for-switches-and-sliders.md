# 0011. A knob colour for switches and sliders

- Status: Accepted
- Date: 2026-11-27

## Context

Plan step 2.3, the switch and the slider. Drawn first in the text's colour, their knob was near black in the light palettes, `#1c1c1f` on a mid-grey track, where both macOS and Windows draw a light knob; seen in WebKit on the site's Choices page on 2026-11-27. The controls sheet of PhotoMatch's canvas draws the knob `#e4e4e7` in Graphite dark. The owner, that day: "don't wait for my approvals as I agree with all your suggestions".

## Decision

**Each theme gains `color.knob`, a switch's knob and a slider's thumb: Graphite dark's grey 90, `#e4e4e7`; white in Graphite light and paper.**

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| The text's colour | Near black in the light palettes |
| `on-photo`, white in every theme | Its purpose is what sits on a photo |

## Consequences

- **Light palettes' switches and sliders** look as the systems' do.

## Sources

- The site's Choices page drawn in WebKit, 2026-11-27; PhotoMatch's canvas, its Graphite controls.
