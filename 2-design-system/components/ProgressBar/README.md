# ProgressBar

A thin pill bar for progress (`ah-progress`, mustard fill) or a score meter (`ah-meter`, pine / pass / fail fill).

- **Consumer provides:** `<div class="ah-progress"><span style="width:NN%"></span></div>`; add `--bordered` on `surface-200` grounds such as the sidebar. Meters use `ah-meter` plus `--pass` or `--fail`.
- Always pair with a numeric label in mono (`7 / 22`, `4/7`) — the bar alone carries no exact value.
- `accent` means *learning progress*; `pass`/`fail` mean *score against a threshold*. Don't mix them.
- Give meters an `aria-label` such as “4 of 7 correct”.
