/* ================= v3: research-verified updates (checked 23 Sep 2026) ================= */
Object.assign(SRC,{
  ctfl:['ISTQB — CTFL v4.0 certification page','https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/'],
  ctflpdf:['ISTQB CTFL Syllabus v4.0.1 (PDF, via ASTQB)','https://astqb.org/assets/documents/ISTQB_CTFL_Syllabus_v4.0.1.pdf'],
  est:['ISTQB — Exam Structure Tables v1.13 (PDF)','https://istqb.org/wp-content/uploads/sdm-uploads/ISTQB_Exam-Structure-Tables_v1.13.pdf'],
  ctaipdf:['ISTQB CT-AI Syllabus v2.0 (PDF)','https://istqb.org/wp-content/uploads/2026/05/ISTQB-_CTAI_Syllabus_v2.0_Release.pdf'],
  ctaiold:['ISTQB — CT-AI v1.0 (retiring)','https://istqb.org/certifications/certified-tester-ai-testing-ct-ai-retiring/'],
  tae:['ISTQB — CTAL Test Automation Engineering v2.0','https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/'],
  tas:['ISTQB — CT Test Automation Strategy','https://istqb.org/certifications/certified-tester-test-automation-strategy-ct-tas/'],
  pwapi:['Playwright docs — API testing','https://playwright.dev/docs/api-testing'],
  pwreq:['Playwright docs — APIRequestContext','https://playwright.dev/docs/api/class-apirequestcontext'],
  pwrel:['Playwright release notes','https://playwright.dev/docs/release-notes'],
  rfc9110:['RFC 9110 — HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110.html'],
  rfc6585:['RFC 6585 — Additional HTTP status codes (429)','https://www.rfc-editor.org/rfc/rfc6585.html#section-4'],
  pact:['Pact documentation','https://docs.pact.io/'],
  owaspapi:['OWASP API Security Top 10 (2023)','https://owasp.org/API-Security/editions/2023/en/0x11-t10/'],
  cychg:['Cypress changelog','https://docs.cypress.io/app/references/changelog'],
  cyint:['Cypress docs — cy.intercept','https://docs.cypress.io/api/commands/intercept'],
  cyct:['Cypress docs — Component testing','https://docs.cypress.io/app/component-testing/get-started'],
  semgr:['Selenium Manager (beta)','https://www.selenium.dev/documentation/selenium_manager/'],
  sebidi:['Selenium — WebDriver BiDi','https://www.selenium.dev/documentation/webdriver/bidi/'],
  fbi:['Fortune Business Insights — Automation testing market','https://www.fortunebusinessinsights.com/automation-testing-market-107180'],
  sbmq:['SmartBear — first Gartner MQ for AI-Augmented Software Testing Tools (Oct 2025)','https://smartbear.com/blog/smartbear-named-a-challenger-in-the-first-ever-gartner-magic-quadrant-for-ai-augmented-software-testing-tools/'],
  judge:['Zheng et al. 2023 — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena','https://arxiv.org/abs/2306.05685'],
  ragas:['Ragas — available metrics','https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/'],
  nist600:['NIST AI 600-1 — Generative AI Profile (PDF)','https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf'],
  gml:['Google ML Crash Course — accuracy, precision, recall','https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall'],
  iso25059:['ISO/IEC 25059:2023','https://www.iso.org/standard/80655.html'],
  omnibus:['Council of the EU — AI Act simplification agreement (May 2026)','https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/'],
  aiact:['EU AI Act — Regulation (EU) 2024/1689','https://eur-lex.europa.eu/eli/reg/2024/1689/oj'],
});
const M=id=>MODULES.find(m=>m.id===id);
const setSec=(id,h,body)=>{const m=M(id),s=m.sections.find(x=>x.h===h);if(s)s.body=body;else m.sections.push(S(h,body));};
const addSec=(id,after,h,body)=>{const m=M(id),i=m.sections.findIndex(x=>x.h===after);m.sections.splice(i<0?m.sections.length:i+1,0,S(h,body));};
const addSrc=(id,...k)=>M(id).src.push(...k);

TRACKS.push({id:'cert',name:'Certification',blurb:'ISTQB foundations, the certification path and exam technique.'});

/* ---------- corrections & freshness notes ---------- */
setSec('ai-for-testing','Market landscape (2026)',`${UL([
 'Test automation market ≈ <b>$24.25B in 2026</b>, projected ≈ <b>$84.2B by 2034</b> (16.84% CAGR) — figures published by <b>Fortune Business Insights</b>. Other research firms publish different numbers, so always cite the publisher.',
 'Gartner published its <b>first Magic Quadrant for AI-Augmented Software Testing Tools on 6 Oct 2025</b>. Gartner Peer Insights now lists the market as “AI-Augmented Software Testing Tools (<i>transitioning to</i> Agentic Software Quality Assurance Platforms)”.'])}
 ${T(['Category','Examples'],[['AI-powered platforms','ACCELQ, mabl, ContextQA, Testsigma, KaneAI'],['Open-source frameworks','Selenium, Playwright, Cypress, Appium, k6'],['Enterprise suites','Tricentis Tosca/qTest, Parasoft SOAtest, Katalon, Worksoft, BrowserStack']])}
 ${CO('note','Where “AI for testing” went in ISTQB','CT-AI v2.0 removed it; ISTQB points people interested in generative AI for testing to its separate CT-GenAI certification.')}`);
addSrc('ai-for-testing','fbi','sbmq');

