# ExamResult

The score summary after an exam: total, pass/fail verdict, time used, and a per-track breakdown.

- **Consumer provides:** `.ah-result` with the score in `.ah-result__score` (`<small>` for “/ total”), `.ah-result__meta` (percent, pass mark, time), and a Pass/Fail `StatusBadge`; then `.ah-bytrack` rows of label · `.ah-meter--pass|--fail` · `r/n` · badge.
- The pass threshold is 65% (as in ISTQB CTFL: 26/40). A track row turns `--fail` below it.
- Follow with a review list of `QuizQuestion`s in revealed state, filtered to *Wrong or skipped* by default with `FilterChip`s, each linking back to its module.
- Don't: show the score without the pass mark; hide which answers were wrong.
