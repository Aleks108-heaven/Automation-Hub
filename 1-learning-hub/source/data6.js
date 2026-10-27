/* ================= v6: test design techniques, security testing for QA, defect and QA reporting ================= */
/* New modules carry their own “What you’ll learn” section (OBJECTIVES in data4.js has already been applied). */
Object.assign(SRC,{
  pict:['PICT — Pairwise Independent Combinatorial Testing (GitHub)','https://github.com/microsoft/pict'],
  allpairs:['allpairspy — pairwise test case generator (GitHub)','https://github.com/thombashi/allpairspy'],
  owasp25:['OWASP Top 10:2025','https://owasp.org/Top10/2025/'],
  owaspheaders:['OWASP Cheat Sheet — HTTP Security Response Headers','https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html'],
  mdncsp:['MDN — Content Security Policy (CSP)','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP'],
  osv:['OSV — Open Source Vulnerabilities database','https://osv.dev/'],
  cvss:['FIRST — Common Vulnerability Scoring System','https://www.first.org/cvss/'],
});

/* ---------- new module: test design techniques ---------- */
const TEST_DESIGN={id:'test-design',track:'qual',title:'Test design techniques',min:13,
 sum:'Equivalence partitions, boundary values, decision tables, state transitions and pairwise combinations: how to choose a small set of cases that still finds most defects.',
 sections:[
  S('What you’ll learn',UL(['Split an input into equivalence partitions and pick boundary values','Reduce a decision table to the smallest set of rules','Test valid and invalid state transitions','Cut a combinatorial explosion down with pairwise testing','Write the chosen cases down and turn them into data-driven tests'])),
  S('Design first, then automate',`<p>Playwright, Cypress and Selenium execute checks. They do not decide <i>which</i> checks are worth running. Test design techniques are repeatable methods for choosing a small set of cases that still finds most defects. They answer “which inputs, which states, which combinations?” before any code is written.</p>
${T(['Technique','Use it when','Example'],[
   ['Equivalence partitioning','Inputs fall into groups the system treats alike','Age below, inside and above the allowed range'],
   ['Boundary value analysis','There are ranges and limits; off-by-one defects live here','17, 18, 19 and 64, 65, 66'],
   ['Decision table','Several conditions combine into different outcomes','Member × coupon × order total'],
   ['State transition','Behaviour depends on history or status','Order: draft → submitted → approved'],
   ['Pairwise','Many parameters with several values each','Browser × plan × locale'],
   ['Error guessing, exploratory','Experience says where it breaks','Double-click submit, paste a huge text']])}
${CO('note','Key idea','The ISTQB Foundation syllabus (v4.0) lists equivalence partitioning, boundary value analysis, decision tables and state transition testing as black-box techniques, and error guessing and exploratory testing as experience-based ones. Pairwise testing is not on that list but is widely used in practice.')}`),
  S('Equivalence partitions and boundary values',`<p>A sign-up form accepts an age from 18 to 65. <b>Equivalence partitioning</b> groups inputs the system should treat the same way and tests one value from each group. <b>Boundary value analysis</b> then adds the edges of each valid range, because off-by-one mistakes (<code class="i">&gt;</code> where <code class="i">&gt;=</code> was meant) cluster there.</p>
${T(['Partition','Example value','Expected'],[
   ['Below the range (invalid)','10','Rejected, message names the range 18 to 65'],
   ['Inside the range (valid)','40','Accepted'],
   ['Above the range (invalid)','80','Rejected'],
   ['Not a number','abc','Rejected, no crash'],
   ['Empty','(blank)','Rejected: required']])}
<p>The three-value boundary set for 18 to 65 is <b>17, 18, 19</b> and <b>64, 65, 66</b>. Feed the cases to one data-driven test:</p>
<pre class="code"><span class="k">const</span> ages = [
  { age: <span class="s">'17'</span>, ok: <span class="k">false</span> }, { age: <span class="s">'18'</span>, ok: <span class="k">true</span> }, { age: <span class="s">'19'</span>, ok: <span class="k">true</span> },
  { age: <span class="s">'40'</span>, ok: <span class="k">true</span> },
  { age: <span class="s">'64'</span>, ok: <span class="k">true</span> }, { age: <span class="s">'65'</span>, ok: <span class="k">true</span> }, { age: <span class="s">'66'</span>, ok: <span class="k">false</span> },
  { age: <span class="s">'abc'</span>, ok: <span class="k">false</span> }, { age: <span class="s">''</span>, ok: <span class="k">false</span> },
];

<span class="k">for</span> (<span class="k">const</span> { age, ok } <span class="k">of</span> ages) {
  test(<span class="s">'age "'</span> + age + <span class="s">'" is '</span> + (ok ? <span class="s">'accepted'</span> : <span class="s">'rejected'</span>), <span class="k">async</span> ({ page }) =&gt; {
    <span class="k">await</span> page.goto(<span class="s">'/signup'</span>);
    <span class="k">await</span> page.getByLabel(<span class="s">'Age'</span>).fill(age);
    <span class="k">await</span> page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Create account'</span> }).click();
    <span class="k">const</span> error = page.getByRole(<span class="s">'alert'</span>);
    <span class="k">if</span> (ok) <span class="k">await</span> expect(error).toBeHidden();
    <span class="k">else await</span> expect(error).toContainText(<span class="s">'18'</span>);
  });
}</pre>
${CO('tip','Tip','Check a validation rule at the lowest level that owns it. Nine browser runs for one rule are slow; test all nine values at unit or API level and keep one UI case per partition to prove the message and wiring.')}`),
  S('Decision tables',`<p>When conditions combine, list every combination and its outcome. The rules: shipping is free for members <i>or</i> for orders of 100 or more, and a coupon gives 10 % off only on orders of 100 or more. Three yes/no conditions give 2 × 2 × 2 = 8 combinations, and many share an outcome, so merge them (a dash means the condition does not matter).</p>
${T(['Rule','Member','Coupon','Total ≥ 100','Shipping','Discount'],[
   ['R1','–','Yes','Yes','Free','10 %'],
   ['R2','–','No','Yes','Free','None'],
   ['R3','Yes','–','No','Free','None'],
   ['R4','No','–','No','Paid','None']])}
<p>Eight combinations collapse to four rules, so four tests cover every distinct outcome. Building the table also exposes questions the specification never answered, such as what a coupon does on a 99.99 order. Add boundary checks on the total (99.99, 100.00) to the same tests.</p>`),
  S('State-transition testing',`<p>When behaviour depends on history, model the states and the events that move between them. An order might go draft → submitted → approved → shipped, and can be cancelled before it ships.</p>
${T(['From','Event','To','Expected'],[
   ['Draft','Submit','Submitted','Allowed'],
   ['Submitted','Approve','Approved','Allowed'],
   ['Approved','Ship','Shipped','Allowed'],
   ['Submitted or approved','Cancel','Cancelled','Allowed'],
   ['Approved','Reopen','Draft','Refused'],
   ['Shipped','Cancel','Cancelled','Refused'],
   ['Cancelled','Approve','Approved','Refused']])}
<p>Cover every allowed transition at least once, then try the refused ones. Each should be rejected and leave the state unchanged; this is where most state bugs hide.</p>
<pre class="code"><span class="c">// orderId: an order created in this test and moved to “approved” through the API</span>
test(<span class="s">'an approved order cannot be reopened'</span>, <span class="k">async</span> ({ request }) =&gt; {
  <span class="k">const</span> res = <span class="k">await</span> request.post(<span class="s">'/api/orders/'</span> + orderId + <span class="s">'/reopen'</span>);
  expect(res.status()).toBe(<span class="s">409</span>);                <span class="c">// refused (409 Conflict is a common choice)</span>

  <span class="k">const</span> order = <span class="k">await</span> (<span class="k">await</span> request.get(<span class="s">'/api/orders/'</span> + orderId)).json();
  expect(order.status).toBe(<span class="s">'approved'</span>);         <span class="c">// and nothing changed</span>
});</pre>
${CO('tip','Tip','Assert the state after a refused action, not only the error status. A 409 that still changed the order is a bug.')}`),
  S('Pairwise testing',`<p>Three parameters with three values each give 3 × 3 × 3 = 27 combinations; ten parameters can give thousands. Most defects are triggered by a single value or by an interaction of two, so a <b>pairwise</b> set covers every pair of values at least once in far fewer tests. For the parameters below, 9 tests cover all pairs.</p>
${T(['Parameter','Values'],[['Browser','Chromium, Firefox, WebKit'],['Plan','Free, Pro, Team'],['Locale','en, uk, pl']])}
<p>Generate the set with a tool such as <b>PICT</b> or <b>allpairspy</b> and feed the rows to a data-driven test like the age table above. Both accept <b>constraints</b>, so impossible combinations (a locale that the Free plan does not offer) are never generated.</p>
${CO('risk','Risk','Pairwise can miss a defect that needs three or more specific values together. Add the riskiest combinations by hand, especially those that handle money or personal data.')}`),
  S('Error guessing and exploratory charters',`<p>Experience adds cases no technique produces. Common places to look:</p>
${UL(['Double-click or double-submit a form','Press Back or Refresh right after submitting','Paste a very long text, an emoji or right-to-left text','Use quotes, angle brackets and accented characters','Open the same record in two tabs, or let the session expire mid-task','Use dates at the edges: 29 February, a daylight-saving change, the end of the year'])}
<p>An <b>exploratory session</b> is time-boxed (30 to 60 minutes) and guided by a <b>charter</b>: <i>explore</i> an area <i>with</i> some resources <i>to discover</i> a risk. Record questions, bugs and new risks as you go.</p>
${CO('note','Example charter','Explore checkout with expired cards and two browser tabs to discover payment-state problems.')}`),
  S('Writing the cases down',`<p>A case is only reusable if someone else can run it. Keep a short, consistent format and mark what to automate.</p>
${T(['ID','Technique','Type','Steps','Expected','Automate'],[
   ['TC-001','Boundary value','Boundary','Enter age 17','Rejected; message names the range 18 to 65','Yes'],
   ['TC-002','Decision table R3','Positive','Member, total 40, no coupon','Free shipping, no discount','Yes'],
   ['TC-003','State transition','Negative','Reopen an approved order','Refused; order stays approved','Yes'],
   ['TC-004','Exploratory charter','–','Two tabs, session expires mid-checkout','Notes, questions, bugs','No']])}
${CO('tip','Tip','Automate cases that are stable, frequent and high-impact (see Strategy and risk-based automation). A charter stays manual by design.')}`),
 ],
 quiz:[
  {q:'A quantity field accepts 1 to 10. Which set is the three-value boundary set for the upper edge?',o:['9, 10, 11','10 only','5, 10, 20','1, 10'],a:0,why:'Three-value boundary analysis tests the boundary and both neighbours: 9, 10 and 11.'},
  {q:'Why does equivalence partitioning reduce the number of tests?',o:['It removes the need for expected results','One value represents a whole group the system treats the same way','It only tests valid input','It tests every possible value once'],a:1,why:'If every value in a partition behaves alike, one representative is enough to find a defect in that partition.'},
  {q:'What does merging rows with identical outcomes in a decision table achieve?',o:['It removes conditions that matter','It makes the table longer','Fewer rules to test, with every distinct outcome still covered','It replaces boundary testing'],a:2,why:'Rules that differ only in an irrelevant condition collapse into one, so you test each distinct outcome once.'},
  {q:'What should happen when an invalid state transition is attempted, such as reopening a shipped order?',o:['It should be accepted and logged','The state should reset to the start','It should be refused and leave the state unchanged','Nothing needs to be checked'],a:2,why:'An invalid transition must be rejected without side effects; checking that the state did not change catches half-applied actions.'},
  {q:'3 browsers × 3 plans × 3 locales give 27 combinations. What does a pairwise set promise?',o:['Every combination of three values is tested','Every pair of values appears in at least one test, usually in far fewer tests','Only the most common browser is tested','Locale never matters'],a:1,why:'Pairwise covers all two-way interactions, which is where most combination defects appear, at a fraction of the full set.'},
  {q:'Which is a weakness of pairwise testing?',o:['It cannot be automated','It needs more tests than all combinations','It only works for numbers','It can miss a defect that needs three or more specific values together'],a:3,why:'Pairwise covers pairs, not triples. Add high-risk combinations by hand.'},
 ],src:['ctflpdf','pwparam','pict','allpairs']};

