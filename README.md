# Cierres

Entrenador de ventas para aprender a cerrar como enseñan **Alex Dey** y **Brian Tracy**, conversando por voz o por escrito con una IA. Negro y dorado, para celular y computador.

## Qué tiene

**Hablar** (la parte principal)
- **Coach**: conversa con tu coach de ventas como en una llamada. Pregúntale qué responder ante una objeción, pídele que te enseñe un cierre, que arme contigo tu presentación o que haga un juego de rol.
- **Tú vendes**: la IA es un cliente (sanguíneo, colérico, flemático, melancólico o sorpresa) que te pone objeciones. Al final te califica y te dice qué frase cambiar.
- **Tú compras**: la IA es un vendedor experto con el estilo de Alex Dey o de Brian Tracy. Tú pones objeciones y debajo de cada frase ves qué técnica usó, para aprender escuchando.
- **Cliente entrenado**: funciona sin IA (por ejemplo, en la app de Claude del celular). Reconoce los cierres del curso en lo que dices y reacciona.
- Todas las sesiones se guardan y se pueden retomar.

**Aprender**: 12 módulos que se desbloquean en orden (o todos a la vez desde Perfil). Cada uno tiene:
- una clase narrada en voz alta, tema por tema;
- una demostración: una venta real contada con voces de vendedor y cliente, con la técnica marcada en cada frase (con IA, también con tu producto);
- una clase por voz con el coach, que explica cada técnica y practica contigo;
- práctica de respuestas: el cliente te habla y tú respondes.

**Biblioteca**: las 52 técnicas con buscador, los 4 tipos de cliente y las demostraciones.

**Perfil**: tu estilo de vendedor (opcional), tu producto, el estilo del coach (Dey o Tracy), la IA, las voces, tus sesiones, tus números del día y el respaldo.

La IA enseña y vende con los métodos de Alex Dey y Brian Tracy, pero no es ninguno de ellos ni imita su voz. Las voces son las del dispositivo (o las de Claude dentro de claude.ai).

## Dos formas de usarla

| | En claude.ai (`dojo.html`) | App instalable (`index.html`) |
| --- | --- | --- |
| IA | Tu cuenta de Claude, sin clave. Funciona en el navegador; la app de Claude del celular no se la permite a las páginas | Gratis sin clave (Pollinations), gratis con tu clave de Gemini (Google AI Studio) o tu clave de Claude (de pago) |
| Voz y micrófono | Navegador de escritorio | Chrome en Android; Safari en iPhone (la voz sí, el micrófono depende de la versión) |
| Manos libres | No | Sí: escucha sola cuando la IA termina de hablar |
| Sin internet | No | Sí, todo menos la IA |
| Progreso | Se sincroniza con tu cuenta | Se guarda en el teléfono; usa Respaldo para pasarlo a otro |

### La app instalable

Está publicada en **https://sr011224.github.io/desktop-tutorial/** (GitHub Pages, rama `gh-pages`).

1. Ábrela en Chrome (Android) o Safari (iPhone) → menú ⋮ → «Instalar app» / Compartir → «Agregar a pantalla de inicio».
2. La IA viene incluida y funciona de una vez, gratis y sin clave (Pollinations y LLM7, con paso automático de uno a otro). Para que sea más rápida y estable: Perfil → IA → «Sacar mi clave gratis» (aistudio.google.com/apikey), crea la clave de Gemini y pégala.
3. Las voces son las del teléfono. Para voces más naturales, instala las voces mejoradas en español (instrucciones en Perfil → Voz).

Orden de uso de la IA: Claude (si pusiste clave) → Gemini → IA gratis sin clave. Si se acaba el cupo diario de Gemini, la app sigue sola con la IA gratis.

Para actualizar la página publicada: `node build.mjs` y copia `index.html`, `sw.js`, `manifest.webmanifest` y los íconos a la rama `gh-pages`.

## Estructura

```
src/data.js      contenido: lecciones, módulos, demostraciones, tipos de cliente, estilos
src/app.js       la app: voz, micrófono, IA, chat, módulos, perfil
src/styles.css   diseño negro y dorado
src/shell.html   estructura de la página
vendor/          SDK oficial de Anthropic empaquetado para el navegador (MIT)
pwa/             manifiesto, íconos y modo sin conexión
build.mjs        genera dojo.html (claude.ai) e index.html (app instalable)
```

Para reconstruir: `node build.mjs`.

## Fuentes

Alex Dey: Los doce cierres de venta, La Biblia del Vendedor, Cómo identificar la personalidad del prospecto, El poder de la palabra hablada y los cuadernos del intensivo Cierra Más (Los 4 tipos de cliente, El guion de referidos, La agenda del vendedor millonario). Brian Tracy: Psicología de ventas. Los textos están redactados para esta app a partir de ese material; la app no está afiliada a ninguno de los dos.
