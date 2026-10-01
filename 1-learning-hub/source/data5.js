/* ================= v5: deeper tool modules, Katalon / Applitools / Vibium, framework landscape, AI in automation, picture flashcards ================= */
/* New sections are APPENDED to existing modules (never inserted), so the translated sections before them still line up. */
SRC.pwagents=['Playwright docs — Test agents','https://playwright.dev/docs/test-agents'];
SRC.pwmock=['Playwright docs — Mock APIs','https://playwright.dev/docs/mock'];
SRC.pwsnap=['Playwright docs — Visual comparisons','https://playwright.dev/docs/test-snapshots'];
SRC.pwmcp=['Playwright MCP (GitHub)','https://github.com/microsoft/playwright-mcp'];
SRC.cyint2=['Cypress docs — cy.intercept()','https://docs.cypress.io/api/commands/intercept'];
SRC.cyprompt=['Cypress docs — cy.prompt()','https://docs.cypress.io/api/commands/prompt'];
SRC.cyct2=['Cypress docs — Component testing','https://docs.cypress.io/app/component-testing/get-started'];
SRC.semgr2=['Selenium docs — Selenium Manager','https://www.selenium.dev/documentation/selenium_manager/'];
SRC.serel=['Selenium docs — Relative locators','https://www.selenium.dev/documentation/webdriver/elements/locators/#relative-locators'];
SRC.segrid=['Selenium docs — Grid components','https://www.selenium.dev/documentation/grid/architecture/'];
SRC.katalon=['Katalon — Docs','https://docs.katalon.com/'];
SRC.katrn=['Katalon — Product roundup May 2026','https://katalon.com/resources-center/blog/katalon-product-roundup-may-2026'];
SRC.katwiki=['Wikipedia — Katalon Studio','https://en.wikipedia.org/wiki/Katalon_Studio'];
SRC.apeyes=['Applitools — Eyes','https://applitools.com/platform/eyes/'];
SRC.apauto=['Applitools docs — Visual AI in Autonomous','https://applitools.com/docs/autonomous/visual-ai'];
SRC.apblog=['Applitools — Autonomous and Eyes updates','https://applitools.com/blog/applitools-autonomous-eyes-ai-testing-updates/'];
SRC.vibium=['Vibium (GitHub)','https://github.com/VibiumDev/vibium'];
SRC.vibguild=['TestGuild — Vibium from Selenium’s creator','https://testguild.com/vibium-the-new-selenium/'];
SRC.bidi=['W3C — WebDriver BiDi','https://www.w3.org/TR/webdriver-bidi/'];
SRC.wdio=['WebdriverIO docs','https://webdriver.io/docs/what-is-webdriverio'];
SRC.robot=['Robot Framework','https://robotframework.org/'];
SRC.appium=['Appium docs','https://appium.io/docs/en/latest/'];
SRC.karate=['Karate (GitHub)','https://github.com/karatelabs/karate'];
SRC.cucumber=['Cucumber docs','https://cucumber.io/docs/'];
SRC.mcp=['Model Context Protocol','https://modelcontextprotocol.io/'];
SRC.healenium=['Healenium','https://healenium.io/'];

/* ---------- Playwright: going further ---------- */
M('playwright').sections.push(
 S('Mocking the network and calling APIs in one test',`<p>Playwright can intercept any request the page makes. Use it to force rare states (errors, empty lists, slow responses) and to prepare data through the API before driving the UI.</p>
<pre class="code"><span class="k">test</span>(<span class="s">'shows an error banner when the API fails'</span>, <span class="k">async</span> ({ page, request }) =&gt; {
  <span class="c">// arrange through the API — faster and more reliable than clicking</span>
  <span class="k">await</span> request.post(<span class="s">'/api/contacts'</span>, { data: { name: <span class="s">'Ada'</span> } });

  <span class="c">// force the list endpoint to fail</span>
  <span class="k">await</span> page.route(<span class="s">'**/api/contacts'</span>, route =&gt;
    route.fulfill({ status: <span class="s">500</span>, json: { error: <span class="s">'boom'</span> } }));

  <span class="k">await</span> page.goto(<span class="s">'/contacts'</span>);
  <span class="k">await</span> expect(page.getByRole(<span class="s">'alert'</span>)).toHaveText(<span class="s">/could not load/i</span>);
});</pre>
${CO('tip','Tip','<code class="i">route.fetch()</code> gets the real response so you can change one field and pass the rest through. That keeps a mock close to reality.')}`),
 S('Visual comparisons',`<p><code class="i">toHaveScreenshot()</code> compares a screenshot with a stored baseline, pixel by pixel. The first run writes the baseline; later runs fail when the difference exceeds your threshold.</p>
<pre class="code"><span class="k">await</span> expect(page).toHaveScreenshot(<span class="s">'dashboard.png'</span>, {
  mask: [page.getByTestId(<span class="s">'clock'</span>)],   <span class="c">// hide dynamic regions</span>
  maxDiffPixelRatio: <span class="s">0.01</span>,
});
<span class="c">$</span> <span class="k">npx playwright test</span> <span class="s">--update-snapshots</span>   <span class="c"># accept intentional changes</span></pre>
${CO('risk','Risk','Baselines depend on OS, fonts and browser version. Generate and compare them in the same environment, usually a pinned Docker image in CI, or every run will differ.')}`),
 S('The debugging toolkit',T(['Tool','Start it with','Use it when'],[
  ['UI mode','<code class="i">npx playwright test --ui</code>','Writing tests: watch mode, time travel, pick locators'],
  ['Inspector','<code class="i">npx playwright test --debug</code>','Stepping through one test line by line'],
  ['Trace Viewer','<code class="i">npx playwright show-trace trace.zip</code>','A CI failure you can’t reproduce locally'],
  ['Codegen','<code class="i">npx playwright codegen URL</code>','Getting a first draft of locators and steps'],
  ['VS Code extension','Testing sidebar','Running, debugging and recording from the editor'],
  ['HTML report','<code class="i">npx playwright show-report</code>','Reviewing a whole run, including retries and attachments']])),
 S('AI and Playwright: MCP and test agents',`<p>Playwright now ships features built for AI coding assistants:</p>
${UL(['<b>Playwright MCP</b>: a Model Context Protocol server that lets an assistant drive a real browser using the page’s accessibility tree rather than screenshots.','<b>Test agents</b>: three agent definitions installed with <code class="i">npx playwright init-agents --loop=vscode</code> (or <code class="i">claude</code>, <code class="i">codex</code>, <code class="i">opencode</code>). The <b>planner</b> explores the app and writes a Markdown test plan, the <b>generator</b> turns the plan into test files and checks locators against the live app, and the <b>healer</b> runs failing tests and proposes fixes.'])}
${CO('note','Key idea','The agents produce ordinary Playwright code. Review it like a colleague’s pull request: check the assertions really test the requirement, and never accept a “heal” that only loosens an assertion.')}`),
);
addSrc('playwright','pwmock','pwsnap','pwagents','pwmcp');

