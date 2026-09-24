# Automation Hub

A self-study hub for QA engineers covering test automation (Playwright, Cypress, Selenium, Katalon, Applitools, Vibium and other frameworks), API testing, framework engineering, CI/CD, flaky tests, AI testing and ISTQB certification. It comes with its own design system. Content was checked against official sources on 23 September 2026.

## Start here

Open **`1-learning-hub/automation-hub.html`** in any modern browser (double-click it). It works offline, apart from the web font, which falls back to system fonts.

## How to run

### Option 1: open the file (no install)

1. Clone or download the repository:

   ```sh
   git clone https://github.com/Aleks108-heaven/Automation-Hub.git
   cd Automation-Hub
   ```

2. Double-click `1-learning-hub/automation-hub.html`, or drag it into Chrome, Edge, Firefox or Safari.
3. Choose a language at the bottom of the sidebar (on a phone, open **Menu** first). You can also link straight to one:

   | Language | Link |
   | --- | --- |
   | English | `automation-hub.html` |
   | Українська | `automation-hub.html?lang=uk` |
   | Polski | `automation-hub.html?lang=pl` |
   | Español | `automation-hub.html?lang=es` |

   Add a page name after `#` to open it directly, for example `automation-hub.html?lang=pl#exams` or `#playwright`.

### Option 2: serve it locally

Handy if you want to open the hub from a phone on the same network. Use either command, run from the repository folder:

```sh
npx serve 1-learning-hub          # Node.js
python -m http.server -d 1-learning-hub 8080   # Python 3
```

Then open `http://localhost:8080/automation-hub.html` (for `serve`, use the port it prints).

### The design system

Open `2-design-system/components-gallery.html` to see every component in light and dark mode. `2-design-system/README.md` is the brand book.

## Online version (Claude artifact)

The hub and its design system are also published as private pages in your Claude artifacts gallery:

- **Automation Hub**: <https://claude.ai/artifact/AVdWTrGW8r1uWPs3efaeNX>
- **Design system**: <https://claude.ai/artifact/KgEHmdqwRje9HtsdjP8kcE>

About the online version:

- **It's private.** Only you can open it until you share it from the page's **Share** menu.
- **Progress is stored separately** from the local file: each copy remembers its own progress in the browser.
- **To update it:** rebuild the HTML (see below), then ask Claude Code to republish `1-learning-hub/automation-hub.html` to the URL above. The link stays the same.
- **In the terminal:** `/artifacts` in Claude Code lists your artifacts. Press `o` to open one, `c` to copy its link.

## Editing and building

The HTML file is generated. Edit the files in `1-learning-hub/source/` and rebuild.

**Requirements:** a POSIX shell (Git Bash on Windows, or macOS/Linux) and, for the checks, Node.js 18+.

```sh
cd 1-learning-hub/source
sh build.sh                      # writes ../automation-hub.html
```

The build joins the files in this order: `part1.html` (styles and layout), `data.js` → `data5.js` (English content), `i18n.js`, `i18n/*.js` (translations), `app.js`.

### Changing content

| To change… | Edit |
| --- | --- |
| A module's English text, quiz or sources | `data.js`–`data5.js` (later files add to or override earlier ones) |
| Flashcard pictures | `FC_PIC` (which picture each card gets) and `PIC` (the drawings) in `data5.js` |
| Exam-only questions | `EXAM_BANK` in `data3.js` / `data4.js` |
| Buttons, labels and messages (all languages) | `UI.en`, `UI.uk`, `UI.pl`, `UI.es` in `i18n.js` |
| Translated module content | `i18n/<lang>-1.js` (Foundations, Tools), `-2` (Framework), `-3` (Quality, AI, Certification), `-4` (tracks, glossary, checklist, study path, exam bank), `-5` (the September 2026 additions) |
| Final exam mix, pass mark, timer | `FINAL` in `app.js` |
| Colours, spacing, fonts | `part1.html` (mirrors `2-design-system/tokens.css`) |

**Rules that keep things working:**

- **Add quiz questions to the end of a module's list.** Saved answers are stored by position, so inserting in the middle scrambles them.
- **Translations must match the English structure:** the same number of sections, questions and answer options. Code blocks are written as `${P(0)}`, `${P(1)}`… and are filled in from the English. A translated section that doesn't match simply shows in English.
- **Check the translations after any content change:**

  ```sh
  node tools/check-i18n.js 1-learning-hub/source    # prints "ALL OK" when everything matches
  ```