addSec('testing-ai-systems','Where testers add most value','Regulation and standards context',`${UL([
 '<b>ISO/IEC 25059:2023</b> — “SQuaRE — Quality model for AI systems”: extends the ISO 25010 product-quality model with AI characteristics. ISO has marked it “to be revised”.',
 '<b>EU AI Act</b> (Regulation (EU) 2024/1689): bans on prohibited practices and AI-literacy duties apply from 2 Feb 2025; general-purpose AI model obligations from 2 Aug 2025.',
 '<b>AI Omnibus</b> (Regulation (EU) 2026/1744, in force 27 Jul 2026) moved the high-risk deadlines: <b>2 Dec 2027</b> for stand-alone (Annex III) high-risk systems and <b>2 Aug 2028</b> for high-risk AI embedded in products (Annex I).'])}
 ${CO('risk','Risk','Regulation changes quickly and this is not legal advice. If you test a high-risk AI system, confirm the current obligations with your compliance team.')}`);
setSec('testing-ai-systems','Certification path',`<p><b>ISTQB CT-AI v2.0</b> — syllabus dated 17 Apr 2026, released 21 Apr 2026. Prerequisite: CTFL. It concentrates entirely on testing AI-based systems, adds generative-AI and LLM testing (including exploratory testing and red teaming), aligns with ISO/IEC 25059, and cuts recommended training from 4 to 3 days.</p>
 ${T(['Exam','Questions','Points','Pass mark','Time'],[['CT-AI v2.0','40','44','29','60 min (+25% non-native)'],['CT-AI v1.0 (retiring)','40','47','31','see ISTQB — last English exams 21 Apr 2027']])}
 <p>The v2.0 chapters: Introduction to AI · Quality characteristics for AI-based systems · Machine learning · Testing AI-based systems · Input data testing for ML · Model testing for ML · ML development testing. See the <a href="#cert-path">Certification path</a> module for the wider route.</p>`);
M('testing-ai-systems').sections.find(s=>s.h==='Metrics in one example').body+=`<p class="empty" style="font-size:14px">Formula check: F1 = 2·TP / (2·TP + FP + FN) = 160 / 190 = 0.842 — the same result as the harmonic mean.</p>`;
addSrc('testing-ai-systems','ctaipdf','ctaiold','iso25059','aiact','omnibus','gml');

addSec('cypress','Cypress Cloud','What changed in Cypress 16 (Sep 2026)',`${UL([
 'Cypress <b>16.0.0</b> shipped 1 Sep 2026; 16.1.0 on 15 Sep 2026.',
 'In Chrome, Chromium and Edge, test traffic now goes through the browser’s own network stack instead of the Cypress proxy — re-check suites that rely heavily on <code class="i">cy.intercept()</code>.',
 'Node 22, 24 or 26+ is required (20 and 25 dropped).',
 '<code class="i">Cypress.env()</code> is replaced by <code class="i">Cypress.expose()</code> and <code class="i">cy.env()</code>; <code class="i">cy.exec()</code> is removed — use <code class="i">cy.task()</code>. <code class="i">cy.end()</code> is removed.',
 'Electron is deprecated as a test browser.',
 'Reminder: <code class="i">cy.request()</code> makes a real HTTP call and bypasses <code class="i">cy.intercept()</code>.'])}
 ${CO('tip','Tip','Before upgrading a real suite, read the changelog’s breaking-changes list and run the suite on a branch first.')}`);
addSrc('cypress','cychg','cyint','cyct');

addSec('selenium','Selenium Grid','Current state (Sep 2026)',UL([
 'Latest release: <b>Selenium 4.49.0</b> (9 Sep 2026).',
 '<b>Selenium Manager</b> has shipped since 4.6 and manages browsers since 4.11 — it is still labelled <b>beta</b>.',
 '<b>WebDriver BiDi</b>: Selenium is moving its implementation from WebDriver Classic to the W3C BiDi protocol; CDP support is described as temporary until BiDi is complete.']));
addSrc('selenium','semgr','sebidi');

M('playwright').sections[0].body+=`<p class="empty" style="font-size:14px">Latest version at the time of writing: Playwright 1.63.0 (4 Sep 2026). Check the release notes before copying version-specific examples.</p>`;
addSrc('playwright','pwrel');
M('playwright-fixtures').sections.find(s=>s.h==='Automatic fixtures and options').body=UL(['<b>Auto fixtures</b> — <code class="i">[fn, { auto: true }]</code> run for every test without being requested. Good for attaching logs on failure or checking the console for errors.','<b>Option fixtures</b> — <code class="i">[defaultValue, { option: true }]</code> can be overridden per project in <code class="i">playwright.config.ts</code>.','<b>Overriding built-ins</b> — you can override <code class="i">page</code> itself, for example to navigate to a base route first.','<b>Combining sets</b> — <code class="i">mergeTests()</code> and <code class="i">mergeExpects()</code> (since v1.39) combine fixture and assertion sets from different modules.','<b>Parallel identity</b> — <code class="i">workerIndex</code> and <code class="i">parallelIndex</code> are available on both TestInfo and WorkerInfo; use them to key per-worker data.']);
M('playwright-fixtures').sections.find(s=>s.h==='Authentication with storageState').body+=`<p>An API-only variant also exists: log in with <code class="i">request.post(...)</code>, then save with <code class="i">request.storageState({ path })</code>.</p>`;

setSec('llm-evaluation','Adversarial testing',`<p>Treat the prompt as an attack surface. The <b>OWASP Top 10 for LLM Applications (2025)</b> is the standard checklist:</p>
 ${T(['ID','Risk','What to test'],[
 ['LLM01','Prompt Injection','Direct and indirect (retrieved-content) instructions must not change behaviour'],
 ['LLM02','Sensitive Information Disclosure','No personal data, secrets or other users’ data in answers'],
 ['LLM03','Supply Chain','Pinned, vetted third-party models, datasets and plugins'],
 ['LLM04','Data and Model Poisoning','Tampered training, fine-tuning or embedding data'],
 ['LLM05','Improper Output Handling','Output is validated/escaped before reaching HTML, SQL, shells or APIs'],
 ['LLM06','Excessive Agency','Agents have only the tools, permissions and autonomy they need'],
 ['LLM07','System Prompt Leakage','The system prompt can’t be extracted — and holds no secrets anyway'],
 ['LLM08','Vector and Embedding Weaknesses','RAG store access control, poisoning and leakage'],
 ['LLM09','Misinformation','Confident false output that users or systems rely on'],
 ['LLM10','Unbounded Consumption','Rate and cost limits; “denial of wallet”']])}
 ${CO('tip','Tip','Combine this with classic authorisation tests: even if a prompt tricks the model, the backend must still refuse data the user isn’t allowed to see.')}`);
