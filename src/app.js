(() => {
'use strict';
/* ═════════ Cierres: entrenador de ventas conversado por voz y por escrito ═════════ */
const D = window.DOJO;
const LESSONS = D.LESSONS;
const LES = Object.fromEntries(LESSONS.map(l => [l.id, l]));
const TIPO = Object.fromEntries(D.TIPOS.map(t => [t.id, t]));
const MODS = D.MODULES;
const DEMO = Object.fromEntries(D.DEMOS.map(d => [d.id, d]));
const EST = D.ESTILOS;
const IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');
const HAS_SDK = !!(window.AnthropicSDK && window.AnthropicSDK.default);
const APP_URL = 'https://claude.ai/artifact/XZ3gxaQNyCu471ffoSP9MU';
const INSTALL_URL = 'https://sr011224.github.io/desktop-tutorial/';
const MODELS = [['claude-opus-5-5', 'Claude Opus 5.5 (recomendado)'], ['claude-sonnet-5-5', 'Claude Sonnet 5.5'], ['claude-haiku-5-5', 'Claude Haiku 5.5 (el más económico)']];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const dayKey = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lsSet = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} };
const addU = (arr, x) => { if (!arr.includes(x)) arr.push(x); };
const fecha = t => { try { return new Date(t).toLocaleDateString('es', { day: 'numeric', month: 'short' }); } catch (e) { return ''; } };

/* ───────── estado y guardado ───────── */
const KEY = 'cierres.v2', KKEY = 'cierres.apikey';
const DEF = () => ({ rev: 0, prod: '', me: '', estilo: 'dey', unlockAll: false, modDone: {}, lesDone: {}, demoSeen: {}, chats: [], nums: {}, voz: { on: true, rate: 1, pick: {} }, pausa: true, manos: true, model: 'claude-opus-5-5', gratis: true, gemTier: 'lite', cfg: {} });
function load() {
  try {
    const raw = lsGet(KEY);
    if (raw) { const s = Object.assign(DEF(), JSON.parse(raw)); s.voz = Object.assign(DEF().voz, s.voz || {}); return s; }
    const old = JSON.parse(lsGet('dojo-cierres.v1') || 'null');
    if (old) { const s = DEF(); s.prod = old.prod || ''; s.nums = old.nums || {}; s.me = old.me || ''; return s; }
  } catch (e) {}
  return DEF();
}
let S = load();
const ser = o => JSON.stringify(o, (k, v) => (k[0] === '_' ? undefined : v));
function localSave() { lsSet(KEY, ser(S)); }
let cloudDoc = null, cloudBusy = false, cloudDirty = false, cloudT = 0;
function save() { S.rev = Date.now(); localSave(); if (cloudDoc) { cloudDirty = true; clearTimeout(cloudT); cloudT = setTimeout(flush, 1500); } }
function forCloud() {
  const c = JSON.parse(ser(S));
  while (JSON.stringify(c).length > 200000 && c.chats.length) c.chats.pop();
  return c;
}
async function flush() {
  if (!cloudDoc || cloudBusy) return;
  cloudBusy = true; cloudDirty = false;
  try { await cloudDoc.set(forCloud()); } catch (e) { if (e && e.code !== 'unavailable') cloudDoc = null; }
  cloudBusy = false;
  if (cloudDirty && cloudDoc) { clearTimeout(cloudT); cloudT = setTimeout(flush, 1500); }
}
async function pull() {
  if (!cloudDoc || cloudDirty || cloudBusy) return;
  try {
    const snap = await cloudDoc.get();
    const r = snap.exists ? snap.data() : null;
    if (r && Number(r.rev) > S.rev) { S = Object.assign(DEF(), JSON.parse(JSON.stringify(r))); localSave(); if (!stack.length) render(); }
    else if (S.rev > 0 && (!r || S.rev > Number(r.rev))) { cloudDirty = true; flush(); }
  } catch (e) {}
}
async function initCloud() {
  try {
    if (!IN_CLAUDE) return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    cloudDoc = db.doc('data/users/' + id + '/cierres');
    await pull();
  } catch (e) { cloudDoc = null; }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) pull(); else save(); });

/* ───────── capacidades del lugar donde corre ───────── */
const caps = { ready: false, sample: null, tts: null, dict: null, perm: null };
let aiOff = false, ttsOff = false, micOff = false, dictLang = true;
const WebRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const SYN = ('speechSynthesis' in window) ? window.speechSynthesis : null;
const capP = (async () => {
  await null; /* espera a que termine de cargar el script antes de tocar el estado */
  if (IN_CLAUDE) {
    const c = window.claude;
    const [s, t, d, p] = await Promise.all(['sample', 'tts', 'dictation', 'permissions'].map(n => c.use(n).catch(() => null)));
    Object.assign(caps, { sample: s, tts: t, dict: d, perm: p });
  }
  caps.ready = true;
  if (caps.dict) wireDict();
  refreshStatus();
})();
const GKEY = 'cierres.gemkey';
const apiKey = () => (lsGet(KKEY) || '').trim();
const gemKey = () => (lsGet(GKEY) || '').trim();
/* La app instalada puede usar: tu clave de Claude (de pago), tu clave gratis de Gemini o la IA gratis sin clave. */
const aiKind = () => (caps.sample && !aiOff) ? 'claude' : !HAS_SDK ? null : apiKey() ? 'api' : gemKey() ? 'gemini' : S.gratis !== false ? 'gratis' : null;
const canSpeak = () => !!(caps.tts && !ttsOff) || !!SYN;
const canMic = () => !micOff && (!!caps.dict || !!WebRec);
function aiStatus() {
  const k = aiKind();
  if (k === 'claude') return { on: true, t: 'IA activa con tu cuenta de Claude' };
  if (k === 'api') return { on: true, t: 'IA activa con tu clave · ' + ((MODELS.find(m => m[0] === S.model) || MODELS[0])[1]).replace(/ \(.*\)/, '') };
  if (k === 'gemini') return { on: true, t: 'IA activa con Gemini de Google (gratis)' };
  if (k === 'gratis') return { on: true, t: 'IA gratis activa, sin clave' };
  if (!caps.ready) return { on: false, t: 'Conectando…' };
  if (HAS_SDK) return { on: false, t: 'Activa la IA en Perfil para conversar (hay opciones gratis)' };
  if (IN_CLAUDE && aiOff) return { on: false, t: 'La IA está desactivada para esta página' };
  return { on: false, t: 'Aquí no está disponible la IA de Claude' };
}

/* ───────── voz que habla (cola por frases) ───────── */
let synthVoices = [];
function loadVoices() { if (!SYN) return; try { synthVoices = SYN.getVoices().filter(v => /^es/i.test(v.lang)); } catch (e) {} }
if (SYN) { loadVoices(); try { SYN.addEventListener('voiceschanged', () => { loadVoices(); if (curView === 'perfil' && !stack.length) render(); }); } catch (e) {} }
const rankV = v => { const l = v.lang.toLowerCase().replace('_', '-'); return (l === 'es-mx' ? 0 : l === 'es-us' ? 1 : /es-(419|co|ar|cl|pe|ve)/.test(l) ? 2 : l === 'es-es' ? 3 : 4) + (/premium|enhanced|mejorada|natural|neural/i.test(v.name) ? -2.5 : /google|online/i.test(v.name) ? -0.5 : 0); };
function synthVoice(role) {
  const want = S.voz.pick[role];
  const v = want && synthVoices.find(x => x.voiceURI === want); if (v) return v;
  const sorted = synthVoices.slice().sort((a, b) => rankV(a) - rankV(b));
  if (!sorted.length) return null;
  return role === 'cli' && sorted.length > 1 ? sorted[1] : sorted[0];
}
const CLI_V = { sanguineo: [1.1, 1.15], colerico: [1.07, 0.9], flematico: [0.92, 0.9], melancolico: [0.95, 1.1] };
function voiceParams(role, ctx) {
  const e = EST[(ctx && ctx.estilo) || S.estilo] || EST.dey;
  if (role === 'cli') { const tp = ctx && TIPO[ctx.tipo]; const P = (ctx && CLI_V[ctx.tipo]) || [1, 1.05]; return { tts: tp ? tp.voz : 'airy', rate: P[0], pitch: P[1] }; }
  return { tts: e.voz, rate: e.rate, pitch: e.pitch };
}
let spGen = 0, spQ = [], spRun = false, spIdle = [];
function chunks(text) {
  const parts = String(text).replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…]+["»”)]*\s*|[^.!?…]+$/g) || [];
  const out = []; let cur = '';
  for (const p of parts) { if ((cur + p).length > 210 && cur) { out.push(cur.trim()); cur = p; } else cur += p; }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function say(text, role, ctx, force) {
  if (!text || (!S.voz.on && !force) || !canSpeak()) return;
  const g = spGen;
  if (caps.tts && !ttsOff) spQ.push({ t: String(text).slice(0, 1900), role, ctx, g });
  else chunks(text).forEach(t => spQ.push({ t, role, ctx, g }));
  pump();
}
async function pump() {
  if (spRun) return;
  spRun = true; setSpeaking(true);
  while (spQ.length) { const it = spQ.shift(); if (it.g !== spGen) continue; await speakOne(it); }
  spRun = false; setSpeaking(false);
  const f = spIdle; spIdle = []; f.forEach(x => x());
}
const whenQuiet = () => new Promise(r => (spRun || spQ.length) ? spIdle.push(r) : r());
function hush() { spGen++; spQ = []; try { if (caps.tts) caps.tts.stop().catch(() => {}); if (SYN) SYN.cancel(); } catch (e) {} }
function speakOne(it) {
  const p = voiceParams(it.role, it.ctx), rate = S.voz.rate || 1;
  return new Promise(done => {
    let fin = false, tm = 0;
    const end = () => { if (!fin) { fin = true; clearTimeout(tm); done(); } };
    tm = setTimeout(end, 4000 + it.t.length * 110 / rate);
    if (caps.tts && !ttsOff) {
      caps.tts.speak(it.t, { voice: p.tts, language: 'es', rate: Math.max(0.7, Math.min(1.5, rate * p.rate)) }).then(end, e => { if (e && (e.code === 'not_granted' || e.code === 'unavailable')) ttsOff = true; end(); });
      return;
    }
    try {
      const u = new SpeechSynthesisUtterance(it.t); const v = synthVoice(it.role);
      u.lang = v ? v.lang : 'es-MX'; if (v) u.voice = v;
      u.rate = Math.max(0.6, Math.min(1.6, rate * p.rate)); u.pitch = p.pitch;
      u.onend = end; u.onerror = end; SYN.speak(u);
    } catch (e) { end(); }
  });
}
function setSpeaking(v) { document.body.toggleAttribute('data-speaking', v); }
let primed = false;
document.addEventListener('pointerdown', () => { if (primed || !SYN || caps.tts) return; primed = true; try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; SYN.speak(u); } catch (e) {} }, { capture: true });

/* ───────── micrófono ───────── */
let listening = false, micCb = null, micBox = null, silT = 0, rec = null;
function wireDict() {
  caps.dict.onFinal(({ text }) => { const t = micBox && document.getElementById(micBox); if (t) { t.value = t.value ? t.value + text : text.replace(/^\s+/, ''); grow(t); } setPartial(''); armSilence(); });
  caps.dict.onPartial(({ text }) => { setPartial(text); if (text) clearTimeout(silT); });
  caps.dict.onState(({ state, reason }) => { setListening(state !== 'idle'); if (state === 'idle') { clearTimeout(silT); if (reason === 'not_granted') { micOff = true; refreshStatus(); } } });
}
function armSilence() { clearTimeout(silT); if (!S.pausa || !micCb) return; silT = setTimeout(() => { if (listening && caps.dict) caps.dict.stop().then(finishMic, finishMic); }, 1600); }
function finishMic() { const cb = micCb; micCb = null; if (cb) cb(); }
function setPartial(t) { const p = $('#partial'); if (p) p.textContent = t || ''; }
function setListening(v) { listening = v; document.body.toggleAttribute('data-listening', v); if (!v) setPartial(''); }
function micStart(boxId, onDone) {
  micBox = boxId; micCb = onDone || null; hush();
  if (caps.dict && !micOff) {
    caps.dict.start(dictLang ? { language: 'es' } : undefined).catch(e => {
      const c = e && e.code; micCb = null;
      if (c === 'unavailable' && dictLang) { dictLang = false; toast('El dictado en español no está disponible aquí. Toca otra vez para usar el idioma de tu cuenta.'); }
      else if (c === 'not_granted' || c === 'unavailable') { micOff = true; refreshStatus(); keyboardTip(boxId); }
      else if (c === 'rate_limited' || c === 'upstream_error') toast('El micrófono falló. Intenta otra vez.');
    });
    return true;
  }
  if (!WebRec || micOff) { keyboardTip(boxId); return false; }
  try {
    const box = document.getElementById(boxId), base = box ? box.value.trim() : '';
    const r = rec = new WebRec(); let finals = '';
    r.lang = 'es-MX'; r.interimResults = true; r.continuous = !S.pausa; r.maxAlternatives = 1;
    r.onresult = ev => {
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) { const res = ev.results[i]; if (res.isFinal) finals += (finals ? ' ' : '') + res[0].transcript.trim(); else interim += res[0].transcript; }
      const t = document.getElementById(boxId); if (t) { t.value = (base ? base + ' ' : '') + finals; grow(t); }
      setPartial(interim);
    };
    r.onerror = ev => { if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') { micOff = true; refreshStatus(); keyboardTip(boxId); } };
    r.onend = () => { if (rec === r) rec = null; setListening(false); if (r._cancel) { micCb = null; return; } finishMic(); };
    r.start(); setListening(true);
    return true;
  } catch (e) { return false; }
}
function micStop(send) { clearTimeout(silT); if (caps.dict && listening) caps.dict.stop().then(send ? finishMic : () => { micCb = null; }, () => {}); else if (rec) { if (!send) rec._cancel = true; try { rec.stop(); } catch (e) {} } }
function keyboardTip(boxId) { const t = document.getElementById(boxId); if (t) t.focus(); toast('Aquí la página no puede usar el micrófono: toca el micrófono de tu teclado y habla.'); }
function grow(t) { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 160) + 'px'; }

/* ───────── IA: Claude de tu cuenta (en claude.ai) o tu clave de API (app instalada) ───────── */
let sdkClient = null, sdkKey = '';
const mergeTurns = turns => { const out = []; for (const t of turns) { const last = out[out.length - 1]; if (last && last.role === t.role) last.content += '\n' + t.content; else out.push({ role: t.role, content: t.content }); } if (!out.length || out[0].role !== 'user') out.unshift({ role: 'user', content: 'Empieza.' }); return out; };
function mapApiErr(e) {
  const A = HAS_SDK ? window.AnthropicSDK.default : null;
  if (e && e.code && !(A && e instanceof A.APIError)) return e;
  if (A) {
    if (e instanceof A.APIUserAbortError) return { code: 'cancelled' };
    if (e instanceof A.AuthenticationError || e instanceof A.PermissionDeniedError) return { code: 'bad_key' };
    if (e instanceof A.RateLimitError) return { code: 'rate_limited' };
    if (e instanceof A.NotFoundError) return { code: 'bad_model' };
    if (e instanceof A.BadRequestError) return { code: 'bad_request', message: e.message };
    if (e instanceof A.APIConnectionError) return { code: 'offline' };
    if (e instanceof A.APIError) return { code: 'upstream_error', message: e.message };
  }
  if (e && e.name === 'AbortError') return { code: 'cancelled' };
  return { code: 'upstream_error' };
}
/* Lectura de respuestas que llegan por partes (server-sent events) */
const sleep = (ms, signal) => new Promise((ok, no) => { const t = setTimeout(ok, ms); if (signal) signal.addEventListener('abort', () => { clearTimeout(t); no({ code: 'cancelled' }); }, { once: true }); });
const netErr = e => (e && (e.name === 'AbortError' || e.code === 'cancelled')) ? { code: 'cancelled' } : (e && e.code) ? e : { code: 'offline' };
async function* sseData(res) {
  const rd = res.body.getReader(), dec = new TextDecoder(); let buf = '';
  try {
    for (;;) {
      const { value, done } = await rd.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i).replace(/\r$/, ''); buf = buf.slice(i + 1); if (line.startsWith('data:')) yield line.slice(5).trim(); }
    }
    buf += dec.decode();
    if (buf.startsWith('data:')) yield buf.slice(5).trim();
  } finally { try { rd.releaseLock(); } catch (e) {} }
}

