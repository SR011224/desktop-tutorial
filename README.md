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
| IA | Tu cuenta de Claude, sin clave. Funciona en el navegador; la app de Claude del celular no se la permite a las páginas | Tu clave de API de Anthropic, guardada sólo en el teléfono |
| Voz y micrófono | Navegador de escritorio | Chrome en Android; Safari en iPhone (la voz sí, el micrófono depende de la versión) |
| Manos libres | No | Sí: escucha sola cuando la IA termina de hablar |
| Sin internet | No | Sí, todo menos la IA |
| Progreso | Se sincroniza con tu cuenta | Se guarda en el teléfono; usa Respaldo para pasarlo a otro |

### Publicar la app instalable
1. Haz público este repositorio, o usa un plan de GitHub que permita Pages en repositorios privados.
2. Settings → Pages → Deploy from a branch → elige la rama y la carpeta raíz.
3. Abre la dirección que te da GitHub en Chrome del celular → menú ⋮ → «Instalar app».
4. En la app: Perfil → IA → pega tu clave de API (console.anthropic.com → API Keys).

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
