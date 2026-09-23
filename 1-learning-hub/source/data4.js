/* ================= v4: deeper modules, framework engineering, more quizzes and exam questions ================= */
Object.assign(SRC,{
  pwcfg:['Playwright docs — Test configuration','https://playwright.dev/docs/test-configuration'],
  pwloc:['Playwright docs — Locators','https://playwright.dev/docs/locators'],
  pwshard:['Playwright docs — Sharding','https://playwright.dev/docs/test-sharding'],
  pwparam:['Playwright docs — Parameterize tests','https://playwright.dev/docs/test-parameterize'],
  pwa11y:['Playwright docs — Accessibility testing','https://playwright.dev/docs/accessibility-testing'],
  pwci:['Playwright docs — Continuous Integration','https://playwright.dev/docs/ci'],
  cybp:['Cypress docs — Best practices','https://docs.cypress.io/app/core-concepts/best-practices'],
  cyretry:['Cypress docs — Retry-ability','https://docs.cypress.io/app/core-concepts/retry-ability'],
  cysess:['Cypress docs — cy.session','https://docs.cypress.io/api/commands/session'],
  sewait:['Selenium docs — Waiting strategies','https://www.selenium.dev/documentation/webdriver/waits/'],
  sepo:['Selenium docs — Page object models','https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/'],
  fowlerpo:['Martin Fowler — PageObject','https://martinfowler.com/bliki/PageObject.html'],
  fowlerpyr:['Martin Fowler — The Practical Test Pyramid','https://martinfowler.com/articles/practical-test-pyramid.html'],
  fowlerdbl:['Martin Fowler — Mocks Aren’t Stubs','https://martinfowler.com/articles/mocksArentStubs.html'],
  screenplay:['Serenity BDD — The Screenplay Pattern','https://serenity-bdd.github.io/docs/screenplay/screenplay_fundamentals'],
  cucumber:['Cucumber — Gherkin reference','https://cucumber.io/docs/gherkin/reference/'],
  robot:['Robot Framework User Guide','https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html'],
  checking:['Bach & Bolton — Testing and Checking Refined','https://www.satisfice.com/blog/archives/856'],
  gha:['GitHub Docs — Using secrets in GitHub Actions','https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions'],
  faker:['Faker.js documentation','https://fakerjs.dev/guide/'],
  metam:['Chen et al. — Metamorphic Testing: A Review of Challenges and Opportunities (ACM CSUR 2018)','https://dl.acm.org/doi/10.1145/3143561'],
});

/* ---------- learning objectives: first section of every module ---------- */
const OBJECTIVES={
 'what-is-automation':['Define test automation and the role of the test oracle','List what automation is good at and what it can’t do for you','Tell a test case, a script, a framework and a pipeline apart','Estimate when an automated check pays back its cost'],
 'manual-vs-automated':['Compare manual and automated testing across cost, speed and evidence','Explain the difference between testing and checking','Plan a week that combines exploratory and automated work'],
 'test-levels':['Match a risk to the lowest test level that gives enough confidence','Read the test pyramid, the testing trophy and the ice-cream cone anti-pattern','Choose the right test double: dummy, stub, spy, mock or fake'],
 'playwright':['Scaffold, run and debug a Playwright project','Read every line of a default playwright.config.ts','Choose locators in the recommended priority order','Structure a test with describe blocks, hooks, steps and tags'],
 'playwright-fixtures':['Write custom test- and worker-scoped fixtures with setup and teardown','Reuse a login session safely with storageState','Use auto and option fixtures and combine fixture sets'],
 'cypress':['Explain the Cypress command queue and retry-ability','Write a test that waits on an intercepted request instead of a timer','Cache a login with cy.session() and pick stable data-cy selectors','Know which Cypress 16 changes can break an existing suite'],
 'selenium':['Describe the WebDriver architecture and the role of Grid','Write explicit waits in Java and Python — and why not to mix them with implicit waits','Pick a test runner for your language and assemble a framework around WebDriver'],
 'compare-tools':['Compare the three tools by model, browsers, languages and debugging','Weigh team, infrastructure and compliance constraints in a tool decision','Plan a migration between tools without losing coverage'],
 'api-testing':['Use HTTP status codes and method semantics as test oracles','Write API and combined API + UI tests with Playwright','Validate responses against a schema and a consumer contract','Test the OWASP API Top 10 risks, starting with BOLA'],
 'framework-architecture':['Describe the five layers of a test automation framework','Apply design principles — single responsibility, DAMP tests, assertions in tests','Write a focused Page Object in TypeScript'],
 'framework-types':['Name the classic framework types, from linear scripts to hybrid','Write data-driven and keyword-/BDD-style tests','Choose a framework type from team skills and who writes the tests'],
 'design-patterns':['Apply Page Objects, component objects and the Screenplay pattern','Build test data with factories and builders','Hide HTTP details behind an API client wrapper','Recognise over-engineering in test code'],
 'framework-docs':['List the minimum documentation set for a framework','Judge documentation against seven quality criteria','Start from a README template that new engineers can execute'],
 'project-structure':['Lay out a Playwright/TypeScript project','Tag and select suites (smoke, regression) from the command line','Configure several environments without code changes','Walk a requirement through to a maintained, CI-wired test'],
 'test-data':['Choose a test-data strategy: API seeding, database seeding, factories, synthetic or masked data','Keep data unique and isolated so tests can run in parallel','Plan cleanup that still works when a test fails'],
 'ci-cd':['Map suites to pipeline stages','Write a GitHub Actions workflow with sharding and artifacts','Define quality gates that keep CI trustworthy'],
 'framework-roadmap':['Plan framework growth in stages with clear exit criteria','Define “done” for an automated test','Decide between building, extending and buying','Run a framework health review'],
 'strategy-risk':['Build a risk-based automation strategy','Prioritise with likelihood × impact','Measure the value of automation with the right metrics'],
 'flaky-tests':['Name the common causes of flaky tests','Reproduce flakiness on purpose with repeated runs','Run a triage workflow ending in fix, quarantine or delete'],
 'security-performance':['Keep secrets and personal data out of code, logs and artifacts','Test authorisation and tenant isolation with negative tests','Add automated accessibility checks and know their limits','Tune parallelism against shared-environment limits'],
 'failure-modes':['Recognise the eight typical ways automation projects fail','Detect each failure mode early and mitigate it','Run a periodic automation health review'],
 'ai-for-testing':['Explain GenAI generation, self-healing, failure triage and agentic testing','Evaluate AI testing tools by maintenance cost and CI fit','Follow a safe review workflow for AI-generated tests'],
 'testing-ai-systems':['Explain why AI systems break deterministic oracles','Calculate accuracy, precision, recall and F1','Use metamorphic testing when there is no reliable oracle','Place regulation and ISO/IEC 25059 in context'],
 'llm-evaluation':['Build a versioned golden dataset for an LLM feature','Layer deterministic, heuristic, model-graded and human checks','Gate on pass rates and zero-tolerance security checks','Calibrate an LLM judge and test against the OWASP LLM Top 10'],
 'istqb-ctfl':['Know the CTFL v4.0.1 exam format and chapter weights','Apply equivalence partitioning, BVA and decision tables with numbers','Distinguish statement and branch coverage, severity and priority'],
 'cert-path':['Choose between CT-TAS, CTAL-TAE and CT-AI after CTFL','Compare exam formats and pass marks','Use exam technique that earns points under time pressure'],
};

/* ---------- deeper content for existing modules ---------- */
addSec('what-is-automation','What it does not solve for you','Case, script, framework, pipeline',`${T(['Term','What it is','Example'],[
  ['Test case','The design: preconditions, inputs, steps, expected result','“Registered user logs in with valid credentials and sees the dashboard”'],
  ['Test script','Code that executes one or more test cases','login.spec.ts'],
  ['Test suite','A group of scripts run together for a purpose','The smoke suite, the nightly regression suite'],
  ['Framework','The shared structure scripts rely on: runner, config, fixtures, abstractions, reporting','Playwright Test plus your pages/, utils/ and fixtures'],
  ['Pipeline','The CI/CD process that triggers suites and acts on the results','A GitHub Actions workflow running smoke on every PR']])}
 ${CO('note','Key idea','People often say “the framework” when they mean the tool. Playwright, Cypress and Selenium are tools; the framework is what your team builds around them.')}`);
addSec('what-is-automation','Case, script, framework, pipeline','When does automation pay back?',`<p>A simple break-even estimate compares the cost of building a check with what it saves on each run:</p>
<pre class="code"><span class="k">build cost</span>        = 40 h   <span class="c"># write, review, stabilise</span>
<span class="k">manual run</span>        = 2 h    <span class="c"># per execution</span>
<span class="k">automated upkeep</span>  = 0.4 h  <span class="c"># per execution: maintenance, reviewing failures</span>

<span class="k">saving per run</span>    = 2 − 0.4        = <span class="s">1.6 h</span>
<span class="k">break-even</span>        = 40 / 1.6       = <span class="s">25 runs</span></pre>
 <p>Run on every pull request — say 10 times a week — this check pays back in under a month. Run once a quarter, it takes six years. Note the upkeep term: a flaky or brittle test raises it, and past 2 hours per run the check never pays back at all.</p>
 ${CO('tip','Tip','The numbers are rough, but estimating them forces the right questions: how often will this run, and how much will it cost to keep alive?')}`);
addSrc('what-is-automation','checking');

addSec('manual-vs-automated','How to read the table','Testing vs checking',`<p>James Bach and Michael Bolton distinguish <b>checking</b> — making evaluations by applying algorithmic decision rules to specific observations — from <b>testing</b>, the wider process of evaluating a product by learning about it through exploration and experiment. Automation can do checking; testing includes checking but also questioning, modelling and noticing the unexpected.</p>
 ${CO('note','Key idea','An automated check answers exactly the question it was written to ask. Deciding which questions to ask, and noticing the ones nobody wrote down, is the human part.')}`);
