const T=(h,rows)=>`<div class="tbl"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const UL=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const OL=a=>`<ol>${a.map(x=>`<li>${x}</li>`).join('')}</ol>`;
const CO=(k,label,t)=>`<div class="callout callout--${k}"><span class="callout__label">${label}</span><p>${t}</p></div>`;
const S=(h,body)=>({h,body});

const SRC={
  pw:['Playwright docs — Installation','https://playwright.dev/docs/intro'],
  cy:['Cypress docs — Why Cypress?','https://docs.cypress.io/app/get-started/why-cypress'],
  se:['Selenium documentation','https://www.selenium.dev/documentation/'],
  yk:['Yuri Kan — Test Automation Framework Documentation','https://yrkan.com/blog/test-automation-framework-docs/'],
  wiki:['Wikipedia — Test automation','https://en.wikipedia.org/wiki/Test_automation'],
  istqb:['ISTQB — CT-AI v2.0 release','https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/'],
  istqbc:['ISTQB — CT-AI certification','https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/'],
  gartner:['Gartner Peer Insights — AI-augmented testing tools','https://www.gartner.com/reviews/market/ai-augmented-software-testing-tools'],
  virt:['Virtuoso — 10 Best AI Testing Tools','https://www.virtuosoqa.com/post/best-ai-testing-tools'],
  tgrid:['TestGrid — Top AI Testing Tools','https://testgrid.io/blog/ai-testing-tools/'],
  tmind:['Testing Mind — Best AI tools for software testing 2026','https://www.testingmind.com/best-ai-tools-for-software-testing-2026/'],
  cqa:['ContextQA — Best test automation tools 2026','https://contextqa.com/blog/best-test-automation-tools-2026/'],
  tdino:['TestDino — Best test automation tools','https://testdino.com/blog/best-test-automation-tools'],
  tguild:['TestGuild — AI test automation tools','https://testguild.com/7-innovative-ai-test-automation-tools-future-third-wave/'],
  bcs:['BCS — ISTQB CT-AI','https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/software-testing-certifications/istqb-certified-tester-foundation-level-ai-testing/'],
  atsqa:['AT*SQA — Testing AI systems overview','https://atsqa.org/testing-ai-systems-overview'],
};

const TRACKS=[
  {id:'found',name:'Foundations',blurb:'What automation is, what it isn’t, and where it fits.'},
  {id:'tools',name:'The tools',blurb:'Playwright, Cypress and Selenium — how each one thinks.'},
  {id:'frame',name:'Framework engineering',blurb:'Architecture, documentation, project layout and CI/CD.'},
  {id:'qual',name:'Strategy and quality',blurb:'Risk, flakiness, security and how suites fail.'},
  {id:'ai',name:'AI testing',blurb:'Using AI to test — and testing systems built on AI.'},
];

const MODULES=[
/* ---------------- FOUNDATIONS ---------------- */
{id:'what-is-automation',track:'found',title:'What test automation is',min:8,
 sum:'Software, separate from the system under test, that controls test execution and compares actual outcomes with predicted ones.',
 sections:[
  S('Definition',`<p>Test automation is the use of software separate from the system under test to <b>control test execution</b> and <b>compare actual outcomes with predicted outcomes</b>. Automated checks run without continuous manual interaction and are commonly wired into continuous testing and CI/CD.</p>
   ${CO('note','Key idea','Automation does not replace testing expertise. People still decide what to test, why it matters, which risks exist, and whether the automated checks give meaningful coverage.')}`),
  S('What automation is good at',UL(['Repeatable regression checks','Large sets of deterministic API or UI checks','Fast feedback after commits and pull requests','Cross-browser and cross-environment execution','Data-driven testing','Smoke and sanity suites','Re-verifying bug fixes','Parallel execution, where infrastructure supports it','Machine-readable evidence: logs, screenshots, traces, videos, reports'])),
  S('What it does not solve for you',UL(['Choosing the right scenarios','Exploratory testing and discovering unexpected behaviour','Usability judgement','Business-risk analysis','Ambiguous requirements','Poor test data or unstable environments','A weak oracle — if expected behaviour is unclear, automation can only reliably verify the wrong thing','Flaky infrastructure or dependencies'])+CO('risk','Risk','Automation has real costs: development time, maintenance, flaky tests, infrastructure, test-data management, false confidence, and automating low-value checks.')),
 ],
 quiz:[
  {q:'Which of these does automation NOT solve on its own?',o:['Running the same regression checks after every commit','Deciding which scenarios are worth testing','Executing checks across several browsers','Capturing screenshots and traces on failure'],a:1,why:'Choosing scenarios is test design — a human judgement about risk and value. Automation executes checks; it doesn’t pick them.'},
  {q:'What is a “weak oracle” problem?',o:['The test runner is too slow','The expected result is unclear, so automation may confidently verify the wrong thing','The assertion library has bugs','Tests run in the wrong order'],a:1,why:'An oracle is how you know the expected outcome. If it’s vague, a green run only proves the system matches a vague expectation.'},
 ],src:['wiki']},

{id:'manual-vs-automated',track:'found',title:'Manual vs automated testing',min:6,
 sum:'They are complementary. Automation wins on repeatability and scale; people win on exploration and judgement.',
 sections:[
  S('Side by side',T(['Dimension','Manual testing','Automated testing'],[
   ['Execution','Human-driven','Tool/code-driven'],['Repeatability','Moderate','High when deterministic'],['Initial cost','Usually lower','Usually higher'],
   ['Regression speed','Slower for large suites','Fast and repeatable'],['Exploration','Strong','Limited unless deliberately designed'],['Cross-browser scale','Expensive','Well suited'],
   ['Maintenance','Human effort per run','Code, data and infrastructure maintenance'],['CI/CD','Limited','Strong fit'],['Unexpected UX issues','Human observation helps','Usually needs specialised checks'],['Evidence','Notes, screenshots','Logs, reports, traces, screenshots, videos']])),
  S('How to read the table',`<p>Notice where the cost moves. Manual testing pays <i>per run</i>; automation pays up front and then in <i>maintenance</i>. Automation is worth it when a check runs often enough, and stays stable enough, for the upfront cost to pay back.</p>`+CO('tip','Tip','A good rule of thumb: automate what is repetitive, stable and high-impact; keep humans on what is exploratory, new, or judgement-heavy.')),
 ],
 quiz:[
  {q:'Where does automation usually cost MORE than manual testing?',o:['Regression speed','Initial cost','Cross-browser scale','CI/CD fit'],a:1,why:'Building automation — code, data, infrastructure — costs more up front. It pays back through repeated runs.'},
  {q:'Which kind of issue is manual testing typically better at catching?',o:['A regression in a stable API contract','An unexpected, confusing UX flow','A failure that appears only in Firefox','A broken smoke test after deployment'],a:1,why:'Unexpected UX problems need human observation; automated checks only see what they were told to look for.'},
 ],src:['wiki']},

{id:'test-levels',track:'found',title:'Where automation fits',min:7,
 sum:'Unit, component, API, end-to-end, regression, smoke, accessibility, visual and performance — each level answers a different question.',
 sections:[
  S('The levels',T(['Level','What it checks'],[
   ['Unit','Fast checks close to the code'],['Component','UI components in a controlled browser/runtime'],['API / service','Contracts, business rules, authorisation, validation, error behaviour'],
   ['End-to-end','Complete user-visible workflows across system boundaries'],['Regression','Existing functionality, repeatedly'],['Smoke','A small critical-path suite: is this build/environment testable at all?'],
   ['Accessibility','Selected accessibility violations — complements manual assessment'],['Visual','Rendered output vs approved expectations'],['Performance / load','Use dedicated tools, not functional browser automation']])),
  S('Choosing the level',`<p>Select the <b>lowest test level that provides sufficient confidence</b>. A business rule checked through the API is faster and less brittle than the same rule checked by clicking through a UI. Save end-to-end tests for critical user journeys and integration confidence.</p>`+CO('risk','Risk','Overusing E2E tests creates slow, fragile suites when lower-level tests would give faster feedback.')),
 ],
 quiz:[
  {q:'You need to verify a discount rule for 40 price combinations. Best level?',o:['End-to-end through the checkout UI','API/service tests, data-driven','Visual tests','Manual exploratory session'],a:1,why:'Many deterministic combinations of a business rule are a classic API/data-driven case. The UI adds time and brittleness, not confidence.'},
  {q:'What is a smoke suite for?',o:['Exhaustive regression','Load testing','Establishing whether a build/environment is testable at all','Accessibility audits'],a:2,why:'Smoke = a small, fast, critical-path suite run first. If it fails, deeper testing is pointless.'},
 ],src:['wiki']},

/* ---------------- TOOLS ---------------- */
{id:'playwright',track:'tools',title:'Playwright',min:12,
 sum:'An end-to-end framework for modern web apps: integrated runner, assertions, isolation, parallelism and tooling across Chromium, Firefox and WebKit.',
 sections:[
  S('What it is',`<p>Playwright Test bundles a test runner, web-first assertions, isolation, parallelisation and tooling. It runs Chromium, WebKit and Firefox on Windows, Linux and macOS — headless or headed — with mobile emulation.</p>`),
  S('Install and run',`<pre class="code"><span class="c"># scaffold a project (TS or JS, test folder, GitHub Actions, browsers)</span>
