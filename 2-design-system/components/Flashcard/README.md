# Flashcard

A two-sided card for memorising a term: the term on the front, the definition on the back.

- **Consumer provides:** `<button class="ah-fc">` › `.ah-fc__inner` › a front `.ah-fc__face` (track `label`, `.ah-fc__term`, hint) and a back `.ah-fc__face--back` (term label + `.ah-fc__def`). Toggle `is-flipped` on click, Space or Enter.
- Update the button's `aria-label` with the revealed definition so screen readers get the back side.
- Pair with Previous/Next secondary buttons, a `n / total` counter in mono, track `FilterChip`s and a Shuffle ghost button; ←/→ keys move between cards.
- The 400ms flip is the only 3D motion in the system and is removed under `prefers-reduced-motion`.
- Don't: put more than ~25 words on the back; use images.