/* ---------- Cypress: going further ---------- */
M('cypress').sections.push(
 S('cy.intercept() in practice',`<p><code class="i">cy.intercept()</code> both <b>spies</b> on requests (to wait for them) and <b>stubs</b> them (to control responses). Waiting on an alias is the reliable replacement for <code class="i">cy.wait(3000)</code>.</p>
<pre class="code">cy.intercept(<span class="s">'GET'</span>, <span class="s">'/api/contacts*'</span>).as(<span class="s">'list'</span>);             <span class="c">// spy</span>
cy.intercept(<span class="s">'POST'</span>, <span class="s">'/api/contacts'</span>, { statusCode: <span class="s">409</span>,
  body: { error: <span class="s">'duplicate'</span> } }).as(<span class="s">'create'</span>);                  <span class="c">// stub</span>

cy.visit(<span class="s">'/contacts'</span>);
cy.wait(<span class="s">'@list'</span>).its(<span class="s">'response.statusCode'</span>).should(<span class="s">'eq'</span>, <span class="s">200</span>);
cy.get(<span class="s">'[data-cy=new]'</span>).click();
cy.get(<span class="s">'[data-cy=save]'</span>).click();
cy.wait(<span class="s">'@create'</span>);
cy.contains(<span class="s">'already exists'</span>).should(<span class="s">'be.visible'</span>);</pre>`),
 S('Component testing',`<p>Component tests mount one component in a real browser, without the rest of the app. They are faster than E2E tests and catch rendering and interaction bugs early.</p>
<pre class="code"><span class="k">import</span> Counter <span class="k">from</span> <span class="s">'./Counter'</span>;

it(<span class="s">'increments'</span>, () =&gt; {
  cy.mount(&lt;Counter initial={<span class="s">2</span>} /&gt;);
  cy.get(<span class="s">'[data-cy=inc]'</span>).click();
  cy.get(<span class="s">'[data-cy=value]'</span>).should(<span class="s">'have.text'</span>, <span class="s">'3'</span>);
});</pre>
<p>Cypress supports React, Vue, Angular and Svelte through framework adapters, and uses your app’s own bundler (Vite or webpack).</p>`),
 S('cy.prompt(): tests from plain language',`<p><code class="i">cy.prompt()</code> takes a list of natural-language steps, asks an AI model to turn them into Cypress commands, runs them, and caches the result. It needs Cypress Cloud and was released as an experimental feature, so check its current status first.</p>
<pre class="code">cy.prompt([
  <span class="s">'visit the login page'</span>,
  <span class="s">'type "qa@example.com" in the email field'</span>,
  <span class="s">'click the sign-in button'</span>,
  <span class="s">'check that the dashboard heading is visible'</span>,
]);</pre>
${UL(['<b>Cache-based healing</b>: when a selector breaks, Cypress first tries other candidate selectors it stored earlier, without calling the model.','<b>AI-based healing</b>: if none match, it sends that step and the current page to the model, and caches the new selector.','<b>Eject to code</b>: you can save the generated commands as normal test code and stop depending on the model.'])}
${CO('risk','Risk','Healing can hide a real change. If the “Sign in” button silently became “Continue”, a healed test passes while a user-facing change went unreviewed. Read the healing log.')}`),
);
addSrc('cypress','cyint2','cyct2','cyprompt');

/* ---------- Selenium: going further ---------- */
M('selenium').sections.push(
 S('How Selenium 4 is put together',T(['Part','What it does'],[
  ['W3C WebDriver','The standard HTTP protocol between your code and the browser driver'],
  ['Language bindings','Java, Python, C#, JavaScript and Ruby clients for the same protocol'],
  ['Browser drivers','chromedriver, geckodriver, msedgedriver, safaridriver: translate commands into browser actions'],
  ['Selenium Manager','Built in since 4.6: finds or downloads the right driver (and browser) automatically'],
  ['WebDriver BiDi','The newer two-way WebSocket protocol: console logs, network events and more, streamed back to the test'],
  ['Grid 4','Router, distributor, session map, session queue, event bus and nodes; run standalone, hub-and-node or fully distributed']])),
 S('Relative locators and a Java page object',`<pre class="code"><span class="k">public class</span> LoginPage {
  <span class="k">private final</span> WebDriver driver;
  <span class="k">private final</span> WebDriverWait wait;
  <span class="k">private final</span> By email = By.id(<span class="s">"email"</span>);
  <span class="k">private final</span> By submit = By.cssSelector(<span class="s">"[data-test=submit]"</span>);

  <span class="k">public</span> LoginPage(WebDriver driver) {
    <span class="k">this</span>.driver = driver;
    <span class="k">this</span>.wait = <span class="k">new</span> WebDriverWait(driver, Duration.ofSeconds(<span class="s">10</span>));
  }

  <span class="k">public</span> HomePage loginAs(String user, String pass) {
    wait.until(ExpectedConditions.visibilityOfElementLocated(email)).sendKeys(user);
    <span class="c">// relative locator: the input just below the email field</span>
    driver.findElement(RelativeLocator.with(By.tagName(<span class="s">"input"</span>)).below(email)).sendKeys(pass);
    driver.findElement(submit).click();
    <span class="k">return new</span> HomePage(driver);
  }
}</pre>
<p>Relative locators (<code class="i">above</code>, <code class="i">below</code>, <code class="i">toLeftOf</code>, <code class="i">toRightOf</code>, <code class="i">near</code>) help when an element has no good attribute, but they depend on layout, so prefer IDs, test attributes or accessible names first.</p>`),
 S('Selenium and AI',`<p>Selenium itself has no built-in AI, but its ecosystem does:</p>
${UL(['<b>Healenium</b>: an open-source library that wraps WebDriver and, when a locator fails, picks the most similar element from the last passing run.','<b>Commercial platforms</b> (Katalon, Testim, Mabl and others) add self-healing and generation on top of WebDriver-style execution.','<b>Vibium</b>: a new project by Selenium’s creator, built on WebDriver BiDi for both AI agents and people. It has its own module in this hub.'])}`),
);
addSrc('selenium','semgr2','segrid','serel','healenium');

/* ---------- new module: framework landscape ---------- */
const FW_LANDSCAPE={id:'framework-landscape',track:'tools',title:'Beyond the big three: other frameworks',min:12,extra:true,
 sum:'WebdriverIO, Robot Framework, Cucumber, Appium, Karate, Puppeteer and others: what each is for and when to choose it.',
 sections:[
  S('What you’ll learn',UL(['Name the main tools outside Playwright, Cypress and Selenium','Tell a test runner from a BDD layer, a keyword framework and a mobile driver','Choose a tool from your team’s language, app type and existing infrastructure'])),
  S('The landscape at a glance',T(['Tool','Type','Language','Choose it for'],[
   ['WebdriverIO','Test framework on WebDriver and BiDi','JavaScript / TypeScript','A JS team that needs WebDriver standards, mobile via Appium, or many services'],
   ['Robot Framework','Keyword-driven framework','Python (keywords in plain text)','Mixed-skill teams, acceptance tests, RPA; uses SeleniumLibrary or Browser (Playwright) library'],
   ['Cucumber / SpecFlow-style BDD','Gherkin layer on top of a driver','Java, JS, Ruby, .NET…','Shared examples written with business people, not just “tests in English”'],
   ['Appium','Mobile automation driver (WebDriver protocol)','Any WebDriver client','Native, hybrid and mobile-web apps on iOS and Android'],
   ['Karate','API testing DSL (also UI and performance)','Gherkin-like DSL on the JVM','API tests without writing much Java; built-in JSON assertions'],
   ['REST Assured','API testing library','Java','Java teams writing API checks next to unit tests'],
   ['Puppeteer','Browser control library','JavaScript','Chrome/Firefox scripting, scraping, PDFs; not a test runner'],
   ['TestCafe','E2E framework','JavaScript / TypeScript','No WebDriver, simple setup, runs in any browser via a proxy'],
   ['Nightwatch','E2E framework on WebDriver','JavaScript','An all-in-one WebDriver runner with component testing'],
   ['Serenity BDD','Reporting and Screenplay layer','Java / JS','Living documentation reports and the Screenplay pattern']])),
  S('Layers, not rivals',`<p>Many of these tools stack rather than compete. A typical enterprise suite might be <b>Cucumber</b> (scenarios) → <b>Serenity</b> (Screenplay and reports) → <b>Selenium</b> (browser) → <b>Grid</b> (infrastructure). A mobile suite might be <b>WebdriverIO</b> → <b>Appium</b> → a device cloud.</p>
${T(['Layer','Question it answers','Examples'],[
   ['Specification','How do we describe behaviour?','Gherkin, Robot keyword tables'],
   ['Runner','How are tests found, run, retried and reported?','Playwright Test, Jest, JUnit, pytest, Mocha, TestNG'],
   ['Driver','How do we control the app?','WebDriver, BiDi, CDP, Appium, Playwright protocol'],
   ['Infrastructure','Where does it run?','Selenium Grid, device clouds, CI containers'],
   ['Reporting','How do people read results?','Allure, Serenity, HTML reporters, Cloud dashboards']])}`),
  S('Choosing: three questions',OL(['<b>Which language does the team already write?</b> A tool in a language nobody on the team knows will be abandoned.','<b>What is the app?</b> Web-only, mobile, desktop, API-heavy, or a mix.','<b>What already exists?</b> A working Grid, a device cloud, or thousands of Selenium tests change the maths.'])+CO('tip','Tip','Run a two-week proof of concept with your three hardest real scenarios (login with MFA, a file upload, a flaky third-party widget), not a demo site.')),
 ],
 quiz:[
  {q:'Which tool is designed for native iOS and Android apps through the WebDriver protocol?',o:['Puppeteer','Appium','Karate','TestCafe'],a:1,why:'Appium extends WebDriver to native, hybrid and mobile-web apps.'},
  {q:'In a stack of Cucumber → Serenity → Selenium → Grid, what does Cucumber provide?',o:['Browser control','Remote infrastructure','The specification layer: scenarios in Gherkin','HTML reporting only'],a:2,why:'Cucumber turns Gherkin scenarios into step calls; the driver and grid do the browser work.'},
  {q:'Your Java team wants API tests with minimal code and built-in JSON matching. Best fit?',o:['Karate','Puppeteer','Nightwatch','Cypress component testing'],a:0,why:'Karate is a JVM DSL made for API tests with built-in JSON assertions.'},
 ],src:['wdio','robot','cucumber','appium','karate']};