setSec('llm-evaluation','LLM-as-judge: useful, but test the tester',`${UL(['Write a specific rubric with a small scale (pass/fail or 1–3) and an example for each score.','Calibrate: have humans label 50–100 outputs and measure agreement before trusting the judge. In Zheng et al. (2023), a strong judge model agreed with human preferences over 80% of the time — roughly human–human agreement — but only after controls.','Known biases from that paper: <b>position bias</b> (favours an answer’s place), <b>verbosity bias</b> (favours longer answers) and <b>self-enhancement bias</b> (favours its own outputs). Swap order, hide the source, and prefer a different model family as judge.','Version the judge prompt and model — changing the judge changes your scores.'])}
 ${CO('risk','Risk','An uncalibrated judge is a weak oracle with a confident voice.')}`);
addSec('llm-evaluation','Properties worth measuring','RAG metrics, precisely',`${T(['Metric (Ragas name)','Measures'],[['Faithfulness','Supported claims ÷ total claims in the answer, against the retrieved context (0–1)'],['Response relevancy','How relevant the answer is to the question — not whether it is true'],['Context precision','Whether relevant chunks are ranked above irrelevant ones'],['Context recall','How much of the needed information was retrieved, versus a reference']])}
 <p>NIST’s Generative AI Profile (AI 600-1) calls hallucination <b>confabulation</b>: confidently presenting erroneous or false content.</p>`);
setSec('llm-evaluation','Where evals run in the pipeline',`${T(['Stage','What runs'],[['Pull request (prompt/code change)','Deterministic checks on the full dataset; a small model-graded smoke set'],['Nightly / pre-release','Full dataset with repeated sampling, judges, adversarial set, baseline comparison'],['Model or provider upgrade','Full suite plus human review of a sample — treat it like a major release'],['Production','Monitor drift, refusal rate, user feedback, sampled judged outputs; feed failures back into the dataset']])}
 ${T(['Tool','What it is','Licence'],[['promptfoo','CLI/library for LLM evals and red-teaming (OpenAI announced its acquisition in Mar 2026)','MIT'],['DeepEval','Pytest-like framework for unit-testing LLM apps','Apache-2.0'],['Ragas','Python framework for LLM/RAG evaluation metrics and test-data generation','Apache-2.0']])}
 <p>The concepts matter more than the tool — check each tool’s current docs before adopting it.</p>`);
M('llm-evaluation').src=['owasp','judge','ragas','nist600','istqb'];

