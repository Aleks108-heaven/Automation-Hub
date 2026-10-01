/* ================= i18n: language choice, UI strings, content overlays ================= */
const LANGS=[['en','English'],['uk','Українська'],['pl','Polski'],['es','Español']];
const LANG_KEY='automation-hub.lang';
let LANG=(()=>{let l=null;try{l=new URLSearchParams(location.search).get('lang')||localStorage.getItem(LANG_KEY);}catch(e){}return LANGS.some(x=>x[0]===l)?l:'en';})();
const TR={};            // TR[lang] = {tracks, modules, glossary, checks, path, exam} — filled by i18n-*.js
const P=i=>`⟦P${i}⟧`;  // placeholder for the i-th code block of a section (code stays in English)
const UI={};
function t(k,...a){const d=UI[LANG]||{};const s=k in d?d[k]:UI.en[k];return typeof s==='function'?s(...a):s;}

/* English snapshot, taken on first use, so the language can be switched in place without a reload
   (a reload can't carry the choice when the page runs where storage is blocked). */
let EN_SNAP=null;
function snapEN(){
  EN_SNAP={tracks:TRACKS.map(t=>[t.name,t.blurb]),
    modules:MODULES.map(m=>({title:m.title,sum:m.sum,sections:m.sections.map(s=>[s.h,s.body]),quiz:m.quiz.map(q=>[q.q,q.o,q.why])})),
    glossary:GLOSSARY.map(g=>[g[0],g[1]]),checks:FRAMEWORK_CHECKS.slice(),path:STUDY_PATH.slice(),exam:EXAM_BANK.map(q=>[q.q,q.o,q.why])};
}
function restoreEN(){
  const E=EN_SNAP;
  TRACKS.forEach((t,i)=>{[t.name,t.blurb]=E.tracks[i];});
  MODULES.forEach((m,i)=>{const x=E.modules[i];m.title=x.title;m.sum=x.sum;
    m.sections.forEach((s,j)=>{[s.h,s.body]=x.sections[j];});m.quiz.forEach((q,j)=>{[q.q,q.o,q.why]=x.quiz[j];});});
  GLOSSARY.forEach((g,i)=>{[g[0],g[1]]=E.glossary[i];});
  E.checks.forEach((c,i)=>FRAMEWORK_CHECKS[i]=c);E.path.forEach((p,i)=>STUDY_PATH[i]=p);
  EXAM_BANK.forEach((q,i)=>{[q.q,q.o,q.why]=E.exam[i];});
}

/* Overlay the chosen language onto the English content. Anything missing or structurally
   different (section count, option count, code-block count) falls back to English. */
function applyTR(){
  if(!EN_SNAP)snapEN();else restoreEN();
  const tr=TR[LANG];if(!tr)return;
  const PRE=/<pre class="code">[\s\S]*?<\/pre>/g,TOK=/⟦P(\d+)⟧/g;
  const fitQ=(q,x)=>x&&x.length===3&&Array.isArray(x[1])&&x[1].length===q.o.length;
  TRACKS.forEach(tk=>{const x=tr.tracks&&tr.tracks[tk.id];if(x){tk.name=x[0];tk.blurb=x[1];}});
  MODULES.forEach(m=>{const x=tr.modules&&tr.modules[m.id];if(!x)return;
    if(x.title)m.title=x.title;if(x.sum)m.sum=x.sum;
    /* newer English sections are appended, so a shorter translation still covers the sections before them */
    if(x.sections&&x.sections.length<=m.sections.length)m.sections.forEach((s,i)=>{
      const pres=s.body.match(PRE)||[],y=x.sections[i];if(!y)return;
      if((y[1].match(TOK)||[]).length!==pres.length)return;
      s.h=y[0];s.body=y[1].replace(TOK,(_,n)=>pres[+n]);});
    (x.quiz||[]).forEach((y,i)=>{const q=m.quiz[i];if(q&&fitQ(q,y)){q.q=y[0];q.o=y[1];q.why=y[2];}});
  });
  (tr.glossary||[]).forEach((y,i)=>{if(GLOSSARY[i]&&y){GLOSSARY[i][0]=y[0];GLOSSARY[i][1]=y[1];}});
  (tr.checks||[]).forEach((y,i)=>{if(i<FRAMEWORK_CHECKS.length&&y)FRAMEWORK_CHECKS[i]=y;});
  (tr.path||[]).forEach((y,i)=>{if(i<STUDY_PATH.length&&y)STUDY_PATH[i]=y;});
  (tr.exam||[]).forEach((y,i)=>{const q=EXAM_BANK[i];if(q&&fitQ(q,y)){q.q=y[0];q.o=y[1];q.why=y[2];}});
}

