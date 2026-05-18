# Design tokens (midnight theme) — for Figma variables

Extracted from `today-hub.html` (`:root` and related). Use **Midnight** as the default dark prototype theme.

## Colors (hex / CSS)

| Token (suggested Figma name) | Value | Notes |
|------------------------------|-------|--------|
| bg | `#07080c` | Page background |
| surface | `#0d1018` | Panels / surfaces |
| surface-2 | `#0b0e16` | Secondary surface |
| text | `#eaf0ff` | Primary text |
| muted | `#9aa6c3` | Secondary text |
| line | `rgba(234, 240, 255, 0.08)` | Hairlines / borders |
| cyan (accent) | `#00e5ff` | Primary accent |
| green | `#22ff88` | Positive |
| orange | `#ff7a00` | Warning / emphasis |
| red | `#ff3b3b` | Negative / danger |
| chrome-text | `rgba(234, 240, 255, 0.92)` | Chrome labels |

## Radius (px)

| Token | Value |
|-------|--------|
| r12 | 12 |
| r14 | 14 |
| r16 | 16 |
| r18 | 18 |
| r22 | 22 |

## Spacing scale (px)

| Token | Value |
|-------|--------|
| space-4 | 4 |
| space-8 | 8 |
| space-12 | 12 |
| space-16 | 16 |
| space-24 | 24 |
| space-32 | 32 |

## Layout

| Token | Value |
|-------|--------|
| max content width | 1440px |

## Shadow (CSS string — use as effect reference)

`0 24px 60px rgba(0, 0, 0, 0.55)`

---

**Other themes:** `charcoal`, `dawn`, and `system` override many of the same variables in `today-hub.html`. For a first Figma library, mirror **midnight** only; add light theme when needed.