/* ---------- new module: security testing for QA ---------- */
const SEC_TESTING={id:'security-testing',track:'qual',title:'Security testing for QA',min:12,
 sum:'A tester’s walk through the OWASP Top 10:2025: stay in scope, check headers and cookies, test authorisation with two users, and rate what you find.',
 sections:[
  S('What you’ll learn',UL(['Stay in scope: test only what you own or are authorised to test, and never destructively','Use the OWASP Top 10:2025 as a tester’s checklist','Check security headers and cookie flags in an automated test','Write a two-user authorisation test (BOLA / IDOR)','Check dependencies and secrets, and rate a finding by impact × likelihood'])),
  S('Scope and safety first',`${UL(['Test only systems you own or have written permission to test. Never test third-party systems, or production, without it.','Prefer a staging environment with test accounts and test data.','Probe safely: harmless markers and non-executing payloads. No denial-of-service, no data exfiltration, no real payments.','Label every result honestly: <b>Confirmed</b> (reproduced), <b>Suspected</b> (indicators only) or <b>Not tested</b>.','Report secrets by location and type, never by value.'])}
${CO('risk','Risk','A scanner alert is a lead, not a finding. Reproduce it safely, or report it as Suspected.')}`),
  S('OWASP Top 10:2025 as a tester’s checklist',`${T(['ID','Category','Safe things to probe'],[
   ['A01','Broken Access Control','Change ids in URLs and bodies; open admin routes as a normal user; URL-fetching features (SSRF now sits here)'],
   ['A02','Security Misconfiguration','Default accounts, debug mode, verbose errors, exposed consoles, missing headers'],
   ['A03','Software Supply Chain Failures','Unpinned or unmaintained dependencies, no lockfile, secrets in CI (new in 2025)'],
   ['A04','Cryptographic Failures','HTTP instead of HTTPS, tokens in URLs, sensitive data stored unprotected'],
   ['A05','Injection','Harmless markers in inputs and where they reappear: pages, queries, commands, templates'],
   ['A06','Insecure Design','Missing rate limits, skipped steps, negative quantities, reusable coupons'],
   ['A07','Authentication Failures','No lockout, sessions not ended on logout, user enumeration through error messages'],
   ['A08','Software or Data Integrity Failures','Unsigned updates, unsafe deserialisation, third-party scripts without integrity checks'],
   ['A09','Security Logging and Alerting Failures','Are logins and access denials logged? Do logs contain secrets?'],
   ['A10','Mishandling of Exceptional Conditions','Malformed, oversized and truncated input: do errors fail open or leak internals? (new in 2025)']])}
${CO('note','Key idea','The 2025 edition added A03 and A10 and folded server-side request forgery (SSRF) into A01. Older reports use 2021 names; “Vulnerable and Outdated Components” maps to A03. Check owasp.org for the current list.')}`),
  S('Headers and cookies in a test',`<p>Browsers switch protections on from response headers, so they are cheap to assert.</p>
${T(['Header','What it does'],[
   ['Content-Security-Policy','Limits where scripts, frames and other content may load from; a main defence against XSS. Its <code class="i">frame-ancestors</code> directive says who may embed the page and replaces X-Frame-Options'],
   ['Strict-Transport-Security','Tells browsers to use HTTPS only (ignored over plain HTTP)'],
   ['X-Content-Type-Options: nosniff','Stops the browser guessing a file’s type'],
   ['Referrer-Policy','Controls how much of the URL is sent to other sites'],
   ['Permissions-Policy','Turns off browser features the app does not use']])}
<pre class="code">test(<span class="s">'required security headers are present'</span>, <span class="k">async</span> ({ request }) =&gt; {
  <span class="k">const</span> h = (<span class="k">await</span> request.get(<span class="s">'/'</span>)).headers();      <span class="c">// header names are lower-case</span>
  expect(h[<span class="s">'content-security-policy'</span>]).toBeTruthy();
  expect(h[<span class="s">'strict-transport-security'</span>]).toContain(<span class="s">'max-age='</span>);
  expect(h[<span class="s">'x-content-type-options'</span>]).toBe(<span class="s">'nosniff'</span>);
  expect(h[<span class="s">'referrer-policy'</span>]).toBeTruthy();
});

test(<span class="s">'the session cookie is locked down'</span>, <span class="k">async</span> ({ page, context }) =&gt; {
  <span class="k">await</span> page.goto(<span class="s">'/login'</span>);                        <span class="c">// sign in with a test account here</span>
  <span class="k">const</span> session = (<span class="k">await</span> context.cookies()).find(c =&gt; c.name === <span class="s">'session'</span>);
  expect(session?.httpOnly).toBe(<span class="k">true</span>);
  expect(session?.secure).toBe(<span class="k">true</span>);
  expect(session?.sameSite).not.toBe(<span class="s">'None'</span>);
});</pre>
${CO('tip','Tip','A missing header is usually Low or Informational on its own: rate it by what it exposes. Assert the headers you decided to require, so a regression is caught.')}`),
  S('Authorisation: two users, one object',`<p>Access control is the most common serious web flaw (OWASP A01, and BOLA in the API list). Test it with two accounts: user A creates a private object, then user B tries to read, change and delete it.</p>
<pre class="code">test(<span class="s">'user B cannot read user A’s order'</span>, <span class="k">async</span> ({ playwright }) =&gt; {
  <span class="k">const</span> baseURL = process.env.BASE_URL;
  <span class="k">const</span> a = <span class="k">await</span> playwright.request.newContext({ baseURL, storageState: <span class="s">'auth/a.json'</span> });
  <span class="k">const</span> b = <span class="k">await</span> playwright.request.newContext({ baseURL, storageState: <span class="s">'auth/b.json'</span> });
  <span class="k">const</span> order = <span class="k">await</span> (<span class="k">await</span> a.post(<span class="s">'/api/orders'</span>, { data: { sku: <span class="s">'X1'</span> } })).json();

  <span class="k">const</span> res = <span class="k">await</span> b.get(<span class="s">'/api/orders/'</span> + order.id);
  expect([<span class="s">403</span>, <span class="s">404</span>]).toContain(res.status());    <span class="c">// never 200 with A’s data</span>
});</pre>
<p>Repeat for update and delete, for an admin-only route used as a normal user (vertical escalation) and for a second tenant. The <a href="#api-testing">API testing</a> module covers the OWASP API risks in more detail.</p>`),
  S('Dependencies and secrets',UL(['Run the package manager’s audit (<code class="i">npm audit</code>, <code class="i">pip-audit</code>, <code class="i">dotnet list package --vulnerable</code>) and cross-check with osv.dev. Do not call a dependency vulnerable without an advisory.','Commit lockfiles, pin versions and install in CI with <code class="i">npm ci</code>.','Scan the repository and its history for secrets (for example with gitleaks). Keep <code class="i">.env</code> files out of Git.','Pin third-party CI actions and container images to a version or digest.','Treat a leaked secret as compromised: rotate it. Deleting the commit is not enough.'])),
  S('Rating a finding',`<p>This hub uses a simple convention: score <b>impact</b> (1 to 5) times <b>likelihood</b> (1 to 5) and read the band.</p>
${T(['Score','Severity'],[['20–25','Critical'],['12–19','High'],['6–11','Medium'],['2–5','Low'],['0–1','Informational']])}
<p>Another user’s order readable by changing an id: impact 5 × likelihood 4 = 20, <b>Critical</b>. A missing Referrer-Policy on an internal tool: 1 × 2 = 2, <b>Low</b>. Raise likelihood for internet exposure, lower it when exposure is localhost-only or another control already blocks the attack, and say which adjustment you used.</p>
${CO('note','Key idea','Confidence (High, Medium, Low) is reported separately and does not change severity. For known vulnerabilities in third-party software, use the CVSS score published with the advisory instead of scoring it yourself.')}`),
 ],
 quiz:[
  {q:'A scanner reports possible SQL injection and you have not reproduced it. How do you report it?',o:['Confirmed, Critical','Informational, always','Suspected, until you reproduce it safely','Not worth reporting'],a:2,why:'An indicator without a reproduced effect is Suspected. Only a reproduced issue is Confirmed.'},
  {q:'User B requests user A’s order by id and receives A’s data with a 200. Which OWASP Top 10:2025 category fits best?',o:['A02 Security Misconfiguration','A05 Injection','A01 Broken Access Control','A10 Mishandling of Exceptional Conditions'],a:2,why:'Reading another user’s object by changing an id is a broken access control flaw (BOLA / IDOR).'},
  {q:'Which two categories are new in the OWASP Top 10:2025?',o:['Injection and Insecure Design','Broken Access Control and Cryptographic Failures','Security Logging and SSRF','Software Supply Chain Failures and Mishandling of Exceptional Conditions'],a:3,why:'A03 and A10 are new in 2025; SSRF was folded into A01.'},
  {q:'Which response header tells browsers to use HTTPS only for future visits?',o:['Strict-Transport-Security','Referrer-Policy','X-Content-Type-Options','Permissions-Policy'],a:0,why:'HSTS makes the browser upgrade to HTTPS. Browsers ignore it when it is received over plain HTTP.'},
  {q:'Impact 4 and likelihood 4 give a score of 16. Which severity band is that (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',o:['Low','Medium','Critical','High'],a:3,why:'4 × 4 = 16, which falls in the 12–19 band: High.'},
  {q:'A session cookie lacks the HttpOnly flag. What does that allow?',o:['The cookie cannot be sent over HTTPS','Page scripts to read the cookie, so an XSS flaw can steal the session','Other sites to embed the page','The cookie to expire immediately'],a:1,why:'HttpOnly hides the cookie from JavaScript. Without it, injected script can read and exfiltrate the session.'},
 ],src:['owasp25','owaspapi','owaspheaders','mdncsp','osv','cvss','pwapi']};

