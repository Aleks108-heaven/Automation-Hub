Automation Hub is a study space for QA engineers learning test automation (Playwright, Cypress, Selenium, framework architecture, CI/CD) and AI testing. The system should feel like a well-kept engineering notebook: calm paper surfaces, one confident pine accent, and the vocabulary of a test run — pass, fail, flaky, skip — used as a real visual language.

## Content fundamentals

- **Voice:** a senior QA colleague explaining things to a junior one. Direct, practical, no hype. Prefer "Use API tests when the UI adds no confidence" over "Unlock the power of API testing!".
- **Person:** address the reader as *you*; never *we* for the product.
- **Casing:** sentence case for every heading, button and nav item ("Flaky tests and reliability", not "Flaky Tests And Reliability"). Tool names keep their own casing: Playwright, Cypress, Selenium WebDriver, GitHub Actions.
- **Claims:** state risks and tradeoffs next to strengths. Every tool section gets a *Watch-outs* list. Mark vendor-sourced numbers with their source.
- **No emoji.** Status is carried by badges with a word and a glyph (✓ ✕ ~ –).
- **Commands are copyable:** put them in a `CodeBlock`, one command per line, never inside running prose.

## Visual foundations

**Color.** Page on `surface-100`; cards, tables and panels on `surface-000` with a `line` hairline; sidebars, table headers and inline code on `surface-200`. Body text is `ink`, secondary text `ink-muted`. `brand` (pine) is the only interactive colour: primary buttons, links, active nav, focus ring. `accent` (mustard) is a highlight, used for the progress fill and key-idea marks — never as text on light surfaces (use `accent-ink`).

**Status colours** follow a test report: `pass` (teal), `fail` (vermilion), `flaky` (ochre), `skip` (grey), each with a `-soft` ground. Pass and fail sit on the blue–orange axis so they stay distinct for red–green colour blindness, and a badge always carries its word too. `fail` doubles as the *Risk* colour in callouts.

**Code** always sits on `code-bg` in both themes (a terminal is dark in light mode too), with `code-ink` text, `code-muted` comments, `code-key` commands, `code-str` strings and flags.

**Type.** IBM Plex Sans for everything read (`display`, `h1`–`h3`, `body`, `body-sm`, `label`); IBM Plex Mono for code, commands, file trees, badges, eyebrows and numbers (`code`, `stat`). Reading copy is `body` at 16/26 with a 60–75 character measure. `label` is uppercase with 0.06em tracking.

**Spacing and layout.** A 4px base: `space-1` … `space-12`. Cards pad `space-6` (`space-4` on phones), grids gap `space-4`–`space-6`, sections inside a module are `space-8` apart, modules `space-12`. Reading column max 760px; a 260px sidebar nav on desktop that collapses to a top bar under 900px. 16px page gutter on phones.

**Borders, radii, shadows.** Flat by default: hairlines (`line`) define surfaces. `radius-sm` for badges and inline code, `radius-md` for buttons, callouts and code, `radius-lg` for cards, `radius-pill` for progress and chips. `shadow-raised` appears only on hover of a clickable card and on the flashcard.

**States.** Hover darkens a brand fill to `brand-strong` or tints a neutral to `surface-200`. Focus is a solid 2px `brand` outline, 2px offset — at least 3:1 on every surface. Disabled is 50% opacity. Completed checklist items strike through in `ink-muted`.

**Motion.** Minimal: 150ms on hover shadows, a 400ms flip on flashcards. Respect `prefers-reduced-motion`.

## Iconography

No icon library. Status uses text glyphs inside badges (✓ pass, ✕ fail, ~ flaky, – skip); navigation uses module numbers in `label` mono ("06"). No logos, illustrations or emoji — the name is set in plain type.

## Components

- **Content:** `TopicCard`, `Callout` (tip / risk / note), `CodeBlock`.
- **Actions:** `Button` (primary / secondary / ghost), `FilterChip`.
- **Status:** `StatusBadge`, `ProgressBar` (progress and score meters).
- **Forms:** `Checklist`.
- **Learning:** `QuizQuestion` (single and Select TWO; picked / right / wrong states), `Flashcard`, `ExamBar` (sticky timer and progress), `ExamResult` (score, verdict, per-track breakdown).

All are CSS classes prefixed `ah-` in `components/bundle.css`; use them on plain HTML.

## Learning patterns

- **Quiz vs exam.** Module quizzes reveal the answer and explanation immediately. Exams hold feedback until Submit, score “Select TWO” questions all-or-nothing, and use a 65% pass mark (ISTQB CTFL: 26 of 40 in 60 minutes).
- **Timed final.** 40 questions drawn across every track, `ExamBar` with a countdown that turns `fail` under five minutes and auto-submits at zero.
- **Results.** `ExamResult` first, then the review list filtered to wrong or skipped answers, each linking back to its module.
- **Sources.** Content that goes beyond the course documents carries a `brand` badge “Beyond the source docs” and dated source links.
