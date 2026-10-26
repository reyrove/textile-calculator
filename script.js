/* =========================================================
   Textile Calculator — script.js

   Each section is a small pure function plus a thin DOM
   wrapper. Formulas are stated in index.html under each
   section heading and repeated as comments here so the
   code and the page cannot drift apart.

   All results are announced via role="status" so screen
   readers hear them. Each form handles its own submit,
   so Enter only triggers the section the user is in.
   ========================================================= */

'use strict';

/* ---------- Helpers ---------- */

/** Read a numeric input; return NaN if empty or invalid. */
function readNumber(id) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  const v = el.value.trim();
  if (v === '') return NaN;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

/** Format a number to two decimals, trimming trailing zeros. */
function fmt(n, decimals = 2) {
  return Number(n.toFixed(decimals)).toString();
}

/** Write a result line and add a copy button. */
function setResult(id, text) {
  const el = document.getElementById(id);
  if (!el) return;

  if (!text) {
    el.textContent = '';
    return;
  }

  el.textContent = text;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  btn.setAttribute('aria-label', 'Copy result to clipboard');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'copied';
      setTimeout(() => { btn.textContent = 'copy'; }, 1200);
    } catch {
      btn.textContent = 'failed';
      setTimeout(() => { btn.textContent = 'copy'; }, 1200);
    }
  });
  el.appendChild(document.createTextNode(' '));
  el.appendChild(btn);
}

/** Show a validation message in a result region. */
function setError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
}

/* =========================================================
   Pure calculation functions
   ========================================================= */

/** GSM = weight (g) / area (m²) */
function calcGSM(weight, area) {
  if (!Number.isFinite(weight) || !Number.isFinite(area) || area <= 0) return null;
  return weight / area;
}

/** denier = 9 × tex · tex = denier ÷ 9 */
function calcDenierTex(value, direction) {
  if (!Number.isFinite(value) || value < 0) return null;
  return direction === 'denierToTex' ? value / 9 : value * 9;
}

/** thread count = warp + weft */
function calcThreadCount(warp, weft) {
  if (!Number.isFinite(warp) || !Number.isFinite(weft)) return null;
  if (warp < 0 || weft < 0) return null;
  return warp + weft;
}

/** total cost = GSM × area × cost per gram */
function calcCost(gsm, area, costPerGram) {
  if (![gsm, area, costPerGram].every(Number.isFinite)) return null;
  if (gsm < 0 || area < 0 || costPerGram < 0) return null;
  return gsm * area * costPerGram;
}

/** Nm = Ne × 1.693 · Ne = Nm ÷ 1.693 */
const NE_TO_NM = 1.693;
function calcYarnCount(value, direction) {
  if (!Number.isFinite(value) || value < 0) return null;
  return direction === 'neToNm' ? value * NE_TO_NM : value / NE_TO_NM;
}

/* =========================================================
   Form handlers
   ========================================================= */

function initGSM() {
  const form = document.getElementById('gsmForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const weight = readNumber('fabricWeight');
    const area   = readNumber('fabricArea');

    if (Number.isNaN(weight) || Number.isNaN(area)) {
      setError('gsmResult', 'Enter a numeric weight and area.');
      return;
    }
    if (area <= 0) {
      setError('gsmResult', 'Area must be greater than zero.');
      return;
    }

    const gsm = calcGSM(weight, area);
    setResult('gsmResult', `GSM: ${fmt(gsm)} g/m²`);
  });
}

function initDenier() {
  const form = document.getElementById('denierForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value     = readNumber('inputValue');
    const direction = document.getElementById('conversionType').value;

    if (Number.isNaN(value)) {
      setError('conversionResult', 'Enter a numeric value.');
      return;
    }

    const converted = calcDenierTex(value, direction);
    const from = direction === 'denierToTex' ? 'denier' : 'tex';
    const to   = direction === 'denierToTex' ? 'tex'    : 'denier';
    setResult('conversionResult', `${fmt(value)} ${from} = ${fmt(converted)} ${to}`);
  });
}

function initThreadCount() {
  const form = document.getElementById('threadForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const warp = readNumber('warpDensity');
    const weft = readNumber('weftDensity');

    if (Number.isNaN(warp) || Number.isNaN(weft)) {
      setError('threadCountResult', 'Enter numeric warp and weft densities.');
      return;
    }

    const tc = calcThreadCount(warp, weft);
    setResult('threadCountResult', `Thread count: ${fmt(tc, 0)} threads/inch`);
  });
}

function initCost() {
  const form = document.getElementById('costForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const gsm    = readNumber('gsmCost');
    const area   = readNumber('costArea');
    const perGram = readNumber('costPerGram');

    if ([gsm, area, perGram].some(Number.isNaN)) {
      setError('costResult', 'Enter valid GSM, area, and cost per gram.');
      return;
    }

    const total = calcCost(gsm, area, perGram);
    setResult('costResult', `Estimated cost: $${fmt(total)}`);
  });
}

function initYarnCount() {
  const form = document.getElementById('yarnForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value     = readNumber('yarnInput');
    const direction = document.getElementById('yarnType').value;

    if (Number.isNaN(value)) {
      setError('yarnResult', 'Enter a numeric yarn count.');
      return;
    }

    const converted = calcYarnCount(value, direction);
    const from = direction === 'neToNm' ? 'Ne' : 'Nm';
    const to   = direction === 'neToNm' ? 'Nm' : 'Ne';
    setResult('yarnResult', `${fmt(value)} ${from} = ${fmt(converted)} ${to}`);
  });
}

/* =========================================================
   Boot
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initGSM();
  initDenier();
  initThreadCount();
  initCost();
  initYarnCount();
});