/* ---------- new module: defect reports and QA reports ---------- */
const DEFECT_REPORTING={id:'defect-reporting',track:'qual',title:'Defect reports and QA reports',min:9,
 sum:'Write a defect another person can reproduce, tell severity from priority, label evidence honestly and finish with a verdict chosen by fixed rules.',
 sections:[
  S('What you’ll learn',UL(['Write a defect report another person can reproduce without asking you questions','Tell severity from priority','Label every claim Confirmed, Suspected or Not tested','Choose a final QA status with fixed decision rules','Lay out a report a decision-maker can read in two minutes'])),
  S('A defect someone else can reproduce',`<p>A report is useful when a developer who has never seen the problem can reproduce it from the text alone. Most reports that bounce back are missing the same few things.</p>
${T(['Field','What to write'],[
   ['Title','What is wrong and where, in one line'],
   ['Environment','Browser and OS, application version, test account or role'],
   ['Preconditions','The state needed before step 1'],
   ['Steps','Numbered and exact, starting from a known state'],
   ['Expected / actual','Both, side by side'],
   ['Evidence','Screenshot, trace, request and response, log lines: real, with secrets masked'],
   ['Reproducible','Always, intermittent (how often) or not reproduced'],
   ['Severity and priority','The impact, with a reason; how soon it should be fixed']])}
${T(['Weak','Better'],[
   ['“Checkout is broken”','“Checkout: the Pay button does nothing for a saved Visa card (Chromium, build 2.14.1)”'],
   ['“It fails sometimes”','“Fails in 3 of 10 runs; always passes when the cart holds one item”'],
   ['“Should work”','“Expected: confirmation page. Actual: stays on payment; the console shows HTTP 500 from /api/pay”']])}
${CO('tip','Tip','A Playwright trace or a short screen recording often replaces a page of description. Attach it.')}`),
  S('Severity and priority',`<p><b>Severity</b> is the impact of the defect if it ships. <b>Priority</b> is how soon it should be fixed. They are related but different, and usually have different owners: QA proposes severity, the product owner sets priority.</p>
${T(['Severity','Meaning','Example'],[
   ['Critical','Data loss or corruption, a security breach, or a core journey impossible with no workaround','Any signed-in user can read another user’s orders'],
   ['High','A major function fails or a serious weakness exists, and the workaround is hard or risky','Checkout fails for one payment method'],
   ['Medium','Partial loss of function, or a real weakness with a workaround or limited exposure','A filter ignores one criterion'],
   ['Low','A minor defect with negligible impact','A label is misaligned'],
   ['Informational','An observation or improvement, not a defect','An optional response header is missing']])}
${T(['Priority','Meaning'],[['P1','Fix before release'],['P2','Fix in the current cycle'],['P3','Schedule'],['P4','Backlog']])}
${CO('note','Key idea','A typo in the company name on the home page is Low severity, yet P1 the day before a launch. A crash in an export used once a year may be High severity but only P3. Always give severity with a one-line reason.')}`),
  S('Confirmed, Suspected, Not tested',`<p>Every claim in a report carries one of three labels, so readers know how far to trust it.</p>
${UL(['<b>Confirmed</b>: reproduced, with evidence you can show.','<b>Suspected</b>: there are indicators, but the effect is not proven. A scanner alert or a code smell starts here.','<b>Not tested</b>: you did not check it. Say so, and say why.'])}
<p>Three rules keep reports honest: absence of evidence is not evidence of absence; never invent logs, versions or results; keep observations apart from assumptions. When you score a finding, use impact × likelihood as in <a href="#security-testing">Security testing for QA</a>, and report your confidence separately.</p>`),
  S('The final status',`<p>End a QA report with one status chosen by fixed rules, so two people reading the same findings reach the same verdict. Check the rules in order; the first match decides.</p>
${T(['Order','Status','Use when'],[
   ['1','FAIL','Any Confirmed Critical or High finding, or a core user journey is Confirmed broken'],
   ['2','NOT ENOUGH EVIDENCE','The target was unreachable, or too little could be verified to support any conclusion'],
   ['3','PARTIALLY VERIFIED','Part of the scope is blocked or not tested, or a Suspected Critical or High finding is unresolved (and nothing Confirmed Critical or High)'],
   ['4','PASS WITH FINDINGS','The whole scope was verified and only Medium, Low or Informational findings remain open'],
   ['5','PASS','The whole scope was verified and nothing above Informational remains open']])}
${CO('risk','Risk','Never choose PASS merely because no defects were found. PASS needs the whole requested scope to be verified.')}`),
  S('Report layout',`<p>Put the verdict first. A reader should be able to stop after the first section and still act.</p>
${T(['#','Section','What it holds'],[
   ['1','Executive summary','The verdict, the top 3 issues and the one next action'],
   ['2','Scope and limits','What was checked, what was not (and why), assumptions, tools'],
   ['3','Findings overview','ID, severity, area, title, confidence'],
   ['4','Detailed findings','Evidence, impact, suggested fix, how to verify it'],
   ['5','What looked healthy','Areas checked with nothing to report'],
   ['6','Recommendations','Ordered by severity and effort'],
   ['7','Follow-up tests','Negative, boundary and exploratory'],
   ['8','What else to check?','Gaps worth a second look']])}
${CO('tip','Tip','Section 5 matters. Reporting a clean area as clean tells readers where they can stop worrying. For each suggested fix, add its risk, how to undo it and how to confirm it worked.')}`),
 ],
 quiz:[
  {q:'Which statement about severity and priority is correct?',o:['Severity is how soon to fix it; priority is the impact','They mean the same thing','Severity is the impact if it ships; priority is how soon to fix it','Severity is set by developers only'],a:2,why:'Severity describes impact; priority is a scheduling decision. A cosmetic defect can be urgent, and a serious one can wait.'},
  {q:'A typo in the company name on the home page the day before a launch is best described as…',o:['High severity, P4','Critical severity, P3','Informational, no priority','Low severity, P1'],a:3,why:'The impact is small (Low) but the timing makes it urgent (P1).'},
  {q:'A report says “Checkout is broken sometimes”. What is the most useful missing information?',o:['Who caused it','Exact steps, environment, expected versus actual result and how often it happens','A longer title','A guess at the root cause'],a:1,why:'Reproducible steps and context let a developer see the problem. Blame and guesses do not.'},
  {q:'You reproduced a flaw that lets one user read another’s orders. Which label applies?',o:['Suspected','Not tested','Confirmed','Informational'],a:2,why:'A reproduced finding with evidence is Confirmed.'},
  {q:'The whole scope was verified; one Medium and two Low findings remain open; nothing High or Critical. Which status?',o:['PASS','PARTIALLY VERIFIED','FAIL','PASS WITH FINDINGS'],a:3,why:'Whole scope verified and only Medium, Low or Informational findings open: rule 4, PASS WITH FINDINGS.'},
  {q:'One service was unavailable, so half the scope was not tested. The other half was verified with no Confirmed Critical or High findings. Which status?',o:['PASS WITH FINDINGS','NOT ENOUGH EVIDENCE','PARTIALLY VERIFIED','PASS'],a:2,why:'Part of the scope is Not tested and nothing Confirmed Critical or High exists, so rule 3 applies. Rule 2 is for when too little could be verified to conclude anything.'},
 ],src:['ctflpdf','ctfl','owasp25']};