<span class="c">$</span> <span class="k">npm init</span> <span class="s">playwright@latest</span>

<span class="c">$</span> <span class="k">npx playwright test</span>                         <span class="c"># all tests, headless</span>
<span class="c">$</span> <span class="k">npx playwright test</span> <span class="s">--headed</span>                <span class="c"># watch the browser</span>
<span class="c">$</span> <span class="k">npx playwright test</span> <span class="s">--project=chromium</span>      <span class="c"># one browser project</span>
<span class="c">$</span> <span class="k">npx playwright test</span> <span class="s">tests/example.spec.ts</span>   <span class="c"># one file</span>
<span class="c">$</span> <span class="k">npx playwright test</span> <span class="s">--ui</span>                    <span class="c"># UI mode</span>
<span class="c">$</span> <span class="k">npx playwright show-report</span>                  <span class="c"># HTML report</span></pre>
<p>The generated scaffold: <code class="i">playwright.config.ts</code>, <code class="i">package.json</code>, <code class="i">tests/example.spec.ts</code>.</p>`),
  S('Key concepts',T(['Concept','Why it matters'],[
   ['Locators','Find elements robustly for interaction and assertions'],['Web-first assertions','Assertions that wait for the web app’s state'],['Fixtures','Reusable setup/teardown and injected dependencies'],
   ['Browser contexts','Isolated sessions — the basis of test isolation'],['Projects','Browser/device/config combinations'],['Parallelism','Run tests concurrently where safe'],
   ['Retries','Re-run failures by policy — never to hide flakiness'],['Trace Viewer','Step-by-step execution evidence for debugging'],['HTML reporter','Passed, failed, skipped and flaky tests with attachments'],
   ['API testing','HTTP checks alongside UI flows'],['Network mocking','Control or simulate network behaviour'],['Codegen','Generates starter code — refactor before keeping it']])),
  S('Strengths',UL(['Broad browser-engine coverage','Integrated runner and tooling','Isolated tests and parallel execution','Strong evidence: traces, screenshots, videos, reports','UI and API testing in one tool','Good fit for TypeScript QA projects'])),
  S('Watch-outs',UL(['Generated tests become brittle if accepted without refactoring','Parallel tests collide through shared accounts, data or environments','Retries hide flakiness if you only watch final pass/fail','Browser binaries and CI dependencies must be version-managed','Too many E2E tests make slow suites'])+CO('tip','Tip','Treat Codegen output as a first draft: replace fragile selectors with role/label-based locators and pull repeated steps into fixtures or page objects.')),
 ],
 quiz:[
  {q:'Which Playwright feature is the foundation of test isolation?',o:['Codegen','Browser contexts','HTML reporter','Projects'],a:1,why:'Each test gets its own browser context — a fresh, isolated session with separate cookies and storage.'},
  {q:'Your suite is green, but the HTML report shows 14 tests passed only on retry. What does that tell you?',o:['Everything is fine','You have flaky tests being hidden by retries','Retries should be increased','The report is wrong'],a:1,why:'Pass-on-retry is a flakiness signal. Track retries separately from genuine passes and investigate them.'},
  {q:'Which command opens the interactive UI mode?',o:['npx playwright show-report','npx playwright test --headed','npx playwright test --ui','npm init playwright@latest'],a:2,why:'--ui opens UI mode for running, watching and debugging tests interactively.'},
 ],src:['pw']},

{id:'cypress',track:'tools',title:'Cypress',min:10,
 sum:'A browser-centred quality platform: E2E and component testing with a strong local debugging model, plus optional paid cloud features.',
 sections:[
  S('What it is',`<p>Cypress positions itself as a quality platform for modern web apps: end-to-end testing, component testing, accessibility checks and coverage-oriented capabilities. The locally installed <b>Cypress App is open source</b>; <b>Cypress Cloud</b> adds hosted recording, analytics and orchestration.</p>`),
  S('Capabilities',UL(['End-to-end testing in a browser','Component testing in a real browser','Accessibility checking','Network interception and control','Spies, stubs and clocks','Visual testing','Cross-browser execution for supported browser families','Screenshots, videos and reporting','CI integration'])),
  S('How you debug in Cypress',UL(['<b>Command Log</b> and time-travel snapshots show app state around each command','<b>Automatic waiting</b> reduces the need for arbitrary sleeps','Readable errors plus browser DevTools','<b>Network stubbing</b> reproduces edge cases without real backend conditions'])),
  S('Cypress Cloud',`<p>Cloud features include test replay, flaky-test management, branch review, orchestration, integrations and analytics. Some advanced accessibility and UI-coverage capabilities are premium products. Per the guide, Cypress’s docs describe Cypress 16 as live — verify feature availability and pricing on the current docs before adopting.</p>`),
  S('Watch-outs',UL(['Separate what is free and local from what is paid cloud','Evaluate the browser architecture and cross-origin behaviour against your app','Stubbing too much lowers confidence that real integration works','Automatic waiting doesn’t fix application synchronisation problems','Cloud recording may capture sensitive test data'])+CO('risk','Risk','Recorded runs, screenshots and videos sent to a hosted service can contain personal or customer data. Review what you capture before enabling cloud recording.')),
 ],
 quiz:[
  {q:'Which statement about Cypress is accurate?',o:['Everything, including orchestration and analytics, is open source','The local Cypress App is open source; Cypress Cloud adds paid hosted features','Cypress only supports component testing','Cypress requires Selenium Grid'],a:1,why:'The guide stresses separating the open-source local app from paid cloud and premium capabilities.'},
  {q:'You stub every API response in your E2E suite. What’s the main risk?',o:['Tests become slower','You lose confidence that the real frontend–backend integration works','Cypress stops auto-waiting','Screenshots stop working'],a:1,why:'Stubs are great for edge cases, but a fully stubbed suite never exercises the real integration.'},
 ],src:['cy']},

{id:'selenium',track:'tools',title:'Selenium',min:10,
 sum:'An umbrella project — WebDriver, IDE and Grid — for standards-based browser automation across languages and machines.',
 sections:[
  S('The ecosystem',T(['Component','Purpose'],[['WebDriver','Programmatic browser automation through a language-neutral API/protocol'],['Selenium IDE','Browser-based record/playback and test-development assistance'],['Selenium Grid','Remote and parallel execution across machines, browsers and platforms']])),
  S('WebDriver architecture',`<div class="layers"><div><b>Your test (client binding)</b><span>Java, Python, C#, JS…</span></div><div><b>WebDriver protocol</b><span>language-neutral commands</span></div><div><b>Browser driver</b><span>browser-specific</span></div><div class="sut"><b>Browser</b><span>Chrome, Firefox, Edge, Safari</span></div></div>
   <p>Because the client and the browser-specific driver are separated, Selenium works across major browsers without embedding automation code in the application.</p>`),
  S('Setting up',OL(['Install a language binding','Install or access the target browser','Manage drivers — Selenium Manager can automate this in supported setups','Create WebDriver sessions','Add a test runner for your language','Add assertions, fixtures, reporting and CI around the browser layer'])+CO('note','Key idea','With Selenium, the framework around the browser layer is your responsibility: runner, assertions, fixtures, reporting, data, configuration and conventions.')),
  S('Selenium Grid',`<p>Grid routes WebDriver scripts to remote browser instances for parallel, multi-version and cross-platform testing. A simple standalone Grid exposes a local endpoint:</p>