/* ---------- UI strings ---------- */
UI.en={
 language:'Language',yourProgress:'Your progress',searchPh:'Search modules…',resetProgress:'Reset progress',confirmReset:'Click again to confirm',progressReset:'Progress reset',menu:'Menu',skipLink:'Skip to main content',timeLow:m=>`${m} min left`,navAria:'Course navigation',
 home:'Home',noMatch:f=>`No module mentions “${f}”.`,practice:'Practice',doneAria:'done',doneBadge:'✓ Done',quizBadge:(r,q)=>`~ ${r}/${q} quiz`,moduleEyebrow:n=>`MODULE ${n}`,min:n=>`${n} min`,
 heroLabel:'A study hub for QA engineers',heroTitle:'Automate the right checks, at the right level.',
 heroLede:(n,h)=>`${n} short modules on Playwright, Cypress, Selenium, API testing, framework design, CI/CD, flaky tests, AI testing and ISTQB certification — each with a self-check quiz, plus practice exams. About ${h} hours in total.`,
 cont:'Continue',start:'Start',allDone:'All done — take the mixed quiz',takeExam:'Take an exam',statsAria:'Your stats',statModules:'modules done',statQuiz:'quiz answers right',statFw:'framework checks ticked',
 practiceBlurb:'Test what you’ve learned and apply it to a real framework.',takeawayLabel:'Final takeaway',
 takeaway:'A mature automation project is an engineered testing system: tests + architecture + data + environments + browser infrastructure + assertions + diagnostics + reporting + CI/CD + documentation + maintenance. The goal isn’t “automate everything” — it’s to automate the right checks at the right level and keep them trustworthy.',
 footnote:'Built from “Test Automation for QA” and “AI Testing: A Research Overview for Testers” (researched September 2026). Modules marked “Beyond the source docs” add material from official sources (ISTQB, Playwright, Cypress, Selenium, OWASP, RFC 9110, NIST, EU) checked on 23 Sep 2026. Progress is saved in this browser only.',
 prExams:'Exams',prExamsB:'Per-track practice exams and a timed 40-question final in ISTQB style.',prQuiz:'Mixed quiz',prQuizB:'Ten random questions from every module, with explanations.',
 prFc:'Flashcards',prFcB:n=>`${n} key terms. Flip, filter by track, shuffle.`,prPick:'Tool picker',prPickB:'Answer five questions; see how Playwright, Cypress and Selenium fit.',
 prFw:'Framework review',prFwB:n=>`The ${n}-point QA checklist for an automation framework.`,prPath:'Study path',prPathB:n=>`${n} steps from test design to AI testing.`,
 prResources:'Cheat sheets',prResourcesB:'Quick-reference command tables and curated official links for Playwright, Cypress and Selenium.',
 prCareer:'Career prep',prCareerB:'Interview questions, portfolio project ideas and a skills-to-job-posting checklist.',
 timeLeft:n=>`~${n} min left to finish every module`,
 correct:'Correct.',notQuite:'Not quite.',moduleLabel:(n,tk)=>`Module ${n} · ${tk}`,beyond:'Beyond the source docs',checkYourself:'Check yourself',markedDone:'You marked this module as done.',finishedQ:'Finished reading and the quiz?',
 markNotDone:'Mark as not done',markDone:'Mark as done',sources:'Sources',prev:'← PREVIOUS',next:'NEXT →',pagerAria:'Module navigation',
 mqSum:'Ten random questions from across the hub. Explanations appear after each answer.',score:(s,n)=>`Score: ${s} / ${n}`,pass:'✓ Pass',reviewB:'~ Review',revisitB:'✕ Revisit modules',answered:(d,n)=>`${d} / ${n} answered`,newQ:'New set of questions',revisit:'Revisit',
 fcSum:'Tap the card (or press Space) to flip. Arrow keys move between cards.',filterAria:'Filter by track',all:'All',fcAria:(term,def)=>`Flashcard: ${term}. ${def||'Press to reveal definition.'}`,tapReveal:'Tap to reveal',prevBtn:'← Previous',nextBtn:'Next →',shuffle:'Shuffle',
 fwSum:'Run this against your own automation framework. Every unchecked item is a risk worth a ticket.',pathSum:'A recommended order for learning QA automation, from test design to AI testing.',completed:'Completed',tip:'Tip',note:'Note',
 fwTip:'Unchecked items map to modules: isolation and waits → Flaky tests; secrets and tenants → Security; docs → Framework documentation.',
 pkSum:'Five questions about your context. Your result appears below once all are answered.',pkResult:'How the tools line up for you',bestFit:'Best fit',pts:n=>`${n} pts`,meterAria:(a,b)=>`${a} of ${b} points`,watchOut:'Watch-out:',
 pkNoteLabel:'How to read this',pkNote:'This is a heuristic based on the capability comparison in the guide, not a ranking of the tools. Before committing, run a two-day spike on your real application with the top two candidates and compare maintenance effort.',clearAnswers:'Clear answers',
 pk:[['Which browsers must you cover?',['Chromium only is fine','Chromium and Firefox','Safari / WebKit is required too','Many browser versions on remote machines']],
  ['What language does your team write tests in?',['JavaScript / TypeScript','Java, C# or Python','Mixed / not decided']],
  ['What will most of your tests be?',['E2E user journeys plus API checks','Front-end component tests alongside E2E','Large cross-platform regression on remote infrastructure']],
  ['What infrastructure do you already have?',['Nothing yet — a clean start','An existing Selenium Grid / WebDriver suite','Budget for a hosted dashboard with replay and analytics']],
  ['How do you prefer to debug failures?',['Traces and reports from CI runs','Interactively, stepping through commands in the browser','Our own logging and reporting stack']]],
 tools:{pw:[['Chromium, Firefox and WebKit built in','Integrated runner, fixtures, parallelism','Trace Viewer and HTML report for CI debugging','UI + API tests in one tool'],'Refactor Codegen output; watch parallel data collisions.'],
  cy:[['Strong component-testing workflow','Time-travel Command Log for local debugging','Network stubbing, spies and clocks','Optional Cloud for replay and flaky management'],'Separate free local features from paid Cloud; check cross-origin needs.'],
  se:[['WebDriver bindings for Java, C#, Python, JS…','Grid for remote, parallel, cross-platform runs','Mature, standards-based ecosystem','Reuses existing infrastructure'],'You assemble the framework yourself; synchronisation needs care.']},
 finalExam:'Final exam',trackExam:n=>`${n} exam`,startExam:x=>`Start ${x.toLowerCase()}`,newExam:x=>`New ${x.toLowerCase()}`,timedEyebrow:'TIMED · ISTQB-STYLE',untimedEyebrow:'UNTIMED · PRACTICE',resume:'Resume',
 exSum:'Answers are revealed only when you submit. Use per-track exams to find weak spots, then sit the timed final under exam conditions.',
 finalHeadP:'Mirrors the ISTQB CTFL format: 40 questions, 60 minutes, 65% to pass. Questions are drawn from every track.',finalTile:'40 questions across all six tracks, with a countdown. It submits automatically when time runs out.',
 finalMeta:(n,m,p)=>`${n} Q · ${m} min · pass ${p}`,perTrack:'Per-track exams',perTrackP:n=>`${n} random questions from one track, no timer.`,tileMeta:(n,p)=>`${n} Q · pool ${p}`,
 attempts:'Your attempts',thDate:'Date',thExam:'Exam',thScore:'Score',thResult:'Result',thTime:'Time',failB:'✕ Fail',noAttempts:'No attempts yet. Your last 10 results appear here (saved in this browser only).',
 exNoteLabel:'How exams differ from quizzes',exNote:'Module quizzes show the answer immediately so you learn as you go. Exams hold feedback until you submit and score all-or-nothing on “Select TWO” questions, as ISTQB does.',
 howTitle:'How the exams work',howP:'Every exam draws from a <b>pool</b> for each track: all the quiz questions of that track’s modules plus <b>exam-only</b> questions that never appear in module quizzes. Exam-only questions lean towards scenarios and calculations, so they test whether you can <i>apply</i> the material, not just recognise it.',
 guideTh:['Track','Modules','Quiz Q','Exam-only Q','Pool','K1 / K2 / K3*','Select TWO','In final'],kNote:'*K-levels are tagged on exam-only questions: K1 remember, K2 understand, K3 apply. Module quiz questions are untagged.',
 qvsE:'Quizzes vs exams',qvsETh:['','Module quiz','Mixed quiz','Track exam','Final exam'],
 qvsERows:(n,f,m,p,need)=>[['Questions','All of the module’s','10 random',`${n} random`,`${f}, fixed quota per track`],['Feedback','Right after each answer','Right after each answer','After you submit','After you submit'],['Timer','No','No','No',`${m} min, auto-submit`],['Pass mark','—','—',`${p}%`,`${need} / ${f}`],['Best for','Learning while you read','Spaced recall across topics','Finding weak tracks','Rehearsing exam conditions']],
 scoringTitle:'Scoring rules',scoring:['One point per question and no negative marking, so answer everything.','“Select TWO” questions score only if both choices are right, as in ISTQB exams.','The result page breaks your score down by track and lists every wrong answer with an explanation.','Your last 10 attempts are kept in this browser.'],
 routineTitle:'A suggested routine',routine:['Read a module and answer its quiz straight away.','Once a track is done, take its track exam. Below 65%, reread the modules behind your wrong answers.','Each study day, warm up with one mixed quiz. Mixing topics makes recall stick better than rereading.','When every track exam is at 75% or more, sit the timed final. Flag doubtful questions and come back to them.','Review every wrong answer on the result page, then take the final again a few days later. The questions are drawn afresh each time.'],
 guideTip:'For ISTQB preparation, also use the official sample exams from ISTQB or your national board. The questions here cover this hub’s topics and are not official ISTQB questions.',
 examLabel:'Exam',noAttempt:'No attempt in progress.',allExams:'All exams',statusAria:'Exam status',submit:'Submit',question:(i,tk)=>`Question ${i} · ${tk}`,flagged:'★ Flagged',flag:'☆ Flag',selectTwo:'Select TWO',
 unanswered:(n,f)=>`${n} question${n===1?'':'s'} unanswered${f?` · ${f} flagged`:''}. Submit anyway? There’s no negative marking.`,keep:'Keep answering',submitNow:'Submit now',checkFlagged:'Check flagged questions before submitting.',submitExam:'Submit exam',
 results:x=>`${x} · results`,passMark:(p,n)=>`${p}% · pass mark ${n}`,timeRanOut:'Time ran out · ',timeUsed:x=>`time used ${x}`,byTrack:'By track',nextStep:'Next step',nextStepText:'Revisit the tracks marked ✕, then take their per-track exam before another final attempt.',
 review:'Review',reviewAria:'Review filter',wrongOrSkipped:n=>`Wrong or skipped (${n})`,allN:n=>`All (${n})`,correctB:'✓ Correct',skippedB:'– Skipped',wrongB:'✕ Wrong',yourAnswer:(a,c)=>`Your answer: ${a} · Correct: ${c}.`,reviewModule:'Review module →',nothingReview:'Nothing to review — every answer was correct.',
};