addSec('manual-vs-automated','Testing vs checking','A hybrid week in practice',T(['When','Automated','Human'],[
  ['Every commit / PR','Unit, API and smoke suites give fast feedback','Review failures; decide fix vs flaky'],
  ['New feature','Automate stable acceptance criteria once behaviour settles','Time-boxed exploratory sessions with a charter while it is new'],
  ['Nightly','Full cross-browser regression','Triage overnight failures in the morning'],
  ['Before release','Release smoke and critical journeys','Exploratory pass on risky areas; usability and accessibility review'],
  ['After an incident','Add a regression check that reproduces the bug','Root-cause analysis: why did no test catch it?']]));

addSec('test-levels','Choosing the level','Pyramid, trophy and ice-cream cone',`${T(['Shape','Idea','When it fits'],[
  ['Test pyramid (Cohn, popularised by Fowler)','Many fast unit tests, fewer service/API tests, few UI tests','Most back-end-heavy systems'],
  ['Testing trophy (Kent C. Dodds)','Static analysis at the base, most weight on integration tests, few E2E','Front-end apps where integration tests give the best confidence per cost'],
  ['Ice-cream cone (anti-pattern)','Mostly manual and UI tests, few unit tests','Never on purpose: slow, brittle, expensive feedback']])}
 <p>The shapes disagree on detail but agree on the point: push checks down to the fastest level that still catches the risk, and keep end-to-end tests for journeys that only make sense end to end.</p>`);
addSec('test-levels','Pyramid, trophy and ice-cream cone','Test doubles',`${T(['Double','What it does','Example'],[
  ['Dummy','Passed around but never used','A placeholder logger argument'],
  ['Stub','Returns canned answers','Payment API always returns “approved”'],
  ['Spy','A stub that also records how it was called','Check the email service was called once'],
  ['Mock','Pre-programmed with expectations; fails the test if calls don’t match','Expect exactly one call to charge(49.99)'],
  ['Fake','A working, simplified implementation','An in-memory database']])}
 ${CO('risk','Risk','Every double replaces a real integration with an assumption about it. Keep a few tests against the real thing, or a contract test, so the assumptions get checked.')}`);
addSrc('test-levels','fowlerpyr','fowlerdbl');

addSec('playwright','Key concepts','playwright.config.ts, line by line',`<p>This is close to what <code class="i">npm init playwright@latest</code> generates, with the most useful options added:</p>
<pre class="code"><span class="k">import</span> { defineConfig, devices } <span class="k">from</span> <span class="s">'@playwright/test'</span>;

<span class="k">export default</span> defineConfig({
  testDir: <span class="s">'./tests'</span>,
  fullyParallel: <span class="k">true</span>,                     <span class="c">// run tests inside a file in parallel too</span>
  forbidOnly: !!process.env.CI,              <span class="c">// fail CI if someone left test.only in</span>
  retries: process.env.CI ? <span class="s">2</span> : <span class="s">0</span>,         <span class="c">// retries in CI only — and watch the flaky count</span>
  workers: process.env.CI ? <span class="s">1</span> : <span class="k">undefined</span>, <span class="c">// scaffold default; raise it if your CI and backend can take it</span>
  reporter: [[<span class="s">'html'</span>], [<span class="s">'junit'</span>, { outputFile: <span class="s">'results/junit.xml'</span> }]],
  use: {
    baseURL: process.env.BASE_URL ?? <span class="s">'http://localhost:3000'</span>,
    trace: <span class="s">'on-first-retry'</span>,                <span class="c">// evidence exactly when a test is flaky</span>
    screenshot: <span class="s">'only-on-failure'</span>,
  },
  projects: [
    { name: <span class="s">'chromium'</span>, use: { ...devices[<span class="s">'Desktop Chrome'</span>] } },
    { name: <span class="s">'firefox'</span>,  use: { ...devices[<span class="s">'Desktop Firefox'</span>] } },
    { name: <span class="s">'webkit'</span>,   use: { ...devices[<span class="s">'Desktop Safari'</span>] } },
  ],
});</pre>
 ${CO('tip','Tip','Everything under use can be overridden per project. A “mobile” project with devices[\'Pixel 7\'] runs the same tests with a mobile viewport and user agent.')}`);
addSec('playwright','playwright.config.ts, line by line','Locators, in priority order',`${T(['Locator','Use it for'],[
  ['getByRole(role, { name })','Almost everything interactive: buttons, links, headings, checkboxes. First choice.'],
  ['getByLabel(text)','Form fields with a label'],
  ['getByPlaceholder(text)','Inputs without a label (and ask for a label — it is an accessibility defect)'],
  ['getByText(text)','Non-interactive text content'],
  ['getByAltText / getByTitle','Images and elements with a title'],
  ['getByTestId(id)','When nothing user-facing is stable; uses data-testid by default'],
  ['locator(css or xpath)','Last resort — tied to implementation details']])}
 <pre class="code"><span class="c">// narrow down instead of writing long CSS chains</span>
<span class="k">const</span> row = page.getByRole(<span class="s">'row'</span>).filter({ hasText: <span class="s">'Ada Lovelace'</span> });
<span class="k">await</span> row.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Edit'</span> }).click();</pre>
 ${CO('note','Key idea','Locators are strict: if one matches several elements, actions throw rather than guess. That turns an ambiguous selector into a clear error, not a flaky click on the wrong row.')}`);
addSec('playwright','Locators, in priority order','Anatomy of a test',`<pre class="code"><span class="k">import</span> { test, expect } <span class="k">from</span> <span class="s">'@playwright/test'</span>;

test.describe(<span class="s">'Contacts'</span>, () =&gt; {
  test.beforeEach(<span class="k">async</span> ({ page }) =&gt; {
    <span class="k">await</span> page.goto(<span class="s">'/contacts'</span>);
  });

  test(<span class="s">'user can add a contact'</span>, { tag: <span class="s">'@smoke'</span> }, <span class="k">async</span> ({ page }) =&gt; {
    <span class="k">await</span> test.step(<span class="s">'fill in the form'</span>, <span class="k">async</span> () =&gt; {
      <span class="k">await</span> page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'New contact'</span> }).click();
      <span class="k">await</span> page.getByLabel(<span class="s">'Name'</span>).fill(<span class="s">'Ada Lovelace'</span>);
      <span class="k">await</span> page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Save'</span> }).click();
    });
    <span class="k">await</span> expect(page.getByRole(<span class="s">'row'</span>, { name: <span class="s">/Ada Lovelace/</span> })).toBeVisible();
  });
});</pre>
 ${UL(['<b>test.describe</b> groups tests; hooks inside apply only to that group.','<b>test.step</b> names a block so it shows up as one step in the report and trace.','<b>Tags</b> such as @smoke let you run a subset: <code class="i">npx playwright test --grep @smoke</code>.','Useful debugging flags: <code class="i">--debug</code> (Inspector), <code class="i">--last-failed</code>, <code class="i">--repeat-each=20</code> to shake out flakiness.'])}`);
addSrc('playwright','pwcfg','pwloc');

addSec('cypress','How you debug in Cypress','The command queue and retry-ability',`<p>Cypress commands don’t run when they are called. They are <b>queued</b> and run in order later, so you can’t assign their result to a variable the way you would with <code class="i">await</code>. Use <code class="i">.then()</code>, aliases or assertions instead.</p>
 ${UL(['<b>Queries</b> such as <code class="i">cy.get()</code>, <code class="i">.find()</code> and <code class="i">cy.contains()</code> are retried together with the assertions chained after them, until they pass or time out (4 s by default).','<b>Actions</b> such as <code class="i">.click()</code> and <code class="i">.type()</code> are not retried, though Cypress waits for the element to be actionable first.','Put the assertion right after the query it depends on, so the retry covers the whole chain.'])}
<pre class="code"><span class="c">// wait for the real signal, not for a number of milliseconds</span>
cy.intercept(<span class="s">'POST'</span>, <span class="s">'/api/contacts'</span>).as(<span class="s">'createContact'</span>);
cy.visit(<span class="s">'/contacts'</span>);
cy.get(<span class="s">'[data-cy=new-contact]'</span>).click();
cy.get(<span class="s">'[data-cy=name]'</span>).type(<span class="s">'Ada Lovelace'</span>);
cy.get(<span class="s">'[data-cy=save]'</span>).click();
cy.wait(<span class="s">'@createContact'</span>).its(<span class="s">'response.statusCode'</span>).should(<span class="s">'eq'</span>, <span class="s">201</span>);
cy.contains(<span class="s">'tr'</span>, <span class="s">'Ada Lovelace'</span>).should(<span class="s">'be.visible'</span>);</pre>`);
addSec('cypress','The command queue and retry-ability','Project layout and good habits',`<pre class="code"><span class="k">cypress/</span>
├── <span class="k">e2e/</span>          <span class="s">contacts.cy.ts</span>
├── <span class="k">component/</span>    <span class="s">DatePicker.cy.tsx</span>
├── <span class="k">fixtures/</span>     <span class="s">contact.json</span>        <span class="c"># static data for cy.fixture() and stubs</span>
└── <span class="k">support/</span>      <span class="s">e2e.ts  commands.ts</span>  <span class="c"># global hooks and custom commands</span>
<span class="s">cypress.config.ts</span>                   <span class="c"># defineConfig({ e2e: { baseUrl } })</span></pre>
 ${UL(['Select elements with dedicated attributes such as <code class="i">data-cy</code>, which the Cypress best-practice guide recommends over classes or text that change with styling.','Log in once per spec with <code class="i">cy.session()</code>, which caches cookies and storage and restores them on later calls.','Set state through the API or <code class="i">cy.task()</code> rather than clicking through the UI to get there.','Don’t use <code class="i">cy.wait(5000)</code>. Wait on an aliased request or an assertion.','Keep tests independent: every test should be able to run on its own.'])}`);
addSrc('cypress','cybp','cyretry','cysess');

addSec('selenium','Setting up','Waiting the right way',`<p>Selenium doesn’t auto-wait the way Playwright and Cypress do, so synchronisation is where most Selenium suites go wrong. Use <b>explicit waits</b>, which poll for a condition up to a timeout.</p>
<pre class="code"><span class="c">// Java</span>
WebDriverWait wait = <span class="k">new</span> WebDriverWait(driver, Duration.ofSeconds(<span class="s">10</span>));
WebElement save = wait.until(ExpectedConditions.elementToBeClickable(By.id(<span class="s">"save"</span>)));
save.click();

<span class="c"># Python</span>
<span class="k">from</span> selenium.webdriver.support.ui <span class="k">import</span> WebDriverWait
<span class="k">from</span> selenium.webdriver.support <span class="k">import</span> expected_conditions <span class="k">as</span> EC
save = WebDriverWait(driver, <span class="s">10</span>).until(EC.element_to_be_clickable((By.ID, <span class="s">"save"</span>)))
save.click()</pre>
 ${CO('risk','Risk','The Selenium docs warn against mixing implicit and explicit waits: it can cause unpredictable wait times. Pick explicit waits and leave the implicit wait at zero.')}`);