<pre class="code"><span class="c">$</span> <span class="k">java -jar</span> <span class="s">selenium-server-&lt;version&gt;.jar</span> <span class="k">standalone</span>
<span class="c"># WebDriver clients connect to http://localhost:4444</span></pre>`),
  S('Strengths and watch-outs',`<h3>Strengths</h3>${UL(['Mature ecosystem, broad language and browser support','Standardised WebDriver model','Strong remote-execution and Grid story','Fits organisations with existing Selenium infrastructure'])}<h3>Watch-outs</h3>${UL(['Poor synchronisation strategy produces flaky tests','Large remote grids add infrastructure and observability complexity','A badly designed Page Object layer becomes a maintenance bottleneck'])}`),
 ],
 quiz:[
  {q:'Which Selenium component handles parallel execution across machines?',o:['Selenium IDE','WebDriver','Selenium Grid','Selenium Manager'],a:2,why:'Grid routes WebDriver sessions to remote browser nodes for parallel and cross-platform runs.'},
  {q:'Compared with Playwright, what does Selenium usually leave to you?',o:['Talking to the browser','The test runner, assertions, fixtures and reporting','Supporting multiple languages','Running in Chrome'],a:1,why:'Selenium focuses on browser automation; the surrounding framework is yours to assemble.'},
 ],src:['se']},