UI.uk={
 language:'Мова',yourProgress:'Ваш прогрес',searchPh:'Пошук модулів…',resetProgress:'Скинути прогрес',confirmReset:'Натисніть ще раз для підтвердження',progressReset:'Прогрес скинуто',menu:'Меню',skipLink:'Перейти до основного вмісту',timeLow:m=>`Залишилось ${m} хв`,navAria:'Навігація курсом',
 home:'Головна',noMatch:f=>`Жоден модуль не згадує «${f}».`,practice:'Практика',doneAria:'пройдено',doneBadge:'✓ Пройдено',quizBadge:(r,q)=>`~ ${r}/${q} тест`,moduleEyebrow:n=>`МОДУЛЬ ${n}`,min:n=>`${n} хв`,
 heroLabel:'Навчальний хаб для QA-інженерів',heroTitle:'Автоматизуйте правильні перевірки на правильному рівні.',
 heroLede:(n,h)=>`${n} коротких модулів про Playwright, Cypress, Selenium, тестування API, архітектуру фреймворків, CI/CD, нестабільні тести, тестування ШІ та сертифікацію ISTQB — кожен із тестом для самоперевірки, а також практичні іспити. Загалом близько ${h} год.`,
 cont:'Продовжити',start:'Почати',allDone:'Усе пройдено — пройдіть змішаний тест',takeExam:'Скласти іспит',statsAria:'Ваша статистика',statModules:'модулів пройдено',statQuiz:'правильних відповідей',statFw:'пунктів чек-листа відмічено',
 practiceBlurb:'Перевірте, що ви вивчили, і застосуйте це до реального фреймворку.',takeawayLabel:'Головний висновок',
 takeaway:'Зрілий проєкт автоматизації — це інженерна система тестування: тести + архітектура + дані + середовища + браузерна інфраструктура + перевірки + діагностика + звітність + CI/CD + документація + підтримка. Мета — не «автоматизувати все», а автоматизувати правильні перевірки на правильному рівні й зберігати довіру до них.',
 footnote:'Створено на основі «Test Automation for QA» та «AI Testing: A Research Overview for Testers» (дослідження — вересень 2026). Модулі з позначкою «Поза вихідними документами» містять матеріали з офіційних джерел (ISTQB, Playwright, Cypress, Selenium, OWASP, RFC 9110, NIST, ЄС), перевірених 23 вересня 2026. Прогрес зберігається лише в цьому браузері. Переклад виконано з англійської; у разі розбіжностей орієнтуйтеся на англійську версію.',
 prExams:'Іспити',prExamsB:'Практичні іспити за напрямами та фінальний іспит на 40 питань із таймером у стилі ISTQB.',prQuiz:'Змішаний тест',prQuizB:'Десять випадкових питань з усіх модулів, з поясненнями.',
 prFc:'Картки',prFcB:n=>`${n} ключових термінів. Перевертайте, фільтруйте за напрямом, перемішуйте.`,prPick:'Вибір інструмента',prPickB:'Дайте відповідь на п’ять питань і подивіться, як вам підходять Playwright, Cypress і Selenium.',
 prFw:'Огляд фреймворку',prFwB:n=>`Чек-лист QA з ${n} пунктів для фреймворку автоматизації.`,prPath:'Навчальний шлях',prPathB:n=>`${n} кроків від тест-дизайну до тестування ШІ.`,
 prResources:'Шпаргалки',prResourcesB:'Швидкі довідкові таблиці команд і добірка офіційних посилань для Playwright, Cypress і Selenium.',
 prCareer:'Підготовка до кар’єри',prCareerB:'Питання для співбесіди, ідеї для портфоліо та чек-лист навичок відповідно до вакансій.',
 timeLeft:n=>`Залишилося ~${n} хв, щоб завершити всі модулі`,
 correct:'Правильно.',notQuite:'Не зовсім.',moduleLabel:(n,tk)=>`Модуль ${n} · ${tk}`,beyond:'Поза вихідними документами',checkYourself:'Перевірте себе',markedDone:'Ви позначили цей модуль як пройдений.',finishedQ:'Прочитали модуль і пройшли тест?',
 markNotDone:'Позначити як не пройдений',markDone:'Позначити як пройдений',sources:'Джерела',prev:'← НАЗАД',next:'ДАЛІ →',pagerAria:'Навігація модулями',
 mqSum:'Десять випадкових питань з усього хабу. Пояснення з’являються після кожної відповіді.',score:(s,n)=>`Результат: ${s} / ${n}`,pass:'✓ Складено',reviewB:'~ Повторіть',revisitB:'✕ Поверніться до модулів',answered:(d,n)=>`Відповіли: ${d} / ${n}`,newQ:'Новий набір питань',revisit:'Повторіть',
 fcSum:'Натисніть на картку (або пробіл), щоб перевернути. Стрілки — перехід між картками.',filterAria:'Фільтр за напрямом',all:'Усі',fcAria:(term,def)=>`Картка: ${term}. ${def||'Натисніть, щоб побачити визначення.'}`,tapReveal:'Натисніть, щоб відкрити',prevBtn:'← Попередня',nextBtn:'Наступна →',shuffle:'Перемішати',
 fwSum:'Перевірте за цим списком власний фреймворк автоматизації. Кожен невідмічений пункт — ризик, вартий окремої задачі.',pathSum:'Рекомендований порядок вивчення автоматизації QA — від тест-дизайну до тестування ШІ.',completed:'Виконано',tip:'Порада',note:'Примітка',
 fwTip:'Невідмічені пункти ведуть до модулів: ізоляція та очікування → Нестабільні тести; секрети й тенанти → Безпека; документація → Документація фреймворку.',
 pkSum:'П’ять питань про ваш контекст. Результат з’явиться нижче, щойно ви відповісте на всі.',pkResult:'Як вам підходять інструменти',bestFit:'Найкраще підходить',pts:n=>`${n} б.`,meterAria:(a,b)=>`${a} з ${b} балів`,watchOut:'Зверніть увагу:',
 pkNoteLabel:'Як це читати',pkNote:'Це евристика на основі порівняння можливостей із посібника, а не рейтинг інструментів. Перш ніж вирішувати, зробіть дводенний експеримент на своєму реальному застосунку з двома найкращими кандидатами й порівняйте зусилля на підтримку.',clearAnswers:'Очистити відповіді',
 pk:[['Які браузери потрібно покрити?',['Достатньо лише Chromium','Chromium і Firefox','Потрібен також Safari / WebKit','Багато версій браузерів на віддалених машинах']],
  ['Якою мовою ваша команда пише тести?',['JavaScript / TypeScript','Java, C# або Python','Змішано / ще не вирішили']],
  ['Якими будуть більшість ваших тестів?',['E2E-сценарії користувача плюс перевірки API','Тести фронтенд-компонентів разом з E2E','Великий кросплатформний регрес на віддаленій інфраструктурі']],
  ['Яка інфраструктура у вас уже є?',['Поки нічого — починаємо з нуля','Наявний Selenium Grid / набір тестів на WebDriver','Бюджет на хмарну панель із повторенням запусків і аналітикою']],
  ['Як ви віддаєте перевагу налагоджувати збої?',['Трейси та звіти із запусків у CI','Інтерактивно, покроково виконуючи команди в браузері','Власний стек логування та звітності']]],
 tools:{pw:[['Chromium, Firefox і WebKit «з коробки»','Вбудований раннер, фікстури, паралельність','Trace Viewer і HTML-звіт для налагодження в CI','Тести UI + API в одному інструменті'],'Рефакторте код із Codegen; стежте за колізіями даних при паралельному запуску.'],
  cy:[['Сильний процес компонентного тестування','Command Log із «подорожжю в часі» для локального налагодження','Заглушки мережі, шпигуни й керування часом','Необов’язковий Cloud для повторів і керування нестабільними тестами'],'Розрізняйте безкоштовні локальні функції й платний Cloud; перевірте потреби в cross-origin.'],
  se:[['Прив’язки WebDriver для Java, C#, Python, JS…','Grid для віддалених, паралельних, кросплатформних запусків','Зріла екосистема на основі стандартів','Використовує наявну інфраструктуру'],'Фреймворк ви збираєте самі; синхронізація потребує уваги.']},
 finalExam:'Фінальний іспит',trackExam:n=>`Іспит: ${n}`,startExam:x=>`Почати — ${x}`,newExam:x=>`Новий: ${x}`,timedEyebrow:'З ТАЙМЕРОМ · У СТИЛІ ISTQB',untimedEyebrow:'БЕЗ ТАЙМЕРА · ПРАКТИКА',resume:'Продовжити',
 exSum:'Відповіді показуються лише після здачі. Використовуйте іспити за напрямами, щоб знайти слабкі місця, а потім складіть фінальний іспит в умовах, наближених до справжніх.',
 finalHeadP:'Відповідає формату ISTQB CTFL: 40 питань, 60 хвилин, прохідний бал 65%. Питання беруться з усіх напрямів.',finalTile:'40 питань з усіх шести напрямів, із відліком часу. Іспит здається автоматично, коли час спливає.',
 finalMeta:(n,m,p)=>`${n} пит. · ${m} хв · прохід ${p}`,perTrack:'Іспити за напрямами',perTrackP:n=>`${n} випадкових питань з одного напряму, без таймера.`,tileMeta:(n,p)=>`${n} пит. · пул ${p}`,
 attempts:'Ваші спроби',thDate:'Дата',thExam:'Іспит',thScore:'Результат',thResult:'Підсумок',thTime:'Час',failB:'✕ Не складено',noAttempts:'Спроб ще немає. Тут з’являться ваші останні 10 результатів (зберігаються лише в цьому браузері).',
 exNoteLabel:'Чим іспити відрізняються від тестів',exNote:'Тести в модулях показують відповідь одразу, щоб ви вчилися по ходу. Іспити показують результат лише після здачі й зараховують питання «Оберіть ДВА» лише повністю, як в ISTQB.',
 howTitle:'Як влаштовані іспити',howP:'Кожен іспит бере питання з <b>пулу</b> кожного напряму: усі питання тестів модулів цього напряму плюс питання <b>лише для іспиту</b>, яких немає в тестах модулів. Такі питання здебільшого є сценаріями й розрахунками, тож перевіряють, чи вмієте ви <i>застосовувати</i> матеріал, а не лише впізнавати його.',
 guideTh:['Напрям','Модулі','Пит. тестів','Пит. лише іспиту','Пул','K1 / K2 / K3*','Оберіть ДВА','У фіналі'],kNote:'*K-рівні позначені лише для питань іспиту: K1 — запам’ятати, K2 — розуміти, K3 — застосувати. Питання тестів модулів без позначок.',
 qvsE:'Тести й іспити',qvsETh:['','Тест модуля','Змішаний тест','Іспит напряму','Фінальний іспит'],
 qvsERows:(n,f,m,p,need)=>[['Питання','Усі питання модуля','10 випадкових',`${n} випадкових`,`${f}, фіксована квота на напрям`],['Зворотний зв’язок','Одразу після відповіді','Одразу після відповіді','Після здачі','Після здачі'],['Таймер','Ні','Ні','Ні',`${m} хв, автоздача`],['Прохідний бал','—','—',`${p}%`,`${need} / ${f}`],['Найкраще для','Навчання під час читання','Інтервального повторення тем','Пошуку слабких напрямів','Репетиції умов іспиту']],
 scoringTitle:'Правила оцінювання',scoring:['Один бал за питання, штрафів за помилки немає — тож відповідайте на все.','Питання «Оберіть ДВА» зараховуються, лише якщо обидва варіанти правильні, як в іспитах ISTQB.','Сторінка результатів розбиває бал за напрямами й показує кожну помилку з поясненням.','Ваші останні 10 спроб зберігаються в цьому браузері.'],
 routineTitle:'Рекомендований розпорядок',routine:['Прочитайте модуль і одразу пройдіть його тест.','Завершивши напрям, складіть його іспит. Менше 65% — перечитайте модулі, пов’язані з помилками.','Кожного навчального дня розминайтеся одним змішаним тестом. Змішування тем закріплює знання краще за перечитування.','Коли всі іспити напрямів складені на 75% і більше, складіть фінальний іспит із таймером. Позначайте сумнівні питання й повертайтеся до них.','Перегляньте кожну помилку на сторінці результатів і через кілька днів складіть фінал ще раз. Питання щоразу вибираються заново.'],
 guideTip:'Для підготовки до ISTQB також використовуйте офіційні зразки іспитів від ISTQB або вашої національної ради. Питання тут охоплюють теми хабу й не є офіційними питаннями ISTQB.',
 examLabel:'Іспит',noAttempt:'Немає незавершеної спроби.',allExams:'Усі іспити',statusAria:'Стан іспиту',submit:'Здати',question:(i,tk)=>`Питання ${i} · ${tk}`,flagged:'★ Позначено',flag:'☆ Позначити',selectTwo:'Оберіть ДВА',
 unanswered:(n,f)=>`Без відповіді: ${n}${f?` · позначено: ${f}`:''}. Здати все одно? Штрафів за помилки немає.`,keep:'Продовжити відповідати',submitNow:'Здати зараз',checkFlagged:'Перевірте позначені питання перед здачею.',submitExam:'Здати іспит',
 results:x=>`${x} · результати`,passMark:(p,n)=>`${p}% · прохідний бал ${n}`,timeRanOut:'Час вийшов · ',timeUsed:x=>`витрачено ${x}`,byTrack:'За напрямами',nextStep:'Наступний крок',nextStepText:'Поверніться до напрямів, позначених ✕, і складіть їхні іспити перед наступною спробою фіналу.',
 review:'Розбір',reviewAria:'Фільтр розбору',wrongOrSkipped:n=>`Помилки й пропуски (${n})`,allN:n=>`Усі (${n})`,correctB:'✓ Правильно',skippedB:'– Пропущено',wrongB:'✕ Помилка',yourAnswer:(a,c)=>`Ваша відповідь: ${a} · Правильно: ${c}.`,reviewModule:'Повторити модуль →',nothingReview:'Розбирати нічого — усі відповіді правильні.',
};

