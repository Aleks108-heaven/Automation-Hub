# StatusBadge

A small mono label that states a test-run status, a tool tag or a piece of metadata.

- **Consumer provides:** a `<span class="ah-badge">` plus a tone: `--pass`, `--fail`, `--flaky`, `--skip`, `--brand`, or none (neutral meta like reading time).
- Status badges ALWAYS include the word and its glyph: `✓ Pass`, `✕ Fail`, `~ Flaky`, `– Skip`. Colour is never the only signal.
- Use `--brand` for tool tags (Playwright, Cypress, Selenium) and module status *Done*.
- Don't: use badges as buttons, or put more than three on one card.