/* ---------- new module: Katalon ---------- */
const KATALON={id:'katalon',track:'tools',title:'Katalon',min:11,extra:true,
 sum:'A commercial low-code platform on top of Selenium and Appium: record, script in Groovy, and run web, API, mobile and desktop tests from one IDE.',
 sections:[
  S('What you’ll learn',UL(['Describe what Katalon Studio adds on top of Selenium and Appium','Read a Katalon test that uses the Object Repository and built-in keywords','Name Katalon’s AI features and what to check before relying on them','Weigh a low-code platform against a coded framework'])),
  S('What it is',`<p><b>Katalon Studio</b> is a test IDE built on Eclipse. Under the hood it drives browsers with <b>Selenium</b> and phones with <b>Appium</b>, and adds a recorder, an <b>Object Repository</b> of locators, hundreds of built-in keywords, data files and reports. Tests can be built in a <b>manual (table) view</b> or written in <b>Groovy</b> in the script view; both edit the same test.</p>
${T(['Part','What it does'],[
   ['Katalon Studio','The desktop IDE for web, API, mobile and Windows desktop tests'],
   ['Runtime Engine (KRE)','Runs Studio projects from the command line in CI; licensed separately'],
   ['TestOps / TruePlatform','Planning, results, analytics and scheduling across projects'],
   ['TestCloud','Hosted browsers and devices to run on'],
   ['TrueTest','Generates regression tests from how real users move through production'],
   ['AI assistant (formerly StudioAssist)','Turns natural-language steps into test code and explains existing code']])}`),
  S('A test in the script view',`<pre class="code">WebUI.openBrowser(<span class="s">''</span>)
WebUI.navigateToUrl(GlobalVariable.baseUrl + <span class="s">'/login'</span>)
WebUI.setText(findTestObject(<span class="s">'Login/input_Email'</span>), <span class="s">'qa@example.com'</span>)
WebUI.setEncryptedText(findTestObject(<span class="s">'Login/input_Password'</span>), GlobalVariable.password)
WebUI.click(findTestObject(<span class="s">'Login/btn_SignIn'</span>))
WebUI.verifyElementVisible(findTestObject(<span class="s">'Home/h1_Welcome'</span>))
WebUI.closeBrowser()</pre>
<p><code class="i">findTestObject()</code> looks up a locator by name in the Object Repository, so a changed button is fixed in one place. <code class="i">GlobalVariable</code> values come from execution profiles (dev, staging…).</p>`),
  S('Built-in AI features',UL(['<b>Self-healing</b>: when the main locator fails, Katalon tries the other locators it stored for that object (XPath, CSS, attributes, image) and logs the swap for review.','<b>Smart Wait</b>: waits for the page to stop changing before acting.','<b>AI assistant</b>: generates code from comments and explains or refactors selected code.','<b>TrueTest</b>: builds tests from real user sessions and regenerates them when a flow changes.'])+CO('risk','Risk','Approve healed locators back into the repository. A healed run that nobody reviews can hide a real UI change.')),
  S('Strengths and trade-offs',T(['Strengths','Trade-offs'],[
   ['Fast start for teams with little coding experience','Licensing: CI runs and advanced features need paid licences'],
   ['Web, API, mobile and desktop in one tool','Projects live in Katalon’s own format, which makes leaving harder'],
   ['Recorder plus Groovy when you need code','Groovy and Eclipse feel dated to many JS/TS developers'],
   ['Reports, analytics and scheduling included','Heavier to run in containers than a plain Node or Java project']])+CO('tip','Tip','Katalon suits mixed-skill teams that need breadth quickly. For a developer-led web team already in TypeScript, a coded framework is usually cheaper over time.')),
 ],
 quiz:[
  {q:'What does Katalon Studio use under the hood to drive web browsers?',o:['Its own browser engine','Selenium WebDriver','Cypress','Puppeteer only'],a:1,why:'Katalon is built on Selenium for web and Appium for mobile, with its own IDE and keywords on top.'},
  {q:'Why does Katalon keep locators in an Object Repository?',o:['To make tests run faster','So a changed element is fixed in one place for every test that uses it','Because Groovy cannot hold strings','To encrypt passwords'],a:1,why:'Central locators follow the same idea as page objects: one change, many tests fixed.'},
  {q:'What do you need to run Katalon tests from a CI server?',o:['Nothing beyond Studio','The Runtime Engine (KRE) with a licence','A Cypress Cloud account','Selenium IDE'],a:1,why:'Command-line execution in CI uses Katalon Runtime Engine, which is licensed.'},
 ],src:['katalon','katrn','katwiki']};

/* ---------- new module: Applitools ---------- */
const APPLITOOLS={id:'applitools',track:'tools',title:'Applitools and Visual AI',min:11,extra:true,
 sum:'Visual testing that compares screens the way a person would: Eyes, match levels, the Ultrafast Grid and the Autonomous platform.',
 sections:[
  S('What you’ll learn',UL(['Explain why pixel comparison is noisy and how Visual AI reduces the noise','Choose a match level for a page','Add a visual checkpoint to a Playwright or Cypress test','Run a baseline review without approving real bugs'])),
  S('Pixels vs Visual AI',`<p>A pixel diff flags any changed pixel: anti-aliasing, a font that rendered 1px wider, a moving carousel. Teams then raise thresholds until real bugs slip through. <b>Applitools Eyes</b> instead compares pages <b>structurally</b>, recognising text, images, layout and regions, so rendering noise is ignored while a missing button or overlapping text is still caught.</p>
${T(['','Pixel comparison','Visual AI (Eyes)'],[
   ['Anti-aliasing and sub-pixel shifts','Often fails','Ignored'],
   ['Missing or overlapping element','Fails','Fails'],
   ['Dynamic text (dates, names)','Needs masking','Layout or Dynamic match level'],
   ['Many browsers and devices','One run per browser','Capture once, render on the Ultrafast Grid']])}`),
  S('Match levels',T(['Level','Compares','Use it for'],[
   ['Strict (default)','What a person would notice: content, colour, position','Most pages'],
   ['Layout','Structure and alignment, not the text or images themselves','Pages with changing content, such as news feeds'],
   ['Ignore Colors','Everything except colour','Theme changes, dark mode checks'],
   ['Dynamic','Text patterns (dates, emails, numbers) instead of exact values','Dashboards with live data'],
   ['Exact','Pixel for pixel','Rarely; charts or images that must be identical']])+`<p>You can also mark <b>regions</b> on the baseline: ignore, floating, layout-only and so on, for one widget instead of the whole page.</p>`),
  S('Adding Eyes to a test',`<p>Add a visual checkpoint next to your existing test — one call, either tool:</p>
<pre class="code"><span class="c">// Playwright, using the Eyes fixture</span>
<span class="k">import</span> { test } <span class="k">from</span> <span class="s">'@applitools/eyes-playwright/fixture'</span>;

test(<span class="s">'pricing page looks right'</span>, <span class="k">async</span> ({ page, eyes }) =&gt; {
  <span class="k">await</span> page.goto(<span class="s">'/pricing'</span>);
  <span class="k">await</span> eyes.check(<span class="s">'Pricing'</span>, { fully: <span class="k">true</span> });   <span class="c">// full-page checkpoint</span>
});</pre>
<pre class="code"><span class="c">// Cypress</span>
cy.eyesOpen({ appName: <span class="s">'Shop'</span>, testName: <span class="s">'pricing'</span> });
cy.visit(<span class="s">'/pricing'</span>);
cy.eyesCheckWindow(<span class="s">'Pricing'</span>);
cy.eyesClose();</pre>
<p>The API key comes from the <code class="i">APPLITOOLS_API_KEY</code> environment variable. SDK names and options change between versions, so copy from the current docs.</p>`),
  S('Ultrafast Grid and Autonomous',UL(['<b>Ultrafast Grid</b>: the test runs once in one browser; Eyes captures the DOM and CSS and re-renders it on many browsers, viewports and devices in parallel in the cloud.','<b>Baseline review</b>: differences appear in the Eyes dashboard, where someone accepts (new baseline) or rejects (bug). Changes can be grouped so one decision covers many screens.','<b>Applitools Autonomous</b>: a separate platform that crawls the site, and lets you write functional, visual and API tests in plain English, with Visual AI checks on every step.'])+CO('risk','Risk','Accepting a baseline is a test decision. Agree who can accept, and never bulk-accept diffs you haven’t looked at: that turns a real bug into the new expected result.')),
 ],
 quiz:[
  {q:'A news page’s headlines change every hour but the layout must stay the same. Which match level?',o:['Exact','Strict','Layout','None needed'],a:2,why:'Layout checks structure and alignment while ignoring changing text and images.'},
  {q:'How does the Ultrafast Grid cover many browsers quickly?',o:['It runs the full test once per browser on local machines','It captures the DOM and CSS once and renders it on many browsers in the cloud','It only takes one screenshot','It converts tests to Selenium'],a:1,why:'Capture once, render everywhere: the functional test runs one time.'},
  {q:'What is the main danger in a visual baseline review?',o:['The dashboard is slow','Accepting a real bug as the new baseline','Too many match levels','Screenshots are too large'],a:1,why:'Once accepted, the bug becomes the expected result and future runs pass.'},
 ],src:['apeyes','apauto','apblog']};

