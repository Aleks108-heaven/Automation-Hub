(function(){
applyTR();
const KEY='automation-hub.v1';
let st={done:{},ans:{},fw:{},path:{},pk:{},hist:[]};
try{const r=localStorage.getItem(KEY);if(r)st=clean(JSON.parse(r));}catch(e){}
/* saved data is untrusted: keep only well-formed values, so tampered or stale storage can't inject markup or crash a page */
function clean(d){
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const pick=(v,ok)=>Object.fromEntries(Object.entries(obj(v)).filter(([,x])=>ok(x)));
  const int=x=>Number.isInteger(x)&&x>=0&&x<100;
  const num=x=>typeof x==='number'&&isFinite(x)&&x>=0;
  const kinds=['final',...TRACKS.map(t=>t.id)];
  return {
    done:pick(d.done,x=>typeof x==='boolean'),fw:pick(d.fw,x=>typeof x==='boolean'),path:pick(d.path,x=>typeof x==='boolean'),
    ans:pick(d.ans,x=>int(x)||(Array.isArray(x)&&x.every(int))),pk:pick(d.pk,int),
    hist:(Array.isArray(d.hist)?d.hist:[]).filter(h=>h&&kinds.includes(h.kind)&&num(h.score)&&num(h.total)&&h.total>0&&num(h.secs)&&num(h.at)&&typeof h.pass==='boolean').slice(-10),
  };
}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const main=$('#main'),app=$('#app');
/* polite live-region announcement; clearing first makes repeated messages speak again */
const say=m=>{const l=$('#live');if(!l)return;l.textContent='';setTimeout(()=>{l.textContent=m;},50);};
const trackName=id=>TRACKS.find(t=>t.id===id).name;
const idx=id=>MODULES.findIndex(m=>m.id===id);
const num=i=>String(i+1).padStart(2,'0');
const practice=()=>[
 {id:'exams',title:t('prExams'),body:t('prExamsB')},
 {id:'quiz',title:t('prQuiz'),body:t('prQuizB')},
 {id:'flashcards',title:t('prFc'),body:t('prFcB',GLOSSARY.length)},
 {id:'picker',title:t('prPick'),body:t('prPickB')},
 {id:'checklist',title:t('prFw'),body:t('prFwB',FRAMEWORK_CHECKS.length)},
 {id:'path',title:t('prPath'),body:t('prPathB',STUDY_PATH.length)},
 {id:'resources',title:t('prResources'),body:t('prResourcesB')},
 {id:'career',title:t('prCareer'),body:t('prCareerB')},
];
/* static shell text and the language picker; rebuilt whenever the language changes */
function applyShell(){
 const set=(sel,f)=>{const e=document.querySelector(sel);if(e)f(e);};
 document.documentElement.lang=LANG;
 set('#side',e=>e.setAttribute('aria-label',t('navAria')));
 set('.side__progress .label',e=>e.textContent=t('yourProgress'));
 set('#search',e=>{e.placeholder=t('searchPh');e.setAttribute('aria-label',t('searchPh'));});
 set('#resetBtn',e=>e.textContent=t('resetProgress'));
 set('#menuBtn',e=>e.textContent=t('menu'));
 set('#skip',e=>e.textContent=t('skipLink'));
 set('.side__foot',e=>{const old=e.querySelector('.lang');if(old)old.remove();
  const l=document.createElement('label');l.className='lang';
  l.innerHTML=`<span class="label">${t('language')}</span><select id="langSel">${LANGS.map(([c,n])=>`<option value="${c}" lang="${c}" ${c===LANG?'selected':''}>${n}</option>`).join('')}</select>`;
  e.prepend(l);
  l.querySelector('select').onchange=ev=>setLang(ev.target.value);});
}
function setLang(v){
 if(!LANGS.some(x=>x[0]===v)||v===LANG)return;
 LANG=v;try{localStorage.setItem(LANG_KEY,v);}catch(err){}
 applyTR();applyShell();renderToc($('#search').value);render();$('#langSel').focus();
}
applyShell();

/* ---------- sidebar ---------- */
function renderToc(filter=''){
  const f=filter.trim().toLowerCase();
  const match=m=>!f||(m.title+' '+m.sum+' '+m.sections.map(s=>s.h+' '+s.body.replace(/<[^>]+>/g,' ')).join(' ')).toLowerCase().includes(f);
  let h=`<div class="toc__group"><a href="#home" data-r="home"><span class="n">··</span><span class="t">${t('home')}</span></a></div>`;
  let any=false;
  TRACKS.forEach(tk=>{
    const ms=MODULES.map((m,i)=>[m,i]).filter(([m])=>m.track===tk.id&&match(m));
    if(!ms.length)return;any=true;
    h+=`<div class="toc__group"><span class="label">${esc(tk.name)}</span>${ms.map(([m,i])=>`<a href="#${m.id}" data-r="${m.id}"><span class="n">${num(i)}</span><span class="t">${esc(m.title)}</span>${st.done[m.id]?`<span class="d" aria-label="${t('doneAria')}">✓</span>`:''}</a>`).join('')}</div>`;
  });
  if(f&&!any)h+='<p class="empty empty--pad">'+esc(t('noMatch',filter))+'</p>';
  if(!f)h+=`<div class="toc__group"><span class="label">${t('practice')}</span>${practice().map(p=>`<a href="#${p.id}" data-r="${p.id}"><span class="n">→</span><span class="t">${p.title}</span></a>`).join('')}</div>`;
  $('#toc').innerHTML=h;markCurrent();
}
function markCurrent(){const r=route();document.querySelectorAll('#toc a').forEach(a=>{a.dataset.r===r?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});}
function progress(){
  const d=MODULES.filter(m=>st.done[m.id]).length,p=Math.round(d/MODULES.length*100)+'%';
  $('#progTxt').textContent=`${d} / ${MODULES.length}`;$('#progBar').style.width=p;$('#progBar2').style.width=p;return d;
}

/* ---------- views ---------- */
function card(m,i){
  const done=st.done[m.id],qs=m.quiz.length,right=m.quiz.filter((q,k)=>st.ans[m.id+':'+k]===q.a).length;
  const status=done?`<span class="badge badge--pass">${t('doneBadge')}</span>`:(Object.keys(st.ans).some(k=>k.startsWith(m.id+':'))?`<span class="badge badge--flaky">${t('quizBadge',right,qs)}</span>`:'');
  return `<a class="card" href="#${m.id}"><span class="card__eyebrow">${t('moduleEyebrow',num(i))}</span><h3 class="card__title">${esc(m.title)}</h3><p class="card__body">${esc(m.sum)}</p><div class="card__foot"><span class="badge">${t('min',m.min)}</span>${status}</div></a>`;
}
function home(){
  const d=progress(),next=MODULES.find(m=>!st.done[m.id]);
  const answered=Object.keys(st.ans).length,correct=Object.entries(st.ans).filter(([k,v])=>{const[id,q]=k.split(':');const m=MODULES.find(x=>x.id===id);return m&&m.quiz[+q]&&m.quiz[+q].a===v}).length;
  const mins=MODULES.reduce((a,m)=>a+m.min,0);
  const remain=MODULES.filter(m=>!st.done[m.id]).reduce((a,m)=>a+m.min,0);
  main.innerHTML=`<div class="wrap">
  <section class="hero">
    <div><span class="label">${t('heroLabel')}</span>
      <h1>${t('heroTitle')}</h1>
      <p class="lede">${t('heroLede',MODULES.length,(Math.round(mins/60*10)/10).toLocaleString(LANG))}</p>
      <div class="actions">${next?`<a class="btn btn--primary" href="#${next.id}">${d?t('cont'):t('start')}: ${esc(next.title)}</a>`:`<a class="btn btn--primary" href="#quiz">${t('allDone')}</a>`}<a class="btn btn--secondary" href="#exams">${t('takeExam')}</a></div>
      ${remain?`<p class="empty empty--sm mono tnum">${t('timeLeft',remain)}</p>`:''}
    </div>
    <div class="runlog" aria-hidden="true">
      <div class="row mu">$ npx playwright test</div>
      ${MODULES.slice(0,9).map(m=>`<div class="row"><span class="${st.done[m.id]?'ok':'mu'}">${st.done[m.id]?'✓':'·'}</span><span class="${st.done[m.id]?'':'mu'}">${esc(m.id)}.spec</span></div>`).join('')}
      <div class="row mu">…</div>
      <div class="row"><span class="ok">${d} passed</span><span class="mu">${MODULES.length-d} pending</span></div>
    </div>
  </section>
  <section class="stats" aria-label="${t('statsAria')}">
    <div class="stat"><b>${d}<span class="of"> / ${MODULES.length}</span></b><span>${t('statModules')}</span></div>
    <div class="stat"><b>${correct}<span class="of"> / ${answered}</span></b><span>${t('statQuiz')}</span></div>
    <div class="stat"><b>${Object.values(st.fw).filter(Boolean).length}<span class="of"> / ${FRAMEWORK_CHECKS.length}</span></b><span>${t('statFw')}</span></div>
  </section>
  ${TRACKS.map(tk=>{const ms=MODULES.map((m,i)=>[m,i]).filter(([m])=>m.track===tk.id);const dn=ms.filter(([m])=>st.done[m.id]).length;
   return `<section class="track"><div class="track__head"><div><h2>${esc(tk.name)}</h2><p>${esc(tk.blurb)}</p></div><span class="badge ${dn===ms.length?'badge--pass':''}">${dn===ms.length?'✓ ':''}${dn}/${ms.length}</span></div><div class="grid">${ms.map(([m,i])=>card(m,i)).join('')}</div></section>`}).join('')}
  <section class="track"><div class="track__head"><div><h2>${t('practice')}</h2><p>${t('practiceBlurb')}</p></div></div>
   <div class="practice">${practice().map(p=>`<a class="card" href="#${p.id}"><h3 class="card__title">${p.title}</h3><p class="card__body">${p.body}</p></a>`).join('')}</div></section>
  ${CO('note',t('takeawayLabel'),t('takeaway'))}
  <p class="empty empty--sm">${t('footnote')}</p>
  </div>`;
}
function quizHTML(qs,keyFn){
  return qs.map((q,k)=>{const key=keyFn(k),ch=st.ans[key],answered=ch!==undefined;
   return `<div class="q" data-key="${key}"><p class="q__text">${k+1}. ${esc(q.q)}</p><div class="q__opts">${q.o.map((o,j)=>{
     let c='';if(answered){if(j===q.a)c='is-right';else if(j===ch)c='is-wrong';}
     const mark=answered&&j===q.a?'✓':answered&&j===ch?'✕':String.fromCharCode(65+j);
     return `<button type="button" class="opt ${c}" data-j="${j}" ${answered?'disabled':''}><span class="k">${mark}</span><span>${esc(o)}</span></button>`}).join('')}</div>
     ${answered?`<p class="q__why"><b>${ch===q.a?t('correct'):t('notQuite')}</b> ${esc(q.why)}</p>`:''}</div>`}).join('');
}
function module(id){
  const i=idx(id),m=MODULES[i],prev=MODULES[i-1],next=MODULES[i+1];
  const qkey=k=>m.id+':'+k;
  main.innerHTML=`<article class="wrap">
   <header class="mod-head"><div class="meta"><span class="label">${esc(t('moduleLabel',num(i),trackName(m.track)))}</span><span class="badge">${t('min',m.min)}</span>${m.extra?`<span class="badge badge--brand">${t('beyond')}</span>`:''}${st.done[m.id]?`<span class="badge badge--pass">${t('doneBadge')}</span>`:''}</div>
    <h1>${esc(m.title)}</h1><p class="sum">${esc(m.sum)}</p></header>
   ${m.sections.map(s=>`<section class="sec"><h2>${s.h}</h2>${s.body}</section>`).join('')}
   <section class="sec"><h2>${t('checkYourself')}</h2><div class="quiz" id="quiz">${quizHTML(m.quiz,qkey)}</div></section>
   <div class="done-row"><span class="empty">${st.done[m.id]?t('markedDone'):t('finishedQ')}</span>
    <button class="btn ${st.done[m.id]?'btn--secondary':'btn--primary'}" id="doneBtn" type="button">${st.done[m.id]?t('markNotDone'):t('markDone')}</button></div>
   <div class="sources"><span class="label">${t('sources')}</span><ul>${m.src.map(s=>`<li><a href="${SRC[s][1]}" target="_blank" rel="noopener">${esc(SRC[s][0])}</a></li>`).join('')}</ul></div>
   <nav class="pager" aria-label="${t('pagerAria')}">${prev?`<a class="card" href="#${prev.id}"><span class="card__eyebrow">${t('prev')}</span><span class="card__title">${esc(prev.title)}</span></a>`:'<span></span>'}${next?`<a class="card next" href="#${next.id}"><span class="card__eyebrow">${t('next')}</span><span class="card__title">${esc(next.title)}</span></a>`:`<a class="card next" href="#quiz"><span class="card__eyebrow">${t('next')}</span><span class="card__title">${t('prQuiz')}</span></a>`}</nav>
  </article>`;
  bindQuiz(m.quiz,qkey,()=>module(id),true);
  $('#doneBtn').onclick=()=>{st.done[m.id]=!st.done[m.id];save();renderToc($('#search').value);progress();
    if(st.done[m.id]&&next)location.hash=next.id;else module(id);};
}
function bindQuiz(qs,keyFn,rerender,keepScroll){
  main.querySelectorAll('.q').forEach((el,k)=>el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    st.ans[el.dataset.key]=+b.dataset.j;save();const y=window.scrollY;rerender();if(keepScroll)window.scrollTo(0,y);
    const again=main.querySelector(`.q[data-key="${el.dataset.key}"] .q__why`);if(again){again.setAttribute('tabindex','-1');again.focus({preventScroll:true});}
  }));
}
let mixed=null;
function mixedQuiz(fresh){
  const all=[];MODULES.forEach(m=>m.quiz.forEach((q,k)=>all.push({m,q,k})));
  if(!mixed||fresh){mixed={items:all.sort(()=>Math.random()-.5).slice(0,10),ans:{}};}
  const it=mixed.items,done=Object.keys(mixed.ans).length,score=it.filter((x,k)=>mixed.ans[k]===x.q.a).length;
  const saveAns=st.ans;st.ans=Object.assign({},mixed.ans);
  const html=quizHTML(it.map(x=>x.q),k=>String(k));st.ans=saveAns;
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prQuiz')}</h1><p class="sum">${t('mqSum')}</p></header>
   <div class="quiz" id="mq">${html}</div>
   <div class="done-row"><span class="mono tnum">${done===it.length?`${t('score',score,it.length)} ${score>=8?`<span class="badge badge--pass">${t('pass')}</span>`:score>=5?`<span class="badge badge--flaky">${t('reviewB')}</span>`:`<span class="badge badge--fail">${t('revisitB')}</span>`}`:t('answered',done,it.length)}</span>
   <button class="btn btn--primary" id="newQ" type="button">${t('newQ')}</button></div>
   ${done===it.length&&score<it.length?`<div class="sec"><h2>${t('revisit')}</h2><ul>${[...new Set(it.filter((x,k)=>mixed.ans[k]!==x.q.a).map(x=>x.m.id))].map(id=>{const m=MODULES[idx(id)];return `<li><a href="#${id}">${esc(m.title)}</a></li>`}).join('')}</ul></div>`:''}</div>`;
  main.querySelectorAll('.q').forEach((el,k)=>el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{mixed.ans[k]=+b.dataset.j;const y=scrollY;mixedQuiz();scrollTo(0,y);
    const why=main.querySelector(`.q[data-key="${k}"] .q__why`);if(why){why.setAttribute('tabindex','-1');why.focus({preventScroll:true});}}));
  $('#newQ').onclick=()=>{mixedQuiz(true);scrollTo(0,0)};
}
let fc={track:'all',order:null,i:0,flipped:false};
function flashcards(){
  let list=GLOSSARY.filter(g=>fc.track==='all'||g[2]===fc.track);
  if(fc.order&&fc.order.length===list.length)list=fc.order.map(n=>list[n]);
  if(fc.i>=list.length)fc.i=0;const g=list[fc.i];
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prFc')}</h1><p class="sum">${t('fcSum')}</p></header>
  <div class="chips" role="group" aria-label="${t('filterAria')}"><button class="chip" data-t="all" aria-pressed="${fc.track==='all'}">${t('all')}</button>${TRACKS.map(tk=>`<button class="chip" data-t="${tk.id}" aria-pressed="${fc.track===tk.id}">${esc(tk.name)}</button>`).join('')}</div>
  <div class="fc-wrap">
   <button class="fc ${fc.flipped?'flipped':''}" id="card" type="button" aria-label="${esc(t('fcAria',g[0],fc.flipped?g[1]:''))}"><div class="fc__inner">
    <div class="fc__face">${fcPic(g[3])}<span class="label">${esc(trackName(g[2]))}</span><span class="fc__term">${esc(g[0])}</span><span class="empty empty--sm">${t('tapReveal')}</span></div>
    <div class="fc__face fc__face--back">${fcPic(g[3]).replace('fc__pic','fc__pic fc__pic--sm')}<span class="label label--brand">${esc(g[0])}</span><span class="fc__def">${esc(g[1])}</span></div></div></button>
   <div class="fc-ctrl"><button class="btn btn--secondary" id="prev" type="button">${t('prevBtn')}</button><span class="mono tnum">${fc.i+1} / ${list.length}</span><button class="btn btn--secondary" id="next" type="button">${t('nextBtn')}</button></div>
   <div><button class="btn btn--ghost" id="shuf" type="button">${t('shuffle')}</button></div></div></div>`;
  const go=d=>{fc.i=(fc.i+d+list.length)%list.length;fc.flipped=false;flashcards();$('#card').focus();};
  $('#card').onclick=()=>{fc.flipped=!fc.flipped;$('#card').classList.toggle('flipped',fc.flipped);};
  $('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
  $('#shuf').onclick=()=>{fc.order=[...list.keys()].sort(()=>Math.random()-.5);fc.i=0;fc.flipped=false;flashcards();};
  main.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{fc.track=c.dataset.t;fc.i=0;fc.order=null;fc.flipped=false;flashcards();});
  fcKeys=e=>{if(route()!=='flashcards'||e.target.matches('input'))return;if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);};
}
let fcKeys=null;document.addEventListener('keydown',e=>fcKeys&&fcKeys(e));
function checkPage(kind){
  const items=kind==='fw'?FRAMEWORK_CHECKS:STUDY_PATH,store=st[kind],n=items.filter((x,i)=>store[i]).length;
  const title=kind==='fw'?t('prFw'):t('prPath');
  const sum=kind==='fw'?t('fwSum'):t('pathSum');
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${title}</h1><p class="sum">${sum}</p></header>
   <div class="meter-block"><div class="row-between"><span class="label">${t('completed')}</span><span class="mono tnum">${n} / ${items.length}</span></div><div class="bar"><span style="width:${n/items.length*100}%"></span></div></div>
   <ul class="checklist">${items.map((t,i)=>`<li><label class="check"><input type="checkbox" id="${kind}-${i}" data-i="${i}" ${store[i]?'checked':''}><span>${kind==='path'?`<span class="mono idx">${num(i)}</span>`:''}${esc(t)}</span></label></li>`).join('')}</ul>
   ${kind==='fw'?CO('tip',t('tip'),t('fwTip')):''}</div>`;
  main.querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{store[c.dataset.i]=c.checked;save();const y=scrollY;checkPage(kind);scrollTo(0,y);const el=document.getElementById(c.id);el&&el.focus();});
}
function resourcesPage(){
  const html=(TR[LANG]&&TR[LANG].resourcesHtml)||RESOURCES_HTML;
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prResources')}</h1><p class="sum">${t('prResourcesB')}</p></header>${html}</div>`;
}
function careerPage(){
  const html=(TR[LANG]&&TR[LANG].careerHtml)||CAREER_HTML;
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prCareer')}</h1><p class="sum">${t('prCareerB')}</p></header>${html}</div>`;
}
const PK=[
 {id:'br',q:'Which browsers must you cover?',o:[['Chromium only is fine',{pw:2,cy:2,se:1}],['Chromium and Firefox',{pw:2,cy:2,se:2}],['Safari / WebKit is required too',{pw:3,cy:0,se:2}],['Many browser versions on remote machines',{pw:1,cy:0,se:3}]]},
 {id:'lang',q:'What language does your team write tests in?',o:[['JavaScript / TypeScript',{pw:2,cy:3,se:1}],['Java, C# or Python',{pw:1,cy:0,se:3}],['Mixed / not decided',{pw:2,cy:1,se:2}]]},
 {id:'type',q:'What will most of your tests be?',o:[['E2E user journeys plus API checks',{pw:3,cy:2,se:1}],['Front-end component tests alongside E2E',{pw:1,cy:3,se:0}],['Large cross-platform regression on remote infrastructure',{pw:1,cy:0,se:3}]]},
 {id:'infra',q:'What infrastructure do you already have?',o:[['Nothing yet — a clean start',{pw:2,cy:2,se:0}],['An existing Selenium Grid / WebDriver suite',{pw:0,cy:0,se:3}],['Budget for a hosted dashboard with replay and analytics',{pw:1,cy:2,se:1}]]},
 {id:'dbg',q:'How do you prefer to debug failures?',o:[['Traces and reports from CI runs',{pw:3,cy:1,se:1}],['Interactively, stepping through commands in the browser',{pw:1,cy:3,se:0}],['Our own logging and reporting stack',{pw:1,cy:0,se:2}]]},
];
const TOOLS={pw:{n:'Playwright',why:['Chromium, Firefox and WebKit built in','Integrated runner, fixtures, parallelism','Trace Viewer and HTML report for CI debugging','UI + API tests in one tool'],watch:'Refactor Codegen output; watch parallel data collisions.'},
 cy:{n:'Cypress',why:['Strong component-testing workflow','Time-travel Command Log for local debugging','Network stubbing, spies and clocks','Optional Cloud for replay and flaky management'],watch:'Separate free local features from paid Cloud; check cross-origin needs.'},
 se:{n:'Selenium',why:['WebDriver bindings for Java, C#, Python, JS…','Grid for remote, parallel, cross-platform runs','Mature, standards-based ecosystem','Reuses existing infrastructure'],watch:'You assemble the framework yourself; synchronisation needs care.'}};
