# Automation Hub

A self-study hub for QA engineers covering test automation (Playwright, Cypress, Selenium), API testing, framework engineering, CI/CD, flaky tests, AI testing and ISTQB certification. It comes with its own design system. Content was checked against official sources on 23 September 2026.

## Start here

Open **`1-learning-hub/automation-hub.html`** in any modern browser (double-click it). It works offline, apart from the web font, which falls back to system fonts.

## What's in this folder

| Folder | Contents |
|---|---|
| `1-learning-hub/` | `automation-hub.html`: the complete hub in one file. It has 26 modules in 6 tracks, each opening with learning objectives. It also has 164 quiz questions, 65 exam-only questions, 63 flashcards, a tool picker, a 25-point framework checklist, a study path, per-track exams, a timed 40-question final exam and a guide to how the exams work. It is available in **English, Ukrainian (Українська), Polish (Polski) and Spanish (Español)**: pick a language at the bottom of the sidebar, or open the file with `?lang=uk`, `?lang=pl` or `?lang=es`. Code examples stay in English. |
| `1-learning-hub/source/` | Editable sources: `part1.html` (styles and layout), `data.js` / `data2.js` / `data3.js` / `data4.js` (English content, quizzes, exam bank; `data4.js` adds the objectives, the deeper sections, the four new framework modules and the extra questions), `i18n.js` (language switching and interface text in all four languages), `i18n/uk-*.js`, `i18n/pl-*.js`, `i18n/es-*.js` (translated content), `app.js` (app logic and exams). When you change English content, update the matching translation files too. Anything that no longer matches falls back to English. Run `build.sh` to rebuild the HTML after editing. |
| `2-design-system/` | The Automation Hub design system. `README.md` is the brand book. `tokens.json` / `tokens.css` hold the colours for light and dark themes, plus type, spacing and radius. `components/` has 13 components, each with a guide and a preview, and `components/bundle.css` has their styles. Open **`components-gallery.html`** to see every component live, with a light/dark toggle. |
| `3-source-documents/` | Your two original documents: the Test Automation study guide (.docx) and the AI Testing research overview (.md). |
| `4-research-and-sources/` | `research-and-sources.md` lists every source per module, the corrections made during research, and the items to double-check. `question-bank.md` has all quiz and exam questions with answers and explanations, for revising offline. |

## What's new (September 2026)

### More detail in every module

- Every module now opens with a **"What you'll learn"** list.
- **Foundations:** test case vs script vs framework vs pipeline; a worked example of when automation pays back; testing vs checking; a hybrid manual + automated week; the test pyramid, testing trophy and "ice-cream cone" anti-pattern; test doubles (dummy, stub, spy, mock, fake).
- **Tools:**
  - Playwright: the config file line by line, locator priority order, the anatomy of a test (describe, steps, tags).
  - Cypress: the command queue and automatic retries, project layout, `cy.session()`, `data-cy` selectors.
  - Selenium: explicit waits in Java and Python, and which runner to use per language.
  - Comparing the tools: languages and ecosystems, and how to migrate between tools.
  - API testing: a JSON Schema validation example.
- **Framework engineering:** design principles for test code (DAMP, assertions in tests), a TypeScript Page Object, a README template, tags and environments, a GitHub Actions workflow with sharding, and CI quality gates.
- **Strategy and quality:** metrics that show the value of automation, a flaky-test triage workflow, automated accessibility checks with axe, and a quarterly health review.
- **AI testing:** a safe review workflow for AI-generated tests, and metamorphic testing.

### Four new Framework engineering modules

1. **Framework types**: linear, modular, library, data-driven, keyword-driven, BDD and hybrid.
2. **Design patterns**: component objects, Screenplay, builders and factories, API client wrappers, anti-patterns.
3. **Test data management**: strategies, isolation rules, cleanup that survives failures, reproducible generated data.
4. **Building a framework, step by step**: stages with exit criteria, a definition of done, build vs buy, roles.

### Quizzes and exams

- The module quizzes grew from 100 to 164 questions and the exam-only questions from 40 to 65. The flashcards grew from 48 to 63 and the framework checklist from 20 to 25 points.
- The Exams page has a **"How the exams work"** guide. It shows each track's question pool and K-level mix, compares quizzes and exams, explains the scoring rules and suggests a study routine.
- The final exam still has 40 questions, but it now takes 8 from Framework engineering to match that track's larger size.

### Languages

- English, Ukrainian, Polish and Spanish, switchable in place from the sidebar without losing progress.

### Security hardening

- Saved progress is checked when it loads, so corrupted or tampered browser data can't inject content or break a page.
- The language choice only accepts the four known languages, and all user-entered text is escaped before display.

## Online versions

The same hub and design system are also published as private pages in your Claude artifacts gallery (claude.ai/code/artifacts): **Automation Hub** (the learning site) and **Automation Hub** (Design System).

## Notes

- Progress, quiz answers and exam history are saved in the browser you use, per file location. Opening the file from a different folder or browser starts fresh.
- The exam format mirrors ISTQB CTFL (40 questions, 60 minutes, 65% pass mark). The questions cover this hub's topics and are not official ISTQB questions.
- Items marked for double-checking are listed in `4-research-and-sources/research-and-sources.md`.
