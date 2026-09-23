// Usage: node tools/check-i18n.js 1-learning-hub/source  — checks every translation against the English structure
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=process.argv[2];
const files=['data.js','data2.js','data3.js','data4.js','i18n.js',...fs.readdirSync(path.join(dir,'i18n')).filter(f=>f.endsWith('.js')).sort().map(f=>'i18n/'+f)];
const ctx={console,location:{search:''},localStorage:{getItem:()=>null},URLSearchParams};vm.createContext(ctx);
for(const f of files)vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx,{filename:f});
const r=vm.runInContext(`({TR,MODULES,GLOSSARY,FRAMEWORK_CHECKS,STUDY_PATH,EXAM_BANK,TRACKS,UI})`,ctx);
const PRE=/<pre class="code">[\s\S]*?<\/pre>/g,TOK=/⟦P(\d+)⟧/g;
const tags=h=>(h.replace(PRE,'').match(/<\/?(p|ul|ol|li|table|div|b|i|code|h3|a|span)\b/g)||[]).join(',');
let problems=0;const warn=(l,m)=>{problems++;console.log(`[${l}] ${m}`);};
for(const lang of ['uk','pl','es']){
  const tr=r.TR[lang];if(!tr){warn(lang,'missing entirely');continue;}
  let secOk=0,secAll=0,qOk=0,qAll=0;
  for(const m of r.MODULES){
    const x=tr.modules&&tr.modules[m.id];
    secAll+=m.sections.length;qAll+=m.quiz.length;
    if(!x){warn(lang,`module missing: ${m.id}`);continue;}
    if(!x.title||!x.sum)warn(lang,`${m.id}: title/sum missing`);
    if(!x.sections||x.sections.length!==m.sections.length){warn(lang,`${m.id}: sections ${x.sections&&x.sections.length} vs ${m.sections.length}`);}
    else m.sections.forEach((s,i)=>{const y=x.sections[i],pres=(s.body.match(PRE)||[]).length,toks=(y[1].match(TOK)||[]).length;
      if(pres!==toks)warn(lang,`${m.id} S${i} "${s.h}": code blocks ${toks} vs ${pres}`);
      else if(tags(s.body)!==tags(y[1]))warn(lang,`${m.id} S${i} "${s.h}": tag structure differs\n   en: ${tags(s.body)}\n   ${lang}: ${tags(y[1])}`);
      else secOk++;});
    if(!x.quiz||x.quiz.length!==m.quiz.length)warn(lang,`${m.id}: quiz ${x.quiz&&x.quiz.length} vs ${m.quiz.length}`);
    (x.quiz||[]).forEach((y,i)=>{const q=m.quiz[i];if(!q)return;if(y[1].length!==q.o.length)warn(lang,`${m.id} Q${i}: options ${y[1].length} vs ${q.o.length}`);else qOk++;});
  }
  const cmp=(name,a,b)=>{if(!a)warn(lang,`${name} missing`);else if(a.length!==b.length)warn(lang,`${name}: ${a.length} vs ${b.length}`);};
  cmp('glossary',tr.glossary,r.GLOSSARY);cmp('checks',tr.checks,r.FRAMEWORK_CHECKS);cmp('path',tr.path,r.STUDY_PATH);cmp('exam',tr.exam,r.EXAM_BANK);
  (tr.exam||[]).forEach((y,i)=>{const q=r.EXAM_BANK[i];if(q&&y[1].length!==q.o.length)warn(lang,`exam E${i}: options ${y[1].length} vs ${q.o.length}`);});
  if(!tr.tracks||Object.keys(tr.tracks).length!==r.TRACKS.length)warn(lang,'tracks incomplete');
  const miss=Object.keys(r.UI.en).filter(k=>!(k in (r.UI[lang]||{})));if(miss.length)warn(lang,'UI keys missing: '+miss.join(','));
  console.log(`${lang}: sections ${secOk}/${secAll}, quiz ${qOk}/${qAll}, exam ${(tr.exam||[]).length}/${r.EXAM_BANK.length}, glossary ${(tr.glossary||[]).length}/${r.GLOSSARY.length}`);
}
console.log(problems?`${problems} problem(s)`:'ALL OK');