- **Add new sections to the end of a module** (`M(id).sections.push(...)`). Translations then still line up, and the new section shows in English until it is translated.
- **Regenerate the question bank** when questions change: `node tools/build-question-bank.js`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Progress disappeared | Progress is saved per browser and per file location. Opening the file from another folder, browser or private window starts fresh. **Reset progress** in the sidebar also clears it. |
| Page stays in English after choosing a language | The browser may be blocking storage, so the choice isn't remembered. Use a `?lang=` link instead. |
| Part of a module is in English in another language | That section's translation no longer matches the English. Run `tools/check-i18n.js` to find it. |
| Fonts look different offline | The IBM Plex fonts load from Google Fonts; without a connection, system fonts are used. |
| `build.sh` fails with `\r` errors | The script got Windows line endings. `.gitattributes` prevents this; re-clone, or run `sed -i 's/\r$//' build.sh`. |

## What's in this folder

| Folder | Contents |
| --- | --- |
| `1-learning-hub/` | `automation-hub.html`: the complete hub in one file. It has 31 modules in 6 tracks, each opening with learning objectives. It also has 179 quiz questions, 65 exam-only questions, 78 illustrated flashcards, a tool picker, a 25-point framework checklist, a study path, per-track exams, a timed 40-question final exam and a guide to how the exams work. It is available in **English, Ukrainian (Українська), Polish (Polski) and Spanish (Español)**: pick a language at the bottom of the sidebar, or open the file with `?lang=uk`, `?lang=pl` or `?lang=es`. Code examples stay in English. |
| `1-learning-hub/source/` | Editable sources: `part1.html` (styles and layout), `data.js` / `data2.js` / `data3.js` / `data4.js` (English content, quizzes, exam bank; `data4.js` adds the objectives, the deeper sections, the four new framework modules and the extra questions), `i18n.js` (language switching and interface text in all four languages), `i18n/uk-*.js`, `i18n/pl-*.js`, `i18n/es-*.js` (translated content), `app.js` (app logic and exams). When you change English content, update the matching translation files too. Anything that no longer matches falls back to English. Run `build.sh` to rebuild the HTML after editing. |
| `2-design-system/` | The Automation Hub design system. `README.md` is the brand book. `tokens.json` / `tokens.css` hold the colours for light and dark themes, plus type, spacing and radius. `components/` has 13 components, each with a guide and a preview, and `components/bundle.css` has their styles. Open **`components-gallery.html`** to see every component live, with a light/dark toggle. |
| `3-source-documents/` | Your two original documents: the Test Automation study guide (.docx) and the AI Testing research overview (.md). |
| `tools/` | `check-i18n.js`: checks that every translation matches the English structure and lists what is still in English. `build-question-bank.js`: rewrites `question-bank.md` from the sources. |
| `4-research-and-sources/` | `research-and-sources.md` lists every source per module, the corrections made during research, and the items to double-check. `question-bank.md` has all quiz and exam questions with answers and explanations, for revising offline. |

## What's new (24 September 2026)

- **Deeper tool modules.** Playwright: network mocking, visual comparisons, the debugging toolkit, Playwright MCP and test agents (planner, generator, healer). Cypress: `cy.intercept()`, component testing, `cy.prompt()`. Selenium: how Selenium 4 fits together (Selenium Manager, BiDi, Grid 4), relative locators with a Java page object, Selenium and AI.
- **Five new modules:** *Beyond the big three* (WebdriverIO, Robot Framework, Cucumber, Appium, Karate, Puppeteer, TestCafe and more, plus how the layers stack), *Katalon*, *Applitools and Visual AI*, *Vibium* and *AI in test automation, hands-on*.
- **Flashcards have pictures.** Every card shows a small diagram (test pyramid, locator target, flaky signal and so on) that works in light and dark mode. 15 new cards cover the new tools.
- 15 new quiz questions. All new content is translated into Ukrainian, Polish and Spanish (`i18n/<lang>-5.js`).
- Fixed: on exam cards the **Start** button could stick out of the card; card footers now wrap (hub and design system).

## Earlier (September 2026)

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

## Notes

- Progress, quiz answers and exam history are saved in the browser you use, per file location. Opening the file from a different folder or browser starts fresh.
- The exam format mirrors ISTQB CTFL (40 questions, 60 minutes, 65% pass mark). The questions cover this hub's topics and are not official ISTQB questions.
- Items marked for double-checking are listed in `4-research-and-sources/research-and-sources.md`.