/* Gemini de Google: clave gratis de aistudio.google.com. Busca solo el mejor modelo Flash disponible para tu clave. */
const GEM = 'https://generativelanguage.googleapis.com/v1beta/';
let gemList = null, gemListKey = '';
const gemNoThink = {};
async function gemErr(r) {
  let msg = ''; try { const j = await r.json(); msg = (j.error && j.error.message) || ''; } catch (e) {}
  if (r.status === 401 || r.status === 403 || (r.status === 400 && /api.?key/i.test(msg))) return { code: 'bad_key', message: msg };
  if (r.status === 429) return { code: 'rate_limited', message: msg };
  if (r.status === 404) return { code: 'bad_model', message: msg };
  if (r.status === 400) return { code: 'bad_request', message: msg };
  return { code: 'upstream_error', message: msg };
}
async function gemModels(key, signal) {
  if (gemList && gemListKey === key) return gemList;
  let r;
  try { r = await fetch(GEM + 'models?pageSize=1000', { headers: { 'x-goog-api-key': key }, signal }); } catch (e) { throw netErr(e); }
  if (!r.ok) { const er = await gemErr(r); if (er.code === 'bad_key') throw er; return { lite: ['gemini-flash-lite-latest', 'gemini-2.5-flash-lite'], full: ['gemini-flash-latest', 'gemini-2.5-flash'] }; }
  const j = await r.json().catch(() => ({}));
  const names = (j.models || []).filter(m => (m.supportedGenerationMethods || []).includes('generateContent')).map(m => String(m.name || '').replace(/^models\//, ''))
    .filter(n => /^gemini-/.test(n) && /flash/.test(n) && !/tts|image|live|audio|embed|vision|thinking|exp|robotics|computer|learnlm|8b/.test(n));
  const ver = n => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
  const score = n => (/-latest$/.test(n) ? 100 : 0) + ver(n) * 10 - (/preview/.test(n) ? 3 : 0) - (/-\d{3}$|\d{2}-\d{2,4}$/.test(n) ? 1 : 0);
  const sort = a => a.sort((x, y) => score(y) - score(x));
  gemList = { lite: sort(names.filter(n => /lite/.test(n))), full: sort(names.filter(n => !/lite/.test(n))) };
  if (!gemList.lite.length && !gemList.full.length) gemList = { lite: ['gemini-flash-lite-latest'], full: ['gemini-flash-latest'] };
  gemListKey = key;
  return gemList;
}
async function gemStream(system, turns, { onText, signal, maxTokens }) {
  const key = gemKey(), L = await gemModels(key, signal);
  const order = (S.gemTier === 'full' ? [L.full[0], L.lite[0], L.full[1]] : [L.lite[0], L.full[0], L.lite[1]]).filter(Boolean);
  const contents = mergeTurns(turns).map(t => ({ role: t.role === 'assistant' ? 'model' : 'user', parts: [{ text: t.content }] }));
  let last = { code: 'upstream_error' };
  for (const model of order) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const gc = { maxOutputTokens: Math.max(maxTokens, 2048), temperature: 0.9 };
      if (!gemNoThink[model]) gc.thinkingConfig = { thinkingBudget: 0 };
      let r;
      try { r = await fetch(GEM + 'models/' + model + ':streamGenerateContent?alt=sse', { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: gc }), signal }); } catch (e) { throw netErr(e); }
      if (!r.ok) {
        last = await gemErr(r);
        if (last.code === 'bad_key') throw last;
        if (last.code === 'bad_request' && gc.thinkingConfig) { gemNoThink[model] = true; continue; }
        if (last.code === 'upstream_error' && attempt < 2) { await sleep(1500, signal); continue; }
        if (last.code === 'bad_model') gemList = null;
        break;
      }
      let acc = '', blocked = false;
      try {
        for await (const d of sseData(r)) {
          let j; try { j = JSON.parse(d); } catch (e) { continue; }
          if (j.promptFeedback && j.promptFeedback.blockReason) blocked = true;
          const c = j.candidates && j.candidates[0];
          for (const pt of (c && c.content && c.content.parts) || []) if (pt.text && !pt.thought) acc += pt.text;
          if (c && /SAFETY|PROHIBITED|BLOCKLIST|SPII/.test(c.finishReason || '')) blocked = true;
          if (onText && acc) onText(acc);
        }
      } catch (e) { throw netErr(e); }
      if (acc) return acc;
      if (blocked) throw { code: 'refused' };
      last = { code: 'upstream_error' };
      if (attempt < 2) continue;
      break;
    }
  }
  throw last;
}

/* IA gratis sin clave: servicio público de Pollinations (sin registro). Puede ir lento cuando hay mucha gente. */
const FREE_URL = 'https://text.pollinations.ai/openai';
let freeLast = 0, freeModel = true;
const freeClean = t => String(t).replace(/<think>[\s\S]*?(<\/think>|$)/gi, '').replace(/\n\s*-{3,}[\s\S]*$/, '').split('\n').filter(l => !/pollinations|sponsor|patrocinad|🌸/i.test(l)).join('\n');
async function freeStream(system, turns, { onText, signal }) {
  const messages = [{ role: 'system', content: system }, ...mergeTurns(turns)];
  for (let attempt = 0; attempt < 4; attempt++) {
    const wait = freeLast + 2500 - Date.now(); if (wait > 0) await sleep(wait, signal);
    freeLast = Date.now();
    const body = { messages, stream: true, private: true, referrer: 'cierres-app' };
    if (freeModel) body.model = 'openai';
    let r;
    try { r = await fetch(FREE_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal }); }
    catch (e) { const er = netErr(e); if (er.code === 'cancelled') throw er; if (attempt < 2) { await sleep(2500, signal); continue; } throw { code: 'free_down' }; }
    if (r.status === 400 && freeModel) { freeModel = false; continue; }
    if (r.status === 429 || r.status >= 500) {
      if (attempt < 3) { if (attempt === 0) toast('La IA gratis está ocupada. Reintento en unos segundos…'); await sleep(r.status === 429 ? 8000 : 3000, signal); continue; }
      throw { code: r.status === 429 ? 'free_busy' : 'free_down' };
    }
    if (!r.ok) throw { code: 'free_down' };
    let acc = '';
    try {
      if (/event-stream/i.test(r.headers.get('content-type') || '')) {
        for await (const d of sseData(r)) {
          if (d === '[DONE]') break;
          let j; try { j = JSON.parse(d); } catch (e) { continue; }
          const c = j.choices && j.choices[0], t = c && ((c.delta && c.delta.content) || (c.message && c.message.content));
          if (t) { acc += t; if (onText) onText(freeClean(acc)); }
        }
      } else {
        const txt = await r.text();
        try { const j = JSON.parse(txt); acc = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || ''; } catch (e) { acc = txt; }
        if (onText) onText(freeClean(acc));
      }
    } catch (e) { throw netErr(e); }
    acc = freeClean(acc).trim();
    if (acc) return acc;
    if (attempt < 3) continue;
  }
  throw { code: 'free_down' };
}

async function aiStream(system, turns, { onText, signal, effort = 'low', tier = 'default', maxTokens = 4000, kind: force } = {}) {
  await capP;
  const kind = force || aiKind();
  if (!kind) throw { code: 'no_ai' };
  if (kind === 'gemini') {
    try { return await gemStream(system, turns, { onText, signal, maxTokens }); }
    catch (e) {
      if (!force && e && (e.code === 'rate_limited' || e.code === 'upstream_error') && S.gratis !== false) { toast(e.code === 'rate_limited' ? 'Se acabó por ahora el cupo gratis de Gemini. Sigo con la IA gratis.' : 'Gemini no respondió. Sigo con la IA gratis.'); return freeStream(system, turns, { onText, signal }); }
      throw e;
    }
  }
  if (kind === 'gratis') return freeStream(system, turns, { onText, signal });
  if (kind === 'claude') {
    const input = [{ role: 'user', content: system + (turns.length ? '' : '\n\nEmpieza tú ahora.') }, ...turns];
    if (input[input.length - 1].role !== 'user') input.push({ role: 'user', content: '(Continúa.)' });
    try {
      const r = await caps.sample(input, { cache: false, signal, modelTier: tier, onText: onText ? ({ text }) => onText(text) : undefined });
      return r.text;
    } catch (e) {
      if (e && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled'].includes(e.code)) { aiOff = true; refreshStatus(); }
      throw e || { code: 'upstream_error' };
    }
  }
  const A = window.AnthropicSDK.default;
  if (!sdkClient || sdkKey !== apiKey()) { sdkKey = apiKey(); sdkClient = new A({ apiKey: sdkKey, dangerouslyAllowBrowser: true, maxRetries: 2 }); }
  let acc = '';
  try {
    const stream = sdkClient.messages.stream({
      model: S.model || 'claude-opus-5-5', max_tokens: maxTokens,
      system, messages: mergeTurns(turns),
      output_config: { effort }, cache_control: { type: 'ephemeral' }
    }, { signal });
    for await (const ev of stream) {
      if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') { acc += ev.delta.text; if (onText) onText(acc); }
    }
    const fin = await stream.finalMessage();
    if (fin.stop_reason === 'refusal') throw { code: 'refused' };
    return acc;
  } catch (e) { throw mapApiErr(e); }
}
function parseJSON(t) { try { return JSON.parse(t); } catch (e) {} const a = t.indexOf('{'), b = t.lastIndexOf('}'); if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) {} } throw { code: 'invalid_json' }; }
async function aiJSON(prompt, effort = 'medium') { return parseJSON(await aiStream('Respondes sólo con un objeto JSON válido, sin texto antes ni después.', [{ role: 'user', content: prompt }], { effort, tier: 'default' })); }
const errMsg = (code, msg) => ({
  no_ai: 'La IA no está conectada aquí. Revisa Perfil → IA.',
  free_busy: 'La IA gratis está saturada en este momento. Espera un minuto, o conecta Gemini gratis en Perfil → IA para que sea más estable.',
  free_down: 'La IA gratis no respondió. Revisa tu internet, o conecta Gemini gratis en Perfil → IA (toma 2 minutos).',
  cancelled: 'Cancelado.',
  bad_key: 'Tu clave de API no funciona. Revísala en Perfil → IA.',
  bad_model: 'Ese modelo no está disponible para tu clave. Cambia el modelo en Perfil → IA.',
  bad_request: 'La IA rechazó la solicitud' + (msg ? ': ' + msg : '.'),
  offline: 'Sin conexión a internet. Revisa tu señal e intenta de nuevo.',
  rate_limited: 'Llegaste al límite de uso gratis por ahora. Espera un rato, o activa la IA gratis sin clave en Perfil → IA.',
  session_expired: 'Tu sesión de Claude expiró. Vuelve a iniciar sesión.',
  refused: 'La IA no quiso responder a eso. Cambia la frase e intenta de nuevo.',
  not_granted: 'La IA no está permitida en esta página. Toca «Revisar permisos» en Perfil.',
  invalid_json: 'La respuesta llegó incompleta. Intenta otra vez.'
}[code] || 'Hubo un problema de conexión con la IA. Intenta otra vez.');

/* ───────── prompts ───────── */
const VOZ = 'Esto es una conversación por voz: responde como se habla, con frases cortas y naturales. No uses markdown, viñetas, asteriscos, numeraciones con símbolos, encabezados ni emojis. Español latino.';
const ETICA = 'Nunca digas que eres Alex Dey ni Brian Tracy y no inventes frases textuales suyas: eres una IA que enseña y vende con sus métodos. Vende con ética: nada de mentiras ni urgencias falsas.';
const kbShort = () => LESSONS.map(l => `• ${l.n} (${l.src}): ${l.f.join(' ')} Ejemplo: «${l.resp[0].m}»`).join('\n');
const kbTipos = () => D.TIPOS.map(t => `• ${t.n} (${t.eje}): ${t.senal} Quiere: ${t.quiere} Cómo presentarle: ${t.presenta} Cierres: ${t.cierres.map(c => LES[c].n).join(', ')}. Lo espanta: ${t.espanta}`).join('\n');
const kbLesson = l => `■ ${l.n} (${l.src})\nIdea: ${l.idea}\nPasos: ${l.f.join(' ')}\nFrases: ${l.fr.map(x => '«' + x + '»').join(' ')}\nError común: ${l.err}\nEjemplo: ${l.resp[0].cl ? 'cliente «' + l.resp[0].cl + '» → ' : ''}«${l.resp[0].m}»`;
const techNames = () => LESSONS.filter(l => l.k !== 'post').map(l => l.n.replace(/[«»]/g, '')).join(', ');
const ETAPA = {
  cierre: ['Cerrar la venta', 'Ya escuchaste la presentación del vendedor y te interesó a medias. Ahora él intenta cerrar la venta.'],
  cita: ['Conseguir la cita', 'El vendedor te llama por teléfono en frío para pedirte una cita. No lo conoces y estás ocupado.'],
  completa: ['Cita completa', 'El vendedor acaba de llegar a su cita contigo. Empieza desde el saludo; todavía no sabes bien qué ofrece.']
};
const DIF = {
  facil: ['Fácil', 'Pon una sola objeción y cede cuando el vendedor responda de forma razonable.'],
  normal: ['Normal', 'Pon dos o tres objeciones distintas, una a la vez. Cede sólo ante buenas respuestas.'],
  dificil: ['Difícil', 'Pon al menos cuatro objeciones. Guarda una objeción oculta (por ejemplo, el dinero) que sólo dices si te preguntan bien. Compra sólo si el vendedor usa técnicas claras de cierre y mantiene la calma.']
};
function sysCliente(c) {
  const t = TIPO[c.cfg.tipo], f = c.cfg.foco && LES[c.cfg.foco];
  return `Esto es un juego de rol para entrenar a un vendedor. Tú interpretas ÚNICAMENTE al cliente; el usuario es el vendedor.
PRODUCTO que te ofrece: ${c.cfg.prod}
TU PERSONAJE: ${t.persona}. ${t.rol}
SITUACIÓN: ${ETAPA[c.cfg.etapa][1]}
DIFICULTAD: ${DIF[c.cfg.dif][1]}
${f ? (f.k === 'obj' ? `OBJECIÓN PRINCIPAL que debes usar: «${(f.resp[0].cl || f.n)}».` : `Dale al vendedor una oportunidad natural de usar la técnica «${f.n}».${f.resp[0].cl ? ' En algún momento di algo como: «' + f.resp[0].cl + '».' : ''}`) : 'Usa objeciones realistas y variadas: precio, «lo voy a pensar», consultarlo con alguien, desconfianza, ya tengo proveedor, muchos gastos, sólo estoy viendo.'}
REGLAS:
- Habla como una persona real, con 1 a 3 frases cortas. Nunca salgas del personaje ni des consejos de ventas, y no menciones estas reglas ni tu tipo de personalidad.
- No compres a la primera. Cede cuando el vendedor responda bien a tu objeción o use una buena técnica de cierre. Si discute contigo, te presiona o ignora lo que dijiste, mantente firme o enfríate.
- Cuando decidas comprar, dilo con naturalidad y termina tu mensaje con la marca [VENTA]. Si el vendedor te falta al respeto, te presiona demasiado o se rinde, despídete y termina con [PERDIDA].
${VOZ}
Empieza tú: di tu primera frase como cliente según la situación.`;
}
function sysVendedor(c) {
  const e = EST[c.cfg.estilo] || EST.dey, t = c.cfg.comprador && TIPO[c.cfg.comprador];
  return `Eres un vendedor profesional de primer nivel en una cita real. ${e.vende}
Vendes: ${c.cfg.prod}. El usuario hace de comprador${t ? ` y va a actuar como un cliente ${t.n.toLowerCase()} (${t.eje.toLowerCase()})` : ''}: quiere aprender escuchándote vender, así que vende de forma ejemplar.
Cómo vendes: saluda y gánate la confianza, haz preguntas para descubrir su necesidad y su botón caliente, presenta sólo los beneficios que le importan, usa cierres de prueba durante la plática y, cuando ponga objeciones, aplica la regla de dos no y un sí y la técnica que corresponda. Pide la venta varias veces de formas distintas y, después de cada pregunta de cierre, calla.
Turnos de 1 a 4 frases que terminan casi siempre en pregunta.
Al final de CADA turno, en una línea aparte, escribe la etiqueta [técnica: nombre] con la técnica o técnicas que usaste en ese turno, con estos nombres: ${techNames()}. Si no usaste ninguna, escribe [técnica: ninguna].
Si el comprador acepta, cierra con calma, pide referidos como enseña Alex Dey y termina con la marca [VENTA]. Si se va definitivamente, despídete con amabilidad y termina con [PERDIDA].
${ETICA}
${VOZ}
Empieza tú: saluda y abre la cita.`;
}
function sysCoach(c) {
  const e = EST[c.cfg.estilo] || EST.dey, me = S.me && TIPO[S.me];
  return `Eres un coach de ventas que conversa con el usuario por voz, como en una llamada. ${e.coach}
El alumno vende: ${S.prod || 'todavía no lo dice; pregúntaselo si hace falta'}.${me ? ' Su tipo de vendedor es ' + me.n.toLowerCase() + ': ' + me.vend : ''}
Cómo conversas: responde lo que pregunte de forma directa y práctica. Si pregunta qué decir ante algo, nombra la técnica y de quién es, dale el guion palabra por palabra adaptado a su producto y dile qué hacer si el cliente insiste. Si te pide practicar, propón un juego de rol corto, haz tú de cliente hasta que te diga que paren y luego dale retroalimentación. Si quiere armar su presentación de ventas, constrúyela con él paso a paso: atención, interés, deseo, convicción y cierre. Termina casi siempre con una pregunta para seguir la conversación. Máximo unas 120 palabras por turno.
Apóyate en la GUÍA. Si agregas algo que no está ahí, dilo como sugerencia tuya.
${ETICA}
${VOZ}
GUÍA DE TÉCNICAS:
${kbShort()}
TIPOS DE CLIENTE:
${kbTipos()}
Empieza tú: saluda en una o dos frases y pregunta en qué lo ayudas hoy.`;
}
function sysClase(c) {
  const m = MODS[c.cfg.mi], e = EST[c.cfg.estilo] || EST.dey;
  return `Eres un coach de ventas dando una clase por voz, uno a uno. ${e.coach}
Clase: ${m.t}. ${m.d}
El alumno vende: ${S.prod || 'todavía no lo dice; pregúntaselo al empezar'}.
CONTENIDO DE LA CLASE (material de Alex Dey y Brian Tracy):
${m.ls.map(id => kbLesson(LES[id])).join('\n\n')}
Cómo das la clase: ve técnica por técnica, en el orden del contenido. Para cada una, explícala en 3 o 4 frases con un ejemplo adaptado a lo que vende el alumno y luego pídele que la practique contigo: tú haces de cliente en una situación corta y él responde. Corrige con calidez y precisión: qué hizo bien, qué cambiar y cómo lo diría un experto. Cuando lo haga bien, pasa a la siguiente técnica. Si pregunta algo, contéstalo y vuelve a la clase. Un paso a la vez: nunca expliques dos técnicas en el mismo turno. Máximo unas 110 palabras por turno.
Al terminar todas las técnicas, haz un repaso en 3 frases, felicítalo y escribe la marca [CLASE COMPLETA].
${ETICA}
${VOZ}
Empieza tú: saluda, di de qué trata la clase en una frase y explica la primera técnica.`;
}
const SYS = { cliente: sysCliente, vendedor: sysVendedor, coach: sysCoach, clase: sysClase };