/* ---------- new module: API testing ---------- */
const API_MOD={id:'api-testing',track:'tools',title:'API testing',min:14,extra:true,
 sum:'Test business rules, contracts and security at the API — faster and more stable than through the UI — and combine it with UI tests.',
 sections:[
  S('Why test at the API level',`<p>Most business rules, validation and authorisation live behind an API. Testing there is fast, deterministic and survives UI redesigns — the “lowest level that gives sufficient confidence” from the strategy module.</p>`),
  S('HTTP essentials',`${T(['Code','Meaning','Typical test'],[
   ['200 OK','Success with a body','GET returns the resource'],['201 Created','A resource was created','POST returns the new id (often a Location header)'],['204 No Content','Success, empty body','DELETE succeeded'],
   ['400 Bad Request','Malformed request','Invalid JSON, wrong types'],['401 Unauthorized','Missing/invalid authentication','No token, expired token'],['403 Forbidden','Authenticated but not allowed','User A accesses user B’s resource'],
   ['404 Not Found','No such resource (also used to hide existence)','Unknown id'],['409 Conflict','Conflicts with current state','Duplicate registration'],['422 Unprocessable Content','Valid syntax, semantic errors','Password too short'],
   ['429 Too Many Requests','Rate limit hit (RFC 6585)','Burst of login attempts'],['500 Internal Server Error','Unhandled server error','Should never be reachable by input — log a defect'],['503 Service Unavailable','Temporarily unavailable','Dependency down / maintenance']])}
   ${T(['Method','Safe','Idempotent'],[['GET, HEAD, OPTIONS','Yes','Yes'],['PUT, DELETE','No','Yes'],['POST, PATCH','No','Not by definition']])}
   ${CO('note','Key idea','Idempotent means repeating the same request leaves the server in the same state. Test it: send the same PUT or DELETE twice and check the state (and that retries in your client are safe).')}`),
  S('API tests with Playwright',`<p>The <code class="i">request</code> fixture is an isolated <code class="i">APIRequestContext</code>. It picks up <code class="i">baseURL</code> and <code class="i">extraHTTPHeaders</code> from <code class="i">use</code> in the config.</p>
<pre class="code"><span class="k">import</span> { test, expect } <span class="k">from</span> <span class="s">'@playwright/test'</span>;

test(<span class="s">'duplicate email is rejected'</span>, <span class="k">async</span> ({ request }) =&gt; {
  <span class="k">const</span> email = <span class="s">\`qa+\${Date.now()}@example.test\`</span>;
  <span class="k">const</span> first = <span class="k">await</span> request.post(<span class="s">'/api/users'</span>, { data: { email, password: <span class="s">'S3cure!pass'</span> } });
  <span class="k">await</span> expect(first).toBeOK();                       <span class="c">// any 2xx</span>
  expect(first.status()).toBe(<span class="s">201</span>);

  <span class="k">const</span> dup = <span class="k">await</span> request.post(<span class="s">'/api/users'</span>, { data: { email, password: <span class="s">'S3cure!pass'</span> } });
  expect(dup.status()).toBe(<span class="s">409</span>);
  expect(<span class="k">await</span> dup.json()).toMatchObject({ error: <span class="s">'EMAIL_TAKEN'</span> });
});</pre>
<p>Other useful pieces: <code class="i">request.get/put/patch/delete/fetch</code>, response <code class="i">ok()</code> (200–299), <code class="i">status()</code>, <code class="i">headers()</code>, <code class="i">json()</code>; <code class="i">request.newContext({ baseURL, extraHTTPHeaders })</code> for a separately configured client.</p>`),
  S('Combine API and UI',`<p>Create data through the API, then verify only what the user must see through the UI — fast setup, focused UI checks:</p>
<pre class="code">test(<span class="s">'created issue appears in the UI'</span>, <span class="k">async</span> ({ request, page }) =&gt; {
  <span class="k">const</span> res = <span class="k">await</span> request.post(<span class="s">'/api/issues'</span>, { data: { title: <span class="s">'Bug 1'</span> } });
  <span class="k">await</span> expect(res).toBeOK();
  <span class="k">const</span> { id } = <span class="k">await</span> res.json();
  <span class="k">await</span> page.goto(<span class="s">\`/issues/\${id}\`</span>);
  <span class="k">await</span> expect(page.getByRole(<span class="s">'heading'</span>, { name: <span class="s">'Bug 1'</span> })).toBeVisible();
});</pre>`),
  S('Contracts and schemas',UL(['<b>Contract testing</b> checks each side of an integration in isolation against a shared contract. With <b>Pact</b> it is consumer-driven: the consumer’s tests generate the contract; the provider is verified against it.','<b>Schema validation</b> — checking response bodies against a JSON Schema (e.g. with a validator library such as Ajv) catches missing fields and wrong types early.','Contracts complement, not replace, a few end-to-end checks of the real integration.'])),
  S('API security: OWASP API Top 10 (2023)',`${T(['ID','Risk'],[['API1','Broken Object Level Authorization (BOLA)'],['API2','Broken Authentication'],['API3','Broken Object Property Level Authorization'],['API4','Unrestricted Resource Consumption'],['API5','Broken Function Level Authorization'],['API6','Unrestricted Access to Sensitive Business Flows'],['API7','Server Side Request Forgery'],['API8','Security Misconfiguration'],['API9','Improper Inventory Management'],['API10','Unsafe Consumption of APIs']])}
<pre class="code"><span class="c">// BOLA negative test: user A must not read user B's contact</span>
<span class="k">const</span> asA = <span class="k">await</span> apiRequest.newContext({ baseURL, extraHTTPHeaders: { Authorization: <span class="s">\`Bearer \${tokenA}\`</span> } });
<span class="k">const</span> res = <span class="k">await</span> asA.get(<span class="s">\`/api/contacts/\${contactOfB}\`</span>);
expect([<span class="s">403</span>, <span class="s">404</span>]).toContain(res.status());   <span class="c">// never 200</span></pre>
${CO('risk','Risk','BOLA is #1 for a reason: APIs expose object ids everywhere. Every endpoint that takes an id needs a cross-user negative test.')}`),
  S('A test matrix for one endpoint',T(['POST /api/contacts','Examples'],[['Positive','Valid contact → 201, body matches schema, GET returns it'],['Negative','Missing name → 400/422; no token → 401; another tenant’s id → 403/404'],['Boundary','Name at max length and max+1; empty string; Unicode'],['Idempotency / state','Same request twice → duplicate handling per spec'],['Security','Injection strings stored and returned safely; rate limit → 429'],['Performance','Response time budget; large payload rejected']])),
 ],
 quiz:[
  {q:'A logged-in user requests another user’s order and gets 200 with the data. Which OWASP API risk is this?',o:['API4 Unrestricted Resource Consumption','API1 Broken Object Level Authorization','API8 Security Misconfiguration','API9 Improper Inventory Management'],a:1,why:'Accessing another user’s object by id is BOLA — the #1 API risk.'},
  {q:'Which method is idempotent but not safe?',o:['GET','POST','PUT','HEAD'],a:2,why:'PUT and DELETE are idempotent (repeating leaves the same state) but change state, so they are not safe.'},
  {q:'Request without a token → which status is expected?',o:['401','403','404','500'],a:0,why:'401 means missing or invalid authentication; 403 means authenticated but not allowed.'},
  {q:'What does expect(response).toBeOK() assert in Playwright?',o:['Status is exactly 200','Status is in the 2xx range','The body is valid JSON','The request took under 1s'],a:1,why:'toBeOK passes for 200–299 responses.'},
  {q:'Who generates the contract in consumer-driven contract testing (Pact)?',o:['The provider','The consumer’s tests','A human architect','The API gateway'],a:1,why:'The consumer’s tests produce the contract; the provider is verified against it.'},
  {q:'An invalid input makes the API return 500. What is the right conclusion?',o:['Expected — invalid input','A defect: invalid input should get a 4xx, not an unhandled server error','A flaky test','The test should accept 500'],a:1,why:'5xx on client input means unhandled errors — log a defect.'},
 ],src:['pwapi','pwreq','rfc9110','rfc6585','pact','owaspapi']};
MODULES.splice(MODULES.findIndex(m=>m.id==='compare-tools')+1,0,API_MOD);