UI.pl={
 language:'Język',yourProgress:'Twój postęp',searchPh:'Szukaj modułów…',resetProgress:'Zresetuj postęp',confirmReset:'Kliknij ponownie, aby potwierdzić',progressReset:'Postęp zresetowany',menu:'Menu',skipLink:'Przejdź do głównej treści',timeLow:m=>`Zostało ${m} min`,navAria:'Nawigacja kursu',
 home:'Start',noMatch:f=>`Żaden moduł nie wspomina „${f}”.`,practice:'Praktyka',doneAria:'ukończono',doneBadge:'✓ Ukończono',quizBadge:(r,q)=>`~ ${r}/${q} quiz`,moduleEyebrow:n=>`MODUŁ ${n}`,min:n=>`${n} min`,
 heroLabel:'Centrum nauki dla inżynierów QA',heroTitle:'Automatyzuj właściwe sprawdzenia na właściwym poziomie.',
 heroLede:(n,h)=>`${n} krótkich modułów o Playwright, Cypress, Selenium, testowaniu API, projektowaniu frameworków, CI/CD, niestabilnych testach, testowaniu AI i certyfikacji ISTQB — każdy z quizem kontrolnym, do tego egzaminy próbne. Łącznie około ${h} godz.`,
 cont:'Kontynuuj',start:'Zacznij',allDone:'Wszystko ukończone — rozwiąż quiz mieszany',takeExam:'Podejdź do egzaminu',statsAria:'Twoje statystyki',statModules:'ukończonych modułów',statQuiz:'poprawnych odpowiedzi',statFw:'zaznaczonych punktów listy',
 practiceBlurb:'Sprawdź, czego się nauczyłeś, i zastosuj to w prawdziwym frameworku.',takeawayLabel:'Najważniejszy wniosek',
 takeaway:'Dojrzały projekt automatyzacji to zaprojektowany system testowy: testy + architektura + dane + środowiska + infrastruktura przeglądarek + asercje + diagnostyka + raportowanie + CI/CD + dokumentacja + utrzymanie. Celem nie jest „zautomatyzować wszystko”, lecz automatyzować właściwe sprawdzenia na właściwym poziomie i utrzymać do nich zaufanie.',
 footnote:'Na podstawie „Test Automation for QA” i „AI Testing: A Research Overview for Testers” (badania: wrzesień 2026). Moduły oznaczone „Poza dokumentami źródłowymi” dodają materiał z oficjalnych źródeł (ISTQB, Playwright, Cypress, Selenium, OWASP, RFC 9110, NIST, UE) sprawdzonych 23 września 2026. Postęp jest zapisywany tylko w tej przeglądarce. Tłumaczenie z języka angielskiego; w razie wątpliwości rozstrzyga wersja angielska.',
 prExams:'Egzaminy',prExamsB:'Egzaminy próbne dla każdej ścieżki i finałowy egzamin z 40 pytaniami na czas, w stylu ISTQB.',prQuiz:'Quiz mieszany',prQuizB:'Dziesięć losowych pytań ze wszystkich modułów, z wyjaśnieniami.',
 prFc:'Fiszki',prFcB:n=>`${n} kluczowych pojęć. Odwracaj, filtruj według ścieżki, tasuj.`,prPick:'Wybór narzędzia',prPickB:'Odpowiedz na pięć pytań i zobacz, jak pasują Playwright, Cypress i Selenium.',
 prFw:'Przegląd frameworku',prFwB:n=>`${n}-punktowa lista kontrolna QA dla frameworku automatyzacji.`,prPath:'Ścieżka nauki',prPathB:n=>`${n} kroków od projektowania testów do testowania AI.`,
 prResources:'Ściągawki',prResourcesB:'Szybkie tabele poleceń i wyselekcjonowane oficjalne linki dla Playwright, Cypress i Selenium.',
 prCareer:'Przygotowanie do kariery',prCareerB:'Pytania rekrutacyjne, pomysły na portfolio i lista umiejętności dopasowana do ogłoszeń o pracę.',
 timeLeft:n=>`Zostało ~${n} min do ukończenia wszystkich modułów`,
 correct:'Dobrze.',notQuite:'Nie do końca.',moduleLabel:(n,tk)=>`Moduł ${n} · ${tk}`,beyond:'Poza dokumentami źródłowymi',checkYourself:'Sprawdź się',markedDone:'Oznaczyłeś ten moduł jako ukończony.',finishedQ:'Przeczytane i quiz rozwiązany?',
 markNotDone:'Oznacz jako nieukończony',markDone:'Oznacz jako ukończony',sources:'Źródła',prev:'← POPRZEDNI',next:'NASTĘPNY →',pagerAria:'Nawigacja modułów',
 mqSum:'Dziesięć losowych pytań z całego kursu. Wyjaśnienia pojawiają się po każdej odpowiedzi.',score:(s,n)=>`Wynik: ${s} / ${n}`,pass:'✓ Zaliczone',reviewB:'~ Do powtórki',revisitB:'✕ Wróć do modułów',answered:(d,n)=>`Odpowiedziano: ${d} / ${n}`,newQ:'Nowy zestaw pytań',revisit:'Do powtórki',
 fcSum:'Stuknij fiszkę (lub naciśnij spację), aby ją odwrócić. Strzałki przełączają fiszki.',filterAria:'Filtruj według ścieżki',all:'Wszystkie',fcAria:(term,def)=>`Fiszka: ${term}. ${def||'Naciśnij, aby zobaczyć definicję.'}`,tapReveal:'Stuknij, aby odsłonić',prevBtn:'← Poprzednia',nextBtn:'Następna →',shuffle:'Tasuj',
 fwSum:'Sprawdź według tej listy własny framework automatyzacji. Każdy niezaznaczony punkt to ryzyko warte zgłoszenia.',pathSum:'Zalecana kolejność nauki automatyzacji QA — od projektowania testów do testowania AI.',completed:'Ukończono',tip:'Wskazówka',note:'Uwaga',
 fwTip:'Niezaznaczone punkty prowadzą do modułów: izolacja i oczekiwanie → Niestabilne testy; sekrety i tenanci → Bezpieczeństwo; dokumentacja → Dokumentacja frameworku.',
 pkSum:'Pięć pytań o Twój kontekst. Wynik pojawi się poniżej, gdy odpowiesz na wszystkie.',pkResult:'Jak narzędzia pasują do Ciebie',bestFit:'Najlepsze dopasowanie',pts:n=>`${n} pkt`,meterAria:(a,b)=>`${a} z ${b} punktów`,watchOut:'Uwaga:',
 pkNoteLabel:'Jak to czytać',pkNote:'To heurystyka oparta na porównaniu możliwości z przewodnika, a nie ranking narzędzi. Zanim się zdecydujesz, zrób dwudniowy eksperyment na prawdziwej aplikacji z dwoma najlepszymi kandydatami i porównaj nakład na utrzymanie.',clearAnswers:'Wyczyść odpowiedzi',
 pk:[['Które przeglądarki musisz pokryć?',['Wystarczy sam Chromium','Chromium i Firefox','Wymagane jest też Safari / WebKit','Wiele wersji przeglądarek na zdalnych maszynach']],
  ['W jakim języku Twój zespół pisze testy?',['JavaScript / TypeScript','Java, C# lub Python','Różnie / jeszcze nie zdecydowano']],
  ['Jakie będą w większości Twoje testy?',['Ścieżki użytkownika E2E plus sprawdzenia API','Testy komponentów front-endu obok E2E','Duża wieloplatformowa regresja na zdalnej infrastrukturze']],
  ['Jaką infrastrukturę już masz?',['Jeszcze nic — czysty start','Istniejący Selenium Grid / zestaw testów WebDriver','Budżet na hostowany panel z odtwarzaniem i analityką']],
  ['Jak wolisz debugować błędy?',['Ślady i raporty z przebiegów CI','Interaktywnie, krok po kroku w przeglądarce','Własny system logowania i raportowania']]],
 tools:{pw:[['Chromium, Firefox i WebKit w zestawie','Zintegrowany runner, fixtures, równoległość','Trace Viewer i raport HTML do debugowania w CI','Testy UI + API w jednym narzędziu'],'Refaktoryzuj kod z Codegen; uważaj na kolizje danych przy równoległym uruchamianiu.'],
  cy:[['Mocny proces testowania komponentów','Command Log z „podróżą w czasie” do lokalnego debugowania','Stubowanie sieci, szpiedzy i zegary','Opcjonalny Cloud do odtwarzania i zarządzania niestabilnymi testami'],'Oddziel darmowe funkcje lokalne od płatnego Cloud; sprawdź potrzeby cross-origin.'],
  se:[['Wiązania WebDriver dla Java, C#, Python, JS…','Grid do zdalnych, równoległych, wieloplatformowych przebiegów','Dojrzały ekosystem oparty na standardach','Wykorzystuje istniejącą infrastrukturę'],'Framework składasz sam; synchronizacja wymaga uwagi.']},
 finalExam:'Egzamin końcowy',trackExam:n=>`Egzamin: ${n}`,startExam:x=>`Rozpocznij — ${x}`,newExam:x=>`Nowy: ${x}`,timedEyebrow:'NA CZAS · W STYLU ISTQB',untimedEyebrow:'BEZ LIMITU · PRAKTYKA',resume:'Wznów',
 exSum:'Odpowiedzi są pokazywane dopiero po oddaniu. Użyj egzaminów ze ścieżek, by znaleźć słabe punkty, a potem podejdź do egzaminu końcowego w warunkach egzaminacyjnych.',
 finalHeadP:'Odwzorowuje format ISTQB CTFL: 40 pytań, 60 minut, 65% do zaliczenia. Pytania pochodzą ze wszystkich ścieżek.',finalTile:'40 pytań ze wszystkich sześciu ścieżek, z odliczaniem czasu. Egzamin oddaje się automatycznie po upływie czasu.',
 finalMeta:(n,m,p)=>`${n} pyt. · ${m} min · próg ${p}`,perTrack:'Egzaminy ze ścieżek',perTrackP:n=>`${n} losowych pytań z jednej ścieżki, bez limitu czasu.`,tileMeta:(n,p)=>`${n} pyt. · pula ${p}`,
 attempts:'Twoje podejścia',thDate:'Data',thExam:'Egzamin',thScore:'Wynik',thResult:'Rezultat',thTime:'Czas',failB:'✕ Niezaliczone',noAttempts:'Brak podejść. Tutaj pojawi się 10 ostatnich wyników (zapisanych tylko w tej przeglądarce).',
 exNoteLabel:'Czym egzaminy różnią się od quizów',exNote:'Quizy w modułach pokazują odpowiedź od razu, więc uczysz się na bieżąco. Egzaminy pokazują wynik dopiero po oddaniu, a pytania „Wybierz DWIE” liczą się tylko w całości, jak w ISTQB.',
 howTitle:'Jak działają egzaminy',howP:'Każdy egzamin losuje z <b>puli</b> każdej ścieżki: wszystkich pytań z quizów jej modułów oraz pytań <b>tylko egzaminacyjnych</b>, których nie ma w quizach. Te ostatnie to głównie scenariusze i obliczenia, więc sprawdzają, czy umiesz <i>zastosować</i> materiał, a nie tylko go rozpoznać.',
 guideTh:['Ścieżka','Moduły','Pyt. quizów','Pyt. egzaminacyjne','Pula','K1 / K2 / K3*','Wybierz DWIE','W finale'],kNote:'*Poziomy K są oznaczone tylko przy pytaniach egzaminacyjnych: K1 zapamiętanie, K2 zrozumienie, K3 zastosowanie. Pytania z quizów nie mają oznaczeń.',
 qvsE:'Quizy a egzaminy',qvsETh:['','Quiz modułu','Quiz mieszany','Egzamin ścieżki','Egzamin końcowy'],
 qvsERows:(n,f,m,p,need)=>[['Pytania','Wszystkie z modułu','10 losowych',`${n} losowych`,`${f}, stały przydział na ścieżkę`],['Informacja zwrotna','Zaraz po odpowiedzi','Zaraz po odpowiedzi','Po oddaniu','Po oddaniu'],['Limit czasu','Nie','Nie','Nie',`${m} min, automatyczne oddanie`],['Próg zaliczenia','—','—',`${p}%`,`${need} / ${f}`],['Najlepszy do','Nauki podczas czytania','Powtórek rozłożonych w czasie','Szukania słabych ścieżek','Próby w warunkach egzaminu']],
 scoringTitle:'Zasady punktacji',scoring:['Jeden punkt za pytanie i brak punktów ujemnych, więc odpowiadaj na wszystko.','Pytania „Wybierz DWIE” są zaliczane tylko wtedy, gdy oba wybory są poprawne, jak na egzaminach ISTQB.','Strona wyników dzieli wynik na ścieżki i pokazuje każdą błędną odpowiedź z wyjaśnieniem.','10 ostatnich podejść jest przechowywanych w tej przeglądarce.'],
 routineTitle:'Proponowany plan',routine:['Przeczytaj moduł i od razu rozwiąż jego quiz.','Po ukończeniu ścieżki podejdź do jej egzaminu. Poniżej 65% — przeczytaj ponownie moduły, w których popełniłeś błędy.','Każdego dnia nauki zacznij od jednego quizu mieszanego. Mieszanie tematów utrwala wiedzę lepiej niż ponowne czytanie.','Gdy każdy egzamin ścieżki masz na 75% lub więcej, podejdź do egzaminu końcowego na czas. Oznaczaj wątpliwe pytania i wracaj do nich.','Przejrzyj każdą błędną odpowiedź na stronie wyników i po kilku dniach podejdź do egzaminu końcowego ponownie. Pytania są za każdym razem losowane od nowa.'],
 guideTip:'Przygotowując się do ISTQB, korzystaj też z oficjalnych egzaminów przykładowych ISTQB lub krajowej rady (w Polsce SJSI). Pytania tutaj dotyczą tematów tego kursu i nie są oficjalnymi pytaniami ISTQB.',
 examLabel:'Egzamin',noAttempt:'Brak rozpoczętego podejścia.',allExams:'Wszystkie egzaminy',statusAria:'Stan egzaminu',submit:'Oddaj',question:(i,tk)=>`Pytanie ${i} · ${tk}`,flagged:'★ Oznaczone',flag:'☆ Oznacz',selectTwo:'Wybierz DWIE',
 unanswered:(n,f)=>`Bez odpowiedzi: ${n}${f?` · oznaczonych: ${f}`:''}. Oddać mimo to? Nie ma punktów ujemnych.`,keep:'Odpowiadaj dalej',submitNow:'Oddaj teraz',checkFlagged:'Przed oddaniem sprawdź oznaczone pytania.',submitExam:'Oddaj egzamin',
 results:x=>`${x} · wyniki`,passMark:(p,n)=>`${p}% · próg ${n}`,timeRanOut:'Czas minął · ',timeUsed:x=>`wykorzystany czas ${x}`,byTrack:'Według ścieżek',nextStep:'Następny krok',nextStepText:'Wróć do ścieżek oznaczonych ✕ i podejdź do ich egzaminów przed kolejną próbą egzaminu końcowego.',
 review:'Przegląd',reviewAria:'Filtr przeglądu',wrongOrSkipped:n=>`Błędne lub pominięte (${n})`,allN:n=>`Wszystkie (${n})`,correctB:'✓ Dobrze',skippedB:'– Pominięte',wrongB:'✕ Źle',yourAnswer:(a,c)=>`Twoja odpowiedź: ${a} · Poprawna: ${c}.`,reviewModule:'Powtórz moduł →',nothingReview:'Nie ma czego przeglądać — wszystkie odpowiedzi są poprawne.',
};