/* ───────── utilidades de interfaz ───────── */
let toastT = 0;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 4200); }
const IC = {
  mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
  headset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4zM17 14h3v6h-3zM20 20a3 3 0 0 1-3 2h-3"/></svg>',
  store: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h16l-1 11H5zM8 9V7a4 4 0 0 1 8 0v2"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h9a4 4 0 0 1 4 4v12H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h10"/></svg>',
  film: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/></svg>',
  ear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0M10 10a2 2 0 0 1 4 0"/></svg>',
  pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/></svg>'
};
const sayBtn = (t, role, extra = '') => `<button class="say" data-act="say" data-text="${esc(t)}" data-role="${role || 'coach'}"${extra}>${IC.speaker}<span>Escuchar</span></button>`;
function refreshStatus() {
  const st = aiStatus(), p = $('#aiPill');
  if (p) { p.textContent = st.on ? 'IA lista' : 'Sin IA'; p.dataset.on = st.on ? '1' : '0'; }
  document.body.toggleAttribute('data-mic', canMic());
  if (!stack.length && (curView === 'hablar' || curView === 'perfil')) render();
  else if (stack.length) drawTop(true);
}
const lessonMod = id => MODS.findIndex(m => m.ls.includes(id));
const modOpen = i => i === 0 || S.unlockAll || !!S.modDone[MODS[i - 1].id];
const nextMod = () => MODS.findIndex(m => !S.modDone[m.id]);

