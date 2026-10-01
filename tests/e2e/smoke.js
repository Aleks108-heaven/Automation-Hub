#!/usr/bin/env node
// Browser smoke test for the built hub and the component gallery: node tests/e2e/smoke.js
// Covers the accessibility behaviour added in the design pass (skip link, inert drawer,
// arrow-key answers, exam persistence, timer announcements) plus layout and token basics.
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..', '..');
const hub = pathToFileURL(path.join(root, '1-learning-hub', 'automation-hub.html')).href;
const gallery = pathToFileURL(path.join(root, '2-design-system', 'components-gallery.html')).href;
const EXAM_KEY = 'automation-hub.exam.v1';

const results = [];
const errors = [];
const check = (name, ok, extra = '') => results.push({ name, ok: !!ok, extra });
const watch = (page, label) => {
  page.on('pageerror', e => errors.push(`${label} pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(`${label} console: ${m.text()}`); });
};
const setDeadline = (page, ms) => page.evaluate(([k, d]) => {
  const s = JSON.parse(sessionStorage.getItem(k)); s.deadline = Date.now() + d; sessionStorage.setItem(k, JSON.stringify(s));
}, [EXAM_KEY, ms]);

(async () => {
  const browser = await chromium.launch();

  // ---------- desktop
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let p = await ctx.newPage(); watch(p, 'desktop');
  await p.goto(hub);
  check('home has a page title', /Automation Hub$/.test(await p.title()), await p.title());
  await p.goto(hub + '#exams'); await p.waitForTimeout(150);
  check('each view sets its own title', /^Exams/.test(await p.title()), await p.title());

  await p.goto(hub); await p.keyboard.press('Tab');
  check('skip link is the first tab stop', await p.evaluate(() => document.activeElement.id) === 'skip');
  await p.keyboard.press('Enter');
  check('skip link moves focus to main without changing the route',
    await p.evaluate(() => document.activeElement.id === 'main' && location.hash === ''));
  check('--shadow-raised is defined in the hub', (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--shadow-raised'))).length > 5);

  const views = ['', '#playwright', '#quiz', '#flashcards', '#picker', '#checklist', '#path', '#exams', '#resources', '#career'];
  const inline = [];
  for (const v of views) {
    await p.goto(hub + v); await p.waitForTimeout(120);
    const bad = await p.evaluate(() => [...document.querySelectorAll('main [style]')]
      .map(e => e.getAttribute('style')).filter(s => !/^width:[^;]*;?$/.test(s)));
    if (bad.length) inline.push(`${v || 'home'}: ${bad.join(' | ')}`);
  }
  check('no non-dynamic inline styles in any view', inline.length === 0, inline.join(' ; '));

  await p.goto(hub + '#playwright'); await p.waitForTimeout(120);
  await p.locator('#quiz .opt').first().click();
  check('answering a quiz question moves focus to the explanation', await p.evaluate(() => document.activeElement.classList.contains('q__why')));

  // exam: aria, roving tabindex, arrow keys, persistence, timer
  await p.goto(hub + '#exams'); await p.waitForTimeout(120);
  await p.locator('[data-start="final"]').click(); await p.waitForTimeout(250);
  const group = p.locator('.q__opts[role=radiogroup]').first();
  check('radio group is labelled', !!(await group.getAttribute('aria-labelledby')));
  check('unanswered radio group has one tab stop', (await group.locator('.opt[tabindex="0"]').count()) === 1);
  await group.locator('.opt').first().focus();
  await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80);
  check('ArrowDown selects the next option and keeps focus',
    (await p.locator('.q__opts[role=radiogroup]').first().locator('.opt[aria-checked="true"]').getAttribute('data-j')) === '1'
    && await p.evaluate(() => document.activeElement.dataset.j) === '1');
  await p.locator('[data-flag="2"]').click();
  await p.reload(); await p.waitForTimeout(350);
  check('a running exam survives a reload', (await p.locator('.exambar').count()) === 1);
  check('answers and flags survive a reload',
    (await p.locator('.q__opts[role=radiogroup]').first().locator('.opt[aria-checked="true"]').count()) === 1
    && (await p.locator('[data-flag="2"][aria-pressed="true"]').count()) === 1);
  await setDeadline(p, 200 * 1000); await p.reload(); await p.waitForTimeout(1300);
  const timer = (await p.locator('#timer').textContent()).trim();
  check('low timer shows the "!" glyph', timer.startsWith('!'), timer);
  const live = (await p.locator('#live').textContent()).trim();
  check('low time is announced in the live region', /\d/.test(live), live);
  await setDeadline(p, 1500); await p.reload(); await p.waitForTimeout(2800);
  check('expiry auto-submits to the result view', (await p.locator('.result').count()) === 1);
  check('finished exam is cleared from sessionStorage', (await p.evaluate(k => sessionStorage.getItem(k), EXAM_KEY)) === null);
  await p.evaluate(k => sessionStorage.setItem(k, JSON.stringify({ kind: 'final', items: [{ q: '<img src=x onerror=alert(1)>', o: ['a', 'b'], a: 5, t: 'nope', why: 'x' }], ans: {}, flag: {}, start: 1, deadline: 2 })), EXAM_KEY);
  await p.goto(hub + '#exams'); await p.reload(); await p.waitForTimeout(250);
  check('tampered stored exam is ignored', (await p.locator('h1').count()) >= 1 && (await p.locator('img[src=x]').count()) === 0);
  await ctx.close();

  // ---------- mobile
  ctx = await browser.newContext({ viewport: { width: 375, height: 760 }, hasTouch: true, isMobile: true });
  p = await ctx.newPage(); watch(p, 'mobile');
  await p.goto(hub); await p.waitForTimeout(150);
  check('closed drawer is inert', await p.evaluate(() => document.getElementById('side').inert === true));
  await p.locator('#menuBtn').click(); await p.waitForTimeout(250);
  check('open drawer is interactive and the page behind it is inert',
    await p.evaluate(() => document.getElementById('side').inert === false && document.getElementById('content').inert === true));
  check('focus moves into the open drawer', await p.evaluate(() => document.getElementById('side').contains(document.activeElement)));
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  check('Escape closes the drawer and returns focus to Menu',
    await p.evaluate(() => document.activeElement.id === 'menuBtn' && document.getElementById('side').inert === true));
  await p.locator('#menuBtn').click(); await p.waitForTimeout(250);
  await p.locator('#toc a').nth(2).click(); await p.waitForTimeout(350);
  check('choosing a nav link closes the drawer',
    await p.evaluate(() => !document.getElementById('app').classList.contains('nav-open') && document.getElementById('side').inert));
  await p.goto(hub + '#flashcards'); await p.waitForTimeout(150);
  const chip = await p.locator('.chip').first().evaluate(e => e.getBoundingClientRect().height);
  check('touch targets are at least 44px', chip >= 43.5, `chip=${chip}`);
  for (const v of ['', '#exams', '#playwright', '#career']) {
    await p.goto(hub + v); await p.waitForTimeout(120);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`no horizontal scroll at 375px (${v || 'home'})`, over <= 0, `overflow=${over}`);
  }
  await ctx.close();

  // ---------- translated skip link, dark theme, gallery
  ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' });
  p = await ctx.newPage(); watch(p, 'dark');
  await p.goto(hub + '?lang=uk'); await p.waitForTimeout(200);
  check('skip link is translated', (await p.locator('#skip').textContent()).includes('Перейти'));
  check('dark theme defines its own shadow token', (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--shadow-raised'))).includes('0.4'));
  await p.goto(gallery); await p.waitForTimeout(200);
  check('gallery defines --shadow-raised', (await p.evaluate(() => getComputedStyle(document.body).getPropertyValue('--shadow-raised'))).length > 5);
  await ctx.close();
  await browser.close();

  let failed = 0;
  for (const r of results) { if (!r.ok) failed++; console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? '  ' + r.extra : ''}`); }
  if (errors.length) { failed += errors.length; console.log('\nBrowser errors:\n' + errors.join('\n')); }
  console.log(`\n${results.length - results.filter(r => !r.ok).length}/${results.length} checks passed, ${errors.length} browser errors`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