addSec('selenium','Waiting the right way','Building a framework around WebDriver',`${T(['Language','Common runner','Typical additions'],[
  ['Java','JUnit 5 or TestNG','AssertJ, Allure reports, Maven/Gradle'],
  ['Python','pytest','pytest fixtures, pytest-xdist for parallel runs, pytest-html'],
  ['C#','NUnit or xUnit','FluentAssertions, dotnet test'],
  ['JavaScript','Mocha or Jest (or WebdriverIO, which wraps WebDriver)','Chai, reporters of choice']])}
 ${UL(['A <b>driver factory</b> creates local or remote (Grid) sessions from configuration.','<b>Page Objects</b> own locators and waits, and the Selenium docs themselves recommend them.','Always quit the driver in teardown, even when a test fails, or Grid nodes fill up with orphaned sessions.','Capture a screenshot and the page source on failure: Selenium has no trace viewer, so these are your evidence.'])}`);
addSrc('selenium','sewait','sepo');

addSec('compare-tools','Capability comparison','Languages and ecosystems',T(['','Playwright','Cypress','Selenium'],[
  ['Official languages','TypeScript/JavaScript, Python, Java, .NET','JavaScript/TypeScript','Java, Python, C#, Ruby, JavaScript'],
  ['Mobile','Mobile emulation (viewport, touch, user agent)','Viewport emulation','Real devices via Appium (WebDriver protocol)'],
  ['Multiple tabs / origins','Supported','Limited; cy.origin() for other origins','Supported'],
  ['Licence','Apache-2.0','MIT (app); Cloud is commercial','Apache-2.0']]));
addSec('compare-tools','Decide with context','Migrating between tools',OL(['Inventory the current suite: which tests carry real risk coverage, which are redundant, which are always flaky?','Migrate by <b>value</b>, not file by file. Start with smoke and critical journeys.','Run old and new suites side by side for a period and compare what they catch.','Port the framework ideas (data, fixtures, page objects), not line-by-line syntax.','Retire old tests only once their coverage exists in the new suite.','Update docs, CI and ownership as part of the migration, not afterwards.'])+CO('risk','Risk','A migration that ports every test unchanged also ports every weak assertion and flaky pattern. Use it as a chance to delete tests that give no information.'));

addSec('api-testing','Contracts and schemas','Schema validation example',`<pre class="code"><span class="k">import</span> Ajv <span class="k">from</span> <span class="s">'ajv'</span>;
<span class="k">const</span> ajv = <span class="k">new</span> Ajv();
<span class="k">const</span> contactSchema = {
  type: <span class="s">'object'</span>,
  required: [<span class="s">'id'</span>, <span class="s">'name'</span>, <span class="s">'email'</span>],
  properties: { id: { type: <span class="s">'string'</span> }, name: { type: <span class="s">'string'</span> }, email: { type: <span class="s">'string'</span> } },
  additionalProperties: <span class="k">false</span>,        <span class="c">// catches accidental data leaks, e.g. passwordHash</span>
};
<span class="k">const</span> validate = ajv.compile(contactSchema);

test(<span class="s">'GET /api/contacts/:id matches the schema'</span>, <span class="k">async</span> ({ request }) =&gt; {
  <span class="k">const</span> res = <span class="k">await</span> request.get(<span class="s">\`/api/contacts/\${id}\`</span>);
  expect(validate(<span class="k">await</span> res.json()), JSON.stringify(validate.errors)).toBe(<span class="k">true</span>);
});</pre>
 ${CO('tip','Tip','additionalProperties: false turns the schema into a small security check: a new field such as passwordHash in a response fails the test instead of leaking unnoticed.')}`);

addSec('framework-architecture','Page Object Model','Design principles for test code',`${T(['Principle','In test code'],[
  ['Single responsibility','A page object models one page or component; a fixture sets up one thing'],
  ['DAMP over DRY in tests','Tests should be Descriptive And Meaningful Phrases. Some repetition is fine if it keeps each test readable on its own; remove duplication in helpers, not in the story a test tells.'],
  ['Assertions in tests','Page objects expose state; tests decide what is correct. Hidden assertions make failures hard to read.'],
  ['Explicit over magic','Prefer visible fixtures and parameters to global state and implicit hooks'],
  ['Composition over inheritance','Deep BasePage → AuthPage → AdminPage hierarchies get fragile; compose small components instead'],
  ['KISS','Every abstraction should pay for itself. If a new engineer needs a diagram to follow one test, simplify.']])}`);
addSec('framework-architecture','Design principles for test code','A Page Object in TypeScript',`<pre class="code"><span class="c">// pages/LoginPage.ts</span>
<span class="k">import</span> { type Page, type Locator } <span class="k">from</span> <span class="s">'@playwright/test'</span>;

<span class="k">export class</span> LoginPage {
  <span class="k">readonly</span> email: Locator;
  <span class="k">readonly</span> password: Locator;
  <span class="k">readonly</span> submit: Locator;
  <span class="k">readonly</span> error: Locator;

  <span class="k">constructor</span>(<span class="k">private readonly</span> page: Page) {
    <span class="k">this</span>.email = page.getByLabel(<span class="s">'Email'</span>);
    <span class="k">this</span>.password = page.getByLabel(<span class="s">'Password'</span>);
    <span class="k">this</span>.submit = page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Log in'</span> });
    <span class="k">this</span>.error = page.getByRole(<span class="s">'alert'</span>);
  }
  <span class="k">async</span> goto() { <span class="k">await this</span>.page.goto(<span class="s">'/login'</span>); }
  <span class="k">async</span> login(email: string, password: string) {
    <span class="k">await this</span>.email.fill(email);
    <span class="k">await this</span>.password.fill(password);
    <span class="k">await this</span>.submit.click();
  }
}

<span class="c">// the test keeps the assertion</span>
<span class="k">await</span> loginPage.login(<span class="s">'ada@example.test'</span>, <span class="s">'wrong'</span>);
<span class="k">await</span> expect(loginPage.error).toHaveText(<span class="s">'Invalid email or password'</span>);</pre>
 ${CO('note','Key idea','Exposing locators as read-only properties lets tests assert on them with web-first assertions, without the page object deciding what “correct” means.')}`);
addSrc('framework-architecture','fowlerpo','sepo');

addSec('framework-docs','Quality criteria','A README template',`<pre class="code"><span class="k"># qa-automation</span>
End-to-end and API tests for the Contacts app.

<span class="k">## Prerequisites</span>
Node 22+ · access to the staging environment · a .env file (see .env.example)

<span class="k">## Quick start</span>
npm ci
npx playwright install --with-deps
npx playwright test --grep @smoke        # should pass in about 2 minutes

<span class="k">## Running</span>
| Goal                 | Command                                  |
| One file             | npx playwright test tests/ui/login.spec.ts |
| Smoke                | npx playwright test --grep @smoke        |
| What CI runs on PRs  | npm run test:pr                          |
| Debug                | npx playwright test --debug              |

<span class="k">## Learn more</span>
docs/architecture.md · docs/test-data.md · docs/troubleshooting.md · CONTRIBUTING.md

<span class="k">## Owners</span>
#qa-automation channel · on-call rota in docs/ownership.md</pre>
 ${CO('tip','Tip','Test the README the way you test code: once a quarter, have someone new follow it on a clean machine and fix every step that fails.')}`);

addSec('project-structure','Recommended layout','Tags, suites and environments',`<pre class="code"><span class="c">// tag tests once…</span>
test(<span class="s">'user can log in'</span>, { tag: [<span class="s">'@smoke'</span>, <span class="s">'@auth'</span>] }, <span class="k">async</span> ({ page }) =&gt; { … });

<span class="c"># …and select suites from the command line or package.json scripts</span>
<span class="k">npx playwright test</span> <span class="s">--grep @smoke</span>
<span class="k">npx playwright test</span> <span class="s">--grep-invert @slow</span>
<span class="k">npx playwright test</span> <span class="s">--project=chromium tests/api</span>

<span class="c"># one codebase, several environments: read config from the environment</span>
<span class="k">BASE_URL</span>=https://staging.example.test <span class="k">npx playwright test</span></pre>
 ${UL(['Name specs after behaviour: <code class="i">registration.spec.ts</code>, not <code class="i">test1.spec.ts</code>.','Name tests as outcomes a stakeholder would recognise: “locked user sees an error”, not “login test 3”.','Keep environment-specific values (URLs, feature flags) in environment variables or per-environment config, never in test code.','Commit a <code class="i">.env.example</code> with placeholder values and git-ignore the real <code class="i">.env</code>.'])}`);

addSec('ci-cd','Suites by stage','A GitHub Actions workflow with sharding',`<p>Sharding splits the suite across several machines; each shard runs a slice. Playwright’s <code class="i">blob</code> reporter lets you merge the shards into one HTML report afterwards.</p>
<pre class="code"><span class="k">name:</span> e2e
<span class="k">on:</span> [pull_request]
<span class="k">jobs:</span>
  <span class="k">test:</span>
    <span class="k">runs-on:</span> ubuntu-latest
    <span class="k">strategy:</span>
      <span class="k">fail-fast:</span> false
      <span class="k">matrix:</span> { shardIndex: [1, 2, 3, 4], shardTotal: [4] }
    <span class="k">steps:</span>
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }} --reporter=blob
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          QA_PASS: \${{ secrets.QA_PASS }}      <span class="c"># injected at runtime, masked in logs</span>
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with: { name: blob-\${{ matrix.shardIndex }}, path: blob-report, retention-days: 7 }</pre>
 <p>A follow-up job downloads the blob artifacts and runs <code class="i">npx playwright merge-reports --reporter html ./all-blob-reports</code>.</p>
 ${CO('tip','Tip','Action versions move on. Pin the current major versions from each action’s own page, and keep retention short for artifacts that may contain data.')}`);
