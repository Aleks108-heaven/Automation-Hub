#!/usr/bin/env node
// Content integrity test: node tests/e2e/integrity.js
// Opens every route of the built hub in all four languages and checks what a reader would trip over:
// console errors, duplicate ids, exactly one h1 with no skipped heading level, controls without a name,
// in-page links that point nowhere, and horizontal scrolling at 320 CSS px (WCAG 1.4.10 Reflow).
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const hub = pathToFileURL(path.join(__dirname, '..', '..', '1-learning-hub', 'automation-hub.html')).href;
const LANGS = ['en', 'uk', 'pl', 'es'];
const problems = [];
const add = (lang, route, msg) => problems.push(`${lang} #${route || 'home'}: ${msg}`);

(async () => {
  const browser = await chromium.launch();
  let pages = 0;
  for (const lang of LANGS) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const p = await ctx.newPage();
    p.on('pageerror', e => add(lang, '', `pageerror: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_/.test(m.text())) add(lang, '', `console: ${m.text()}`); });
    await p.goto(`${hub}?lang=${lang}`);
    const routes = await p.evaluate(() => [...MODULES.map(m => m.id), 'quiz', 'flashcards', 'picker', 'exams', 'checklist', 'path', 'resources', 'career', 'exam-final', ...TRACKS.map(t => 'exam-' + t.id), '']);
    const valid = new Set(routes.concat('home'));

    for (const r of routes) {
      await p.goto(`${hub}?lang=${lang}#${r}`); await p.waitForTimeout(50);
      const res = await p.evaluate(() => {
        const ids = {}; document.querySelectorAll('[id]').forEach(e => { ids[e.id] = (ids[e.id] || 0) + 1; });
        const levels = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map(h => +h.tagName[1]);
        let skipped = false, prev = 0; levels.forEach(l => { if (prev && l > prev + 1) skipped = true; prev = l; });
        const name = e => (e.getAttribute('aria-label') || e.textContent || e.getAttribute('title') || '').trim();
        const unnamed = [...document.querySelectorAll('main button, main a[href], main input, main select')]
          .filter(e => e.tagName === 'INPUT' ? !(e.labels && e.labels.length) && !e.getAttribute('aria-label') : !name(e)).length;
        return {
          dup: Object.keys(ids).filter(k => ids[k] > 1), h1: levels.filter(l => l === 1).length, skipped, unnamed,
          links: [...document.querySelectorAll('main a[href^="#"]')].map(a => a.getAttribute('href').slice(1)),
        };
      });
      pages++;
      if (res.dup.length) add(lang, r, `duplicate ids: ${res.dup.join(', ')}`);
      if (res.h1 !== 1) add(lang, r, `${res.h1} h1 elements`);
      if (res.skipped) add(lang, r, 'heading level skipped');
      if (res.unnamed) add(lang, r, `${res.unnamed} control(s) without an accessible name`);
      res.links.filter(l => l && l !== 'main' && !valid.has(l)).forEach(l => add(lang, r, `link to unknown route #${l}`));
    }
    await ctx.close();

    const narrow = await browser.newContext({ viewport: { width: 320, height: 700 } });
    const q = await narrow.newPage();
    for (const r of routes) {
      await q.goto(`${hub}?lang=${lang}#${r}`); await q.waitForTimeout(30);
      const over = await q.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 0) add(lang, r, `horizontal scroll at 320px (+${over}px)`);
    }
    await narrow.close();
  }
  await browser.close();

  if (problems.length) console.log(problems.join('\n'));
  console.log(problems.length ? `\n${problems.length} problem(s) across ${pages} pages` : `integrity OK: ${pages} pages in ${LANGS.length} languages (${pages * 2} incl. 320px reflow checks)`);
  process.exit(problems.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
