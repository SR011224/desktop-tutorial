// Une src/ en un solo archivo. Uso: node build.mjs
// - dojo.html  : la página que se publica en claude.ai (la IA usa tu cuenta de Claude; progreso en la nube)
// - index.html : la app instalable (PWA) para el celular: trae el SDK de Anthropic para conversar con tu propia clave
import { readFileSync, writeFileSync } from 'node:fs';
const here = f => new URL('./' + f, import.meta.url);
const read = f => readFileSync(here('src/' + f), 'utf8');
const tpl = read('shell.html').replace('/*CSS*/', () => read('styles.css'));
const fill = t => t.replace('/*DATA*/', () => read('data.js')).replace('/*APP*/', () => read('app.js'));
const page = fill(tpl);
writeFileSync(here('dojo.html'), page);
const sdk = readFileSync(here('vendor/anthropic-sdk.min.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const tplPwa = tpl.replace('<script>\n/*DATA*/', () => '<script>\n' + sdk + '\n</script>\n<script>\n/*DATA*/');
if (tplPwa === tpl) throw new Error('No se pudo insertar el SDK');
writeFileSync(here('index.html'),
  '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' +
  '<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#0a0a0b">\n<link rel="icon" href="icon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="icon-192.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black">\n<meta name="apple-mobile-web-app-title" content="Cierres">\n' +
  '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px);background:#0a0a0b}body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n' +
  fill(tplPwa) + '<script>if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) navigator.serviceWorker.register("sw.js").catch(function () {});</script>\n</body>\n</html>\n');
for (const f of ['manifest.webmanifest', 'sw.js', 'icon.svg']) writeFileSync(here(f), readFileSync(here('pwa/' + f)));
console.log('ok · claude.ai', page.length, 'bytes · app instalable', readFileSync(here('index.html'), 'utf8').length, 'bytes');