addSec('ci-cd','Artifacts to keep','Quality gates',T(['Gate','Example rule','Why'],[
  ['Blocking checks','Lint, unit, smoke must pass to merge','Stops obvious breakage early'],
  ['No focused tests','forbidOnly in CI','A stray test.only would silently skip the rest'],
  ['Flaky budget','Pass-on-retry rate under an agreed threshold, e.g. 1%','Keeps retries from hiding decay'],
  ['Duration budget','PR pipeline under ~10–15 minutes','Slow feedback gets bypassed'],
  ['New tests are stable','New or changed tests run with --repeat-each before merge','Catches flakiness before it lands'],
  ['Security','Secret scanning; no artifacts with real personal data','CI is part of the attack surface']]));
addSrc('ci-cd','pwshard','pwci','gha');

addSec('strategy-risk','Risk factors','Measuring the value of automation',`${T(['Metric','What it tells you','Watch out for'],[
  ['Defect escape rate','Bugs found in production that a test could have caught','The most honest measure of coverage value'],
  ['Pass-on-retry (flaky) rate','How much of your green is real','Rising trend = eroding trust'],
  ['Time to feedback','Commit → result on PRs','Long pipelines get bypassed'],
  ['Time to diagnose a failure','How quickly a red build is understood','Poor artifacts, unreadable tests'],
  ['Maintenance effort','Hours spent fixing tests per sprint','Brittle selectors, over-abstraction'],
  ['Risk coverage','Share of high-risk items with an automated check','Better than a raw “% automated”']])}
 ${CO('risk','Risk','Code coverage and test counts are easy to measure and easy to game. Pair them with escape rate and flaky rate so the numbers reflect real confidence.')}`);

addSec('flaky-tests','Wait for a condition, not a clock','A triage workflow',OL(['<b>Detect</b>: flag tests that pass on retry, or that change result on the same commit.','<b>Reproduce</b>: run the test repeatedly — <code class="i">npx playwright test path --repeat-each=30 --workers=4</code> — alone and in parallel with the full suite.','<b>Read the evidence</b>: compare traces, screenshots and logs of passing and failing runs.','<b>Classify the cause</b>: test (timing, data, order), application (a real race condition — a product bug!), or environment (resources, dependencies).','<b>Fix</b> the cause. If you can’t yet, <b>quarantine</b> with an owner, a ticket and an expiry date.','<b>Verify</b>: the fix passes the same repeated run before the test rejoins the blocking suite.','<b>Learn</b>: if the same cause shows up again, fix it in the framework (a fixture, a helper, a lint rule), not test by test.'])+CO('note','Key idea','Some flaky tests are real bugs: a race condition that fails 1 run in 50 in CI will also fail for 1 user in 50. Classify before you blame the test.'));

addSec('security-performance','Performance and scalability','Automated accessibility checks',`<pre class="code"><span class="k">import</span> AxeBuilder <span class="k">from</span> <span class="s">'@axe-core/playwright'</span>;

test(<span class="s">'contacts page has no detectable a11y violations'</span>, <span class="k">async</span> ({ page }) =&gt; {
  <span class="k">await</span> page.goto(<span class="s">'/contacts'</span>);
  <span class="k">const</span> results = <span class="k">await new</span> AxeBuilder({ page })
    .withTags([<span class="s">'wcag2a'</span>, <span class="s">'wcag2aa'</span>])
    .analyze();
  expect(results.violations).toEqual([]);
});</pre>
 ${CO('risk','Risk','Automated scanners catch only part of the accessibility picture: missing labels, contrast, invalid ARIA. Keyboard use, focus order and screen-reader sense still need manual checks.')}`);
addSrc('security-performance','pwa11y','gha');

addSec('failure-modes','Key lessons for a junior automation engineer','A periodic health review',`<p>Once a quarter, spend an hour answering these as a team:</p>${OL(['Which production bugs in the last quarter should a test have caught? Why didn’t one?','Which ten tests failed most often, and were those failures real bugs?','What is the pass-on-retry rate, and is it going up?','How long does the PR pipeline take, and how long did it take three months ago?','Which tests has nobody changed or looked at in a year? Do they still check anything that matters?','Could a new team member add a test today by following the docs alone?'])}
 ${CO('tip','Tip','The framework review checklist in this hub works well as the agenda for this meeting.')}`);

addSec('ai-for-testing','How to evaluate AI testing tools','A safe workflow for AI-generated tests',OL(['Give the AI the <b>requirement and the risks</b>, not just “write tests for this page”.','Ask for <b>test ideas first</b> — positive, negative, boundary, security — and review them before any code is written.','Generate code that follows <b>your</b> conventions: point it at an existing spec, your fixtures and page objects.','Review like a pull request from a new colleague: locators, assertions (are they checking the right thing?), data isolation, waits.','Run the new test against a <b>deliberately broken build</b> or a mutated assertion and confirm it fails. A test that can’t fail is worthless.','Run it repeatedly to check for flakiness before merging.','Keep a human owner for every test, however it was written.'])+CO('risk','Risk','Generated tests often assert what the application currently does, not what it should do. If the app has a bug, the test can lock the bug in.'));

addSec('testing-ai-systems','AI-specific test approaches','Metamorphic testing',`<p>When you can’t say what the correct output is for one input, you can often say how outputs should <b>relate</b> across related inputs. These relations — <b>metamorphic relations</b> — become the oracle.</p>
 ${T(['System','Metamorphic relation'],[
  ['Image classifier','Slightly rotating or brightening a photo of a cat shouldn’t change the label'],
  ['Sentiment model','Replacing a person’s name (“Anna” → “Omar”) shouldn’t change the sentiment — a fairness check too'],
  ['Search / ranking','Adding an irrelevant document shouldn’t push the top result off the first page'],
  ['LLM summariser','Reordering unrelated paragraphs in the input shouldn’t change the key facts in the summary'],
  ['Price model','Increasing floor area, all else equal, shouldn’t lower the predicted price']])}
 ${CO('note','Key idea','Metamorphic testing produces many tests from a few relations and needs no labelled expected outputs, which makes it a practical first step for systems with no reliable oracle.')}`);
addSrc('testing-ai-systems','metam');

/* ---------- new modules: framework engineering ---------- */
const FW_TYPES={id:'framework-types',track:'frame',title:'Framework types: from linear to hybrid',min:12,extra:true,
 sum:'The classic ways to structure an automation framework, what each is good at, and how to choose one for your team.',
 sections:[
  S('The six classic types',T(['Type','How tests are written','Good for','Breaks down when'],[
   ['Linear (record/playback)','One script per test, steps recorded or written top to bottom','Quick prototypes, learning a tool','Anything changes: every script repeats the same steps'],
   ['Modular','Tests call shared modules (e.g. login(), addToCart())','Removing duplication','Modules grow into a tangle without clear layers'],
   ['Library architecture','Shared functions packaged as a library the tests import','Several teams reusing the same actions','The library becomes a dumping ground'],
   ['Data-driven','One test logic, many rows of input and expected output','Business rules, validation, calculations','Logic varies per row; the data file becomes code'],
   ['Keyword-driven','Tests are tables of keywords (“Open Browser”, “Input Text”) implemented once in code','Non-programmers writing tests; Robot Framework','Keywords multiply and debugging goes through two layers'],
   ['Hybrid','Mixes the above — typically modular code with page objects plus data-driven tests','Most real-world frameworks','Nobody wrote down which style to use where']])+CO('note','Key idea','Nearly every modern Playwright or Selenium framework is a hybrid: modular page objects and fixtures, data-driven where the data varies, and sometimes a BDD layer on top.')),
  S('Data-driven tests in Playwright',`<pre class="code"><span class="c">// tests/api/discount.spec.ts</span>
<span class="k">const</span> cases = [
  { total: <span class="s">49.99</span>,  code: <span class="s">'SAVE10'</span>, expected: <span class="s">49.99</span> },  <span class="c">// below the €50 threshold</span>
  { total: <span class="s">50.00</span>,  code: <span class="s">'SAVE10'</span>, expected: <span class="s">45.00</span> },  <span class="c">// on the boundary</span>
  { total: <span class="s">120.00</span>, code: <span class="s">'SAVE10'</span>, expected: <span class="s">108.00</span> },
  { total: <span class="s">120.00</span>, code: <span class="s">'EXPIRED'</span>, expected: <span class="s">120.00</span> },
];

<span class="k">for</span> (<span class="k">const</span> c <span class="k">of</span> cases) {
  test(<span class="s">\`\${c.code} on €\${c.total} → €\${c.expected}\`</span>, <span class="k">async</span> ({ request }) =&gt; {
    <span class="k">const</span> res = <span class="k">await</span> request.post(<span class="s">'/api/price'</span>, { data: c });
    expect((<span class="k">await</span> res.json()).total).toBe(c.expected);
  });
}</pre>
 ${UL(['Put the case description in the test title so a failure names the row that broke.','Keep data next to the test while it is small; move it to <code class="i">tests/data/*.json</code> or CSV when business people maintain it.','Derive rows from test-design techniques — partitions and boundaries — not from whatever values come to mind.'])}`),
  S('Keyword-driven and BDD',`<p><b>Keyword-driven</b> (Robot Framework style) — a test is a table of keywords with arguments:</p>
<pre class="code"><span class="k">*** Test Cases ***</span>
Valid Login
    Open Browser To Login Page
    Input Username    ada@example.test
    Input Password    \${VALID_PASSWORD}
    Submit Credentials
    Dashboard Should Be Open</pre>
 <p><b>BDD</b> (Cucumber/Gherkin style) — scenarios in business language, each step bound to code:</p>
<pre class="code"><span class="k">Feature:</span> Discount codes
  <span class="k">Scenario Outline:</span> SAVE10 applies from €50
    <span class="k">Given</span> a basket worth &lt;total&gt;
    <span class="k">When</span> I apply the code "SAVE10"
    <span class="k">Then</span> I pay &lt;expected&gt;
    <span class="k">Examples:</span>
      | total  | expected |
      | 49.99  | 49.99    |
      | 50.00  | 45.00    |</pre>
 ${CO('risk','Risk','BDD pays off when product people actually read or write the scenarios. If only engineers ever touch the .feature files, you have added a translation layer and a second place for bugs, with no one reading the result.')}`),
  S('Choosing a type',T(['If…','Lean towards'],[
   ['Engineers write and maintain all tests','Code-first hybrid: page objects, fixtures, data-driven where useful'],
   ['Manual testers or analysts will write tests','Keyword-driven (Robot Framework) or a low-code tool'],
   ['Product owners collaborate on acceptance criteria','BDD — with a real three-amigos habit, not just Gherkin syntax'],
   ['The same rule must be checked with many inputs','Data-driven, ideally at API level'],
   ['You need something working this week','Start modular and simple; add layers only when duplication hurts']])+CO('tip','Tip','Write down the decision and its reason in docs/architecture.md. “Why don’t we use BDD?” is one of the debates that keeps coming back.')),
 ],
 quiz:[
  {q:'Which framework type separates one piece of test logic from many rows of inputs and expected results?',o:['Linear','Keyword-driven','Data-driven','Library architecture'],a:2,why:'Data-driven frameworks run the same logic against many data rows.'},
  {q:'A team of manual testers with little coding experience will write most tests. Which type suits them best?',o:['Linear record/playback forever','Keyword-driven, e.g. Robot Framework','Pure code-first TypeScript','None — they shouldn’t write tests'],a:1,why:'Keywords let non-programmers compose tests while engineers implement the keywords.'},
  {q:'Most modern Playwright frameworks are best described as…',o:['Linear','Keyword-driven','Hybrid','Record/playback'],a:2,why:'They mix modular page objects and fixtures with data-driven tests.'},
  {q:'Only engineers ever read or write the team’s Gherkin files. What is the main drawback?',o:['Gherkin is slow','An extra translation layer with none of the collaboration benefit BDD is for','Cucumber can’t run in CI','Scenarios can’t be data-driven'],a:1,why:'BDD’s value is shared understanding with the business; without that, it is overhead.'},
  {q:'In a data-driven test, why include the row’s values in the test title?',o:['Titles must be unique and a failure then names the exact row that broke','It makes tests faster','Playwright requires it','For code coverage'],a:0,why:'Unique, descriptive titles make reports readable and are required when tests are generated in a loop.'},
  {q:'Where should the rows for a data-driven discount test come from?',o:['Random values','Equivalence partitions and boundary values of the discount rule','Production logs only','Whatever the developer used'],a:1,why:'Test-design techniques turn a rule into a small set of meaningful rows.'},
 ],src:['robot','cucumber','pwparam','yk']};