{id:'compare-tools',track:'tools',title:'Comparing the three',min:6,
 sum:'A capability comparison, not a ranking — choose by architecture, browsers, team skills, CI, debugging needs and maintenance cost.',
 sections:[
  S('Capability comparison',T(['Area','Playwright','Cypress','Selenium'],[
   ['Primary model','Integrated E2E framework','Browser-centred quality platform','Browser automation ecosystem'],
   ['Browsers','Chromium, Firefox, WebKit','Chrome-family, Firefox and supported browsers','Major browsers via WebDriver'],
   ['Runner','Integrated Playwright Test','Integrated runner/app','Usually an external runner'],
   ['API testing','Supported','Supported','Usually added via libraries'],
   ['Component testing','Supported','Strong workflow','Via surrounding ecosystem'],
   ['Accessibility','Via tooling/integration','Dedicated capabilities','Requires ecosystem tooling'],
   ['Parallelism','Built in, configurable','Supported; Cloud adds orchestration','Grid/runner/infrastructure'],
   ['Remote execution','Through infrastructure','CI/cloud workflows','Strong Grid model'],
   ['Debugging','Trace Viewer, UI mode, reports','Time-travel snapshots, DevTools','Depends on framework/tooling'],
   ['Best fit','Modern web E2E, multi-browser','Front-end teams wanting integrated browser testing','WebDriver ecosystem / remote grid']])),
  S('Decide with context',`<p>Weigh: application architecture, required browsers, language and team skills, CI infrastructure, debugging needs, test types, compliance constraints and maintenance cost.</p>`+CO('tip','Tip','Try the <a href="#picker">tool picker</a> to see how your own constraints shift the balance.')),
 ],
 quiz:[
  {q:'You must run tests in WebKit (Safari engine) on Linux CI. Which tool’s built-in browser set covers that most directly?',o:['Playwright','Cypress','Selenium IDE','None'],a:0,why:'Playwright ships Chromium, Firefox and WebKit engines and runs them on Linux, Windows and macOS.'},
  {q:'Your company has a large existing grid and Java test teams. Which tool fits most naturally?',o:['Playwright','Cypress','Selenium','A new AI platform'],a:2,why:'Existing Selenium infrastructure and WebDriver language bindings are a strong reason to stay in that ecosystem.'},
 ],src:['pw','cy','se']},

/* ---------------- FRAMEWORK ---------------- */
{id:'framework-architecture',track:'frame',title:'Framework architecture and POM',min:10,
 sum:'A framework is more than a test library: layers, shared services, data, reporting and the patterns that keep tests readable.',
 sections:[
  S('A layered model',`<div class="layers">
   <div><b>Presentation / reporting</b><span>HTML/JSON reports, dashboards, CI feedback</span></div>
   <div><b>Test layer</b><span>smoke, regression, API, E2E suites</span></div>
   <div><b>Business / domain layer</b><span>page objects, service wrappers, workflows</span></div>
   <div><b>Framework core</b><span>config, fixtures, logging, browser factory</span></div>
   <div><b>Infrastructure / environment</b><span>test data, CI/CD, browsers, containers, Grid</span></div>
   <div class="sut"><b>System under test</b><span>your application</span></div></div>
   <p>Each layer depends only on the ones below it. Tests express intent; lower layers own mechanics.</p>`),
  S('Core components',UL(['Configuration manager','Browser/driver factory','Environment manager','Authentication/session utilities','Test-data manager','API client / service wrappers','Page Objects or other UI abstractions','Logging and reporting','Screenshot / trace / video collection','Database or external-service adapters where needed','CI/CD integration'])),
  S('Page Object Model',`<p>A Page Object represents a page or meaningful UI component and encapsulates its locators and common interactions, so tests read as business intent instead of selector mechanics.</p>
<pre class="code"><span class="k">LoginPage</span>
  <span class="c">-</span> username field, password field, login button, error message
  <span class="c">-</span> <span class="s">login(user, password)</span>

<span class="k">login.spec</span>
  <span class="c">-</span> open LoginPage
  <span class="c">-</span> perform login
  <span class="c">-</span> assert the expected authenticated state</pre>`+CO('risk','Risk','POM is a pattern, not a requirement. Don’t turn page objects into giant classes that hold every business rule and every possible workflow.')),
 ],
 quiz:[
  {q:'Where should a helper that creates a unique test user via the API live?',o:['Inside each test file','In the test-data manager / service layer','In the HTML reporter','In the Page Object for the login page'],a:1,why:'Test-data creation is a shared framework service, reused by many tests and kept out of UI abstractions.'},
  {q:'What is the main purpose of a Page Object?',o:['Speed up the browser','Encapsulate locators and interactions so tests express intent','Replace assertions','Store test data'],a:1,why:'Page Objects hide selector mechanics. Assertions usually stay in the test so intent stays visible.'},
 ],src:['yk']},

{id:'framework-docs',track:'frame',title:'Framework documentation',min:7,
 sum:'Documentation is part of the framework: version-controlled, updated in the same change, and good enough to make a new engineer productive fast.',
 sections:[
  S('Minimum documentation set',OL(['README: purpose, prerequisites, quick start','Architecture overview with component responsibilities','Folder structure and naming conventions','Environment/configuration','How to run one test, a suite, smoke and CI-equivalent runs','Test-data strategy and cleanup rules','Authentication/session strategy','Locator conventions','Page Object / service-layer conventions','Reporting and artifacts','CI/CD pipeline behaviour','Retry and flaky-test policy','Troubleshooting guide','Contribution and code-review rules','Dependency/version management'])),
  S('Quality criteria',T(['Criterion','Good state','Risk if missing'],[['Freshness','Docs change with framework code','Documentation drift'],['Discoverability','README links to deeper docs','Onboarding delays'],['Executability','Commands can be copied and run','New engineer can’t validate setup'],['Architecture','Responsibilities and dependencies explicit','Hidden coupling'],['Examples','Representative, working examples','Inconsistent implementation'],['Troubleshooting','Known failures and diagnostics','Repeated investigation'],['Rationale','Design decisions explained','Repeated architectural debates']])+CO('tip','Tip','Make “docs updated” part of your pull-request checklist. Drift is the most common failure of framework docs.')),
 ],
 quiz:[
  {q:'A new engineer copies the README’s run command and it fails. Which quality criterion is broken?',o:['Rationale','Executability','Discoverability','Examples'],a:1,why:'Executability means commands in the docs can be copied and run as written.'},
 ],src:['yk']},

