# Research and sources

All external facts in the Automation Hub, with the sources each module cites. Facts marked "Beyond the source docs" were checked against these pages on **23 September 2026**.

## Corrections made during research

- Gartner category: Peer Insights lists AI-Augmented Software Testing Tools as *transitioning to* "Agentic Software Quality Assurance Platforms" (first Magic Quadrant: 6 Oct 2025) — not renamed.
- Market size $24.25B (2026) → $84.2B (2034) is published by Fortune Business Insights; other firms publish different figures.
- EU AI Act high-risk deadlines were moved by the AI Omnibus (Reg. (EU) 2026/1744): 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I).
- Current versions at research time: Playwright 1.63.0, Cypress 16.1.0, Selenium 4.49.0.
- ISTQB CT-AI v2.0 exam: 40 questions, 44 points, pass 29, 60 min.

## Items to double-check

- CTFL chapter 5–6 details (automation benefits/risks, testing quadrants, defect report fields) came from a secondary study source — confirm against the official CTFL v4.0.1 PDF.
- CT-TAS exam duration differs between ISTQB pages (60 vs 90 min).
- JSON Schema validation is described as common practice without a dedicated source.
- **v4 additions** (learning objectives, deeper sections in every module, the four new framework modules, and the new quiz and exam questions) were written from the cited documentation but were **not re-checked against the live pages** the way the earlier content was. Before relying on version-specific details, check especially:
  - the `npm init playwright` scaffold defaults and tag syntax (`{ tag: '@smoke' }`);
  - the current major versions of the GitHub Actions used (`actions/checkout`, `setup-node`, `upload-artifact`);
  - Cypress retry-ability and `cy.session()` behaviour under Cypress 16;
  - the Faker API (`faker.seed`, `faker.person.fullName`).

## Sources by module

### 01 What test automation is

- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)
- [Bach & Bolton — Testing and Checking Refined](https://www.satisfice.com/blog/archives/856)

### 02 Manual vs automated testing

- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)

### 03 Where automation fits

- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)
- [Martin Fowler — The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Martin Fowler — Mocks Aren’t Stubs](https://martinfowler.com/articles/mocksArentStubs.html)

### 04 Playwright

- [Playwright docs — Installation](https://playwright.dev/docs/intro)
- [Playwright release notes](https://playwright.dev/docs/release-notes)
- [Playwright docs — Test configuration](https://playwright.dev/docs/test-configuration)
- [Playwright docs — Locators](https://playwright.dev/docs/locators)

### 05 Playwright fixtures in depth *(beyond the source docs)*

- [Playwright docs — Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright docs — Authentication](https://playwright.dev/docs/auth)
- [Playwright docs — Parallelism](https://playwright.dev/docs/test-parallel)

### 06 Cypress

- [Cypress docs — Why Cypress?](https://docs.cypress.io/app/get-started/why-cypress)
- [Cypress changelog](https://docs.cypress.io/app/references/changelog)
- [Cypress docs — cy.intercept](https://docs.cypress.io/api/commands/intercept)
- [Cypress docs — Component testing](https://docs.cypress.io/app/component-testing/get-started)
- [Cypress docs — Best practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [Cypress docs — Retry-ability](https://docs.cypress.io/app/core-concepts/retry-ability)
- [Cypress docs — cy.session](https://docs.cypress.io/api/commands/session)

### 07 Selenium

- [Selenium documentation](https://www.selenium.dev/documentation/)
- [Selenium Manager (beta)](https://www.selenium.dev/documentation/selenium_manager/)
- [Selenium — WebDriver BiDi](https://www.selenium.dev/documentation/webdriver/bidi/)
- [Selenium docs — Waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)
- [Selenium docs — Page object models](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

### 08 Comparing the three

- [Playwright docs — Installation](https://playwright.dev/docs/intro)
- [Cypress docs — Why Cypress?](https://docs.cypress.io/app/get-started/why-cypress)
- [Selenium documentation](https://www.selenium.dev/documentation/)

### 09 API testing *(beyond the source docs)*

- [Playwright docs — API testing](https://playwright.dev/docs/api-testing)
- [Playwright docs — APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 6585 — Additional HTTP status codes (429)](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)
- [Pact documentation](https://docs.pact.io/)
- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)

### 10 Framework architecture and POM

- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)
- [Martin Fowler — PageObject](https://martinfowler.com/bliki/PageObject.html)
- [Selenium docs — Page object models](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

### 11 Framework types: from linear to hybrid *(beyond the source docs)* *(added in v4)*

- [Robot Framework User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [Cucumber — Gherkin reference](https://cucumber.io/docs/gherkin/reference/)
- [Playwright docs — Parameterize tests](https://playwright.dev/docs/test-parameterize)
- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 12 Design patterns for test code *(beyond the source docs)* *(added in v4)*

- [Martin Fowler — PageObject](https://martinfowler.com/bliki/PageObject.html)
- [Selenium docs — Page object models](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [Serenity BDD — The Screenplay Pattern](https://serenity-bdd.github.io/docs/screenplay/screenplay_fundamentals)
- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 13 Framework documentation

- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 14 Project structure and workflow

- [Playwright docs — Installation](https://playwright.dev/docs/intro)
- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 15 Test data management *(beyond the source docs)* *(added in v4)*

- [Playwright docs — Fixtures](https://playwright.dev/docs/test-fixtures)
- [Faker.js documentation](https://fakerjs.dev/guide/)
- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 16 CI/CD and continuous testing

- [Playwright docs — Installation](https://playwright.dev/docs/intro)
- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)
- [Playwright docs — Sharding](https://playwright.dev/docs/test-sharding)
- [Playwright docs — Continuous Integration](https://playwright.dev/docs/ci)
- [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

### 17 Building a framework, step by step *(beyond the source docs)* *(added in v4)*

- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)
- [ISTQB — CTAL Test Automation Engineering v2.0](https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/)
- [Playwright docs — Continuous Integration](https://playwright.dev/docs/ci)

### 18 Strategy and risk-based automation

- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)
- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)

### 19 Flaky tests and reliability

- [Playwright docs — Installation](https://playwright.dev/docs/intro)
- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)

### 20 Security, privacy and performance

- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)
- [Playwright docs — Accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

### 21 How automation projects fail

- [Yuri Kan — Test Automation Framework Documentation](https://yrkan.com/blog/test-automation-framework-docs/)
- [Wikipedia — Test automation](https://en.wikipedia.org/wiki/Test_automation)

### 22 Using AI for testing

- [ISTQB — CT-AI v2.0 release](https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/)
- [Gartner Peer Insights — AI-augmented testing tools](https://www.gartner.com/reviews/market/ai-augmented-software-testing-tools)
- [Virtuoso — 10 Best AI Testing Tools](https://www.virtuosoqa.com/post/best-ai-testing-tools)
- [TestGrid — Top AI Testing Tools](https://testgrid.io/blog/ai-testing-tools/)
- [Testing Mind — Best AI tools for software testing 2026](https://www.testingmind.com/best-ai-tools-for-software-testing-2026/)
- [ContextQA — Best test automation tools 2026](https://contextqa.com/blog/best-test-automation-tools-2026/)
- [TestDino — Best test automation tools](https://testdino.com/blog/best-test-automation-tools)
- [TestGuild — AI test automation tools](https://testguild.com/7-innovative-ai-test-automation-tools-future-third-wave/)
- [Fortune Business Insights — Automation testing market](https://www.fortunebusinessinsights.com/automation-testing-market-107180)
- [SmartBear — first Gartner MQ for AI-Augmented Software Testing Tools (Oct 2025)](https://smartbear.com/blog/smartbear-named-a-challenger-in-the-first-ever-gartner-magic-quadrant-for-ai-augmented-software-testing-tools/)

### 23 Testing AI-based systems

- [ISTQB — CT-AI v2.0 release](https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/)
- [ISTQB — CT-AI certification](https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/)
- [BCS — ISTQB CT-AI](https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/software-testing-certifications/istqb-certified-tester-foundation-level-ai-testing/)
- [AT*SQA — Testing AI systems overview](https://atsqa.org/testing-ai-systems-overview)
- [ISTQB CT-AI Syllabus v2.0 (PDF)](https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf)
- [ISTQB — CT-AI v1.0 (retiring)](https://istqb.org/certifications/certified-tester-ai-testing-ct-ai-retiring/)
- [ISO/IEC 25059:2023](https://www.iso.org/standard/80655.html)
- [EU AI Act — Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Council of the EU — AI Act simplification agreement (May 2026)](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/)
- [Google ML Crash Course — accuracy, precision, recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall)
- [Chen et al. — Metamorphic Testing: A Review of Challenges and Opportunities (ACM CSUR 2018)](https://dl.acm.org/doi/10.1145/3143561)

### 24 Evaluating LLM features *(beyond the source docs)*

- [OWASP — Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [Zheng et al. 2023 — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685)
- [Ragas — available metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/)
- [NIST AI 600-1 — Generative AI Profile (PDF)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [ISTQB — CT-AI v2.0 release](https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/)

### 25 ISTQB CTFL essentials *(beyond the source docs)*

- [ISTQB — CTFL v4.0 certification page](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)
- [ISTQB CTFL Syllabus v4.0.1 (PDF, via ASTQB)](https://astqb.org/assets/documents/ISTQB_CTFL_Syllabus_v4.0.1.pdf)
- [ISTQB — Exam Structure Tables v1.13 (PDF)](https://istqb.org/wp-content/uploads/sdm-uploads/ISTQB_Exam-Structure-Tables_v1.13.pdf)

### 26 Certification path and exam strategy *(beyond the source docs)*

- [ISTQB — CTFL v4.0 certification page](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)
- [ISTQB CT-AI Syllabus v2.0 (PDF)](https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf)
- [ISTQB — CTAL Test Automation Engineering v2.0](https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/)
- [ISTQB — CT Test Automation Strategy](https://istqb.org/certifications/certified-tester-test-automation-strategy-ct-tas/)
- [ISTQB — Exam Structure Tables v1.13 (PDF)](https://istqb.org/wp-content/uploads/sdm-uploads/ISTQB_Exam-Structure-Tables_v1.13.pdf)

## Content inventory

- Tracks: Foundations, The tools, Framework engineering, Strategy and quality, AI testing, Certification
- Modules: 26
- Module quiz questions: 164
- Exam-only questions: 65
- Glossary / flashcard terms: 63
- Framework review checks: 25
- Study path steps: 15
