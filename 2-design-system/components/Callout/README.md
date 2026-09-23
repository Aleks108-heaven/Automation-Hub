# Callout

A tinted box that pulls one idea out of the reading flow: a tip, a risk or a key idea.

- **Consumer provides:** `<div class="ah-callout ah-callout--tip|--risk|--note">` with an `ah-callout__label` ("Tip", "Risk", "Key idea") and one `<p>`.
- **Tip** on `accent-soft` with `accent-ink` label; **Risk** on `fail-soft` with `fail` label; **Key idea** on `brand-soft` with `brand` label. Body text stays `ink`.
- At most one callout per section; keep it to one or two sentences.
- Don't: add a coloured left border, icons or emoji.