{id:'project-structure',track:'frame',title:'Project structure and workflow',min:8,
 sum:'A recommended Playwright/TypeScript layout and a worked example: from a requirement to a maintained, CI-wired test.',
 sections:[
  S('Recommended layout',`<pre class="code"><span class="k">qa-automation/</span>
├── <span class="k">.github/workflows/</span><span class="s">playwright.yml</span>
├── <span class="k">docs/</span>
│   ├── <span class="s">architecture.md</span>   ├── <span class="s">test-strategy.md</span>
│   ├── <span class="s">test-data.md</span>      └── <span class="s">troubleshooting.md</span>
├── <span class="k">tests/</span>
│   ├── <span class="k">api/</span>   <span class="s">auth.spec.ts  contacts.spec.ts</span>
│   ├── <span class="k">ui/</span>    <span class="s">login.spec.ts  registration.spec.ts  logout.spec.ts</span>
│   ├── <span class="k">fixtures/</span>
│   └── <span class="k">data/</span>
├── <span class="k">pages/</span>   <span class="s">LoginPage.ts  ContactsPage.ts</span>
├── <span class="k">utils/</span>   <span class="s">apiClient.ts  testData.ts</span>
├── <span class="s">playwright.config.ts</span>
├── <span class="s">package.json</span>
└── <span class="s">README.md</span></pre>`),
  S('Worked example: “a user can register”',OL(['<b>Requirement:</b> a user can register.','<b>Risk analysis:</b> duplicate account, invalid email, weak password rules, API/UI mismatch.','<b>API tests:</b> contract, status codes, validation, duplicate behaviour.','<b>UI test:</b> the critical user journey only.','<b>Test data:</b> a unique account per test.','<b>Assertion:</b> verify both application state and the user-visible result.','<b>Artifacts:</b> trace/screenshot on failure.','<b>CI:</b> registration smoke on pull requests.','<b>Regression:</b> broader registration matrix after merge / nightly.','<b>Maintenance:</b> update test and docs in the same change.'])+CO('note','Key idea','Notice the split: many checks at API level, one journey at UI level. That is the test pyramid in practice.')),
 ],
 quiz:[
  {q:'In the registration example, why generate a unique account per test?',o:['To make reports prettier','So tests stay independent and can run in parallel without colliding','Because the API requires it','To slow tests down'],a:1,why:'Shared accounts are a top cause of flaky, order-dependent tests, especially in parallel.'},
 ],src:['pw','yk']},

{id:'ci-cd',track:'frame',title:'CI/CD and continuous testing',min:8,
 sum:'Don’t run everything everywhere — give risk-appropriate feedback at each pipeline stage, with useful artifacts.',
 sections:[
  S('Suites by stage',`<div class="pipeline">
   <div><b>LOCAL</b>Focused unit/component/API — fast dev feedback</div>
   <div><b>PULL REQUEST</b>Lint + unit + smoke + selected E2E/API</div>
   <div><b>POST-MERGE</b>Broader regression on the integrated branch</div>
   <div><b>NIGHTLY</b>Extended cross-browser / regression</div>
   <div><b>RELEASE</b>Release smoke + critical journeys</div>
   <div><b>SCHEDULED</b>Long-running / compatibility, trend monitoring</div></div>`),
  S('Artifacts to keep',UL(['JUnit-compatible results where supported','HTML reports','Screenshots on failure','Videos where useful','Playwright traces or equivalent','Logs','Environment/build metadata','Flaky-test and retry information'])),
  S('CI risks',UL(['Tests pass locally but fail in CI due to environment differences','Parallel workers share mutable data','Secrets appear in logs or reports','Artifacts contain personal/customer data','Retries turn real failures into misleading green builds','Unstable tests cause alert fatigue — teams stop trusting CI'])+CO('risk','Risk','Once a team starts re-running red builds “until green”, CI has stopped being a signal. Fix or quarantine flaky tests with an owner and an expiry.')),
 ],
 quiz:[
  {q:'Which suite best fits the pull-request stage?',o:['Full cross-browser regression','Lint + unit + smoke + selected E2E/API','Long-running compatibility suite','Nothing — test after merge'],a:1,why:'PR checks must be fast enough to run on every change while still catching regressions before merge.'},
  {q:'Which artifact most directly helps debug a failing Playwright test in CI?',o:['The package.json','A trace file','The README','The lockfile'],a:1,why:'Traces capture each step, DOM snapshots, network and console — the closest thing to replaying the failure.'},
 ],src:['pw','wiki']},

/* ---------------- QUALITY ---------------- */
{id:'strategy-risk',track:'qual',title:'Strategy and risk-based automation',min:10,
 sum:'Automate for valuable information, not test count. Start small, measure, and expand by risk and return.',
 sections:[
  S('Choosing a strategy',OL(['Identify business-critical workflows','Identify stable, deterministic checks','Identify the browser/platform combinations that matter','Identify API/service boundaries testable below the UI','Select the lowest level that gives sufficient confidence','Define test-data creation and cleanup before large E2E suites','Define locator conventions','Define isolation and parallel-execution rules','Define reporting and failure artifacts','Put a small smoke suite into CI first','Measure flakiness and maintenance cost','Expand by risk and return, not raw test-count targets'])),
  S('Risk factors',T(['Risk factor','Automation implication'],[['High business impact','Prioritise stable automated regression'],['High execution frequency','Strong candidate'],['Highly repetitive','Strong candidate'],['Stable expected behaviour','Good candidate'],['Frequent UI redesign','Prefer lower-level/API checks'],['Highly exploratory','Human exploratory testing stays important'],['Complex environment dependency','Automate only once the environment is controlled'],['Sensitive data','Add masking, secret management, artifact controls']])),
  S('A practical test matrix',T(['Feature','Positive','Negative','Boundary','Security','Level'],[
   ['Registration','Valid registration','Existing email / invalid data','Min/max field lengths','Injection / rate limiting','API + selected E2E'],
   ['Login','Valid credentials','Wrong password / locked user','Empty / max inputs','Auth / session checks','API + E2E'],
   ['Contacts','Create / update / delete','Missing required fields','Max field lengths','Authorisation','API + E2E'],
   ['Multi-tenancy','Tenant A sees own data','Tenant A requests Tenant B data','Many records / users','Tenant isolation','API + E2E'],
   ['Search','Expected result','No results / malformed input','Long queries','Injection','API / component / E2E']])+CO('tip','Tip','For every feature, write at least one negative and one boundary case. ISTQB techniques — equivalence partitioning and boundary value analysis — map directly onto these columns.')),
 ],
 quiz:[
  {q:'A settings page is redesigned every sprint but its backend rules are stable. How do you automate it?',o:['Heavy UI E2E coverage','Mostly API/lower-level checks, minimal UI','Don’t test it','Record/playback only'],a:1,why:'Frequent UI redesign → prefer lower-level checks, which survive layout changes.'},
  {q:'Which is the better success metric for an automation effort?',o:['Number of automated test cases','Valuable risk coverage with a low flaky rate and manageable maintenance','Lines of test code','Percentage of manual tests converted'],a:1,why:'The guide is explicit: prioritise valuable information, not the number of tests.'},
 ],src:['wiki','yk']},

