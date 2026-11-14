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
  '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n' +
  page + '</body>\n</html>\n');
console.log('ok', page.length, 'bytes');
