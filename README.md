# Dojo de Cierres

App para aprender a cerrar ventas practicando, al estilo Duolingo. Funciona en celular y computador.

Se basa en el material de **Alex Dey** (Los doce cierres de venta, La Biblia del Vendedor, Cómo identificar la personalidad del prospecto, El poder de la palabra hablada y los cuadernos del intensivo Cierra Más) y en los métodos de **Brian Tracy** (Psicología de ventas). Los textos y guiones fueron redactados para la app; la app no está afiliada a ninguno de los dos autores.

## Metodología

1. **Aprende** una técnica en un minuto.
2. **Practícala** con ejercicios cortos: opción múltiple, armar la frase, reconocer el cierre y responder escribiendo o hablando.
3. **Úsala** frente a un cliente en el Simulador.
4. **Repásala** en el Repaso del día, que te la vuelve a preguntar a los 1, 2, 4, 7, 15 y 30 días (repetición espaciada). Si fallas, vuelve al día siguiente.

La bienvenida ajusta la app a cada persona: qué vendes, meta diaria (10, 30 o 60 XP), tu tipo de vendedor (sanguíneo, colérico, flemático o melancólico, con tus lecciones clave marcadas) y una prueba de nivel opcional para saltar lo que ya dominas.

## Qué incluye

- **Ruta**: 46 lecciones en 10 unidades que se desbloquean en orden.
  - Los 12 cierres de Alex Dey en su orden: conclusión, doble alternativa, amarre, amarre invertido, puercoespín, envolvente, equivocación, compromiso, eliminación, rebote, teoría del silencio y Benjamín Franklin.
  - Más cierres de Alex Dey (insinuaciones, comprobación, por referencia, avión), 5 cierres de Brian Tracy, el método para rebatir objeciones (dos no y un sí, seis pasos, zapato en su pie, aislar) y 7 objeciones comunes.
  - Mentalidad, ciclo de la venta, presentación, palabras que venden, precio, voz en forma de N, tipos de cliente, referidos y medición.
  - Tres sellos por técnica: aprendida, sin errores y usada en vivo.
- **Simulador**, en dos modos:
  - **Cliente entrenado**: funciona en cualquier lugar, también en la app de Claude del celular. Pone objeciones según su tipo, reconoce los cierres del curso en lo que dices, sube o baja su interés y te califica.
  - **Cliente con IA**: Claude improvisa al cliente y un entrenador evalúa la cita completa.
- **Objeciones**: rondas rápidas de cinco objeciones con corrección.
- **Coach**: preguntas del tipo «si el cliente dice X, ¿qué respondo?».
- **Guía**: todas las técnicas de consulta, los 4 tipos de cliente y el registro diario de prospectos, presentaciones y cierres.

## Dónde funciona cada cosa

| | Dentro de claude.ai (Artifact) | `index.html` suelto |
| --- | --- | --- |
| Lecciones, rondas, guía | Sí | Sí |
| Cliente entrenado, repaso y prueba de nivel | Sí | Sí |
| Cliente con IA, Coach y corrección con IA | Sí, en navegador (no en la app de Claude del celular) | No (autoevaluación contra la respuesta modelo) |
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