{id:'flaky-tests',track:'qual',title:'Flaky tests and reliability',min:8,
 sum:'A flaky test changes result without a relevant change in the system or the test’s intent. It erodes trust faster than anything else.',
 sections:[
  S('Common causes',UL(['Timing / synchronisation defects','Shared test data','Tests that depend on execution order','External services with variable behaviour','Unstable environments','Non-deterministic application behaviour','Weak selectors','Asynchronous UI updates','Resource exhaustion in CI','Parallel execution collisions'])),
  S('Prevention',UL(['Prefer condition-based waiting over arbitrary sleeps','Isolate test data','Keep tests independent','Use resilient, meaningful selectors','Control external dependencies where appropriate','Collect diagnostic artifacts on failure','Track retries separately from genuine passes','Quarantine only with explicit ownership and an expiry date'])),
  S('Wait for a condition, not a clock',`<pre class="code"><span class="c">// fragile — guesses how long the app needs</span>
<span class="k">await</span> page.waitForTimeout(<span class="s">3000</span>);
<span class="k">await</span> page.click(<span class="s">'#submit'</span>);

<span class="c">// robust — waits for the real state, via a meaningful locator</span>
<span class="k">await</span> page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Submit'</span> }).click();
<span class="k">await</span> expect(page.getByText(<span class="s">'Saved'</span>)).toBeVisible();</pre>`+CO('note','Key idea','Retries are a diagnostic tool, not a fix. A test that needs retries to pass is telling you something about the test, the app or the environment.')),
 ],
 quiz:[
  {q:'A test passes alone but fails when the full suite runs in parallel. Most likely cause?',o:['Browser bug','Shared mutable test data / collisions between workers','Wrong assertion library','Network is too fast'],a:1,why:'Pass-alone, fail-together is the fingerprint of shared state or order dependency.'},
  {q:'What is the right way to quarantine a flaky test?',o:['Delete it','Skip it silently','Quarantine with a named owner and an expiry date','Increase retries to 5'],a:2,why:'Without ownership and expiry, quarantined tests are forgotten and the coverage is silently lost.'},
 ],src:['pw','wiki']},

{id:'security-performance',track:'qual',title:'Security, privacy and performance',min:7,
 sum:'Test infrastructure is security-sensitive, and more parallel workers don’t automatically mean faster runs.',
 sections:[
  S('Security and privacy',UL(['Never commit real passwords, API tokens, private keys or production secrets','Use environment variables or approved secret stores','Mask credentials in logs and reports','Avoid sending real customer data to hosted reporting services','Review screenshots, videos and traces for sensitive data','Test authorisation boundaries explicitly — not just successful login','For multi-tenant systems, test positive isolation and deliberate cross-tenant access attempts','Treat CI agents and remote browser infrastructure as security-sensitive'])),
  S('Performance and scalability',UL(['Parallelism cuts elapsed time but raises CPU, RAM, browser and backend load','More workers aren’t always faster — shared environments become the bottleneck','Use API-level checks for high-volume validation','Use dedicated load tools, not E2E browser tests, for load testing','Monitor CI duration, queue time, browser start-up, retry rate and failure rate'])+CO('risk','Risk','A green login test proves nothing about authorisation. Add negative tests: user A must be refused user B’s data.')),
 ],
 quiz:[
  {q:'Where should test credentials live?',o:['Hard-coded in the spec file','In a committed .env file','In environment variables or an approved secret store','In the README'],a:2,why:'Secrets never go into source control; inject them at runtime from a secret store.'},
  {q:'Doubling workers from 8 to 16 made CI slower. Plausible reason?',o:['Playwright bug','The shared test environment or backend became the bottleneck','Too few tests','Reports are too large'],a:1,why:'Parallelism moves load onto shared resources; past a point they saturate and everything slows down.'},
 ],src:['wiki']},

{id:'failure-modes',track:'qual',title:'How automation projects fail',min:6,
 sum:'A red-team view: the failure modes, how to spot them, and what prevents them.',
 sections:[
  S('Failure modes',T(['Failure mode','Typical cause','Detection','Mitigation'],[
   ['Green but untrustworthy','Assertions verify weak signals','Review failures / false positives','Strengthen oracles'],
   ['Flaky suite','Timing, shared data, environment','Repeated runs, retry analytics','Isolation + synchronisation'],
   ['Slow CI','Too many E2E tests','Pipeline duration trend','Test pyramid + parallelism'],
   ['Maintenance explosion','Over-abstraction, brittle selectors','Frequent test edits','Simplify abstractions'],
   ['False security confidence','Only happy-path auth tests','Security review','Negative authorisation tests'],
   ['Data leakage','Artifacts contain secrets/PII','Artifact inspection','Masking + retention controls'],
   ['Tool lock-in','Framework hides fundamentals','Migration-effort analysis','Document architecture and boundaries'],
   ['Documentation drift','Docs not updated with code','New-engineer setup failures','Docs in the same PR']])),
  S('Key lessons for a junior automation engineer',OL(['Learn test design before syntax','Know the difference between a test case, a script, a framework and a pipeline','Use API tests when the UI adds no confidence','Use E2E for critical journeys and integration confidence','Prefer stable locators and meaningful assertions','Don’t use retries instead of fixing flakiness','Keep tests independent and data isolated','Treat reports and traces as evidence, not decoration','Document how the framework works, not only how to start it','Use risk to decide what deserves automation','Keep the framework simple enough for another engineer to understand'])),
 ],
 quiz:[
  {q:'A test asserts only that the page returned HTTP 200. Which failure mode is this?',o:['Tool lock-in','Green but untrustworthy','Documentation drift','Slow CI'],a:1,why:'A 200 status says little about correct behaviour — a weak oracle that makes green builds untrustworthy.'},
 ],src:['yk','wiki']},