/* ---------- new module: Vibium ---------- */
const VIBIUM={id:'vibium',track:'tools',title:'Vibium: AI-native browser automation',min:9,extra:true,
 sum:'A young open-source project from Selenium’s creator: one small binary, WebDriver BiDi underneath, and an MCP server so AI agents and tests share the same browser.',
 sections:[
  S('What you’ll learn',UL(['Explain where Vibium comes from and what problem it targets','Describe its architecture: client, binary, BiDi, browser','Write a first script and connect it to an AI assistant','Decide whether a young tool is ready for your suite'])),
  S('Why it exists',`<p>Jason Huggins created <b>Selenium</b> (2004) and <b>Appium</b> (2012). <b>Vibium</b> is his project for the AI era: browser automation that works equally well for a person writing tests and for an AI agent clicking through a site. It is free and open source (Apache 2.0).</p>
${T(['Idea','What it means'],[
   ['WebDriver BiDi','Built on the W3C two-way protocol instead of classic HTTP WebDriver or Chrome-only CDP'],
   ['One binary','A single Go program (“clicker”) handles the browser; it downloads Chrome for testing on first run'],
   ['Auto-waiting','Actions wait until the element is visible, stable, enabled and able to receive the event'],
   ['MCP built in','The same binary exposes an MCP server, so an assistant can drive the browser directly'],
   ['Thin clients','JavaScript/TypeScript and Python clients over the same engine']])}`),
  S('A first script',`<pre class="code"><span class="c">$</span> <span class="k">npm install</span> <span class="s">vibium</span>       <span class="c"># or: pip install vibium</span>

<span class="k">import</span> { browserSync } <span class="k">from</span> <span class="s">'vibium'</span>;

<span class="k">const</span> vibe = browserSync.launch();
vibe.go(<span class="s">'https://example.com'</span>);
<span class="k">const</span> link = vibe.find(<span class="s">'a'</span>);
console.log(link.text());
link.click();
vibe.quit();

<span class="c"># let an AI assistant use the same browser</span>
<span class="c">$</span> <span class="k">claude mcp add</span> <span class="s">vibium -- npx -y vibium</span></pre>
${CO('note','Check first','Vibium is new and its API is still changing. Treat this example as the shape of the API and copy exact calls from the project’s README.')}`),
  S('Should you adopt it?',T(['Consider it for','Wait if you need'],[
   ['Giving AI agents a browser through MCP','A mature runner with fixtures, sharding and HTML reports'],
   ['Small scripts and experiments on a standard protocol','Long-term support guarantees for a large regression suite'],
   ['Learning where WebDriver BiDi is heading','Wide community answers, plugins and hiring pool']])+CO('tip','Tip','A safe way to try it: use Vibium for AI-assisted exploration and bug reproduction, and keep your regression suite in an established framework until Vibium’s test runner matures.')),
 ],
 quiz:[
  {q:'Which protocol is Vibium built on?',o:['Classic HTTP WebDriver only','WebDriver BiDi','Cypress’s in-browser runner','Microsoft UI Automation'],a:1,why:'Vibium speaks the W3C WebDriver BiDi protocol over WebSockets.'},
  {q:'What lets an AI coding assistant drive Vibium’s browser?',o:['A Chrome extension','Its built-in MCP server','Selenium Grid','A Katalon plugin'],a:1,why:'The Vibium binary exposes an MCP server that assistants can connect to.'},
  {q:'Who created Vibium?',o:['The Cypress founders','Jason Huggins, creator of Selenium and Appium','The Playwright team at Microsoft','Katalon'],a:1,why:'Vibium is Jason Huggins’ project, following Selenium (2004) and Appium (2012).'},
 ],src:['vibium','vibguild','bidi']};

/* ---------- new module: AI in test automation ---------- */
const AI_AUTOMATION={id:'ai-test-automation',track:'ai',title:'AI in test automation, hands-on',min:14,extra:true,
 sum:'How AI shows up inside Playwright, Cypress, Selenium, Katalon, Applitools and Vibium, what it is good at, and the guardrails that keep a suite trustworthy.',
 sections:[
  S('What you’ll learn',UL(['Name five ways AI is used in test automation today','Compare the AI features of the main tools','Set up an agent workflow with human review','Spot the failure modes: false heals, weak assertions, leaked data'])),
  S('Five uses of AI',T(['Use','What happens','Examples'],[
   ['Generation','Plain-language steps or an app crawl become test code','Playwright generator agent, cy.prompt(), Katalon AI assistant, Applitools Autonomous'],
   ['Self-healing','A broken locator is replaced by the best match','Katalon, cy.prompt() caching, Healenium, Playwright healer agent'],
   ['Visual AI','Screens are compared like a person would','Applitools Eyes'],
   ['Agent browsing','An assistant drives a real browser through MCP','Playwright MCP, Vibium'],
   ['Analysis','Failures are grouped and a likely cause is suggested','Cloud dashboards, flaky-test detection']])),
  S('The tools side by side',T(['Tool','AI features','Runs where'],[
   ['Playwright','MCP server; planner, generator and healer agents that output normal test code','Your machine and CI; open source'],
   ['Cypress','cy.prompt() natural-language steps with cached and AI healing','Needs Cypress Cloud'],
   ['Selenium','None built in; Healenium and commercial layers add healing','Your infrastructure'],
   ['Katalon','Self-healing, Smart Wait, AI assistant, TrueTest from user sessions','Katalon platform; paid tiers'],
   ['Applitools','Visual AI, Autonomous plain-English tests','Applitools cloud'],
   ['Vibium','MCP server built in; designed for agents and people','Your machine; open source']])),
  S('An agent workflow with review',OL(['<b>Plan</b>: an agent explores the app and writes a Markdown plan. A tester edits it: adds risks, removes trivia.','<b>Generate</b>: the agent writes tests using the project’s fixtures and page objects (point it at them).','<b>Review</b>: a person reads every assertion. Does it check the requirement, or just that the page loaded?','<b>Run in CI</b>: generated tests go through the same gates as hand-written ones.','<b>Heal with approval</b>: proposed fixes arrive as a pull request, never as a silent change.'])+CO('tip','Tip','Keep a short <code class="i">AGENTS.md</code> or instructions file: locator rules, fixtures to use, what never to mock. Agents follow written rules far better than implied ones.')),
  S('Failure modes and guardrails',T(['Failure mode','Guardrail'],[
   ['A heal clicks the wrong but similar element','Log every heal; fail the build on heals in critical flows'],
   ['Generated assertions are weak (“page has a title”)','Review checklist: each test must assert a business outcome'],
   ['Healing hides a real UI change','Treat heals as review items, not fixes'],
   ['Prompts and page data leave your network','Use test data only; check the vendor’s data retention'],
   ['Non-deterministic generation','Commit the generated code; don’t regenerate on every run'],
   ['Costs grow with each AI call','Cache results; call the model only on change']])+CO('risk','Risk','An AI that makes a red test green has not fixed anything until a person confirms the product is right. The goal is fewer false failures, not fewer failures.')),
 ],
 quiz:[
  {q:'An AI healer changed a locator and the checkout test passes again. What should happen next?',o:['Nothing, the test is green','A person reviews the heal, because the UI change itself may be a bug','Delete the old locator history','Turn healing off everywhere'],a:1,why:'A heal is a proposal. The UI changed for a reason, and that reason may be a defect.'},
  {q:'Which tool’s AI agents output ordinary test files you commit to the repository?',o:['Playwright test agents','Applitools Ultrafast Grid','Katalon TestOps','Selenium Grid'],a:0,why:'The planner, generator and healer produce and edit normal Playwright test code.'},
  {q:'Why commit AI-generated test code instead of regenerating it on each run?',o:['Generation is non-deterministic, so each run could test something different','Git needs it','Models cannot run in CI','It makes tests slower'],a:0,why:'A stable, reviewed test is the point. Regenerating every run makes results incomparable.'},
 ],src:['pwagents','pwmcp','cyprompt','apeyes','katalon','vibium','mcp','healenium']};