/* ---------- new modules: certification track ---------- */
const CTFL_MOD={id:'istqb-ctfl',track:'cert',title:'ISTQB CTFL essentials',min:18,extra:true,
 sum:'The Foundation Level concepts every automation engineer is expected to know — and that the exam tests.',
 sections:[
  S('The exam at a glance',`${T(['Item','CTFL v4.0.1'],[['Syllabus','v4.0.1, dated 15 Sep 2024 (current)'],['Questions','40 multiple choice, 1 point each, no negative marking'],['Time','60 minutes (+25% for non-native speakers)'],['Pass mark','26 / 40 (65%)'],['Cognitive levels','8 × K1 (remember), 24 × K2 (understand), 8 × K3 (apply)'],['Prerequisite','None — it is the prerequisite for everything else']])}
   ${T(['Chapter','Questions','K1/K2/K3'],[['1 Fundamentals of testing','8','2/6/0'],['2 Testing throughout the SDLC','6','2/4/0'],['3 Static testing','4','2/2/0'],['4 Test analysis and design','11','0/6/5'],['5 Managing the test activities','9','1/5/3'],['6 Test tools','2','1/1/0']])}
   ${CO('tip','Tip','Chapter 4 carries 11 questions and 5 of the 8 K3 (apply) questions — practise the techniques with numbers, not just definitions.')}`),
  S('Seven testing principles',OL(['Testing shows the presence, not the absence, of defects','Exhaustive testing is impossible','Early testing saves time and money (shift-left)','Defects cluster together','Tests wear out (the old “pesticide paradox”)','Testing is context dependent','Absence-of-defects fallacy — a defect-free system can still fail users'])),
  S('Levels, types, static vs dynamic',`${T(['Concept','Summary'],[['Test levels','Component · component integration · system · system integration · acceptance'],['Test types','Functional · non-functional · black-box · white-box'],['Confirmation testing','Re-run the failed test after a fix to confirm it is fixed'],['Regression testing','Check a change didn’t break something else — the main automation candidate'],['Static testing','Reviews and static analysis of work products without executing them; finds defects directly'],['Dynamic testing','Executes the software; reveals failures whose causes are then traced to defects']])}`),
  S('Black-box techniques with numbers',`<p>Example requirement: <i>age must be 18–65 inclusive.</i></p>
   ${T(['Technique','Coverage items for the example'],[['Equivalence partitioning','3 partitions: &lt;18 (invalid), 18–65 (valid), &gt;65 (invalid) → 3 tests minimum'],['2-value BVA','Each boundary + closest neighbour in the adjacent partition: 17, 18, 65, 66 → 4 values'],['3-value BVA','Each boundary + both neighbours: 17, 18, 19, 64, 65, 66 → 6 values (more rigorous)'],['Decision table','n independent true/false conditions → up to 2ⁿ combinations (columns), often collapsed'],['State transition','States, events and transitions; typical coverage: all valid transitions, plus invalid ones']])}
   ${CO('note','Key idea','Equivalence partitioning picks one value per partition; boundary value analysis focuses on the edges, where off-by-one defects hide. Automation makes both cheap to run as data-driven tests.')}`),
  S('White-box and experience-based',UL(['<b>Statement coverage</b> — % of executable statements exercised.','<b>Branch coverage</b> — % of decision outcomes exercised. 100% branch coverage implies 100% statement coverage, not the reverse.','<b>Error guessing</b> — anticipate defects from experience.','<b>Exploratory testing</b> — simultaneous learning, design and execution, often in time-boxed sessions with a charter.','<b>Checklist-based testing</b> — test conditions from a checklist of experience.'])),
  S('Managing testing: risk, defects, pyramid, quadrants',`${UL(['<b>Risk level</b> is determined by <b>likelihood</b> and <b>impact</b> (e.g. likelihood × impact, or a risk matrix). Product risks affect quality; project risks affect the project.','A <b>defect report</b> includes: id, title, date/author, test object and environment, context, description with steps to reproduce, expected vs actual result, severity, priority, status and references.','<b>Severity</b> = impact of the defect; <b>priority</b> = urgency of fixing it. They can differ.','<b>Test pyramid</b> — many fast, isolated low-level tests; few slow UI tests at the top.'])}
   ${T(['Testing quadrant','Examples'],[['Q1 technology-facing, supports the team','Component and integration tests'],['Q2 business-facing, supports the team','Functional tests, story examples'],['Q3 business-facing, critiques the product','Exploratory, usability, UAT'],['Q4 technology-facing, critiques the product','Smoke and non-functional: performance, security']])}`),
  S('Test tools and automation (chapter 6)',`<p>The syllabus lists benefits such as saving time on repetitive work, more consistency, objective measures like coverage, faster feedback, and freeing testers for deeper exploratory work. It lists risks such as unrealistic expectations, underestimating time, cost and maintenance, using a tool where it doesn’t fit, over-reliance on the tool, vendor dependency, abandoned open-source projects and platform incompatibility.</p>
   ${CO('risk','Check the source','Parts of chapters 5–6 above were verified via a secondary study source; confirm exact wording against the official v4.0.1 PDF before the exam.')}`),
 ],
 quiz:[
  {q:'An input accepts 1–100. Using 2-value BVA, which values do you test?',o:['1 and 100','0, 1, 100, 101','0, 1, 2, 99, 100, 101','50'],a:1,why:'2-value BVA: each boundary plus its closest neighbour in the adjacent partition.'},
  {q:'Same range 1–100 with 3-value BVA — how many values?',o:['4','5','6','8'],a:2,why:'0, 1, 2, 99, 100, 101 — each boundary and both neighbours.'},
  {q:'A decision table has 4 independent true/false conditions. Maximum number of combinations?',o:['4','8','16','32'],a:2,why:'2⁴ = 16.'},
  {q:'Which statement is true?',o:['100% statement coverage guarantees 100% branch coverage','100% branch coverage guarantees 100% statement coverage','They are always equal','Neither relates to the other'],a:1,why:'Covering every decision outcome executes every statement; the reverse can miss a false branch.'},
  {q:'Running the same regression suite unchanged finds fewer and fewer new defects. Which principle?',o:['Defects cluster together','Tests wear out','Exhaustive testing is impossible','Absence-of-defects fallacy'],a:1,why:'Tests wear out: they need reviewing and updating to keep finding defects.'},
  {q:'How many questions and what pass mark does the CTFL exam have?',o:['60 questions, 70%','40 questions, 26 points (65%)','40 questions, 31 points','50 questions, 65%'],a:1,why:'40 one-point questions, pass at 26.'},
  {q:'A typo on the login page is cosmetic but on the CEO’s demo tomorrow. How would you classify it?',o:['High severity, low priority','Low severity, high priority','High severity, high priority','Not a defect'],a:1,why:'Severity is impact (low); priority is urgency (high).'},
  {q:'Which activity is static testing?',o:['Running the API suite in CI','A review of the requirements document','An exploratory session','A load test'],a:1,why:'Static testing examines work products without executing code.'},
 ],src:['ctfl','ctflpdf','est']};