/* ---------------- AI ---------------- */
{id:'ai-for-testing',track:'ai',title:'Using AI for testing',min:9,
 sum:'AI-augmented and agentic tools that generate, maintain, triage and execute tests — and how to judge them.',
 sections:[
  S('Two meanings of “AI testing”',`<p><b>Using AI for testing</b> (this module) and <b>testing AI-based systems</b> (next). ISTQB split them: CT-AI v2.0 now focuses entirely on testing AI-based systems.</p>`),
  S('Key capabilities',T(['Capability','What it does'],[['GenAI test generation','LLMs draft test plans, cases and scripts from requirements, tickets or plain English'],['Self-healing automation','Tests adapt to UI/API changes; the tool proposes a repair — attacking the real cost driver, maintenance'],['Intelligent failure triage','Clusters failures, suggests root causes, flags flaky tests'],['Agentic testing','Autonomous agents explore an app, design tests and validate results — the defining 2026 shift from assisted to agentic']])),
  S('Market landscape (2026)',`${UL(['Test automation market ≈ <b>$24.25B in 2026</b>, projected <b>$84B by 2034</b> (~17% CAGR); over 72% of organisations have some automation (vendor-published estimates: ContextQA, TestDino)','Gartner’s first Magic Quadrant for AI-Augmented Software Testing Tools (Oct 2025) renamed the category “Agentic Software Quality Assurance Platforms”'])}
   ${T(['Category','Examples'],[['AI-powered platforms','ACCELQ, mabl, ContextQA, Testsigma, KaneAI'],['Open-source frameworks','Selenium, Playwright, Cypress, Appium, k6'],['Enterprise suites','Tricentis Tosca/qTest, Parasoft SOAtest, Katalon, Worksoft, BrowserStack']])}`),
  S('How to evaluate AI testing tools',UL(['Judge by <b>recurring maintenance cost</b>, not authoring speed — keeping a test alive through redesigns is the bill that decides ROI','Check CI/CD integration (Jenkins, GitHub Actions, GitLab CI, Azure DevOps) with triggers on commits and PRs','Be sceptical of “agentic” marketing — many tools only generate scripts'])+CO('risk','Risk','Self-healing can quietly “heal” a test into passing against a real regression. Review what the tool changed, and keep healing decisions visible in reports.')),
 ],
 quiz:[
  {q:'What is the most important cost to evaluate in an AI testing tool?',o:['How fast it writes the first test','Recurring maintenance cost over redesigns','Number of integrations listed on the website','Whether it uses the newest LLM'],a:1,why:'Authoring is a one-off cost; maintenance recurs forever and decides ROI.'},
  {q:'A vendor calls its tool “agentic”, but it only turns prompts into scripts. What is that?',o:['Agentic testing','Script generation marketed as agentic','Self-healing','Failure triage'],a:1,why:'True agentic testing explores, designs and validates autonomously; the research warns many vendors overclaim.'},
 ],src:['istqb','gartner','virt','tgrid','tmind','cqa','tdino','tguild']},

{id:'testing-ai-systems',track:'ai',title:'Testing AI-based systems',min:11,
 sum:'ML and generative systems break deterministic oracles. Testing shifts to statistical oracles, data quality and continuous monitoring.',
 sections:[
  S('Why AI systems are hard to test',T(['Characteristic','Testing implication'],[
   ['Probabilistic, non-deterministic output','No single expected result; oracles become statistical (accuracy, precision/recall, tolerances)'],
   ['Self-learning / evolving behaviour','Passes today, fails tomorrow without code changes — regression is continuous'],
   ['Reliance on data','Quality is set by training/test data; data preparation and data quality become test activities'],
   ['Complexity and opacity','Deep networks are hard to interpret; requires explainability testing'],
   ['Bias and ethics','Fairness across demographic groups must be tested explicitly'],
   ['Dynamic specifications','Behaviour isn’t fixed logic in code; specs are statistical and emergent']])),
  S('AI-specific test approaches',UL(['<b>ML performance metrics</b> — calculate and interpret accuracy, precision, recall, F1 and confusion matrices','<b>Two ML-specific test levels</b> — offline model testing on held-out data, and post-deployment testing with online monitoring and drift detection','<b>ISO/IEC 25059</b> — the SQuaRE quality model extended with AI characteristics (e.g. adaptability, functional suitability for ML)','<b>Testing generative AI / LLMs</b> — prompt-response evaluation, hallucination checks, groundedness, safety','<b>Test infrastructure</b> — reproducible data pipelines, versioned models, statistical analysis instead of deterministic pass/fail'])),
  S('Metrics in one example',`<p>A spam filter is tested on 1,000 held-out emails: 100 are spam. It flags 90 emails, 80 of them correctly.</p>
   ${T(['','Predicted spam','Predicted not spam'],[['Actually spam','80 (TP)','20 (FN)'],['Actually not spam','10 (FP)','890 (TN)']])}
   <pre class="code"><span class="k">accuracy</span>  = (TP+TN)/all     = 970/1000 = <span class="s">0.97</span>
<span class="k">precision</span> = TP/(TP+FP)       = 80/90    = <span class="s">0.889</span>   <span class="c"># of flagged, how many were spam</span>
<span class="k">recall</span>    = TP/(TP+FN)       = 80/100   = <span class="s">0.80</span>    <span class="c"># of spam, how much was caught</span>
<span class="k">F1</span>        = 2·P·R/(P+R)                 = <span class="s">0.842</span></pre>
   ${CO('note','Key idea','97% accuracy sounds great, yet one spam in five gets through. With imbalanced classes, accuracy alone is a weak oracle — look at precision and recall.')}`),
  S('Where testers add most value',UL(['Training-data selection and quality','Test-data design, including edge cases and adversarial inputs','Metric definition','Model evaluation','Production monitoring'])),
  S('Certification path',`<p><b>ISTQB CT-AI v2.0 (Foundation Level)</b> requires a Foundation Level certificate first. Focus: ML workflows, data preparation, performance evaluation, GenAI testing, ISO/IEC 25059. Exams through ISTQB boards, BCS and AT*SQA (AT*SQA vouchers give a 365-day scheduling window).</p>`),
 ],
 quiz:[
  {q:'In the spam example, which metric shows that 20% of spam slips through?',o:['Accuracy','Precision','Recall','F1'],a:2,why:'Recall = TP/(TP+FN) = 0.80, so 20% of actual spam is missed.'},
  {q:'A model passes all tests in March and degrades in May with no code change. What is this?',o:['A flaky test','Data/concept drift — needs post-deployment monitoring','A compiler bug','A wrong locator'],a:1,why:'Evolving behaviour and changing input data mean regression is continuous; drift detection in production is its own test level.'},
  {q:'What replaces a deterministic pass/fail oracle for ML systems?',o:['Nothing — they can’t be tested','Statistical oracles: metrics, tolerances and monitoring','Screenshots','Manual testing only'],a:1,why:'That is the central takeaway of the research: statistical oracles with thresholds and continuous monitoring.'},
 ],src:['istqb','istqbc','bcs','atsqa']},
];