MODULES.splice(MODULES.findIndex(m=>m.id==='api-testing')+1,0,FW_LANDSCAPE,KATALON,APPLITOOLS,VIBIUM);
MODULES.splice(MODULES.findIndex(m=>m.id==='ai-for-testing')+1,0,AI_AUTOMATION);
TRACKS.find(t=>t.id==='tools').blurb='Playwright, Cypress, Selenium, Katalon, Applitools, Vibium and the wider framework landscape.';

/* ---------- new flashcards ---------- */
GLOSSARY.push(
 ['Katalon Studio','A low-code test IDE on top of Selenium and Appium, with a recorder, Object Repository and Groovy scripting.','tools'],
 ['Object Repository','Katalon’s central store of named locators, so a changed element is fixed once.','tools'],
 ['Visual AI','Comparing screens structurally, as a person would, instead of pixel by pixel (Applitools Eyes).','tools'],
 ['Match level','How strictly Applitools compares a checkpoint: Strict, Layout, Ignore Colors, Dynamic or Exact.','tools'],
 ['Ultrafast Grid','Applitools cloud that renders one captured DOM on many browsers and devices in parallel.','tools'],
 ['Vibium','Open-source, AI-native browser automation from Selenium’s creator, built on WebDriver BiDi with an MCP server.','tools'],
 ['WebDriver BiDi','The W3C two-way WebSocket protocol for browser automation, successor to classic HTTP WebDriver.','tools'],
 ['Selenium Manager','Built into Selenium 4.6+: finds or downloads the right browser driver automatically.','tools'],
 ['cy.intercept()','Cypress command that spies on or stubs network requests; wait on its alias instead of sleeping.','tools'],
 ['cy.prompt()','Cypress command that turns natural-language steps into cached, self-healing commands (needs Cypress Cloud).','ai'],
 ['Playwright test agents','Planner, generator and healer agent definitions that plan, write and repair Playwright tests.','ai'],
 ['MCP','Model Context Protocol: a standard way for AI assistants to call tools, such as driving a browser.','ai'],
 ['Visual baseline','The approved screenshot or snapshot a visual test compares against; accepting it is a test decision.','tools'],
 ['Appium','A WebDriver-based driver for native, hybrid and mobile-web apps on iOS and Android.','tools'],
 ['Gherkin','The Given / When / Then language of Cucumber scenarios, shared with business people.','frame'],
);

/* ---------- flashcard pictures: every card gets a small diagram (g[3] = picture key) ---------- */
const FC_PIC={
 'Test oracle':'eye','Regression test':'loop','Smoke suite':'smoke','Test pyramid':'pyramid','Data-driven testing':'table','Locator':'target',
 'Web-first assertion':'hourglass','Fixture':'plug','Browser context':'windows','Trace Viewer':'timeline','Time-travel snapshots':'timeline',
 'WebDriver':'protocol','Selenium Grid':'hub','Page Object Model':'page','Framework core':'gear','Documentation drift':'doc','JUnit XML':'code',
 'Flaky test':'flaky','Quarantine':'lock','Tenant isolation':'shield','Boundary value analysis':'ruler','Self-healing':'heal','Agentic testing':'robot',
 'Precision':'bullseye','Recall':'bullseye','F1 score':'bullseye','Model drift':'drift','Hallucination':'bubble','Groundedness':'anchor','ISO/IEC 25059':'badge',
 'Worker fixture':'plug','storageState':'key','Auto fixture':'plug','Golden dataset':'table','LLM-as-judge':'scale','Prompt injection':'syringe','RAG':'book',
 'K-level':'stairs','Equivalence partitioning':'split','Branch coverage':'branch','Confirmation testing':'check','Severity vs priority':'scale',
 'BOLA':'shield','Idempotent method':'loop','Contract testing':'handshake','Confabulation':'bubble','Faithfulness':'anchor',
 'Checking vs testing':'check','Test double':'mask','Ice-cream cone':'cone','Strict locator':'target','Retry-ability':'loop','Explicit wait':'hourglass',
 'Data-driven framework':'table','Keyword-driven framework':'blocks','Component object':'page','Screenplay pattern':'actor','Test data builder':'blocks',
 'Sharding':'split','Walking skeleton':'actor','Defect escape rate':'drift','Metamorphic testing':'split',
 'Katalon Studio':'blocks','Object Repository':'book','Visual AI':'eye','Match level':'scale','Ultrafast Grid':'hub','Vibium':'robot','WebDriver BiDi':'protocol',
 'Selenium Manager':'gear','cy.intercept()':'protocol','cy.prompt()':'bubble','Playwright test agents':'robot','MCP':'plug','Visual baseline':'windows','Appium':'phone','Gherkin':'doc',
};
const FC_TRACK_PIC={found:'pyramid',tools:'target',frame:'gear',qual:'shield',ai:'robot',cert:'badge'};
GLOSSARY.forEach(g=>{g[3]=FC_PIC[g[0]]||FC_TRACK_PIC[g[2]]||'check';});

