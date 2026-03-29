# $LOST — Pumpfun Ruined My Life

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full memecoin landing page for $LOST token on Solana
- CA: n3ShrNZRCoMrw5Gww7rPMxVbDq3to3YwsGkDz19pump
- Scrolling marquee: "Pumpfun ruined my life" (top and bottom)
- Mobile-responsive layout with hamburger/mobile nav
- Hero section using photo 1 (img_4097 - LOST logo)
- Lore/Narrative section using photo 9 (img_4094 - $LOST boys chads)
- Tokenomics section pulling live data from DexScreener API: holders, liquidity, volume, market cap
- How to Buy section (step-by-step Solana/Jupiter instructions)
- Jupiter swap widget embed (via iframe or script)
- DEX Screener live chart full display (iframe embed)
- Community/Social Proof section with screenshots of tweets (photos 3-8) displayed as cards
- Our Mission section with the provided text
- Tell Your Story form (X handle + story text, submitted to backend, listed on site)
- Story section listing all submitted community stories
- Roadmap section
- FAQ section
- Footer with links: X community, X chat, CA copy button
- Backend: store and retrieve community story submissions

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: `submitStory(xHandle: Text, story: Text)` and `getStories()` returning array of story objects
2. Frontend: Single-page app with sticky nav, all sections in order:
   - Marquee (top)
   - Nav (sticky, mobile hamburger)
   - Hero (photo 1 background)
   - Marquee (middle)
   - Tokenomics (live DexScreener fetch)
   - Lore/Narrative (photo 9)
   - Our Mission
   - How to Buy
   - Jupiter Swap widget
   - DEX Screener chart
   - Community/Social Proof (tweet screenshots)
   - Tell Your Story form + Story section
   - Roadmap
   - FAQ
   - Marquee (bottom)
   - Footer