const GLOSSARY=[
 ['Test oracle','The source of the expected result that tells you whether an outcome is correct.','found'],
 ['Regression test','A test that re-checks existing functionality after a change.','found'],
 ['Smoke suite','A small, fast critical-path suite that establishes whether a build is testable at all.','found'],
 ['Test pyramid','Many fast low-level tests, fewer API tests, a few E2E tests on top.','found'],
 ['Data-driven testing','Running the same test logic against many input/expected-output rows.','found'],
 ['Locator','Playwright’s way to find elements robustly — prefer role, label or text over brittle CSS.','tools'],
 ['Web-first assertion','An assertion that waits for the page to reach the expected state before failing.','tools'],
 ['Fixture','Reusable setup/teardown injected into tests.','tools'],
 ['Browser context','An isolated browser session (own cookies/storage) — the unit of test isolation in Playwright.','tools'],
 ['Trace Viewer','Playwright tool to replay a run step by step with DOM snapshots, network and console.','tools'],
 ['Time-travel snapshots','Cypress Command Log feature showing app state before/after each command.','tools'],
 ['WebDriver','Selenium’s language-neutral protocol/API for controlling browsers.','tools'],
 ['Selenium Grid','Routes WebDriver sessions to remote browsers for parallel, cross-platform runs.','tools'],
 ['Page Object Model','A pattern encapsulating a page’s locators and interactions so tests express intent.','frame'],
 ['Framework core','Shared technical services: config, fixtures, logging, browser/driver factory.','frame'],
 ['Documentation drift','When docs no longer match the framework because they weren’t updated in the same change.','frame'],
 ['JUnit XML','A machine-readable test-result format most CI systems can display.','frame'],
 ['Flaky test','A test whose result changes without a relevant change in the system or the test intent.','qual'],
 ['Quarantine','Temporarily isolating a flaky test — only with a named owner and an expiry.','qual'],
 ['Tenant isolation','Guarantee that one customer’s data can never be read by another in a multi-tenant system.','qual'],
 ['Boundary value analysis','Testing at and just around the edges of valid input ranges.','qual'],
 ['Self-healing','AI tooling that repairs tests after UI/API changes instead of letting them break.','ai'],
 ['Agentic testing','Autonomous AI agents that explore an app, design tests and validate results.','ai'],
 ['Precision','Of the items flagged positive, the fraction that truly are: TP / (TP + FP).','ai'],
 ['Recall','Of the truly positive items, the fraction caught: TP / (TP + FN).','ai'],
 ['F1 score','Harmonic mean of precision and recall: 2PR / (P + R).','ai'],
 ['Model drift','Degradation of an ML model in production as data or behaviour shifts over time.','ai'],
 ['Hallucination','A generative model producing fluent but unsupported or false content.','ai'],
 ['Groundedness','Whether an LLM answer is supported by the provided source material.','ai'],
 ['ISO/IEC 25059','The SQuaRE quality model extended with AI-specific quality characteristics.','ai'],
];

const FRAMEWORK_CHECKS=['Can a new engineer install and run one test quickly?','Are supported Node/browser/tool versions documented?','Is the test-runner configuration centralised?','Are tests isolated from each other?','Can tests run in parallel safely?','Is test data deterministic and cleaned up?','Are secrets excluded from source control?','Are selectors stable and meaningful?','Are arbitrary waits minimised?','Are failures accompanied by useful artifacts?','Are retries visible and monitored?','Is flaky-test ownership defined?','Is CI behaviour documented?','Are browser/platform combinations explicitly justified?','Is there a smoke suite?','Is API coverage used where UI coverage is unnecessary?','Are accessibility checks included where relevant?','Are authorisation and tenant-isolation scenarios tested?','Are documentation changes part of framework changes?','Is the framework simple enough for the team to maintain?'];

const STUDY_PATH=['Understand manual testing, test-design techniques and risk analysis','Learn HTTP, REST, JSON, status codes and API testing','Learn basic JavaScript/TypeScript and Git','Build a small Playwright project','Add API tests and UI tests','Introduce fixtures, reusable test data and Page Objects — only where they help','Add HTML reporting and failure artifacts','Run the suite in GitHub Actions','Study Selenium WebDriver and Grid for the wider ecosystem','Study Cypress for a different architecture and component testing','Practise exploratory testing alongside automation','Review your framework regularly for flakiness, speed, security, maintainability and drift','Learn ML metrics and GenAI testing; consider ISTQB CT-AI v2.0'];
