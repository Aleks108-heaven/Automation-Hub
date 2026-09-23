# Button

Triggers an action in the Hub: start a module, reveal an answer, mark progress.

- **Consumer provides:** a `<button>` (or `<a>` for navigation) with class `ah-btn` plus one variant: `ah-btn--primary`, `ah-btn--secondary`, `ah-btn--ghost`. Label text in sentence case.
- **Primary** (`brand` fill, `on-brand` text): one per view — the next learning step.
- **Secondary** (`surface-000`, `line-strong` border): parallel actions such as *Mark as done*.
- **Ghost** (`brand` text): low-emphasis inline actions like *Show answer*, *Next card*.
- Min height 40px; focus ring is a 2px `brand` outline.
- Don't: use `accent` or status colours for buttons; put two primaries side by side.