const DESIGN_PATTERNS={id:'design-patterns',track:'frame',title:'Design patterns for test code',min:13,extra:true,
 sum:'Page Objects are only the start. Component objects, Screenplay, builders, factories and API clients keep larger frameworks readable.',
 sections:[
  S('The patterns at a glance',T(['Pattern','Problem it solves','Use it when'],[
   ['Page Object','Locators and interactions scattered across tests','Pages are fairly distinct'],
   ['Component object','The same widget (date picker, table, nav) on many pages','Your app is built from reusable UI components'],
   ['Screenplay','Page objects grow into god classes; tests read as clicks','Large suites, many actors and roles'],
   ['Builder / factory','Test data setup is long and noisy','Objects have many fields with sensible defaults'],
   ['API client wrapper','HTTP details (URLs, headers, auth) repeated in tests','Tests set up state via the API'],
   ['Fluent interface','Long sequences of steps are hard to read','Workflows are linear and well-known'],
   ['Strategy / config object','Behaviour varies by environment or browser','Several environments or run modes']])),
  S('Component objects',`<pre class="code"><span class="c">// components/DataTable.ts — reusable on every page that has a table</span>
<span class="k">export class</span> DataTable {
  <span class="k">constructor</span>(<span class="k">private readonly</span> root: Locator) {}
  row(text: string) { <span class="k">return this</span>.root.getByRole(<span class="s">'row'</span>).filter({ hasText: text }); }
  <span class="k">async</span> sortBy(column: string) {
    <span class="k">await this</span>.root.getByRole(<span class="s">'columnheader'</span>, { name: column }).click();
  }
}

<span class="c">// pages/ContactsPage.ts — composes components instead of inheriting</span>
<span class="k">export class</span> ContactsPage {
  <span class="k">readonly</span> table: DataTable;
  <span class="k">constructor</span>(page: Page) { <span class="k">this</span>.table = <span class="k">new</span> DataTable(page.getByRole(<span class="s">'table'</span>)); }
}</pre>
 ${CO('tip','Tip','Scope a component to its root locator. Then two tables on one page don’t interfere, and the component works wherever it is placed.')}`),
  S('The Screenplay pattern',`<p>Screenplay models tests around <b>actors</b> who have <b>abilities</b> (browse the web, call an API), perform <b>tasks</b> made of <b>interactions</b>, and ask <b>questions</b> about the system’s state. Serenity BDD (Java, and Serenity/JS) is the best-known implementation.</p>
<pre class="code"><span class="c">// pseudo-code in Screenplay style</span>
<span class="k">const</span> ada = Actor.named(<span class="s">'Ada'</span>).whoCan(BrowseTheWeb.using(page), CallAnApi.at(baseURL));

<span class="k">await</span> ada.attemptsTo(
  LogIn.withCredentials(adaAccount),
  AddContact.called(<span class="s">'Grace Hopper'</span>),
);
<span class="k">await</span> ada.should(seeThat(TheContactList.names(), includes(<span class="s">'Grace Hopper'</span>)));</pre>
 ${UL(['<b>Strength:</b> small, single-purpose classes; reads as business behaviour; scales to many roles.','<b>Cost:</b> more concepts and files. For a small suite, page objects plus fixtures are usually enough.'])}`),
  S('Builders and factories for test data',`<pre class="code"><span class="c">// utils/builders.ts</span>
<span class="k">export const</span> aContact = (overrides: Partial&lt;Contact&gt; = {}): Contact =&gt; ({
  name: <span class="s">'Test Contact'</span>,
  email: <span class="s">\`contact+\${crypto.randomUUID()}@example.test\`</span>,   <span class="c">// unique by default</span>
  phone: <span class="s">'+44 20 7946 0000'</span>,
  tags: [],
  ...overrides,                                             <span class="c">// the test states only what matters</span>
});

<span class="c">// in a test: the one field that matters is the one you see</span>
<span class="k">const</span> contact = aContact({ name: <span class="s">'x'</span>.repeat(<span class="s">256</span>) });   <span class="c">// boundary: max length + 1</span></pre>
 ${CO('note','Key idea','With a builder, a test mentions only the data that matters to its outcome. The reader can see at once why this test differs from the others.')}`),
  S('API client wrappers',`<pre class="code"><span class="c">// utils/apiClient.ts</span>
<span class="k">export class</span> ContactsApi {
  <span class="k">constructor</span>(<span class="k">private readonly</span> request: APIRequestContext) {}
  <span class="k">async</span> create(c: Contact) {
    <span class="k">const</span> res = <span class="k">await this</span>.request.post(<span class="s">'/api/contacts'</span>, { data: c });
    expect(res, <span class="s">'setup: create contact'</span>).toBeOK();   <span class="c">// fail loudly if setup breaks</span>
    <span class="k">return</span> (<span class="k">await</span> res.json()) <span class="k">as</span> Contact &amp; { id: string };
  }
  delete(id: string) { <span class="k">return this</span>.request.delete(<span class="s">\`/api/contacts/\${id}\`</span>); }
}</pre>
 <p>Expose the wrapper through a fixture and tests read as <code class="i">await contactsApi.create(aContact())</code>. Keep a thin, raw-request path for tests <i>of</i> the API itself — those need to see status codes and headers the wrapper hides.</p>`),
  S('Anti-patterns to avoid',UL(['<b>God page object</b> — one class with every workflow in the app.','<b>Deep inheritance</b> — BasePage → LoggedInPage → AdminPage → … where a change at the top breaks everything.','<b>Assertions hidden in helpers</b> — failures point at a helper, not at what the test expected.','<b>Sleep-based helpers</b> — <code class="i">waitABit()</code> wrapped in a nice name is still a sleep.','<b>Speculative abstraction</b> — layers written “in case we need them”. Add a layer when duplication hurts, not before.','<b>Shared mutable singletons</b> — a global “current user” that parallel tests overwrite.'])+CO('risk','Risk','Every pattern here is a tool against a specific problem. Adopting all of them in a 30-test suite produces a framework only its author can follow.')),
 ],
 quiz:[
  {q:'The same date picker appears on 12 pages. Which pattern avoids duplicating its logic?',o:['A bigger page object per page','A component object scoped to the widget’s root locator','Screenplay actors','Keyword tables'],a:1,why:'Component objects model reusable widgets once and compose into pages.'},
  {q:'In the Screenplay pattern, what performs tasks?',o:['Pages','Actors with abilities','Fixtures','Reporters'],a:1,why:'Actors have abilities (browse, call an API) and perform tasks made of interactions.'},
  {q:'What is the main benefit of a test-data builder with defaults and overrides?',o:['Faster execution','Tests state only the data relevant to their outcome','It replaces assertions','It encrypts data'],a:1,why:'Defaults hide noise; overrides highlight what the test is about.'},
  {q:'Why keep a raw-request path when you have a ContactsApi wrapper?',o:['Wrappers are slow','Tests of the API itself must see status codes and headers the wrapper hides','Raw requests are more secure','Playwright requires it'],a:1,why:'Wrappers are for setup; API tests need direct access to the response details.'},
  {q:'A helper called waitForPageToSettle() contains waitForTimeout(3000). What is it?',o:['A condition-based wait','A sleep with a nice name — an anti-pattern','A fixture','A web-first assertion'],a:1,why:'Naming a sleep doesn’t make it wait for a real condition.'},
  {q:'A 30-test suite already has page objects, Screenplay, three builder layers and a DI container. Which anti-pattern?',o:['God page object','Speculative abstraction / over-engineering','Missing assertions','Shared data'],a:1,why:'Abstractions should pay for themselves; small suites rarely need all of them.'},
 ],src:['fowlerpo','sepo','screenplay','yk']};