const CERT_PATH={id:'cert-path',track:'cert',title:'Certification path and exam strategy',min:10,extra:true,
 sum:'Which ISTQB certificates matter for automation and AI testing, what their exams look like, and how to prepare.',
 sections:[
  S('The route for an automation engineer',`<div class="layers"><div><b>CTFL v4.0.1</b><span>Foundation — required for everything else</span></div><div><b>CT-TAS v1.0</b><span>Specialist · Test Automation Strategy</span></div><div><b>CTAL-TAE v2.0</b><span>Advanced · Test Automation Engineering</span></div><div><b>CT-AI v2.0</b><span>Specialist · testing AI-based systems</span></div></div>
   <p>All three follow CTFL. ISTQB does not prescribe an order between them — pick by role: TAS for strategy and leads, TAE for hands-on framework engineers, CT-AI if you test ML or LLM features.</p>`),
  S('Exam formats compared',`${T(['Certificate','Questions','Points','Pass','Time'],[['CTFL v4.0.1','40','40','26 (65%)','60 min'],['CT-AI v2.0','40','44','29','60 min'],['CTAL-TAE v2.0','40','66','43','90 min'],['CT-TAS v1.0','40','49','32','60 min*']])}
   <p class="empty" style="font-size:14px">Non-native speakers get +25% time. *ISTQB’s exam-structure tables list a different duration for CT-TAS in one place — confirm with your exam provider. Formats checked 23 Sep 2026.</p>`),
  S('What each advanced/specialist exam covers',UL(['<b>CTAL-TAE v2.0</b> — automation objectives, preparation, architecture (the generic test automation architecture), implementation, deployment strategies, reporting and metrics, verifying the automation solution, continuous improvement. Needs CTFL plus practical experience.','<b>CT-TAS v1.0</b> — objectives, resources, preparing for automation, organisational deployment and release strategies, impact analysis, implementation and improvement strategies.','<b>CT-AI v2.0</b> — AI and ML fundamentals, AI quality characteristics (ISO/IEC 25059), input-data and model testing, GenAI/LLM testing including red teaming. v1.0 exams end 21 Apr 2027 (English).'])),
  S('Exam technique',OL(['Read the question stem last word first: “NOT”, “MOST”, “BEST” change the answer.','Answer K1 questions fast; bank the time for K3 calculation questions (BVA, decision tables, coverage).','Eliminate: two options are usually clearly wrong. Choose between the remaining two by the syllabus wording, not by workplace habit.','For “select TWO” questions, both must be right to score.','There is no negative marking — never leave a question blank.','Flag and move on; revisit flagged questions with the remaining time.','Practise with the official sample exams from ISTQB or your national board, then use the timed final exam in this hub.'])+CO('tip','Tip','This hub’s timed final exam mirrors the CTFL format: 40 questions, 60 minutes, 65% to pass.')),
 ],
 quiz:[
  {q:'Which certificate is the prerequisite for CT-AI, CT-TAS and CTAL-TAE?',o:['None','CTFL','CTAL-TA','CT-GenAI'],a:1,why:'CTFL is the prerequisite for all other ISTQB certifications.'},
  {q:'CT-AI v2.0 exam: what is the pass mark?',o:['26 of 40','29 of 44','31 of 47','43 of 66'],a:1,why:'40 questions worth 44 points; pass at 29. (31/47 was v1.0; 43/66 is CTAL-TAE.)'},
  {q:'You build and maintain your team’s automation framework hands-on. Which advanced certificate fits best?',o:['CTAL-TAE','CT-TAS','CT-AI','CTFL-AT'],a:0,why:'Test Automation Engineering targets hands-on automation architecture and implementation.'},
  {q:'In an ISTQB exam, what happens if you guess wrong?',o:['You lose a point','Nothing — there is no negative marking','The exam ends','You lose half a point'],a:1,why:'No negative marking, so never leave a question unanswered.'},
  {q:'A question asks you to “select TWO”. You pick one correct and one wrong option. Score?',o:['1 point','0.5 points','0 points','Depends on the board'],a:2,why:'Both selections must be correct to earn the point.'},
 ],src:['ctfl','ctaipdf','tae','tas','est']};

MODULES.push(CTFL_MOD,CERT_PATH);

GLOSSARY.push(
 ['K-level','ISTQB cognitive level of a learning objective: K1 remember, K2 understand, K3 apply (K4 analyse in some syllabi).','cert'],
 ['Equivalence partitioning','Split inputs into partitions the system should treat the same; test one value per partition.','cert'],
 ['Boundary value analysis','Test at the edges of ordered partitions — 2-value (boundary + neighbour) or 3-value (boundary + both neighbours).','cert'],
 ['Branch coverage','Percentage of decision outcomes exercised; 100% branch implies 100% statement coverage.','cert'],
 ['Confirmation testing','Re-running a failed test after a fix to confirm the defect is gone.','cert'],
 ['Severity vs priority','Severity = impact of a defect; priority = urgency of fixing it.','cert'],
 ['BOLA','Broken Object Level Authorization — accessing another user’s object by changing its id (OWASP API1).','tools'],
 ['Idempotent method','Repeating the request leaves the server in the same state: GET, HEAD, OPTIONS, PUT, DELETE.','tools'],
 ['Contract testing','Verifying each side of an integration in isolation against a shared contract (e.g. Pact, consumer-driven).','tools'],
 ['Confabulation','NIST’s term for generative AI confidently presenting false content — “hallucination”.','ai'],
 ['Faithfulness','Share of an answer’s claims supported by the retrieved context (Ragas).','ai'],
);
STUDY_PATH.splice(STUDY_PATH.length-1,1,'Take ISTQB CTFL v4.0.1 — use the timed final exam here to practise','Learn ML metrics and GenAI testing; consider ISTQB CT-AI v2.0, CT-TAS or CTAL-TAE');