MODULES.splice(MODULES.findIndex(m=>m.id==='strategy-risk')+1,0,TEST_DESIGN);
MODULES.splice(MODULES.findIndex(m=>m.id==='security-performance')+1,0,SEC_TESTING);
MODULES.splice(MODULES.findIndex(m=>m.id==='failure-modes')+1,0,DEFECT_REPORTING);

/* ---------- new flashcards ---------- */
GLOSSARY.push(
 ['Decision table','A grid of condition combinations and their outcomes; identical rows are merged so each distinct outcome is tested once.','qual'],
 ['State-transition testing','Testing the allowed and refused moves between states, such as an order going from draft to approved.','qual'],
 ['Pairwise testing','Covering every pair of parameter values at least once instead of every combination; tools such as PICT generate the sets.','qual'],
 ['Error guessing','Choosing cases from experience of where software usually breaks: double-submit, huge input, expired sessions.','qual'],
 ['Test charter','A one-line mission for a time-boxed exploratory session: explore an area, with resources, to discover a risk.','qual'],
 ['Content-Security-Policy','A response header that limits where a page may load scripts, frames and other content from; a main defence against XSS.','qual'],
 ['Software supply chain failure','OWASP Top 10:2025 A03: risk from dependencies, build pipelines and distribution, such as unpinned or tampered packages.','qual'],
 ['Confirmed vs suspected','Evidence labels in a QA report: Confirmed means reproduced with evidence; Suspected means indicators only.','qual'],
);
Object.assign(FC_PIC,{'Decision table':'table','State-transition testing':'branch','Pairwise testing':'split','Error guessing':'target','Test charter':'doc','Content-Security-Policy':'shield','Software supply chain failure':'blocks','Confirmed vs suspected':'eye'});
GLOSSARY.forEach(g=>{g[3]=FC_PIC[g[0]]||FC_TRACK_PIC[g[2]]||'check';});

