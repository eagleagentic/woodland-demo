# Implementation stats

Task: Implement 《漫遊異世界 Wanderworld》 as a deployment-ready static 3D game.

| Metric | Value |
| --- | ---: |
| Started | 2026-07-14 15:16:20 HKT |
| Completed | 2026-07-14 15:44:02 HKT |
| Elapsed time | 27m 42s |
| Input tokens | 7,111,935 |
| Cached input tokens | 6,663,936 |
| Uncached input tokens | 447,999 |
| Output tokens | 85,265 |
| Reasoning output tokens | 33,655 |
| Total tokens | 7,197,200 |
| Estimated standard API cost | US$1.63 |
| Estimated upper bound with cache writes | US$1.74 |

Source: local Codex session log. Token values are the actual cumulative usage
reported at the final response of the implementation task, before the later
requests to add this statistics file.

## Cost calculation

GPT-5.6 Luna standard API rates at the time of the task were US$1.00 per
million uncached input tokens, US$0.10 per million cached input tokens, and
US$6.00 per million output tokens. The `max` reasoning setting does not change
the per-token rate.

```text
(447,999 × $1 / 1M) + (6,663,936 × $0.10 / 1M) +
(85,265 × $6 / 1M) = $1.6259826 ≈ $1.63
```

Reasoning tokens are included in output tokens and are not charged twice.
The session log does not separate ordinary uncached input from cache writes,
which are priced at 1.25×. If every uncached input token were a cache write,
the upper-bound estimate would be US$1.74. Actual Codex subscription billing
may differ from API-equivalent token pricing.

Pricing source: <https://openai.com/index/gpt-5-6/>

## Deliverable summary

| Metric | Value |
| --- | ---: |
| Regions | 4 |
| Dialogue NPCs | 14 |
| Discoverable animals | 14 |
| Recordable landmarks/events | 13 |
| Bundled GLB models | 98 |
| Bundled texture files | 48 |
| Dist files | 165 |
| Dist size | 8.7 MB |

Verification: `dist/index.html` served successfully through a local static
HTTP server; all 3 HTML-local references and 98 declared model paths were
present; `node --check` passed; the original `assets/` directory was unchanged.