const TEST_DATA={id:'test-data',track:'frame',title:'Test data management',min:11,extra:true,
 sum:'Most flaky and order-dependent tests are data problems. Create data deliberately, keep it isolated, and clean it up.',
 sections:[
  S('Strategies compared',T(['Strategy','How','Strengths','Risks'],[
   ['Create via API per test','Fixture or builder calls the API in setup','Fast, isolated, realistic business rules','Needs a usable API; cleanup required'],
   ['Seed the database','SQL scripts or migrations load a known state','Complete control, good for complex states','Bypasses business rules; tied to the schema'],
   ['Static fixtures','JSON/CSV files checked into the repo','Simple, reviewable, deterministic','Goes stale; shared records collide in parallel'],
   ['Synthetic / generated','Libraries such as Faker generate realistic values','Variety, no personal data','Random data can make failures hard to reproduce'],
   ['Masked production copy','Anonymised subset of real data','Realistic volume and edge cases','Privacy risk if masking is incomplete; legal review'],
   ['Service virtualisation / mocks','Stub external systems’ responses','Controls third parties and rare errors','Drifts from the real service']])),
  S('Rules that keep data from causing flakiness',OL(['<b>Unique per test</b>: generate identifiers with a UUID or run id. Never share a “test user” between parallel tests.','<b>Own what you assert on</b>: a test should create, or exclusively own, the records whose state it checks.','<b>Read-only shared data is fine</b>: reference data (countries, product catalogue) can be seeded once.','<b>Namespace by run</b>: prefix data with a run id so a cleanup job can remove everything a run created.','<b>Seed randomness</b>: when using generated values, log the seed so a failure can be replayed.','<b>No production personal data</b> in tests, fixtures, logs or artifacts.'])),
  S('Cleanup that survives failure',`<pre class="code"><span class="c">// fixture teardown runs even when the test fails</span>
contact: <span class="k">async</span> ({ contactsApi }, use) =&gt; {
  <span class="k">const</span> c = <span class="k">await</span> contactsApi.create(aContact({ name: <span class="s">\`run-\${RUN_ID}-contact\`</span> }));
  <span class="k">await</span> use(c);
  <span class="k">await</span> contactsApi.delete(c.id);
},</pre>
 ${UL(['Prefer teardown in fixtures over cleanup steps at the end of a test, which are skipped when an assertion fails first.','Add a <b>sweeper</b>: a scheduled job that deletes anything older than a day with a test prefix. It catches what teardown missed after crashes.','For big states, consider <b>ephemeral environments</b>: create a fresh database or environment per pipeline run and throw it away.'])}
 ${CO('tip','Tip','If cleanup is hard, check whether the test even needs to delete: data in a unique namespace that nothing else reads does no harm until the sweeper removes it.')}`),
  S('Generated data, reproducibly',`<pre class="code"><span class="k">import</span> { faker } <span class="k">from</span> <span class="s">'@faker-js/faker'</span>;

<span class="k">const</span> seed = Number(process.env.DATA_SEED ?? Date.now());
faker.seed(seed);
console.log(<span class="s">\`test data seed: \${seed}\`</span>);          <span class="c">// rerun with DATA_SEED=… to reproduce</span>

<span class="k">const</span> contact = aContact({ name: faker.person.fullName(), email: faker.internet.email() });</pre>
 ${CO('risk','Risk','Generated names include apostrophes, accents and long strings — good for finding bugs, but only useful if you can reproduce the failing value. Always log the seed or the value.')}`),
 ],
 quiz:[
  {q:'Two parallel tests both log in as qa-user@example.test and edit the same profile. What is the most likely outcome?',o:['Faster tests','Intermittent failures from collisions on shared data','Better coverage','Nothing'],a:1,why:'Shared mutable data between parallel workers is a leading cause of flakiness.'},
  {q:'Why put cleanup in fixture teardown rather than at the end of the test body?',o:['It’s faster','Teardown runs even when an assertion fails earlier','Playwright forbids cleanup in tests','It’s required for reports'],a:1,why:'Steps after a failing assertion never run; fixture teardown always does.'},
  {q:'What is the main risk of seeding data directly into the database?',o:['It’s too slow','It can bypass business rules and ties tests to the schema','It can’t be automated','It uses too much memory'],a:1,why:'Direct inserts skip validation the application would apply and break when the schema changes.'},
  {q:'A test with Faker-generated data fails once and can’t be reproduced. What was missing?',o:['More retries','Logging the random seed (or the generated values)','A slower browser','A bigger dataset'],a:1,why:'With the seed you can regenerate exactly the same data.'},
  {q:'Which data is generally safe to share between parallel tests?',o:['A shared shopping cart','Read-only reference data such as a country list','A shared admin account whose settings tests change','A global “current order”'],a:1,why:'Sharing is only safe when no test mutates the data.'},
  {q:'What does a scheduled “sweeper” job do?',o:['Runs flaky tests again','Deletes leftover test data (e.g. by prefix and age) that teardown missed','Cleans CI caches','Merges reports'],a:1,why:'It catches data left behind by crashed or cancelled runs.'},
 ],src:['pwfix','faker','yk']};

const FW_ROADMAP={id:'framework-roadmap',track:'frame',title:'Building a framework, step by step',min:11,extra:true,
 sum:'A staged plan from the first test to a mature framework — with exit criteria, a definition of done and a health review.',
 sections:[
  S('Stages and exit criteria',T(['Stage','Focus','Move on when'],[
   ['0 · Decide','Goals, risks, tool choice, who writes tests','Written decision with reasons; a working spike'],
   ['1 · Walking skeleton','One smoke test, config, README, runs in CI on every PR','A new engineer runs it from the README in under 30 minutes'],
   ['2 · Foundations','Fixtures, test-data strategy, locator conventions, first page objects, API client','Ten tests run in parallel without collisions'],
   ['3 · Coverage by risk','Critical journeys in E2E; rules at API level; tags for smoke and regression','High-risk items have checks; PR pipeline stays under its time budget'],
   ['4 · Operate','Flaky-test policy, dashboards, ownership, artifact retention','Pass-on-retry rate tracked and within budget'],
   ['5 · Improve','Quarterly health review, pruning, refactoring, training','Continuous — the framework is a product with an owner']])+CO('note','Key idea','Get to a green test in CI before building abstractions. Framework layers designed before any tests exist usually solve the wrong problems.')),
  S('Definition of done for an automated test',UL(['It traces to a requirement or a risk.','It fails when the behaviour breaks — checked by breaking it on purpose once.','It uses user-facing locators and condition-based waits; no sleeps.','It creates or owns its data and cleans up.','It runs alone, in any order and in parallel.','It passed a repeated run (e.g. <code class="i">--repeat-each=10</code>) before merge.','Its title says what behaviour it checks.','It is tagged for the right suites.','Its failure output (message, trace, screenshot) lets someone else diagnose it.','Docs are updated in the same change if conventions changed.'])),
  S('Build, extend or buy',T(['Option','Choose it when','Watch out for'],[
   ['Build on an open-source runner (Playwright, Cypress, Selenium)','Engineers own the tests; you need flexibility and version control','You own maintenance and conventions'],
   ['Extend an existing internal framework','It is healthy and the team knows it','Inheriting its flakiness and debt'],
   ['Buy a commercial or low-code/AI platform','Non-coders author tests; you need vendor support or built-in analytics','Lock-in, export options, data residency, total cost over three years']])+CO('tip','Tip','Whatever you choose, run a two-week pilot on your hardest real flow — a login with MFA, an iframe, a file upload — not the vendor’s demo app.')),
  S('Roles and ownership',UL(['<b>Framework owner</b>: maintains core, reviews convention changes, runs the health review.','<b>Feature teams</b>: write and fix the tests for their features — failures go to whoever changed the code.','<b>Flaky-test rota</b>: someone each sprint triages new flaky reports so they don’t pile up.','<b>Reviewers</b>: test code gets the same code review as product code.'])+CO('risk','Risk','If one “automation person” owns every test, the suite grows only as fast as that person and dies when they leave.')),
 ],
 quiz:[
  {q:'What should the first milestone of a new framework be?',o:['A complete layered architecture','One smoke test running in CI on every PR, with a README','100 recorded tests','A custom reporting dashboard'],a:1,why:'A walking skeleton proves the whole path end to end before abstractions are built.'},
  {q:'Which item belongs in a definition of done for an automated test?',o:['It has more than 50 lines','It was seen to fail when the behaviour was broken on purpose','It uses XPath','It runs only in Chrome'],a:1,why:'A test that has never failed may not be able to fail.'},
  {q:'A vendor demo looks great. What is the best evaluation step?',o:['Sign a three-year contract','Pilot it on your hardest real flows for two weeks','Count its integrations','Ask for a discount'],a:1,why:'Demo apps avoid the hard parts; your MFA, iframes and uploads won’t.'},
  {q:'Who should usually fix a test broken by a feature change?',o:['Only the automation specialist','The team that changed the feature','Nobody — delete it','The vendor'],a:1,why:'Ownership follows the change; a single bottleneck owner doesn’t scale.'},
  {q:'Which exit criterion best shows Stage 2 (foundations) is complete?',o:['The README exists','Ten tests run in parallel without collisions','A dashboard is live','There are 500 tests'],a:1,why:'Foundations are about data, fixtures and isolation — parallel safety proves them.'},
 ],src:['yk','tae','pwci']};

MODULES.splice(MODULES.findIndex(m=>m.id==='framework-architecture')+1,0,FW_TYPES,DESIGN_PATTERNS);
MODULES.splice(MODULES.findIndex(m=>m.id==='project-structure')+1,0,TEST_DATA);
MODULES.splice(MODULES.findIndex(m=>m.id==='ci-cd')+1,0,FW_ROADMAP);

TRACKS.find(t=>t.id==='frame').blurb='Architecture, patterns, test data, documentation, project layout and CI/CD.';

/* objectives go first in every module */
MODULES.forEach(m=>{const o=OBJECTIVES[m.id];if(o)m.sections.unshift(S('What you’ll learn',UL(o)));});

