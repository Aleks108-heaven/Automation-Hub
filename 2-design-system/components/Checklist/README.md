# Checklist

A list of self-review items the learner ticks off — framework QA checks, study-path steps.

- **Consumer provides:** `<ul class="ah-checklist">` of `<li><label class="ah-check"><input type="checkbox"><span>…</span></label></li>`; the page persists the state.
- Items are questions or imperative steps, one line each where possible.
- Checked items strike through in `ink-muted`; the box fills `brand`.
- Pair with a `ah-progress` bar showing *n / total* in `stat` mono.
- Don't: use checkboxes for navigation, or nest checklists.
