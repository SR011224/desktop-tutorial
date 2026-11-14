(() => {
'use strict';
const D = window.DOJO;
const LESSONS = D.LESSONS;
LESSONS.forEach((l, i) => { l.i = i; });
const LES = Object.fromEntries(LESSONS.map(l => [l.id, l]));
const TIPO = Object.fromEntries(D.TIPOS.map(t => [t.id, t]));
const NAMED = LESSONS.filter(l => ['dey', 'deyx', 'tracy'].includes(l.k));
const LIVE = l => !!l.tag;
const KIND = { base: 'Fundamento', dey: 'Cierre de Alex Dey', deyx: 'Cierre de Alex Dey', tracy: 'Cierre de Brian Tracy', obj: 'Objeción', post: 'Después del cierre' };

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const dayKey = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ───────── estado y guardado ───────── */
const KEY = 'dojo-cierres.v1';
const DEF = { rev: 0, xp: 0, streak: 0, last: '', day: { d: '', xp: 0 }, done: {}, prod: '', voz: true, auto: true, nums: {}, sims: 0, best: 0, goal: 30, srs: {}, onb: 0, me: '' };
let S = (() => { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return Object.assign({}, DEF); } })();
function localSave() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
let cloudDoc = null, cloudBusy = false, cloudDirty = false, cloudTimer = 0;
function save() { S.rev = Date.now(); localSave(); if (cloudDoc) { cloudDirty = true; clearTimeout(cloudTimer); cloudTimer = setTimeout(flush, 1500); } drawStats(); }
async function flush() {
  if (!cloudDoc || cloudBusy) return;
  cloudBusy = true; cloudDirty = false;
  try { await cloudDoc.set(JSON.parse(JSON.stringify(S))); } catch (e) { if (e && e.code !== 'unavailable') cloudDoc = null; }
  cloudBusy = false;
  if (cloudDirty && cloudDoc) { clearTimeout(cloudTimer); cloudTimer = setTimeout(flush, 1500); }
}
async function pull() {
  if (!cloudDoc || cloudDirty || cloudBusy) return;
  try {
    const snap = await cloudDoc.get();
    const r = snap.exists ? snap.data() : null;
    if (r && Number(r.rev) > S.rev) { S = Object.assign({}, DEF, JSON.parse(JSON.stringify(r))); localSave(); drawStats(); if (!ses && !(sim && sim.on)) render(); }
    else if (S.rev > 0 && (!r || S.rev > Number(r.rev))) { cloudDirty = true; flush(); }
  } catch (e) {}
}
async function initCloud() {
  try {
    const c = window.claude; if (!c || !c.use) return;
    const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
    if (!db || !user) return;
    const uid = await user.id(); if (!uid) return;
    cloudDoc = db.doc('data/users/' + uid + '/progreso');
    await pull();
  } catch (e) { cloudDoc = null; }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) pull(); });

function streakNow() { return (S.last === dayKey() || S.last === dayKey(-1)) ? S.streak : 0; }
function addXP(n) {
  const t = dayKey();
  if (S.last !== t) { S.streak = S.last === dayKey(-1) ? S.streak + 1 : 1; S.last = t; }
  if (S.day.d !== t) S.day = { d: t, xp: 0 };
  S.day.xp += n; S.xp += n;
}
const stampsOf = l => { const d = S.done[l.id] || {}; return (d.a ? 1 : 0) + (d.p ? 1 : 0) + (LIVE(l) && d.v ? 1 : 0); };
const maxStamps = l => LIVE(l) ? 3 : 2;
const unlocked = l => l.i === 0 || !!(S.done[LESSONS[l.i - 1].id] || {}).a;
const nextLesson = () => LESSONS.find(l => !(S.done[l.id] || {}).a);
/* Repaso espaciado: cada técnica vuelve justo antes de olvidarse (1, 2, 4, 7, 15 y 30 días). */
const GAPS = [1, 2, 4, 7, 15, 30];
function srsSet(id, ok) { const r = S.srs[id] || { b: 0 }; r.b = ok ? Math.min(r.b + 1, GAPS.length - 1) : 0; r.due = dayKey(GAPS[r.b]); S.srs[id] = r; }
const dueList = () => LESSONS.filter(l => (S.done[l.id] || {}).a && (!S.srs[l.id] || S.srs[l.id].due <= dayKey()))
  .sort((a, b) => ((S.srs[a.id] || {}).due || '').localeCompare((S.srs[b.id] || {}).due || ''));
const meType = a => TIPO[a.q1 === 'r' ? (a.q2 === 'g' ? 'sanguineo' : 'colerico') : (a.q2 === 'g' ? 'melancolico' : 'flematico')];

/* ───────── capacidades: IA, voz, dictado ───────── */
const caps = { sample: null, tts: null, dict: null, ready: false };
let aiOff = false, ttsOff = false, micOff = false, dictLang = true, listening = false, micT = null, webRec = null;
const WebRec = window.SpeechRecognition || window.webkitSpeechRecognition;
function markCaps() {
  const b = document.body;
  b.dataset.ai = !caps.ready ? 'wait' : (caps.sample && !aiOff ? 'on' : 'off');
  b.toggleAttribute('data-mic', !micOff && (!!caps.dict || (caps.ready && !!WebRec)));
}
const capP = (async () => {
  const c = window.claude;
  if (c && c.use) {
    const [s, t, d] = await Promise.all(['sample', 'tts', 'dictation'].map(n => c.use(n).catch(() => null)));
    caps.sample = s; caps.tts = t; caps.dict = d;
  }
  caps.ready = true;
  if (caps.dict) {
    caps.dict.onFinal(({ text }) => { const t = micT && document.getElementById(micT); if (!t) return; t.value = t.value ? t.value + text : text.replace(/^\s+/, ''); setPartial(''); armSilence(); });
    caps.dict.onPartial(({ text }) => { setPartial(text); if (text) clearTimeout(silT); });
    caps.dict.onState(({ state, reason }) => { setListening(state !== 'idle'); if (state === 'idle' && reason === 'not_granted') { micOff = true; markCaps(); } });
  }
  markCaps();
})();
let silT = 0;
function armSilence() {
  clearTimeout(silT);
  const t = micT && document.getElementById(micT);
  if (!S.auto || !t || !t.dataset.send) return;
  silT = setTimeout(() => { if (listening && caps.dict) caps.dict.stop().then(() => afterMic(true), () => {}); }, 1800);
}
const aiReady = () => caps.ready && caps.sample && !aiOff;
async function ask(input, opts, json) {
  await capP;
  if (!caps.sample || aiOff) throw { code: 'no_ai' };
  try { return json ? await caps.sample.json(input, opts) : await caps.sample(input, opts); }
  catch (e) {
    if (e && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled'].includes(e.code)) { aiOff = true; markCaps(); }
    throw e || { code: 'upstream_error' };
  }
}
const errMsg = code => ({
  rate_limited: 'Llegaste al límite de uso por ahora. Intenta de nuevo en unos minutos.',
  session_expired: 'Tu sesión expiró. Vuelve a iniciar sesión en Claude.',
  refused: 'Claude no pudo responder a eso. Cambia la frase e intenta de nuevo.',
  no_ai: 'La IA no está disponible en esta vista.', not_granted: 'La IA no está permitida en esta vista.',
  invalid_json: 'La respuesta llegó incompleta. Intenta de nuevo.', prompt_too_large: 'La conversación es demasiado larga. Empieza una nueva.'
}[code] || 'Hubo un problema de conexión. Intenta de nuevo.');

function say(text, voice, force) {
  return new Promise(done => {
    if ((!S.voz && !force) || !text) return done();
    text = String(text).slice(0, 1900);
    if (caps.tts && !ttsOff) {
      caps.tts.speak(text, { language: 'es', voice: voice || 'buttery' }).then(() => done(), e => { if (e && (e.code === 'not_granted' || e.code === 'unavailable')) ttsOff = true; done(); });
      return;
    }
    if (caps.ready && !caps.tts && !ttsOff && 'speechSynthesis' in window) {
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text); u.lang = 'es-MX';
        const v = speechSynthesis.getVoices().find(x => /^es/i.test(x.lang)); if (v) u.voice = v;
        u.onend = u.onerror = () => done();
        speechSynthesis.speak(u);
        return;
      } catch (e) {}
    }
    done();
  });
}
function hush() { try { if (caps.tts) caps.tts.stop().catch(() => {}); if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {} }
function setPartial(t) { const p = $('#partial'); if (p) p.textContent = t || ''; }
function setListening(v) { listening = v; document.body.toggleAttribute('data-listening', v); if (!v) setPartial(''); }
function afterMic(autoSend) { const t = micT && document.getElementById(micT); if (autoSend && S.auto && t && t.dataset.send && t.value.trim()) ACT[t.dataset.send](); }
function micToggle(target) {
  if (listening) {
    clearTimeout(silT);
    if (caps.dict) caps.dict.stop().then(() => afterMic(true), () => {});
    else if (webRec) { webRec._send = true; webRec.stop(); }
    return;
  }
  micT = target; hush();
  if (caps.dict) {
    caps.dict.start(dictLang ? { language: 'es' } : undefined).catch(e => {
      const c = e && e.code;
      if (c === 'unavailable' && dictLang) { dictLang = false; toast('El dictado en español no está disponible aquí. Toca de nuevo para usar el idioma de tu cuenta.'); }
      else if (c === 'not_granted' || c === 'unavailable') { micOff = true; markCaps(); toast('El micrófono no está permitido aquí. Usa el dictado de tu teclado.'); }
      else if (c === 'rate_limited' || c === 'upstream_error') toast('El dictado falló. Intenta de nuevo.');
    });
    return;
  }
  if (!WebRec) return;
  try {
    const tgt = document.getElementById(target), auto = !!(S.auto && tgt && tgt.dataset.send);
    const r = webRec = new WebRec(); r.lang = 'es-MX'; r.continuous = !auto; r.interimResults = true; r._send = auto;
    r.onresult = ev => {
      const t = document.getElementById(micT); let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const txt = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) { if (t) t.value = (t.value ? t.value.replace(/\s+$/, '') + ' ' : '') + txt.trim(); } else interim += txt;
      }
      setPartial(interim);
    };
    r.onerror = ev => { if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') { micOff = true; markCaps(); toast('El micrófono no está disponible aquí. Usa el dictado de tu teclado.'); } };
    r.onend = () => { setListening(false); afterMic(!!r._send); };
    r.start(); setListening(true);
  } catch (e) { micOff = true; markCaps(); }
}

