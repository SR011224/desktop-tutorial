// Une src/ en un solo archivo. Uso: node build.mjs
// - dojo.html  : la página tal como se publica como Artifact en claude.ai (con IA, voz y progreso en la nube)
// - index.html : la misma app con <!doctype>, para abrirla directo en un navegador o en GitHub Pages
import { readFileSync, writeFileSync } from 'node:fs';
const read = f => readFileSync(new URL('./src/' + f, import.meta.url), 'utf8');
const page = read('shell.html')
  .replace('/*CSS*/', () => read('styles.css'))
  .replace('/*DATA*/', () => read('data.js'))
  .replace('/*APP*/', () => read('app.js'));
writeFileSync(new URL('./dojo.html', import.meta.url), page);
writeFileSync(new URL('./index.html', import.meta.url),
  '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' +
  '<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#2347d9">\n<link rel="icon" href="icon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="icon-192.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Cierres">\n' +
  '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n' +
  page + '<script>if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) navigator.serviceWorker.register("sw.js").catch(function () {});</script>\n</body>\n</html>\n');
// Archivos de la app instalable junto a index.html
for (const f of ['manifest.webmanifest', 'sw.js', 'icon.svg']) writeFileSync(new URL('./' + f, import.meta.url), readFileSync(new URL('./pwa/' + f, import.meta.url)));
console.log('ok', page.length, 'bytes');