/* ---------- more quiz questions (appended, so saved answers keep their index) ---------- */
const EXTRA_Q4={
'what-is-automation':[
 {q:'Which is a framework rather than a script?',o:['login.spec.ts','The shared runner config, fixtures, page objects and reporting that specs rely on','A single assertion','A GitHub Actions run'],a:1,why:'A script executes test cases; the framework is the shared structure scripts use.'},
 {q:'Build cost 30 h, manual run 1.5 h, automated upkeep 0.5 h per run. After how many runs does it break even?',o:['20','30','60','Never'],a:1,why:'Saving per run = 1.5 − 0.5 = 1 h; 30 / 1 = 30 runs.'},
],
'manual-vs-automated':[
 {q:'In Bach and Bolton’s terms, what does an automated check do?',o:['Testing in the full sense','Checking: applying decision rules to specific observations','Exploratory testing','Risk analysis'],a:1,why:'Automation performs checking; testing also includes exploration, questioning and learning.'},
 {q:'After a production incident, what should the automated side of the team do?',o:['Nothing','Add a regression check that reproduces the bug','Delete related tests','Increase retries'],a:1,why:'Each escaped bug becomes a regression check so it can’t silently return.'},
],
'test-levels':[
 {q:'A suite has 400 UI tests and 20 unit tests. What shape is it?',o:['Test pyramid','Testing trophy','Ice-cream cone (anti-pattern)','Diamond'],a:2,why:'Top-heavy suites dominated by UI tests are the ice-cream cone.'},
 {q:'Which test double records how it was called so you can check it afterwards?',o:['Dummy','Stub','Spy','Fake'],a:2,why:'A spy is a stub that also records its calls.'},
 {q:'An in-memory database used instead of the real one is a…',o:['Mock','Fake','Dummy','Stub'],a:1,why:'A fake is a working, simplified implementation.'},
],
'playwright':[
 {q:'What does forbidOnly: !!process.env.CI do?',o:['Runs only one test in CI','Fails the CI run if a test.only was left in the code','Disables retries','Forbids parallelism'],a:1,why:'It prevents a stray test.only from silently skipping the rest of the suite in CI.'},
 {q:'Which locator does Playwright recommend trying first?',o:['getByTestId','locator(css)','getByRole','XPath'],a:2,why:'Role-based locators reflect how users and assistive technology perceive the page.'},
 {q:'A locator matches three buttons and you call .click(). What happens?',o:['Clicks the first','Clicks all three','Throws a strictness violation','Waits forever'],a:2,why:'Locators are strict; ambiguous matches throw instead of guessing.'},
 {q:'Which command runs only tests tagged @smoke?',o:['npx playwright test --project=smoke','npx playwright test --grep @smoke','npx playwright smoke','npx playwright test --tag smoke'],a:1,why:'Tags are matched with --grep (and excluded with --grep-invert).'},
],
'playwright-fixtures':[
 {q:'Which function combines fixture sets defined in different modules?',o:['combineFixtures()','mergeTests()','test.extend.all()','useFixtures()'],a:1,why:'mergeTests() merges several extended test objects into one.'},
],
'cypress':[
 {q:'Why can’t you write const text = cy.get(".name").text()?',o:['cy.get is deprecated','Cypress commands are queued and run later — use .then() or assertions','Text is always empty','It only works in Cloud'],a:1,why:'Commands enqueue work; their results are available through chaining, not return values.'},
 {q:'Which Cypress commands are retried until assertions pass?',o:['Actions such as .click()','Queries such as cy.get() and .find(), with their assertions','cy.request()','None'],a:1,why:'Queries are retried together with the assertions chained after them.'},
 {q:'What does cy.session() do?',o:['Starts Cypress Cloud','Caches and restores cookies and storage, e.g. to reuse a login','Records video','Resets the database'],a:1,why:'It caches session state so login runs once and is restored afterwards.'},
 {q:'Which selector does the Cypress best-practice guide recommend?',o:['.btn.btn-primary','A dedicated attribute such as [data-cy=save]','#root > div:nth-child(2)','The button text only, always'],a:1,why:'Dedicated test attributes are isolated from styling and structure changes.'},
],
'selenium':[
 {q:'What do the Selenium docs say about mixing implicit and explicit waits?',o:['Always mix them','Don’t — it can cause unpredictable wait times','Implicit waits are required for Grid','Explicit waits are deprecated'],a:1,why:'Use explicit waits and leave the implicit wait at zero.'},
 {q:'A Python Selenium team wants parallel test runs. Which runner add-on is typical?',o:['pytest-xdist','JUnit 5','NUnit','Mocha'],a:0,why:'pytest-xdist distributes pytest tests across processes.'},
],
'compare-tools':[
 {q:'Your team writes tests in C#. Which tools have official .NET support?',o:['Cypress only','Playwright and Selenium','Cypress and Selenium','None'],a:1,why:'Playwright has a .NET version and Selenium has C# bindings; Cypress is JavaScript/TypeScript only.'},
 {q:'What is the best order to migrate tests to a new tool?',o:['Alphabetical by file','By value: smoke and critical journeys first','Newest first','All at once in one PR'],a:1,why:'Migrate the highest-value coverage first and run old and new side by side.'},
],
'api-testing':[
 {q:'Why set additionalProperties: false in a response schema?',o:['Faster parsing','An unexpected field such as passwordHash then fails the test','It’s required by JSON Schema','To allow any field'],a:1,why:'It turns schema validation into a check against accidental data exposure.'},
],
'framework-architecture':[
 {q:'What does “DAMP over DRY” mean for test code?',o:['Remove every repeated line','Keep tests descriptive and readable on their own, even with some repetition','Use databases','Avoid page objects'],a:1,why:'Readable tests matter more than minimal duplication; deduplicate in helpers instead.'},
 {q:'Why expose locators as read-only properties on a page object?',o:['To hide them','So tests can use web-first assertions on them while the test keeps the judgement','For speed','Because Playwright requires it'],a:1,why:'Tests assert; page objects expose state and interactions.'},
],
'framework-docs':[
 {q:'What’s the best way to keep a README’s quick start correct?',o:['Rewrite it yearly','Have someone new follow it on a clean machine regularly and fix what fails','Add more screenshots','Put it in a wiki'],a:1,why:'Executability is proven by running it, like a test.'},
],
'project-structure':[
 {q:'Where should the staging URL for tests come from?',o:['Hard-coded in each spec','An environment variable or per-environment config','The README','A page object'],a:1,why:'Environment-specific values belong outside test code so one suite can target many environments.'},
 {q:'Which file should be committed: .env or .env.example?',o:['.env','.env.example with placeholders','Both','Neither'],a:1,why:'The example documents required variables; the real .env holds secrets and is git-ignored.'},
],
'ci-cd':[
 {q:'What does --shard=2/4 do?',o:['Runs tests twice on four browsers','Runs the second of four slices of the suite','Retries twice','Uses four workers'],a:1,why:'Sharding splits the suite across machines; each runs one slice.'},
 {q:'How do secrets reach a GitHub Actions job safely?',o:['Committed in the workflow file','Through repository or environment secrets injected as env vars','In the README','As artifacts'],a:1,why:'Secrets are stored encrypted and injected at runtime, and masked in logs.'},
 {q:'Which quality gate stops a stray test.only from skipping the suite?',o:['retries: 2','forbidOnly in CI','fullyParallel','trace: on-first-retry'],a:1,why:'forbidOnly fails the run when a focused test is present.'},
],
'strategy-risk':[
 {q:'Which metric most directly shows whether automation catches the bugs that matter?',o:['Number of tests','Lines of test code','Defect escape rate','Code coverage alone'],a:2,why:'Escaped defects are bugs tests could have caught but didn’t.'},
],
'flaky-tests':[
 {q:'Which command helps reproduce a flaky Playwright test?',o:['npx playwright test --repeat-each=30','npx playwright show-report','npm ci','npx playwright codegen'],a:0,why:'Running the same test many times exposes intermittent failures.'},
 {q:'A flaky test is traced to a real race condition in the app. What is it?',o:['A test problem — add a wait','A product bug to report and fix','An environment problem','Not worth fixing'],a:1,why:'Some flakiness reflects real defects users will also hit.'},
],
'security-performance':[
 {q:'An axe scan reports zero violations. What can you conclude?',o:['The page is fully accessible','No automatically detectable violations — manual checks are still needed','Screen readers will work','Keyboard navigation works'],a:1,why:'Automated scanners detect only part of accessibility issues.'},
],
'failure-modes':[
 {q:'Which question belongs in a quarterly automation health review?',o:['Which production bugs should a test have caught?','How many lines of code did we write?','Which IDE is best?','Can we remove all manual testing?'],a:0,why:'Escaped bugs reveal gaps in risk coverage.'},
],
'ai-for-testing':[
 {q:'How do you check that an AI-generated test is worth keeping?',o:['It passes once','Break the behaviour deliberately and confirm the test fails','Count its lines','Ask the AI'],a:1,why:'A test that can’t fail provides no information.'},
 {q:'What is a key risk of generating tests from the current application?',o:['They run too fast','They may assert current buggy behaviour and lock the bug in','They can’t use locators','They need Cypress Cloud'],a:1,why:'Generated oracles often mirror what the app does, not what it should do.'},
],
'testing-ai-systems':[
 {q:'What is a metamorphic relation?',o:['A fixed expected output','An expected relationship between outputs of related inputs','A model version','A type of drift'],a:1,why:'It lets you test without knowing the exact correct output.'},
 {q:'Swapping names in a review (“Anna” → “Omar”) changes a sentiment score. What has the metamorphic test revealed?',o:['Nothing','A potential bias / fairness defect','Improved accuracy','Drift'],a:1,why:'The relation “name swap shouldn’t change sentiment” is violated — a fairness issue.'},
],
'llm-evaluation':[
 {q:'Which layer should check that a summary is under 200 words?',o:['LLM-as-judge','Human review','Deterministic checks','Production monitoring only'],a:2,why:'Length limits are exact and cheap to check deterministically.'},
],
'istqb-ctfl':[
 {q:'Which CTFL chapter carries the most exam questions?',o:['1 Fundamentals','4 Test analysis and design','5 Managing test activities','6 Test tools'],a:1,why:'Chapter 4 has 11 of 40 questions, including 5 K3 questions.'},
],
'cert-path':[
 {q:'How long is the CTAL-TAE v2.0 exam (without extra time)?',o:['60 min','75 min','90 min','120 min'],a:2,why:'CTAL-TAE v2.0: 40 questions, 66 points, 90 minutes.'},
],
};
MODULES.forEach(m=>{(EXTRA_Q4[m.id]||[]).forEach(q=>m.quiz.push(q));});

