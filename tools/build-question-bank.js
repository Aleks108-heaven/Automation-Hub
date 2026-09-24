// Usage: node tools/build-question-bank.js  — rewrites 4-research-and-sources/question-bank.md from the English sources
const fs=require('fs'),vm=require('vm'),d='1-learning-hub/source/';
const ctx={console,location:{search:''},localStorage:{getItem:()=>null},URLSearchParams};vm.createContext(ctx);
for(const f of ['data.js','data2.js','data3.js','data4.js','data5.js'])vm.runInContext(fs.readFileSync(d+f,'utf8'),ctx);
const {MODULES,TRACKS,EXAM_BANK}=vm.runInContext('({MODULES,TRACKS,EXAM_BANK})',ctx);
const L=i=>String.fromCharCode(65+i),ans=a=>Array.isArray(a)?a.map(L).join(', '):L(a);
const q=(n,x,k)=>`**${n}. ${x.q}**${Array.isArray(x.a)?' (select TWO)':''}${k?` · K${x.k}`:''}\n\n${x.o.map((o,i)=>`- ${L(i)}. ${o}`).join('\n')}\n\n*Answer: ${ans(x.a)}* — ${x.why}\n`;
let out='# Question bank\n\nEvery quiz and exam question with its answer and explanation — useful for offline revision.\n',e=0;
for(const t of TRACKS){out+=`\n## ${t.name}\n`;
 for(const m of MODULES.filter(m=>m.track===t.id)){out+=`\n### ${m.title}\n`;m.quiz.forEach((x,i)=>out+='\n'+q(i+1,x));}
 e=0;const ex=EXAM_BANK.filter(x=>x.t===t.id);if(ex.length){out+='\n### Exam-only questions\n';ex.forEach(x=>out+='\n'+q('E'+(++e),x,1));}}
fs.writeFileSync('4-research-and-sources/question-bank.md',out);