/* 64×64 line pictures; stroke uses currentColor, soft fills use the brand tint, so both themes work */
const PIC=(()=>{const f='fill="var(--brand-soft)"';return{
 eye:`<path d="M6 32c7-12 16-18 26-18s19 6 26 18c-7 12-16 18-26 18S13 44 6 32z" ${f}/><circle cx="32" cy="32" r="9"/><circle cx="32" cy="32" r="3" fill="currentColor"/>`,
 loop:`<path d="M48 22a18 18 0 1 0 4 16"/><path d="M50 10v12H38"/>`,
 smoke:`<path d="M20 50h24M24 50c-6-8 0-12 0-20s8-10 8-18c4 6 12 10 12 22 0 8-4 12-6 16" ${f}/>`,
 pyramid:`<path d="M32 8 56 54H8z" ${f}/><path d="M18 36h28M24 24h16"/><text x="32" y="50" font-size="7" text-anchor="middle" fill="currentColor" stroke="none">UNIT</text><text x="32" y="33" font-size="6" text-anchor="middle" fill="currentColor" stroke="none">API</text><text x="32" y="21" font-size="5" text-anchor="middle" fill="currentColor" stroke="none">E2E</text>`,
 cone:`<path d="M20 26h24L32 58z"/><circle cx="32" cy="18" r="12" ${f}/><text x="32" y="21" font-size="6" text-anchor="middle" fill="currentColor" stroke="none">UI</text>`,
 table:`<rect x="10" y="12" width="44" height="40" rx="3" ${f}/><path d="M10 22h44M10 32h44M10 42h44M26 12v40"/>`,
 target:`<circle cx="32" cy="32" r="20" ${f}/><circle cx="32" cy="32" r="8"/><path d="M32 4v14M32 46v14M4 32h14M46 32h14"/>`,
 hourglass:`<path d="M18 8h28M18 56h28M22 8c0 14 20 14 20 24S22 42 22 56M42 8c0 14-20 14-20 24s20 10 20 24"/><path d="M26 50h12l-6-8z" fill="currentColor"/>`,
 plug:`<path d="M24 6v12M40 6v12"/><rect x="16" y="18" width="32" height="16" rx="4" ${f}/><path d="M32 34v10a8 8 0 0 1-8 8h-6"/>`,
 windows:`<rect x="6" y="12" width="30" height="24" rx="3" ${f}/><rect x="28" y="28" width="30" height="24" rx="3" fill="var(--surface-000)"/><path d="M6 18h30M28 34h30"/>`,
 timeline:`<path d="M6 32h52"/><circle cx="14" cy="32" r="4" fill="currentColor"/><circle cx="28" cy="32" r="4" ${f}/><circle cx="42" cy="32" r="4" ${f}/><circle cx="54" cy="32" r="4" ${f}/><rect x="20" y="10" width="16" height="12" rx="2"/><path d="M28 22v6"/>`,
 protocol:`<rect x="4" y="18" width="20" height="16" rx="2" ${f}/><path d="M2 40h24"/><rect x="40" y="14" width="20" height="28" rx="2"/><path d="M40 20h20M28 24h10l-4-4M36 32H26l4 4"/>`,
 hub:`<circle cx="32" cy="32" r="8" ${f}/><circle cx="10" cy="12" r="5"/><circle cx="54" cy="12" r="5"/><circle cx="10" cy="52" r="5"/><circle cx="54" cy="52" r="5"/><path d="M26 26 14 16M38 26l12-10M26 38 14 48M38 38l12 10"/>`,
 page:`<rect x="12" y="6" width="40" height="52" rx="3" ${f}/><rect x="18" y="14" width="28" height="6" rx="1"/><rect x="18" y="26" width="28" height="6" rx="1"/><rect x="30" y="42" width="16" height="8" rx="2" fill="currentColor"/>`,
 gear:`<circle cx="32" cy="32" r="10" ${f}/><path d="M32 6v10M32 48v10M6 32h10M48 32h10M13 13l7 7M44 44l7 7M13 51l7-7M44 20l7-7"/>`,
 doc:`<path d="M14 6h26l10 10v42H14z" ${f}/><path d="M40 6v10h10M20 28h24M20 36h24M20 44h14"/>`,
 code:`<path d="M22 18 8 32l14 14M42 18l14 14-14 14M36 12 28 52"/>`,
 flaky:`<path d="M4 40h10l6-18 8 28 8-34 8 24 6-8h10"/><circle cx="36" cy="16" r="2" fill="currentColor"/>`,
 lock:`<rect x="14" y="28" width="36" height="28" rx="4" ${f}/><path d="M22 28v-8a10 10 0 0 1 20 0v8"/><circle cx="32" cy="42" r="3" fill="currentColor"/>`,
 shield:`<path d="M32 6 52 14v16c0 14-9 22-20 28C21 52 12 44 12 30V14z" ${f}/><path d="m24 32 6 6 11-12"/>`,
 ruler:`<path d="M6 40h52"/><path d="M14 34v12M26 34v12M38 34v12M50 34v12"/><rect x="24" y="16" width="16" height="12" rx="2" ${f}/><path d="M26 28l-2 6M38 28l2 6"/>`,
 heal:`<rect x="10" y="24" width="44" height="16" rx="8" transform="rotate(-35 32 32)" ${f}/><path d="M28 28l8 8M36 28l-8 8"/>`,
 robot:`<rect x="14" y="20" width="36" height="28" rx="6" ${f}/><path d="M32 8v12M22 56h20M8 30v8M56 30v8"/><circle cx="32" cy="8" r="3"/><circle cx="25" cy="32" r="3" fill="currentColor"/><circle cx="39" cy="32" r="3" fill="currentColor"/><path d="M26 41h12"/>`,
 bullseye:`<circle cx="30" cy="34" r="22" ${f}/><circle cx="30" cy="34" r="13"/><circle cx="30" cy="34" r="4" fill="currentColor"/><path d="M30 34 56 8M50 8h6v6"/>`,
 drift:`<path d="M6 14l14 10 12-4 12 16 14 10"/><path d="M50 46h8v-8"/><path d="M6 56h52" opacity=".5"/>`,
 bubble:`<path d="M8 12h48v30H26l-12 10V42H8z" ${f}/><text x="32" y="34" font-size="16" text-anchor="middle" fill="currentColor" stroke="none">?!</text>`,
 anchor:`<circle cx="32" cy="12" r="5"/><path d="M32 17v39M20 28h24M10 38c2 12 12 18 22 18s20-6 22-18"/>`,
 badge:`<circle cx="32" cy="26" r="16" ${f}/><path d="M24 40l-6 18 14-6 14 6-6-18"/><path d="m25 26 5 5 9-9"/>`,
 key:`<circle cx="20" cy="32" r="12" ${f}/><circle cx="20" cy="32" r="4"/><path d="M32 32h26M50 32v8M42 32v6"/>`,
 scale:`<path d="M32 8v48M20 56h24M12 16h40"/><path d="M12 16 4 34h16zM52 16l-8 18h16z" ${f}/>`,
 syringe:`<rect x="10" y="26" width="34" height="12" rx="2" transform="rotate(-35 27 32)" ${f}/><path d="M42 20l10-8M48 8l8 8M14 44 6 52"/>`,
 book:`<path d="M32 14C24 8 14 8 6 10v40c8-2 18-2 26 4 8-6 18-6 26-4V10c-8-2-18-2-26 4z" ${f}/><path d="M32 14v40"/>`,
 stairs:`<path d="M6 54h14V42h12V30h12V18h14"/><text x="13" y="50" font-size="7" fill="currentColor" stroke="none">K1</text><text x="25" y="38" font-size="7" fill="currentColor" stroke="none">K2</text><text x="37" y="26" font-size="7" fill="currentColor" stroke="none">K3</text>`,
 split:`<rect x="6" y="12" width="52" height="40" rx="3" ${f}/><path d="M24 12v40M40 12v40" stroke-dasharray="4 3"/>`,
 branch:`<circle cx="16" cy="12" r="5"/><circle cx="16" cy="52" r="5"/><circle cx="48" cy="24" r="5" ${f}/><path d="M16 17v30M16 40c0-12 32-4 32-11"/>`,
 check:`<circle cx="32" cy="32" r="24" ${f}/><path d="m20 32 8 8 16-16"/>`,
 mask:`<path d="M8 20c8-4 40-4 48 0 0 16-10 28-24 28S8 36 8 20z" ${f}/><circle cx="22" cy="28" r="4" fill="currentColor"/><circle cx="42" cy="28" r="4" fill="currentColor"/>`,
 blocks:`<rect x="8" y="36" width="20" height="18" rx="2" ${f}/><rect x="36" y="36" width="20" height="18" rx="2"/><rect x="22" y="12" width="20" height="18" rx="2" ${f}/>`,
 actor:`<circle cx="32" cy="14" r="7" ${f}/><path d="M32 21v18M18 30h28M32 39l-10 18M32 39l10 18"/>`,
 handshake:`<rect x="4" y="16" width="20" height="30" rx="3" ${f}/><rect x="40" y="16" width="20" height="30" rx="3" ${f}/><path d="M24 26h16M24 36h16" stroke-dasharray="3 3"/><rect x="26" y="4" width="12" height="10" rx="1"/>`,
 phone:`<rect x="18" y="4" width="28" height="56" rx="5" ${f}/><path d="M28 10h8"/><circle cx="32" cy="52" r="2" fill="currentColor"/>`,
};})();
const fcPic=k=>`<svg class="fc__pic" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${PIC[k]||PIC.check}</svg>`;