/* ---------- more exam-only questions ---------- */
EXAM_BANK.push(
 {t:'found',k:3,q:'Build cost 60 h, manual run 3 h, automated upkeep 1 h per run, run weekly. Roughly when does it break even?',o:['After 20 weeks','After 30 weeks','After 60 weeks','Never'],a:1,why:'Saving 2 h per run; 60 / 2 = 30 runs = 30 weeks.'},
 {t:'found',k:2,q:'Which statement about test doubles is correct?',o:['A mock never fails a test','A stub returns canned answers; a mock also verifies expected calls','A fake is always a no-op','Dummies record their calls'],a:1,why:'Mocks carry expectations about interactions; stubs only answer.'},
 {t:'found',k:2,q:'Which suite shape is an anti-pattern?',o:['Test pyramid','Testing trophy','Ice-cream cone','Honeycomb'],a:2,why:'Mostly manual/UI tests on top of few unit tests gives slow, brittle feedback.'},
 {t:'found',k:1,q:'Select TWO items that are tools rather than frameworks in the sense this hub uses.',o:['Playwright','Your team’s pages/, fixtures/ and config','Selenium WebDriver','Your CI pipeline definition','Your test-data builders'],a:[0,2],why:'Playwright and WebDriver are tools; the framework is what the team builds around them.'},
 {t:'tools',k:2,q:'Which Playwright config combination captures a trace exactly when a test needed a retry?',o:['trace: "off"','retries: 2 with trace: "on-first-retry"','retries: 0 with trace: "on-first-retry"','screenshot: "on"'],a:1,why:'on-first-retry records a trace on the first retry, which only happens when retries are enabled.'},
 {t:'tools',k:3,q:'A table has many rows with an Edit button each. Which Playwright code clicks Edit for “Ada Lovelace” most robustly?',o:['page.locator("tr:nth-child(4) button").click()','page.getByRole("row").filter({ hasText: "Ada Lovelace" }).getByRole("button", { name: "Edit" }).click()','page.getByText("Edit").click()','page.locator("//table/tr[4]/td[5]/button").click()'],a:1,why:'Filtering the row by its content and then finding the button by role survives reordering.'},
 {t:'tools',k:2,q:'In Cypress, how should a test wait for a save to finish?',o:['cy.wait(5000)','Alias the request with cy.intercept(...).as("save") and cy.wait("@save")','Reload the page','Increase defaultCommandTimeout to 60 s'],a:1,why:'Waiting on the aliased request ties the test to the real completion signal.'},
 {t:'tools',k:2,q:'A Selenium suite sets a 10 s implicit wait and also uses WebDriverWait. What is the risk?',o:['None','Unpredictable wait times — don’t mix the two','Tests run in parallel','Grid rejects the session'],a:1,why:'The Selenium docs warn that mixing waits can cause unpredictable timings.'},
 {t:'tools',k:2,q:'Which tool supports real mobile devices through the WebDriver protocol?',o:['Cypress','Appium (Selenium ecosystem)','Playwright Test','Ragas'],a:1,why:'Appium extends the WebDriver protocol to native and mobile apps; Playwright offers mobile emulation.'},
 {t:'frame',k:2,q:'Which framework type lets non-programmers compose tests from pre-built actions such as “Input Text”?',o:['Linear','Data-driven','Keyword-driven','Library architecture'],a:2,why:'Keyword-driven frameworks such as Robot Framework expose actions as keywords.'},
 {t:'frame',k:3,q:'A rule applies a 10% discount from €50 inclusive. Which rows best cover it in a data-driven test?',o:['€10, €100','€49.99, €50.00 and one well above, plus an invalid code','€50 only','Random totals'],a:1,why:'Boundary values around €50, a typical valid value and a negative case cover the rule efficiently.'},
 {t:'frame',k:2,q:'A LoginPage method both logs in and asserts that the dashboard is visible. What is the problem?',o:['Nothing','Assertions hidden in page objects make failures unclear and the method unusable for negative tests','It is too short','Page objects can’t call click()'],a:1,why:'Keep assertions in tests; a failed-login test couldn’t reuse this method.'},
 {t:'frame',k:2,q:'Which pattern best fits a suite with many user roles performing business tasks?',o:['Linear scripts','Screenplay','Record/playback','Keyword tables in Excel'],a:1,why:'Screenplay models actors with abilities performing tasks, which scales to many roles.'},
 {t:'frame',k:2,q:'Which test-data approach risks bypassing business rules?',o:['Creating data via the public API','Inserting rows directly into the database','Using a builder that calls the API','Using the UI'],a:1,why:'Direct database seeding skips application validation.'},
 {t:'frame',k:3,q:'Tests create contacts but crash mid-run in CI, leaving thousands of records. Best fix?',o:['Stop creating data','Prefix data with a run id, clean up in fixture teardown, and add a scheduled sweeper','Run tests serially','Delete the database weekly by hand'],a:1,why:'Teardown handles normal failures; a sweeper handles crashes and cancellations.'},
 {t:'frame',k:2,q:'What is the recommended first milestone for a new automation framework?',o:['A complete five-layer architecture','A walking skeleton: one smoke test in CI with a README','A vendor contract','Converting all manual tests'],a:1,why:'Prove the end-to-end path first, then grow layers as real needs appear.'},
 {t:'frame',k:1,q:'Select TWO items that belong in a definition of done for an automated test.',o:['It was seen to fail when the behaviour was broken','It uses at least one sleep','It creates or owns its data','It only runs in serial','It has no title'],a:[0,2],why:'A test must be able to fail and must not depend on shared data.'},
 {t:'frame',k:2,q:'Playwright’s blob reporter is mainly used to…',o:['Hide failures','Merge results from several shards into one report','Compress videos','Upload traces to Cypress Cloud'],a:1,why:'Each shard writes a blob report; merge-reports combines them.'},
 {t:'qual',k:2,q:'Which metric pair best reflects whether a suite is trustworthy?',o:['Test count and lines of code','Pass-on-retry rate and defect escape rate','Number of page objects and fixtures','Code coverage and number of files'],a:1,why:'Flaky rate shows how real the green is; escape rate shows what it misses.'},
 {t:'qual',k:3,q:'A test fails 1 in 40 runs. Traces show two requests racing and the app saving stale data. Classify it.',o:['Test timing problem — add a wait','Real product defect (race condition) — report it','Environment problem','Selector problem'],a:1,why:'The failure reproduces an application race that users can hit too.'},
 {t:'qual',k:2,q:'What is the main limitation of automated accessibility scanners?',o:['They are slow','They detect only part of the issues — keyboard, focus order and screen-reader sense need manual checks','They require Cypress','They only check colours'],a:1,why:'Scanners find rule-based violations, not the full user experience.'},
 {t:'ai',k:2,q:'Which technique tests an image classifier without labelled expected outputs for every input?',o:['Boundary value analysis','Metamorphic testing — e.g. small rotations shouldn’t change the label','Decision tables','Smoke testing'],a:1,why:'Metamorphic relations act as the oracle between related inputs.'},
 {t:'ai',k:2,q:'An AI tool generated a test that passes. What should happen before merging?',o:['Merge immediately','Review it like a colleague’s PR and prove it fails against broken behaviour','Increase retries','Delete the old tests'],a:1,why:'Generated tests need the same review and a demonstration that they can fail.'},
 {t:'cert',k:3,q:'A decision table has 3 independent true/false conditions. How many full combinations?',o:['3','6','8','9'],a:2,why:'2³ = 8.'},
 {t:'cert',k:2,q:'Which ISTQB certificate targets hands-on framework engineers?',o:['CTFL','CT-TAS','CTAL-TAE','CT-AI'],a:2,why:'CTAL-TAE v2.0 covers test automation architecture and implementation.'},
);

/* ---------- glossary, checklist, exam settings ---------- */
GLOSSARY.push(
 ['Checking vs testing','Checking applies decision rules to observations (automatable); testing is the wider learning and evaluation process.','found'],
 ['Test double','A stand-in for a real dependency: dummy, stub, spy, mock or fake.','found'],
 ['Ice-cream cone','Anti-pattern: a suite dominated by manual and UI tests with few unit tests.','found'],
 ['Strict locator','A Playwright locator throws if it matches more than one element for an action.','tools'],
 ['Retry-ability','Cypress re-runs queries and their assertions until they pass or time out.','tools'],
 ['Explicit wait','Selenium WebDriverWait polling for a condition; don’t mix with implicit waits.','tools'],
 ['Data-driven framework','One test logic run against many data rows.','frame'],
 ['Keyword-driven framework','Tests written as tables of reusable keywords, e.g. Robot Framework.','frame'],
 ['Component object','A page-object-style class for a reusable widget, scoped to its root element.','frame'],
 ['Screenplay pattern','Actors with abilities perform tasks and ask questions — an alternative to large page objects.','frame'],
 ['Test data builder','A function or class creating valid test objects with defaults the test can override.','frame'],
 ['Sharding','Splitting a suite across machines, each running one slice.','frame'],
 ['Walking skeleton','The thinnest end-to-end slice — one test running in CI — built before any abstractions.','frame'],
 ['Defect escape rate','Share of defects found in production that testing could have caught.','qual'],
 ['Metamorphic testing','Testing via expected relations between outputs of related inputs, when no exact oracle exists.','ai'],
);
FRAMEWORK_CHECKS.push('Is the framework type (modular, data-driven, BDD…) chosen deliberately and documented?','Do page and component objects stay small, with assertions kept in tests?','Does cleanup run in teardown, with a sweeper for leftovers?','Is there a written definition of done for automated tests?','Is a health review held regularly with metrics such as escape rate and flaky rate?');
STUDY_PATH.splice(6,0,'Learn the framework types and patterns — data-driven tests, component objects, builders — and a test-data strategy');
