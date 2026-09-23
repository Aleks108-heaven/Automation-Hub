# ExamBar

A sticky status bar shown during an exam: title, answered count, progress, countdown and Submit.

- **Consumer provides:** `.ah-exambar` containing `.ah-exambar__title` (label + `n / total answered`), an `.ah-progress`, an optional `.ah-timer` (`role="timer"`), and a primary `Submit` button.
- The timer is `mm:ss` in tabular mono; add `is-low` under 5 minutes (`fail-soft` ground + `fail` text). At 00:00 the page submits automatically.
- Sticks to the top of the reading column; under 900px it sits below the app's top bar (offset by the bar's height).
- Submitting with unanswered questions asks for confirmation *in the page* (never `confirm()`), and says there is no negative marking.
- Don't: hide the timer; animate it every second with motion; use `accent` for the low state.