/* ───────── navegación ───────── */
const VIEWS = ['hablar', 'aprender', 'biblioteca', 'perfil'];
let curView = 'hablar', libQ = '';
function go(v) { if (location.hash.slice(1) === v) render(); else location.hash = v; }
function render() {
  curView = VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'hablar';
  $$('.tab').forEach(t => { if (t.dataset.v === curView) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current'); });
  const el = $('#view');
  el.innerHTML = ({ hablar: vHablar, aprender: vAprender, biblioteca: vBiblio, perfil: vPerfil })[curView]();
  const st = aiStatus(), p = $('#aiPill'); if (p) { p.textContent = st.on ? 'IA lista' : 'Sin IA'; p.dataset.on = st.on ? '1' : '0'; }
}
window.addEventListener('hashchange', () => { if (stack.length) { while (stack.length) leave(stack.pop()); drawTop(); } render(); $('#view').scrollTop = 0; });

/* ───────── vista: Hablar ───────── */
const MODES = {
  coach: { t: 'Habla con tu coach', d: 'Pregúntale lo que quieras, pídele que te enseñe un cierre o que arme contigo tu presentación.', ic: 'headset', ai: true },
  cliente: { t: 'Tú vendes, la IA es el cliente', d: 'Un cliente real te pone objeciones según su personalidad. Al final te califica.', ic: 'target', ai: true },
  vendedor: { t: 'Tú compras, la IA te vende', d: 'Escucha a un vendedor experto con el estilo de Dey o de Tracy y ve qué técnica usa en cada frase.', ic: 'store', ai: true },
  entrenado: { t: 'Cliente entrenado, sin IA', d: 'Funciona en cualquier lugar: reconoce los cierres del curso en lo que dices y reacciona.', ic: 'user', ai: false }
};
function aiBanner() {
  const st = aiStatus();
  if (st.on) return `<p class="status on">${esc(st.t)}</p>${aiKind() === 'gratis' ? '<p class="small muted">¿Responde lento? Conecta Gemini gratis con tu cuenta de Google y va más rápido. <button class="link" data-act="goKey">Cómo hacerlo</button></p>' : ''}`;
  if (!caps.ready) return `<p class="status">${esc(st.t)}</p>`;
  if (HAS_SDK) return `<div class="notice"><b>Activa la IA para conversar.</b> Hay dos opciones gratis: la IA sin clave o Gemini con tu cuenta de Google. <button class="btn sm gold" data-act="goKey">Activar IA</button></div>`;
  return `<div class="notice"><b>${esc(st.t)}.</b> Pasa en la app de Claude del celular: ahí la página no puede usar la IA ni el micrófono. Usa la app instalable, que trae IA y voz gratis: <a href="${INSTALL_URL}" target="_blank" rel="noopener">${INSTALL_URL.replace('https://', '')}</a>. Mientras tanto, practica con el cliente entrenado.${IN_CLAUDE && aiOff && caps.perm ? ' <button class="btn sm" data-act="perms">Revisar permisos</button>' : ''}</div>`;
}
function chatRow(c, del) {
  const last = c.msgs.filter(m => m.w !== 's').slice(-1)[0];
  return `<li class="crow"><button data-act="openChat" data-id="${c.id}"><span class="ci">${IC[(MODES[c.mode] || { ic: 'book' }).ic] || IC.book}</span><span class="ct"><b>${esc(c.title)}</b><small>${fecha(c.at)} · ${c.msgs.filter(m => m.w !== 's').length} mensajes${c.end === 'venta' ? ' · venta cerrada' : c.end === 'perdida' ? ' · venta perdida' : c.end === 'clase' ? ' · clase completa' : ''}${last ? ' · «' + esc(last.t.slice(0, 60)) + (last.t.length > 60 ? '…' : '') + '»' : ''}</small></span><span class="go">Abrir</span></button>${del ? `<button class="x" data-act="delChat" data-id="${c.id}" aria-label="Borrar sesión">×</button>` : ''}</li>`;
}
function vHablar() {
  return `<div class="wrap">
  <section class="hero"><p class="eyebrow">Sala de práctica</p><h1>Habla con tu IA de ventas</h1><p class="lead muted">Con tu voz o escribiendo, como en una llamada. Practica vendiendo, escucha cómo vende un experto o pregúntale a tu coach.</p>${aiBanner()}</section>
  <div class="modes">${Object.entries(MODES).map(([k, m]) => `<button class="mode${m.ai ? '' : ' alt'}" data-act="setup" data-m="${k}"><span class="mi">${IC[m.ic]}</span><span class="mt"><b>${m.t}</b><small>${m.d}</small></span><span class="tags">${m.ai ? '<i>IA</i>' : ''}<i>Voz</i><i>Texto</i></span></button>`).join('')}</div>
  ${S.chats.length ? `<section class="block"><div class="bhead"><h2>Tus sesiones</h2><button class="link" data-act="go" data-v="perfil">Ver todas</button></div><ul class="crows">${S.chats.slice(0, 4).map(c => chatRow(c)).join('')}</ul></section>` : ''}
  </div>`;
}

/* ───────── vista: Aprender ───────── */
function vAprender() {
  const nx = nextMod(), done = MODS.filter(m => S.modDone[m.id]).length;
  return `<div class="wrap">
  <section class="hero"><p class="eyebrow">Ruta de aprendizaje · ${done} de ${MODS.length}</p><h1>Aprende viendo, escuchando y hablando</h1><p class="lead muted">Cada módulo tiene una clase narrada, una demostración de una venta y una clase por voz con tu coach. Al terminar uno se abre el siguiente.</p>
  ${nx >= 0 ? `<button class="cont" data-act="mod" data-i="${nx}"><span><small>Continúa con</small><b>Módulo ${nx + 1} · ${esc(MODS[nx].t)}</b></span><span class="go">Abrir</span></button>` : '<p class="status on">Completaste los 12 módulos. Repite los que quieras y sigue practicando en Hablar.</p>'}</section>
  <ol class="mods">${MODS.map((m, i) => { const open = modOpen(i), dn = !!S.modDone[m.id]; return `<li><button class="modc${dn ? ' done' : ''}${open ? '' : ' locked'}" data-act="mod" data-i="${i}"><span class="mn">${String(i + 1).padStart(2, '0')}</span><span class="mt"><b>${esc(m.t)}</b><small>${esc(m.d)}</small><span class="tags"><i>${m.ls.length} temas</i><i>Clase narrada</i><i>Demostración</i></span></span><span class="ms">${dn ? IC.check : open ? '<span class="go">Abrir</span>' : IC.lock}</span></button></li>`; }).join('')}</ol>
  ${!S.unlockAll ? '<p class="small muted">¿Quieres abrir todos los módulos de una vez? Actívalo en Perfil → Preferencias.</p>' : ''}
  </div>`;
}

/* ───────── vista: Biblioteca ───────── */
const lessonCard = (l, open) => `<details class="acc"${open ? ' open' : ''}><summary><span><b>${l.num ? l.num + '. ' : ''}${esc(l.n)}</b><small>${esc(l.src)}</small></span></summary><div class="in">${lessonBody(l)}</div></details>`;
function lessonBody(l) {
  return `<p>${esc(l.idea)}</p>${l.cuando ? `<p class="small"><b>Cuándo:</b> ${esc(l.cuando)}</p>` : ''}
  <${l.lista ? 'ul' : 'ol'} class="steps">${l.f.map(x => `<li>${esc(x)}</li>`).join('')}</${l.lista ? 'ul' : 'ol'}>
  <div class="phr">${l.fr.map(x => `<blockquote><span>«${esc(x)}»</span>${sayBtn(x, 'vend')}</blockquote>`).join('')}</div>
  ${l.resp[0] ? `<div class="ex"><span class="eyebrow">Ejemplo</span>${l.resp[0].cl ? `<p class="small muted">Cliente: «${esc(l.resp[0].cl)}»</p>` : `<p class="small muted">${esc(l.resp[0].ctx || '')}</p>`}<p>«${esc(l.resp[0].m)}» ${sayBtn(l.resp[0].m, 'vend')}</p></div>` : ''}
  <p class="warn"><b>Error común:</b> ${esc(l.err)}</p>${l.nota ? `<p class="small muted">${esc(l.nota)}</p>` : ''}
  <div class="row"><button class="btn sm" data-act="listenLesson" data-id="${l.id}">${IC.ear} Escuchar este tema</button>${lessonMod(l.id) >= 0 ? `<button class="btn sm" data-act="mod" data-i="${lessonMod(l.id)}">Ir al módulo</button>` : ''}</div>`;
}
function libBody() {
  const q = norm(libQ.trim());
  const hit = l => !q || norm(l.n + ' ' + l.idea + ' ' + (l.tags || '') + ' ' + l.f.join(' ')).includes(q);
  let body = MODS.map((m, i) => { const ls = m.ls.map(id => LES[id]).filter(hit); return ls.length ? `<section class="block"><h2><span class="mn">${i + 1}</span> ${esc(m.t)}</h2>${ls.map(l => lessonCard(l, !!q && ls.length < 3)).join('')}</section>` : ''; }).join('');
  const tipos = D.TIPOS.filter(t => !q || norm(t.n + ' ' + t.senal + ' ' + t.quiere).includes(q));
  if (tipos.length) body += `<section class="block"><h2>Los 4 tipos de cliente</h2>${tipos.map(t => `<details class="acc"><summary><span><b>${esc(t.n)}</b><small>${esc(t.eje)}</small></span></summary><div class="in"><p><b>Cómo lo reconoces.</b> ${esc(t.senal)}</p><p><b>Qué necesita escuchar.</b> ${esc(t.quiere)}</p><p><b>Cómo le presentas.</b> ${esc(t.presenta)}</p><p><b>Cierres que le funcionan.</b> ${t.cierres.map(c => esc(LES[c].n)).join(', ')}.</p><p><b>Lo que lo espanta.</b> ${esc(t.espanta)}</p><p><b>El riesgo.</b> ${esc(t.riesgo)}</p></div></details>`).join('')}</section>`;
  const demos = D.DEMOS.filter(d => !q || norm(d.t + ' ' + d.ctx).includes(q));
  if (demos.length) body += `<section class="block"><h2>Demostraciones</h2><ul class="crows">${demos.map(d => `<li class="crow"><button data-act="demo" data-id="${d.id}"><span class="ci">${IC.film}</span><span class="ct"><b>${esc(d.t)}</b><small>${esc(d.ctx)}</small></span><span class="go">Ver</span></button></li>`).join('')}</ul></section>`;
  return body || '<p class="muted">No encontré nada con esa búsqueda.</p>';
}
function vBiblio() {
  return `<div class="wrap"><section class="hero"><p class="eyebrow">Biblioteca</p><h1>Todas las técnicas, a la mano</h1>
  <label class="search"><span class="sr">Buscar</span><input class="inp" id="libQ" data-input="libQ" value="${esc(libQ)}" placeholder="Busca: caro, pensar, referidos, doble alternativa…" autocomplete="off"></label></section>
  <div id="libRes">${libBody()}</div></div>`;
}

/* ───────── vista: Perfil ───────── */
let quiz = {}, resetAsk = false, restoreOpen = false, installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (curView === 'perfil' && !stack.length) render(); });
function vPerfil() {
  const voices = synthVoices.slice().sort((a, b) => rankV(a) - rankV(b));
  const vsel = (role, label) => `<label class="field"><span class="eyebrow">${label}</span><span class="row nowrap"><select class="inp" data-change="voice" data-role="${role}"><option value="">Automática</option>${voices.map(v => `<option value="${esc(v.voiceURI)}"${S.voz.pick[role] === v.voiceURI ? ' selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}</select><button class="btn sm" data-act="testVoice" data-role="${role}">Probar</button></span></label>`;
  const tk = dayKey(), n = S.nums[tk] || { p: 0, r: 0, c: 0 };
  const W = { p: 0, r: 0, c: 0 }; for (let i = 0; i < 7; i++) { const x = S.nums[dayKey(-i)]; if (x) { W.p += x.p; W.r += x.r; W.c += x.c; } }
  const dx = !W.p ? 'Anota tus números de hoy y en una semana verás dónde se rompe tu cadena.' : W.p < 10 ? 'Prospectos bajos: te falta volumen. Ningún cierre compensa ver poca gente.' : W.r / W.p < 0.3 ? 'Ves gente y presentas poco: revisa cómo abres y a quién prospectas.' : W.c / Math.max(1, W.r) < 0.2 ? 'Presentas bien y cierras poco: pide la venta y usa cierres de prueba.' : 'Las tres líneas van juntas: sube el volumen.';
  const NL = { p: 'Prospectos', r: 'Presentaciones', c: 'Cierres' };
  const standalone = !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  const st = aiStatus();
  return `<div class="wrap">
  <section class="hero"><p class="eyebrow">Perfil</p><h1>Tu estilo y tus ajustes</h1></section>

  <section class="block"><h2>Tu estilo de vendedor</h2>
    <p class="muted">Opcional. Lee cómo vende cada tipo o contesta dos preguntas para ver cuál eres tú.</p>
    <div class="quiz"><span class="eyebrow">En una cita, tú…</span><div class="chips">${[['r', 'Voy rápido y al grano'], ['c', 'Voy con calma']].map(([v, t]) => `<button class="chip" data-act="quiz" data-q="q1" data-v="${v}" aria-pressed="${quiz.q1 === v}">${t}</button>`).join('')}</div>
    <span class="eyebrow">Lo que más disfrutas es…</span><div class="chips">${[['g', 'La gente: platicar y conectar'], ['a', 'El asunto: resultados y números']].map(([v, t]) => `<button class="chip" data-act="quiz" data-q="q2" data-v="${v}" aria-pressed="${quiz.q2 === v}">${t}</button>`).join('')}</div></div>
    <div class="styles">${D.TIPOS.map(t => `<article class="style${S.me === t.id ? ' mine' : ''}"><p class="eyebrow">${S.me === t.id ? 'Tu estilo' : esc(t.eje)}</p><h3>${esc(t.n)}</h3><p class="small">${esc(t.vend)}</p><p class="small"><b>Tu reto:</b> ${esc(t.reto)}</p><p class="small muted"><b>Temas clave:</b> ${t.foco.map(id => esc(LES[id].n)).join(', ')}</p>${S.me === t.id ? '<button class="btn sm" data-act="setMe" data-v="">Quitar</button>' : `<button class="btn sm" data-act="setMe" data-v="${t.id}">Este soy yo</button>`}</article>`).join('')}</div>
  </section>

  <section class="block"><h2>Lo que vendes</h2>
    <label class="field"><span class="eyebrow">Producto o servicio</span><input class="inp" id="prodIn" data-change="prod" value="${esc(S.prod)}" placeholder="Ejemplo: seguros de vida, autos, cursos, inmuebles" autocomplete="off"></label>
    <div class="field"><span class="eyebrow">Estilo de tu coach</span><div class="chips">${Object.entries(EST).map(([k, e]) => `<button class="chip" data-act="setEst" data-v="${k}" aria-pressed="${S.estilo === k}">${esc(e.n)}</button>`).join('')}</div><p class="small muted">${esc(EST[S.estilo].d)} Es una IA que enseña con su método; no imita su voz ni es la persona real.</p></div>
  </section>

  <section class="block" id="ia"><h2>IA</h2>
    <p class="status${st.on ? ' on' : ''}">${esc(st.t)}</p>
    ${HAS_SDK ? `<p class="small muted">Elige cómo conversa la app. Las dos primeras opciones son gratis. Si tienes varias, usa la mejor: Claude, luego Gemini, luego la IA sin clave.</p>
    <div class="prov">
      <h3>1. IA gratis sin clave</h3>
      <p class="small muted">Funciona apenas abres la app, sin registrarte. Es un servicio público (Pollinations): cuando hay mucha gente puede tardar unos segundos. No escribas datos personales.</p>
      <div class="chips"><button class="chip" data-act="tog" data-k="gratis" aria-pressed="${S.gratis !== false}">Usar la IA gratis sin clave</button></div>
      ${aiKind() === 'gratis' ? '<div class="row"><button class="btn sm" data-act="testAI" data-p="gratis">Probar conexión</button></div>' : ''}
    </div>
    <div class="prov">
      <h3>2. Gemini de Google · gratis con tu cuenta <span class="tags"><i>Recomendado</i></span></h3>
      <p class="small muted">Más rápida y estable. Google da un cupo diario gratis; si se acaba, la app sigue con la IA sin clave.</p>
      <ol class="steps small"><li>Toca «Sacar mi clave gratis» y entra con tu cuenta de Google.</li><li>Toca «Create API key» (Crear clave de API) y luego «Copy» (Copiar).</li><li>Vuelve aquí, pégala abajo y toca Guardar.</li></ol>
      <a class="btn sm gold" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Sacar mi clave gratis</a>
      <label class="field"><span class="eyebrow">Clave de Gemini</span><span class="row nowrap"><input class="inp" id="gemIn" type="password" value="" placeholder="${gemKey() ? 'Clave guardada · pega otra para cambiarla' : 'AIza…'}" autocomplete="off"><button class="btn sm gold" data-act="saveGem">Guardar</button></span></label>
      ${gemKey() ? `<div class="row"><button class="btn sm" data-act="testAI" data-p="gemini">Probar conexión</button><button class="btn sm" data-act="delGem">Borrar clave</button></div>
      <div class="field"><span class="eyebrow">Modelo de Gemini</span><div class="chips"><button class="chip" data-act="gemTier" data-v="lite" aria-pressed="${S.gemTier !== 'full'}">Rápido · más conversaciones al día</button><button class="chip" data-act="gemTier" data-v="full" aria-pressed="${S.gemTier === 'full'}">Más listo · pocas al día</button></div></div>` : ''}
      <p class="small muted">En el plan gratis, Google puede usar lo que escribes para mejorar sus productos. La clave se guarda sólo en este teléfono y no va en tus respaldos.</p>
    </div>
    <details class="acc"${apiKey() ? ' open' : ''}><summary><span><b>3. Claude de Anthropic</b><small>De pago: la mejor calidad para enseñar y vender</small></span></summary><div class="in">
      <p class="small muted">Crea la clave en console.anthropic.com → API Keys (necesitas cargar saldo). Se guarda sólo en este teléfono.</p>
      <label class="field"><span class="eyebrow">Clave de API de Anthropic</span><span class="row nowrap"><input class="inp" id="keyIn" type="password" value="" placeholder="${apiKey() ? 'Clave guardada · pega otra para cambiarla' : 'sk-ant-…'}" autocomplete="off"><button class="btn sm gold" data-act="saveKey">Guardar</button></span></label>
      ${apiKey() ? '<div class="row"><button class="btn sm" data-act="testAI" data-p="api">Probar conexión</button><button class="btn sm" data-act="delKey">Borrar clave</button></div>' : ''}
      <label class="field"><span class="eyebrow">Modelo</span><select class="inp" data-change="model">${MODELS.map(([v, t]) => `<option value="${v}"${S.model === v ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
    </div></details>`
    : `<p class="small muted">${IN_CLAUDE ? 'Dentro de claude.ai la IA usa tu propia cuenta de Claude: no necesitas clave. Funciona en el navegador del computador; la app de Claude del celular no se la permite a las páginas.' : 'Esta versión no trae conexión directa a la IA.'} En el celular usa la app instalable, con IA y voz gratis: <a href="${INSTALL_URL}" target="_blank" rel="noopener">${INSTALL_URL.replace('https://', '')}</a></p>${IN_CLAUDE && caps.perm ? '<button class="btn sm" data-act="perms">Revisar permisos</button>' : ''}`}
  </section>

  <section class="block"><h2>Voz</h2>
    <div class="chips"><button class="chip" data-act="tog" data-k="voz.on" aria-pressed="${S.voz.on}">La IA me habla en voz alta</button><button class="chip" data-act="tog" data-k="pausa" aria-pressed="${S.pausa}">Enviar cuando hago una pausa</button>${WebRec && !caps.dict ? `<button class="chip" data-act="tog" data-k="manos" aria-pressed="${S.manos}">Manos libres: escuchar cuando la IA termina</button>` : ''}</div>
    <label class="field"><span class="eyebrow">Velocidad de la voz · ${(S.voz.rate || 1).toFixed(2)}×</span><input type="range" min="0.75" max="1.35" step="0.05" value="${S.voz.rate || 1}" data-change="rate"></label>
    ${caps.tts && !ttsOff ? '<p class="small muted">Usando las voces de Claude.</p>' : SYN ? (voices.length ? vsel('coach', 'Voz del coach y del narrador') + vsel('vend', 'Voz del vendedor') + vsel('cli', 'Voz del cliente') : '<p class="small muted">Tu dispositivo no tiene voces en español instaladas. En Android: Ajustes → Texto a voz → instala «Español». En iPhone: Ajustes → Accesibilidad → Contenido leído → Voces.</p><button class="btn sm" data-act="testVoice" data-role="coach">Probar voz</button>') : '<p class="small muted">Aquí la página no puede hablar en voz alta (pasa en la app de Claude de Android). Lee las respuestas o usa la app instalada.</p>'}
    ${SYN && !(caps.tts && !ttsOff) ? '<details class="acc"><summary><span><b>¿La voz suena robótica?</b><small>Instala voces naturales gratis en tu teléfono</small></span></summary><div class="in"><p class="small"><b>Android:</b> Ajustes → Accesibilidad (o Sistema → Idioma) → Salida de texto a voz → Motor de Google → ⚙ → Instalar datos de voz → Español (Estados Unidos o México) → descarga y elige una voz. Luego cierra y abre Cierres.</p><p class="small"><b>iPhone:</b> Ajustes → Accesibilidad → Contenido leído → Voces → Español → descarga «Paulina (mejorada)» o «Mónica (mejorada)». Luego elígela arriba.</p><p class="small muted">Las voces marcadas como mejorada, premium o natural se eligen solas cuando las tienes.</p></div></details>' : ''}
    <p class="small muted">${canMic() ? 'Micrófono disponible: toca el botón dorado para hablar.' : 'Aquí la página no puede usar el micrófono: toca el micrófono de tu teclado y dicta.'}</p>
  </section>

  <section class="block"><h2>Tus sesiones guardadas</h2>
    ${S.chats.length ? `<ul class="crows">${S.chats.map(c => chatRow(c, true)).join('')}</ul>` : '<p class="muted">Todavía no tienes sesiones. Empieza una en Hablar.</p>'}
  </section>

  <section class="block"><h2>Mis números de hoy</h2>
    <div class="nums">${['p', 'r', 'c'].map(k => `<div class="num"><span class="eyebrow">${NL[k]}</span><b>${n[k]}</b><span class="row"><button class="pm" data-act="num" data-k="${k}" data-d="-1" aria-label="Restar">−</button><button class="pm" data-act="num" data-k="${k}" data-d="1" aria-label="Sumar">+</button></span></div>`).join('')}</div>
    <p class="small"><b>Últimos 7 días: ${W.p} · ${W.r} · ${W.c}.</b> ${dx}</p>
  </section>

  <section class="block"><h2>Preferencias</h2>
    <div class="chips"><button class="chip" data-act="tog" data-k="unlockAll" aria-pressed="${S.unlockAll}">Abrir todos los módulos</button></div>
  </section>

  <section class="block"><h2>Instalar la app</h2>
    ${standalone ? '<p class="status on">Ya estás usando la app instalada.</p>' : IN_CLAUDE ? `<p class="small">Para tenerla como ícono: abre este enlace en el navegador del celular y elige «Agregar a la pantalla principal» (Android) o «Compartir → Agregar a inicio» (iPhone).</p><p class="row nowrap"><code>${APP_URL}</code><button class="btn sm" data-act="copyLink">Copiar</button></p>` : `<p class="small">En Android (Chrome): menú ⋮ → «Instalar app». En iPhone (Safari): Compartir → «Agregar a inicio».</p>${installEvt ? '<button class="btn gold" data-act="install">Instalar Cierres</button>' : ''}`}
  </section>

  <section class="block"><h2>Respaldo</h2>
    <p class="small muted">Copia un respaldo de tu progreso y tus sesiones para pasarlo a otro teléfono o recuperarlo si se borra.</p>
    <div class="row"><button class="btn sm" data-act="backup">Copiar respaldo</button><button class="btn sm" data-act="restoreOpen">Restaurar</button></div>
    ${restoreOpen ? '<textarea class="inp" id="restoreIn" rows="3" placeholder="Pega aquí tu respaldo"></textarea><button class="btn sm gold" data-act="restore">Restaurar este respaldo</button>' : ''}
    <div class="row">${resetAsk ? '<span class="small">¿Borrar todo?</span><button class="btn sm" data-act="resetYes">Sí, borrar</button><button class="btn sm" data-act="resetNo">Cancelar</button>' : '<button class="btn sm" data-act="resetAsk">Borrar todo mi progreso</button>'}</div>
  </section>

  <section class="block"><h2>Fuentes</h2><p class="small muted">Alex Dey: Los doce cierres de venta, La Biblia del Vendedor, Cómo identificar la personalidad del prospecto, El poder de la palabra hablada y los cuadernos del intensivo Cierra Más. Brian Tracy: Psicología de ventas. Los textos están redactados para esta app a partir de ese material. La IA enseña con sus métodos, pero no es ninguno de ellos ni habla con su voz. La app no está afiliada a ninguno de los dos.</p></section>
  </div>`;
}

/* ───────── capas: módulo, clase narrada, demostración, chat, práctica ───────── */
let stack = [], chat = null;
function push(o) { stack.push(o); drawTop(); }
function pop() { const o = stack.pop(); if (o) leave(o); drawTop(); if (!stack.length) render(); }
function leave(o) {
  if (o.type === 'chat' && chat) { if (chat._ctl) chat._ctl.abort(); micStop(false); hush(); chat._busy = false; save(); chat = null; }
  if (o.type === 'leer' || o.type === 'demo') { o.playing = false; o.tok = (o.tok || 0) + 1; hush(); }
  if (o.type === 'ses') { micStop(false); hush(); }
}
function drawTop(soft) {
  const el = $('#sheet'), o = stack[stack.length - 1];
  if (!o) { el.hidden = true; el.innerHTML = ''; return; }
  if (soft && o.type === 'chat' && $('#msgsIn')) { drawChatMsgs(); return; }
  el.hidden = false;
  const prev = $('.sbody', el), keep = soft && prev ? prev.scrollTop : 0;
  const ta = $('textarea', el), draft = soft && ta ? ta.value : '';
  el.innerHTML = OV[o.type](o);
  const b = $('.sbody', el);
  if (o.type === 'chat') scrollMsgs(); else if (b) b.scrollTop = keep;
  const nt = $('textarea', el); if (nt) { if (draft) nt.value = draft; grow(nt); }
}
const head = (title, sub, right = '') => `<header class="shead"><button class="iconbtn" data-act="back" aria-label="Volver">${IC.back}</button><div class="st"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div><div class="sacts">${right}</div></header>`;
const composer = (id, ph) => `<div class="cfoot"><p class="partial" id="partial"></p><div class="composer"><button class="mic" data-act="mic" data-for="${id}" aria-label="Hablar">${IC.mic}</button><textarea class="inp" id="${id}" rows="1" data-send="${id}" placeholder="${esc(ph)}"></textarea><button class="send" data-act="send" data-for="${id}" aria-label="Enviar">${IC.send}</button></div>${canMic() ? '' : '<p class="tip">Para hablar, toca el micrófono de tu teclado.</p>'}</div>`;
const OV = {};

/* módulo */
OV.mod = o => {
  const m = MODS[o.i], dn = !!S.modDone[m.id], d = DEMO[m.demo];
  return `${head('Módulo ' + (o.i + 1), m.t)}<div class="sbody"><div class="wrap">
  <h1>${esc(m.t)}</h1><p class="lead muted">${esc(m.d)}</p>
  <div class="acts4">
    <button class="act" data-act="leer" data-i="${o.i}"><span class="ai-ic">${IC.ear}</span><b>Escucha la clase</b><small>Te la narra tu coach, tema por tema.</small></button>
    <button class="act" data-act="demo" data-id="${m.demo}"><span class="ai-ic">${IC.film}</span><b>Mira la demostración</b><small>${esc(d.t)}</small></button>
    <button class="act gold" data-act="clase" data-i="${o.i}"><span class="ai-ic">${IC.headset}</span><b>Clase por voz con el coach</b><small>Te explica y practica contigo. Usa IA.</small></button>
    <button class="act" data-act="practica" data-i="${o.i}"><span class="ai-ic">${IC.pen}</span><b>Practica tus respuestas</b><small>El cliente te habla y tú respondes.</small></button>
  </div>
  <section class="block"><h2>Los temas</h2>${m.ls.map(id => lessonCard(LES[id])).join('')}</section>
  </div></div>
  <footer class="sfoot"><div class="wrap row">${dn ? `<span class="status on">Módulo completado</span><button class="btn" data-act="modDone" data-i="${o.i}" data-v="0">Marcar pendiente</button>${o.i < MODS.length - 1 ? `<button class="btn gold" data-act="mod" data-i="${o.i + 1}">Siguiente módulo</button>` : ''}` : `<button class="btn gold wide" data-act="modDone" data-i="${o.i}" data-v="1">Ya lo domino: marcar como completado</button>`}</div></footer>`;
};

/* clase narrada */
function buildParas(m) {
  const P = [{ h: m.t, t: 'Módulo: ' + m.t + '. ' + m.d }];
  m.ls.forEach(id => {
    const l = LES[id];
    P.push({ h: l.n, t: l.n + '. ' + l.idea });
    P.push({ h: 'Cómo se hace', t: l.f.join(' ') });
    P.push({ h: 'Dilo así', t: l.fr.map(x => '«' + x + '»').join(' ') + (l.resp[0] ? ' Por ejemplo: ' + (l.resp[0].cl ? 'si el cliente dice «' + l.resp[0].cl + '», respondes: ' : '') + '«' + l.resp[0].m + '»' : '') });
    P.push({ h: 'Cuidado', t: 'Error común: ' + l.err });
  });
  P.push({ h: 'Siguiente paso', t: 'Ahora mira la demostración de este módulo y luego practica con tu coach por voz.' });
  return P;
}
OV.leer = o => {
  const title = o.mi >= 0 && !o.single ? MODS[o.mi].t : o.paras[0].h;
  return `${head('Clase narrada', title, `<button class="iconbtn${o.playing ? ' on' : ''}" data-act="leerPlay" aria-label="${o.playing ? 'Pausar' : 'Reproducir'}">${o.playing ? IC.pause : IC.play}</button>`)}<div class="sbody"><div class="wrap">
  ${canSpeak() ? '' : '<p class="notice">Aquí la página no puede hablar en voz alta. Lee la clase o ábrela en el navegador o en la app instalada.</p>'}
  <ol class="paras">${o.paras.map((p, i) => `<li class="para${i === o.i ? ' cur' : ''}${i < o.i ? ' seen' : ''}" data-act="leerJump" data-i="${i}"><span class="eyebrow">${esc(p.h)}</span><p>${esc(p.t)}</p></li>`).join('')}</ol>
  </div></div><footer class="sfoot"><div class="wrap row"><button class="btn gold wide" data-act="leerPlay">${o.playing ? IC.pause + ' Pausar' : IC.play + (o.i ? ' Continuar' : ' Escuchar la clase')}</button>${o.mi >= 0 && !o.single ? `<button class="btn" data-act="demo" data-id="${MODS[o.mi].demo}">${IC.film} Demostración</button>` : ''}</div></footer>`;
};
async function leerRun(o) {
  const tok = o.tok = (o.tok || 0) + 1;
  while (o.playing && tok === o.tok && o.i < o.paras.length) {
    drawTop(true); const cur = $('.para.cur'); if (cur) cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
    if (!canSpeak()) { o.playing = false; break; }
    say(o.paras[o.i].t, 'coach', {}, true);
    await whenQuiet();
    if (tok !== o.tok || !o.playing) return;
    if (o.i >= o.paras.length - 1) { o.playing = false; break; }
    o.i++;
  }
  drawTop(true);
}

/* demostración */
OV.demo = o => {
  const d = o.d, shown = d.lines.slice(0, o.n), done = o.n >= d.lines.length;
  const tec = id => id && LES[id] ? `<button class="tec" data-act="tema" data-id="${id}">${esc(LES[id].n)}</button>` : '';
  const bub = ln => ln[0] === 'n' ? `<div class="bub note"><span class="who">Coach</span>${esc(ln[1])}${tec(ln[2])}</div>`
    : `<div class="bub ${ln[0] === 'v' ? 'me' : 'ai'}"><span class="who">${ln[0] === 'v' ? 'Vendedor' : 'Cliente'}</span>${esc(ln[1])}${tec(ln[2])}</div>`;
  return `${head('Demostración', d.t, `<button class="iconbtn${o.playing ? ' on' : ''}" data-act="demoPlay" aria-label="${o.playing ? 'Pausar' : 'Reproducir'}">${o.playing ? IC.pause : IC.play}</button>`)}<div class="sbody"><div class="wrap">
  <p class="ctx">${esc(d.ctx)}</p>
  <div class="msgs">${shown.map(bub).join('')}</div>
  ${done ? `<div class="notice"><b>¿Ahora tú?</b> Practica esta misma situación.<div class="row"><button class="btn sm gold" data-act="setup" data-m="cliente">Tú vendes con IA</button><button class="btn sm" data-act="setup" data-m="entrenado">Cliente entrenado</button></div></div>` : ''}
  ${!o.ai && aiKind() ? `<button class="btn sm" data-act="demoAI" data-id="${d.id}">Hacer esta demostración con mi producto</button>` : ''}
  ${o.gen ? '<p class="muted">La IA está escribiendo la demostración con tu producto…</p>' : ''}
  </div></div><footer class="sfoot"><div class="wrap row"><button class="btn gold wide" data-act="demoPlay">${o.playing ? IC.pause + ' Pausar' : done ? IC.play + ' Ver otra vez' : IC.play + (o.n ? ' Continuar' : ' Reproducir')}</button><button class="btn" data-act="demoStep">Siguiente línea</button></div></footer>`;
};
async function demoRun(o) {
  if (o.n >= o.d.lines.length) o.n = 0;
  const tok = o.tok = (o.tok || 0) + 1;
  S.demoSeen[o.d.id] = 1; save();
  while (o.playing && tok === o.tok && o.n < o.d.lines.length) {
    const ln = o.d.lines[o.n]; o.n++; drawTop(true); const b = $('.sbody'); if (b) b.scrollTop = b.scrollHeight;
    if (canSpeak() && S.voz.on) { say(ln[1], ln[0] === 'v' ? 'vend' : ln[0] === 'c' ? 'cli' : 'coach', {}, true); await whenQuiet(); }
    else await new Promise(r => setTimeout(r, 900 + ln[1].length * 45));
    if (tok !== o.tok) return;
    await new Promise(r => setTimeout(r, 250));
  }
  if (tok !== o.tok) return;
  o.playing = false; drawTop(true); const b = $('.sbody'); if (b) b.scrollTop = b.scrollHeight;
}

/* tema suelto */
OV.tema = o => { const l = LES[o.id]; return `${head(l.n, l.src)}<div class="sbody"><div class="wrap"><h1>${esc(l.n)}</h1>${lessonBody(l)}</div></div>`; };

/* ajustes antes de conversar */
OV.setup = o => {
  const m = MODES[o.m], c = o.cfg, needAI = m.ai && !aiKind();
  const chip = (k, v, t) => `<button class="chip" data-act="cfg" data-k="${k}" data-v="${v}" aria-pressed="${c[k] === v}">${t}</button>`;
  const prod = `<label class="field"><span class="eyebrow">${o.m === 'vendedor' ? 'Qué te van a vender' : '¿Qué vendes?'}</span><input class="inp" id="cfgProd" value="${esc(c.prod)}" placeholder="Ejemplo: seguros de vida para familias" autocomplete="off"></label>`;
  const tipos = (k, first) => `<div class="field"><span class="eyebrow">${o.m === 'vendedor' ? 'Tu papel de comprador' : 'Tipo de cliente'}</span><div class="chips">${chip(k, first[0], first[1])}${D.TIPOS.map(t => chip(k, t.id, t.n)).join('')}</div></div>`;
  const estilo = `<div class="field"><span class="eyebrow">Estilo</span><div class="chips">${Object.entries(EST).map(([k, e]) => chip('estilo', k, e.n)).join('')}</div><p class="small muted">${esc(EST[c.estilo].d)}</p></div>`;
  let body = '';
  if (o.m === 'coach') body = estilo + `<p class="small muted">Puedes decirle cosas como: «¿qué le digo si me dicen que está caro?», «enséñame la doble alternativa», «hagamos un juego de rol» o «ayúdame a armar mi presentación».</p>`;
  if (o.m === 'cliente' || o.m === 'entrenado') body = prod + tipos('tipo', ['sorpresa', 'Sorpresa'])
    + `<div class="field"><span class="eyebrow">Situación</span><div class="chips">${Object.keys(ETAPA).filter(k => o.m === 'cliente' || k !== 'completa').map(k => chip('etapa', k, ETAPA[k][0])).join('')}</div></div>`
    + `<div class="field"><span class="eyebrow">Dificultad</span><div class="chips">${Object.keys(DIF).map(k => chip('dif', k, DIF[k][0])).join('')}</div></div>`
    + `<label class="field"><span class="eyebrow">Quiero practicar</span><select class="inp" id="cfgFoco"><option value="">Cita libre</option>${LESSONS.filter(l => l.tag).map(l => `<option value="${l.id}"${c.foco === l.id ? ' selected' : ''}>${l.num ? 'Cierre ' + l.num + ': ' : ''}${esc(l.n)}</option>`).join('')}</select></label>`;
  if (o.m === 'vendedor') body = prod + estilo + tipos('comprador', ['', 'Libre']) + `<p class="small muted">Debajo de cada frase del vendedor verás qué técnica usó. Ponle objeciones para ver cómo las resuelve.</p>`;
  return `${head(m.t, '')}<div class="sbody"><div class="wrap">
  <p class="lead muted">${esc(m.d)}</p>
  ${needAI ? `<div class="notice">${HAS_SDK ? '<b>Primero activa la IA.</b> En Perfil → IA hay opciones gratis. <button class="btn sm gold" data-act="goKey">Activar IA</button>' : `<b>Aquí no está la IA.</b> En la app de Claude del celular la página no puede usarla. Usa la app instalable, con IA y voz gratis: <a href="${INSTALL_URL}" target="_blank" rel="noopener">${INSTALL_URL.replace('https://', '')}</a>. Mientras tanto usa el cliente entrenado.`} <button class="btn sm" data-act="setup" data-m="entrenado">Usar el cliente entrenado</button></div>` : ''}
  ${body}</div></div>
  <footer class="sfoot"><div class="wrap"><button class="btn gold wide" data-act="startChat"${needAI ? ' disabled' : ''}>Empezar a conversar</button></div></footer>`;
};

/* chat por voz y texto */
const TAG_RX = /\[\s*t[eé]cnicas?\s*:\s*([^\]]+)\]/gi;
const cleanAI = t => String(t).replace(TAG_RX, '').replace(/\[(VENTA|PERDIDA|CLASE COMPLETA)\]/gi, '').replace(/\[[^\]]*$/, '').replace(/\*+/g, '').replace(/^#+\s*/gm, '').replace(/^(VENDEDOR|CLIENTE|COACH)\s*:\s*/i, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
function parseTags(t) {
  const out = []; let m; TAG_RX.lastIndex = 0;
  while ((m = TAG_RX.exec(t))) m[1].split(/[;,/]| y /).forEach(n => { const k = norm(n.replace(/[«»"]/g, '').trim()); if (!k || k === 'ninguna') return; const l = LESSONS.find(x => norm(x.n.replace(/[«»]/g, '')) === k) || LESSONS.find(x => { const a = norm(x.n.replace(/[«»]/g, '')); return a.includes(k) || k.includes(a); }); if (l) addU(out, l.id); });
  return out;
}
const roleOf = c => c.mode === 'cliente' || c.mode === 'entrenado' ? 'cli' : c.mode === 'vendedor' ? 'vend' : 'coach';
const vctx = c => ({ estilo: c.cfg.estilo, tipo: c.cfg.tipo });
const aiName = c => c.mode === 'coach' || c.mode === 'clase' ? 'Coach' : c.mode === 'vendedor' ? 'Vendedor' : (c.cfg.hide ? 'Tu cliente' : TIPO[c.cfg.tipo].persona);
function chatTitle(mode, cfg) {
  if (mode === 'coach') return 'Coach · ' + EST[cfg.estilo].n;
  if (mode === 'clase') return 'Clase · ' + MODS[cfg.mi].t;
  if (mode === 'vendedor') return 'Te venden ' + cfg.prod + ' · ' + EST[cfg.estilo].corto;
  return (mode === 'entrenado' ? 'Cliente entrenado · ' : 'Vendes ') + cfg.prod + (cfg.hide ? '' : ' · ' + TIPO[cfg.tipo].n);
}
function msgsHTML(c) {
  let h = c.msgs.map(m => m.w === 's' ? `<div class="bub note">${esc(m.t)}</div>`
    : `<div class="bub ${m.w === 'u' ? 'me' : 'ai'}"><span class="who">${m.w === 'u' ? 'Tú' : esc(aiName(c))}</span>${esc(m.t)}${m.w === 'a' ? `<span class="btools">${(m.tec || []).map(id => LES[id] ? `<button class="tec" data-act="tema" data-id="${id}">${esc(LES[id].n)}</button>` : '').join('')}${sayBtn(m.t, roleOf(c), ` data-ctx="${esc(JSON.stringify(vctx(c)))}"`)}</span>` : ''}</div>`).join('');
  if (c._busy) h += `<div class="bub ai"><span class="who">${esc(aiName(c))}</span><span id="live">${c._live ? esc(c._live) : '<span class="dots"><i></i><i></i><i></i></span>'}</span></div>`;
  if (c._err) h += `<div class="bub note">${esc(errMsg(c._err))} <button class="link" data-act="retry">Reintentar</button></div>`;
  if (c.end && c.mode !== 'coach') h += `<div class="bub note">${c.end === 'venta' ? (c.cfg.etapa === 'cita' ? 'Conseguiste la cita.' : c.mode === 'vendedor' ? 'Compraste: así se cierra una venta.' : 'Cerraste la venta.') : c.end === 'clase' ? 'Clase completada. Se abrió el siguiente módulo.' : 'El cliente se fue.'}${c.mode === 'cliente' || c.mode === 'entrenado' || c.mode === 'vendedor' ? ' <button class="link" data-act="evaluar">Ver tu revisión</button>' : ''}</div>`;
  return h;
}
OV.chat = () => {
  const c = chat, local = c.mode === 'entrenado';
  const right = `${(c.mode === 'cliente' || local) ? '<button class="btn sm" data-act="pista">Pista</button>' : ''}${c.mode !== 'coach' && c.mode !== 'clase' ? '<button class="btn sm gold" data-act="evaluar">Terminar</button>' : ''}<button class="iconbtn" data-act="tog" data-k="voz.on" aria-label="${S.voz.on ? 'Silenciar voz' : 'Activar voz'}">${S.voz.on ? IC.speaker : IC.mute}</button>`;
  const sub = c.mode === 'cliente' || local ? `${ETAPA[c.cfg.etapa][0]} · ${DIF[c.cfg.dif][0]}` : c.mode === 'vendedor' ? 'Tú eres el comprador' : c.mode === 'clase' ? 'Clase por voz' : EST[c.cfg.estilo].n;
  return `${head(c.title, sub, right)}
  ${local && c.local ? `<div class="heat"><span class="eyebrow">Interés del cliente</span><div class="bar"><i id="heat" style="width:${c.local.heat}%"></i></div></div>` : ''}
  <div class="sbody" id="msgsBox"><div class="wrap msgs" id="msgsIn">${msgsHTML(c)}</div></div>
  <footer class="sfoot">${composer('chatIn', c.mode === 'vendedor' ? 'Responde como comprador…' : c.mode === 'coach' || c.mode === 'clase' ? 'Habla o escribe a tu coach…' : 'Háblale a tu cliente…')}</footer>`;
};
function scrollMsgs() { const b = $('#msgsBox'); if (b) b.scrollTop = b.scrollHeight; }
function drawChatMsgs() { const el = $('#msgsIn'); if (!el || !chat) return; el.innerHTML = msgsHTML(chat); scrollMsgs(); const h = $('#heat'); if (h && chat.local) h.style.width = chat.local.heat + '%'; }
function drawLive(c) { const el = $('#live'); if (el) { el.textContent = c._live; scrollMsgs(); } else drawChatMsgs(); }
function startChat(mode, cfg) {
  const c = { id: uid(), mode, cfg, at: Date.now(), msgs: [], end: '' };
  c.title = chatTitle(mode, cfg);
  S.chats.unshift(c); while (S.chats.length > 40) S.chats.pop(); save();
  openChat(c, true);
}
function openChat(c, fresh) {
  while (stack.length && ['setup', 'eval'].includes(stack[stack.length - 1].type)) stack.pop();
  chat = c; S.chats = [c, ...S.chats.filter(x => x !== c)]; push({ type: 'chat' });
  if (fresh) { if (c.mode === 'entrenado') localStart(c); else aiTurn(c); }
}
const boundary = t => { let i = -1; const rx = /[.!?…]["»”)]?\s/g; let m; while ((m = rx.exec(t))) i = m.index + m[0].length; return i; };
async function aiTurn(c) {
  if (c._busy) return;
  c._busy = true; c._live = ''; c._err = ''; drawChatMsgs(); hush();
  const ctl = c._ctl = new AbortController(), role = roleOf(c), vx = vctx(c);
  const streamSpeak = S.voz.on && canSpeak() && !(caps.tts && !ttsOff);
  let spoken = 0;
  try {
    const turns = c.msgs.filter(m => m.w === 'u' || m.w === 'a').map(m => ({ role: m.w === 'u' ? 'user' : 'assistant', content: m.w === 'a' ? (m.raw || m.t) : m.t }));
    const text = await aiStream(SYS[c.mode](c), turns, {
      signal: ctl.signal, tier: c.mode === 'cliente' ? 'quick' : 'default',
      onText: acc => { if (chat !== c) return; const cl = cleanAI(acc); c._live = cl; drawLive(c); if (streamSpeak) { const cut = boundary(cl); if (cut > spoken) { say(cl.slice(spoken, cut), role, vx); spoken = cut; } } }
    });
    const clean = cleanAI(text) || '…';
    c.msgs.push({ w: 'a', t: clean, raw: text, tec: c.mode === 'vendedor' ? parseTags(text) : [] });
    if (/\[VENTA\]/i.test(text)) c.end = 'venta'; else if (/\[PERDIDA\]/i.test(text)) c.end = 'perdida';
    if (/\[CLASE COMPLETA\]/i.test(text) && c.mode === 'clase') { c.end = 'clase'; S.modDone[MODS[c.cfg.mi].id] = 1; toast('Clase completada. Se abrió el siguiente módulo.'); }
    c._busy = false; c._live = ''; c.at = Date.now(); save();
    if (chat === c) drawChatMsgs();
    if (S.voz.on) { if (streamSpeak) { if (clean.length > spoken) say(clean.slice(spoken), role, vx); } else say(clean, role, vx); }
    handsFree(c);
  } catch (e) {
    c._busy = false; c._live = '';
    if (!e || e.code !== 'cancelled') c._err = (e && e.code) || 'upstream_error';
    if (chat === c) drawChatMsgs();
  }
}
function handsFree(c) {
  if (!S.manos || !WebRec || micOff || caps.dict || c.end) return;
  whenQuiet().then(() => { if (chat === c && !c._busy && !listening && stack.length && stack[stack.length - 1].type === 'chat') micStart('chatIn', () => send('chatIn')); });
}
function send(id) {
  const el = document.getElementById(id); if (!el) return;
  if (id === 'sesIn') return sesCheck();
  const c = chat; if (!c) return;
  const txt = el.value.trim(); if (!txt) return;
  if (c._busy) return toast('Espera a que termine de responder.');
  if (listening) micStop(false);
  if (c.end && (c.mode === 'cliente' || c.mode === 'entrenado')) { el.value = ''; return toast('La cita terminó. Toca «Terminar» para ver tu revisión.'); }
  el.value = ''; grow(el); hush();
  c.msgs.push({ w: 'u', t: txt }); c.at = Date.now(); save(); drawChatMsgs();
  if (c.mode === 'entrenado') return localTurn(c, txt);
  aiTurn(c);
}

/* evaluación */
const techList = () => LESSONS.filter(l => l.tag).map(l => `${l.id}: ${l.n} — ${l.f.join(' ')}`).join('\n');
async function evaluar() {
  const c = chat; if (!c) return;
  if (c.mode === 'vendedor') { c.ev = vendedorReport(c); save(); return push({ type: 'eval' }); }
  if (!c.msgs.some(m => m.w === 'u')) return toast('Dile algo a tu cliente antes de terminar.');
  hush(); micStop(false); if (c._ctl) c._ctl.abort(); c._busy = false;
  if (c.mode === 'entrenado') { c.ev = finishEval(c, localReport(c)); save(); return push({ type: 'eval' }); }
  const o = { type: 'eval', wait: true }; push(o);
  const t = TIPO[c.cfg.tipo], f = c.cfg.foco && LES[c.cfg.foco];
  const transcript = c.msgs.filter(m => m.w !== 's').map(m => (m.w === 'a' ? 'CLIENTE: ' : 'VENDEDOR: ') + m.t).join('\n');
  try {
    const r = await aiJSON(`Eres un entrenador de ventas experto en los métodos de Brian Tracy y Alex Dey. Evalúa al VENDEDOR en esta práctica de juego de rol. Sé exigente y concreto; tutéalo.
Producto: ${c.cfg.prod}. Situación: ${ETAPA[c.cfg.etapa][0]}. El cliente era de tipo ${t.n} (${t.eje}).${f ? ' El alumno quería practicar: ' + f.n + '.' : ''}
Resultado: ${c.end || 'la cita quedó abierta'}.
TÉCNICAS DE REFERENCIA (id: nombre — pasos):
${techList()}
TRANSCRIPCIÓN:
${transcript}
Devuelve SOLO un objeto JSON: {"puntaje": entero 0-100, "resumen": "2 frases", "tecnicas": [{"id": "id de la lista", "bien": true o false}], "aciertos": ["..."], "mejoras": ["..."], "mejor_frase": {"cliente": "...", "dijiste": "...", "prueba": "frase modelo mejor, adaptada al producto"}, "adaptacion": "1 frase", "siguiente": "qué practicar ahora, 1 frase"}
En "tecnicas" incluye sólo técnicas de la lista que el vendedor realmente intentó, con su id exacto. Máximo 3 aciertos y 3 mejoras. Considera la regla de dos no y un sí, si pidió la venta, el silencio después de cerrar, la adaptación al tipo de cliente y la honestidad.`);
    c.ev = finishEval(c, r); save();
  } catch (e) { c.ev = { fail: errMsg(e.code, e.message) }; }
  o.wait = false; if (stack[stack.length - 1] === o) drawTop();
}
function finishEval(c, r) {
  const score = Math.max(0, Math.min(100, Math.round(Number(r.puntaje) || 0)));
  const tec = (Array.isArray(r.tecnicas) ? r.tecnicas : []).filter(x => x && LES[x.id]);
  if (score >= 70) tec.forEach(x => { if (x.bien) S.lesDone[x.id] = 1; });
  return { score, r, tec };
}
function vendedorReport(c) {
  const count = {}; c.msgs.forEach(m => (m.tec || []).forEach(id => { count[id] = (count[id] || 0) + 1; }));
  return { vend: true, count };
}
OV.eval = o => {
  const c = chat, e = c && c.ev;
  if (o.wait || !e) return `${head('Revisión', '')}<div class="sbody"><div class="wrap"><h1>Tu entrenador está revisando la cita…</h1><p class="muted">Puede tardar unos segundos.</p></div></div>`;
  if (e.fail) return `${head('Revisión', '')}<div class="sbody"><div class="wrap"><h1>No se pudo evaluar</h1><p>${esc(e.fail)}</p><button class="btn gold" data-act="evaluar">Reintentar</button></div></div>`;
  if (e.vend) {
    const ids = Object.keys(e.count).sort((a, b) => e.count[b] - e.count[a]);
    return `${head('Lo que aprendiste', c.title)}<div class="sbody"><div class="wrap">
    <h1>Técnicas que usó el vendedor</h1><p class="lead muted">${ids.length ? 'Toca una para repasarla. Luego intenta usarlas tú.' : 'Todavía no hubo técnicas marcadas. Sigue la conversación y ponle objeciones.'}</p>
    <div class="tecs">${ids.map(id => `<button class="tec big" data-act="tema" data-id="${id}">${esc(LES[id].n)} <small>×${e.count[id]}</small></button>`).join('')}</div>
    <div class="row"><button class="btn gold" data-act="setup" data-m="cliente">Ahora vende tú</button><button class="btn" data-act="back">Volver a la conversación</button></div></div></div>`;
  }
  const r = e.r, li = a => (Array.isArray(a) ? a : []).slice(0, 3).map(x => `<li>${esc(x)}</li>`).join(''), mf = r.mejor_frase || {}, t = TIPO[c.cfg.tipo];
  const stamp = c.end === 'venta' ? (c.cfg.etapa === 'cita' ? 'Cita lograda' : 'Venta cerrada') : c.end === 'perdida' ? 'Venta perdida' : 'Sin cierre';
  return `${head('Revisión', c.title)}<div class="sbody"><div class="wrap">
  <div class="scorebox"><div><span class="eyebrow">Puntaje</span><p class="score">${e.score}<small>/100</small></p></div><span class="stamp">${stamp}</span></div>
  <p class="lead">${esc(r.resumen || '')}</p><p class="muted">Tu cliente era <b>${esc(t.n)}</b> (${esc(t.eje.toLowerCase())}). ${esc(r.adaptacion || '')}</p>
  ${e.tec.length ? `<div class="field"><span class="eyebrow">Técnicas que usaste</span><div class="tecs">${e.tec.map(x => `<button class="tec ${x.bien ? 'ok' : 'bad'}" data-act="tema" data-id="${x.id}">${esc(LES[x.id].n)} · ${x.bien ? 'bien' : 'a pulir'}</button>`).join('')}</div></div>` : '<p class="notice">No detecté técnicas de cierre del curso. En la próxima cita elige una y úsala a propósito.</p>'}
  ${(r.aciertos || []).length ? `<div class="field"><span class="eyebrow">Lo que hiciste bien</span><ul class="steps">${li(r.aciertos)}</ul></div>` : ''}
  ${(r.mejoras || []).length ? `<div class="field"><span class="eyebrow">Lo que te costó la venta</span><ul class="steps">${li(r.mejoras)}</ul></div>` : ''}
  ${mf.prueba ? `<div class="field"><span class="eyebrow">La frase que cambiaría</span>${mf.cliente ? `<p class="small muted">Cliente: «${esc(mf.cliente)}»</p>` : ''}${mf.dijiste ? `<p class="small muted">Dijiste: «${esc(mf.dijiste)}»</p>` : ''}<blockquote><span>«${esc(mf.prueba)}»</span>${sayBtn(mf.prueba, 'vend')}</blockquote></div>` : ''}
  ${r.siguiente ? `<p class="notice"><b>Siguiente paso:</b> ${esc(r.siguiente)}</p>` : ''}
  <div class="row"><button class="btn gold" data-act="again">Repetir con este cliente</button><button class="btn" data-act="closeAll">Salir</button></div></div></div>`;
};

/* práctica de respuestas del módulo */
function startPractica(mi) {
  const items = MODS[mi].ls.flatMap(id => LES[id].resp.slice(0, 2).map(r => ({ id, r })));
  push({ type: 'ses', mi, items, i: 0, st: 'ans', ok: 0, ans: '', g: null });
  sesSpeak();
}
function sesSpeak() { const o = stack[stack.length - 1]; if (!o || o.type !== 'ses' || o.i >= o.items.length) return; const it = o.items[o.i]; if (it.r.cl) say(it.r.cl, 'cli', {}); else say(it.r.ctx, 'coach', {}); }
OV.ses = o => {
  const m = MODS[o.mi];
  if (o.i >= o.items.length) return `${head('Práctica', m.t)}<div class="sbody"><div class="wrap"><h1>${o.ok} de ${o.items.length} bien</h1><p class="lead muted">${o.ok === o.items.length ? 'Excelente. Ya puedes marcar el módulo como completado o subir de nivel con la clase por voz.' : 'Repasa los temas donde dudaste y vuelve a intentarlo cuando quieras.'}</p><div class="row"><button class="btn gold" data-act="back">Volver al módulo</button><button class="btn" data-act="practicaAgain" data-i="${o.mi}">Practicar otra vez</button></div></div></div>`;
  const it = o.items[o.i], l = LES[it.id], r = it.r;
  let body = `<p class="eyebrow">${o.i + 1} de ${o.items.length} · ${esc(l.n)}</p>${r.ctx ? `<p class="lead">${esc(r.ctx)}</p>` : ''}${r.cl ? `<div class="bub ai"><span class="who">Cliente</span>«${esc(r.cl)}» ${sayBtn(r.cl, 'cli')}</div>` : ''}`;
  let foot = '';
  if (o.st === 'ans' || o.st === 'busy') {
    body += `<details class="acc"><summary><span><b>Ver la técnica</b></span></summary><div class="in"><ol class="steps">${l.f.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div></details>`;
    foot = composer('sesIn', 'Di o escribe tu respuesta…') + `<div class="wrap"><button class="btn gold wide" data-act="sesCheck"${o.st === 'busy' ? ' disabled' : ''}>${o.st === 'busy' ? 'Revisando…' : 'Comprobar'}</button></div>`;
  } else {
    body += `<div class="bub me"><span class="who">Tú</span>${esc(o.ans)}</div>`;
    if (o.g) body += `<div class="fb ${o.g.ok ? 'ok' : 'bad'}"><b>${o.g.ok ? 'Bien respondido' : 'Se puede mejorar'}</b>${o.g.bien ? `<p>${esc(o.g.bien)}</p>` : ''}${o.g.mejora ? `<p>${esc(o.g.mejora)}</p>` : ''}${o.g.version ? `<p class="small"><b>Tu respuesta pulida:</b> «${esc(o.g.version)}»</p>` : ''}</div>`;
    body += `<div class="ex"><span class="eyebrow">Respuesta modelo</span><p>«${esc(r.m)}» ${sayBtn(r.m, 'vend')}</p><p class="small muted"><b>Qué debe tener:</b> ${esc(r.c)}</p></div>`;
    foot = o.st === 'self' ? `<div class="wrap"><p class="small muted">Compara con el modelo. ¿Cómo te fue?</p><div class="row"><button class="btn" data-act="sesSelf" data-v="0">Repasar</button><button class="btn gold" data-act="sesSelf" data-v="1">La dije bien</button></div></div>` : `<div class="wrap"><button class="btn gold wide" data-act="sesNext">Siguiente</button></div>`;
  }
  return `${head('Práctica', m.t)}<div class="sbody"><div class="wrap">${body}</div></div><footer class="sfoot">${foot}</footer>`;
};
async function sesCheck() {
  const o = stack[stack.length - 1]; if (!o || o.type !== 'ses' || o.st !== 'ans') return;
  const el = $('#sesIn'), txt = el ? el.value.trim() : '';
  if (txt.length < 3) return toast('Di o escribe tu respuesta primero.');
  if (listening) micStop(false);
  hush(); o.ans = txt; const it = o.items[o.i], l = LES[it.id];
  if (!aiKind()) { o.st = 'self'; return drawTop(); }
  o.st = 'busy'; drawTop(true);
  try {
    const g = await aiJSON(`Eres entrenador de ventas (métodos de Brian Tracy y Alex Dey) y calificas una respuesta de práctica.
Técnica: ${l.n}. Pasos: ${l.f.join(' ')}
${it.r.ctx ? 'Situación: ' + it.r.ctx + '\n' : ''}${it.r.cl ? 'El cliente dijo: «' + it.r.cl + '»\n' : ''}Criterio para aprobar: ${it.r.c}
Respuesta modelo (referencia, no hay que copiarla): «${it.r.m}»
Respuesta del alumno: «${txt}»
Devuelve SOLO JSON: {"ok": true o false, "bien": "qué hizo bien, 1 frase", "mejora": "qué cambiar, 1 frase", "version": "su respuesta mejorada, 1 o 2 frases"}. ok es true si cumple el criterio aunque use otras palabras. Tutéalo.`, 'low');
    if (stack[stack.length - 1] !== o) return;
    o.g = { ok: !!g.ok, bien: g.bien || '', mejora: g.mejora || '', version: g.version || '' };
    if (o.g.ok) { o.ok++; S.lesDone[it.id] = 1; save(); }
    o.st = 'fb'; drawTop();
    say((o.g.ok ? 'Bien. ' : '') + (o.g.mejora || ''), 'coach', {});
  } catch (e) { if (stack[stack.length - 1] !== o) return; o.st = 'self'; drawTop(); }
}

/* ───────── cliente entrenado (sin IA) ───────── */
const R = D.ROLE;
const TK = { sanguineo: 's', colerico: 'c', flematico: 'f', melancolico: 'm' };
const RX = {
  empatia: /(entiendo|comprendo|tiene(s)? (usted )?(toda la )?razon|es normal|es logico|me parece (muy )?bien|claro que si|con mucho gusto|lo se )/,
  caro: /(comparad[oa] con|respecto (a|de) que|en relacion (a|con) que|cuanto (cree|crees) que (valga|vale|costara|cueste)|primera (clase )?o (en )?segunda|ahorro o (la )?calidad|calidad o (el )?(precio|ahorro)|al dia |por dia |diarios? |un cafe|centavos)/,
  puerco: /(le gustaria|te gustaria|lo quiere|la quiere|lo quieres|lo prefiere|lo necesita|lo necesitas|es (este|ese) el que|respecto (a|de) que|comparad[oa] con que)/,
  amarre: /(verdad ?\?|verdad que|no es cierto|no cree|no crees|no le parece|no te parece|cierto ?\?|si o no)/,
  envolvente: /(a nombre (suyo|de)|la factura|para cuando (lo|la) (quiere|necesita|quieres)|(quien|a quien) (mas )?(lo |se lo )?va a (usar|manejar|ensenar)|donde lo va a (poner|usar|instalar)|el primero en|(lo |la )?va a (tomar|usar|compartir|estrenar)|lo van a usar)/,
  compromiso: /si (yo )?(se |te )?(lo |la )?(le |te )?(consigo|logro|arreglo|resuelvo|puedo conseguir|doy|dejo|incluyo|ajusto|instalo|entrego|pongo)/,
  demuestra: /si (yo )?(le |te )?(lo )?(demuestro|compruebo|muestro|ensen|pruebo)/,
  elimina: /(que (es lo que|parte) (quiere|desea|necesita) pensar|es por mi|es (por )?(la|el|mi|su) (empresa|calidad|precio|inversion|producto|garantia|servicio|reputacion) ?\?)/,
  franklin: /(a favor|en contra|razones (para|por las que)|dos columnas|benjamin|franklin|apuntemos|anotemos|hagamos una lista)/,
  duda: /(tiene (alguna|usted alguna) duda|le queda alguna duda|alguna duda (sobre|del|de)|que (informacion )?le (hace falta|falta)|olvide mencionarle|lo unico que (quiere|le falta) pensar)/,
  aisla: /(supongamos|aparte de (eso|esto)|si no fuera por|ademas de (eso|esto)|es lo unico|seria lo unico|si el dinero no fuera|fuera de eso|algo mas que (le|lo) (detenga|impida))/,
  consultar: /(si dependiera (solo |solamente |nada mas |unicamente )?de usted|que le preguntaria|los veo a (los )?dos|a los dos|con los dos|juntos|con (su|tu) (esposa|esposo|socio|pareja) presente)/,
  zapato: /(imagine que (usted )?(es|fuera)|imaginese que (usted )?(es|fuera)|pongase en|en (mi|su) lugar|si usted fuera|que haria usted|en los zapatos)/,
  referencia: /(un cliente|una clienta|otro cliente|otra clienta|clientes como usted|mis clientes|le paso a|me dijo lo mismo|lo mismo (me dijo|sentia|pensaba|pense))/,
  garantia: /(garantia|devolucion|reembolso|por escrito|sin riesgo|le regresamos)/,
  primo: /(antes de compr\w* a su|por que cambio|no le pido que cambie|solo (le pido que )?compare|comparar sin compromiso|compare)/,
  buscadores: /(buscadores|compradores|hacedores)/,
  gastos: /(inversion inicial|minima|se adapte|se ajuste|a su presupuesto|plan de pagos|mensualidades|apartado|empezar con poco|pagos (comodos|pequenos))/,
  banca: /(desde la banca|falta (alguna )?informacion|le hace falta)/,
  avion: /(piloto|avion|despega|lo esencial)/,
  pedido: /(nombre completo|su direccion|a que direccion|llen(o|amos|emos) (la|el|su) (solicitud|pedido|formato|registro)|su correo|su numero de)/,
  autoriza: /(autoriza|visto bueno|aprueba|apruebe|su aprobacion)/,
  invita: /(por que no lo (prueba|toma|empieza|empezamos)|empecemos|arrancamos|lo empezamos|se lo aparto)/,
  directivo: /(el siguiente paso|lo que sigue es|lo siguiente es)/,
  insinua: /(se imagina|imaginese|imaginate|te imaginas)/,
  prueba: /(pruebelo|llevese(lo)?|dias de prueba|a prueba|sin compromiso)/,
  familia: /(familia|hijos|esposa|esposo|seres queridos|tranquilidad|los suyos)/,
  datos: /([0-9]|garantia|por escrito|numeros|datos|comparativo|calculo|cuentas)/
};
const BAD = {
  discute: /(no es caro|esta equivocad|se equivoca|no tiene razon|eso no es (asi|cierto)|usted no entiende|no sabe lo que)/,
  presion: /(solo (por )?hoy|ultima oportunidad|se acaba (hoy|ya)|ahora o nunca|decidase ya|tiene que decidir(se)? (ya|hoy)|no lo piense)/,
  descuento: /(le (hago|doy) (un )?descuento|le bajo|se lo dejo (mas )?barato|le rebajo|rebaja)/,
  rinde: /(piense(lo)? (con calma|tranquilo)|cuando (usted )?(quiera|guste|pueda) me (llama|avisa|marca)|le dejo mi tarjeta|ahi me avisa|luego me dice)/
};
const CLOSE_TAGS = ['doble', 'pedido', 'autoriza', 'invita', 'directivo', 'envolvente', 'compromiso', 'prueba'];
const TAG_EXTRA = { pedido: 'Llenar el pedido', garantia: 'Garantía', empatia: 'Empatía' };
const tagLesson = t => LESSONS.find(l => l.tag === t && l.k !== 'base') || LESSONS.find(l => l.tag === t);
const tagName = t => (tagLesson(t) || {}).n || TAG_EXTRA[t] || t;
function detect(raw) {
  const t = ' ' + norm(raw).replace(/[¡!.,;:]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const tags = new Set();
  for (const k in RX) if (RX[k].test(t)) tags.add(k);
  const qs = t.split('?').slice(0, -1);
  if (qs.some(s => / (o|u) /.test(s.split('¿').pop()) && s.split('¿').pop().trim().split(' ').length <= 32)) tags.add('doble');
  if (!t.includes('?')) tags.delete('puerco');
  if (/^ ?¿? ?(verdad que|no le parece que|no cree que|no es cierto que|no te parece que|no crees que)/.test(t.trim())) tags.add('amarreinv');
  if (CLOSE_TAGS.some(k => tags.has(k)) && /\?\s*$/.test(raw.trim())) tags.add('silencio');
  return tags;
}
const cleanLine = t => String(t).replace(/\[(VENTA|PERDIDA)\]?/gi, '').replace(/\s+/g, ' ').trim();
function planBeats(cfg) {
  const n = { facil: 1, normal: 2, dificil: 3 }[cfg.dif] + (cfg.etapa === 'cita' ? 0 : 1);
  const all = Object.keys(R.beats).filter(k => !!R.beats[k].cita === (cfg.etapa === 'cita'));
  let plan = shuffle(all);
  const f = cfg.foco && LES[cfg.foco];
  if (f) { const fb = all.find(k => R.beats[k].lesson === f.id) || all.find(k => f.tag && R.beats[k].good.includes(f.tag)); if (fb) plan = [fb, ...plan.filter(k => k !== fb)]; }
  plan = plan.slice(0, Math.min(n, plan.length));
  if (cfg.etapa === 'cita' && plan.length < n) plan = plan.concat(shuffle(['confianza', 'viendo']).slice(0, n - plan.length));
  return plan;
}
function localStart(c) {
  const k = TK[c.cfg.tipo];
  c.local = { plan: planBeats(c.cfg), bi: 0, tries: 0, heat: 45, used: [], log: [], phase: 'beat' };
  if (c.cfg.etapa === 'cita') { c.local.phase = 'open'; return clientSay(c, R.open.cita[k]); }
  clientSay(c, R.open.cierre[k].replace(/\{p\}/g, c.cfg.prod) + ' ' + R.beats[c.local.plan[0]].c[k]);
}
function clientSay(c, line) {
  const m = /\[(VENTA|PERDIDA)\]/i.exec(line); if (m) c.end = m[1].toLowerCase();
  const t = cleanLine(line);
  c.msgs.push({ w: 'a', t }); c.at = Date.now(); save();
  if (chat === c) drawChatMsgs();
  say(t, 'cli', { tipo: c.cfg.tipo });
  handsFree(c);
}
function localTurn(c, txt) {
  const L = c.local, k = TK[c.cfg.tipo], tags = detect(txt), n = ' ' + norm(txt) + ' ', words = txt.split(/\s+/).length;
  const beatId = L.plan[L.bi], b = R.beats[beatId], out = [];
  const lastClient = L.phase === 'beat' ? b.c[k] : ((c.msgs.filter(m => m.w === 'a').pop() || {}).t || '');
  const bump = d => { L.heat = Math.max(0, Math.min(100, L.heat + d)); };
  const cita = c.cfg.etapa === 'cita';
  if (k === 'c' && words > 45) { bump(-6); out.push(R.bad.largo.c); }
  const bad = Object.keys(BAD).find(x => BAD[x].test(n));
  if (bad) {
    L.log.push({ beat: beatId, ok: false, bad, cl: lastClient, txt });
    if (bad === 'rinde') return clientSay(c, R.bad.rinde[k] + ' [PERDIDA]');
    bump(bad === 'presion' && (k === 'f' || k === 'm') ? -30 : -20);
    if (L.heat <= 0) return clientSay(c, R.bad[bad][k] + ' ' + R.lose[k]);
    out.push(R.bad[bad][k]); if (L.phase === 'beat') out.push(b.p[k]);
    return clientSay(c, out.join(' '));
  }
  const bonus = () => {
    if (k === 's' && ['insinua', 'envolvente', 'referencia'].some(x => tags.has(x))) return 6;
    if (k === 'c' && (words <= 30 || tags.has('demuestra'))) return 5;
    if (k === 'f' && ['datos', 'garantia', 'franklin'].some(x => tags.has(x))) return 6;
    if (k === 'm' && ['familia', 'empatia'].some(x => tags.has(x))) return 6;
    return 0;
  };
  const next = () => { L.bi++; L.tries = 0; if (L.bi < L.plan.length) out.push(R.beats[L.plan[L.bi]].c[k]); else { L.phase = 'close'; out.push(cita ? R.closeCita[k] : R.close[k]); } };
  if (L.phase === 'open') { L.phase = 'beat'; out.push(R.beats[L.plan[0]].c[k]); return clientSay(c, out.join(' ')); }
  const closes = cita ? ['doble'] : CLOSE_TAGS, hasClose = closes.some(x => tags.has(x));
  if (L.phase === 'beat') {
    const hit = b.good.filter(g => tags.has(g));
    if (hit.length) { bump(18 + bonus()); hit.forEach(h => addU(L.used, h)); if (tags.has('silencio')) addU(L.used, 'silencio'); L.log.push({ beat: beatId, ok: true, hit, cl: lastClient, txt }); out.push(pick(R.ok[k])); next(); return clientSay(c, out.join(' ')); }
    if (hasClose && L.heat >= 75) { closes.filter(x => tags.has(x)).forEach(x => addU(L.used, x)); if (tags.has('silencio')) addU(L.used, 'silencio'); return clientSay(c, (cita ? R.winCita : R.win)[k]); }
    const partial = tags.has('empatia') || tags.has('amarre') || txt.includes('?');
    if (partial && tags.has('amarre')) addU(L.used, 'amarre');
    bump(partial ? 0 : -10); L.tries++;
    if (L.heat <= 0) return clientSay(c, R.lose[k]);
    if (L.tries >= 2) { bump(-8); L.log.push({ beat: beatId, ok: false, cl: lastClient, txt }); if (!cita) out.push('Bueno…'); next(); }
    else out.push(b.p[k]);
    return clientSay(c, out.filter(Boolean).join(' '));
  }
  if (hasClose) {
    closes.filter(x => tags.has(x)).forEach(x => addU(L.used, x)); if (tags.has('silencio')) addU(L.used, 'silencio');
    if (L.heat >= 40) return clientSay(c, (cita ? R.winCita : R.win)[k]);
    if (!cita && !L.plan.includes('pensar')) { L.plan.push('pensar'); L.phase = 'beat'; L.tries = 0; return clientSay(c, 'Mmm… todavía no estoy seguro. ' + R.beats.pensar.c[k]); }
    return clientSay(c, R.lose[k]);
  }
  L.tries++; L.log.push({ beat: 'cierre', ok: false, cl: lastClient, txt });
  if (L.tries >= 2) return clientSay(c, R.lose[k]);
  return clientSay(c, R.closePush[k]);
}
function localHint(c) {
  const L = c.local;
  if (L.phase === 'close') return c.cfg.etapa === 'cita' ? 'Pista: pide la cita con doble alternativa. «¿Le queda mejor el jueves o el viernes? ¿En la mañana o en la tarde?»' : 'Pista: el cliente ya está listo. Pide la venta con un cierre: doble alternativa («¿Lo dejamos a su nombre o al de la empresa?»), autorización o el siguiente paso. Termina en pregunta y calla.';
  if (L.phase === 'open') return 'Pista: preséntate en una frase, di quién te recomendó si aplica y da una razón corta para la llamada.';
  const l = LES[R.beats[L.plan[L.bi]].lesson];
  return `Pista: ${l.n}. ${l.f[0]} ${l.f[1] || ''} Ejemplo: «${l.resp[0].m}»`;
}
function localReport(c) {
  const L = c.local, t = TIPO[c.cfg.tipo], log = L.log, closed = c.end === 'venta';
  const okN = log.filter(x => x.ok).length, all = log.filter(x => x.beat !== 'cierre').length || 1;
  const score = Math.round(L.heat * 0.45 + okN / all * 25 + (closed ? 22 : 0) + Math.min(8, L.used.length * 2));
  const BADT = { discute: 'Discutiste con el cliente. Regla de Dey: nunca discutas ni contradigas sus emociones.', presion: 'Presionaste con urgencia. La presión enfría, sobre todo al flemático y al melancólico.', descuento: 'Ofreciste descuento de entrada. El cliente deja de creer en tu precio.', rinde: 'Te rendiste y lo dejaste ir a pensarlo. Dale todo dentro de la cita.' };
  const aciertos = log.filter(x => x.ok).slice(0, 3).map(x => `Ante «${x.cl.slice(0, 70)}» usaste ${x.hit.map(tagName).join(' y ')}.`);
  if (closed && L.used.includes('silencio')) aciertos.push('Cerraste con una pregunta y te callaste: teoría del silencio.');
  const mejoras = [];
  log.filter(x => !x.ok).forEach(x => { if (mejoras.length >= 3) return; if (x.bad) mejoras.push(BADT[x.bad]); else if (x.beat === 'cierre') mejoras.push('El cliente te dio la señal de compra y no pediste la venta. Usa doble alternativa, autorización o el siguiente paso.'); else mejoras.push(`Ante «${x.cl.slice(0, 70)}» faltó la técnica: ${LES[R.beats[x.beat].lesson].n}.`); });
  if (!closed && !mejoras.length) mejoras.push('No llegaste a pedir la venta. Resuelve la objeción y cierra con una pregunta.');
  const miss = log.find(x => !x.ok && x.beat !== 'cierre' && !x.bad) || log.find(x => !x.ok && x.beat !== 'cierre'), ml = miss && LES[R.beats[miss.beat].lesson];
  return { puntaje: score, tecnicas: L.used.map(tagLesson).filter(Boolean).map(l => ({ id: l.id, bien: true })), aciertos, mejoras,
    mejor_frase: miss ? { cliente: miss.cl, dijiste: miss.txt, prueba: ml.resp[0].m } : (!closed ? { prueba: c.cfg.etapa === 'cita' ? '¿Le queda mejor el jueves en la mañana o el viernes en la tarde?' : '¿Lo dejamos a nombre suyo o de la empresa?' } : {}),
    resumen: closed ? `Cerraste con el cliente en ${L.heat}/100 de interés.` : c.end === 'perdida' ? 'El cliente se fue. Revisa en qué momento se enfrió.' : 'La cita quedó abierta: faltó llegar al cierre.',
    adaptacion: `Con un ${t.n.toLowerCase()}: ${t.presenta}`,
    siguiente: ml ? `Repasa «${ml.n}» en la Biblioteca y vuelve a intentar este cliente.` : 'Sube la dificultad o prueba otro tipo de cliente.' };
}

/* ───────── acciones ───────── */
const meType = a => TIPO[a.q1 === 'r' ? (a.q2 === 'g' ? 'sanguineo' : 'colerico') : (a.q2 === 'g' ? 'melancolico' : 'flematico')];
const defCfg = m => { const saved = S.cfg[m] || {}; return Object.assign({ prod: S.prod || '', tipo: 'sorpresa', etapa: 'cierre', dif: 'normal', foco: '', comprador: '' }, saved, { estilo: saved.estilo || S.estilo, prod: saved.prod || S.prod || '' }); };
function syncSetup(o) { if (!o || o.type !== 'setup') return; const p = $('#cfgProd'); if (p) o.cfg.prod = p.value; const f = $('#cfgFoco'); if (f) o.cfg.foco = f.value; }
function copy(text, ok) { try { navigator.clipboard.writeText(text).then(() => toast(ok), () => toast('No se pudo copiar. Mantén presionado para copiar.')); } catch (e) { toast('No se pudo copiar.'); } }
const ACT = {
  go: b => { while (stack.length) leave(stack.pop()); drawTop(); go(b.dataset.v); },
  back: () => pop(),
  closeAll: () => { while (stack.length) leave(stack.pop()); drawTop(); render(); },
  say: b => { hush(); let ctx = {}; try { ctx = JSON.parse(b.dataset.ctx || '{}'); } catch (e) {} if (!canSpeak()) return toast('Aquí la página no puede hablar en voz alta.'); say(b.dataset.text, b.dataset.role, ctx, true); },
  setup: b => { const m = b.dataset.m; while (stack.length && ['setup', 'eval'].includes(stack[stack.length - 1].type)) stack.pop(); push({ type: 'setup', m, cfg: defCfg(m) }); },
  cfg: b => { const o = stack[stack.length - 1]; syncSetup(o); o.cfg[b.dataset.k] = b.dataset.v; drawTop(true); },
  goKey: () => { while (stack.length) leave(stack.pop()); drawTop(); go('perfil'); setTimeout(() => { const k = $('#ia'); if (k) k.scrollIntoView(); }, 50); },
  startChat: () => {
    const o = stack[stack.length - 1]; syncSetup(o); const cfg = Object.assign({}, o.cfg);
    if (o.m !== 'coach' && cfg.prod.trim().length < 3) { const i = $('#cfgProd'); if (i) i.focus(); return toast('Escribe qué se vende en esta práctica.'); }
    cfg.prod = cfg.prod.trim();
    if (o.m === 'cliente' || o.m === 'entrenado') { cfg.hide = cfg.tipo === 'sorpresa'; if (cfg.hide) cfg.tipo = pick(D.TIPOS).id; if (o.m === 'entrenado' && cfg.etapa === 'completa') cfg.etapa = 'cierre'; }
    if (o.m !== 'vendedor' && cfg.prod && !S.prod) S.prod = cfg.prod;
    S.cfg[o.m] = Object.assign({}, o.cfg); save();
    startChat(o.m, cfg);
  },
  openChat: b => { const c = S.chats.find(x => x.id === b.dataset.id); if (c) openChat(c, false); },
  delChat: b => { S.chats = S.chats.filter(x => x.id !== b.dataset.id); save(); render(); },
  mic: b => { const id = b.dataset.for; if (listening) return micStop(true); micStart(id, () => send(id)); },
  send: b => send(b.dataset.for),
  retry: () => { if (chat) { chat._err = ''; aiTurn(chat); } },
  pista: async () => {
    const c = chat; if (!c || c._busy || c.end) return;
    if (c.mode === 'entrenado') { c.msgs.push({ w: 's', t: localHint(c) }); save(); return drawChatMsgs(); }
    c.msgs.push({ w: 's', t: 'Pensando una pista…' }); drawChatMsgs(); const slot = c.msgs[c.msgs.length - 1];
    try {
      const tr = c.msgs.filter(m => m.w !== 's').map(m => (m.w === 'a' ? 'CLIENTE: ' : 'VENDEDOR: ') + m.t).join('\n');
      const t = await aiStream('Eres entrenador de ventas con los métodos de Brian Tracy y Alex Dey.', [{ role: 'user', content: `Tu alumno vende ${c.cfg.prod} y está a media práctica.\nTécnicas:\n${techList()}\n\nConversación:\n${tr}\n\nDale UNA pista para su siguiente frase: el nombre de la técnica y una frase modelo de máximo 25 palabras adaptada a su producto. Texto plano, sin markdown.` }], { tier: 'quick' });
      slot.t = 'Pista: ' + cleanAI(t);
    } catch (e) { slot.t = errMsg(e.code); }
    save(); drawChatMsgs();
  },
  evaluar: () => { const top = stack[stack.length - 1]; if (top && top.type === 'eval') stack.pop(); evaluar(); },
  again: () => { const c = chat; while (stack.length) leave(stack.pop()); drawTop(); if (c) startChat(c.mode, Object.assign({}, c.cfg)); },
  mod: b => { const i = Number(b.dataset.i); if (!modOpen(i)) return toast('Completa el módulo anterior para abrir éste, o ábrelos todos en Perfil.'); const top = stack[stack.length - 1]; if (top && top.type === 'mod') stack.pop(); push({ type: 'mod', i }); },
  modDone: b => { const m = MODS[Number(b.dataset.i)]; if (b.dataset.v === '1') { S.modDone[m.id] = 1; toast('Módulo completado. Se abrió el siguiente.'); } else delete S.modDone[m.id]; save(); drawTop(); },
  leer: b => { const mi = Number(b.dataset.i); const o = { type: 'leer', mi, paras: buildParas(MODS[mi]), i: 0, playing: canSpeak() }; push(o); if (o.playing) leerRun(o); },
  leerPlay: () => { const o = stack[stack.length - 1]; if (!canSpeak()) return toast('Aquí la página no puede hablar en voz alta.'); o.playing = !o.playing; if (o.playing) { if (o.i >= o.paras.length - 1) o.i = 0; leerRun(o); } else { o.tok = (o.tok || 0) + 1; hush(); drawTop(true); } },
  leerJump: b => { const o = stack[stack.length - 1]; o.i = Number(b.dataset.i); hush(); if (canSpeak()) { o.playing = true; leerRun(o); } else drawTop(true); },
  listenLesson: b => { const l = LES[b.dataset.id]; const o = { type: 'leer', mi: lessonMod(l.id), single: true, paras: buildParas({ t: l.n, d: l.src, ls: [l.id] }).slice(1, -1), i: 0, playing: canSpeak() }; push(o); if (o.playing) leerRun(o); },
  demo: b => { const d = DEMO[b.dataset.id]; const o = { type: 'demo', d, n: 0, playing: true, ai: false }; push(o); demoRun(o); },
  demoPlay: () => { const o = stack[stack.length - 1]; o.playing = !o.playing; if (o.playing) demoRun(o); else { o.tok = (o.tok || 0) + 1; hush(); drawTop(true); } },
  demoStep: () => { const o = stack[stack.length - 1]; o.playing = false; o.tok = (o.tok || 0) + 1; hush(); if (o.n >= o.d.lines.length) o.n = 0; const ln = o.d.lines[o.n]; o.n++; drawTop(true); const sb = $('.sbody'); if (sb) sb.scrollTop = sb.scrollHeight; say(ln[1], ln[0] === 'v' ? 'vend' : ln[0] === 'c' ? 'cli' : 'coach', {}, true); },
  demoAI: async b => {
    const o = stack[stack.length - 1], base = DEMO[b.dataset.id], m = MODS.find(x => x.demo === base.id);
    if (!S.prod) return toast('Primero escribe en Perfil qué vendes.');
    o.gen = true; o.playing = false; o.tok = (o.tok || 0) + 1; hush(); drawTop(true);
    try {
      const r = await aiJSON(`Escribe una escena corta de venta en español latino para enseñar estas técnicas: ${m.ls.map(id => LES[id].n + ' (' + LES[id].f[0] + ')').join('; ')}.
Producto: ${S.prod}. Usa como modelo esta escena: ${JSON.stringify(base.lines)}.
Devuelve SOLO JSON: {"t": "título corto", "ctx": "situación en 1 frase", "lines": [["v" o "c" o "n", "texto", "id de técnica o vacío"], ...]} con 8 a 12 líneas. "v" es el vendedor, "c" el cliente y "n" una nota breve del coach. Los ids válidos son: ${m.ls.join(', ')}.`);
      const lines = (Array.isArray(r.lines) ? r.lines : []).filter(x => Array.isArray(x) && ['v', 'c', 'n'].includes(x[0]) && x[1]).map(x => [x[0], String(x[1]), LES[x[2]] && m.ls.includes(x[2]) ? x[2] : '']);
      if (lines.length < 4) throw { code: 'invalid_json' };
      const nd = { id: base.id + '-ia', t: String(r.t || base.t), ctx: String(r.ctx || S.prod), lines };
      if (stack[stack.length - 1] !== o) return;
      stack.pop(); const no = { type: 'demo', d: nd, n: 0, playing: true, ai: true }; push(no); demoRun(no);
    } catch (e) { o.gen = false; if (stack[stack.length - 1] === o) drawTop(true); toast(errMsg(e.code, e.message)); }
  },
  tema: b => push({ type: 'tema', id: b.dataset.id }),
  clase: b => { const mi = Number(b.dataset.i); if (!aiKind()) return push({ type: 'setup', m: 'coach', cfg: defCfg('coach') }); startChat('clase', { mi, estilo: S.estilo, prod: S.prod }); },
  practica: b => startPractica(Number(b.dataset.i)),
  practicaAgain: b => { stack.pop(); startPractica(Number(b.dataset.i)); },
  sesCheck: () => sesCheck(),
  sesSelf: b => { const o = stack[stack.length - 1]; if (b.dataset.v === '1') { o.ok++; S.lesDone[o.items[o.i].id] = 1; save(); } o.i++; o.st = 'ans'; o.g = null; drawTop(); sesSpeak(); },
  sesNext: () => { const o = stack[stack.length - 1]; o.i++; o.st = 'ans'; o.g = null; drawTop(); sesSpeak(); },
  quiz: b => { quiz[b.dataset.q] = b.dataset.v; if (quiz.q1 && quiz.q2) { S.me = meType(quiz).id; save(); toast('Tu estilo: ' + TIPO[S.me].n + '.'); } render(); },
  setMe: b => { S.me = b.dataset.v; save(); render(); },
  setEst: b => { S.estilo = b.dataset.v; save(); render(); },
  tog: b => { const [a, k] = b.dataset.k.split('.'); if (k) S[a][k] = !S[a][k]; else S[a] = !S[a]; if (b.dataset.k === 'voz.on' && !S.voz.on) hush(); save(); if (stack.length) { const top = stack[stack.length - 1]; if (top.type === 'chat') { const btn = b; btn.innerHTML = S.voz.on ? IC.speaker : IC.mute; btn.setAttribute('aria-label', S.voz.on ? 'Silenciar voz' : 'Activar voz'); } else drawTop(true); } else render(); },
  testVoice: b => { hush(); if (!canSpeak()) return toast('Aquí la página no puede hablar en voz alta.'); say(b.dataset.role === 'cli' ? 'Me interesa, pero se me hace caro. ¿Qué me puede ofrecer?' : b.dataset.role === 'vend' ? 'Con gusto. ¿Lo dejamos a nombre suyo o al de la empresa?' : 'Hola, campeón. Vamos a practicar cierres de venta.', b.dataset.role, {}, true); },
  saveKey: () => { const v = ($('#keyIn').value || '').trim(); if (!v) return toast('Pega tu clave de API.'); if (!/^sk-ant-/.test(v)) return toast('La clave de Anthropic empieza con «sk-ant-».'); lsSet(KKEY, v); sdkClient = null; toast('Clave guardada en este teléfono.'); refreshStatus(); render(); },
  delKey: () => { lsSet(KKEY, null); sdkClient = null; toast('Clave borrada.'); refreshStatus(); render(); },
  saveGem: () => { const v = ($('#gemIn').value || '').trim().replace(/\s+/g, ''); if (!v) return toast('Pega tu clave de Gemini.'); if (/^sk-/.test(v)) return toast('Esa parece una clave de otra empresa. La de Gemini la sacas en aistudio.google.com.'); if (v.length < 20) return toast('La clave parece incompleta. Cópiala otra vez.'); lsSet(GKEY, v); gemList = null; toast('Clave de Gemini guardada. Probando…'); refreshStatus(); render(); ACT.testAI({ dataset: { p: 'gemini' } }); },
  delGem: () => { lsSet(GKEY, null); gemList = null; toast('Clave de Gemini borrada.'); refreshStatus(); render(); },
  gemTier: b => { S.gemTier = b.dataset.v; save(); render(); },
  testAI: async b => { toast('Probando la conexión…'); try { const t = await aiStream('Responde en español con una frase corta.', [{ role: 'user', content: 'Saluda y di que estás listo para practicar ventas.' }], { maxTokens: 300, kind: (b && b.dataset && b.dataset.p) || undefined }); toast('Funciona: «' + cleanAI(t).slice(0, 70) + '»'); } catch (e) { toast(errMsg(e.code, e.message)); } },
  perms: async () => { try { await caps.perm.manage(); } catch (e) { toast('Abre el menú de Permisos de esta página y permite que use Claude.'); } aiOff = false; refreshStatus(); },
  copyLink: () => copy(APP_URL, 'Enlace copiado.'),
  install: async () => { if (!installEvt) return; installEvt.prompt(); try { await installEvt.userChoice; } catch (e) {} installEvt = null; render(); },
  num: b => { const k = dayKey(), n = S.nums[k] || (S.nums[k] = { p: 0, r: 0, c: 0 }); n[b.dataset.k] = Math.max(0, n[b.dataset.k] + Number(b.dataset.d)); const keep = Object.keys(S.nums).sort().slice(-60); S.nums = Object.fromEntries(keep.map(x => [x, S.nums[x]])); save(); const y = $('#view').scrollTop; render(); $('#view').scrollTop = y; },
  backup: () => { try { copy(btoa(unescape(encodeURIComponent(ser(S)))), 'Respaldo copiado. Guárdalo en tus notas.'); } catch (e) { toast('No se pudo copiar el respaldo.'); } },
  restoreOpen: () => { restoreOpen = !restoreOpen; render(); },
  restore: () => { try { const raw = $('#restoreIn').value.trim(); const s = JSON.parse(decodeURIComponent(escape(atob(raw)))); if (!s || typeof s !== 'object' || !Array.isArray(s.chats)) throw 0; S = Object.assign(DEF(), s); save(); restoreOpen = false; toast('Respaldo restaurado.'); render(); } catch (e) { toast('Ese respaldo no es válido.'); } },
  resetAsk: () => { resetAsk = true; render(); },
  resetNo: () => { resetAsk = false; render(); },
  resetYes: () => { resetAsk = false; const keep = { prod: S.prod, voz: S.voz, estilo: S.estilo, model: S.model }; S = Object.assign(DEF(), keep); save(); toast('Progreso borrado.'); go('hablar'); }
};

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
  const f = ACT[b.dataset.act]; if (f) { e.preventDefault(); f(b, e); }
});
document.addEventListener('change', e => {
  const t = e.target, k = t.dataset.change; if (!k) return;
  if (k === 'prod') { S.prod = t.value.trim(); save(); }
  if (k === 'model') { S.model = t.value; save(); refreshStatus(); }
  if (k === 'voice') { S.voz.pick[t.dataset.role] = t.value; save(); }
  if (k === 'rate') { S.voz.rate = Number(t.value); save(); render(); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.input === 'libQ') { libQ = t.value; const r = $('#libRes'); if (r) r.innerHTML = libBody(); }
  if (t.tagName === 'TEXTAREA') grow(t);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
  const t = e.target; if (!t.matches || !t.matches('textarea[data-send]')) return;
  e.preventDefault(); send(t.dataset.send);
});

/* ───────── arranque ───────── */
render();
initCloud();
})();