/* ───────── utilidades de interfaz ───────── */
let toastT = 0;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3800); }
const ICON = {
  mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  lock: '<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};
const sayBtn = (text, voice) => `<button class="say-btn" data-act="say" data-text="${esc(text)}" data-voice="${voice || ''}">Escuchar</button>`;
const micBtn = target => `<button class="mic" data-act="mic" data-for="${target}" aria-label="Hablar">${ICON.mic}</button>`;
const noMic = '<p class="no-mic">Para hablar en vez de escribir, usa el micrófono del teclado de tu celular.</p>';
function drawStats() {
  const nSt = LESSONS.reduce((n, l) => n + stampsOf(l), 0);
  $('#stats').innerHTML = `<span><b>${streakNow()}</b> ${streakNow() === 1 ? 'día' : 'días'}</span><span><b>${S.xp}</b> XP</span><span><b>${nSt}</b> ${nSt === 1 ? 'sello' : 'sellos'}</span>`;
}

/* ───────── navegación ───────── */
const VIEWS = ['ruta', 'simulador', 'objeciones', 'coach', 'guia'];
let view = 'ruta';
function go(v) { if (location.hash.slice(1) === v) render(); else location.hash = v; }
function render() {
  view = VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'ruta';
  document.querySelectorAll('.tab').forEach(t => { if (t.dataset.v === view) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current'); });
  const el = $('#view');
  const chat = (view === 'simulador' && sim && sim.on && !sim.ev) || view === 'coach';
  el.classList.toggle('chatmode', chat); el.classList.toggle('gut', !chat);
  el.innerHTML = ({ ruta: vRuta, simulador: vSim, objeciones: vObj, coach: vCoach, guia: vGuia })[view]();
  if (!chat) el.scrollTop = 0; else scrollMsgs();
  drawStats();
}
window.addEventListener('hashchange', () => { hush(); render(); });

/* ───────── vista: ruta ───────── */
function vRuta() {
  const nx = nextLesson(); const dxp = S.day.d === dayKey() ? S.day.xp : 0;
  const allDone = LESSONS.reduce((n, l) => n + (stampsOf(l) === maxStamps(l) ? 1 : 0), 0);
  const due = dueList().length, me = S.me && TIPO[S.me], G = S.goal || 30;
  let h = `<div class="wrap"><section class="today">
    <div class="field"><p class="label">${nx ? 'Tu siguiente renglón' : 'Ruta completa'}</p>
    <h1>${nx ? esc(nx.n) : 'Ahora, a dominarlos en vivo'}</h1>
    <p class="small">${nx ? esc(KIND[nx.k]) + ' · ' + esc(nx.src) + '. Cinco minutos: aprendes la fórmula y la practicas.' : 'Dominaste ' + allDone + ' de ' + LESSONS.length + ' lecciones. Gana los sellos que faltan en el Simulador.'}</p></div>
    <div class="acts">${due ? `<button class="btn alt" data-act="repaso">Repaso del día · ${due}</button>` : ''}<button class="btn" data-act="${nx ? 'lesson' : 'go'}" data-id="${nx ? nx.id : ''}" data-v="simulador">${nx ? (stampsOf(nx) ? 'Continuar' : 'Empezar lección') : 'Abrir el Simulador'}</button></div>
    <div class="meter"><span>Meta de hoy: ${Math.min(dxp, G)} / ${G} XP${dxp >= G ? ' · cumplida' : ''}</span><div class="bar"><i style="width:${Math.min(100, dxp / G * 100)}%"></i></div></div>
  </section>
  ${me ? `<p class="small muted">Eres <b>${esc(me.n.toLowerCase())}</b>. Tu reto: ${esc(me.reto)} Tus lecciones clave están marcadas.</p>` : ''}`;
  D.UNITS.forEach((u, ui) => {
    const ls = LESSONS.filter(l => l.u === ui); const dn = ls.filter(l => (S.done[l.id] || {}).a).length;
    h += `<section class="unit"><header><div class="hrow"><p class="label">Unidad ${ui + 1} · ${esc(u.src)}</p><p class="label">${dn}/${ls.length}</p></div><h2>${esc(u.t)}</h2><p class="muted small">${esc(u.d)}</p></header><ol class="lines">`;
    ls.forEach(l => {
      const st = stampsOf(l), mx = maxStamps(l), open = unlocked(l), isNext = nx && nx.id === l.id;
      const pips = Array.from({ length: mx }, (_, k) => `<span class="pip${k < st ? ' on' : ''}"></span>`).join('');
      const end = st === mx ? '<span class="stamp">Dominado</span>' : st ? '<span class="stamp">Cerrado</span>' : open ? '<span class="go">Empezar</span>' : ICON.lock;
      h += `<li class="line${isNext ? ' next' : ''}${open ? '' : ' locked'}"><button data-act="lesson" data-id="${l.id}"><span class="no">${String(l.i + 1).padStart(2, '0')}</span><span class="ti"><b>${esc(l.n)}</b><small>${l.num ? 'Cierre ' + l.num + ' · ' : ''}${esc(KIND[l.k])}${me && me.foco.includes(l.id) ? ' <span class="key">clave para ti</span>' : ''}</small></span><span class="end"><span class="pips" aria-label="${st} de ${mx} sellos">${pips}</span>${end}</span></button></li>`;
    });
    h += '</ol></section>';
  });
  return h + '<p class="muted small">Cada lección tiene sellos: aprendida, sin errores y usada en vivo en el Simulador. Lo aprendido vuelve en el Repaso del día justo antes de que se te olvide.</p></div>';
}

/* ───────── motor de sesiones (lecciones y rondas) ───────── */
let ses = null;
const mkMC = (m, t = 'mc') => { const o = shuffle(m[1].map((x, k) => ({ x, ok: k === m[2] }))); return { t, q: m[0], o, e: m[3] || '', pickd: -1 }; };
function mkBuild(l) {
  const f = l.fr.filter(x => x.split(' ').length <= 14 && x.split(' ').length >= 4); if (!f.length) return null;
  const words = pick(f).split(' ');
  return { t: 'build', l, words, order: shuffle(words.map((_, i) => i)), sel: [] };
}
function mkCual(l) {
  if (!NAMED.includes(l)) return null;
  const others = shuffle(NAMED.filter(x => x.id !== l.id)).slice(0, 2);
  const o = shuffle([{ x: l.n, ok: true }, ...others.map(x => ({ x: x.n, ok: false }))]);
  return { t: 'cual', q: '¿Qué cierre es este?', quote: l.fr[l.fr.length - 1], o, e: l.idea.split('. ')[0] + '.', pickd: -1 };
}
const mkResp = (l, r, hint) => ({ t: 'resp', l, r, hint });
function startLesson(id) {
  const l = LES[id];
  const ex = l.mc.map(m => mkMC(m));
  const b = mkBuild(l); if (b) ex.splice(1, 0, b);
  const c = mkCual(l); if (c) ex.splice(Math.min(3, ex.length), 0, c);
  l.resp.forEach(r => ex.push(mkResp(l, r, true)));
  ses = { kind: 'lesson', l, q: [{ t: 'learn', l }, ...ex], i: 0, st: 'ans', miss: 0, ok: 0, res: {} };
  drawSes();
}
function startRonda() {
  const open = LESSONS.filter(l => (S.done[l.id] || {}).a);
  const pool = (open.length >= 3 ? open : LESSONS).flatMap(l => l.resp.filter(r => r.cl).map(r => mkResp(l, r, false)));
  ses = { kind: 'ronda', q: shuffle(pool).slice(0, 5), i: 0, st: 'ans', miss: 0, ok: 0, res: {} };
  drawSes(); speakItem();
}
function exFor(l) {
  const opts = l.mc.map(m => () => mkMC(m));
  if (mkBuild(l)) opts.push(() => mkBuild(l));
  if (NAMED.includes(l)) opts.push(() => mkCual(l));
  l.resp.filter(r => r.cl).forEach(r => opts.push(() => mkResp(l, r, false)));
  const it = pick(opts)(); it.lid = l.id; return it;
}
function startRepaso() {
  const due = dueList().slice(0, 6);
  if (!due.length) return toast('No tienes repasos pendientes. Vas al día.');
  ses = { kind: 'repaso', q: due.map(exFor), i: 0, st: 'ans', miss: 0, ok: 0, res: {} };
  drawSes(); speakItem();
}
function startNivel() {
  const q = D.UNITS.map((u, ui) => { const l = pick(LESSONS.filter(x => x.u === ui)); const it = mkMC(pick(l.mc)); it.u = ui; return it; });
  ses = { kind: 'nivel', q, i: 0, st: 'ans', miss: 0, ok: 0, res: {}, units: {} };
  drawSes();
}
function speakItem() { const it = ses && ses.q[ses.i]; if (it && it.t === 'resp' && it.r.cl) say(it.r.cl); }
function learnHTML(l) {
  const tag = l.lista ? 'ul' : 'ol';
  return `<p class="label">${esc(l.src)} · ${l.num ? 'Cierre ' + l.num : esc(KIND[l.k])}</p><h1>${esc(l.n)}</h1><p class="lead">${esc(l.idea)}</p>
  ${l.cuando ? `<div class="field"><span class="label">Cuándo</span><p>${esc(l.cuando)}</p></div>` : ''}
  <div class="field"><span class="label">${l.lista ? 'En resumen' : 'Fórmula'}</span><${tag}>${l.f.map(x => `<li>${esc(x)}</li>`).join('')}</${tag}></div>
  <div class="field"><span class="label">Dilo así</span>${l.fr.map(x => `<blockquote class="say"><span>«${esc(x)}»</span>${sayBtn(x)}</blockquote>`).join('')}</div>
  <div class="warn field"><span class="label">Error común</span><p>${esc(l.err)}</p></div>
  ${l.nota ? `<p class="note">${esc(l.nota)}</p>` : ''}`;
}
function drawSes() {
  const it = ses.q[ses.i], fb = ses.st === 'fb'; let body = '', foot = '';
  const main = (label, dis) => `<button class="btn pen wide" data-act="sesMain"${dis ? ' disabled' : ''}>${label}</button>`;
  if (it.t === 'learn') { body = learnHTML(it.l); foot = main('Practicar'); }
  else if (it.t === 'mc' || it.t === 'cual') {
    body = `<p class="label">${ses.kind === 'nivel' ? 'Prueba de nivel · ' + (ses.i + 1) + ' de ' + ses.q.length : ses.kind === 'repaso' ? 'Repaso' : it.t === 'cual' ? 'Reconoce el cierre' : 'Elige la mejor respuesta'}</p><h2 class="q">${esc(it.q)}</h2>${it.quote ? `<blockquote class="say"><span>«${esc(it.quote)}»</span></blockquote>` : ''}
    <div class="opts">${it.o.map((o, k) => `<button class="opt${fb && o.ok ? ' right' : fb && k === it.pickd ? ' wrong' : ''}" data-act="opt" data-k="${k}" aria-pressed="${k === it.pickd}"${fb ? ' disabled' : ''}>${esc(o.x)}</button>`).join('')}</div>`;
    if (fb) body += `<div class="fb ${it.good ? 'ok' : 'bad'}"><p class="t">${it.good ? 'Correcto' : 'Todavía no'}</p><p>${esc(it.e)}</p></div>`;
    foot = main(fb ? 'Continuar' : 'Comprobar', !fb && it.pickd < 0);
  } else if (it.t === 'build') {
    body = `<p class="label">Arma la frase · ${esc(it.l.n)}</p><h2 class="q">Toca las palabras en orden</h2>
    <div class="sigline">${it.sel.map((w, k) => `<button class="word" data-act="unword" data-k="${k}"${fb ? ' disabled' : ''}>${esc(it.words[w])}</button>`).join('')}</div>
    <div class="bank">${it.order.map(w => `<button class="word" data-act="word" data-k="${w}"${it.sel.includes(w) || fb ? ' disabled' : ''}>${esc(it.words[w])}</button>`).join('')}</div>`;
    if (fb) body += `<div class="fb ${it.good ? 'ok' : 'bad'}"><p class="t">${it.good ? 'Así se dice' : 'El orden correcto'}</p><p>«${esc(it.words.join(' '))}» ${sayBtn(it.words.join(' '))}</p></div>`;
    foot = main(fb ? 'Continuar' : 'Comprobar', !fb && it.sel.length < it.words.length);
  } else {
    const r = it.r;
    body = `<p class="label">${it.hint ? 'Tu turno · ' + esc(it.l.n) : 'Responde la objeción'}</p>
    ${r.ctx ? `<p class="lead">${esc(r.ctx)}</p>` : ''}
    ${r.cl ? `<div class="bub c"><span class="who">Cliente</span>«${esc(r.cl)}» ${sayBtn(r.cl)}</div>` : ''}`;
    if (ses.st === 'ans' || ses.st === 'busy') {
      body += `<div class="field"><div class="composer"><textarea class="inp" id="ans" rows="3" placeholder="Escribe o di lo que le responderías"${ses.st === 'busy' ? ' disabled' : ''}>${esc(it.ans || '')}</textarea>${micBtn('ans')}</div><p class="partial" id="partial"></p>${noMic}</div>
      ${!it.hint ? `<details class="acc"><summary>Dame una pista</summary><div class="in"><p>Prueba con: <b>${esc(it.l.n)}</b>. ${esc(it.l.f[0])}</p></div></details>` : ''}`;
      foot = main(ses.st === 'busy' ? 'Calificando…' : 'Comprobar', ses.st === 'busy');
    } else {
      const g = it.g;
      body += `<div class="bub v"><span class="who">Tú</span>${esc(it.ans)}</div>`;
      if (g) body += `<div class="fb ${it.good ? 'ok' : 'bad'}"><p class="t">${it.good ? 'Bien respondido' : 'Se puede mejorar'}${g.nota ? ' · ' + esc(g.nota) + '/5' : ''}</p>${g.bien ? `<p>${esc(g.bien)}</p>` : ''}${g.mejora ? `<p>${esc(g.mejora)}</p>` : ''}${g.version ? `<p><span class="label">Tu respuesta, pulida</span><br>«${esc(g.version)}»</p>` : ''}</div>`;
      body += `<div class="sheet"><div class="field"><span class="label">Respuesta modelo · ${esc(it.l.n)}</span><p>«${esc(r.m)}» ${sayBtn(r.m)}</p></div><div class="field"><span class="label">Qué debe tener</span><p class="muted">${esc(r.c)}</p></div></div>`;
      if (ses.st === 'self') { body += '<p class="lead">Compara con el modelo. ¿Cómo te fue?</p>'; foot = `<div class="row"><button class="btn" data-act="self" data-v="0">Todavía no</button><button class="btn" data-act="self" data-v="1">Casi</button><button class="btn pen" data-act="self" data-v="2">La clavé</button></div>`; }
      else foot = main('Continuar');
    }
  }
  const p = $('#player'); p.hidden = false;
  p.innerHTML = `<div class="p-head gut"><button class="x" data-act="sesClose" aria-label="Salir">×</button><div class="bar" role="progressbar" aria-valuenow="${ses.i}" aria-valuemax="${ses.q.length}"><i style="width:${ses.i / ses.q.length * 100}%"></i></div></div>
  <div class="p-body gut"><div class="wrap">${body}</div></div><div class="p-foot gut"><div class="wrap">${foot}</div></div>`;
  $('.p-body', p).scrollTop = fb ? 1e6 : 0;
}
function settle(it, good) {
  it.good = good;
  if (it.lid) ses.res[it.lid] = ses.res[it.lid] !== false && good;
  if (it.u !== undefined && ses.units) ses.units[it.u] = good;
  if (good) ses.ok++; else { ses.miss++; if (!it.re && ses.kind !== 'nivel') ses.q.push(redo(it)); }
}
function redo(it) { const r = redo0(it); r.lid = it.lid; return r; }
function redo0(it) {
  if (it.t === 'resp') return { t: 'resp', l: it.l, r: it.r, hint: it.hint, re: true };
  if (it.t === 'build') return { t: 'build', l: it.l, words: it.words, order: shuffle(it.order), sel: [], re: true };
  return { t: it.t, q: it.q, quote: it.quote, o: shuffle(it.o), e: it.e, pickd: -1, re: true };
}
async function sesMain() {
  const it = ses.q[ses.i];
  if (it.t === 'learn' || ses.st === 'fb') return sesNext();
  if (ses.st !== 'ans') return;
  if (it.t === 'mc' || it.t === 'cual') { settle(it, it.o[it.pickd].ok); ses.st = 'fb'; return drawSes(); }
  if (it.t === 'build') { settle(it, it.sel.map(w => it.words[w]).join(' ') === it.words.join(' ')); ses.st = 'fb'; return drawSes(); }
  const txt = ($('#ans').value || '').trim();
  if (txt.length < 3) return toast('Escribe o di tu respuesta primero.');
  if (listening) micToggle();
  it.ans = txt; hush();
  if (!aiReady() && caps.ready) { ses.st = 'self'; return drawSes(); }
  ses.st = 'busy'; drawSes();
  const mine = ses;
  try {
    const g = await ask(`Eres entrenador de ventas (métodos de Brian Tracy y Alex Dey) y calificas una respuesta de práctica.
Técnica a practicar: ${it.l.n}. Fórmula: ${it.l.f.join(' ')}
${it.r.ctx ? 'Situación: ' + it.r.ctx + '\n' : ''}${it.r.cl ? 'El cliente dijo: «' + it.r.cl + '»\n' : ''}Criterio para aprobar: ${it.r.c}
Respuesta modelo (referencia, no hay que copiarla): «${it.r.m}»
Respuesta del alumno: «${txt}»
Devuelve SOLO un objeto JSON: {"ok": true o false, "nota": entero de 1 a 5, "bien": "qué hizo bien, 1 frase", "mejora": "qué cambiar, 1 frase", "version": "la respuesta del alumno mejorada, 1 o 2 frases"}
ok es true si cumple el criterio aunque use otras palabras u otro producto. Tutea al alumno. Español.`, { modelTier: 'quick', cache: false }, true);
    if (ses !== mine) return;
    it.g = { nota: Number(g.nota) || '', bien: g.bien || '', mejora: g.mejora || '', version: g.version || '' };
    settle(it, !!g.ok); ses.st = 'fb';
  } catch (e) {
    if (ses !== mine) return;
    if (e.code && !['no_ai', 'not_granted', 'sampling_disabled'].includes(e.code)) toast(errMsg(e.code));
    ses.st = 'self';
  }
  drawSes();
}
function sesNext() {
  hush(); ses.i++; ses.st = 'ans';
  if (ses.i >= ses.q.length || (ses.kind === 'nivel' && ses.miss >= 2)) return sesFinish();
  drawSes(); speakItem();
}
function sesFinish() {
  let xp, html; const p = $('#player');
  if (ses.kind === 'lesson') {
    const l = ses.l, d = S.done[l.id] || (S.done[l.id] = {}), first = !d.a;
    d.a = 1; if (ses.miss === 0) d.p = 1; srsSet(l.id, ses.miss === 0);
    xp = (first ? 15 : 5) + (ses.miss === 0 ? 5 : 0); addXP(xp); save();
    const nx = LESSONS[l.i + 1];
    html = `<span class="stamp big">${stampsOf(l) === maxStamps(l) ? 'Dominado' : 'Cerrado'}</span><h1>${esc(l.n)}</h1><p class="lead">+${xp} XP · ${stampsOf(l)} de ${maxStamps(l)} sellos</p>
    ${!d.p ? '<p class="muted">Repítela sin errores para ganar el segundo sello.</p>' : ''}
    ${LIVE(l) && !d.v ? '<p class="muted">El tercer sello se gana usándolo bien frente a un cliente en el Simulador.</p>' : ''}
    <div class="row" style="justify-content:center">${LIVE(l) && !d.v ? `<button class="btn" data-act="reto" data-id="${l.id}">Practicar en vivo</button>` : ''}${nx ? `<button class="btn pen" data-act="lesson" data-id="${nx.id}">Siguiente: ${esc(nx.n)}</button>` : ''}<button class="btn" data-act="sesClose">Volver a la ruta</button></div>`;
  } else if (ses.kind === 'repaso') {
    const ids = Object.keys(ses.res); ids.forEach(id => srsSet(id, ses.res[id]));
    const firm = ids.filter(id => ses.res[id]).length, left = dueList().length;
    xp = firm * 3 + 5; addXP(xp); save();
    html = `<span class="stamp big">Repaso</span><h1>${firm} de ${ids.length} firmes</h1><p class="lead">+${xp} XP</p><p class="muted">Lo que acertaste vuelve en unos días; lo que fallaste, mañana. Así se queda en la memoria.</p>
    <div class="row" style="justify-content:center">${left ? `<button class="btn pen" data-act="repaso">Repasar ${left} más</button>` : ''}<button class="btn${left ? '' : ' pen'}" data-act="sesClose">Volver a la ruta</button></div>`;
  } else if (ses.kind === 'nivel') {
    let pass = 0; while (ses.units[pass] === true) pass++;
    LESSONS.filter(l => l.u < pass).forEach(l => { const d = S.done[l.id] || (S.done[l.id] = {}); if (!d.a) { d.a = 1; S.srs[l.id] = { b: 1, due: dayKey(GAPS[1]) }; } });
    xp = ses.ok * 2 + 5; addXP(xp); save();
    const nx = nextLesson();
    html = `<span class="stamp big">Nivel</span><h1>${pass ? 'Empiezas en la unidad ' + (pass + 1) : 'Empiezas desde el principio'}</h1>
    <p class="lead">${pass ? 'Dominas lo básico de ' + pass + (pass === 1 ? ' unidad' : ' unidades') + '. Esas lecciones quedan desbloqueadas y entran a tu repaso.' : 'Mejor así: los fundamentos hacen la diferencia en el cierre.'}</p><p class="muted">+${xp} XP · ${ses.ok} de ${ses.i} correctas</p>
    <div class="row" style="justify-content:center">${nx ? `<button class="btn pen" data-act="lesson" data-id="${nx.id}">Empezar: ${esc(nx.n)}</button>` : ''}<button class="btn" data-act="sesClose">Ver la ruta</button></div>`;
  } else {
    xp = ses.ok * 3 + 2; addXP(xp); save();
    html = `<span class="stamp big">${ses.ok} de 5</span><h1>Ronda terminada</h1><p class="lead">+${xp} XP</p><div class="row" style="justify-content:center"><button class="btn pen" data-act="ronda">Otra ronda</button><button class="btn" data-act="sesClose">Salir</button></div>`;
  }
  ses.st = 'end';
  p.innerHTML = `<div class="p-head gut"><button class="x" data-act="sesClose" aria-label="Salir">×</button><div class="bar"><i style="width:100%"></i></div></div><div class="p-body gut"><div class="wrap done">${html}</div></div><div></div>`;
}
function sesClose() { hush(); if (listening) micToggle(); ses = null; const p = $('#player'); p.hidden = true; p.innerHTML = ''; render(); }

/* ───────── bienvenida: meta, tipo de vendedor y nivel ───────── */
let onb = null;
function startOnb() { onb = { step: 0, a: {} }; drawOnb(); }
function drawOnb() {
  const p = $('#player'); p.hidden = false; let body = '', foot = '';
  const ch = (act, v, t, on) => `<button class="opt" data-act="${act}" data-v="${v}" aria-pressed="${!!on}">${t}</button>`;
  if (onb.step === 0) {
    body = `<p class="label">Bienvenido al Dojo de Cierres</p><h1>Aprende a cerrar ventas con sesiones cortas, todos los días</h1>
    <ol class="method"><li><b>Aprende</b> una técnica en un minuto.</li><li><b>Practícala</b> con ejercicios cortos, escribiendo o hablando.</li><li><b>Úsala</b> frente a un cliente en el Simulador.</li><li><b>Repásala</b> justo cuando la ibas a olvidar.</li></ol>
    <div class="field"><label class="label" for="onbProd">¿Qué vendes o quieres vender?</label><input class="inp" id="onbProd" value="${esc(S.prod)}" placeholder="Ejemplo: seguros, autos, cursos, inmuebles" autocomplete="off"></div>
    <div class="field"><span class="label">Tu meta diaria</span><div class="opts">${[[10, 'Ligera · unos 5 minutos al día'], [30, 'Normal · unos 10 minutos al día'], [60, 'Intensa · unos 20 minutos al día']].map(([v, t]) => ch('onbGoal', v, t, S.goal === v)).join('')}</div></div>`;
    foot = '<button class="btn pen wide" data-act="onbNext">Siguiente</button>';
  } else if (onb.step === 1) {
    const t = onb.a.q1 && onb.a.q2 && meType(onb.a);
    body = `<p class="label">¿Qué tipo de vendedor eres?</p><h1>Tu tipo decide cómo vendes y también cómo pierdes</h1><p class="muted">Contesta como eres de verdad, no como te gustaría ser.</p>
    <div class="field"><span class="label">En una cita, tú…</span><div class="opts">${ch('onbQ', 'q1:r', 'Voy rápido y al grano', onb.a.q1 === 'r')}${ch('onbQ', 'q1:c', 'Voy con calma, sin prisa', onb.a.q1 === 'c')}</div></div>
    <div class="field"><span class="label">Lo que más disfrutas es…</span><div class="opts">${ch('onbQ', 'q2:g', 'La gente: platicar y conectar', onb.a.q2 === 'g')}${ch('onbQ', 'q2:a', 'El asunto: resultados y números', onb.a.q2 === 'a')}</div></div>
    ${t ? `<div class="sheet"><p class="label">Eres principalmente</p><h2>${esc(t.n)}</h2><p>${esc(t.vend)}</p><p class="small"><b>Tus lecciones clave:</b> ${t.foco.map(id => esc(LES[id].n)).join(', ')}.</p></div>` : ''}`;
    foot = `<button class="btn pen wide" data-act="onbNext"${t ? '' : ' disabled'}>Siguiente</button>`;
  } else {
    body = `<p class="label">Último paso</p><h1>¿Ya tienes experiencia vendiendo?</h1><p class="muted">Si ya vendes, una prueba corta te salta lo que ya dominas.</p>
    <div class="opts">${ch('onbFin', 'cero', 'Soy nuevo: empiezo desde la primera lección')}${ch('onbFin', 'nivel', 'Ya vendo: hago la prueba de nivel (10 preguntas)')}</div>`;
  }
  p.innerHTML = `<div class="p-head gut"><span class="label" style="white-space:nowrap">Paso ${onb.step + 1} de 3</span><div class="bar"><i style="width:${(onb.step + 1) / 3 * 100}%"></i></div></div><div class="p-body gut"><div class="wrap">${body}</div></div><div class="p-foot gut"><div class="wrap">${foot}</div></div>`;
  $('.p-body', p).scrollTop = onb.step === 1 && onb.a.q1 && onb.a.q2 ? 1e6 : 0;
}
const onbProd = () => { const i = $('#onbProd'); if (i) S.prod = i.value.trim(); };

/* ───────── vista: objeciones ───────── */
function vObj() {
  const n = LESSONS.reduce((k, l) => k + l.resp.filter(r => r.cl).length, 0);
  return `<div class="wrap"><section class="sheet"><div class="field"><p class="label">Ronda rápida</p><h1>El cliente dispara, tú respondes</h1>
  <p class="muted">Cinco objeciones al azar de las ${n} del curso. Escuchas al cliente, respondes con tu voz o por escrito y recibes la corrección con la respuesta modelo.</p></div>
  <button class="btn pen wide" data-act="ronda">Empezar ronda de 5</button>
  <p class="note if-ai-off">Sin la IA de Claude, tú mismo comparas tu respuesta con el modelo y te calificas.</p></section>
  <section class="field"><p class="label">Objeciones del curso</p>${LESSONS.filter(l => l.k === 'obj').map(l => `<details class="acc"><summary>${esc(l.n)}</summary><div class="in"><p>${esc(l.idea)}</p><ol>${l.f.map(x => `<li>${esc(x)}</li>`).join('')}</ol><p>«${esc(l.resp[0].m)}» ${sayBtn(l.resp[0].m)}</p></div></details>`).join('')}</section></div>`;
}

/* ───────── vista: simulador ───────── */
let sim = null;
const cfg = { tipo: 'sorpresa', dif: 'normal', etapa: 'cierre', foco: '', modo: '' };
const APP_URL = 'https://claude.ai/artifact/XZ3gxaQNyCu471ffoSP9MU';
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
const simModo = () => cfg.modo || (aiReady() ? 'ia' : 'local');

/* Cliente entrenado: reconoce técnicas en lo que dices o escribes, sin IA. */
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
  pedido: /(nombre completo|su direccion|a que direccion|llen(o|amos|emos) (la|el|su) (solicitud|pedido|formato)|su correo|su numero de)/,
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
const tagLesson = t => LESSONS.find(l => l.tag === t);
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
const fill = s => String(s).replace(/\{p\}/g, sim.prod);
function planBeats() {
  const n = { facil: 1, normal: 2, dificil: 3 }[cfg.dif] + (cfg.etapa === 'cita' ? 0 : 1);
  const all = Object.keys(R.beats).filter(k => !!R.beats[k].cita === (cfg.etapa === 'cita'));
  let plan = shuffle(all);
  const f = cfg.foco && LES[cfg.foco];
  if (f) {
    const fb = all.find(k => R.beats[k].lesson === f.id) || all.find(k => f.tag && R.beats[k].good.includes(f.tag));
    if (fb) plan = [fb, ...plan.filter(k => k !== fb)];
  }
  plan = plan.slice(0, Math.min(n, plan.length));
  if (cfg.etapa === 'cita' && plan.length < n) plan = plan.concat(shuffle(['confianza', 'viendo']).slice(0, n - plan.length));
  return plan;
}
function localStart() {
  const k = TK[sim.tipo];
  Object.assign(sim, { mode: 'local', plan: planBeats(), bi: 0, tries: 0, heat: 45, used: new Set(), log: [], phase: 'beat' });
  if (cfg.etapa === 'cita') { sim.phase = 'open'; return clientSay(R.open.cita[k]); }
  clientSay(fill(R.open.cierre[k]) + ' ' + R.beats[sim.plan[0]].c[k]);
}
function clientSay(line) {
  const m = /\[(VENTA|PERDIDA)\]/i.exec(line); if (m) sim.end = m[1].toLowerCase();
  const t = cleanLine(line);
  sim.msgs.push({ w: 'c', t }); drawMsgs(); drawHeat(); say(t, TIPO[sim.tipo].voz);
}
function localTurn(txt) {
  const k = TK[sim.tipo], tags = detect(txt), n = ' ' + norm(txt) + ' ', words = txt.split(/\s+/).length;
  const beatId = sim.plan[sim.bi], b = R.beats[beatId], out = [];
  const lastClient = sim.phase === 'beat' ? b.c[k] : ((sim.msgs.filter(m => m.w === 'c').pop() || {}).t || '');
  const bump = d => { sim.heat = Math.max(0, Math.min(100, sim.heat + d)); };
  if (k === 'c' && words > 45) { bump(-6); out.push(R.bad.largo.c); }
  const bad = Object.keys(BAD).find(x => BAD[x].test(n));
  if (bad) {
    sim.log.push({ beat: beatId, ok: false, bad, cl: lastClient, txt });
    if (bad === 'rinde') return clientSay(R.bad.rinde[k] + ' [PERDIDA]');
    bump(bad === 'presion' && (k === 'f' || k === 'm') ? -30 : -20);
    if (sim.heat <= 0) return clientSay(R.bad[bad][k] + ' ' + R.lose[k]);
    out.push(R.bad[bad][k]);
    if (sim.phase === 'beat') out.push(b.p[k]);
    return clientSay(out.join(' '));
  }
  const bonus = () => {
    if (k === 's' && ['insinua', 'envolvente', 'referencia'].some(x => tags.has(x))) return 6;
    if (k === 'c' && (words <= 30 || tags.has('demuestra'))) return 5;
    if (k === 'f' && ['datos', 'garantia', 'franklin'].some(x => tags.has(x))) return 6;
    if (k === 'm' && ['familia', 'empatia'].some(x => tags.has(x))) return 6;
    return 0;
  };
  const next = () => {
    sim.bi++; sim.tries = 0;
    if (sim.bi < sim.plan.length) out.push(R.beats[sim.plan[sim.bi]].c[k]);
    else { sim.phase = 'close'; out.push(cfg.etapa === 'cita' ? R.closeCita[k] : R.close[k]); }
  };
  if (sim.phase === 'open') { sim.phase = 'beat'; out.push(R.beats[sim.plan[0]].c[k]); return clientSay(out.join(' ')); }
  const closes = cfg.etapa === 'cita' ? ['doble'] : CLOSE_TAGS;
  const hasClose = closes.some(x => tags.has(x));
  if (sim.phase === 'beat') {
    const hit = b.good.filter(g => tags.has(g));
    if (hit.length) {
      bump(18 + bonus()); hit.forEach(h => sim.used.add(h)); if (tags.has('silencio')) sim.used.add('silencio');
      sim.log.push({ beat: beatId, ok: true, hit, cl: lastClient, txt });
      out.push(pick(R.ok[k])); next();
      if (sim.phase === 'close' && hasClose && sim.heat >= 60 && !hit.every(h => closes.includes(h))) { /* espera su cierre explícito */ }
      return clientSay(out.join(' '));
    }
    if (hasClose && sim.heat >= 75) { closes.filter(x => tags.has(x)).forEach(x => sim.used.add(x)); if (tags.has('silencio')) sim.used.add('silencio'); return clientSay((cfg.etapa === 'cita' ? R.winCita : R.win)[k]); }
    const partial = tags.has('empatia') || tags.has('amarre') || txt.includes('?');
    if (partial && tags.has('amarre')) sim.used.add('amarre');
    bump(partial ? 0 : -10); sim.tries++;
    if (sim.heat <= 0) return clientSay(R.lose[k]);
    if (sim.tries >= 2) { bump(-8); sim.log.push({ beat: beatId, ok: false, cl: lastClient, txt }); out.push(cfg.etapa === 'cita' ? '' : 'Bueno…'); next(); }
    else out.push(b.p[k]);
    return clientSay(out.filter(Boolean).join(' '));
  }
  // cierre
  if (hasClose) {
    closes.filter(x => tags.has(x)).forEach(x => sim.used.add(x)); if (tags.has('silencio')) sim.used.add('silencio');
    if (sim.heat >= 40) return clientSay((cfg.etapa === 'cita' ? R.winCita : R.win)[k]);
    if (cfg.etapa !== 'cita' && !sim.plan.includes('pensar')) { sim.plan.push('pensar'); sim.phase = 'beat'; sim.tries = 0; return clientSay('Mmm… todavía no estoy seguro. ' + R.beats.pensar.c[k]); }
    return clientSay(R.lose[k]);
  }
  sim.tries++;
  sim.log.push({ beat: 'cierre', ok: false, cl: lastClient, txt });
  if (sim.tries >= 2) return clientSay(R.lose[k]);
  return clientSay(R.closePush[k]);
}
function localHint() {
  const k = TK[sim.tipo];
  if (sim.phase === 'close') return cfg.etapa === 'cita'
    ? 'Pista: pide la cita con doble alternativa. «¿Le queda mejor el jueves o el viernes? ¿En la mañana o en la tarde?»'
    : 'Pista: el cliente ya está listo. Pide la venta con un cierre: doble alternativa («¿Lo dejamos a su nombre o al de la empresa?»), autorización o el siguiente paso. Termina en pregunta y calla.';
  const b = R.beats[sim.plan[sim.bi]], l = LES[b.lesson];
  if (sim.phase === 'open') return 'Pista: preséntate en una frase, di quién te recomendó si aplica y da una razón corta para la llamada.';
  return `Pista: ${l.n}. ${l.f[0]} ${l.f[1] || ''}\nEjemplo: «${l.resp[0].m}»`;
}
function localReport() {
  const t = TIPO[sim.tipo], log = sim.log, closed = sim.end === 'venta';
  const beatsOk = log.filter(x => x.ok).length, beatsAll = log.filter(x => x.beat !== 'cierre').length || 1;
  const score = Math.max(0, Math.min(100, Math.round(sim.heat * 0.45 + beatsOk / beatsAll * 25 + (closed ? 22 : 0) + Math.min(8, sim.used.size * 2))));
  const tecnicas = [...sim.used].map(x => tagLesson(x)).filter(Boolean).map(l => ({ id: l.id, bien: true }));
  const BADT = { discute: 'Discutiste con el cliente. Regla de Dey: nunca discutas ni contradigas sus emociones.', presion: 'Presionaste con urgencia. La presión enfría, sobre todo al flemático y al melancólico.', descuento: 'Ofreciste descuento de entrada. El cliente deja de creer en tu precio.', rinde: 'Te rendiste y lo dejaste ir a pensarlo. Dale todo dentro de la cita.' };
  const aciertos = log.filter(x => x.ok).slice(0, 3).map(x => `Ante «${x.cl.slice(0, 70)}» usaste ${x.hit.map(tagName).join(' y ')}.`);
  if (closed && sim.used.has('silencio')) aciertos.push('Cerraste con una pregunta y te callaste: teoría del silencio.');
  const mejoras = [];
  log.filter(x => !x.ok).forEach(x => {
    if (mejoras.length >= 3) return;
    if (x.bad) mejoras.push(BADT[x.bad]);
    else if (x.beat === 'cierre') mejoras.push('El cliente te dio la señal de compra y no pediste la venta. Usa doble alternativa, autorización o el siguiente paso.');
    else mejoras.push(`Ante «${x.cl.slice(0, 70)}» faltó la técnica: ${LES[R.beats[x.beat].lesson].n}.`);
  });
  if (!closed && !mejoras.length) mejoras.push('No llegaste a pedir la venta. Resuelve la objeción y cierra con una pregunta.');
  const miss = log.find(x => !x.ok && x.beat !== 'cierre' && !x.bad) || log.find(x => !x.ok && x.beat !== 'cierre');
  const ml = miss && LES[R.beats[miss.beat].lesson];
  const mejor = miss ? { cliente: miss.cl, dijiste: miss.txt, prueba: ml.resp[0].m } : (!closed ? { prueba: cfg.etapa === 'cita' ? '¿Le queda mejor el jueves en la mañana o el viernes en la tarde?' : '¿Lo dejamos a nombre suyo o de la empresa?' } : {});
  return {
    puntaje: score, tecnicas, aciertos, mejoras, mejor_frase: mejor,
    resumen: closed ? `Cerraste la venta con el cliente en ${sim.heat}/100 de interés.` : sim.end === 'perdida' ? 'El cliente se fue. Revisa en qué momento se enfrió.' : 'La cita quedó abierta: faltó llegar al cierre.',
    adaptacion: `Con un ${t.n.toLowerCase()}: ${t.presenta}`,
    siguiente: ml ? `Repasa la lección «${ml.n}» en la Ruta y vuelve a intentar este cliente.` : 'Sube la dificultad o prueba otro tipo de cliente.'
  };
}
function drawHeat() { const el = $('#heat'); if (el && sim && sim.mode === 'local') { el.style.width = sim.heat + '%'; el.parentElement.setAttribute('aria-valuenow', sim.heat); } }

function vSim() {
  if (sim && sim.ev) return evalHTML();
  if (sim && sim.on) return simChatHTML();
  const chip = (g, v, t, dis) => `<button class="chip" data-act="cfg" data-g="${g}" data-v="${v}" aria-pressed="${(g === 'modo' ? simModo() : cfg[g]) === v}"${dis ? ' disabled' : ''}>${t}</button>`;
  const noAI = caps.ready && !aiReady();
  return `<div class="wrap"><section class="sheet">
  <div class="field"><p class="label">Ficha de la cita</p><h1>Vende frente a un cliente</h1><p class="muted">Un cliente te pone objeciones como en una cita real. Tú respondes hablando o escribiendo. Al final ves tu puntaje, qué cierres usaste y la frase que cambiaría.</p></div>
  ${noAI ? `<div class="note"><b>Aquí no hay IA ni micrófono para la página</b> (pasa en la app de Claude del celular). Practica con el cliente entrenado y dicta con el micrófono de tu teclado. Para el cliente con IA y voz, abre la app en Chrome:<div class="row" style="margin-top:8px"><code class="small">${APP_URL}</code><button class="btn sm" data-act="copyLink">Copiar enlace</button></div></div>` : ''}
  <div class="field"><span class="label">Tipo de práctica</span><div class="chips">${chip('modo', 'local', 'Cliente entrenado')}${chip('modo', 'ia', 'Cliente con IA', noAI)}</div>
  <p class="small muted">${simModo() === 'ia' ? 'Claude improvisa al cliente y un entrenador evalúa la cita completa.' : 'Funciona en cualquier lugar, también en la app de Claude del celular: reconoce los cierres del curso en lo que dices y reacciona.'}</p></div>
  <div class="field"><label class="label" for="prod">¿Qué vendes?</label><input class="inp" id="prod" value="${esc(S.prod)}" placeholder="Ejemplo: seguros de vida para familias jóvenes" autocomplete="off"></div>
  <div class="field"><span class="label">Cliente</span><div class="chips">${chip('tipo', 'sorpresa', 'Sorpresa')}${D.TIPOS.map(t => chip('tipo', t.id, t.n)).join('')}</div></div>
  <div class="field"><span class="label">Situación</span><div class="chips">${Object.keys(ETAPA).filter(k => simModo() === 'ia' || k !== 'completa').map(k => chip('etapa', k, ETAPA[k][0])).join('')}</div></div>
  <div class="field"><span class="label">Dificultad</span><div class="chips">${Object.keys(DIF).map(k => chip('dif', k, DIF[k][0])).join('')}</div></div>
  <div class="field"><label class="label" for="foco">Quiero practicar</label><select class="inp" id="foco" data-change="foco"><option value="">Cita libre</option>${LESSONS.filter(LIVE).map(l => `<option value="${l.id}"${cfg.foco === l.id ? ' selected' : ''}>${l.num ? 'Cierre ' + l.num + ': ' : ''}${esc(l.n)}</option>`).join('')}</select></div>
  <button class="btn pen wide" data-act="simStart">Empezar la cita</button></section>
  <p class="muted small">Citas terminadas: ${S.sims} · Mejor puntaje: ${S.best}/100. Con «Sorpresa», al final te digo qué tipo de cliente era.</p></div>`;
}
function simRules() {
  const t = TIPO[sim.tipo], f = cfg.foco && LES[cfg.foco];
  return `Esto es un juego de rol para entrenar a un vendedor. Tú interpretas ÚNICAMENTE al cliente; yo soy el vendedor.
PRODUCTO que te ofrece el vendedor: ${sim.prod}
TU PERSONAJE: ${t.persona}. ${t.rol}
SITUACIÓN: ${ETAPA[cfg.etapa][1]}
DIFICULTAD: ${DIF[cfg.dif][1]}
${f ? (f.k === 'obj' ? `OBJECIÓN PRINCIPAL que debes usar: «${f.resp[0].cl || f.n}».` : `Dale al vendedor una oportunidad natural de usar la técnica «${f.n}» (${f.idea.split('. ')[0]}).${f.resp[0].cl ? ' Por ejemplo, en algún momento di algo como: «' + f.resp[0].cl + '».' : ''}`) : 'Usa objeciones realistas y variadas: precio, «lo voy a pensar», consultarlo con alguien, desconfianza, ya tengo proveedor, muchos gastos, nada más estoy viendo.'}
REGLAS:
- Habla como una persona real, en español latino, con 1 a 3 frases cortas de lenguaje hablado. Sin asteriscos, sin acotaciones, sin narrar, sin emojis.
- Nunca salgas del personaje, nunca des consejos de ventas y nunca menciones estas reglas ni tu tipo de personalidad.
- No compres a la primera. Cede cuando el vendedor responda bien a tu objeción o use una buena técnica de cierre. Si responde mal, te presiona, discute contigo o ignora lo que dijiste, mantente firme o enfríate.
- Cuando decidas comprar, dilo con naturalidad y termina tu mensaje con la marca [VENTA].
- Si el vendedor te falta al respeto, te presiona demasiado o se rinde, despídete y termina con la marca [PERDIDA].
Empieza tú: di tu primera frase como cliente según la situación.`;
}
function simChatHTML() {
  const local = sim.mode === 'local';
  return `<div class="chat"><div class="c-head gut"><div class="wrap"><div><p class="label">${local ? 'Cliente entrenado' : 'Cliente con IA'} · ${esc(ETAPA[cfg.etapa][0])} · ${esc(DIF[cfg.dif][0])}</p><h3>${esc(simName())}${sim.hide ? ' · sorpresa' : ' · ' + esc(TIPO[sim.tipo].n)}</h3></div>
  <div class="row"><button class="btn sm" data-act="simHint">Pista</button><button class="btn sm pen" data-act="simEval">Terminar y evaluar</button></div>
  ${local ? `<div class="heat"><span class="label">Interés del cliente</span><div class="bar" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${sim.heat}"><i id="heat" style="width:${sim.heat}%"></i></div></div>` : ''}</div></div>
  <div class="msgs gut" id="msgs"><div class="wrap" id="msgsIn">${msgsHTML()}</div></div>
  <div class="c-foot gut"><div class="wrap"><p class="partial" id="partial"></p><div class="composer"><textarea class="inp" id="simIn" rows="2" data-send="simSend" placeholder="Háblale a tu cliente"></textarea>${micBtn('simIn')}<button class="send" data-act="simSend" aria-label="Enviar">${ICON.send}</button></div>${noMic}</div></div></div>`;
}
function msgsHTML() {
  let h = sim.msgs.map(m => m.w === 's' ? `<div class="bub sys">${esc(m.t)}</div>` : `<div class="bub ${m.w}"><span class="who">${m.w === 'c' ? esc(simName()) : 'Tú'}</span>${esc(m.t)}${m.w === 'c' ? ' ' + sayBtn(m.t, TIPO[sim.tipo].voz) : ''}</div>`).join('');
  if (sim.busy) h += `<div class="bub c"><span class="who">${esc(simName())}</span>${sim.live ? esc(sim.live) : '…'}</div>`;
  if (sim.err) h += `<div class="bub sys">${esc(sim.err)} <button class="say-btn" data-act="simRetry">Reintentar</button></div>`;
  if (sim.end) h += `<div class="bub sys">${sim.end === 'venta' ? (cfg.etapa === 'cita' ? 'Conseguiste la cita.' : 'Cerraste la venta.') : 'El cliente se fue.'} Toca «Terminar y evaluar» para ver tu revisión.</div>`;
  return h;
}
function scrollMsgs() { const m = $('#msgs'); if (m) m.scrollTop = m.scrollHeight; }
function drawMsgs() { const el = $('#msgsIn'); if (!el || view !== 'simulador') return; el.innerHTML = msgsHTML(); scrollMsgs(); }
const simName = () => sim.hide ? 'Tu cliente' : TIPO[sim.tipo].persona;
const cleanLine = t => String(t).replace(/\[(VENTA|PERDIDA)\]?/gi, '').replace(/\[[A-Z]*$/, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
async function clientTurn() {
  const mine = sim; sim.busy = true; sim.err = ''; sim.live = ''; drawMsgs();
  sim.ctl = new AbortController();
  try {
    const { text } = await ask(sim.turns, { cache: false, modelTier: 'quick', signal: sim.ctl.signal, onText: ({ text }) => { if (sim === mine) { sim.live = cleanLine(text); drawMsgs(); } } });
    if (sim !== mine) return;
    const m = /\[(VENTA|PERDIDA)\]/i.exec(text); if (m) sim.end = m[1].toLowerCase();
    const line = cleanLine(text) || '…';
    sim.turns.push({ role: 'assistant', content: text }); sim.msgs.push({ w: 'c', t: line });
    sim.busy = false; sim.live = ''; drawMsgs(); say(line, TIPO[sim.tipo].voz);
  } catch (e) {
    if (sim !== mine) return;
    sim.busy = false; sim.live = '';
    if (e.code !== 'cancelled') sim.err = errMsg(e.code);
    drawMsgs();
  }
}
function newSim(prod, tipo, hide) {
  sim = { on: true, mode: simModo(), prod, hide, tipo, turns: [], msgs: [], busy: false, end: '', err: '', live: '', ev: null };
  if (sim.mode === 'local' && cfg.etapa === 'completa') cfg.etapa = 'cierre';
  render();
  if (sim.mode === 'local') localStart();
  else { sim.turns.push({ role: 'user', content: simRules() }); clientTurn(); }
}
function simStart() {
  const prod = ($('#prod').value || '').trim();
  if (prod.length < 3) { $('#prod').focus(); return toast('Escribe primero qué vendes.'); }
  if (prod !== S.prod) { S.prod = prod; save(); }
  newSim(prod, cfg.tipo === 'sorpresa' ? pick(D.TIPOS).id : cfg.tipo, cfg.tipo === 'sorpresa');
}
function simSend() {
  const el = $('#simIn'); if (!el || !sim || sim.busy) return;
  const txt = el.value.trim(); if (!txt) return;
  if (sim.end) { el.value = ''; return toast('La cita ya terminó. Toca «Terminar y evaluar».'); }
  if (sim.err) { sim.err = ''; }
  hush(); el.value = '';
  sim.msgs.push({ w: 'v', t: txt });
  if (sim.mode === 'local') { drawMsgs(); return localTurn(txt); }
  const last = sim.turns[sim.turns.length - 1];
  if (last.role === 'user' && sim.turns.length > 1) last.content += '\n' + txt; else sim.turns.push({ role: 'user', content: 'VENDEDOR: ' + txt });
  clientTurn();
}
const transcript = () => sim.msgs.filter(m => m.w !== 's').map(m => (m.w === 'c' ? 'CLIENTE: ' : 'VENDEDOR: ') + m.t).join('\n');
const techList = () => LESSONS.filter(LIVE).map(l => `${l.id}: ${l.n} (${l.src}) — ${l.f.join(' ')}`).join('\n');
async function simHint() {
  if (!sim || sim.busy || sim.hinting) return;
  if (sim.mode === 'local') { if (sim.end) return; sim.msgs.push({ w: 's', t: localHint() }); return drawMsgs(); }
  sim.hinting = true; sim.msgs.push({ w: 's', t: 'Pensando una pista…' }); drawMsgs();
  const slot = sim.msgs[sim.msgs.length - 1], mine = sim;
  try {
    const { text } = await ask(`Eres entrenador de ventas (Brian Tracy y Alex Dey). Tu alumno está a media práctica vendiendo: ${sim.prod}.
Técnicas disponibles:\n${techList()}\n\nConversación hasta ahora:\n${transcript()}\n
Dale UNA pista para su siguiente frase: el nombre de la técnica y una frase modelo de máximo 25 palabras adaptada a su producto. Texto plano, dos líneas, sin markdown.`, { modelTier: 'quick', cache: false });
    slot.t = 'Pista: ' + text.replace(/\*/g, '').trim();
  } catch (e) { slot.t = errMsg(e.code); }
  mine.hinting = false; if (sim === mine) drawMsgs();
}
function finishEval(r) {
  const score = Math.max(0, Math.min(100, Math.round(Number(r.puntaje) || 0)));
  const tec = (Array.isArray(r.tecnicas) ? r.tecnicas : []).filter(x => x && LES[x.id]);
  const xp = Math.round(score / 5) + (sim.end === 'venta' ? 10 : 0); const won = [];
  if (score >= 70) tec.forEach(x => { const d = S.done[x.id]; if (x.bien && d && d.a && !d.v) { d.v = 1; won.push(LES[x.id].n); } });
  S.sims++; S.best = Math.max(S.best, score); addXP(xp); save();
  sim.ev = { score, r, tec, xp, won };
}
async function simEval() {
  if (!sim) return;
  if (!sim.msgs.some(m => m.w === 'v')) return toast('Dile algo a tu cliente antes de evaluar.');
  if (sim.ctl) sim.ctl.abort(); hush(); if (listening) micToggle();
  if (sim.mode === 'local') { finishEval(localReport()); return render(); }
  sim.ev = { wait: true }; render();
  const mine = sim, t = TIPO[sim.tipo], f = cfg.foco && LES[cfg.foco];
  try {
    const r = await ask(`Eres un entrenador de ventas experto en los métodos de Brian Tracy y Alex Dey. Evalúa al VENDEDOR en esta práctica de juego de rol. Sé exigente y concreto; tutéalo.
Producto: ${sim.prod}. Situación: ${ETAPA[cfg.etapa][0]}. El cliente era de tipo ${t.n} (${t.eje}).${f ? ' El alumno quería practicar: ' + f.n + '.' : ''}
Resultado marcado por el cliente: ${sim.end || 'la cita quedó abierta'}.
TÉCNICAS DE REFERENCIA (id: nombre — fórmula):
${techList()}
TRANSCRIPCIÓN:
${transcript()}
Devuelve SOLO un objeto JSON con esta forma:
{"puntaje": entero 0-100, "resumen": "2 frases", "tecnicas": [{"id": "id de la lista", "bien": true o false, "cita": "frase del vendedor"}], "aciertos": ["..."], "mejoras": ["..."], "mejor_frase": {"cliente": "lo que dijo el cliente", "dijiste": "lo que respondió el vendedor", "prueba": "frase modelo mejor, adaptada al producto"}, "adaptacion": "cómo se adaptó al tipo de cliente, 1 frase", "siguiente": "qué practicar ahora, 1 frase"}
Reglas: en "tecnicas" incluye sólo técnicas de la lista que el vendedor realmente intentó, con su id exacto. Máximo 3 aciertos y 3 mejoras. Considera la regla de Alex Dey de dos no y un sí (no discutir, no contradecir emociones, llevar al cliente a contestar su propia objeción), si pidió la venta, el silencio después de cerrar, la adaptación al tipo de cliente y la honestidad (penaliza mentiras o urgencias falsas).`, { cache: false }, true);
    if (sim !== mine) return;
    finishEval(r);
  } catch (e) { if (sim !== mine) return; sim.ev = { fail: errMsg(e.code) }; }
  if (view === 'simulador') render();
}
function evalHTML() {
  const e = sim.ev, t = TIPO[sim.tipo];
  if (e.wait) return `<div class="wrap"><section class="sheet"><p class="label">Revisión</p><h1>Tu entrenador está revisando la cita…</h1><p class="muted">Puede tardar hasta un minuto.</p></section></div>`;
  if (e.fail) return `<div class="wrap"><section class="sheet"><h1>No se pudo evaluar</h1><p>${esc(e.fail)}</p><div class="row"><button class="btn pen" data-act="simEval">Reintentar</button><button class="btn" data-act="simBack">Volver a la cita</button><button class="btn" data-act="simNew">Salir</button></div></section></div>`;
  const r = e.r, li = a => (Array.isArray(a) ? a : []).slice(0, 3).map(x => `<li>${esc(x)}</li>`).join(''), mf = r.mejor_frase || {};
  const stamp = sim.end === 'venta' ? (cfg.etapa === 'cita' ? 'Cita lograda' : 'Venta cerrada') : sim.end === 'perdida' ? 'Venta perdida' : 'Sin cierre';
  return `<div class="wrap"><section class="sheet">
  <div class="row" style="justify-content:space-between"><div><p class="label">Puntaje de la cita</p><p class="score">${e.score}<small>/100</small></p></div><span class="stamp big">${stamp}</span></div>
  <p class="lead">${esc(r.resumen || '')}</p><p class="muted">+${e.xp} XP · Tu cliente era <b>${esc(t.n)}</b> (${esc(t.eje.toLowerCase())}). ${esc(r.adaptacion || '')}</p>
  ${e.won.length ? `<p class="fb ok"><span class="t">Sello «en vivo» ganado</span>${esc(e.won.join(', '))}</p>` : ''}
  ${e.tec.length ? `<div class="field"><span class="label">Técnicas que usaste</span><div class="tech">${e.tec.map(x => `<span class="tag ${x.bien ? 'ok' : 'bad'}">${esc(LES[x.id].n)} · ${x.bien ? 'bien' : 'a pulir'}</span>`).join('')}</div></div>` : '<p class="note">No detecté ninguna técnica de cierre del curso. En la próxima cita, elige una y úsala a propósito.</p>'}
  ${(r.aciertos || []).length ? `<div class="field"><span class="label">Lo que hiciste bien</span><ul>${li(r.aciertos)}</ul></div>` : ''}
  ${(r.mejoras || []).length ? `<div class="field"><span class="label">Lo que te costó la venta</span><ul>${li(r.mejoras)}</ul></div>` : ''}
  ${mf.prueba ? `<div class="field"><span class="label">La frase que cambiaría</span>${mf.cliente ? `<p class="muted">Cliente: «${esc(mf.cliente)}»</p>` : ''}${mf.dijiste ? `<p class="muted">Dijiste: «${esc(mf.dijiste)}»</p>` : ''}<blockquote class="say"><span>«${esc(mf.prueba)}»</span>${sayBtn(mf.prueba)}</blockquote></div>` : ''}
  ${r.siguiente ? `<p class="note"><b>Siguiente paso:</b> ${esc(r.siguiente)}</p>` : ''}
  ${sim.mode === 'local' && e.score < 70 ? '<p class="small muted">El sello «en vivo» se gana con 70 puntos o más.</p>' : ''}
  <div class="row"><button class="btn pen" data-act="simAgain">Repetir este cliente</button><button class="btn" data-act="simNew">Otra cita</button></div></section></div>`;
}

/* ───────── vista: coach ───────── */
const coach = { turns: [], msgs: [], busy: false, live: '', ctl: null };
const SUG = ['El cliente dice «está muy caro». ¿Qué respondo?', '«Lo tengo que consultar con mi esposa»', '¿Qué cierre uso con un cliente que va con prisa?', '¿Cómo pido referidos sin pena?'];
function coachRules() {
  const kb = LESSONS.map(l => `• ${l.n} [${l.src}; ${KIND[l.k]}]: ${l.idea} Pasos: ${l.f.join(' ')} Ejemplo: «${l.resp[0].m}» Error: ${l.err}`).join('\n');
  const tipos = D.TIPOS.map(t => `• ${t.n} (${t.eje}): ${t.senal} Quiere: ${t.quiere} Cierres: ${t.cierres.map(c => LES[c].n).join(', ')}. Lo espanta: ${t.espanta}`).join('\n');
  return `Eres «Coach», el entrenador de ventas dentro de una app de práctica de cierres. Enseñas con dos métodos: la psicología de ventas de Brian Tracy y los cierres de Alex Dey. Respondes en español latino, de tú, directo y práctico.
El alumno vende: ${S.prod || 'todavía no lo dice; si hace falta para el ejemplo, pregúntaselo'}.
CÓMO RESPONDER:
- Si pregunta qué responder cuando el cliente dice algo: 1) nombra la técnica y de quién es, 2) da el guion palabra por palabra adaptado a su producto, 3) di qué hacer si el cliente insiste. Máximo 150 palabras.
- Texto plano con saltos de línea. Sin markdown, sin asteriscos, sin encabezados.
- Apóyate primero en la GUÍA. Si agregas algo que no está en la guía, preséntalo como sugerencia tuya. No inventes citas textuales ni estadísticas de los autores.
- Vende con ética: nada de mentiras, casos inventados ni urgencias falsas.
GUÍA DE TÉCNICAS:
${kb}
TIPOS DE CLIENTE:
${tipos}
A continuación viene la conversación con el alumno.`;
}
function vCoach() {
  return `<div class="chat"><div class="c-head gut"><div class="wrap"><div><p class="label">Tracy + Dey</p><h3>Pregúntale al coach</h3></div>${coach.msgs.length ? '<button class="btn sm" data-act="coachClear">Nueva conversación</button>' : ''}</div></div>
  <div class="msgs gut" id="msgs"><div class="wrap" id="coachIn">${coachMsgs()}</div></div>
  <div class="c-foot gut"><div class="wrap"><p class="partial" id="partial"></p><div class="composer"><textarea class="inp" id="coachQ" rows="2" data-send="coachSend" placeholder="Si el cliente me dice…, ¿qué respondo?"></textarea>${micBtn('coachQ')}<button class="send" data-act="coachSend" aria-label="Preguntar">${ICON.send}</button></div>${noMic}</div></div></div>`;
}
function coachMsgs() {
  if (!coach.msgs.length) return `<div class="bub c"><span class="who">Coach</span>Dime qué te dijo el cliente o en qué parte de la venta te atoras, y te doy la técnica y las palabras exactas.<span class="if-ai-off"> Sin la IA de Claude te respondo con lo que hay en la guía del curso.</span></div><div class="chips">${SUG.map(s => `<button class="chip" data-act="coachSug" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
  let h = coach.msgs.map(m => `<div class="bub ${m.w}"><span class="who">${m.w === 'c' ? 'Coach' : 'Tú'}</span>${esc(m.t)}${m.w === 'c' ? ' ' + sayBtn(m.t) : ''}</div>`).join('');
  if (coach.busy) h += `<div class="bub c"><span class="who">Coach</span>${coach.live ? esc(coach.live) : 'Pensando…'}</div>`;
  return h;
}
function drawCoach() { const el = $('#coachIn'); if (!el || view !== 'coach') return; el.innerHTML = coachMsgs(); scrollMsgs(); }
function localCoach(q) {
  const ws = norm(q).split(/[^a-zñ]+/).filter(w => w.length > 3);
  const scored = LESSONS.map(l => { const hay = norm(l.n + ' ' + (l.tags || '') + ' ' + l.resp.map(r => r.cl || '').join(' ') + ' ' + l.idea); return [ws.reduce((n, w) => n + (hay.includes(w) ? (norm(l.n + ' ' + (l.tags || '')).includes(w) ? 3 : 1) : 0), 0), l]; }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 2);
  if (!scored.length) return 'No encontré eso en la guía. Prueba con palabras como «caro», «pensar», «consultar», «referidos» o el nombre de un cierre.';
  return scored.map(([, l]) => `${l.n} (${l.src})\n${l.f.map((x, i) => (i + 1) + '. ' + x).join('\n')}\nDilo así: «${l.resp[0].m}»`).join('\n\n');
}
async function coachSend(pre) {
  const el = $('#coachQ'); const q = (typeof pre === 'string' ? pre : el ? el.value : '').trim();
  if (!q || coach.busy) return;
  if (el) el.value = ''; hush();
  coach.msgs.push({ w: 'v', t: q });
  if (caps.ready && !aiReady()) { coach.msgs.push({ w: 'c', t: localCoach(q) }); return render(); }
  coach.turns.push({ role: 'user', content: q }); coach.busy = true; coach.live = '';
  if (coach.msgs.length === 1) render(); else drawCoach();
  coach.ctl = new AbortController();
  try {
    const { text } = await ask([{ role: 'user', content: coachRules() }, ...coach.turns.slice(-11)], { cache: false, signal: coach.ctl.signal, onText: ({ text }) => { coach.live = text.replace(/\*/g, ''); drawCoach(); } });
    const t = text.replace(/\*/g, '').trim();
    coach.turns.push({ role: 'assistant', content: t }); coach.msgs.push({ w: 'c', t });
  } catch (e) {
    coach.turns.pop();
    if (e.code !== 'cancelled') coach.msgs.push({ w: 'c', t: ['no_ai', 'not_granted', 'sampling_disabled'].includes(e.code) ? localCoach(q) : errMsg(e.code) });
  }
  coach.busy = false; coach.live = ''; drawCoach();
}

/* ───────── vista: guía ───────── */
function vGuia() {
  const tk = dayKey(), n = S.nums[tk] || { p: 0, r: 0, c: 0 };
  const days = Array.from({ length: 7 }, (_, i) => dayKey(-i)); const W = { p: 0, r: 0, c: 0 };
  days.forEach(d => { const x = S.nums[d]; if (x) { W.p += x.p; W.r += x.r; W.c += x.c; } });
  const dx = !W.p ? 'Anota tus números de hoy y en una semana vas a ver dónde se rompe tu cadena.'
    : W.p < 10 ? 'Prospectos bajos: te falta volumen. Ningún cierre compensa ver poca gente.'
    : W.r / W.p < 0.3 ? 'Ves gente y presentas poco. Revisa cómo abres y a quién estás prospectando.'
    : W.c / Math.max(1, W.r) < 0.2 ? 'Presentas bien y cierras poco. Pule tus cierres de prueba y pide la venta. ¿Llevas cinco síes antes del cierre maestro?'
    : 'Las tres líneas van juntas. Sube el volumen sin tocar nada más.';
  const NL = { p: 'Prospectos', r: 'Presentaciones', c: 'Cierres' };
  const acc = (t, inner, open) => `<details class="acc"${open ? ' open' : ''}><summary><span>${t}</span></summary><div class="in">${inner}</div></details>`;
  const lessonCard = l => acc(`${l.num ? l.num + '. ' : ''}${esc(l.n)} <span class="label">${esc(l.src)}</span>`, `<p>${esc(l.idea)}</p><${l.lista ? 'ul' : 'ol'}>${l.f.map(x => `<li>${esc(x)}</li>`).join('')}</${l.lista ? 'ul' : 'ol'}>${l.fr.map(x => `<p>«${esc(x)}» ${sayBtn(x)}</p>`).join('')}<p class="muted"><b>Error común:</b> ${esc(l.err)}</p>${l.nota ? `<p class="note">${esc(l.nota)}</p>` : ''}`);
  const st = (ok, y, nn) => `<li>${ok ? y : nn}</li>`;
  return `<div class="wrap">
  <section class="sheet"><div class="field"><p class="label">Mis números de hoy</p><h2>Prospectos, presentaciones y cierres</h2></div>
    <div class="nums">${['p', 'r', 'c'].map(k => `<div class="num"><span class="label">${NL[k]}</span><b>${n[k]}</b><div class="row"><button class="pm" data-act="num" data-k="${k}" data-d="-1" aria-label="Restar">−</button><button class="pm" data-act="num" data-k="${k}" data-d="1" aria-label="Sumar">+</button></div></div>`).join('')}</div>
    <p class="note"><b>Últimos 7 días: ${W.p} · ${W.r} · ${W.c}.</b> ${dx} <span class="muted">Lectura orientativa de la app.</span></p>
    ${acc('Ver la semana', `<div class="tblwrap"><table><thead><tr><th>Día</th><th>Prosp.</th><th>Present.</th><th>Cierres</th></tr></thead><tbody>${days.map(d => { const x = S.nums[d] || { p: 0, r: 0, c: 0 }; return `<tr><td>${d.slice(8)}/${d.slice(5, 7)}</td><td>${x.p}</td><td>${x.r}</td><td>${x.c}</td></tr>`; }).join('')}</tbody></table></div>`)}
  </section>
  <section class="field"><p class="label">Los 12 cierres de Alex Dey</p>${LESSONS.filter(l => l.num).map(lessonCard).join('')}</section>
  <section class="field"><p class="label">Más cierres de Alex Dey</p>${LESSONS.filter(l => l.k === 'deyx').map(lessonCard).join('')}</section>
  <section class="field"><p class="label">Cierres de Brian Tracy</p>${LESSONS.filter(l => l.k === 'tracy').map(lessonCard).join('')}</section>
  <section class="field"><p class="label">Los 4 tipos de cliente</p>${D.TIPOS.map(t => acc(`${esc(t.n)} <span class="label">${esc(t.eje)}</span>`, `<div class="kv"><p><b>Cómo lo reconoces.</b> ${esc(t.senal)}</p><p><b>Qué necesita escuchar.</b> ${esc(t.quiere)}</p><p><b>Cómo le presentas.</b> ${esc(t.presenta)}</p><p><b>Cierres que le funcionan.</b> ${t.cierres.map(c => esc(LES[c].n)).join(', ')}.</p><p><b>Lo que lo espanta.</b> ${esc(t.espanta)}</p><p><b>El riesgo.</b> ${esc(t.riesgo)}</p></div>`)).join('')}</section>
  <section class="field"><p class="label">Fundamentos, objeciones y referidos</p>${LESSONS.filter(l => !l.num && !['tracy', 'deyx'].includes(l.k)).map(lessonCard).join('')}</section>
  <section class="sheet"><div class="field"><p class="label">Ajustes</p></div>
    <div class="field"><span class="label">Tu perfil</span><p>${S.me ? 'Vendedor ' + esc(TIPO[S.me].n.toLowerCase()) + '. ' + esc(TIPO[S.me].vend) : 'Todavía no defines tu tipo de vendedor.'}</p><p class="small muted">Meta diaria: ${S.goal || 30} XP${S.prod ? ' · Vendes: ' + esc(S.prod) : ''}</p><div class="row"><button class="btn sm" data-act="onbAgain">Cambiar mi perfil</button><button class="btn sm" data-act="nivel">Hacer la prueba de nivel</button></div></div>
    <div class="chips"><button class="chip" data-act="tog" data-k="voz" aria-pressed="${S.voz}">Voz del cliente</button><button class="chip" data-act="tog" data-k="auto" aria-pressed="${S.auto}">Enviar al terminar de hablar</button></div>
    <div class="field"><span class="label">Qué funciona en este dispositivo</span><ul class="small">
      ${st(aiReady(), 'IA de Claude: disponible para el Simulador, el Coach y las correcciones.', 'IA de Claude: no disponible aquí. Las lecciones, las rondas y el cliente entrenado funcionan igual; el cliente con IA se usa abriendo la app en Chrome.')}
      ${st(document.body.hasAttribute('data-mic'), 'Micrófono: disponible. Toca el micrófono para hablar.', 'Micrófono: no disponible aquí. Usa el dictado del teclado de tu celular.')}
      ${st(!!caps.tts && !ttsOff, 'Voz: el cliente te habla con voz de Claude.', 'Voz: se usa la voz del navegador cuando existe.')}
      ${st(!!cloudDoc, 'Progreso: se guarda en tu cuenta y se sincroniza entre celular y computador.', 'Progreso: se guarda sólo en este navegador.')}</ul></div>
    <div class="field"><span class="label">Fuentes</span><p class="small muted">Alex Dey: Los doce cierres de venta, La Biblia del Vendedor, Cómo identificar la personalidad del prospecto, El poder de la palabra hablada y los cuadernos del intensivo Cierra Más (Los 4 tipos de cliente, El guion de referidos, La agenda del vendedor millonario). Brian Tracy: Psicología de ventas. Los textos y guiones de práctica están redactados para esta app a partir de ese material; las frases cortas entre comillas siguen los ejemplos de los autores. La app no está afiliada a ninguno de los dos.</p></div>
    <div class="row">${resetAsk ? '<span>¿Borrar todo tu progreso?</span><button class="btn sm" data-act="resetYes">Sí, borrar</button><button class="btn sm" data-act="resetNo">Cancelar</button>' : '<button class="btn sm" data-act="resetAsk">Borrar mi progreso</button>'}</div>
  </section></div>`;
}
let resetAsk = false;

/* ───────── acciones ───────── */
const ACT = {
  go: b => go(b.dataset.v),
  say: b => say(b.dataset.text, b.dataset.voice, true),
  mic: b => micToggle(b.dataset.for),
  lesson: b => { const l = LES[b.dataset.id]; if (!l) return; if (!unlocked(l)) return toast('Primero termina: ' + LESSONS[l.i - 1].n); hush(); startLesson(l.id); },
  opt: b => { const it = ses.q[ses.i]; if (ses.st !== 'ans') return; it.pickd = Number(b.dataset.k); drawSes(); },
  word: b => { const it = ses.q[ses.i]; if (ses.st !== 'ans') return; it.sel.push(Number(b.dataset.k)); drawSes(); },
  unword: b => { const it = ses.q[ses.i]; if (ses.st !== 'ans') return; it.sel.splice(Number(b.dataset.k), 1); drawSes(); },
  sesMain, sesClose,
  self: b => { const it = ses.q[ses.i]; settle(it, Number(b.dataset.v) > 0); sesNext(); },
  ronda: () => startRonda(),
  repaso: () => { hush(); startRepaso(); },
  onbGoal: b => { onbProd(); S.goal = Number(b.dataset.v); drawOnb(); },
  onbQ: b => { const [k, v] = b.dataset.v.split(':'); onb.a[k] = v; drawOnb(); },
  onbNext: () => { if (onb.step === 0) onbProd(); if (onb.step === 1) S.me = meType(onb.a).id; onb.step++; save(); drawOnb(); },
  onbFin: b => { S.onb = 1; save(); onb = null; if (b.dataset.v === 'nivel') return startNivel(); const nx = nextLesson(); if (nx) startLesson(nx.id); else sesClose(); },
  onbAgain: () => startOnb(),
  nivel: () => startNivel(),
  reto: b => { cfg.foco = b.dataset.id; cfg.etapa = 'cierre'; ses = null; const p = $('#player'); p.hidden = true; p.innerHTML = ''; sim = null; go('simulador'); },
  cfg: b => { const p = $('#prod'); if (p) S.prod = p.value.trim(); cfg[b.dataset.g] = b.dataset.v; render(); },
  simStart, simSend, simHint, simEval,
  simRetry: () => { if (sim && sim.mode !== 'local') clientTurn(); },
  simBack: () => { sim.ev = null; render(); },
  simNew: () => { sim = null; render(); },
  simAgain: () => newSim(sim.prod, sim.tipo, sim.hide),
  copyLink: () => { const done = () => toast('Enlace copiado. Pégalo en Chrome.'); try { navigator.clipboard.writeText(APP_URL).then(done, () => toast('Mantén presionado el enlace para copiarlo.')); } catch (e) { toast('Mantén presionado el enlace para copiarlo.'); } },
  coachSend, coachSug: b => coachSend(b.dataset.q),
  coachClear: () => { if (coach.ctl) coach.ctl.abort(); coach.turns = []; coach.msgs = []; coach.busy = false; render(); },
  num: b => { const k = dayKey(), n = S.nums[k] || (S.nums[k] = { p: 0, r: 0, c: 0 }); n[b.dataset.k] = Math.max(0, n[b.dataset.k] + Number(b.dataset.d)); const keep = Object.keys(S.nums).sort().slice(-60); S.nums = Object.fromEntries(keep.map(x => [x, S.nums[x]])); save(); const y = $('#view').scrollTop; render(); $('#view').scrollTop = y; },
  tog: b => { S[b.dataset.k] = !S[b.dataset.k]; if (!S.voz) hush(); save(); b.setAttribute('aria-pressed', S[b.dataset.k]); },
  resetAsk: () => { resetAsk = true; render(); $('#view').scrollTop = 1e6; },
  resetNo: () => { resetAsk = false; render(); $('#view').scrollTop = 1e6; },
  resetYes: () => { resetAsk = false; const keep = { prod: S.prod, voz: S.voz, auto: S.auto, goal: S.goal, me: S.me, onb: S.onb }; S = Object.assign({}, DEF, { day: { d: '', xp: 0 }, done: {}, nums: {} }, keep); save(); go('ruta'); toast('Progreso borrado.'); }
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
  const f = ACT[b.dataset.act]; if (f) f(b, e);
});
document.addEventListener('change', e => { if (e.target.dataset.change === 'foco') cfg.foco = e.target.value; });
document.addEventListener('keydown', e => {
  const t = e.target, typing = t.matches && t.matches('textarea, input, select');
  if (!ses || $('#player').hidden || typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/^[1-4]$/.test(e.key)) { const b = document.querySelectorAll('#player .opt')[Number(e.key) - 1]; if (b && !b.disabled) { e.preventDefault(); b.click(); } return; }
  if (e.key === 'Enter' && !(t.matches && t.matches('button'))) { const m = $('#player [data-act=sesMain]'); if (m && !m.disabled) { e.preventDefault(); m.click(); } }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
  const t = e.target; if (!t.matches || !t.matches('textarea[data-send]')) return;
  e.preventDefault(); ACT[t.dataset.send]();
});

/* ───────── arranque ───────── */
markCaps(); render();
if (!S.onb && !S.xp) startOnb();
capP.then(() => { if (view === 'guia' && !ses) render(); });
initCloud();
if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) {} }
})();