/* ================= v6: hands-on labs, cheat sheets and career prep ================= */
SRC.pwdemo=['Playwright — TodoMVC demo app','https://demo.playwright.dev/todomvc'];
SRC.cykitchen=['Cypress — Kitchen Sink example app','https://example.cypress.io'];
SRC.tinternet=['The Internet — practice site for automation (Dave Haeffner)','https://the-internet.herokuapp.com'];

/* ---------- hands-on labs, appended to the three flagship tool modules ---------- */
M('playwright').sections.push(
 S('Hands-on lab',`<p>Practise on Playwright’s own demo app, no setup beyond <code class="i">npm init playwright@latest</code>:</p>
${OL(['Point your tests at <a href="https://demo.playwright.dev/todomvc" target="_blank" rel="noopener">demo.playwright.dev/todomvc</a>.','Write a test that adds three todos, marks one complete, and asserts the remaining count.','Write a second test that filters by “Active” and “Completed” and asserts the visible list each time.','Add a third test that reloads the page and asserts the todos survived (local storage).','Run with <code class="i">--ui</code> first to build it interactively, then headless in CI mode, and check the HTML report.'])}
${CO('tip','Stretch goal','Push it to a public GitHub repo with a GitHub Actions workflow that runs on every push. That repo is portfolio material — see Career prep.')}`),
);
addSrc('playwright','pwdemo');

M('cypress').sections.push(
 S('Hands-on lab',`<p>Cypress ships its own practice app for this — no server to run:</p>
${OL(['Scaffold with <code class="i">npm init cypress@latest</code> and point <code class="i">baseUrl</code> at <a href="https://example.cypress.io" target="_blank" rel="noopener">example.cypress.io</a>.','Write a test for the “Actions” page: type into a field with <code class="i">.type()</code>, and assert the value with <code class="i">.should(\'have.value\', ...)</code>.','Write a second test for the “Network Requests” page using <code class="i">cy.intercept()</code> to stub one request and assert the UI reacts.','Add a custom command (<code class="i">Cypress.Commands.add</code>) for a repeated step, and use it in both tests.'])}
${CO('tip','Stretch goal','Open the Cypress Command Log while a test runs and step back through each command — this is the fastest way to build the habit of reading failures.')}`),
);
addSrc('cypress','cykitchen');

M('selenium').sections.push(
 S('Hands-on lab',`<p><a href="https://the-internet.herokuapp.com" target="_blank" rel="noopener">the-internet.herokuapp.com</a> is a long-standing, stable practice site built for exactly this:</p>
${OL(['Automate the “Dynamic Loading” page: click start, use an explicit <code class="i">WebDriverWait</code> for the text to appear, then assert it.','Automate the “Multiple Windows” page: switch to the new window handle, assert its text, then switch back.','Automate a login on the “Form Authentication” page, including the negative case (wrong password shows a flash message).','Wrap the page in a small page object class with named methods, the way <a href="#framework-architecture">Framework architecture and POM</a> describes.'])}
${CO('risk','Risk','Resist the urge to use <code class="i">Thread.sleep()</code> to make the dynamic-loading page pass. Use <code class="i">WebDriverWait</code> with <code class="i">ExpectedConditions</code> instead — that is the whole point of the exercise.')}`),
);
addSrc('selenium','tinternet');