/* ================= EXAM BANK (exam-only questions; t = track, k = K-level) ================= */
const EXAM_BANK=[
 {t:'found',k:2,q:'Which check is the WEAKEST automation candidate?',o:['Login smoke run on every deploy','A one-off check of a marketing page that will be removed next week','Data-driven price-rule regression','Cross-browser checkout journey'],a:1,why:'One-off, short-lived checks don’t repay the cost of automating.'},
 {t:'found',k:2,q:'An automated suite is green but a critical bug reached production. Which is the most likely root cause?',o:['The CI server was slow','The assertions checked weak signals (a poor oracle) or the scenario wasn’t covered','Too many tests','The reporter was misconfigured'],a:1,why:'Green-but-wrong usually means weak oracles or missing risk coverage.'},
 {t:'found',k:1,q:'Select TWO things automation does NOT solve by itself.',o:['Repeating regression checks','Choosing which scenarios matter','Running tests in parallel','Judging usability','Capturing screenshots'],a:[1,3],why:'Scenario selection and usability judgement stay human.'},
 {t:'found',k:2,q:'Which level best checks that a date-picker component handles leap years?',o:['End-to-end','Component test','Load test','Acceptance test'],a:1,why:'Isolated component behaviour is fastest and most precise at component level.'},
 {t:'tools',k:2,q:'Playwright: which locator strategy is recommended first?',o:['CSS classes','XPath','getByRole with an accessible name','nth-child selectors'],a:2,why:'Role-based locators reflect how users and assistive tech see the page.'},
 {t:'tools',k:2,q:'Why is a Playwright browser context important for parallel tests?',o:['It speeds up the network','Each test gets isolated cookies and storage, so tests don’t leak state','It records video','It replaces fixtures'],a:1,why:'Contexts give each test a clean, isolated session.'},
 {t:'tools',k:2,q:'After upgrading to Cypress 16, a test using cy.exec() fails to run. Why?',o:['cy.exec() is removed in Cypress 16 — use cy.task()','Node 22 is too new','cy.exec needs Cypress Cloud','A flaky network'],a:0,why:'Cypress 16 removed cy.exec(); cy.task() is the replacement route to Node code.'},
 {t:'tools',k:1,q:'What is the status of Selenium Manager as of September 2026?',o:['Removed','Still labelled beta','Replaced by Grid','Only for Firefox'],a:1,why:'Selenium Manager ships with Selenium but remains beta.'},
 {t:'tools',k:3,q:'Your API returns 200 when user A deletes user B’s contact. Which test would have caught it, and what should it expect?',o:['A UI smoke test expecting 200','A cross-user negative API test expecting 403 or 404','A load test expecting 429','A schema test expecting 201'],a:1,why:'BOLA is caught by explicit cross-user negative tests.'},
 {t:'tools',k:2,q:'A worker-scoped Playwright fixture should be…',o:['Mutable and shared freely','Read-only or keyed by worker, since all tests in that worker share it','Recreated per test','Stored in git'],a:1,why:'Shared mutable worker fixtures cause order-dependent flakiness.'},
 {t:'tools',k:2,q:'Select TWO statements that are true about cy.request().',o:['It makes a real HTTP request','It is stubbed by cy.intercept()','It bypasses cy.intercept()','It only works in component tests','It requires Cypress Cloud'],a:[0,2],why:'cy.request sends a real request and is not caught by cy.intercept.'},
 {t:'frame',k:2,q:'Which belongs in the framework core layer?',o:['A test that checks checkout','A browser/driver factory and configuration loader','A dashboard','The system under test'],a:1,why:'Shared technical services are the core.'},
 {t:'frame',k:2,q:'Which CI stage should run release smoke plus critical journeys?',o:['Pre-commit','Release','Nightly','Scheduled compatibility'],a:1,why:'Release confidence comes from smoke + critical journeys at release time.'},
 {t:'frame',k:3,q:'A PR pipeline takes 55 minutes because it runs the full cross-browser E2E suite. Best fix?',o:['Add retries','Move the broad suite to post-merge/nightly and keep smoke + selected checks on PRs','Delete E2E tests','Run PRs weekly'],a:1,why:'Give risk-appropriate feedback per stage; keep PR checks fast.'},
 {t:'frame',k:1,q:'Where should the retry and flaky-test policy be documented?',o:['Nowhere','In the framework documentation set','Only in Slack','In the test names'],a:1,why:'It is part of the minimum documentation set.'},
 {t:'frame',k:2,q:'Which artifact risk is specific to uploading traces from CI?',o:['Traces are too small','They may contain secrets or personal data','They slow down tests','They break reports'],a:1,why:'Traces capture network and DOM — mask data and control retention.'},
 {t:'qual',k:3,q:'Password field accepts 8–64 characters. Using 2-value BVA, which lengths do you test?',o:['8 and 64','7, 8, 64, 65','7, 8, 9, 63, 64, 65','1, 8, 64, 100'],a:1,why:'Boundaries 8 and 64 plus their closest invalid neighbours 7 and 65.'},
 {t:'qual',k:2,q:'Which is the best first response to a newly flaky test?',o:['Increase retries','Delete it','Collect artifacts, reproduce with repeated runs, and find the cause; quarantine with owner and expiry if needed','Ignore it'],a:2,why:'Diagnose first; quarantine only with ownership and expiry.'},
 {t:'qual',k:2,q:'Which scenario most needs a negative authorisation test?',o:['Changing the theme colour','Tenant A requesting Tenant B’s invoice','Viewing the public home page','Logging out'],a:1,why:'Cross-tenant access must be deliberately tested.'},
 {t:'qual',k:2,q:'Which failure mode does “frequent test edits after every UI tweak” indicate?',o:['Data leakage','Maintenance explosion','Tool lock-in','False security'],a:1,why:'Brittle selectors or over-abstraction create maintenance explosions.'},
 {t:'qual',k:3,q:'Risk A: likelihood 4, impact 2. Risk B: likelihood 2, impact 5. Using likelihood × impact, which do you automate first?',o:['A (8)','B (10)','Equal','Neither'],a:1,why:'B scores 10 vs A’s 8.'},
 {t:'qual',k:1,q:'Select TWO signs that CI has lost the team’s trust.',o:['Red builds are re-run until green','Failures are investigated quickly','Alerts are routinely ignored','Retries are tracked separately','Flaky tests have owners'],a:[0,2],why:'Re-running until green and ignoring alerts are symptoms of lost trust.'},
 {t:'ai',k:2,q:'Which OWASP LLM Top 10 (2025) entry covers an agent that can delete files it never needed access to?',o:['LLM01 Prompt Injection','LLM06 Excessive Agency','LLM09 Misinformation','LLM10 Unbounded Consumption'],a:1,why:'Excessive Agency: more tools, permissions or autonomy than needed.'},
 {t:'ai',k:2,q:'An LLM answer is inserted into a web page without escaping and runs a script. Which OWASP LLM risk?',o:['LLM05 Improper Output Handling','LLM07 System Prompt Leakage','LLM03 Supply Chain','LLM04 Data and Model Poisoning'],a:0,why:'Model output reaching downstream systems unvalidated is Improper Output Handling.'},
 {t:'ai',k:3,q:'A model flags 50 items; 40 are truly positive; there are 80 positives overall. Precision and recall?',o:['0.80 and 0.50','0.50 and 0.80','0.40 and 0.50','0.80 and 0.80'],a:0,why:'Precision 40/50 = 0.80; recall 40/80 = 0.50.'},
 {t:'ai',k:2,q:'Which bias describes a judge model preferring longer answers?',o:['Position bias','Verbosity bias','Self-enhancement bias','Selection bias'],a:1,why:'Verbosity bias (Zheng et al. 2023).'},
 {t:'ai',k:2,q:'Ragas “faithfulness” measures…',o:['How relevant the answer is to the question','The share of answer claims supported by retrieved context','Retrieval ranking quality','Latency'],a:1,why:'Faithfulness = supported claims ÷ total claims.'},
 {t:'ai',k:1,q:'After the 2026 AI Omnibus, when must stand-alone (Annex III) high-risk AI systems comply with the EU AI Act?',o:['2 Aug 2025','2 Aug 2026','2 Dec 2027','2 Aug 2030'],a:2,why:'The Omnibus moved Annex III obligations to 2 Dec 2027 (embedded, Annex I: 2 Aug 2028).'},
 {t:'ai',k:2,q:'Why sample each eval case several times?',o:['To increase cost','To detect unstable cases caused by non-deterministic output','Because judges require it','To make results deterministic'],a:1,why:'Repeated sampling reveals cases that flip between pass and fail.'},
 {t:'ai',k:1,q:'Select TWO properties that are usually zero-tolerance gates in LLM evals.',o:['Tone score ≥ 3','Prompt-injection cases all pass','Schema validity of structured output','Average answer length','Judge agreement 80%'],a:[1,2],why:'Security cases and required output structure are hard gates; tone and length are thresholds.'},
 {t:'cert',k:3,q:'Field accepts 10–20 inclusive. How many equivalence partitions (valid + invalid)?',o:['1','2','3','4'],a:2,why:'Below 10, 10–20, above 20.'},
 {t:'cert',k:3,q:'Field accepts 10–20 inclusive. Minimum tests for 3-value BVA?',o:['4','5','6','8'],a:2,why:'9, 10, 11, 19, 20, 21.'},
 {t:'cert',k:2,q:'Which principle warns that a defect-free system may still be unusable?',o:['Defects cluster together','Absence-of-defects fallacy','Tests wear out','Early testing saves money'],a:1,why:'Fixing defects doesn’t guarantee the system meets user needs.'},
 {t:'cert',k:1,q:'Which is NOT a CTFL v4.0 test level?',o:['Component integration','System integration','Acceptance','Performance'],a:3,why:'Performance is a (non-functional) test type, not a level.'},
 {t:'cert',k:2,q:'After a fix, the tester re-runs the test that originally failed. This is…',o:['Regression testing','Confirmation testing','Smoke testing','Exploratory testing'],a:1,why:'Confirmation testing confirms the fix; regression checks for side effects.'},
 {t:'cert',k:2,q:'Which testing quadrant contains exploratory and usability testing?',o:['Q1','Q2','Q3','Q4'],a:2,why:'Q3: business-facing, critiques the product.'},
 {t:'cert',k:3,q:'A code snippet has one IF without an ELSE. One test takes the TRUE path. Coverage?',o:['100% statement, 50% branch','50% statement, 100% branch','100% statement, 100% branch','50% statement, 50% branch'],a:0,why:'All statements run, but the FALSE outcome is untested: 1 of 2 branches.'},
 {t:'cert',k:1,q:'How much extra time do non-native speakers get in most ISTQB exams?',o:['None','10%','25%','50%'],a:2,why:'25% extra time.'},
 {t:'cert',k:2,q:'Select TWO items that belong in a defect report.',o:['Steps to reproduce','The tester’s salary','Expected vs actual result','The developer’s name to blame','The team’s velocity'],a:[0,2],why:'Reproduction steps and expected vs actual are core fields.'},
 {t:'cert',k:2,q:'Which is static testing?',o:['Running unit tests','Static analysis of source code by a linter','A load test','An exploratory session'],a:1,why:'Static analysis examines code without executing it.'},
];
