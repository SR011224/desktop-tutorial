/* Contenido del curso. Redacción propia de la app, basada en los métodos de
   Brian Tracy (psicología de ventas) y Alex Dey (cierres, tipos de cliente, referidos, agenda).
   k: base | prueba | maestro | tracy | obj | post.  mc: [pregunta, [opciones], índice correcto, explicación] */
window.DOJO = {
UNITS: [
  { t: "Cabeza de cerrador", d: "Antes de aprender frases, arregla lo que pasa en tu cabeza cuando vas a pedir la venta.", src: "Brian Tracy" },
  { t: "Lee a tu cliente", d: "Cuatro tipos de persona, cuatro formas de comprar. Reconócelos en el primer minuto.", src: "Alex Dey" },
  { t: "Cierres de prueba", d: "Preguntas pequeñas que juntan síes y te dicen qué tan cerca estás.", src: "Alex Dey" },
  { t: "Cierres maestros", d: "El momento de pedir la decisión, con cinco formas distintas de hacerlo.", src: "Alex Dey" },
  { t: "Cierres de Brian Tracy", d: "Cinco cierres suaves y profesionales para rematar la presentación.", src: "Brian Tracy" },
  { t: "Objeciones", d: "Qué responder cuando el cliente dice justo lo que no querías oír.", src: "Tracy y Dey" },
  { t: "Después del sí", d: "Referidos y medición: lo que convierte una venta en una carrera.", src: "Alex Dey" }
],
LESSONS: [
/* ───────── U1 · Brian Tracy ───────── */
{ id: "autoconcepto", u: 0, n: "Vendes como te ves", src: "Brian Tracy", k: "base",
  idea: "Brian Tracy sostiene que tus ventas nunca superan por mucho tiempo la imagen que tienes de ti como vendedor. Si por dentro te ves como alguien que molesta, vas a evitar pedir la venta. El cierre empieza en tu cabeza antes que en tu boca.",
  cuando: "Todos los días, antes de la primera cita.",
  f: ["Háblate en positivo antes de cada cita: «Me gusto. Me encanta mi trabajo».", "Decide cuánto quieres ganar y actúa como alguien que ya gana eso.", "Mírate como asesor que ayuda a decidir, no como alguien que pide un favor."],
  fr: ["Mi trabajo es ayudar a esta persona a tomar una buena decisión."],
  err: "Creer que cerrar es presionar. Quien cree eso titubea justo cuando toca pedir la firma.",
  mc: [
    ["Según Tracy, ¿qué limita primero tus ventas?", ["El precio de tu producto", "La imagen que tienes de ti como vendedor", "La competencia"], 1, "Tu ingreso sigue a tu autoconcepto. Cambia la imagen y cambia el resultado."],
    ["Llegas a una cita pensando «seguro no le interesa». ¿Qué haces antes de entrar?", ["Entro rápido para salir de eso", "Cambio mi diálogo interno y entro como asesor", "Bajo el precio de entrada"], 1, "El cliente nota tu duda antes de que abras la boca."]
  ],
  resp: [{ ctx: "Estás por tocar la puerta de un cliente. Di en voz alta tu frase de arranque: quién eres como vendedor y a qué vienes.", m: "Soy un profesional de las ventas. Vengo a ayudar a esta persona a decidir bien y, si mi producto le sirve, le voy a pedir la venta con seguridad.", c: "Habla en positivo y en primera persona, se ve como asesor que ayuda y menciona que va a pedir la venta sin miedo." }] },

{ id: "rechazo", u: 0, n: "El «no» no es contigo", src: "Brian Tracy", k: "base",
  idea: "El rechazo es parte del oficio y casi nunca es personal: el cliente rechaza una oferta en un momento, no a ti. Tracy repite que la gran mayoría de las ventas se cierran después de varios intentos y que el vendedor promedio se rinde en el primero.",
  f: ["Separa tu valor como persona del resultado de la cita.", "Después de un no, haz otra pregunta u otro cierre.", "Recuerda que el cliente también tiene miedo: a equivocarse."],
  fr: ["Entiendo. ¿Puedo preguntarle qué es lo que lo detiene?"],
  err: "Tomar el primer «no» como final y guardar tus cosas.",
  mc: [
    ["El cliente dice «no, gracias» en tu primer intento. ¿Qué significa casi siempre?", ["Que no le caíste bien", "Que todavía no ve suficiente razón para decidir", "Que nunca va a comprar"], 1, "Es un «todavía no». Tu trabajo es descubrir qué le falta."],
    ["¿Cuál es el miedo más grande del comprador?", ["Equivocarse o pagar de más", "Que el vendedor se enoje", "Quedarse sin opciones"], 0, "Por eso las garantías, los testimonios y la calma venden."]
  ],
  resp: [{ cl: "No, gracias, no me interesa.", m: "Lo entiendo, y no quiero quitarle tiempo. Sólo por curiosidad, ¿qué fue lo que no le convenció: el producto o el momento?", c: "No discute ni se rinde; hace una pregunta para descubrir la razón real." }] },

{ id: "emocion", u: 0, n: "Emoción primero, lógica después", src: "Brian Tracy", k: "base",
  idea: "La gente decide con la emoción y después lo justifica con la lógica. Tracy lo aterriza en dos motores: el deseo de ganar y el miedo a perder, y el miedo a perder pesa más. Tu tarea es encontrar el botón caliente: el beneficio que más le importa a ese cliente en particular.",
  f: ["Pregunta más de lo que hablas: el cliente debe hablar la mayor parte del tiempo.", "Detecta el beneficio que repite o que le cambia la cara. Ese es su botón.", "Presenta y cierra sobre ese beneficio, no sobre la lista completa."],
  fr: ["De todo lo que le mostré, ¿qué es lo más importante para usted?"],
  err: "Recitar todas las características. Cuando todo es importante, nada lo es.",
  mc: [
    ["¿Qué es el «botón caliente»?", ["El descuento máximo que puedes dar", "El beneficio que más le importa a este cliente", "La objeción más fuerte"], 1, "Una vez que lo encuentras, toda la venta gira alrededor de él."],
    ["Un cliente repite tres veces «lo que quiero es no preocuparme». ¿Sobre qué cierras?", ["Sobre el precio", "Sobre la tranquilidad que va a tener", "Sobre las especificaciones técnicas"], 1, "Te dijo su botón tres veces. Úsalo."]
  ],
  resp: [{ ctx: "Acabas de terminar tu presentación. Haz la pregunta que descubre el botón caliente del cliente.", m: "De todo lo que vimos, ¿qué es lo que más le importa a usted resolver?", c: "Es una pregunta abierta que busca el beneficio principal; no ofrece descuento ni repite características." }] },

/* ───────── U2 · Tipos de cliente ───────── */
{ id: "tipos", u: 1, n: "Las dos preguntas", src: "Alex Dey", k: "base", lista: true,
  idea: "Antes de presentar, lee a la persona. Alex Dey propone dos preguntas que contestas observando: ¿va rápido o va con calma? ¿Le importa más la gente o el asunto? Con eso sabes cuál de los cuatro tipos manda en tu cliente.",
  f: ["Rápido y enfocado en la gente: sanguíneo. Compra la experiencia y cómo lo van a ver.", "Rápido y enfocado en el resultado: colérico. Compra poder, control y eficiencia.", "Con calma y enfocado en los números: flemático. Compra tranquilidad.", "Con calma y enfocado en los sentimientos: melancólico. Compra significado y confianza en ti."],
  fr: ["Tú te adaptas al ritmo del cliente, nunca al revés."],
  err: "Darle la misma presentación a todo el mundo.",
  mc: [
    ["Te recibe de pie, mira el reloj y pregunta «¿cuánto cuesta?». ¿Qué tipo manda?", ["Sanguíneo", "Colérico", "Flemático", "Melancólico"], 1, "Rápido y enfocado en el resultado."],
    ["Te ofrece café, saca la calculadora y pregunta por la letra chiquita.", ["Sanguíneo", "Colérico", "Flemático", "Melancólico"], 2, "Con calma y enfocado en los números."],
    ["Te cuenta un chiste, te pregunta de dónde eres y habla con las manos.", ["Sanguíneo", "Colérico", "Flemático", "Melancólico"], 0, "Rápido y enfocado en la gente."]
  ],
  resp: [{ cl: "Tengo cinco minutos. ¿Qué me traes?", ctx: "Es un cliente colérico. Da tu frase de entrada.", m: "Voy al grano: esto le ahorra diez horas de trabajo a la semana. Le muestro en tres minutos cómo, y usted decide.", c: "Directo, un resultado concreto, breve, deja la decisión en manos del cliente; sin rodeos ni chistes." }] },

{ id: "tipos-cierre", u: 1, n: "Un cierre para cada tipo", src: "Alex Dey", k: "base", lista: true,
  idea: "El mismo cierre gana con uno y pierde con otro. Al sanguíneo le funcionan las imágenes y el futuro; al colérico, opciones rápidas y pruebas; al flemático, números ordenados y cero presión; al melancólico, sus seres queridos y la confianza.",
  f: ["Sanguíneo: insinuaciones y envolvente. Cierra hoy, mañana ya se enfrió.", "Colérico: doble alternativa y comprobación. Corto y firme.", "Flemático: Benjamín Franklin, avión y proceso de eliminación. Sin prisa.", "Melancólico: doble alternativa con sus seres queridos e insinuaciones emocionales."],
  fr: ["¿Lo firmamos a nombre suyo o de la empresa?"],
  err: "Usar el Benjamín Franklin con un sanguíneo, que lo siente como tarea de escuela. O meterle prisa a un flemático: la presión lo congela.",
  mc: [
    ["¿Qué cierre evitas con un sanguíneo?", ["Insinuaciones", "Benjamín Franklin", "Envolvente"], 1, "Las listas y los números lo aburren."],
    ["Un flemático dice «lo tengo que pensar». ¿Qué te conviene?", ["Decirle que la oferta vence hoy", "Proceso de eliminación, con calma", "Contarle un chiste"], 1, "Si lo dejas ir a pensarlo, lo piensa seis meses."],
    ["¿Cuál es el riesgo con el melancólico?", ["Que te descarte en dos minutos", "Que diga que sí por pena y luego se arrepienta", "Que se aburra con los números"], 1, "Asegúrate de que esté convencido de verdad antes de firmar."]
  ],
  resp: [{ ctx: "Cliente melancólico, padre de familia, duda en silencio. Haz una doble alternativa que toque a sus seres queridos.", m: "¿Incluimos a sus hijos como beneficiarios o solamente a su esposa?", c: "Es una doble alternativa (dos opciones y ambas son un sí) y menciona a la familia." }] },

/* ───────── U3 · Cierres de prueba ───────── */
{ id: "sies", u: 2, n: "Síes pequeños", src: "Alex Dey", k: "base",
  idea: "Un cierre de prueba es una pregunta pequeña que mide la temperatura: si la respuesta es favorable, el cliente ya está comprando un poco. Alex Dey recomienda juntar al menos cinco síes pequeños antes del cierre maestro, que es cuando pides la decisión.",
  f: ["Presenta un beneficio.", "Haz un cierre de prueba sobre ese beneficio.", "Cuenta los síes. Con cinco, pasa al cierre maestro.", "Después de la pregunta de cierre, guarda silencio."],
  fr: ["Después de la pregunta de cierre, guarda silencio."],
  err: "Saltar al cierre final con cero síes acumulados, o seguir hablando después de preguntar.",
  mc: [
    ["¿Cuántos síes pequeños conviene juntar antes del cierre maestro?", ["Uno", "Al menos cinco", "Ninguno, se cierra directo"], 1, "Si no llevas cinco, ahí está la razón de que no cierres."],
    ["Haces la pregunta de cierre y el cliente se queda callado. ¿Qué haces?", ["Le explico otra ventaja", "Guardo silencio y espero", "Le ofrezco un descuento"], 1, "Si hablas tú, le quitas la presión de decidir."],
    ["Haces muchas presentaciones y pocos cierres. ¿Qué te falta?", ["Ver más gente", "Cierres de prueba y pedir la venta", "Mejorar el saludo"], 1, "Es la fuga más cara y la más común."]
  ],
  resp: [{ ctx: "Acabas de mostrar que tu producto se entrega en 24 horas. Haz un cierre de prueba sobre ese beneficio.", m: "Recibirlo en 24 horas le resuelve el problema de esta semana, ¿verdad?", c: "Es una pregunta corta, atada al beneficio, que busca un sí pequeño." }] },

{ id: "doble", u: 2, num: 1, n: "Doble alternativa", src: "Alex Dey", k: "prueba",
  idea: "Nunca preguntes algo que se conteste con «no». Ofrece dos opciones y cualquiera de las dos te acerca a la venta. El cliente siente que elige y, eligiendo, avanza.",
  cuando: "Para pedir la cita, para definir entrega o pago y para cerrar.",
  f: ["Da por hecho el sí.", "Ofrece dos opciones concretas.", "Calla y deja que escoja."],
  fr: ["¿Le queda mejor mañana a las diez o el jueves a las cuatro?", "¿Lo prefiere de contado o en mensualidades?", "¿Lo registramos a su nombre o al de la empresa?"],
  err: "Preguntar «¿cuándo tiene tiempo?» o «¿le interesa?». Las dos se contestan con un no.",
  mc: [
    ["¿Cuál es una doble alternativa?", ["¿Le gustaría agendar una cita?", "¿Nos vemos el martes en la mañana o el miércoles en la tarde?", "¿Cuándo tiene tiempo?"], 1, "Dos opciones y las dos son un avance."],
    ["¿Por qué funciona?", ["Porque confunde al cliente", "Porque cualquiera de las dos respuestas es un avance", "Porque baja el precio"], 1, "El cliente decide entre cómo, no entre sí o no."]
  ],
  resp: [
    { cl: "Sí me gusta, se ve bien.", m: "Qué bueno. ¿Lo quiere empezar este mes o prefiere arrancar el día primero?", c: "Ofrece dos opciones y las dos implican compra; no hace una pregunta de sí o no." },
    { cl: "Mándeme la información y yo le aviso.", ctx: "Estás por teléfono pidiendo una cita.", m: "Con gusto. Para explicársela en diez minutos y no llenarle el correo, ¿le queda mejor mañana a las once o el jueves a las cinco?", c: "Convierte la evasiva en una cita ofreciendo dos horarios." }
  ] },

{ id: "amarre", u: 2, num: 2, n: "Amarre", src: "Alex Dey", k: "prueba",
  idea: "Un amarre es una coletilla que pide confirmación: «¿verdad?», «¿no es cierto?», «¿no cree?». Cada vez que el cliente asiente, te da un sí pequeño. Va al final de la frase, al principio (invertido) o en medio (interno).",
  f: ["Di una verdad que el cliente ya aceptó o va a aceptar.", "Ciérrala con el amarre.", "Espera el sí. Cambia la posición para que no suene a muletilla."],
  fr: ["La seguridad de su familia es lo primero, ¿verdad?", "¿No es cierto que ahorrar tiempo le deja más ganancia?", "Ahora que lo vio funcionar, ¿verdad que se entiende fácil?"],
  err: "Amarrar cada frase. Tres seguidos y suena a truco.",
  mc: [
    ["¿Cuál es un amarre invertido?", ["Es importante cuidar el gasto, ¿verdad?", "¿Verdad que es importante cuidar el gasto?", "¿Lo quiere en rojo o en azul?"], 1, "El amarre va al principio de la frase."],
    ["¿Para qué sirve el amarre?", ["Para juntar síes pequeños", "Para contestar objeciones de precio", "Para pedir referidos"], 0, "Cada asentimiento es un sí que acumulas."]
  ],
  resp: [{ cl: "Lo que más me importa es que dure.", m: "Y un producto con cinco años de garantía le da esa tranquilidad, ¿no es cierto?", c: "Retoma lo que dijo el cliente y termina o empieza con una coletilla de confirmación." }] },

{ id: "puerco", u: 2, num: 3, n: "Puercoespín", src: "Alex Dey", k: "prueba",
  idea: "Si alguien te avienta un puercoespín, lo regresas de inmediato. Cuando el cliente hace una pregunta que huele a interés, no contestes «sí»: regrésala con otra pregunta que lo comprometa.",
  f: ["Detecta la pregunta de interés.", "Regrésala: «¿Lo quiere…?», «¿Le gustaría…?».", "Su respuesta ya es un sí."],
  fr: ["¿Lo quiere en color rojo?", "¿Le gustaría recibirlo antes del día quince?", "¿Necesita que incluya instalación?"],
  err: "Contestar «sí, sí lo tenemos» y seguir explicando. Regalaste un cierre.",
  mc: [
    ["Cliente: «¿Lo tienen en azul?». ¿Cuál es la respuesta puercoespín?", ["Sí, claro, en azul y en gris", "¿Lo quiere en azul?", "Déjeme revisar el inventario"], 1, "Si contesta «sí», ya dijo que lo quiere."],
    ["¿Cuándo usas el puercoespín?", ["Cuando el cliente pregunta algo que muestra interés", "Cuando dice que está caro", "Al saludar"], 0, "Preguntas sobre color, entrega o forma de pago son señales de compra."]
  ],
  resp: [{ cl: "¿Me lo pueden entregar este viernes?", m: "¿Le gustaría recibirlo este viernes?", c: "Devuelve la pregunta con otra pregunta que confirma el deseo; no contesta sólo «sí»." }] },

{ id: "envolvente", u: 2, num: 4, n: "Envolvente", src: "Alex Dey", k: "prueba",
  idea: "Haces una pregunta sobre cómo va a usar el producto cuando ya sea suyo. Para contestar, el cliente tiene que imaginarse dueño. Lo envuelves en el futuro.",
  f: ["Habla como si ya lo tuviera.", "Pregunta por un detalle de uso: quién, dónde, cuándo.", "Escucha. Si contesta con detalle, ya compró en su mente."],
  fr: ["¿A quién va a ser el primero en enseñárselo?", "¿En qué parte de la casa lo va a poner?", "¿Quién más de su equipo lo va a usar?"],
  err: "Usar un condicional débil: «si lo llegara a comprar…». Habla en futuro seguro.",
  mc: [
    ["¿Cuál es un cierre envolvente?", ["¿Quién va a manejar el carro además de usted?", "¿Verdad que es bonito?", "¿Le interesa?"], 0, "Para contestar tiene que verse como dueño."],
    ["¿Con qué tipo de cliente brilla más?", ["Sanguíneo, que vive en el futuro", "Flemático, que quiere números", "Con ninguno"], 0, "El sanguíneo se imagina presumiéndolo."]
  ],
  resp: [{ ctx: "Vendes un curso en línea.", cl: "Se ve interesante.", m: "¿Lo va a tomar usted sola o también lo va a compartir con su equipo?", c: "Pregunta sobre el uso futuro dando por hecho que ya es suyo." }] },

{ id: "equivoc", u: 2, num: 5, n: "Equivocación", src: "Alex Dey", k: "prueba",
  idea: "Te equivocas a propósito en un detalle. Si el cliente te corrige, acaba de confirmar que va a comprar: nadie corrige los detalles de algo que no piensa tomar.",
  f: ["Escoge un dato que el cliente ya mencionó: fecha, color, cantidad.", "Repítelo mal, con naturalidad.", "Cuando te corrija, anótalo: «Perfecto, entonces el día veinte»."],
  fr: ["Entonces lo necesita para el día quince, ¿cierto?", "Me dijo que eran tres licencias, ¿verdad?"],
  err: "Equivocarte en algo serio como el precio. Sólo en detalles pequeños.",
  mc: [
    ["El cliente dijo que lo quiere para el 20. Tú dices «entonces para el 15, ¿verdad?» y él corrige: «no, el 20». ¿Qué pasó?", ["Perdiste credibilidad", "Confirmó la compra al corregir el detalle", "Nada"], 1, "Corregir la fecha es aceptar que hay entrega."],
    ["¿En qué te conviene «equivocarte»?", ["En el precio", "En un detalle menor que el cliente ya dijo", "En el nombre del cliente"], 1, "Un detalle pequeño, nunca algo que dañe la confianza."]
  ],
  resp: [{ ctx: "La clienta mencionó que quiere el paquete para dos personas. Usa el cierre por equivocación.", m: "Entonces me dijo que el paquete era para tres personas, ¿verdad?", c: "Repite mal a propósito un detalle menor que la clienta ya había dicho, en tono de confirmación." }] },

{ id: "rebote", u: 2, num: 6, n: "Rebote", src: "Alex Dey", k: "prueba",
  idea: "El cliente te pone una condición o una objeción y tú la rebotas convertida en compromiso: si se lo resuelvo, ¿lo toma? Usas su propia fuerza a tu favor.",
  f: ["Escucha la condición completa.", "Rebótala: «Si yo le consigo…, ¿lo tomaría hoy?».", "Ofrece sólo lo que sí puedes cumplir."],
  fr: ["Si le consigo la entrega para el viernes, ¿lo tomaría hoy?", "Si logro que le respeten ese plazo, ¿cerramos el trato?"],
  err: "Decir «sí se puede» gratis. Primero pide el compromiso y después concede.",
  mc: [
    ["Cliente: «Sólo me sirve si me lo dan a 12 meses». ¿Cuál es el rebote?", ["Sí, sí manejamos 12 meses", "Si le consigo los 12 meses, ¿lo dejamos listo hoy?", "Lo máximo son 6"], 1, "Primero el compromiso, luego la concesión."],
    ["¿Qué cuidas siempre en el rebote?", ["Prometer sólo lo que puedes cumplir", "Hablar más rápido", "Subir el precio"], 0, "Una promesa rota te cuesta el cliente y sus referidos."]
  ],
  resp: [{ cl: "Me gusta, pero lo necesitaría en negro y no lo veo.", m: "Si le consigo el negro, ¿lo aparta hoy mismo?", c: "Convierte la condición en un compromiso de compra con la forma «si le consigo X, ¿lo toma?»." }] },

{ id: "insinua", u: 2, num: 7, n: "Insinuaciones", src: "Alex Dey", k: "prueba",
  idea: "Desde el principio siembras imágenes del cliente disfrutando el resultado. No pides nada: pintas la escena y él solo hace el resto. Con unos son imágenes de admiración; con otros, de tranquilidad.",
  f: ["Elige la emoción que mueve a tu cliente: orgullo, diversión, paz.", "Pinta una escena concreta con «¿se imagina…?».", "Repítelo a lo largo de la plática, no sólo al final."],
  fr: ["¿Se imagina la cara de sus amigos cuando llegue en este carro?", "¿Se imagina la tranquilidad de su familia el día que ya no tenga que preocuparse por esto?"],
  err: "Insinuar una sola vez al final. Las imágenes se siembran durante toda la presentación.",
  mc: [
    ["¿Qué hace el cierre de las insinuaciones?", ["Pide la firma directamente", "Siembra imágenes del cliente disfrutando el resultado", "Compara ventajas y desventajas"], 1, "El cliente se convence con su propia imaginación."],
    ["Para un melancólico, ¿qué imagen eliges?", ["La envidia de los vecinos", "La tranquilidad de su familia", "Los minutos que ahorra"], 1, "Con él, imágenes emocionales en lugar de imágenes de estatus."]
  ],
  resp: [{ ctx: "Vendes membresías de gimnasio. El cliente es sociable y bromista. Siembra una imagen.", m: "¿Se imagina la cara de sus amigos en diciembre cuando lo vean llegar con diez kilos menos?", c: "Pinta una escena concreta y emocional del resultado, adecuada a un sanguíneo: cómo lo van a ver los demás." }] },

/* ───────── U4 · Cierres maestros ───────── */
{ id: "comprob", u: 3, num: 8, n: "Comprobación", src: "Alex Dey", k: "maestro",
  idea: "Antes de demostrar, pides el compromiso: si le compruebo lo que le importa, ¿lo toma? Así tu demostración deja de ser información y se vuelve la última condición antes de firmar.",
  f: ["Identifica el resultado que el cliente quiere.", "Pregunta: «Si le demuestro que…, ¿lo tomaría?».", "Demuestra y regresa por el sí."],
  fr: ["Si le demuestro que esto le ahorra diez horas de trabajo a la semana, ¿lo tomaría?"],
  err: "Demostrar primero y preguntar después. El cliente dice «qué interesante» y no se compromete.",
  mc: [
    ["¿En qué orden va el cierre de comprobación?", ["Demuestro y luego pregunto si le gustó", "Pido el compromiso y luego demuestro", "Pido referidos y luego demuestro"], 1, "El compromiso va antes de la prueba."],
    ["¿Con qué cliente funciona mejor?", ["Colérico: va directo al resultado", "Sanguíneo: quiere historias", "Con ninguno"], 0, "Si le compruebas, compra."]
  ],
  resp: [{ cl: "Yo lo único que quiero es vender más por internet.", m: "Si le demuestro con casos reales que este sistema le trae clientes nuevos cada semana, ¿lo arrancamos hoy?", c: "Usa la estructura «si le demuestro X (el resultado que pidió), ¿lo toma?» antes de demostrar." }] },

{ id: "conclusion", u: 3, num: 9, n: "Por conclusión", src: "Alex Dey", k: "maestro",
  idea: "Das la venta por hecha y empiezas a llenar el pedido. No preguntas «¿lo compra?»: preguntas el primer dato del formato. Si el cliente contesta y te deja escribir, compró.",
  f: ["Saca el pedido con naturalidad.", "Pregunta un dato fácil: nombre completo, dirección, fecha.", "Escribe. Si no te detiene, sigue hasta la autorización.", "Si te detiene, hay una objeción: trátala y vuelve."],
  fr: ["¿Cuál es su nombre completo, tal como va en la factura?", "¿A qué dirección se lo enviamos?"],
  err: "Pedir permiso: «¿le parece si llenamos el pedido?». Eso invita al no.",
  mc: [
    ["¿Cómo arranca el cierre por conclusión?", ["«¿Entonces sí lo va a comprar?»", "«¿Cuál es su nombre completo?», mientras llenas el pedido", "«Piénselo y me avisa»"], 1, "No preguntas si compra: actúas como que ya compró."],
    ["El cliente te detiene: «Espere, todavía no decido». ¿Qué significa?", ["Que perdiste la venta", "Que hay una objeción por resolver; la tratas y vuelves", "Que debes irte"], 1, "Te acaba de decir que falta algo. Averigua qué."]
  ],
  resp: [{ ctx: "Ya juntaste cinco síes. Cierra por conclusión.", cl: "Pues sí, me convence.", m: "Perfecto. ¿Cuál es su nombre completo, tal como debe aparecer en el pedido?", c: "No pregunta si compra; pide el primer dato del pedido dando la venta por hecha." }] },

{ id: "franklin", u: 3, num: 10, n: "Benjamín Franklin", src: "Alex Dey", k: "maestro",
  idea: "Para el indeciso analítico. Divides una hoja en dos columnas: razones a favor y razones en contra. Tú le ayudas con las razones a favor; las razones en contra las escribe él solo. Cuando la columna del sí es más larga, su propia lógica decide.",
  f: ["«Hagamos lo que hacía Benjamín Franklin cuando tenía una decisión difícil.»", "Columna del sí: ayúdale a recordar cada beneficio que ya aceptó.", "Columna del no: dale la pluma y guarda silencio.", "Cuenten las dos columnas: «La respuesta se ve clara, ¿verdad?»."],
  fr: ["Anotemos de un lado las razones para decidirse hoy y del otro las razones en contra.", "Veamos cuántas razones tiene a favor."],
  err: "Ayudarle a llenar la columna del no. Ahí te callas.",
  mc: [
    ["En el Benjamín Franklin, ¿quién llena la columna del no?", ["Tú, para verte honesto", "El cliente, solo", "Nadie"], 1, "Sin tu ayuda casi nunca pasa de una o dos razones."],
    ["¿Con quién NO conviene usarlo?", ["Con un flemático", "Con un sanguíneo, que lo siente como tarea", "Con un contador"], 1, "Está hecho para el analítico."]
  ],
  resp: [{ ctx: "Tu cliente es un ingeniero muy calmado. Inicia el cierre Benjamín Franklin.", cl: "No sé, es que no estoy seguro.", m: "Lo entiendo, es una decisión importante. Hagamos lo que hacía Benjamín Franklin: en esta hoja anotamos de un lado las razones para decidirse hoy y del otro las razones en contra, y vemos cuál pesa más. ¿Le parece?", c: "Propone con calma la lista de dos columnas, a favor y en contra, mencionando el método." }] },

{ id: "elimina", u: 3, num: 11, n: "Proceso de eliminación", src: "Alex Dey", k: "maestro",
  idea: "«Lo voy a pensar» casi nunca es la razón verdadera. Aceptas la frase y luego vas eliminando posibles causas una por una hasta que aparece la real, que casi siempre es el dinero.",
  f: ["Acepta: «Me parece bien, veo que lo está tomando en serio».", "Aclara: «Sólo para entender, ¿qué es lo que quiere pensar?».", "Elimina: «¿Es la empresa? ¿Es el producto? ¿Soy yo?».", "Llega a la real: «¿Será la inversión?», y resuelve esa."],
  fr: ["Sólo para aclarar mis ideas, ¿qué parte es la que quiere pensar?", "¿Es la calidad del producto? ¿Es la garantía? ¿Es la inversión?"],
  err: "Contestar «claro, piénselo, le dejo mi tarjeta». Esa venta se enfría para siempre.",
  mc: [
    ["Cliente: «Lo voy a pensar». ¿Cuál es tu primer paso?", ["Discutir: «¿qué tiene que pensar?»", "Aceptar con calma y preguntar qué parte quiere pensar", "Dejar la tarjeta e irte"], 1, "Aceptar primero baja la defensa."],
    ["¿Qué buscas con las preguntas de eliminación?", ["Cansar al cliente", "Encontrar la objeción real", "Ganar tiempo"], 1, "No puedes resolver una objeción que no conoces."]
  ],
  resp: [{ cl: "Déjeme pensarlo y yo le llamo.", m: "Me parece muy bien, se ve que lo está tomando en serio. Sólo para aclarar mis ideas: ¿qué es lo que quiere pensar? ¿Es el producto, es la garantía o es la inversión?", c: "Primero acepta sin discutir; después pregunta qué quiere pensar y ofrece opciones para aislar la objeción real." }] },

{ id: "referencia", u: 3, num: 12, n: "Por referencia", src: "Alex Dey", k: "maestro",
  idea: "Cuentas la historia breve de un cliente parecido que tenía la misma duda, decidió y le fue bien. La gente no quiere ser la primera: quiere saber que alguien como ella ya lo hizo.",
  f: ["Elige un caso real y parecido: misma duda, mismo tipo de persona.", "Cuenta duda, decisión y resultado en treinta segundos.", "Regresa al cliente: «¿Le gustaría el mismo resultado?»."],
  fr: ["Déjeme contarle lo que le pasó a un cliente con la misma duda que usted.", "Lo mismo me dijo una clienta hace un mes; hoy es de las más contentas."],
  err: "Inventar el caso. Usa historias reales; mejor todavía, un audio del propio cliente.",
  mc: [
    ["¿Qué hace fuerte al cierre por referencia?", ["Que el caso sea real y parecido al cliente", "Que la historia sea muy larga", "Que mencione descuentos"], 0, "El cliente tiene que verse en la historia."],
    ["El cliente se frenó en la mensualidad. ¿Qué historia eliges?", ["La de alguien a quien le sobraba el dinero", "La de alguien que dudó por la mensualidad, decidió y le fue bien", "Tu historia personal"], 1, "Misma duda, final feliz."]
  ],
  resp: [{ cl: "Es que nunca he comprado algo así, me da desconfianza.", m: "Lo entiendo; lo mismo sentía un cliente que tiene un negocio como el suyo. Empezó con el plan básico hace seis meses y ya renovó. ¿Le gustaría escuchar lo que me dijo?", c: "Cuenta un caso breve de un cliente parecido con la misma duda y un buen resultado, y regresa con una pregunta." }] },

/* ───────── U5 · Cierres de Brian Tracy ───────── */
{ id: "invitacion", u: 4, n: "Invitación", src: "Brian Tracy", k: "tracy",
  idea: "Al terminar la presentación preguntas si quedó alguna duda y, si no hay, invitas a decidir con una frase suave. Tracy insiste en que muchas ventas se pierden sólo porque nadie invitó a comprar.",
  f: ["«¿Tiene alguna pregunta o duda que no haya cubierto?»", "Si dice que no: «Entonces, ¿por qué no lo prueba?».", "Silencio."],
  fr: ["Si le gusta lo que vio, ¿por qué no lo prueba?", "¿Tiene alguna pregunta o duda que no haya cubierto?"],
  err: "Terminar con «bueno, ¿qué le parece?». Eso pide una opinión, no una decisión.",
  mc: [
    ["¿Qué preguntas antes de la invitación?", ["Si tiene alguna duda que no hayas cubierto", "Si le alcanza el dinero", "Si conoce a alguien más"], 0, "Si no hay dudas, el camino está libre para invitar."],
    ["¿Cuál es el cierre por invitación?", ["«¿Por qué no lo prueba?»", "«¿Qué opina?»", "«Lo llamo la próxima semana»"], 0, "Directo y sin presión."]
  ],
  resp: [{ ctx: "Terminaste tu presentación.", cl: "No, ninguna duda, todo claro.", m: "Me da gusto. Entonces, ¿por qué no lo prueba?", c: "Invita a decidir de forma directa y suave; no pide opinión ni pospone." }] },

{ id: "directivo", u: 4, n: "Directivo", src: "Brian Tracy", k: "tracy",
  idea: "Confirmas que todo tiene sentido y tú diriges el siguiente paso describiendo qué va a pasar. Das la decisión por tomada y le quitas al cliente el peso de decir «sí, compro».",
  f: ["«¿Tiene sentido para usted lo que hemos visto?»", "«Entonces el siguiente paso es…», y describes el trámite.", "Empieza a hacerlo."],
  fr: ["¿Tiene sentido para usted lo que hemos visto hasta aquí?", "Entonces el siguiente paso es llenar la solicitud, y el lunes lo tiene funcionando."],
  err: "Preguntar «¿qué quiere hacer?» y dejar al cliente solo con la decisión.",
  mc: [
    ["¿Qué pregunta abre el cierre directivo?", ["«¿Tiene sentido para usted hasta aquí?»", "«¿Cuánto quiere gastar?»", "«¿Lo quiere pensar?»"], 0, "Un sí aquí te da permiso de dirigir."],
    ["Después de ese sí, ¿qué haces?", ["Explico el siguiente paso y lo empiezo", "Espero a que el cliente proponga", "Repito la presentación"], 0, "Tú llevas el proceso."]
  ],
  resp: [{ cl: "Sí, me hace sentido.", m: "Excelente. Entonces el siguiente paso es sencillo: llenamos su solicitud ahora, hace el primer pago y el lunes lo tiene instalado.", c: "Describe el siguiente paso concreto dando la decisión por tomada." }] },

{ id: "secundario", u: 4, n: "Punto menor", src: "Brian Tracy", k: "tracy",
  idea: "La decisión grande asusta; una pequeña no. Cierras sobre un detalle secundario: al decidir el detalle, el cliente aceptó el todo.",
  f: ["Elige un detalle menor: color, fecha, forma de pago, a nombre de quién.", "Pregunta por el detalle, no por la compra.", "Anótalo y avanza."],
  fr: ["¿Lo va a querer con la garantía extendida o con la estándar?", "¿La factura va a su nombre o al de su empresa?"],
  err: "Regresar a la decisión grande: «entonces, ¿sí lo compra?».",
  mc: [
    ["¿Por qué funciona cerrar sobre un punto menor?", ["Porque decidir un detalle es más fácil que decidir la compra entera", "Porque distrae del precio", "Porque alarga la cita"], 0, "Quien elige el color ya eligió el carro."],
    ["¿Cuál es un cierre sobre un punto menor?", ["«¿Lo compra o no?»", "«¿Lo quiere con entrega a domicilio o pasa por él?»", "«¿Qué le pareció?»"], 1, "La respuesta implica la compra."]
  ],
  resp: [{ ctx: "Vendes un automóvil. El cliente lo mira con ganas pero no dice nada. Cierra sobre un punto menor.", m: "Por cierto, ¿lo va a querer con los rines deportivos o con los de fábrica?", c: "Pregunta por un detalle secundario cuya respuesta implica que compra." }] },

{ id: "autoriza", u: 4, n: "Autorización", src: "Brian Tracy", k: "tracy",
  idea: "En lugar de pedir «la firma», pides una autorización para empezar. Marcas el lugar, le pasas la pluma y le dices qué vas a hacer tú enseguida.",
  f: ["Ten el pedido lleno.", "«Si me autoriza aquí, yo me encargo del resto.»", "Señala el lugar, entrega la pluma y calla."],
  fr: ["Si me autoriza aquí, empezamos de inmediato.", "Sólo necesito su visto bueno en esta línea y yo me encargo de todo lo demás."],
  err: "Decir «firme el contrato». Esas palabras despiertan el miedo.",
  mc: [
    ["¿Qué palabras evitas al cerrar?", ["Autorización", "Contrato y firma", "Visto bueno"], 1, "Suenan a compromiso legal y a riesgo."],
    ["¿Qué haces justo después de pedir la autorización?", ["Sigo hablando de beneficios", "Entrego la pluma y guardo silencio", "Ofrezco un descuento"], 1, "El silencio hace el resto."]
  ],
  resp: [{ ctx: "El pedido ya está lleno y el cliente está de acuerdo en todo. Pide la autorización.", m: "Perfecto. Si me autoriza aquí, yo me encargo de todo lo demás y mañana mismo empezamos.", c: "Pide «autorización» o «visto bueno», no «firma de contrato», y dice qué pasará enseguida." }] },

{ id: "perdida", u: 4, n: "Venta perdida", src: "Brian Tracy", k: "tracy",
  idea: "Cuando todo parece perdido, te despides de verdad. Ya de salida, con la tensión abajo, preguntas con humildad qué fue lo que lo detuvo. Muchas veces ahí aparece la objeción real y puedes volver a sentarte.",
  f: ["Acepta el no y recoge tus cosas.", "En la puerta: «Sólo para aprender, ¿cuál fue la verdadera razón?».", "Si la dice: «Fue mi culpa, eso no lo expliqué bien». Regresa y resuélvela."],
  fr: ["Antes de irme, sólo para aprender: ¿cuál fue la verdadera razón por la que no se decidió?"],
  err: "Usarlo como truco agresivo. Funciona porque de verdad bajas la presión.",
  mc: [
    ["¿En qué momento se usa?", ["Al principio de la cita", "Cuando ya aceptaste el no y te estás yendo", "Antes de dar el precio"], 1, "Sin presión, el cliente dice la verdad."],
    ["El cliente contesta: «Pensé que la mensualidad era muy alta». ¿Qué haces?", ["Agradezco y me voy", "Asumo la culpa por no explicarlo bien y resuelvo ese punto", "Le digo que está equivocado"], 1, "Ya tienes la objeción real. Trabájala."]
  ],
  resp: [{ ctx: "El cliente dijo que no por tercera vez. Ya guardaste todo y estás en la puerta.", m: "Le agradezco mucho su tiempo. Antes de irme, sólo para aprender y mejorar: ¿cuál fue la verdadera razón por la que no se decidió?", c: "Agradece, baja la presión y pregunta con humildad por la razón real." }] },

/* ───────── U6 · Objeciones ───────── */
{ id: "obj-metodo", u: 5, n: "Cómo se recibe una objeción", src: "Brian Tracy", k: "obj", tags: "objecion objeciones responder discutir malas experiencias desconfianza",
  idea: "Una objeción no es un rechazo: es una pregunta mal vestida. Tracy enseña a tratarla como una petición de más información y a notar que casi todas caben en unas seis categorías que puedes preparar de antemano. Nunca discutas: escucha completo, haz una pausa, pregunta y luego responde.",
  f: ["Escucha hasta el final, sin interrumpir.", "Haz una pausa de dos o tres segundos.", "Aclara: «¿A qué se refiere exactamente?».", "Responde: «Entiendo cómo se siente; otros sintieron lo mismo, y esto fue lo que descubrieron»."],
  fr: ["Entiendo cómo se siente. Otros clientes sintieron lo mismo, y esto fue lo que descubrieron."],
  err: "Contestar rápido y a la defensiva. Ganas la discusión y pierdes la venta.",
  mc: [
    ["¿Qué es una objeción, según Tracy?", ["Un rechazo definitivo", "Una petición de más información", "Una falta de respeto"], 1, "El que objeta está interesado; el que no, ni pregunta."],
    ["¿Qué haces primero cuando llega una objeción?", ["Contesto de inmediato", "Escucho completo y hago una pausa", "Cambio de tema"], 1, "La pausa muestra que lo tomaste en serio."]
  ],
  resp: [{ cl: "He tenido malas experiencias con empresas como la suya.", m: "Entiendo cómo se siente, y otros clientes sintieron lo mismo antes de trabajar con nosotros. ¿Qué fue exactamente lo que le pasó? Así le digo con honestidad cómo lo manejamos aquí.", c: "Muestra empatía y pregunta para aclarar, sin discutir ni defenderse." }] },

{ id: "obj-caro", u: 5, n: "«Está muy caro»", src: "Tracy y Dey", k: "obj", tags: "caro precio costoso carisimo mucho dinero descuento barato competencia mas barato",
  idea: "Precio y costo no son lo mismo. Cuando alguien dice «está caro», primero averigua comparado con qué. Después reduce la diferencia a lo mínimo: lo que parece mucho de golpe es poco por día.",
  f: ["«¿Caro comparado con qué?» o «¿Cuánto es demasiado?».", "Aísla la diferencia, no el total.", "Divídela por el tiempo de uso: por mes, por día.", "Compárala con algo cotidiano y cierra con doble alternativa."],
  fr: ["¿Caro comparado con qué?", "Estamos hablando de menos de lo que cuesta un café al día."],
  err: "Bajar el precio de inmediato. Le enseñas al cliente que tu primer precio no era en serio.",
  mc: [
    ["Cliente: «Está muy caro». ¿Cuál es tu primera respuesta?", ["«Le hago un descuento»", "«¿Caro comparado con qué?»", "«No es caro»"], 1, "Primero entiende contra qué está comparando."],
    ["La diferencia con la competencia es de $3,650 al año. ¿Cómo la presentas?", ["Como $3,650", "Como $10 al día", "No la menciono"], 1, "Reducida a lo mínimo, la diferencia deja de asustar."]
  ],
  resp: [{ cl: "Me gusta, pero se me hace muy caro.", m: "Lo entiendo. ¿Caro comparado con qué? Mire, la diferencia son como diez pesos al día, menos que un café, por tener la garantía completa. ¿Lo dejamos en el plan mensual o en el anual?", c: "Pregunta comparado con qué o aísla la diferencia, la reduce a una cifra pequeña y vuelve a cerrar; no ofrece descuento de entrada." }] },

{ id: "obj-pensar", u: 5, n: "«Lo voy a pensar»", src: "Tracy y Dey", k: "obj", tags: "pensar pensarlo voy a pensar luego despues le aviso le llamo unos dias",
  idea: "Para Tracy, «lo voy a pensar» es una despedida educada: quien se va a pensarlo rara vez regresa. Para Dey, es la señal de usar el proceso de eliminación. Los dos coinciden: hay que encontrar la razón real antes de que el cliente se levante.",
  f: ["Acepta sin pelear: «Es buena idea pensarlo bien».", "Pregunta la razón: «Evidentemente tiene una buena razón. ¿Puedo preguntarle cuál es?».", "Si no sale: «¿Es el dinero?».", "Resuelve esa única razón y cierra."],
  fr: ["Evidentemente tiene una buena razón para querer pensarlo. ¿Puedo preguntarle cuál es?"],
  err: "Creer que va a regresar. Dale dentro de la cita todo lo que necesita para decidir dentro de la cita.",
  mc: [
    ["¿Qué significa casi siempre «lo voy a pensar»?", ["Que ya decidió comprar", "Que hay una duda que no ha dicho", "Que necesita un folleto"], 1, "Hay algo que no te dijo. Encuéntralo."],
    ["¿Qué pregunta saca la razón real cuando el cliente no la dice?", ["«¿Es el dinero?»", "«¿Cuándo le llamo?»", "«¿Le dejo mi tarjeta?»"], 0, "Casi siempre es eso, y casi nadie lo dice primero."]
  ],
  resp: [{ cl: "Suena bien, déjeme pensarlo unos días.", m: "Claro, es una decisión que vale la pena pensar bien. Evidentemente tiene una buena razón para querer pensarlo; ¿puedo preguntarle cuál es? ¿Es la inversión?", c: "Acepta primero, pregunta por la razón y sondea si es el dinero; no se despide ni deja la tarjeta." }] },

{ id: "obj-consultar", u: 5, n: "«Lo tengo que consultar»", src: "Tracy y Dey", k: "obj", tags: "consultar esposa esposo marido mujer socio pareja jefe platicar preguntarle",
  idea: "Puede ser verdad o puede ser un escudo. Primero separa una cosa de la otra: si dependiera sólo de él, ¿lo tomaría? Si dice que sí, ya tienes un aliado y tu trabajo es conseguir la cita con los dos. Nunca dejes que tu cliente presente por ti.",
  f: ["«Si dependiera sólo de usted, ¿lo tomaría?»", "Si duda, la objeción es suya y no de la esposa o el socio. Trátala.", "Si dice que sí, agenda con ambos usando doble alternativa.", "Ofrece estar presente para resolver las dudas."],
  fr: ["Si dependiera solamente de usted, ¿lo tomaría hoy?", "¿Los veo a los dos mañana en la tarde o el sábado en la mañana?"],
  err: "Decir «claro, coméntelo y me avisa». Él no sabe vender tu producto.",
  mc: [
    ["Cliente: «Tengo que consultarlo con mi esposa». ¿Cuál es tu primera pregunta?", ["«¿Y ella por qué decide?»", "«Si dependiera sólo de usted, ¿lo tomaría?»", "«¿Le dejo un folleto?»"], 1, "Así sabes si es consulta real o escudo."],
    ["Dice que sí lo tomaría. ¿Cuál es el siguiente paso?", ["Esperar su llamada", "Agendar una cita con los dos", "Mandar la información por correo"], 1, "Tú presentas; él te apoya."]
  ],
  resp: [{ cl: "Me interesa, pero lo tengo que platicar con mi socio.", m: "Me parece lo correcto. Dígame, si dependiera solamente de usted, ¿lo tomaría? Perfecto. Entonces, para que su socio tenga la información completa, ¿los veo a los dos mañana a las diez o el jueves en la tarde?", c: "Pregunta si lo tomaría por su cuenta y propone una cita con ambos con dos opciones." }] },

{ id: "obj-proveedor", u: 5, n: "«Ya le compro a un conocido»", src: "Alex Dey", k: "obj", tags: "ya tengo proveedor conocido cunado amigo familiar otra empresa ya compro lealtad zapato",
  idea: "La lealtad es respetable y no se ataca. En el material de Alex Dey esto se trabaja con «el zapato en su pie»: invitas al cliente a cambiar de lugar y ver la situación desde otros zapatos. El objetivo no siempre es vender hoy; a veces es quedar abierto para el siguiente ciclo.",
  nota: "El nombre y el uso de este cierre vienen del material de Alex Dey. El guion de ejemplo fue redactado para esta app.",
  f: ["Reconoce la lealtad: «Eso habla muy bien de usted».", "Cambia los zapatos: «Si usted fuera su proveedor, ¿querría que su cliente se perdiera de algo mejor por compromiso?».", "Pide sólo comparar, no cambiar.", "Si no es hoy, deja fecha: «¿Cuándo vence su contrato actual?»."],
  fr: ["No le pido que cambie, sólo que compare."],
  err: "Hablar mal del proveedor actual. Estás criticando una decisión del cliente.",
  mc: [
    ["¿Qué haces primero ante «ya le compro a mi cuñado»?", ["Criticar al cuñado", "Reconocer la lealtad", "Bajar el precio"], 1, "Atacar su decisión es atacarlo a él."],
    ["No logras la venta hoy. ¿Qué te llevas de todos modos?", ["Nada", "La fecha en que vence su contrato actual, y referidos", "Un compromiso de palabra"], 1, "Quedas abierto para el siguiente ciclo y sales con nombres."]
  ],
  resp: [{ cl: "Gracias, pero ya tengo mi póliza con mi cuñado.", m: "Qué bueno, eso habla muy bien de usted. Déjeme preguntarle algo: si usted estuviera en los zapatos de su cuñado, ¿querría que usted se perdiera de una mejor cobertura sólo por compromiso? No le pido que cambie, sólo que compare. ¿Cuándo vence su póliza actual?", c: "Respeta la lealtad, invita a cambiar de perspectiva (ponerse en otros zapatos), pide comparar y busca una fecha futura." }] },

{ id: "obj-dificil", u: 5, n: "«Es una decisión difícil»", src: "Alex Dey", k: "obj", tags: "decision dificil miedo equivocarme equivocar no estoy seguro inseguro dudas riesgo avion",
  idea: "Hay clientes que quieren comprar y aun así se congelan por miedo a equivocarse. El material de Alex Dey nombra para este momento el «cierre del avión»: una imagen que le quita el miedo sin empujarlo. La idea de fondo es que nadie decide con certeza total; se decide cuando lo esencial está revisado.",
  nota: "El nombre y el uso de este cierre vienen del material de Alex Dey. El guion de ejemplo fue redactado para esta app.",
  f: ["Valida: «Tiene razón, es una decisión importante».", "Usa la imagen: un piloto no espera el cielo perfecto en toda la ruta; despega cuando revisó lo esencial.", "Revisen juntos lo esencial: ¿le sirve?, ¿lo puede pagar?, ¿tiene garantía?", "Con las tres en sí: «Entonces ya puede despegar tranquilo»."],
  fr: ["Un piloto despega cuando ya revisó lo esencial."],
  err: "Meter prisa: «decídase ya». A este cliente la presión lo congela.",
  mc: [
    ["¿A qué cliente le sirve más este cierre?", ["Al colérico apurado", "Al flemático que teme equivocarse", "Al sanguíneo distraído"], 1, "Le quita el miedo sin empujarlo."],
    ["¿Qué revisas con él antes de «despegar»?", ["Que le sirve, que lo puede pagar y que tiene garantía", "Que firme rápido", "Que no pregunte más"], 0, "Con lo esencial revisado, decidir deja de dar miedo."]
  ],
  resp: [{ cl: "Es que es una decisión difícil, no me quiero equivocar.", m: "Tiene razón, es importante, y qué bueno que lo tome en serio. Mire, un piloto no espera el cielo perfecto en toda la ruta: despega cuando revisó lo esencial. Revisemos lo suyo: ¿le resuelve lo que necesita? ¿La mensualidad le queda cómoda? ¿Y tiene la garantía por escrito? Entonces ya puede despegar tranquilo.", c: "Valida el miedo sin presionar, usa una imagen o analogía que reduce el miedo a equivocarse y repasa los puntos esenciales." }] },

{ id: "obj-dinero", u: 5, n: "«Ahorita no tengo dinero»", src: "Brian Tracy", k: "obj", tags: "no tengo dinero ahorita no me alcanza presupuesto no puedo pagar sin dinero quincena",
  idea: "Primero distingue si no tiene el dinero o si no ve el valor. La pregunta de aislamiento que enseña Tracy lo resuelve: supongamos que eso no fuera problema, ¿habría algo más que lo detuviera? Si no hay nada más, el asunto ya no es si compra, sino cómo paga.",
  f: ["Aísla: «Supongamos que el dinero no fuera problema. ¿Habría alguna otra cosa que le impidiera decidirse hoy?».", "Si hay otra cosa, esa es la objeción real.", "Si no, arma el cómo: apartado, plazos, fecha de inicio.", "Cierra con doble alternativa sobre la forma de pago."],
  fr: ["Supongamos que el dinero no fuera problema. ¿Habría alguna otra cosa que le impidiera decidirse hoy?"],
  err: "Aceptar «no tengo dinero» como final sin aislarla.",
  mc: [
    ["¿Para qué sirve «supongamos que el dinero no fuera problema»?", ["Para saber si es la única objeción", "Para ofrecer un préstamo", "Para terminar la cita"], 0, "Aíslas la objeción antes de resolverla."],
    ["El cliente contesta: «No, sólo es el dinero». ¿Qué sigue?", ["Despedirte", "Trabajar el cómo: plazos, apartado, fecha", "Insistir en los beneficios"], 1, "Ya quiere; ayúdale a poder."]
  ],
  resp: [{ cl: "Sí me gusta, pero ahorita no tengo dinero.", m: "Lo entiendo perfectamente. Supongamos por un momento que el dinero no fuera problema: ¿habría alguna otra cosa que le impidiera decidirse hoy? Entonces veamos cómo acomodarlo: ¿le queda mejor empezar con un apartado pequeño o en mensualidades desde el día quince?", c: "Aísla la objeción («supongamos que no fuera problema…») y luego propone una forma de pago con opciones." }] },

/* ───────── U7 · Después del sí ───────── */
{ id: "ref-nombres", u: 6, n: "Pide los nombres", src: "Alex Dey", k: "post", tags: "referidos referido recomendados nombres recomendar conoce a alguien",
  idea: "Los treinta segundos después del cierre son los más rentables de la cita. El error es preguntar «¿conoce a alguien?»: la mente se queda en blanco. Dale cajones donde buscar: familia, trabajo, vecinos, alguien en su misma situación.",
  cuando: "Justo después del cierre o en la entrega. Nunca antes de cerrar.",
  f: ["Abre un cajón: «¿Hay alguien más en su familia que se pudiera beneficiar con esto?».", "Pide nombre y apellido.", "Abre otro cajón: trabajo, vecinos, compadres.", "Con cuatro cajones casi siempre salen tres nombres o más."],
  fr: ["¿Hay alguien más en su familia que se pudiera beneficiar con esto?", "¿Y en su trabajo? ¿Algún compañero con quien platique de estas cosas?"],
  err: "Pedir referidos antes de cerrar: suena a que con él ya te diste por vencido.",
  mc: [
    ["¿Cuál es la peor forma de pedir referidos?", ["«¿Conoce a alguien que le pueda interesar?»", "«¿Quién de sus hermanos tiene hijos pequeños?»", "«¿Y en su trabajo, algún compañero?»"], 0, "Es tan abierta que la mente se queda en blanco."],
    ["¿Cuándo se piden?", ["Antes de dar el precio", "Justo después del cierre o en la entrega", "Sólo si el cliente los ofrece"], 1, "Es el momento de mayor entusiasmo y confianza."],
    ["El cliente dice «no conozco a nadie». ¿Qué haces?", ["Insisto con la misma pregunta", "Le cambio de cajón con preguntas concretas", "Me voy"], 1, "Casi nunca es verdad: su mente se quedó en blanco."]
  ],
  resp: [{ ctx: "El cliente acaba de autorizar el pedido y está contento. Pide el primer referido.", m: "Déjeme preguntarle algo: ¿hay alguien más en su familia que se pudiera beneficiar con esto? ¿Cómo se llama? ¿Y su apellido?", c: "Pregunta por un grupo concreto (familia, trabajo, vecinos) en vez de «¿conoce a alguien?» y pide el nombre." }] },

{ id: "ref-cita", u: 6, n: "Que el cliente te abra la puerta", src: "Alex Dey", k: "post", tags: "referidos cita llamar tarjeta whatsapp mensaje recomendado testimonio audio",
  idea: "Un nombre no es una cita. El paso que casi nadie se atreve a pedir es que el propio cliente llame al referido. Si no puede, que firme tu tarjeta con el nombre arriba. Y cuando llegues con el referido: nombre de quien te recomendó, razón corta y doble alternativa.",
  f: ["«¿Sería tan amable de llamarle para ver si me puede atender hoy en la tarde o mañana?»", "Si no puede: su firma en el reverso de tu tarjeta y el nombre del referido.", "Con el referido: quién te manda, una razón positiva y dos opciones.", "Cuando el referido compre, avísale y agradécele a quien te recomendó."],
  fr: ["¿Sería tan amable de llamarle para ver si me puede atender hoy en la tarde o mañana en la mañana?"],
  err: "Terminar el mensaje al referido con «¿cuándo tiene tiempo?». Siempre dos opciones.",
  mc: [
    ["¿Qué pesa más al llegar con un referido?", ["Tu folleto", "La llamada o la tarjeta firmada de quien te recomendó", "Tu título"], 1, "Llegas con la mitad de la venta hecha."],
    ["¿Qué tres cosas lleva tu primer mensaje a un referido?", ["Precio, descuento y vigencia", "Quién te recomendó, una razón corta y positiva, y dos opciones de cita", "Tu currículum, tu empresa y tu teléfono"], 1, "Nombre al principio, doble alternativa al final."],
    ["El prospecto NO te compró. ¿Le pides referidos?", ["No, sería abusar", "Sí: «¿quién de las personas que conoce cree que sí lo necesita ahorita?»", "Sólo por correo"], 1, "Ya sabe qué ofreces y muchas veces te da un nombre con alivio."]
  ],
  resp: [{ ctx: "Escribe tu primer WhatsApp a Gabriel Méndez (nombre de ejemplo), referido por su cuñado Roberto Gómez.", m: "Buenas tardes, señor Méndez. Soy asesor de mi empresa. Su cuñado Roberto Gómez me pidió que me pusiera en contacto con usted porque acaba de tomar algo que le gustó mucho y quiso que usted también lo conociera. ¿Le queda mejor que platiquemos mañana en la mañana o el jueves en la tarde?", c: "Menciona al inicio quién lo recomendó, da una razón corta y positiva y termina con dos opciones de horario." }] },

{ id: "numeros", u: 6, n: "Mide tu juego", src: "Alex Dey", k: "post", lista: true, tags: "medir numeros agenda reporte grafica prospectos presentaciones metas productividad",
  idea: "Tu ingreso sale de tres números: a cuánta gente viste, a cuánta le presentaste y a cuánta le cerraste. Cuando uno se cae, tu comisión se cae con él. Si no los mides, sólo te queda trabajar más horas sin saber dónde se rompió la cadena.",
  f: ["Prospectos bajos: te falta volumen. Ningún cierre lo compensa.", "Prospectos altos y presentaciones bajas: falla la entrada o la precalificación.", "Presentaciones altas y cierres bajos: no estás pidiendo la venta. Pule tus cierres de prueba.", "Todo parejo y bajo: es actividad y actitud, no técnica."],
  fr: ["Planea tu trabajo y trabaja tu plan."],
  err: "Ponerte metas de dinero. Ponte metas de actividad, que son las que dependen de ti.",
  mc: [
    ["Viste a 30 personas y le presentaste a 4. ¿Dónde está la fuga?", ["En los cierres", "En la entrada: cómo abres o a quién ves", "En el precio"], 1, "Ves gente y no logras presentarle."],
    ["Presentaste 12 veces y cerraste 1. ¿Qué trabajas?", ["Prospección en frío", "Cierres de prueba y pedir la venta", "El saludo"], 1, "Presentas bien y no pides la venta."],
    ["¿Qué tipo de meta mensual conviene?", ["De dinero", "De actividad: prospectos, presentaciones y cierres", "De horas"], 1, "El dinero depende de mucha gente; la actividad, sólo de ti."]
  ],
  resp: [{ ctx: "Escribe el comentario de tu reporte diario para un cliente que se frenó en la mensualidad.", m: "Le interesa la cobertura educativa. Se frenó en la mensualidad. Próxima visita: probar el cierre por referencia.", c: "Anota la objeción concreta y qué cierre probar la próxima vez; no escribe sólo «interesado»." }] }
],
TIPOS: [
  { id: "sanguineo", n: "Sanguíneo", eje: "Rápido · gente", voz: "airy", persona: "Paco Rivas",
    senal: "Bromea, habla con las manos y en los primeros minutos te pregunta algo personal o te cuenta algo que no tiene que ver con la venta.",
    quiere: "Quedar bien, que lo admiren, ser el primero en tenerlo. Compra la experiencia.",
    presenta: "Con energía e historias. Nada de tablas. Mantén tú el control, porque la plática se le va sola.",
    cierres: ["insinua", "envolvente"], espanta: "Los detalles técnicos, las presentaciones largas y serias, el Benjamín Franklin.",
    riesgo: "Dice que sí con muchas ganas y luego no contesta el teléfono. Con él se cierra hoy.",
    rol: "Eres muy sociable y bromista. Te desvías del tema, cuentas anécdotas y te emocionas fácil, pero eres inconstante. Te importa cómo te van a ver los demás. Los números y los detalles técnicos te aburren." },
  { id: "colerico", n: "Colérico", eje: "Rápido · resultado", voz: "glassy", persona: "Marta Salinas",
    senal: "Te recibe de pie o te dice «tiene cinco minutos». Mira el reloj y te interrumpe para preguntar cuánto cuesta.",
    quiere: "El resultado, y ya: cuánto gana, cuánto tiempo ahorra, qué problema se quita. Compra control.",
    presenta: "Directo al grano, con tus tres mejores beneficios y nada más. Firme y sin chistes. Que sienta que decide él.",
    cierres: ["doble", "comprob"], espanta: "Perder tiempo, las historias, la inseguridad y las técnicas obvias.",
    riesgo: "Decide rápido y descarta rápido. Si en dos minutos no le diste un motivo, se acabó.",
    rol: "Vas con prisa. Eres directo y seco, interrumpes, preguntas el precio muy pronto y quieres resultados concretos. No toleras rodeos ni que te digan qué hacer. Si el vendedor titubea o se extiende, lo cortas." },
  { id: "flematico", n: "Flemático", eje: "Calma · números", voz: "rounded", persona: "Ernesto Luna",
    senal: "Tranquilo y analítico. Te ofrece café, saca la calculadora y pregunta por el interés, el plazo y la letra chiquita.",
    quiere: "Números claros, garantía y saber que a otros les fue bien. Compra tranquilidad.",
    presenta: "Con calma y en orden, con comparativos y garantía por escrito. Contesta todo sin desesperarte. No lo presiones.",
    cierres: ["franklin", "obj-dificil", "elimina"], espanta: "La prisa, la presión, el entusiasmo exagerado y las promesas sin respaldo.",
    riesgo: "Si lo dejas ir a pensarlo, lo piensa seis meses. Dale todo dentro de la cita.",
    rol: "Eres tranquilo y analítico. Preguntas por números, plazos, garantías y letra chiquita. Das pocas señales. La presión te congela y entonces dices que lo tienes que pensar. Sólo decides si te dan seguridad y datos claros." },
  { id: "melancolico", n: "Melancólico", eje: "Calma · sentimientos", voz: "buttery", persona: "Sofía Navarro",
    senal: "Sensible y detallista. Escucha con atención, te mira a los ojos y habla de su familia.",
    quiere: "Que beneficie a quienes quiere y poder confiar en ti. Antes del producto, te compra a ti.",
    presenta: "Con calidez y sinceridad. Pregunta por su familia y escucha de verdad. Dale tiempo.",
    cierres: ["doble", "insinua"], espanta: "La frialdad, la prisa, la manipulación y los cambios bruscos.",
    riesgo: "Le cuesta decir que no; a veces dice que sí por pena y luego se arrepiente.",
    rol: "Eres sensible, reservado y detallista. Te importan tu familia y poder confiar en la persona. Te cuesta decir que no de frente, te asustan los cambios bruscos y la frialdad. Compras si sientes sinceridad y un beneficio para los tuyos." }
]
};
