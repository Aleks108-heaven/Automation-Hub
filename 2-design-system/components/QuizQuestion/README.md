# QuizQuestion

One multiple-choice question with lettered options, used in module quizzes and exams.

- **Consumer provides:** `.ah-q` with `.ah-q__text`, `.ah-q__opts` of `<button class="ah-opt">` (each with a `.k` letter span and a text span), and optionally `.ah-q__why` after answering.
- **States:** default; `is-picked` (selected, answer hidden — exams); `is-right` / `is-wrong` after reveal. Replace the letter with ✓ or ✕ so state never relies on colour alone.
- **Single answer:** `role="radio"` in a `role="radiogroup"`. **Select TWO:** `role="checkbox"` with a `Select TWO` brand badge in the question; score all-or-nothing.
- Quizzes reveal immediately and disable the options; exams show `is-picked` only until submit.
- Explanations start with **Correct.** or **Not quite.**, then say *why* in one or two sentences, linking to the module.
- Don't: shuffle option letters after reveal; use colour without the ✓/✕ glyph.
