# FilterChip

A toggle chip for filtering a list: flashcard tracks, exam review (*Wrong or skipped* / *All*).

- **Consumer provides:** `<button class="ah-chip" aria-pressed="true|false">` inside a `role="group"` with an `aria-label`.
- Exactly one chip is pressed in a single-select group; the pressed chip fills `brand` with `on-brand` text.
- Put the count in the label when it helps: “Wrong or skipped (4)”.
- Don't: use chips as navigation links or as primary actions.
