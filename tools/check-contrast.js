// Usage: node tools/check-contrast.js  — checks the colour pairs documented in 2-design-system/tokens.json against WCAG 2.2 AA
// (1.4.3: 4.5:1 for text, 1.4.11: 3:1 for control borders). Run by `npm run check`; exits 1 when a pair falls short.
const fs=require('fs'),path=require('path');
const tokens=JSON.parse(fs.readFileSync(path.join(__dirname,'..','2-design-system','tokens.json'),'utf8')).color.tokens;
const val=(name,theme)=>{const t=tokens.find(x=>x.name===name);if(!t)throw new Error('unknown token '+name);return t.value[theme];};

const lin=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);};
const lum=hex=>{const n=parseInt(hex.slice(1),16);return 0.2126*lin(n>>16)+0.7152*lin(n>>8&255)+0.0722*lin(n&255);};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05);};

const SURFACES=['surface-000','surface-100','surface-200'];
const TEXT=4.5,UI=3;
/* [foreground, backgrounds, minimum ratio, reason] — each pair is one the token usage notes promise */
const PAIRS=[
  ['ink',SURFACES,TEXT,'primary text'],
  ['ink-muted',SURFACES,TEXT,'secondary text'],
  ['brand',[...SURFACES,'brand-soft'],TEXT,'links, active nav'],
  ['brand-strong',[...SURFACES,'brand-soft'],TEXT,'hover and pressed links'],
  ['ink',['brand-soft','accent-soft'],TEXT,'text on tinted grounds'],
  ['on-brand',['brand','brand-strong'],TEXT,'text on brand fills'],
  ['accent-ink',['surface-000','surface-100','accent-soft'],TEXT,'tip labels'],
  ['pass',['surface-000','surface-100','pass-soft'],TEXT,'pass badge and text'],
  ['fail',['surface-000','surface-100','fail-soft'],TEXT,'fail badge and text'],
  ['flaky',['surface-000','surface-100','flaky-soft'],TEXT,'flaky badge and text'],
  ['skip',['surface-000','surface-100'],TEXT,'skipped badge and text'],
  ['code-ink',['code-bg'],TEXT,'code text'],
  ['code-muted',['code-bg'],TEXT,'code comments'],
  ['code-key',['code-bg'],TEXT,'code commands'],
  ['code-str',['code-bg'],TEXT,'code strings'],
  ['line-strong',['surface-000','surface-100'],UI,'control borders (1.4.11)'],
  ['brand',['surface-000','surface-100'],UI,'focus ring (2.4.11 / 1.4.11)'],
];

let bad=0,n=0;
for(const theme of ['light','dark'])for(const [fg,bgs,min,why] of PAIRS)for(const bg of bgs){
  n++;const r=ratio(val(fg,theme),val(bg,theme));
  if(r<min){bad++;console.log(`FAIL [${theme}] ${fg} on ${bg}: ${r.toFixed(2)}:1, needs ${min}:1 (${why})`);}
}
console.log(bad?`${bad} of ${n} colour pairs below WCAG AA`:`contrast OK: ${n} colour pairs meet WCAG AA`);
process.exit(bad?1:0);
