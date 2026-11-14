# Dojo de Cierres

App para aprender a cerrar ventas practicando, al estilo Duolingo. Funciona en celular y computador.

Se basa en los métodos de **Brian Tracy** (psicología de ventas) y **Alex Dey** (cierres, tipos de cliente, guion de referidos y agenda del vendedor). Los textos y guiones fueron redactados para la app; no son citas textuales y la app no está afiliada a ninguno de los dos autores.

## Qué incluye

- **Ruta**: 33 lecciones en 7 unidades, que se desbloquean en orden. Cada lección explica la técnica y la practica con opción múltiple, armar la frase, reconocer el cierre y responder con tu voz o por escrito.
  - Los 12 cierres de Alex Dey, 5 cierres de Brian Tracy, 7 objeciones, tipos de cliente, mentalidad, referidos y medición.
  - Tres sellos por técnica: aprendida, sin errores y usada en vivo.
- **Simulador**: Claude hace de cliente (sanguíneo, colérico, flemático, melancólico o sorpresa) sobre tu producto. Al final, un entrenador califica la cita, detecta qué cierres usaste y propone la frase que cambiaría.
- **Objeciones**: rondas rápidas de cinco objeciones con corrección.
- **Coach**: preguntas del tipo «si el cliente dice X, ¿qué respondo?».
- **Guía**: todas las técnicas de consulta, los 4 tipos de cliente y el registro diario de prospectos, presentaciones y cierres.

## Dónde funciona cada cosa

| | Dentro de claude.ai (Artifact) | `index.html` suelto |
| --- | --- | --- |
| Lecciones, rondas, guía | Sí | Sí |
| Simulador, Coach y corrección con IA | Sí | No (autoevaluación contra la respuesta modelo) |
| Hablar (dictado) | Chrome/Edge de escritorio y app de escritorio | Chrome/Edge, con el micrófono del navegador |
| Voz del cliente | Chrome/Edge de escritorio | Voz del navegador |
| Progreso | Se sincroniza en tu cuenta | Sólo en ese navegador |

En el celular, dentro de claude.ai, usa el micrófono del teclado para dictar.

## Estructura

```
src/data.js     contenido del curso (lecciones, tipos de cliente)
src/app.js      lógica: lecciones, simulador, coach, voz, progreso
src/styles.css  diseño (claro y oscuro)
src/shell.html  estructura de la página
build.mjs       une todo en dojo.html (Artifact) e index.html (navegador)
```

Para reconstruir después de un cambio: `node build.mjs`.