/* ---------- Resources & Career: helpers shared with the translated versions in i18n/<lang>-5.js ---------- */
function esc0(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
const resLink=k=>`<li><a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc0(SRC[k][0])}</a></li>`;
const resGroup=(title,keys)=>`<div><h3>${title}</h3><ul>${keys.map(resLink).join('')}</ul></div>`;
const carQa=(q,a)=>`<details class="faq"><summary>${q}</summary><p class="faq__a">${a}</p></details>`;
const carCat=(title,items)=>`<div class="sec"><h3>${title}</h3><div class="faq-group">${items.map(([q,a])=>carQa(q,a)).join('')}</div></div>`;
const carProject=(title,body,skills)=>`<div class="card"><h3 class="card__title">${title}</h3><p class="card__body">${body}</p><div class="card__foot">${skills.map(s=>`<span class="badge">${s}</span>`).join('')}</div></div>`;

/* ---------- Resources: cheat sheets & curated links ---------- */
const RESOURCES_HTML=(()=>{
const link=resLink,group=resGroup;
return `
<section class="sec"><h2>Command cheat sheet</h2>
<p>The same five actions, three tools. Enough to get a first test running while you look up the rest.</p>
${T(['Action','Playwright','Cypress','Selenium (Java)'],[
 ['Open a page','<code class="i">await page.goto(url)</code>','<code class="i">cy.visit(url)</code>','<code class="i">driver.get(url)</code>'],
 ['Find & click','<code class="i">page.getByRole(\'button\',{name}).click()</code>','<code class="i">cy.get(sel).click()</code>','<code class="i">driver.findElement(by).click()</code>'],
 ['Type text','<code class="i">locator.fill(value)</code>','<code class="i">cy.get(sel).type(value)</code>','<code class="i">element.sendKeys(value)</code>'],
 ['Assert visible','<code class="i">await expect(locator).toBeVisible()</code>','<code class="i">cy.get(sel).should(\'be.visible\')</code>','<code class="i">wait.until(ExpectedConditions.visibilityOf(el))</code>'],
 ['Assert text','<code class="i">await expect(locator).toHaveText(x)</code>','<code class="i">cy.get(sel).should(\'have.text\',x)</code>','<code class="i">assertEquals(x, el.getText())</code>'],
 ['Count matches','<code class="i">await locator.count()</code>','<code class="i">cy.get(sel).its(\'length\')</code>','<code class="i">driver.findElements(by).size()</code>'],
 ['Wait for it','Auto-waiting, built in','Auto-retrying assertions, built in','<code class="i">new WebDriverWait(driver, d)</code>'],
 ['Stub the network','<code class="i">page.route(url, handler)</code>','<code class="i">cy.intercept(method, url)</code>','Not built in (needs a proxy library)'],
 ['Screenshot','<code class="i">await page.screenshot({path})</code>','<code class="i">cy.screenshot()</code>','<code class="i">((TakesScreenshot)driver).getScreenshotAs(FILE)</code>'],
 ['Run headless','Default','<code class="i">cypress run</code>','<code class="i">ChromeOptions().addArguments(\'--headless=new\')</code>'],
])}
<h3>Locator priority, quick version</h3>
${OL(['A visible role and accessible name (<code class="i">getByRole</code> / ARIA role locators) — matches what a user perceives.','Label or placeholder text for form fields.','A dedicated test attribute (<code class="i">data-testid</code>, <code class="i">data-cy</code>) when there is no good accessible name.','A stable CSS selector as a last resort.','XPath, only when nothing else works — it breaks on layout changes and is the hardest to read back later.'])}
${CO('note','Same idea, three tools','Playwright’s <code class="i">getByRole</code>, Cypress’s <code class="i">cy.get(\'[data-cy=...]\')</code> convention, and Selenium’s relative locators all exist to solve the same problem: find the element the way a person would, not by its position in the DOM.')}
</section>
<section class="sec"><h2>Curated official references</h2>
<p>Bookmarks, not homework — the primary sources this hub itself was checked against.</p>
<div class="grid grid--wide">
${group('Core tools',['pw','cy','se'])}
${group('Beyond the big three',['wdio','robot','cucumber','appium','karate'])}
${group('Visual & low-code',['katalon','apeyes'])}
${group('AI & agents',['mcp','pwmcp','vibium','bidi'])}
${group('Certification',['istqb','istqbc','bcs','atsqa'])}
</div>
</section>
<section class="sec"><h2>Choosing a tool, condensed</h2>
${T(['','Playwright','Cypress','Selenium'],[
 ['Browsers','Chromium, Firefox, WebKit','Chromium-family, Firefox','Any, via WebDriver'],
 ['Languages','JS/TS, Python, Java, .NET','JS/TS only','Java, C#, Python, JS, Ruby…'],
 ['Best for','New web projects wanting speed and built-in tooling','Front-end teams wanting a fast local dev loop','Large, multi-language or legacy estates, mobile via Appium'],
])}
${CO('tip','Go deeper','The full comparison lives in <a href="#compare-tools">Comparing the three</a>; the interactive <a href="#picker">Tool picker</a> weighs your own constraints.')}</section>`;
})();

/* ---------- Career prep: interview bank, portfolio ideas, skills checklist ---------- */
const CAREER_HTML=(()=>{
const qa=carQa,cat=carCat,project=carProject;
return `
<section class="sec"><h2>Interview question bank</h2>
<p>Not a script to memorise — use these to check you can explain the “why”, not just the “how”.</p>
${cat('Foundations',[
 ['What is the difference between testing and checking?','Checking confirms known, specified behaviour (what automation does well). Testing also investigates the unknown — exploring, questioning assumptions, judging whether the product is actually fit for purpose. Automation checks; people still test.'],
 ['Why would you not automate everything?','Some checks (a one-off visual judgement, exploratory testing, usability) are cheaper or only possible manually. The test pyramid guides where automation pays back fastest: many fast unit checks, fewer API checks, fewer still slow, brittle end-to-end checks.'],
 ['Explain the test pyramid and the “ice-cream cone” anti-pattern.','The pyramid favours many fast, isolated unit tests, a middle layer of API/integration tests, and a thin top layer of UI end-to-end tests. The ice-cream cone inverts this — mostly slow, flaky UI tests and few unit tests — which is slow to run and expensive to maintain.'],
 ['What is a test double, and name two kinds.','A test double stands in for a real dependency. A <b>stub</b> returns canned answers; a <b>mock</b> additionally verifies it was called correctly. Others: dummy (never used, just fills a parameter), spy (records calls on a real object), fake (a working, lighter-weight implementation).'],
 ['How do you decide what to automate first?','Risk-based: automate the checks that protect the highest-risk, highest-frequency, most stable flows first — where a regression is costly and the UI/API is unlikely to change under you every sprint.'],
])}
${cat('Tools & framework design',[
 ['Why might a team choose Playwright over Selenium today?','Built-in parallelism, auto-waiting, tracing and cross-browser support (including WebKit) without assembling a Grid, plus a first-class test runner — at the cost of Selenium’s broader language and infrastructure ecosystem.'],
 ['What problem does the Page Object Model solve?','It centralises locators and page interactions in one class per page or component, so a UI change is fixed in one place instead of every test that touches that element.'],
 ['What is a flaky test, and how do you triage one?','A test that passes and fails without a code change. Triage: reproduce with repeats, check for timing/race conditions, shared state or environment issues, quarantine it out of the required gate while investigating, then fix the root cause rather than adding a longer wait.'],
 ['How would you structure test data so tests can run in parallel?','Each test creates and owns its own data (via API setup, not the UI), uses unique identifiers to avoid collisions, and cleans up after itself even on failure — no test should depend on another test’s leftover state.'],
 ['What would make you reject an AI-generated test in review?','A weak assertion that doesn’t check the actual requirement (e.g. “the page has a title”), a selector strategy the team doesn’t use, or a “fix” that silently loosens an assertion instead of investigating why it failed.'],
])}
${cat('CI/CD & quality strategy',[
 ['What belongs in a CI quality gate for a pull request?','Fast, deterministic checks: unit tests, lint, a smoke subset of end-to-end tests, and secret scanning. Slower full regression suites usually run on a schedule or post-merge, not blocking every PR.'],
 ['How do you measure whether automation is actually paying off?','Defect escape rate (bugs a test could have caught but didn’t), pass-on-retry (flaky) rate, time to feedback, and time to diagnose a failure — not raw test counts or coverage percentages alone, which are easy to game.'],
 ['What is sharding, and why use it?','Splitting a test suite across multiple parallel workers or machines so a run that would take 40 minutes serially finishes in a few minutes wall-clock time.'],
 ['How do you keep secrets out of a CI pipeline?','Environment-specific secrets stores (not committed files), a committed <code class="i">.env.example</code> with placeholders only, and secret-scanning as part of the pipeline itself.'],
 ['A suite that was green yesterday is red today with no code changes. What do you check first?','External dependencies (third-party APIs, test data, environment/infra changes), then whether it is one flaky test or a systemic failure, before assuming the product regressed.'],
])}
${cat('Behavioural & scenario',[
 ['Tell me about a time a test caught a real bug before release.','Describe the check, what it caught, and — importantly — why that check existed (what risk it targeted), not just that it passed.'],
 ['Tell me about a flaky suite you inherited. What did you do?','Walk through triage, quarantine vs fix, and how you measured improvement (flaky rate dropping over time) rather than just “I fixed it”.'],
 ['How do you push back when you’re asked to automate everything a manual tester does?','Explain the cost/benefit trade-off using the pyramid and risk-based prioritisation, and propose what you would automate first and what stays manual, with reasons.'],
 ['How do you handle disagreement with a developer about whether something is a bug?','Focus on evidence (expected vs actual behaviour, requirement reference), stay curious about their reasoning, and escalate calmly with data if you still disagree.'],
])}
</section>
<section class="sec"><h2>Portfolio project ideas</h2>
<p>A public repo beats a bullet point. Pick one, keep the scope small enough to finish, and write a short README explaining your decisions.</p>
<div class="grid">
${project('API + UI regression suite','Build a small suite against a public demo app (the same ones in the Hands-on labs) covering both API and UI, with a page-object layer and a GitHub Actions workflow that shards the run.',['Framework design','CI/CD','API testing'])}
${project('Cross-browser visual smoke suite','A Playwright suite that runs the same smoke checks across Chromium, Firefox and WebKit, with a free-tier visual comparison tool wired in for one key page.',['Cross-browser','Visual testing'])}
${project('Flaky-test triage report','Run a small suite repeatedly in CI, collect the results, and write a short script or notebook that ranks tests by pass rate and flags the likely-flaky ones with evidence.',['Reliability','Reporting'])}
${project('AI-assisted generation, reviewed','Use an AI test-generation feature (for example Playwright’s test agents) against a small open-source app, then write up what you accepted, what you rejected, and why — the review is the point.',['AI in testing','Review discipline'])}
${project('Accessibility audit','Run automated accessibility checks (axe) across a real site’s key pages, triage the findings by severity, and write a short report distinguishing what a tool can catch from what needs a human check.',['Accessibility','Reporting'])}
</div>
</section>
<section class="sec"><h2>Skills → job posting checklist</h2>
<p>What a posting’s buzzwords actually mean, and where this hub covers each one.</p>
${T(['You\'ll see…','It means…','Covered in'],[
 ['Page Object Model / POM','Locators and actions organised into reusable page classes','<a href="#framework-architecture">Framework architecture and POM</a>'],
 ['CI/CD pipelines','Tests running automatically on every push or pull request','<a href="#ci-cd">CI/CD and continuous testing</a>'],
 ['API testing','Testing endpoints directly, not only through the UI','<a href="#api-testing">API testing</a>'],
 ['Cross-browser testing','The same tests running on Chromium, Firefox and WebKit/Safari','<a href="#compare-tools">Comparing the three</a>'],
 ['Flaky test management','Detecting, quarantining and fixing intermittently failing tests','<a href="#flaky-tests">Flaky tests and reliability</a>'],
 ['Risk-based / shift-left testing','Prioritising what to automate by risk and cost of failure','<a href="#strategy-risk">Strategy and risk-based automation</a>'],
 ['Accessibility testing (a11y)','Automated checks (e.g. axe) plus manual review','<a href="#security-performance">Security, privacy and performance</a>'],
 ['AI-assisted / agentic testing','Using AI to generate, heal or review tests, with human oversight','<a href="#ai-test-automation">AI in test automation, hands-on</a>'],
 ['Visual regression testing','Catching unintended UI changes with screenshot or Visual AI comparison','<a href="#applitools">Applitools and Visual AI</a>'],
 ['ISTQB Foundation / CTFL','The standard entry-level testing certification','<a href="#istqb-ctfl">ISTQB CTFL</a>'],
])}
${CO('note','Using this responsibly','Being fluent in these terms and able to discuss trade-offs matters more than memorising definitions. If you use AI tools in an interview take-home, say so and be ready to explain what you reviewed and changed.')}
</section>`;
})();