/* ---------- new exam-only questions ---------- */
EXAM_BANK.push(
 {t:'qual',k:3,q:'A password must be 8 to 64 characters. Which lengths form the three-value boundary set?',o:['7, 8, 9 and 63, 64, 65','8 and 64 only','1, 32, 100','0, 8, 64'],a:0,why:'Three-value analysis tests each boundary and both of its neighbours.'},
 {t:'qual',k:2,q:'What does a pairwise test set guarantee?',o:['Every three-way combination is covered','All defects are found','Every pair of parameter values appears in at least one test','Only valid combinations are used'],a:2,why:'Pairwise covers all two-way interactions with far fewer tests than the full product.'},
 {t:'qual',k:3,q:'A decision table has three yes/no conditions. How many combinations exist before merging identical outcomes?',o:['3','8','6','9'],a:1,why:'2 × 2 × 2 = 8.'},
 {t:'qual',k:2,q:'A scanner flags possible XSS and the tester has not reproduced it. Which label fits?',o:['Confirmed','Suspected','Fixed','Informational only'],a:1,why:'Indicators without a reproduced effect are Suspected.'},
 {t:'qual',k:2,q:'Which response header limits where a page may load scripts from?',o:['Referrer-Policy','Cache-Control','Content-Security-Policy','Accept-Language'],a:2,why:'Content-Security-Policy restricts script, frame and other content sources.'},
 {t:'qual',k:3,q:'Impact 5 and likelihood 3 give 15. Which band is that (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',o:['Critical','High','Medium','Low'],a:1,why:'5 × 3 = 15 falls in the 12–19 band: High.'},
);