function picker(){
  const PKT=t('pk');PK.forEach((p,i)=>{if(PKT[i]){p.q=PKT[i][0];p.o.forEach((o,j)=>{if(PKT[i][1][j])o[0]=PKT[i][1][j];});}});
  const TT=t('tools');for(const k in TOOLS)if(TT[k]){TOOLS[k].why=TT[k][0];TOOLS[k].watch=TT[k][1];}
  const answered=PK.filter(p=>st.pk[p.id]!==undefined).length;
  let res='';
  if(answered===PK.length){
    const sc={pw:0,cy:0,se:0};PK.forEach(p=>{const w=p.o[st.pk[p.id]][1];for(const k in w)sc[k]+=w[k]});
    const max=Math.max(...Object.values(sc)),ranked=Object.keys(sc).sort((a,b)=>sc[b]-sc[a]);
    res=`<section class="sec"><h2>${t('pkResult')}</h2><div class="pk-res">${ranked.map((k,r)=>`<div class="card ${r===0?'top':''}"><div class="row-between"><h3 class="card__title">${TOOLS[k].n}</h3>${r===0?`<span class="badge badge--brand">${t('bestFit')}</span>`:''}</div>
     <div class="meter" aria-label="${t('meterAria',sc[k],max)}"><span style="width:${sc[k]/max*100}%"></span></div><span class="mono tnum pts">${t('pts',sc[k])}</span><ul>${TOOLS[k].why.map(w=>`<li>${w}</li>`).join('')}</ul><p class="card__body"><b>${t('watchOut')}</b> ${TOOLS[k].watch}</p></div>`).join('')}</div>
     ${CO('note',t('pkNoteLabel'),t('pkNote'))}</section>`;
  }
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prPick')}</h1><p class="sum">${t('pkSum')}</p></header>
   <form class="pk" id="pkf">${PK.map((p,pi)=>`<fieldset><legend>${pi+1}. ${esc(p.q)}</legend>${p.o.map((o,j)=>`<label><input type="radio" name="${p.id}" id="pk-${p.id}-${j}" value="${j}" ${st.pk[p.id]===j?'checked':''}><span>${esc(o[0])}</span></label>`).join('')}</fieldset>`).join('')}</form>
   ${res||`<p class="empty mono">${t('answered',answered,PK.length)}</p>`}
   ${answered?`<div><button class="btn btn--ghost" id="pkReset" type="button">${t('clearAnswers')}</button></div>`:''}</div>`;
  $('#pkf').onchange=e=>{st.pk[e.target.name]=+e.target.value;save();const y=scrollY,id=e.target.id;picker();scrollTo(0,y);const el=document.getElementById(id);el&&el.focus();};
  $('#pkf').onsubmit=e=>e.preventDefault();
  const r=$('#pkReset');if(r)r.onclick=()=>{st.pk={};save();picker();};
}

/* ---------- exams ---------- */
const FINAL={n:40,mins:60,pass:.65,quota:{found:5,tools:8,frame:8,qual:6,ai:7,cert:6}};
const TRACK_EXAM_N=15;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function pool(track){
  const out=[];
  MODULES.filter(m=>m.track===track).forEach(m=>m.quiz.forEach(q=>out.push(Object.assign({t:track,mod:m.id},q))));
  EXAM_BANK.filter(q=>q.t===track).forEach(q=>out.push(Object.assign({mod:null},q)));
  return out;
}
let exam=null,timerId=null;
const isMulti=q=>Array.isArray(q.a);
const correct=(q,ans)=>{if(ans===undefined)return false;if(isMulti(q)){const a=[...q.a].sort().join(),b=[...(ans||[])].sort().join();return a===b;}return ans===q.a;};
const fmt=s=>{s=Math.max(0,Math.round(s));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;};
/* a running exam survives a reload (per tab); stored data is untrusted, so it is validated like the main progress */
const EXKEY='automation-hub.exam.v1';
function saveExam(){try{if(exam&&!exam.done)sessionStorage.setItem(EXKEY,JSON.stringify(exam));else sessionStorage.removeItem(EXKEY);}catch(e){}}
function loadExam(){
  try{
    const d=JSON.parse(sessionStorage.getItem(EXKEY)||'null'),ids=TRACKS.map(x=>x.id);
    const int=x=>Number.isInteger(x)&&x>=0&&x<100,num=x=>typeof x==='number'&&isFinite(x);
    const okItem=x=>x&&typeof x.q==='string'&&x.q&&typeof x.why==='string'&&Array.isArray(x.o)&&x.o.length>1&&x.o.every(s=>typeof s==='string')
      &&ids.includes(x.t)&&(x.mod==null||MODULES.some(m=>m.id===x.mod))&&(x.k==null||[1,2,3].includes(x.k))
      &&(Array.isArray(x.a)?x.a.length>0&&x.a.every(j=>int(j)&&j<x.o.length):int(x.a)&&x.a<x.o.length);
    if(!d||d.done||!(d.kind==='final'||ids.includes(d.kind))||!Array.isArray(d.items)||!d.items.length||d.items.length>FINAL.n||!d.items.every(okItem))return null;
    if(!num(d.start)||(d.kind==='final'?!num(d.deadline):d.deadline!=null))return null;
    const n=d.items.length,obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
    const keyOk=k=>int(+k)&&+k<n;
    const ans=Object.fromEntries(Object.entries(obj(d.ans)).filter(([k,v])=>keyOk(k)&&(int(v)||(Array.isArray(v)&&v.every(int)))));
    const flag=Object.fromEntries(Object.entries(obj(d.flag)).filter(([k,v])=>keyOk(k)&&v===true));
    return {kind:d.kind,items:d.items,ans,flag,start:d.start,deadline:d.deadline??null,done:false,confirm:false,filter:'wrong'};
  }catch(e){return null;}
}
exam=loadExam();
function startExam(kind){
  let items;
  if(kind==='final'){items=[];for(const t in FINAL.quota)items.push(...shuffle(pool(t)).slice(0,FINAL.quota[t]));items=shuffle(items);}
  else items=shuffle(pool(kind)).slice(0,TRACK_EXAM_N);
  exam={kind,items,ans:{},flag:{},start:Date.now(),deadline:kind==='final'?Date.now()+FINAL.mins*60000:null,done:false,confirm:false,filter:'wrong'};
  saveExam();
  const h='exam-'+kind;if(route()===h)render();else location.hash=h;
}
function examTitle(kind){return kind==='final'?t('finalExam'):t('trackExam',trackName(kind));}
function examGuide(){
  const rows=TRACKS.map(tk=>{const p=pool(tk.id),k=n=>p.filter(q=>q.k===n).length,multi=p.filter(isMulti).length,quiz=p.filter(q=>q.mod).length;
    return [esc(tk.name),MODULES.filter(m=>m.track===tk.id).length,quiz,p.length-quiz,p.length,`${k(1)} / ${k(2)} / ${k(3)}`,multi,FINAL.quota[tk.id]];});
  const th=a=>`<thead><tr>${a.map(x=>`<th>${x}</th>`).join('')}</tr></thead>`;
  const tb=`<div class="tbl"><table>${th(t('guideTh'))}<tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i?' class="mono tnum"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const qr=t('qvsERows',TRACK_EXAM_N,FINAL.n,FINAL.mins,Math.round(FINAL.pass*100),Math.ceil(FINAL.n*FINAL.pass));
  return `<section class="sec"><h2>${t('howTitle')}</h2>
   <p>${t('howP')}</p>
   ${tb}
   <p class="empty empty--md">${t('kNote')}</p>
   <h3>${t('qvsE')}</h3>
   <div class="tbl"><table>${th(t('qvsETh'))}<tbody>${qr.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <h3>${t('scoringTitle')}</h3>
   ${UL(t('scoring'))}
   <h3>${t('routineTitle')}</h3>
   ${OL(t('routine'))}
   ${CO('tip',t('tip'),t('guideTip'))}</section>`;
}
function examsHub(){
  const hist=(st.hist||[]).slice().reverse();
  const tile=(kind,body,meta)=>`<div class="card"><span class="card__eyebrow">${kind==='final'?t('timedEyebrow'):t('untimedEyebrow')}</span><h3 class="card__title">${examTitle(kind)}</h3><p class="card__body">${body}</p><div class="card__foot"><span class="badge">${meta}</span><button class="btn ${kind==='final'?'btn--primary':'btn--secondary'} btn--sm" type="button" data-start="${kind}">${exam&&exam.kind===kind&&!exam.done?t('resume'):t('start')}</button></div></div>`;
  main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('practice')}</span><h1>${t('prExams')}</h1><p class="sum">${t('exSum')}</p></header>
   <section class="track"><div class="track__head"><div><h2>${t('finalExam')}</h2><p>${t('finalHeadP')}</p></div></div>
   <div class="grid">${tile('final',t('finalTile'),t('finalMeta',FINAL.n,FINAL.mins,Math.ceil(FINAL.n*FINAL.pass)))}</div></section>
   <section class="track"><div class="track__head"><div><h2>${t('perTrack')}</h2><p>${t('perTrackP',TRACK_EXAM_N)}</p></div></div>
   <div class="grid">${TRACKS.map(tk=>tile(tk.id,esc(tk.blurb),t('tileMeta',Math.min(TRACK_EXAM_N,pool(tk.id).length),pool(tk.id).length))).join('')}</div></section>
   ${examGuide()}
   <section class="sec"><h2>${t('attempts')}</h2>${hist.length?`<div class="tbl"><table><thead><tr><th>${t('thDate')}</th><th>${t('thExam')}</th><th>${t('thScore')}</th><th>${t('thResult')}</th><th>${t('thTime')}</th></tr></thead><tbody>${hist.slice(0,10).map(h=>`<tr><td class="mono tnum plain">${new Date(h.at).toLocaleString(LANG, {dateStyle:'medium',timeStyle:'short'})}</td><td>${esc(examTitle(h.kind))}</td><td class="mono tnum">${h.score} / ${h.total} (${Math.round(h.score/h.total*100)}%)</td><td>${h.pass?`<span class="badge badge--pass">${t('pass')}</span>`:`<span class="badge badge--fail">${t('failB')}</span>`}</td><td class="mono tnum">${fmt(h.secs)}</td></tr>`).join('')}</tbody></table></div>`:`<p class="empty">${t('noAttempts')}</p>`}</section>
   ${CO('note',t('exNoteLabel'),t('exNote'))}</div>`;
  main.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>{const k=b.dataset.start;if(exam&&exam.kind===k&&!exam.done){location.hash='exam-'+k;}else startExam(k);});
}
function examView(kind){
  if(!exam||exam.kind!==kind){ // direct link without an active exam
    main.innerHTML=`<div class="wrap"><header class="mod-head"><span class="label">${t('examLabel')}</span><h1>${examTitle(kind)}</h1><p class="sum">${t('noAttempt')}</p></header><div><button class="btn btn--primary" id="go" type="button">${esc(t('startExam',examTitle(kind)))}</button> <a class="btn btn--ghost" href="#exams">${t('allExams')}</a></div></div>`;
    $('#go').onclick=()=>startExam(kind);return;}
  if(exam.done)return examResult();
  const it=exam.items,answered=it.filter((q,i)=>exam.ans[i]!==undefined&&(!isMulti(q)||exam.ans[i].length===q.a.length)).length;
  main.innerHTML=`<div class="wrap">
   <div class="exambar" role="region" aria-label="${t('statusAria')}">
     <div class="exambar__title"><span class="label">${examTitle(kind)}</span><span class="mono tnum" id="exCount">${t('answered',answered,it.length)}</span></div>
     <div class="bar exambar__bar"><span id="exBar" style="width:${answered/it.length*100}%"></span></div>
     ${exam.deadline?`<span class="timer mono tnum" id="timer" role="timer" aria-live="off">--:--</span>`:''}
     <button class="btn btn--primary btn--sm" id="submitTop" type="button">${t('submit')}</button>
   </div>
   <ol class="exam-list">${it.map((q,i)=>{const multi=isMulti(q),ans=exam.ans[i];
     return `<li class="q exq ${exam.flag[i]?'is-flagged':''}" id="exq-${i}"><div class="exq__head"><span class="label">${esc(t('question',i+1,trackName(q.t)))}${q.k?` · K${q.k}`:''}</span><button type="button" class="btn btn--ghost btn--sm" data-flag="${i}" aria-pressed="${!!exam.flag[i]}">${exam.flag[i]?t('flagged'):t('flag')}</button></div>
     <p class="q__text" id="exqt-${i}">${esc(q.q)}${multi?` <span class="badge badge--brand">${t('selectTwo')}</span>`:''}</p>
     <div class="q__opts" role="${multi?'group':'radiogroup'}" aria-labelledby="exqt-${i}">${q.o.map((o,j)=>{const on=multi?(ans||[]).includes(j):ans===j;
       const tab=multi||on||(ans===undefined&&j===0)?0:-1; /* radios: one tab stop per group, arrows move inside it */
       return `<button type="button" class="opt ${on?'is-picked':''}" role="${multi?'checkbox':'radio'}" aria-checked="${on}" tabindex="${tab}" data-i="${i}" data-j="${j}"><span class="k">${String.fromCharCode(65+j)}</span><span>${esc(o)}</span></button>`}).join('')}</div></li>`}).join('')}</ol>
   <div class="done-row" id="submitRow">${exam.confirm?`<span>${t('unanswered',it.length-answered,Object.values(exam.flag).filter(Boolean).length)}</span><div class="actions"><button class="btn btn--secondary" id="keep" type="button">${t('keep')}</button><button class="btn btn--primary" id="really" type="button">${t('submitNow')}</button></div>`:`<span class="empty">${t('checkFlagged')}</span><button class="btn btn--primary" id="submit" type="button">${t('submitExam')}</button>`}</div>
  </div>`;
  /* the low state is a "!" glyph plus colour, and is announced once at 5 and 1 minutes (colour alone would be invisible to many users) */
  const tick=()=>{if(!exam||exam.done||!exam.deadline)return;const left=(exam.deadline-Date.now())/1000,el=$('#timer'),low=left<300;
    if(el){el.textContent=(low?'! ':'')+fmt(left);el.classList.toggle('is-low',low);}
    if(left>0&&left<60&&!exam.warn1){exam.warn1=exam.warn5=true;say(t('timeLow',1));}else if(left>0&&low&&!exam.warn5){exam.warn5=true;say(t('timeLow',5));}
    if(left<=0)finishExam(true);};
  clearInterval(timerId);if(exam.deadline){tick();timerId=setInterval(tick,1000);}
  main.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,j=+b.dataset.j,q=exam.items[i];
    if(isMulti(q)){let a=exam.ans[i]||[];a=a.includes(j)?a.filter(x=>x!==j):a.concat(j);if(a.length>q.a.length)a=a.slice(-q.a.length);exam.ans[i]=a;}else exam.ans[i]=j;
    exam.confirm=false;saveExam();const y=scrollY;examView(kind);scrollTo(0,y);const nb=main.querySelector(`.opt[data-i="${i}"][data-j="${j}"]`);nb&&nb.focus();});
  main.querySelectorAll('.q__opts[role=radiogroup]').forEach(g=>g.onkeydown=e=>{
    const d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(!d)return;
    const bs=[...g.querySelectorAll('.opt')],i=bs.indexOf(document.activeElement);if(i<0)return;
    e.preventDefault();bs[(i+d+bs.length)%bs.length].click();});
  main.querySelectorAll('[data-flag]').forEach(b=>b.onclick=()=>{const i=+b.dataset.flag;exam.flag[i]=!exam.flag[i];saveExam();const y=scrollY;examView(kind);scrollTo(0,y);const nb=main.querySelector(`[data-flag="${i}"]`);nb&&nb.focus();});
  const ask=()=>{if(answered<it.length){exam.confirm=true;examView(kind);$('#submitRow').scrollIntoView({block:'center'});$('#really').focus();}else finishExam(false);};
  $('#submitTop').onclick=ask;const s=$('#submit');if(s)s.onclick=ask;
  const k=$('#keep');if(k)k.onclick=()=>{exam.confirm=false;examView(kind);};
  const r=$('#really');if(r)r.onclick=()=>finishExam(false);
}
function finishExam(timeout){
  clearInterval(timerId);if(!exam||exam.done)return;
  exam.done=true;exam.timeout=timeout;saveExam();if(timeout)say(t('timeRanOut').replace(/[\s·]+$/,''));
exam.secs=Math.min((Date.now()-exam.start)/1000,exam.deadline?FINAL.mins*60:Infinity);
  const score=exam.items.filter((q,i)=>correct(q,exam.ans[i])).length,total=exam.items.length;
  exam.score=score;exam.pass=score/total>=FINAL.pass;
  st.hist=(st.hist||[]).concat({kind:exam.kind,score,total,pass:exam.pass,secs:Math.round(exam.secs),at:Date.now()}).slice(-10);save();
  examResult();scrollTo(0,0);
}
function examResult(){
  const it=exam.items,byT={};it.forEach((q,i)=>{byT[q.t]=byT[q.t]||{n:0,r:0};byT[q.t].n++;if(correct(q,exam.ans[i]))byT[q.t].r++;});
  const need=Math.ceil(it.length*FINAL.pass),wrong=it.map((q,i)=>i).filter(i=>!correct(it[i],exam.ans[i]));
  const show=exam.filter==='all'?it.map((q,i)=>i):wrong;
  const letters=a=>a===undefined||(Array.isArray(a)&&!a.length)?'—':[].concat(a).map(j=>String.fromCharCode(65+j)).sort().join(', ');
  main.innerHTML=`<div class="wrap">
   <header class="mod-head"><span class="label">${esc(t('results',examTitle(exam.kind)))}</span>
    <div class="result">
      <div class="result__score"><b class="mono tnum">${exam.score}<span> / ${it.length}</span></b><span class="mono tnum">${t('passMark',Math.round(exam.score/it.length*100),need)}</span></div>
      <div class="result__verdict">${exam.pass?`<span class="badge badge--pass">${t('pass')}</span>`:`<span class="badge badge--fail">${t('failB')}</span>`}<span class="empty mono tnum">${exam.timeout?t('timeRanOut'):''}${t('timeUsed',fmt(exam.secs))}</span></div>
    </div></header>
   <section class="sec"><h2>${t('byTrack')}</h2><div class="bytrack">${Object.keys(byT).map(tk=>{const v=byT[tk],p=v.r/v.n;return `<div class="bytrack__row"><span>${esc(trackName(tk))}</span><div class="meter ${p>=FINAL.pass?'meter--pass':'meter--fail'}"><span style="width:${p*100}%"></span></div><span class="mono tnum">${v.r}/${v.n}</span><span class="badge ${p>=FINAL.pass?'badge--pass':'badge--fail'}">${p>=FINAL.pass?'✓':'✕'} ${Math.round(p*100)}%</span></div>`}).join('')}</div>
    ${Object.keys(byT).some(t=>byT[t].r/byT[t].n<FINAL.pass)?CO('tip',t('nextStep'),t('nextStepText')):''}</section>
   <section class="sec"><div class="track__head"><h2>${t('review')}</h2><div class="chips" role="group" aria-label="${t('reviewAria')}"><button class="chip" data-f="wrong" aria-pressed="${exam.filter!=='all'}">${t('wrongOrSkipped',wrong.length)}</button><button class="chip" data-f="all" aria-pressed="${exam.filter==='all'}">${t('allN',it.length)}</button></div></div>
    ${show.length?`<ol class="exam-list">${show.map(i=>{const q=it[i],ok=correct(q,exam.ans[i]);return `<li class="q exq"><div class="exq__head"><span class="label">${esc(t('question',i+1,trackName(q.t)))}</span>${ok?`<span class="badge badge--pass">${t('correctB')}</span>`:exam.ans[i]===undefined?`<span class="badge">${t('skippedB')}</span>`:`<span class="badge badge--fail">${t('wrongB')}</span>`}</div>
      <p class="q__text">${esc(q.q)}</p><div class="q__opts">${q.o.map((o,j)=>{const isA=[].concat(q.a).includes(j),picked=[].concat(exam.ans[i]??[]).includes(j);return `<div class="opt ${isA?'is-right':picked?'is-wrong':''}"><span class="k">${isA?'✓':picked?'✕':String.fromCharCode(65+j)}</span><span>${esc(o)}</span></div>`}).join('')}</div>
      <p class="q__why"><b>${t('yourAnswer',letters(exam.ans[i]),letters(q.a))}</b> ${esc(q.why)}${q.mod?` <a href="#${q.mod}">${t('reviewModule')}</a>`:''}</p></li>`}).join('')}</ol>`:`<p class="empty">${t('nothingReview')}</p>`}</section>
   <div class="done-row"><a class="btn btn--ghost" href="#exams">${t('allExams')}</a><button class="btn btn--primary" id="again" type="button">${esc(t('newExam',examTitle(exam.kind)))}</button></div></div>`;
  main.querySelectorAll('[data-f]').forEach(c=>c.onclick=()=>{exam.filter=c.dataset.f;examResult();});
  $('#again').onclick=()=>{const k=exam.kind;exam=null;startExam(k);scrollTo(0,0);};
}

/* ---------- router ---------- */
function route(){const h=location.hash.slice(1);return h||'home';}
function render(){
  const r=route();fcKeys=null;clearInterval(timerId);
  if(idx(r)>-1)module(r);
  else if(r==='quiz')mixedQuiz();else if(r==='flashcards')flashcards();else if(r==='picker')picker();
  else if(r==='exams')examsHub();else if(r.startsWith('exam-')&&(r==='exam-final'||TRACKS.some(t=>'exam-'+t.id===r)))examView(r.slice(5));
  else if(r==='checklist')checkPage('fw');else if(r==='path')checkPage('path');
  else if(r==='resources')resourcesPage();else if(r==='career')careerPage();else home();
  progress();markCurrent();setNav(false);
  const h1=main.querySelector('h1');document.title=(h1?h1.textContent.trim()+' · ':'')+'Automation Hub';
}
/* mobile drawer: while closed it is inert (no tab stops, hidden from screen readers); while open the page behind is inert, so focus stays inside */
const narrow=window.matchMedia('(max-width:900px)');
function setNav(open,restoreFocus){
  const was=app.classList.contains('nav-open');
  app.classList.toggle('nav-open',open);$('#menuBtn').setAttribute('aria-expanded',String(open));
  $('#side').inert=narrow.matches&&!open;$('#content').inert=narrow.matches&&open;
  if(open&&!was&&narrow.matches)$('#search').focus();
  if(!open&&was&&restoreFocus)$('#menuBtn').focus();
}
narrow.addEventListener('change',()=>setNav(false));
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);main.focus({preventScroll:true});});
$('#search').addEventListener('input',e=>renderToc(e.target.value));
$('#menuBtn').onclick=()=>setNav(!app.classList.contains('nav-open'));
$('#skip').onclick=e=>{e.preventDefault();main.focus();main.scrollIntoView();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&app.classList.contains('nav-open'))setNav(false,true)});
document.addEventListener('click',e=>{if(app.classList.contains('nav-open')&&!e.target.closest('#side')&&!e.target.closest('#menuBtn'))setNav(false)});
let armed=false;$('#resetBtn').onclick=()=>{const b=$('#resetBtn');if(!armed){armed=true;b.textContent=t('confirmReset');setTimeout(()=>{armed=false;b.textContent=t('resetProgress')},3000);return;}
  st={done:{},ans:{},fw:{},path:{},pk:{},hist:[]};exam=null;saveExam();save();armed=false;b.textContent=t('progressReset');renderToc();render();};
renderToc();render();
})();