UI.es={
 language:'Idioma',yourProgress:'Tu progreso',searchPh:'Buscar módulos…',resetProgress:'Reiniciar progreso',confirmReset:'Haz clic de nuevo para confirmar',progressReset:'Progreso reiniciado',menu:'Menú',skipLink:'Saltar al contenido principal',timeLow:m=>`Quedan ${m} min`,navAria:'Navegación del curso',
 home:'Inicio',noMatch:f=>`Ningún módulo menciona «${f}».`,practice:'Práctica',doneAria:'completado',doneBadge:'✓ Completado',quizBadge:(r,q)=>`~ ${r}/${q} quiz`,moduleEyebrow:n=>`MÓDULO ${n}`,min:n=>`${n} min`,
 heroLabel:'Un centro de estudio para ingenieros de QA',heroTitle:'Automatiza las comprobaciones correctas, en el nivel correcto.',
 heroLede:(n,h)=>`${n} módulos breves sobre Playwright, Cypress, Selenium, pruebas de API, diseño de frameworks, CI/CD, pruebas inestables, pruebas de IA y certificación ISTQB — cada uno con un quiz de autoevaluación, además de exámenes de práctica. Unas ${h} horas en total.`,
 cont:'Continuar',start:'Empezar',allDone:'Todo completado — haz el quiz mixto',takeExam:'Hacer un examen',statsAria:'Tus estadísticas',statModules:'módulos completados',statQuiz:'respuestas correctas',statFw:'puntos de la lista marcados',
 practiceBlurb:'Pon a prueba lo aprendido y aplícalo a un framework real.',takeawayLabel:'Conclusión final',
 takeaway:'Un proyecto de automatización maduro es un sistema de pruebas diseñado con ingeniería: pruebas + arquitectura + datos + entornos + infraestructura de navegadores + aserciones + diagnóstico + informes + CI/CD + documentación + mantenimiento. El objetivo no es «automatizarlo todo», sino automatizar las comprobaciones correctas en el nivel correcto y mantenerlas fiables.',
 footnote:'Basado en «Test Automation for QA» y «AI Testing: A Research Overview for Testers» (investigado en septiembre de 2026). Los módulos marcados «Más allá de los documentos fuente» añaden material de fuentes oficiales (ISTQB, Playwright, Cypress, Selenium, OWASP, RFC 9110, NIST, UE) verificadas el 23 de septiembre de 2026. El progreso se guarda solo en este navegador. Traducido del inglés; en caso de duda, prevalece la versión inglesa.',
 prExams:'Exámenes',prExamsB:'Exámenes de práctica por área y un examen final cronometrado de 40 preguntas al estilo ISTQB.',prQuiz:'Quiz mixto',prQuizB:'Diez preguntas aleatorias de todos los módulos, con explicaciones.',
 prFc:'Tarjetas',prFcB:n=>`${n} términos clave. Gira, filtra por área, baraja.`,prPick:'Selector de herramientas',prPickB:'Responde cinco preguntas y mira cómo encajan Playwright, Cypress y Selenium.',
 prFw:'Revisión del framework',prFwB:n=>`La lista de control de QA de ${n} puntos para un framework de automatización.`,prPath:'Ruta de estudio',prPathB:n=>`${n} pasos desde el diseño de pruebas hasta las pruebas de IA.`,
 prResources:'Chuletas',prResourcesB:'Tablas de referencia rápida de comandos y enlaces oficiales seleccionados para Playwright, Cypress y Selenium.',
 prCareer:'Preparación profesional',prCareerB:'Preguntas de entrevista, ideas de portafolio y una lista de habilidades frente a ofertas de empleo.',
 timeLeft:n=>`Quedan ~${n} min para terminar todos los módulos`,
 correct:'Correcto.',notQuite:'No exactamente.',moduleLabel:(n,tk)=>`Módulo ${n} · ${tk}`,beyond:'Más allá de los documentos fuente',checkYourself:'Comprueba lo aprendido',markedDone:'Has marcado este módulo como completado.',finishedQ:'¿Terminaste la lectura y el quiz?',
 markNotDone:'Marcar como no completado',markDone:'Marcar como completado',sources:'Fuentes',prev:'← ANTERIOR',next:'SIGUIENTE →',pagerAria:'Navegación de módulos',
 mqSum:'Diez preguntas aleatorias de todo el curso. Las explicaciones aparecen tras cada respuesta.',score:(s,n)=>`Puntuación: ${s} / ${n}`,pass:'✓ Aprobado',reviewB:'~ Repasar',revisitB:'✕ Vuelve a los módulos',answered:(d,n)=>`${d} / ${n} respondidas`,newQ:'Nuevo conjunto de preguntas',revisit:'Repasa',
 fcSum:'Toca la tarjeta (o pulsa Espacio) para girarla. Las flechas cambian de tarjeta.',filterAria:'Filtrar por área',all:'Todas',fcAria:(term,def)=>`Tarjeta: ${term}. ${def||'Pulsa para ver la definición.'}`,tapReveal:'Toca para ver',prevBtn:'← Anterior',nextBtn:'Siguiente →',shuffle:'Barajar',
 fwSum:'Aplícala a tu propio framework de automatización. Cada punto sin marcar es un riesgo que merece una tarea.',pathSum:'Un orden recomendado para aprender automatización de QA, del diseño de pruebas a las pruebas de IA.',completed:'Completado',tip:'Consejo',note:'Nota',
 fwTip:'Los puntos sin marcar remiten a módulos: aislamiento y esperas → Pruebas inestables; secretos e inquilinos → Seguridad; documentación → Documentación del framework.',
 pkSum:'Cinco preguntas sobre tu contexto. El resultado aparece abajo cuando las respondas todas.',pkResult:'Cómo encajan las herramientas contigo',bestFit:'Mejor opción',pts:n=>`${n} pts`,meterAria:(a,b)=>`${a} de ${b} puntos`,watchOut:'Cuidado:',
 pkNoteLabel:'Cómo leer esto',pkNote:'Es una heurística basada en la comparación de capacidades de la guía, no una clasificación de las herramientas. Antes de decidir, haz una prueba de dos días en tu aplicación real con los dos mejores candidatos y compara el esfuerzo de mantenimiento.',clearAnswers:'Borrar respuestas',
 pk:[['¿Qué navegadores debes cubrir?',['Basta con Chromium','Chromium y Firefox','También se requiere Safari / WebKit','Muchas versiones de navegador en máquinas remotas']],
  ['¿En qué lenguaje escribe pruebas tu equipo?',['JavaScript / TypeScript','Java, C# o Python','Mixto / sin decidir']],
  ['¿Cómo serán la mayoría de tus pruebas?',['Recorridos de usuario E2E más comprobaciones de API','Pruebas de componentes front-end junto a E2E','Gran regresión multiplataforma en infraestructura remota']],
  ['¿Qué infraestructura tienes ya?',['Nada aún — un comienzo limpio','Un Selenium Grid / suite WebDriver existente','Presupuesto para un panel alojado con repetición y analítica']],
  ['¿Cómo prefieres depurar los fallos?',['Trazas e informes de las ejecuciones de CI','De forma interactiva, paso a paso en el navegador','Nuestro propio sistema de logs e informes']]],
 tools:{pw:[['Chromium, Firefox y WebKit incluidos','Runner integrado, fixtures, paralelismo','Trace Viewer e informe HTML para depurar en CI','Pruebas de UI + API en una sola herramienta'],'Refactoriza el código de Codegen; vigila las colisiones de datos en paralelo.'],
  cy:[['Flujo sólido de pruebas de componentes','Command Log con «viaje en el tiempo» para depurar en local','Stubs de red, espías y relojes','Cloud opcional para repetición y gestión de pruebas inestables'],'Separa las funciones locales gratuitas del Cloud de pago; revisa las necesidades cross-origin.'],
  se:[['Bindings de WebDriver para Java, C#, Python, JS…','Grid para ejecuciones remotas, paralelas y multiplataforma','Ecosistema maduro basado en estándares','Reutiliza la infraestructura existente'],'El framework lo montas tú; la sincronización requiere cuidado.']},
 finalExam:'Examen final',trackExam:n=>`Examen: ${n}`,startExam:x=>`Empezar — ${x}`,newExam:x=>`Nuevo: ${x}`,timedEyebrow:'CRONOMETRADO · ESTILO ISTQB',untimedEyebrow:'SIN TIEMPO · PRÁCTICA',resume:'Reanudar',
 exSum:'Las respuestas se muestran solo al entregar. Usa los exámenes por área para encontrar puntos débiles y luego haz el final cronometrado en condiciones de examen.',
 finalHeadP:'Reproduce el formato ISTQB CTFL: 40 preguntas, 60 minutos, 65% para aprobar. Las preguntas salen de todas las áreas.',finalTile:'40 preguntas de las seis áreas, con cuenta atrás. Se entrega automáticamente al acabarse el tiempo.',
 finalMeta:(n,m,p)=>`${n} P · ${m} min · aprobado ${p}`,perTrack:'Exámenes por área',perTrackP:n=>`${n} preguntas aleatorias de un área, sin tiempo.`,tileMeta:(n,p)=>`${n} P · banco ${p}`,
 attempts:'Tus intentos',thDate:'Fecha',thExam:'Examen',thScore:'Puntuación',thResult:'Resultado',thTime:'Tiempo',failB:'✕ Suspenso',noAttempts:'Aún no hay intentos. Aquí aparecerán tus últimos 10 resultados (guardados solo en este navegador).',
 exNoteLabel:'En qué se diferencian exámenes y quizzes',exNote:'Los quizzes de los módulos muestran la respuesta al momento para que aprendas sobre la marcha. Los exámenes esperan a la entrega y puntúan las preguntas «Elige DOS» a todo o nada, como ISTQB.',
 howTitle:'Cómo funcionan los exámenes',howP:'Cada examen sale de un <b>banco</b> por área: todas las preguntas de los quizzes de sus módulos más preguntas <b>solo de examen</b> que nunca aparecen en los quizzes. Estas se centran en escenarios y cálculos, así que comprueban si sabes <i>aplicar</i> el material, no solo reconocerlo.',
 guideTh:['Área','Módulos','P. de quiz','P. solo examen','Banco','K1 / K2 / K3*','Elige DOS','En el final'],kNote:'*Los niveles K se indican en las preguntas solo de examen: K1 recordar, K2 comprender, K3 aplicar. Las preguntas de los quizzes no llevan nivel.',
 qvsE:'Quizzes frente a exámenes',qvsETh:['','Quiz del módulo','Quiz mixto','Examen de área','Examen final'],
 qvsERows:(n,f,m,p,need)=>[['Preguntas','Todas las del módulo','10 aleatorias',`${n} aleatorias`,`${f}, cupo fijo por área`],['Retroalimentación','Tras cada respuesta','Tras cada respuesta','Al entregar','Al entregar'],['Tiempo','No','No','No',`${m} min, entrega automática`],['Nota de aprobado','—','—',`${p}%`,`${need} / ${f}`],['Ideal para','Aprender mientras lees','Repaso espaciado de temas','Encontrar áreas débiles','Ensayar condiciones de examen']],
 scoringTitle:'Reglas de puntuación',scoring:['Un punto por pregunta y sin penalización, así que responde todo.','Las preguntas «Elige DOS» puntúan solo si ambas opciones son correctas, como en los exámenes ISTQB.','La página de resultados desglosa la nota por área y muestra cada respuesta incorrecta con su explicación.','Tus últimos 10 intentos se guardan en este navegador.'],
 routineTitle:'Una rutina sugerida',routine:['Lee un módulo y haz su quiz enseguida.','Al terminar un área, haz su examen. Por debajo del 65%, relee los módulos de tus errores.','Cada día de estudio, calienta con un quiz mixto. Mezclar temas fija el recuerdo mejor que releer.','Cuando todos los exámenes de área estén en 75% o más, haz el final cronometrado. Marca las preguntas dudosas y vuelve a ellas.','Revisa cada error en la página de resultados y repite el final unos días después. Las preguntas se sortean de nuevo cada vez.'],
 guideTip:'Para preparar ISTQB, usa también los exámenes de muestra oficiales de ISTQB o de tu comité nacional. Estas preguntas cubren los temas de este curso y no son preguntas oficiales de ISTQB.',
 examLabel:'Examen',noAttempt:'No hay ningún intento en curso.',allExams:'Todos los exámenes',statusAria:'Estado del examen',submit:'Entregar',question:(i,tk)=>`Pregunta ${i} · ${tk}`,flagged:'★ Marcada',flag:'☆ Marcar',selectTwo:'Elige DOS',
 unanswered:(n,f)=>`${n} pregunta${n===1?'':'s'} sin responder${f?` · ${f} marcada${f===1?'':'s'}`:''}. ¿Entregar de todos modos? No hay penalización.`,keep:'Seguir respondiendo',submitNow:'Entregar ahora',checkFlagged:'Revisa las preguntas marcadas antes de entregar.',submitExam:'Entregar examen',
 results:x=>`${x} · resultados`,passMark:(p,n)=>`${p}% · aprobado con ${n}`,timeRanOut:'Se acabó el tiempo · ',timeUsed:x=>`tiempo usado ${x}`,byTrack:'Por área',nextStep:'Siguiente paso',nextStepText:'Repasa las áreas marcadas con ✕ y haz su examen de área antes de otro intento del final.',
 review:'Revisión',reviewAria:'Filtro de revisión',wrongOrSkipped:n=>`Incorrectas u omitidas (${n})`,allN:n=>`Todas (${n})`,correctB:'✓ Correcta',skippedB:'– Omitida',wrongB:'✕ Incorrecta',yourAnswer:(a,c)=>`Tu respuesta: ${a} · Correcta: ${c}.`,reviewModule:'Repasar módulo →',nothingReview:'Nada que revisar: todas las respuestas son correctas.',
};
