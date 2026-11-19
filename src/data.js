/* Contenido del curso. Redacción propia de la app a partir del material de Alex Dey
   (Los doce cierres de venta, La Biblia del Vendedor, Los 4 tipos de cliente, Cómo identificar
   la personalidad del prospecto, El poder de la palabra hablada, Guion de referidos, Agenda del
   vendedor millonario) y de los métodos de Brian Tracy (Psicología de ventas).
   k: base | dey | deyx | tracy | obj | post.  tag: técnica que el simulador detecta (tercer sello).
   mc: [pregunta, [opciones], índice correcto, explicación] */
window.DOJO = {
UNITS: [
  { t: "Cabeza de cerrador", d: "Antes de aprender frases, arregla lo que pasa en tu cabeza cuando vas a pedir la venta.", src: "Brian Tracy" },
  { t: "La venta profesional", d: "El ciclo de la venta, cómo se arma una presentación y las palabras que venden.", src: "Alex Dey · La Biblia del Vendedor" },
  { t: "Lee a tu cliente", d: "Cuatro tipos de persona, cuatro formas de comprar. Reconócelos en el primer minuto.", src: "Alex Dey" },
  { t: "Los 12 cierres · parte 1", d: "Del cierre por conclusión al envolvente: los cierres que vas usando durante toda la plática.", src: "Alex Dey · Los doce cierres" },
  { t: "Los 12 cierres · parte 2", d: "De la equivocación al Benjamín Franklin: los cierres para cuando el cliente se frena.", src: "Alex Dey · Los doce cierres" },
  { t: "Más cierres de Alex Dey", d: "Los cierres que recomienda para cada tipo de cliente en el intensivo Cierra Más.", src: "Alex Dey · Cierra Más" },
  { t: "Cierres de Brian Tracy", d: "Cinco cierres suaves y profesionales para rematar la presentación.", src: "Brian Tracy" },
  { t: "Objeciones: el método", d: "Cómo recibir cualquier objeción sin pelear y llevarla de vuelta al cierre.", src: "Alex Dey y Brian Tracy" },
  { t: "Objeciones comunes", d: "Las siete objeciones que más vas a escuchar y qué contestar a cada una.", src: "Alex Dey · La Biblia del Vendedor" },
  { t: "Después del sí", d: "Referidos y medición: lo que convierte una venta en una carrera.", src: "Alex Dey" }
],
LESSONS: [
/* ───────── U1 · Mentalidad ───────── */
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
  idea: "El rechazo es parte del oficio y casi nunca es personal: el cliente rechaza una oferta en un momento, no a ti. Alex Dey lo dice más fuerte: el vendedor que se desmorona a la primera objeción no sólo pierde él; pierde el cliente que se va sin lo que necesitaba.",
  f: ["Separa tu valor como persona del resultado de la cita.", "Después de un no, haz otra pregunta u otro cierre.", "Recuerda que el cliente también tiene miedo: a equivocarse."],
  fr: ["Entiendo. ¿Puedo preguntarle qué es lo que lo detiene?"],
  err: "Tomar el primer «no» como final y guardar tus cosas.",
  mc: [
    ["El cliente dice «no, gracias» en tu primer intento. ¿Qué significa casi siempre?", ["Que no le caíste bien", "Que todavía no ve suficiente razón para decidir", "Que nunca va a comprar"], 1, "Es un «todavía no». Tu trabajo es descubrir qué le falta."],
    ["¿Cuál es el miedo más grande del comprador?", ["Equivocarse o pagar de más", "Que el vendedor se enoje", "Quedarse sin opciones"], 0, "Por eso las garantías, los testimonios y la calma venden."]
  ],
  resp: [{ cl: "No, gracias, no me interesa.", m: "Lo entiendo, y no quiero quitarle tiempo. Sólo por curiosidad, ¿qué fue lo que no le convenció: el producto o el momento?", c: "No discute ni se rinde; hace una pregunta para descubrir la razón real." }] },

{ id: "emocion", u: 0, n: "Emoción primero, lógica después", src: "Brian Tracy", k: "base",
  idea: "La gente decide con la emoción y después lo justifica con la lógica. Tracy lo aterriza en dos motores: el deseo de ganar y el miedo a perder. Tu tarea es encontrar el botón caliente: el beneficio que más le importa a ese cliente en particular. Dey lo resume igual: no vendes el producto, vendes el beneficio.",
  f: ["Pregunta más de lo que hablas: el cliente debe hablar la mayor parte del tiempo.", "Detecta el beneficio que repite o que le cambia la cara. Ese es su botón.", "Presenta y cierra sobre ese beneficio, no sobre la lista completa."],
  fr: ["De todo lo que le mostré, ¿qué es lo más importante para usted?"],
  err: "Recitar todas las características. Cuando todo es importante, nada lo es.",
  mc: [
    ["¿Qué es el «botón caliente»?", ["El descuento máximo que puedes dar", "El beneficio que más le importa a este cliente", "La objeción más fuerte"], 1, "Una vez que lo encuentras, toda la venta gira alrededor de él."],
    ["Un cliente repite tres veces «lo que quiero es no preocuparme». ¿Sobre qué cierras?", ["Sobre el precio", "Sobre la tranquilidad que va a tener", "Sobre las especificaciones técnicas"], 1, "Te dijo su botón tres veces. Úsalo."]
  ],
  resp: [{ ctx: "Acabas de terminar tu presentación. Haz la pregunta que descubre el botón caliente del cliente.", m: "De todo lo que vimos, ¿qué es lo que más le importa a usted resolver?", c: "Es una pregunta abierta que busca el beneficio principal; no ofrece descuento ni repite características." }] },

/* ───────── U2 · La venta profesional (Biblia del Vendedor) ───────── */
{ id: "ciclo", u: 1, n: "El ciclo de la venta", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "Para Alex Dey, vender se domina con tres artes: prospectar, presentar y cerrar. Dentro de cada venta hay cinco pasos que siempre van en el mismo orden, y cada uno te lleva al siguiente. El paso que más se olvida es el último: pedir referencias, que además refuerza la venta que acabas de hacer.",
  f: ["Prospectar: encontrar a quién venderle, todos los días.", "Precalificar: confirmar que sí lo necesita y sí lo puede comprar.", "Presentar: mostrar beneficios, no características.", "Cerrar: pedir la decisión.", "Referencias: pedir nombres justo después del cierre."],
  fr: ["Prospectar, precalificar, presentar, cerrar y pedir referencias."],
  err: "Emocionarte tanto con el cierre que te vas sin pedir referencias.",
  lista: false,
  mc: [
    ["¿Qué paso va entre prospectar y presentar?", ["Cerrar", "Precalificar", "Pedir referencias"], 1, "Precalificar evita que pierdas tiempo con quien no puede comprar."],
    ["¿Por qué pedir referencias refuerza la venta?", ["Porque el cliente se siente obligado", "Porque al recomendarte se convence de que decidió bien", "Porque así no cancela el pago"], 1, "El cliente que te da nombres es un cliente que no se arrepiente."]
  ],
  resp: [{ ctx: "Un compañero nuevo te pregunta en qué consiste vender. Explícale el ciclo en una o dos frases.", m: "Son cinco pasos en orden: prospectar, precalificar, presentar, cerrar y pedir referencias. Si te saltas uno, el siguiente se cae.", c: "Menciona los cinco pasos (o la mayoría) en orden e incluye pedir referencias." }] },

{ id: "presentacion", u: 1, n: "La presentación que vende", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "Dey dice que el cierre empieza en el momento en que empieza la presentación. Una buena presentación es una plática corta y lógica con cinco ingredientes: atención, interés, deseo, convicción y cierre. Recomienda que no dure más de unos 17 minutos y que nunca sea técnica, salvo con un técnico.",
  f: ["Atención: una pregunta que toque su necesidad.", "Interés: lo nuevo, lo mejor, lo único.", "Deseo: los beneficios para él.", "Convicción: casos, testimonios, nombres.", "Cierre: repasa lo más importante con otras palabras y da por hecho que ya compró."],
  fr: ["¿Le gustaría tener la educación de sus hijos asegurada?"],
  err: "Hablar 45 minutos de especificaciones y olvidar decir qué gana el cliente.",
  mc: [
    ["¿Cuál es el orden de una presentación según Dey?", ["Precio, beneficios, cierre", "Atención, interés, deseo, convicción, cierre", "Saludo, chiste, catálogo"], 1, "Cada paso depende del anterior; no te saltes ninguno."],
    ["¿Qué ingrediente usa casos, testimonios y nombres?", ["Atención", "Convicción", "Interés"], 1, "La convicción viene de ver que a otros les funcionó."]
  ],
  resp: [{ ctx: "Vas a abrir tu presentación. Di tu frase de atención: una pregunta que toque la necesidad del cliente.", m: "¿Le gustaría dejar de preocuparse por lo que pase con su familia si un día usted falta?", c: "Es una pregunta que despierta la atención tocando un beneficio o una necesidad; no empieza con el precio ni con datos técnicos." }] },

{ id: "palabras", u: 1, n: "Palabras que venden", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "Cada palabra vende o espanta. Dey propone cambiar las palabras que suenan a riesgo por palabras que suenan a beneficio. Firmar asusta; aprobar no. Precio duele; inversión no. Contrato pesa; acuerdo no.",
  f: ["No es firmar: es aprobar o autorizar.", "No es el precio: es la inversión.", "No es el pago mensual: es la inversión mensual.", "No es el contrato: es el acuerdo.", "No es cuando compre: es cuando sea dueño."],
  fr: ["Con su aprobación aquí, mañana ya es dueño."],
  err: "Decir «firme aquí el contrato y haga el pago». Son tres palabras prohibidas en una frase.",
  mc: [
    ["¿Qué palabra conviene en lugar de «precio»?", ["Costo", "Inversión", "Cargo"], 1, "Inversión sugiere que algo regresa."],
    ["¿Cuál frase suena mejor al cerrar?", ["Firme el contrato aquí", "Si me da su aprobación aquí, empezamos mañana", "Haga su pago y ya"], 1, "Aprobación y empezar suenan a beneficio, no a obligación."]
  ],
  resp: [{ ctx: "Reescribe esta frase con palabras que venden: «Firme el contrato y haga el primer pago».", m: "Con su aprobación aquí dejamos listo el acuerdo, y con la inversión inicial mañana ya es dueño.", c: "Cambia firmar por aprobar o autorizar, contrato por acuerdo y pago por inversión." }] },

{ id: "precio", u: 1, n: "El precio en su momento", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "El valor debe justificar el precio. Si el cliente pregunta cuánto cuesta antes de ver el valor, Dey recomienda posponerlo sin que parezca que lo escondes, o contestar con una pregunta que te devuelva el control.",
  f: ["«Con mucho gusto le digo el precio en un momento. ¿Me permite llegar ahí?»", "«Depende del modelo y de la forma de pago. Por ejemplo, éste tiene…»", "O contesta con una pregunta: «¿Éste es el que mejor resuelve lo que necesita?»"],
  fr: ["Con mucho gusto le digo el precio en un momento."],
  err: "Soltar el precio en frío antes de mostrar un solo beneficio.",
  mc: [
    ["El cliente pregunta el precio en el primer minuto. ¿Qué haces?", ["Lo digo de inmediato y espero", "Lo pospongo con amabilidad y sigo con los beneficios", "Le digo que eso no importa"], 1, "Primero el valor, luego el precio."],
    ["¿Qué debe pasar antes de decir el precio?", ["Que el cliente vea el valor", "Que el cliente insista tres veces", "Nada, el precio va primero"], 0, "El precio sin valor siempre se siente caro."]
  ],
  resp: [{ cl: "Antes de que me explique nada, ¿cuánto cuesta?", m: "Con mucho gusto se lo digo en un momento; depende de lo que usted necesite. Para darle el número correcto, ¿esto lo quiere para usted o para toda su familia?", c: "Pospone el precio con amabilidad, sin esconderlo, y regresa el control con una pregunta." }] },

{ id: "voz", u: 1, n: "La voz en forma de N", src: "Alex Dey · El poder de la palabra hablada", k: "base",
  idea: "Dey dice que no importa sólo qué dices, sino cómo lo entregas. Su técnica es la N: empiezas tranquilo y sereno, vas subiendo la voz y la energía, bajas para tocar las emociones suaves (la familia, los hijos) y vuelves a subir para cerrar. Si hablas siempre igual, alto o bajo, aburres.",
  f: ["Arranca sereno, con voz baja y moderada.", "Sube el tono poco a poco mientras explicas los beneficios.", "Baja la voz y ve más lento en los momentos emocionales.", "Vuelve a subir para el cierre.", "Acompaña la voz con el cuerpo: una pausa, un gesto, un paso."],
  fr: ["Estar nervioso es normal; que se te note es mortal."],
  err: "Hablar todo el tiempo con el mismo tono entusiasta, como comercial de radio.",
  mc: [
    ["¿Qué significa la N de Dey?", ["Hablar siempre alto", "Subir, bajar para tocar emociones y volver a subir", "Hablar siempre bajo"], 1, "La voz que sube y baja mantiene la atención."],
    ["¿Cuándo bajas la voz?", ["Al decir el precio", "En los momentos emocionales, como hablar de la familia", "Nunca"], 1, "La voz baja da peso a lo importante."]
  ],
  resp: [{ ctx: "Llegas a la parte emocional de tu presentación. Escribe la frase que dirías bajando la voz.", m: "Piense en sus hijos dentro de diez años… en la tranquilidad de saber que, pase lo que pase, ellos van a estar bien.", c: "Toca una emoción suave (familia, tranquilidad, futuro) con frases pausadas y cortas." }] },

/* ───────── U3 · Lee a tu cliente ───────── */
{ id: "tipos", u: 2, n: "Las dos preguntas", src: "Alex Dey · Los 4 tipos de cliente", k: "base", lista: true,
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

{ id: "tipos-cierre", u: 2, n: "Un cierre para cada tipo", src: "Alex Dey · Los 4 tipos de cliente", k: "base", lista: true,
  idea: "El mismo cierre gana con uno y pierde con otro. Al sanguíneo le funcionan las imágenes y el futuro; al colérico, opciones rápidas y pruebas; al flemático, números ordenados y cero presión; al melancólico, sus seres queridos y la confianza.",
  f: ["Sanguíneo: insinuaciones y envolvente. Cierra hoy, mañana ya se enfrió.", "Colérico: doble alternativa y comprobación. Corto y firme.", "Flemático: Benjamín Franklin, avión y proceso de eliminación. Sin prisa.", "Melancólico: doble alternativa con sus seres queridos e insinuaciones emocionales."],
  fr: ["¿Lo registramos a nombre suyo o de la empresa?"],
  err: "Usar el Benjamín Franklin con un sanguíneo, que lo siente como tarea de escuela. O meterle prisa a un flemático: la presión lo congela.",
  mc: [
    ["¿Qué cierre evitas con un sanguíneo?", ["Insinuaciones", "Benjamín Franklin", "Envolvente"], 1, "Las listas y los números lo aburren."],
    ["Un flemático dice «lo tengo que pensar». ¿Qué te conviene?", ["Decirle que la oferta vence hoy", "Proceso de eliminación, con calma", "Contarle un chiste"], 1, "Si lo dejas ir a pensarlo, lo piensa seis meses."],
    ["¿Cuál es el riesgo con el melancólico?", ["Que te descarte en dos minutos", "Que diga que sí por pena y luego se arrepienta", "Que se aburra con los números"], 1, "Asegúrate de que esté convencido de verdad antes de firmar."]
  ],
  resp: [{ ctx: "Cliente melancólico, padre de familia, duda en silencio. Haz una doble alternativa que toque a sus seres queridos.", m: "¿Incluimos a sus hijos como beneficiarios o solamente a su esposa?", c: "Es una doble alternativa (dos opciones y ambas son un sí) y menciona a la familia." }] },

{ id: "espejo", u: 2, n: "El espejo", src: "Alex Dey · Cómo identificar la personalidad del prospecto", k: "base",
  idea: "Dey enseña a observar cómo se sienta el prospecto, dónde pone los brazos, cómo habla y si sostiene la mirada, y a imitarlo con discreción. Cuando te pareces a él, se identifica contigo y confía. Con el acelerado, recuerda los beneficios rápido al final; con el lento, ve a detalle y con números; con el que da cátedra, sé diplomático pero con autoridad para recuperar la palabra.",
  f: ["Observa postura, brazos, ritmo de voz y mirada.", "Imita con discreción su postura y su ritmo.", "Acelerado: beneficios rápidos al cerrar.", "Lento: detalles y números.", "Catedrático: escúchalo, y con diplomacia recupera la palabra."],
  fr: ["Le hablo a cada persona en su propio idioma."],
  err: "Imitar de forma tan obvia que parezca burla.",
  mc: [
    ["¿Para qué sirve imitar con discreción la postura del prospecto?", ["Para burlarte de él", "Para que se identifique contigo y confíe", "Para cansarlo"], 1, "La gente confía en quien se le parece."],
    ["Tu prospecto habla y habla, como dando clase. ¿Qué haces?", ["Lo dejo hablar toda la cita", "Lo escucho y con diplomacia recupero la palabra", "Lo interrumpo de golpe"], 1, "Diplomacia, pero con autoridad."]
  ],
  resp: [{ ctx: "Tu prospecto lleva diez minutos hablando de su experiencia. Recupera la palabra con diplomacia.", m: "Qué interesante lo que me cuenta, se nota que sabe del tema. Justo por eso le va a gustar esto: déjeme mostrarle algo en dos minutos.", c: "Reconoce lo que dijo el prospecto y recupera la conversación con amabilidad, llevándola de vuelta al producto." }] },

/* ───────── U4 · Los 12 cierres de Alex Dey · parte 1 ───────── */
{ id: "conclusion", u: 3, num: 1, n: "Por conclusión", src: "Alex Dey · Los doce cierres", k: "dey",
  idea: "El primer cierre es para ti, no para el cliente. Antes de hablar con el prospecto llegas a la conclusión de que sí lo quiere, y te lo repites: «sí lo quiere, sí lo quiere». Con esa certeza das lo mejor de ti y presentas dando por hecho que va a comprar.",
  cuando: "Antes de cada cita y durante toda la presentación.",
  f: ["Véndete primero a ti: tú tienes que creer en tu producto.", "Antes de entrar, repite: «sí lo quiere, sí lo quiere».", "Presenta dando por hecho que ya compró, sin esperar aprobación."],
  fr: ["Sí lo quiere, sí lo quiere, sí lo quiere."],
  err: "Entrar pensando «a ver si me compra». El cliente compra tu certeza o tu duda.",
  mc: [
    ["¿A quién le aplicas primero el cierre por conclusión?", ["Al cliente", "A ti mismo", "Al gerente"], 1, "Primero tienes que venderte tú."],
    ["¿Qué te repites antes de la cita?", ["«Ojalá me compre»", "«Sí lo quiere, sí lo quiere»", "«No pasa nada si no compra»"], 1, "Esa certeza se nota en cómo presentas."]
  ],
  resp: [{ ctx: "Estás en el carro, a punto de entrar a la cita. Escribe lo que te dices para aplicar el cierre por conclusión.", m: "Sí lo quiere, sí lo quiere. Esta persona necesita lo que traigo y hoy se lo voy a dejar.", c: "Es una afirmación positiva que da por hecho que el cliente quiere el producto." }] },

{ id: "doble", u: 3, num: 2, n: "Doble alternativa", src: "Alex Dey · Los doce cierres", k: "dey", tag: "doble",
  idea: "Le das al prospecto dos opciones y que elija entre A y B. Elegir entre dos es fácil; decir sí o no, no. Dey agrega: si tú no le das opciones, el cliente las va a buscar en la competencia. Sirve para la cita, para el paquete y para el cierre.",
  cuando: "Para pedir la cita, para elegir paquete, entrega o forma de pago, y para cerrar.",
  f: ["Da por hecho el sí.", "Ofrece dos opciones concretas.", "Calla y deja que escoja."],
  fr: ["¿Le parece bien el jueves o el viernes?", "¿Por la mañana o por la tarde?", "¿Prefiere el paquete A o el paquete B?"],
  err: "Preguntar «¿cuándo tiene tiempo?» o «¿le interesa?». Las dos se contestan con un no.",
  mc: [
    ["¿Cuál es una doble alternativa?", ["¿Le gustaría agendar una cita?", "¿Nos vemos el jueves o el viernes?", "¿Cuándo tiene tiempo?"], 1, "Dos opciones y las dos son un avance."],
    ["Según Dey, ¿qué pasa si no le das opciones al cliente?", ["Compra más rápido", "Las va a buscar en la competencia", "No pasa nada"], 1, "Mejor que elija entre tus opciones."]
  ],
  resp: [
    { cl: "Venga a visitarme uno de estos días.", m: "Con gusto. ¿Le parece bien el jueves o el viernes? ¿Por la mañana o por la tarde?", c: "Convierte la invitación vaga en una cita ofreciendo dos opciones de día u hora." },
    { cl: "Sí me gusta, se ve bien.", m: "Qué bueno. ¿Lo quiere empezar este mes o prefiere arrancar el día primero?", c: "Ofrece dos opciones y las dos implican compra; no hace una pregunta de sí o no." }
  ] },

{ id: "amarre", u: 3, num: 3, n: "Amarre", src: "Alex Dey · Los doce cierres", k: "dey", tag: "amarre",
  idea: "Terminas cada idea con una pregunta corta que pide un sí: «¿verdad?», «¿no le parece?», «¿no es cierto?». Cada vez que el prospecto asiente se va preparando para el cierre. Después de cada amarre te callas y dejas que asienta.",
  f: ["Di una verdad que el cliente va a aceptar.", "Ciérrala con el amarre: ¿verdad?, ¿no cree?, ¿no le parece?", "Calla y espera que asienta."],
  fr: ["Un auto hoy no es un lujo sino una necesidad, ¿no le parece?", "Tomar buenas decisiones para nuestros hijos es necesario, ¿verdad?"],
  err: "Amarrar cada frase. Tres seguidos y suena a truco.",
  mc: [
    ["¿Dónde va el amarre?", ["Al final de la idea", "Antes de saludar", "Sólo en el contrato"], 0, "El amarre normal va al final; el invertido, al principio."],
    ["¿Qué haces después de un amarre?", ["Sigo hablando", "Me callo y dejo que asienta", "Repito la pregunta"], 1, "El primero que habla pierde."]
  ],
  resp: [{ cl: "Lo que más me importa es que dure.", m: "Y un producto con cinco años de garantía le da esa tranquilidad, ¿no es cierto?", c: "Retoma lo que dijo el cliente y termina con una coletilla de confirmación (¿verdad?, ¿no cree?, ¿no es cierto?)." }] },

{ id: "amarre-inv", u: 3, num: 4, n: "Amarre invertido", src: "Alex Dey · Los doce cierres", k: "dey", tag: "amarreinv",
  idea: "Es el mismo amarre, pero la pregunta va al principio: «¿Verdad que…?», «¿No le parece que…?». Sirve para variar la presentación, que no suene monótona y que el prospecto no se sienta acorralado. Acompáñalo con buena modulación y lenguaje corporal.",
  f: ["Empieza con «¿Verdad que…?» o «¿No le parece que…?».", "Completa con el beneficio.", "Alterna con el amarre normal."],
  fr: ["¿Verdad que estar protegido es una buena decisión?", "¿No le parece que unos días de descanso son algo que se merece?"],
  err: "Usar siempre la misma coletilla. Alterna posición y palabras.",
  mc: [
    ["¿Cuál es un amarre invertido?", ["Es importante cuidar el gasto, ¿verdad?", "¿Verdad que es importante cuidar el gasto?", "¿Lo quiere en rojo o en azul?"], 1, "La pregunta va al principio."],
    ["¿Para qué sirve invertir el amarre?", ["Para variar y no sonar monótono", "Para cobrar más", "Para terminar la cita"], 0, "La variedad evita que el cliente se sienta acorralado."]
  ],
  resp: [{ ctx: "Vendes cursos para emprendedores. Haz un amarre invertido.", m: "¿No le parece que aprender de quien ya lo logró le ahorra años de errores?", c: "Empieza con la pregunta de confirmación (¿verdad que…?, ¿no le parece que…?) y después el beneficio." }] },

{ id: "puerco", u: 3, num: 5, n: "Puercoespín", src: "Alex Dey · Los doce cierres", k: "dey", tag: "puerco",
  idea: "Contestas una pregunta del prospecto con otra pregunta. Dey explica que el que pregunta es el que tiene el control, y que preguntando entiendes mejor qué quiere. Sirve con preguntas de interés y también con objeciones: «¿Caro respecto de qué?».",
  f: ["Escucha la pregunta del cliente.", "Regrésala con una pregunta: «¿Lo quiere…?», «¿Caro respecto de qué?».", "Su respuesta te da información o ya es un sí."],
  fr: ["¿Caro respecto de qué?", "¿Lo quiere en color azul?", "¿Éste es el que mejor resuelve lo que necesita?"],
  err: "Contestar «sí, sí lo tenemos» y seguir explicando. Regalaste un cierre.",
  mc: [
    ["Cliente: «¿Lo tienen en azul?». ¿Cuál es la respuesta puercoespín?", ["Sí, claro, en azul y en gris", "¿Lo quiere en azul?", "Déjeme revisar el inventario"], 1, "Si contesta «sí», ya dijo que lo quiere."],
    ["Cliente: «¿No le parece muy caro?». ¿Qué contestas?", ["No, no es caro", "¿Caro respecto de qué?", "Le hago un descuento"], 1, "Su respuesta te dice contra qué está comparando."]
  ],
  resp: [
    { cl: "¿Me lo pueden entregar este viernes?", m: "¿Le gustaría recibirlo este viernes?", c: "Devuelve la pregunta con otra pregunta que confirma el deseo; no contesta sólo «sí»." },
    { cl: "¿No le parece que su producto es muy caro?", m: "¿Caro respecto de qué, señor? ¿Lo está comparando con otra opción?", c: "Contesta con una pregunta que descubre contra qué compara el cliente." }
  ] },

{ id: "envolvente", u: 3, num: 6, n: "Envolvente", src: "Alex Dey · Los doce cierres", k: "dey", tag: "envolvente",
  idea: "Envuelves al cliente antes de que compre con preguntas sobre los detalles de la compra, como si ya estuviera hecha. Para contestar, el cliente tiene que imaginarse dueño. Funciona de maravilla con el sanguíneo, que vive en el futuro.",
  f: ["Habla como si ya lo tuviera.", "Pregunta por un detalle: a nombre de quién, para cuándo, quién lo va a usar.", "Si contesta el detalle, ya compró en su mente."],
  fr: ["¿La factura va a su nombre o al de la empresa?", "¿Para cuándo quiere el pedido?", "¿A quién va a ser el primero en enseñárselo?"],
  err: "Usar un condicional débil: «si lo llegara a comprar…». Habla en futuro seguro.",
  mc: [
    ["¿Cuál es un cierre envolvente?", ["¿La factura va a su nombre o al de la empresa?", "¿Verdad que es bonito?", "¿Le interesa?"], 0, "Para contestar tiene que verse como dueño."],
    ["¿Con qué tipo de cliente brilla más?", ["Sanguíneo, que vive en el futuro", "Flemático, que quiere números", "Con ninguno"], 0, "El sanguíneo se imagina presumiéndolo."]
  ],
  resp: [{ ctx: "Vendes un curso en línea.", cl: "Se ve interesante.", m: "¿Lo va a tomar usted sola o también lo va a usar su equipo?", c: "Pregunta por un detalle de uso o de la compra dando por hecho que ya es suyo." }] },

/* ───────── U5 · Los 12 cierres de Alex Dey · parte 2 ───────── */
{ id: "equivoc", u: 4, num: 7, n: "Por equivocación", src: "Alex Dey · Los doce cierres", k: "dey",
  idea: "Te equivocas a propósito en un detalle para saber si el prospecto está listo. Si te corrige, ya compró: nadie corrige los detalles de algo que no piensa tomar. El ejemplo de Dey: «Entonces los beneficiarios van a ser su mamá y su hermano». «No, ponga a mi esposa y a mi hijo».",
  f: ["Escoge un dato que el cliente ya mencionó: beneficiarios, fecha, color, cantidad.", "Repítelo mal, con naturalidad.", "Cuando te corrija, anótalo: «Perfecto, su esposa y su hijo»."],
  fr: ["Entonces los beneficiarios van a ser su mamá y su hermano."],
  err: "Equivocarte en algo serio como el precio. Sólo en detalles pequeños.",
  mc: [
    ["Dices «los beneficiarios serán su mamá y su hermano» y el cliente responde «no, mi esposa y mi hijo». ¿Qué pasó?", ["Perdiste credibilidad", "Confirmó la compra al corregir el detalle", "Nada"], 1, "Corregir el detalle es aceptar la compra."],
    ["¿En qué te conviene «equivocarte»?", ["En el precio", "En un detalle menor que el cliente ya dijo", "En el nombre del cliente"], 1, "Un detalle pequeño, nunca algo que dañe la confianza."]
  ],
  resp: [{ ctx: "La clienta mencionó que quiere el paquete para dos personas. Usa el cierre por equivocación.", m: "Entonces me dijo que el paquete era para tres personas, ¿verdad?", c: "Repite mal a propósito un detalle menor que la clienta ya había dicho, en tono de confirmación." }] },

{ id: "compromiso", u: 4, num: 8, n: "Por compromiso", src: "Alex Dey · Los doce cierres", k: "dey", tag: "compromiso",
  idea: "Cuando el prospecto pone una condición que sí puedes resolver, la conviertes en compromiso: si se lo consigo, ¿lo compra? Lo que parecía una barrera se vuelve la puerta de la venta. El ejemplo de Dey: «Me gusta el auto, ¿pero no lo tendrá en azul?». «Si se lo consigo en azul, ¿se lleva el auto?».",
  f: ["Escucha la condición completa.", "Rebótala: «Si yo le consigo…, ¿lo compra?».", "Ofrece sólo lo que sí puedes cumplir."],
  fr: ["Si se lo consigo en azul, ¿se lleva el auto?", "Si logro la entrega para el viernes, ¿lo dejamos listo hoy?"],
  err: "Decir «sí se puede» gratis. Primero pide el compromiso y después concede.",
  mc: [
    ["Cliente: «Sólo me sirve si me lo dan a 12 meses». ¿Qué contestas?", ["Sí, sí manejamos 12 meses", "Si le consigo los 12 meses, ¿lo dejamos listo hoy?", "Lo máximo son 6"], 1, "Primero el compromiso, luego la concesión."],
    ["¿Qué cuidas siempre en este cierre?", ["Prometer sólo lo que puedes cumplir", "Hablar más rápido", "Subir el precio"], 0, "Una promesa rota te cuesta el cliente y sus referidos."]
  ],
  resp: [{ cl: "Me gusta, pero lo necesitaría en negro y no lo veo.", m: "Si se lo consigo en negro, ¿lo aparta hoy mismo?", c: "Convierte la condición en un compromiso de compra con la forma «si le consigo X, ¿lo toma?»." }] },

{ id: "elimina", u: 4, num: 9, n: "Por eliminación", src: "Alex Dey · Los doce cierres", k: "dey", tag: "elimina",
  idea: "Después de varios cierres sin éxito, recoges tus cosas y haces como que te vas. Ya en la puerta, como si olvidaras algo, preguntas una por una las posibles razones hasta que aparece la verdadera, que casi siempre es la inversión. Brian Tracy enseña una versión parecida, el cierre de la venta perdida.",
  f: ["Recoge tus cosas y despídete con amabilidad.", "En la puerta: «¿Hubo algo que no le gustó del producto?».", "Elimina: «¿Es la reputación de mi empresa? ¿La calidad? ¿Soy yo?».", "Llega a la real: «¿Entonces es la inversión?». Esa es la objeción a resolver."],
  fr: ["¿Es por la calidad? ¿Es por mí? ¿Entonces es por la inversión?"],
  err: "Irte de verdad sin preguntar. La objeción real se va contigo.",
  mc: [
    ["¿Cuándo usas el cierre por eliminación?", ["Al saludar", "Después de varios cierres sin éxito, cuando ya te vas", "Antes de presentar"], 1, "Sin presión, el cliente dice la verdad."],
    ["¿Cuál suele ser la última razón que preguntas?", ["La inversión", "El color", "El clima"], 0, "Casi siempre es el dinero, y casi nadie lo dice primero."]
  ],
  resp: [{ ctx: "El cliente ya dijo que no dos veces. Recogiste tus cosas y estás en la puerta.", m: "Antes de irme, ¿hubo algo que no le gustó del producto? ¿Es la reputación de la empresa? ¿Es la calidad? ¿Soy yo? ¿Entonces es la inversión?", c: "Pregunta una por una varias posibles razones (producto, empresa, calidad, el vendedor) hasta llegar a la inversión." }] },

{ id: "rebote", u: 4, num: 10, n: "Rebote", src: "Alex Dey · Los doce cierres", k: "dey", tag: "demuestra",
  idea: "Conviertes la objeción en una nueva oportunidad de venta: tomas lo que el cliente dijo y se lo rebotas como reto. «Me parece muy caro». «Si le demuestro que le va a resultar económico, y que hasta va a ahorrar dinero, ¿le gustaría adquirirlo?».",
  f: ["Escucha la objeción.", "Rebótala: «Si le demuestro que…, ¿lo adquiere?».", "Demuestra con números o hechos y regresa por el sí."],
  fr: ["Si le demuestro que va a ahorrar dinero, ¿le gustaría adquirirlo?"],
  err: "Demostrar sin pedir antes el compromiso. El cliente dice «qué interesante» y no decide.",
  mc: [
    ["Cliente: «Se me hace muy caro». ¿Cuál es el rebote?", ["No, no es caro", "Si le demuestro que le va a salir económico, ¿lo adquiere?", "Le hago un descuento"], 1, "La objeción se vuelve la condición de compra."],
    ["¿En qué se parece al cierre por compromiso?", ["En nada", "Ambos convierten la objeción en una condición: si se resuelve, compra", "Ambos bajan el precio"], 1, "El compromiso resuelve una condición; el rebote demuestra que la objeción no aplica."]
  ],
  resp: [{ cl: "No sé, me parece muy caro.", m: "Si le demuestro que con esto va a gastar menos al año que con lo que usa hoy, ¿le gustaría adquirirlo?", c: "Usa la forma «si le demuestro que… ¿lo adquiere/lo toma?», convirtiendo la objeción en condición de compra." }] },

{ id: "silencio", u: 4, num: 11, n: "Teoría del silencio", src: "Alex Dey · Los doce cierres", k: "dey", tag: "silencio",
  idea: "Después de hacer la pregunta de cierre, te callas. No agregas nada. El silencio incomoda, pero Dey es claro: en ventas, el primero que habla pierde. Puedes saber mil cierres; si no manejas el silencio, no vas a cerrar.",
  f: ["Haz tu pregunta de cierre.", "Termina en signo de interrogación y cierra la boca.", "Aguanta el silencio aunque dure.", "Deja que el cliente hable primero."],
  fr: ["En ventas, el primero que habla pierde."],
  err: "Llenar el silencio con «bueno, si quiere lo piensa…». Acabas de cerrarle la puerta a tu propio cierre.",
  mc: [
    ["Haces la pregunta de cierre y el cliente se queda callado. ¿Qué haces?", ["Le explico otra ventaja", "Guardo silencio y espero", "Le ofrezco un descuento"], 1, "Si hablas tú, le quitas la presión de decidir."],
    ["¿Qué dice Dey del silencio?", ["Que hay que evitarlo", "Que el primero que habla pierde", "Que sólo sirve por teléfono"], 1, "Saber callar vale más que mil técnicas."]
  ],
  resp: [{ ctx: "Escribe tu pregunta de cierre final, la que dirías justo antes de quedarte callado.", m: "¿Lo dejamos a nombre suyo o de su esposa?", c: "Es una sola pregunta de cierre, termina en signo de interrogación y no agrega nada después." }] },

{ id: "franklin", u: 4, num: 12, n: "Benjamín Franklin", src: "Alex Dey · Los doce cierres", k: "dey", tag: "franklin",
  idea: "Dey lo llama el padre de todos los cierres. Cuando el prospecto dice que lo quiere pensar, guardas tus cosas y haces como que te vas. Desconcertado, el cliente baja la guardia, y ahí le propones apuntar en un lado las razones para hacerlo y en otro las que le hacen dudar. En la segunda columna aparece la objeción real.",
  f: ["Guarda tus cosas y agradece, como si te fueras.", "«Me imagino que si lo quiere pensar es porque quiere tomar una buena decisión, ¿verdad?»", "«Apuntemos de un lado las razones para hacerlo y del otro las que le hacen dudar.»", "Ayúdale con las razones a favor; las otras que las escriba él.", "Lo que escriba en contra es la objeción real: resuélvela y vuelve a cerrar."],
  fr: ["Me imagino que si lo quiere pensar es porque quiere decidir bien, ¿verdad?"],
  err: "Pelearte con el «lo voy a pensar» o ayudarle a llenar la columna del no.",
  mc: [
    ["¿Cuándo usas el Benjamín Franklin, según Dey?", ["Cuando el cliente dice «lo quiero pensar»", "Al saludar", "Cuando ya firmó"], 0, "Es la respuesta al «lo quiero pensar»."],
    ["¿Qué sale de la columna de razones en contra?", ["El precio de la competencia", "La objeción real", "Nada útil"], 1, "Ahí aparece lo que de verdad lo detiene."]
  ],
  resp: [{ ctx: "Tu cliente es un ingeniero muy calmado.", cl: "Déjeme pensarlo.", m: "Claro. Me imagino que si lo quiere pensar es porque quiere tomar una buena decisión, ¿verdad? Hagamos algo: en esta hoja anotamos de un lado las razones para hacerlo y del otro las que le hacen dudar, y vemos cuál pesa más.", c: "Acepta con calma, confirma que quiere decidir bien y propone la lista de razones a favor y en contra." }] },

/* ───────── U6 · Más cierres de Alex Dey (Cierra Más) ───────── */
{ id: "insinua", u: 5, n: "Insinuaciones", src: "Alex Dey · Los 4 tipos de cliente", k: "deyx", tag: "insinua",
  idea: "Desde el principio siembras imágenes del cliente disfrutando el resultado. No pides nada: pintas la escena y él solo hace el resto. Con el sanguíneo, imágenes de admiración; con el melancólico, imágenes de tranquilidad para su familia.",
  f: ["Elige la emoción que mueve a tu cliente: orgullo, diversión, paz.", "Pinta una escena concreta con «¿se imagina…?».", "Repítelo durante la plática, no sólo al final."],
  fr: ["¿Se imagina la cara de sus amigos cuando llegue en este carro?", "¿Se imagina la tranquilidad de su familia?"],
  err: "Insinuar una sola vez al final. Las imágenes se siembran durante toda la presentación.",
  mc: [
    ["¿Qué hace el cierre de las insinuaciones?", ["Pide la firma directamente", "Siembra imágenes del cliente disfrutando el resultado", "Compara ventajas y desventajas"], 1, "El cliente se convence con su propia imaginación."],
    ["Para un melancólico, ¿qué imagen eliges?", ["La envidia de los vecinos", "La tranquilidad de su familia", "Los minutos que ahorra"], 1, "Con él, imágenes emocionales en lugar de imágenes de estatus."]
  ],
  resp: [{ ctx: "Vendes membresías de gimnasio. El cliente es sociable y bromista. Siembra una imagen.", m: "¿Se imagina la cara de sus amigos en diciembre cuando lo vean llegar con diez kilos menos?", c: "Pinta una escena concreta y emocional del resultado con «se imagina», adecuada a un sanguíneo." }] },

{ id: "comprob", u: 5, n: "Comprobación", src: "Alex Dey · Los 4 tipos de cliente", k: "deyx", tag: "demuestra",
  idea: "Antes de demostrar, pides el compromiso: si le compruebo lo que le importa, ¿lo toma? Es perfecto para el colérico, que va directo al resultado: si le compruebas, compra. Es primo hermano del rebote.",
  f: ["Identifica el resultado que el cliente quiere.", "Pregunta: «Si le demuestro que…, ¿lo tomaría?».", "Demuestra y regresa por el sí."],
  fr: ["Si le demuestro que le ahorra diez horas a la semana, ¿lo tomaría?"],
  err: "Demostrar primero y preguntar después.",
  mc: [
    ["¿En qué orden va el cierre de comprobación?", ["Demuestro y luego pregunto si le gustó", "Pido el compromiso y luego demuestro", "Pido referidos y luego demuestro"], 1, "El compromiso va antes de la prueba."],
    ["¿Con qué cliente funciona mejor?", ["Colérico: va directo al resultado", "Sanguíneo: quiere historias", "Con ninguno"], 0, "Si le compruebas, compra."]
  ],
  resp: [{ cl: "Yo lo único que quiero es vender más por internet.", m: "Si le demuestro con casos reales que este sistema le trae clientes nuevos cada semana, ¿lo arrancamos hoy?", c: "Usa la estructura «si le demuestro X (el resultado que pidió), ¿lo toma?» antes de demostrar." }] },

{ id: "referencia", u: 5, n: "Por referencia", src: "Alex Dey · Agenda del vendedor", k: "deyx", tag: "referencia",
  idea: "Cuentas la historia breve de un cliente parecido que tenía la misma duda, decidió y le fue bien. La gente no quiere ser la primera: quiere saber que alguien como ella ya lo hizo. Dey recomienda guardar audios de tus clientes contentos para usarlos aquí.",
  f: ["Elige un caso real y parecido: misma duda, mismo tipo de persona.", "Cuenta duda, decisión y resultado en treinta segundos.", "Regresa al cliente: «¿Le gustaría el mismo resultado?»."],
  fr: ["Lo mismo me dijo un cliente hace un mes; hoy es de los más contentos."],
  err: "Inventar el caso. Usa historias reales; mejor todavía, un audio del propio cliente.",
  mc: [
    ["¿Qué hace fuerte al cierre por referencia?", ["Que el caso sea real y parecido al cliente", "Que la historia sea muy larga", "Que mencione descuentos"], 0, "El cliente tiene que verse en la historia."],
    ["El cliente se frenó en la mensualidad. ¿Qué historia eliges?", ["La de alguien a quien le sobraba el dinero", "La de alguien que dudó por la mensualidad, decidió y le fue bien", "Tu historia personal"], 1, "Misma duda, final feliz."]
  ],
  resp: [{ cl: "Es que nunca he comprado algo así, me da desconfianza.", m: "Lo entiendo; lo mismo sentía un cliente que tiene un negocio como el suyo. Empezó con el plan básico hace seis meses y ya renovó. ¿Le gustaría escuchar lo que me dijo?", c: "Cuenta un caso breve de un cliente parecido con la misma duda y un buen resultado, y regresa con una pregunta." }] },

{ id: "avion", u: 5, n: "Cierre del avión", src: "Alex Dey · Los 4 tipos de cliente", k: "deyx", tag: "avion",
  idea: "Dey lo recomienda para el flemático que dice «es una decisión difícil»: le quita el miedo a equivocarse sin empujarlo. El material sólo da el nombre y cuándo usarlo; el guion de esta lección es de la app y usa la imagen de un piloto que despega cuando ya revisó lo esencial.",
  nota: "El nombre y el uso de este cierre vienen del material de Alex Dey. El guion de ejemplo fue redactado para esta app.",
  f: ["Valida: «Tiene razón, es una decisión importante».", "Usa la imagen: un piloto no espera el cielo perfecto; despega cuando revisó lo esencial.", "Revisen juntos lo esencial: ¿le sirve?, ¿lo puede pagar?, ¿tiene garantía?", "Con las tres en sí: «Entonces ya puede despegar tranquilo»."],
  fr: ["Un piloto despega cuando ya revisó lo esencial."],
  err: "Meter prisa: «decídase ya». A este cliente la presión lo congela.",
  mc: [
    ["¿A qué cliente le sirve más este cierre?", ["Al colérico apurado", "Al flemático que teme equivocarse", "Al sanguíneo distraído"], 1, "Le quita el miedo sin empujarlo."],
    ["¿Qué revisas con él antes de «despegar»?", ["Que le sirve, que lo puede pagar y que tiene garantía", "Que firme rápido", "Que no pregunte más"], 0, "Con lo esencial revisado, decidir deja de dar miedo."]
  ],
  resp: [{ cl: "Es que es una decisión difícil, no me quiero equivocar.", m: "Tiene razón, es importante. Mire, un piloto no espera el cielo perfecto: despega cuando revisó lo esencial. Revisemos lo suyo: ¿le resuelve lo que necesita? ¿La mensualidad le queda cómoda? ¿Tiene la garantía por escrito? Entonces ya puede despegar tranquilo.", c: "Valida el miedo sin presionar, usa una imagen que reduce el miedo a equivocarse y repasa los puntos esenciales." }] },

/* ───────── U7 · Cierres de Brian Tracy ───────── */
{ id: "invitacion", u: 6, n: "Invitación", src: "Brian Tracy", k: "tracy", tag: "invita",
  idea: "Al terminar la presentación preguntas si quedó alguna duda y, si no hay, invitas a decidir con una frase suave. Tracy insiste en que muchas ventas se pierden sólo porque nadie invitó a comprar.",
  f: ["«¿Tiene alguna pregunta que no haya cubierto?»", "Si dice que no: «Entonces, ¿por qué no lo prueba?».", "Silencio."],
  fr: ["Si le gusta lo que vio, ¿por qué no lo prueba?"],
  err: "Terminar con «bueno, ¿qué le parece?». Eso pide una opinión, no una decisión.",
  mc: [
    ["¿Qué preguntas antes de la invitación?", ["Si tiene alguna duda que no hayas cubierto", "Si le alcanza el dinero", "Si conoce a alguien más"], 0, "Si no hay dudas, el camino está libre para invitar."],
    ["¿Cuál es el cierre por invitación?", ["«¿Por qué no lo prueba?»", "«¿Qué opina?»", "«Lo llamo la próxima semana»"], 0, "Directo y sin presión."]
  ],
  resp: [{ ctx: "Terminaste tu presentación.", cl: "No, ninguna duda, todo claro.", m: "Me da gusto. Entonces, ¿por qué no lo prueba?", c: "Invita a decidir de forma directa y suave; no pide opinión ni pospone." }] },

{ id: "directivo", u: 6, n: "Directivo", src: "Brian Tracy", k: "tracy", tag: "directivo",
  idea: "Confirmas que todo tiene sentido y tú diriges el siguiente paso describiendo qué va a pasar. Das la decisión por tomada y le quitas al cliente el peso de decir «sí, compro».",
  f: ["«¿Tiene sentido para usted lo que hemos visto?»", "«Entonces el siguiente paso es…», y describes el trámite.", "Empieza a hacerlo."],
  fr: ["Entonces el siguiente paso es llenar la solicitud."],
  err: "Preguntar «¿qué quiere hacer?» y dejar al cliente solo con la decisión.",
  mc: [
    ["¿Qué pregunta abre el cierre directivo?", ["«¿Tiene sentido para usted hasta aquí?»", "«¿Cuánto quiere gastar?»", "«¿Lo quiere pensar?»"], 0, "Un sí aquí te da permiso de dirigir."],
    ["Después de ese sí, ¿qué haces?", ["Explico el siguiente paso y lo empiezo", "Espero a que el cliente proponga", "Repito la presentación"], 0, "Tú llevas el proceso."]
  ],
  resp: [{ cl: "Sí, me hace sentido.", m: "Excelente. Entonces el siguiente paso es sencillo: llenamos su solicitud ahora, con la inversión inicial, y el lunes lo tiene instalado.", c: "Describe el siguiente paso concreto dando la decisión por tomada." }] },

{ id: "secundario", u: 6, n: "Punto menor", src: "Brian Tracy", k: "tracy",
  idea: "La decisión grande asusta; una pequeña no. Cierras sobre un detalle secundario: al decidir el detalle, el cliente aceptó el todo.",
  f: ["Elige un detalle menor: color, fecha, forma de entrega.", "Pregunta por el detalle, no por la compra.", "Anótalo y avanza."],
  fr: ["¿Lo va a querer con la garantía extendida o con la estándar?"],
  err: "Regresar a la decisión grande: «entonces, ¿sí lo compra?».",
  mc: [
    ["¿Por qué funciona cerrar sobre un punto menor?", ["Porque decidir un detalle es más fácil que decidir la compra entera", "Porque distrae del precio", "Porque alarga la cita"], 0, "Quien elige el color ya eligió el carro."],
    ["¿Cuál es un cierre sobre un punto menor?", ["«¿Lo compra o no?»", "«¿Lo quiere con entrega a domicilio o pasa por él?»", "«¿Qué le pareció?»"], 1, "La respuesta implica la compra."]
  ],
  resp: [{ ctx: "Vendes un automóvil. El cliente lo mira con ganas pero no dice nada. Cierra sobre un punto menor.", m: "Por cierto, ¿lo va a querer con los rines deportivos o con los de fábrica?", c: "Pregunta por un detalle secundario cuya respuesta implica que compra." }] },

{ id: "autoriza", u: 6, n: "Autorización", src: "Brian Tracy", k: "tracy", tag: "autoriza",
  idea: "En lugar de pedir «la firma», pides una autorización para empezar. Marcas el lugar, le pasas la pluma y le dices qué vas a hacer tú enseguida. Coincide con Dey: firmar y contrato son palabras prohibidas.",
  f: ["Ten el pedido lleno.", "«Si me autoriza aquí, yo me encargo del resto.»", "Señala el lugar, entrega la pluma y calla."],
  fr: ["Si me autoriza aquí, empezamos de inmediato."],
  err: "Decir «firme el contrato». Esas palabras despiertan el miedo.",
  mc: [
    ["¿Qué palabras evitas al cerrar?", ["Autorización", "Contrato y firma", "Visto bueno"], 1, "Suenan a compromiso legal y a riesgo."],
    ["¿Qué haces justo después de pedir la autorización?", ["Sigo hablando de beneficios", "Entrego la pluma y guardo silencio", "Ofrezco un descuento"], 1, "El silencio hace el resto."]
  ],
  resp: [{ ctx: "El pedido ya está lleno y el cliente está de acuerdo en todo. Pide la autorización.", m: "Perfecto. Si me autoriza aquí, yo me encargo de todo lo demás y mañana mismo empezamos.", c: "Pide «autorización» o «visto bueno», no «firma de contrato», y dice qué pasará enseguida." }] },

{ id: "cachorro", u: 6, n: "El cachorrito", src: "Brian Tracy", k: "tracy", tag: "prueba",
  idea: "Como en la tienda de mascotas que deja que te lleves el cachorro el fin de semana: dejas que el cliente pruebe el producto sin riesgo. Cuando ya lo usó y se acostumbró, devolverlo cuesta más que quedárselo. Sólo funciona si de verdad ofreces la prueba.",
  f: ["Ofrece una prueba real: días, muestra o periodo de garantía.", "Deja claro que no hay riesgo.", "Agenda desde ya cuándo pasas a confirmar."],
  fr: ["Pruébelo una semana sin compromiso y luego me dice."],
  err: "Ofrecer una prueba que en realidad tiene letra chiquita.",
  mc: [
    ["¿Por qué funciona el cachorrito?", ["Porque el cliente se encariña al usarlo", "Porque es gratis para siempre", "Porque obliga a comprar"], 0, "Lo que ya usas es difícil de devolver."],
    ["¿Qué agendas al ofrecer la prueba?", ["Nada", "El día en que pasas a confirmar", "Una llamada en tres meses"], 1, "La prueba tiene fecha de cierre."]
  ],
  resp: [{ cl: "No sé si de verdad lo voy a usar.", m: "Hagamos algo: pruébelo una semana sin compromiso. El próximo lunes paso y me dice si se queda con él, ¿le parece?", c: "Ofrece una prueba sin riesgo y fija una fecha para confirmar." }] },

/* ───────── U8 · Objeciones: el método ───────── */
{ id: "dosno", u: 7, n: "Dos no y un sí", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tags: "objecion objeciones discutir pelear emociones",
  idea: "Para Dey, la objeción es la súplica del cliente que dice «dime más». Nadie compra sin oponerse un poco: quiere estar seguro de que decidió bien. Su regla para recibirlas son dos no y un sí: no discutas con el cliente, no contradigas sus emociones, y sí condúcelo a contestar su propia objeción.",
  f: ["No discutas: si ganas la discusión, pierdes la venta.", "No contradigas sus emociones: las emociones deciden.", "Sí llévalo a contestar su propia objeción con preguntas.", "Empieza siempre con «tiene razón…» o «comprendo…»."],
  fr: ["Comprendo… pero dígame, ¿le interesa más ahorrar o la calidad?"],
  err: "Contestar «no, no es caro». Acabas de decirle que está mal.",
  mc: [
    ["Según Dey, ¿qué hay detrás de una objeción?", ["Un rechazo definitivo", "Un «dime más»", "Una falta de respeto"], 1, "El que objeta está interesado."],
    ["¿Cuál es el «sí» de la regla?", ["Sí bajar el precio", "Sí conducirlo a contestar su propia objeción", "Sí insistir hasta que diga que sí"], 1, "Preguntando, el cliente se responde solo."]
  ],
  resp: [{ cl: "Me gusta el producto, pero está muy caro.", m: "Comprendo, señor. Pero dígame, ¿qué le interesa más: ahorrar dinero o tener un producto de excelente calidad?", c: "Empieza con comprendo o tiene razón, no discute y responde con una pregunta que lleva al cliente a contestar su propia objeción." }] },

{ id: "seispasos", u: 7, n: "Los seis pasos para rebatir", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tags: "objecion objeciones rebatir pasos responder",
  idea: "Dey propone seis pasos para cualquier objeción. Primero la escuchas completa; luego la regresas repitiéndola como pregunta para que el cliente la explique; la interrogas; la contestas; confirmas que quedó resuelta, y con un «por cierto» enlazas de nuevo al cierre.",
  f: ["Escúchala completa, sin interrumpir.", "Regrésala: «¿Que el precio es alto?».", "Interrógala: pregunta para que explique más.", "Contéstala.", "Confirma: «Eso aclara ese punto, ¿verdad?».", "Enlaza con «por cierto…» y vuelve al cierre."],
  fr: ["Eso aclara ese punto, ¿verdad?"],
  err: "Contestar antes de que termine de hablar. Así sólo consigues irritarlo.",
  mc: [
    ["Cliente: «¡El precio es ridículo!». ¿Cuál es el paso 2, regresarla?", ["«No es ridículo»", "«¿Que el precio es ridículo?»", "«Le hago descuento»"], 1, "Repetirla como pregunta lo obliga a explicar."],
    ["¿Para qué sirve el «por cierto»?", ["Para cambiar de tema", "Para enlazar de nuevo con un cierre", "Para despedirte"], 1, "Resuelta la objeción, vuelves a cerrar."]
  ],
  resp: [{ ctx: "Ya contestaste la objeción del cliente sobre la garantía. Confirma y enlaza con el cierre.", m: "Eso aclara ese punto, ¿verdad? Por cierto, la garantía es de las más largas del mercado. ¿Se lo dejamos a su nombre o al de su esposa?", c: "Confirma que la objeción quedó resuelta y usa «por cierto» para volver a un cierre." }] },

{ id: "zapato", u: 7, n: "El zapato en su pie", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tag: "zapato", tags: "zapato mala experiencia servicio quedaron mal desconfianza queja",
  idea: "Es la primera técnica de Dey para rebatir objeciones. Pones al cliente en tu lugar: le pides que imagine que él es el gerente de tu empresa y tiene ese mismo problema. Lo que él responda es justo lo que tu empresa hizo.",
  f: ["Reconoce: «Tiene toda la razón y lo comprendo».", "Pide el favor: «Imagine por un instante que usted es el gerente de mi empresa…».", "Plantea su queja como problema de la empresa: «¿Qué haría usted?».", "Cuando conteste: «¡Eso es exactamente lo que hicimos!»."],
  fr: ["Imagine que usted es el gerente de mi empresa, ¿qué haría?"],
  err: "Usarlo si tu empresa no corrigió el problema. Sólo di «eso hicimos» si es verdad.",
  mc: [
    ["Cliente: «Su máquina era muy lenta». ¿Qué le pides que imagine?", ["Que él es el gerente de tu empresa con ese problema", "Que compra otra máquina", "Que no importa la velocidad"], 0, "Él mismo propone la solución que ya hicieron."],
    ["Cuando el cliente responde «incrementaría la velocidad», ¿qué dices?", ["«Eso es exactamente lo que hicimos»", "«No se puede»", "«Qué buena idea, la voy a proponer»"], 0, "Su respuesta se vuelve tu argumento."]
  ],
  resp: [{ cl: "No quiero nada con ustedes: cuando se descompuso el equipo nadie me dio servicio.", m: "Tiene toda la razón y lo comprendo. ¿Me haría un favor? Imagine que usted es el gerente de nuestra empresa y tiene un vendedor que no da servicio a sus clientes. ¿Qué haría usted?", c: "Reconoce la queja y pide al cliente que se ponga en el lugar del gerente de la empresa, preguntando qué haría él." }] },

{ id: "aisla", u: 7, n: "Aísla la objeción", src: "Brian Tracy", k: "obj", tag: "aisla", tags: "aislar unica objecion dinero supongamos",
  idea: "Antes de resolver una objeción, Tracy pide asegurarte de que es la única. Supongamos que eso no fuera problema: ¿habría algo más que lo detuviera? Si no hay nada más, resolviendo esa cerraste la venta.",
  f: ["«Supongamos que eso no fuera problema…»", "«¿Habría alguna otra cosa que le impidiera decidirse hoy?»", "Si sale otra, esa es la real.", "Si no sale nada, resuelve ésa y cierra."],
  fr: ["Supongamos que eso no fuera problema, ¿habría algo más?"],
  err: "Resolver una objeción y que aparezca otra, y otra, y otra.",
  mc: [
    ["¿Para qué sirve «supongamos que eso no fuera problema»?", ["Para saber si es la única objeción", "Para ofrecer un préstamo", "Para terminar la cita"], 0, "Aíslas la objeción antes de resolverla."],
    ["El cliente contesta: «No, sólo es eso». ¿Qué sigue?", ["Despedirte", "Resolver esa objeción y cerrar", "Insistir en los beneficios"], 1, "Ya sabes exactamente qué resolver."]
  ],
  resp: [{ cl: "Sí me gusta, pero ahorita no tengo dinero.", m: "Lo entiendo perfectamente. Supongamos por un momento que el dinero no fuera problema: ¿habría alguna otra cosa que le impidiera decidirse hoy?", c: "Aísla la objeción con «supongamos que no fuera problema» y pregunta si hay algo más." }] },

/* ───────── U9 · Objeciones comunes ───────── */
{ id: "obj-caro", u: 8, n: "«Está muy caro»", src: "Alex Dey y Brian Tracy", k: "obj", tag: "caro", tags: "caro precio costoso carisimo mucho dinero descuento barato competencia mas barato",
  idea: "Nunca discutas el precio. Dey da tres salidas: preguntar comparado con qué, preguntar qué le importa más, el ahorro o la calidad, y recordar que si hoy le parece caro, en un año le va a costar más. Tracy agrega reducir la diferencia a lo mínimo: lo que parece mucho de golpe es poco por día.",
  f: ["«¿Caro comparado con qué?»", "«¿Qué es más importante para usted, el ahorro o la calidad?»", "Reduce la diferencia a lo mínimo: por mes, por día.", "Cierra con doble alternativa: «¿Cuál le atrae más, el uno o el dos?»."],
  fr: ["¿Qué es más importante para usted, el ahorro o la calidad?"],
  err: "Bajar el precio de inmediato. Le enseñas al cliente que tu primer precio no era en serio.",
  mc: [
    ["Cliente: «Está muy caro». ¿Cuál es tu primera respuesta?", ["«Le hago un descuento»", "«¿Caro comparado con qué?»", "«No es caro»"], 1, "Primero entiende contra qué está comparando."],
    ["La diferencia con la competencia es de $3,650 al año. ¿Cómo la presentas?", ["Como $3,650", "Como $10 al día", "No la menciono"], 1, "Reducida a lo mínimo, la diferencia deja de asustar."]
  ],
  resp: [{ cl: "Me gusta, pero se me hace muy caro.", m: "Comprendo. ¿Caro comparado con qué? Mire, la diferencia son como diez pesos al día por tener la garantía completa. Dígame, ¿qué es más importante para usted, el ahorro o la calidad?", c: "No discute ni baja el precio; pregunta comparado con qué o qué le importa más, o reduce la diferencia a una cifra pequeña." }] },

{ id: "obj-pensar", u: 8, n: "«Lo tengo que pensar»", src: "Alex Dey y Brian Tracy", k: "obj", tag: "duda", tags: "pensar pensarlo voy a pensar luego despues le aviso le llamo unos dias",
  idea: "Quien se va a pensarlo rara vez regresa. Dey pregunta primero si tiene alguna duda sobre el producto; si no la tiene, lo único que queda por pensar son las finanzas, y eso se puede resolver ahí mismo. Si quieres ir más lejos, usa el Benjamín Franklin.",
  f: ["«¿Tiene alguna duda sobre el producto? ¿No, verdad?»", "«Entonces lo único que quiere pensar son las finanzas, ¿no es así?»", "Resuelve el tema del dinero ahí mismo.", "Si sigue dudando, pasa al Benjamín Franklin."],
  fr: ["¿Tiene alguna duda sobre el producto? ¿No, verdad?"],
  err: "Creer que va a regresar. Dale dentro de la cita todo lo que necesita para decidir dentro de la cita.",
  mc: [
    ["¿Qué significa casi siempre «lo voy a pensar»?", ["Que ya decidió comprar", "Que hay una duda que no ha dicho", "Que necesita un folleto"], 1, "Hay algo que no te dijo. Encuéntralo."],
    ["Si no tiene dudas del producto, ¿qué le queda por pensar, según Dey?", ["El color", "Las finanzas", "Nada"], 1, "Y las finanzas se pueden acomodar ahí mismo."]
  ],
  resp: [{ cl: "Suena bien, déjeme pensarlo unos días.", m: "Claro, es una decisión importante. Dígame, ¿tiene alguna duda sobre el producto? ¿No, verdad? Entonces lo único que quiere pensar es la parte del dinero, ¿no es así? Veámosla juntos ahora.", c: "Acepta sin pelear, pregunta si tiene dudas sobre el producto y lleva la conversación a la parte financiera para resolverla ahí." }] },

{ id: "obj-consultar", u: 8, n: "«Lo tengo que consultar»", src: "Alex Dey y Brian Tracy", k: "obj", tag: "consultar", tags: "consultar esposa esposo marido mujer socio pareja jefe papa platicar preguntarle",
  idea: "Puede ser verdad o puede ser un escudo. Dey pregunta qué le preguntaría al socio que él no sepa ya, si él tiene toda la información; casi siempre aparece la objeción real o una cuestión de dinero. Tracy pregunta si dependiera sólo de él, ¿lo tomaría? Si dice que sí, consigue la cita con los dos.",
  f: ["«Si dependiera sólo de usted, ¿lo tomaría?»", "O: «Usted ya tiene toda la información. ¿Qué le preguntaría a su socio que usted no sepa ya?».", "Guarda silencio: ahí sale la objeción real.", "Si la consulta es real, agenda con los dos con doble alternativa."],
  fr: ["Si dependiera solamente de usted, ¿lo tomaría hoy?"],
  err: "Decir «claro, coméntelo y me avisa». Él no sabe vender tu producto.",
  mc: [
    ["Cliente: «Tengo que consultarlo con mi socio». ¿Qué preguntas?", ["«¿Y él por qué decide?»", "«¿Qué le preguntaría a él que usted no sepa ya?»", "«¿Le dejo un folleto?»"], 1, "Casi siempre aparece la objeción verdadera."],
    ["La consulta es real. ¿Cuál es el siguiente paso?", ["Esperar su llamada", "Agendar una cita con los dos", "Mandar la información por correo"], 1, "Tú presentas; él te apoya."]
  ],
  resp: [{ cl: "Me interesa, pero lo tengo que platicar con mi socio.", m: "Me parece lo correcto. Dígame, si dependiera solamente de usted, ¿lo tomaría? Perfecto. Entonces, para que su socio tenga la información completa, ¿los veo a los dos mañana a las diez o el jueves en la tarde?", c: "Pregunta si lo tomaría por su cuenta (o qué le preguntaría al socio) y propone una cita con ambos con dos opciones." }] },

{ id: "obj-gastos", u: 8, n: "«Ahorita tengo muchos gastos»", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tag: "gastos", tags: "no tengo dinero ahorita no me alcanza presupuesto gastos no puedo pagar sin dinero quincena",
  idea: "Dey le da la razón: los compromisos tienen prioridad. Pero problemas siempre va a haber, y las buenas oportunidades no se presentan todos los días. Si el producto le gustó, el asunto ya no es si compra, sino cómo hacer que la inversión se adapte a su presupuesto.",
  f: ["«Tiene razón, los compromisos tienen prioridad.»", "«En algo estamos de acuerdo: le gustó el producto, ¿verdad?»", "«Si lo arreglo para que la inversión inicial sea mínima y la mensual no afecte su presupuesto…»", "«…¿cuál tomaría, el uno o el dos?»"],
  fr: ["Si lo arreglo para que la inversión inicial sea mínima, ¿cuál tomaría?"],
  err: "Aceptar «no tengo dinero» como final sin buscar cómo sí.",
  mc: [
    ["¿Cómo empieza Dey su respuesta a «tengo muchos gastos»?", ["«Eso no es excusa»", "«Tiene razón, los compromisos tienen prioridad»", "«Todos tenemos gastos»"], 1, "Primero le das la razón."],
    ["¿Qué ofrece después?", ["Un descuento grande", "Adaptar la inversión a su presupuesto y elegir entre dos planes", "Volver el próximo año"], 1, "Cambias el «si compra» por el «cómo compra»."]
  ],
  resp: [{ cl: "Me gusta, pero ahorita tengo muchos gastos.", m: "Tiene razón, los compromisos tienen prioridad. En algo estamos de acuerdo: le gustó el producto, ¿verdad? Si lo arreglo para que la inversión inicial sea mínima y la mensual no afecte su presupuesto, ¿cuál tomaría, el plan uno o el dos?", c: "Le da la razón, confirma que le gustó y ofrece adaptar la inversión al presupuesto con dos opciones." }] },

{ id: "obj-primo", u: 8, n: "«Le compro a un conocido»", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tag: "primo", tags: "ya tengo proveedor conocido cunado primo sobrino amigo familiar otra empresa ya compro lealtad",
  idea: "Somos criaturas de hábitos. Dey no ataca al primo: pregunta qué tenía antes de comprarle a él y por qué cambió. Si cambió una vez por mejores beneficios, ¿por qué privarse ahora de comparar con lo que hay hoy? No hables mal de nadie: decirle que su proveedor es malo es decirle que él decidió mal.",
  f: ["«Lo comprendo.»", "«Antes de comprarle a su primo tenía otro producto, ¿verdad? ¿Por qué cambió?»", "«¿Y por qué privarse ahora de la oportunidad de comparar?»", "Silencio, y pide un minuto para mostrar lo más impactante."],
  fr: ["No le pido que cambie, sólo que compare."],
  err: "Hablar mal del proveedor actual. Estás criticando una decisión del cliente.",
  mc: [
    ["¿Qué preguntas ante «ya le compro a mi primo»?", ["«¿Su primo le da buen precio?»", "«Antes de comprarle a él tenía otro producto, ¿por qué cambió?»", "«¿Usted confía en su primo?»"], 1, "Le recuerdas que ya cambió una vez por algo mejor."],
    ["¿Por qué no hablas mal del proveedor actual?", ["Porque es de mala educación nada más", "Porque criticas la decisión del cliente", "Porque es ilegal"], 1, "Atacar su decisión es atacarlo a él."]
  ],
  resp: [{ cl: "Gracias, pero tengo años comprándole a mi primo.", m: "Lo comprendo. Antes de comprarle a su primo tenía otro producto, ¿verdad? ¿Por qué cambió: sólo por ayudarle o porque le ofrecía algo mejor? Entonces, ¿por qué privarse ahora de comparar? No le pido que cambie, sólo que compare. ¿Tiene un minuto?", c: "Respeta la lealtad, pregunta por qué cambió antes o propone sólo comparar, sin hablar mal del primo." }] },

{ id: "obj-viendo", u: 8, n: "«Nada más estoy viendo»", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tag: "buscadores", tags: "nada mas estoy viendo solo viendo curiosidad informacion",
  idea: "Es una objeción reflejo, casi automática. Dey confirma primero lo positivo con amarres (le gusta el producto, la empresa tiene buena reputación) y luego plantea la diferencia entre buscadores y compradores: los buscadores dejan pasar las oportunidades; los que hacen, las toman. Cuéntalo como historia, bajando la voz, nunca como burla.",
  f: ["«¿Pero le gusta el producto? ¿Verdad que la empresa tiene buena reputación?»", "«Hay buscadores y hay compradores.»", "«Los buscadores dejan pasar las oportunidades; los compradores obtienen lo que quieren.»", "Baja la voz: «¿Cuál de los dos es usted?»."],
  fr: ["Hay buscadores y hay compradores, ¿cuál de los dos es usted?"],
  err: "Decir «ah, ok, cualquier cosa me avisa» y dejarlo ir.",
  mc: [
    ["¿Qué haces primero ante «nada más estoy viendo»?", ["Me alejo", "Confirmo lo positivo con amarres: le gusta el producto, ¿verdad?", "Le digo el precio"], 1, "Primero juntas síes."],
    ["¿Cómo debe sonar lo de buscadores y compradores?", ["Como reto agresivo", "Como historia, con voz baja y sin burla", "Gritando"], 1, "Si suena a burla, lo pierdes."]
  ],
  resp: [{ cl: "No, gracias, nada más estoy viendo.", m: "Claro. Pero le gusta lo que ve, ¿verdad? Le cuento algo: hay buscadores y hay compradores. Los buscadores siempre dejan pasar las buenas oportunidades; los compradores obtienen lo que quieren. ¿Cuál de los dos es usted?", c: "Confirma algo positivo con una pregunta y plantea la diferencia entre buscadores y compradores con respeto." }] },

{ id: "obj-nohoy", u: 8, n: "«No lo voy a decidir hoy»", src: "Alex Dey · La Biblia del Vendedor", k: "obj", tag: "banca", tags: "no hoy decidir hoy otro dia no lo voy a decidir manana",
  idea: "Dey reconoce que el cliente tiene la capacidad de decidir, y pregunta si quizás le falta información. Si no le falta nada, usa la imagen del fútbol: para anotar hay que salir al campo; desde la banca no se anota. Y vuelve a cerrar con doble alternativa, bajando la voz.",
  f: ["«Estoy seguro de que tiene la capacidad para tomar una decisión inteligente.»", "«Pero puede que le falte información, ¿no es así?»", "Si no falta nada: «Decidir es como el fútbol: desde la banca no se anota».", "Baja la voz: «¿Se queda con el uno o con el dos?»."],
  fr: ["Desde la banca no se anota, ¿verdad?"],
  err: "Contestar «¿y cuándo lo decide?». Le acabas de dar permiso de no decidir.",
  mc: [
    ["¿Qué preguntas primero ante «no lo voy a decidir hoy»?", ["Si le falta información", "Si mañana sí", "Si tiene miedo"], 0, "Si le falta algo, ahí está la objeción real."],
    ["¿Qué imagen usa Dey?", ["El avión", "El fútbol: desde la banca no se anota", "La escalera"], 1, "Para anotar hay que salir al campo."]
  ],
  resp: [{ cl: "Está bien todo, pero simplemente no lo voy a decidir hoy.", m: "Estoy seguro de que usted puede tomar una decisión inteligente, pero quizás le falta información, ¿no es así? ¿O se me olvidó mencionarle algo? Decidir es como el fútbol: desde la banca no se anota. ¿Se queda con el plan uno o con el dos?", c: "Reconoce su capacidad, pregunta si le falta información y vuelve a cerrar con una doble alternativa." }] },

/* ───────── U10 · Después del sí ───────── */
{ id: "ref-nombres", u: 9, n: "Pide los nombres", src: "Alex Dey · El guion de referidos", k: "post", tags: "referidos referido recomendados nombres recomendar conoce a alguien",
  idea: "Los treinta segundos después del cierre son los más rentables de la cita. El error es preguntar «¿conoce a alguien?»: la mente se queda en blanco. Dale cajones donde buscar: familia, trabajo, vecinos, alguien en su misma situación.",
  cuando: "Justo después del cierre o en la entrega. Nunca antes de cerrar.",
  f: ["Abre un cajón: «¿Hay alguien más en su familia que se pudiera beneficiar con esto?».", "Pide nombre y apellido.", "Abre otro cajón: trabajo, vecinos, compadres.", "Con cuatro cajones casi siempre salen tres nombres o más."],
  fr: ["¿Hay alguien más en su familia que se pudiera beneficiar?"],
  err: "Pedir referidos antes de cerrar: suena a que con él ya te diste por vencido.",
  mc: [
    ["¿Cuál es la peor forma de pedir referidos?", ["«¿Conoce a alguien que le pueda interesar?»", "«¿Quién de sus hermanos tiene hijos pequeños?»", "«¿Y en su trabajo, algún compañero?»"], 0, "Es tan abierta que la mente se queda en blanco."],
    ["¿Cuándo se piden?", ["Antes de dar el precio", "Justo después del cierre o en la entrega", "Sólo si el cliente los ofrece"], 1, "Es el momento de mayor entusiasmo y confianza."],
    ["El cliente dice «no conozco a nadie». ¿Qué haces?", ["Insisto con la misma pregunta", "Le cambio de cajón con preguntas concretas", "Me voy"], 1, "Casi nunca es verdad: su mente se quedó en blanco."]
  ],
  resp: [{ ctx: "El cliente acaba de autorizar el pedido y está contento. Pide el primer referido.", m: "Déjeme preguntarle algo: ¿hay alguien más en su familia que se pudiera beneficiar con esto? ¿Cómo se llama? ¿Y su apellido?", c: "Pregunta por un grupo concreto (familia, trabajo, vecinos) en vez de «¿conoce a alguien?» y pide el nombre." }] },

{ id: "ref-cita", u: 9, n: "Que el cliente te abra la puerta", src: "Alex Dey · El guion de referidos", k: "post", tags: "referidos cita llamar tarjeta whatsapp mensaje recomendado testimonio audio",
  idea: "Un nombre no es una cita. El paso que casi nadie se atreve a pedir es que el propio cliente llame al referido. Si no puede, que firme tu tarjeta con el nombre arriba. Y cuando llegues con el referido: nombre de quien te recomendó, razón corta y doble alternativa.",
  f: ["«¿Sería tan amable de llamarle para ver si me puede atender hoy en la tarde o mañana?»", "Si no puede: su firma en el reverso de tu tarjeta y el nombre del referido.", "Con el referido: quién te manda, una razón positiva y dos opciones.", "Cuando el referido compre, avísale y agradécele a quien te recomendó."],
  fr: ["¿Sería tan amable de llamarle para ver si me puede atender?"],
  err: "Terminar el mensaje al referido con «¿cuándo tiene tiempo?». Siempre dos opciones.",
  mc: [
    ["¿Qué pesa más al llegar con un referido?", ["Tu folleto", "La llamada o la tarjeta firmada de quien te recomendó", "Tu título"], 1, "Llegas con la mitad de la venta hecha."],
    ["¿Qué tres cosas lleva tu primer mensaje a un referido?", ["Precio, descuento y vigencia", "Quién te recomendó, una razón corta y positiva, y dos opciones de cita", "Tu currículum, tu empresa y tu teléfono"], 1, "Nombre al principio, doble alternativa al final."],
    ["El prospecto NO te compró. ¿Le pides referidos?", ["No, sería abusar", "Sí: «¿quién de las personas que conoce cree que sí lo necesita ahorita?»", "Sólo por correo"], 1, "Ya sabe qué ofreces y muchas veces te da un nombre con alivio."]
  ],
  resp: [{ ctx: "Escribe tu primer WhatsApp a Gabriel Méndez (nombre de ejemplo), referido por su cuñado Roberto Gómez.", m: "Buenas tardes, señor Méndez. Su cuñado Roberto Gómez me pidió que me pusiera en contacto con usted porque acaba de tomar algo que le gustó mucho y quiso que usted también lo conociera. ¿Le queda mejor que platiquemos mañana en la mañana o el jueves en la tarde?", c: "Menciona al inicio quién lo recomendó, da una razón corta y positiva y termina con dos opciones de horario." }] },

{ id: "numeros", u: 9, n: "Mide tu juego", src: "Alex Dey · Agenda del vendedor millonario", k: "post", lista: true, tags: "medir numeros agenda reporte grafica prospectos presentaciones metas productividad",
  idea: "Tu ingreso sale de tres números: a cuánta gente viste, a cuánta le presentaste y a cuánta le cerraste. Cuando uno se cae, tu comisión se cae con él. Si no los mides, sólo te queda trabajar más horas sin saber dónde se rompió la cadena.",
  f: ["Prospectos bajos: te falta volumen. Ningún cierre lo compensa.", "Prospectos altos y presentaciones bajas: falla la entrada o la precalificación.", "Presentaciones altas y cierres bajos: no estás pidiendo la venta. Pule tus cierres de prueba.", "Todo parejo y bajo: es actividad y actitud, no técnica."],
  fr: ["Planea tu trabajo y trabaja tu plan."],
  err: "Ponerte metas de dinero. Ponte metas de actividad, que son las que dependen de ti.",
  mc: [
    ["Viste a 30 personas y le presentaste a 4. ¿Dónde está la fuga?", ["En los cierres", "En la entrada: cómo abres o a quién ves", "En el precio"], 1, "Ves gente y no logras presentarle."],
    ["Presentaste 12 veces y cerraste 1. ¿Qué trabajas?", ["Prospección en frío", "Cierres de prueba y pedir la venta", "El saludo"], 1, "Presentas bien y no pides la venta."],
    ["¿Qué tipo de meta mensual conviene?", ["De dinero", "De actividad: prospectos, presentaciones y cierres", "De horas"], 1, "El dinero depende de mucha gente; la actividad, sólo de ti."]
  ],
  resp: [{ ctx: "Escribe el comentario de tu reporte diario para un cliente que se frenó en la mensualidad.", m: "Le interesa la cobertura educativa. Se frenó en la mensualidad. Próxima visita: probar el cierre por referencia.", c: "Anota la objeción concreta y qué cierre probar la próxima vez; no escribe sólo «interesado»." }] },
/* ───────── Lecciones nuevas: prospección, presentación consultiva y disciplina ───────── */
{ id: "prospectar", u: 1, n: "Prospectar en volumen", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "Para Alex Dey la secuencia de esta profesión es sencilla: un extraño se vuelve prospecto, el prospecto se vuelve cliente y el cliente se vuelve amigo, y un amigo te manda a sus amigos. Nada de lo que hagas con tus cierres compensa ver poca gente. Los referidos multiplican tu trabajo, pero no sustituyen la prospección diaria.",
  f: ["Haz una lista diaria de personas nuevas: conocidos, conocidos de conocidos y negocios de tu zona.", "Fija una meta de contactos por día y cúmplela antes que cualquier otra cosa.", "Precalifica: ¿lo necesita?, ¿lo puede pagar?, ¿decide él?", "Pide referidos en cada cita, te compren o no."],
  fr: ["Un extraño se vuelve prospecto, el prospecto cliente y el cliente amigo."],
  err: "Vivir sólo de referidos. Cuando se acaban los recomendados, se acaba la carrera.",
  mc: [
    ["¿Qué compensa ver poca gente?", ["Un buen cierre", "Nada: hace falta volumen", "Un descuento"], 1, "Si la línea de prospectos está baja, ninguna técnica la salva."],
    ["¿Qué tres preguntas precalifican a un prospecto?", ["¿Lo necesita?, ¿lo puede pagar?, ¿decide él?", "¿Dónde vive?, ¿qué edad tiene?, ¿qué auto tiene?", "¿Le caigo bien?, ¿tiene tiempo?, ¿está contento?"], 0, "Así no inviertes tu tiempo en quien no puede comprar."]
  ],
  resp: [{ ctx: "Te encuentras a un conocido en una reunión. Ábrele la conversación para prospectarlo sin venderle ahí mismo.", m: "¡Qué gusto verte! Oye, ahora estoy ayudando a familias a proteger su patrimonio. No te quiero vender nada aquí; ¿te parece si te llamo el martes o el miércoles y te cuento en diez minutos?", c: "Abre con naturalidad, dice en una frase a qué se dedica, no presenta ahí mismo y pide una cita con dos opciones." }] },

{ id: "cita-tel", u: 1, n: "La cita por teléfono", src: "Alex Dey y Brian Tracy", k: "base", tag: "doble",
  idea: "Por teléfono no se vende el producto: se vende la cita. Si lo explicas todo por teléfono, el cliente ya no necesita verte. Alex Dey arma la llamada con tres piezas: el nombre de quien te recomendó, una razón corta y positiva, y una doble alternativa para el día y la hora. Nunca termines con «¿cuándo tiene tiempo?».",
  f: ["Saluda, di tu nombre y quién te recomendó, si aplica.", "Da una razón corta y positiva: el beneficio, no el producto.", "No vendas por teléfono: el objetivo es la cita.", "Pide la cita con doble alternativa de día y hora.", "Si te pide información por correo, usa eso para pedir la cita."],
  fr: ["¿Le queda mejor el martes en la mañana o el jueves en la tarde?"],
  err: "Explicar todo el producto por teléfono. Si ya lo sabe todo, no necesita la cita.",
  mc: [
    ["¿Cuál es el objetivo de la llamada en frío?", ["Vender el producto", "Conseguir la cita", "Mandar el catálogo"], 1, "Por teléfono se vende la cita."],
    ["¿Con qué terminas la llamada?", ["¿Cuándo tiene tiempo?", "¿Le queda mejor el martes o el jueves?", "Le mando la información"], 1, "Siempre dos opciones."]
  ],
  resp: [{ cl: "Mándeme la información por correo y yo la reviso.", m: "Con gusto. Para mandarle sólo lo que de verdad le sirve necesito diez minutos con usted. ¿Le queda mejor el martes a las once o el jueves a las cinco?", c: "No manda el correo sin más ni discute; da una razón y pide la cita con dos opciones." }] },

{ id: "sietepasos", u: 1, n: "Los siete pasos de la venta", src: "Brian Tracy", k: "base", lista: true,
  idea: "Brian Tracy describe la venta profesional en siete pasos: prospectar, ganarte la confianza, identificar la necesidad, presentar, responder objeciones, cerrar y conseguir recompras y referidos. Propone además un modelo nuevo de venta: dedicar cerca del 40% del tiempo a la confianza, 30% a entender la necesidad, 20% a presentar y sólo 10% a cerrar. Cuando los primeros pasos están bien hechos, el cierre sale casi solo.",
  f: ["Prospectar: encontrar a quién puede comprar.", "Confianza: la gente le compra a quien le cree.", "Necesidad: preguntar y escuchar más de lo que hablas.", "Presentar: sólo los beneficios que responden a su necesidad.", "Objeciones: responderlas sin discutir.", "Cerrar: pedir la decisión.", "Recompras y referidos: cuidar al cliente para que regrese y te recomiende."],
  fr: ["Primero la confianza, luego la necesidad, después la presentación y al final el cierre."],
  err: "Usar el modelo viejo: casi nada de relación y la mitad del tiempo empujando el cierre.",
  mc: [
    ["En el modelo nuevo de Tracy, ¿a qué dedicas más tiempo?", ["A cerrar", "A ganarte la confianza", "A presentar"], 1, "La confianza es el factor que más decide la compra."],
    ["¿Cuál es el último paso de la venta según Tracy?", ["Cerrar", "Recompras y referidos", "Presentar"], 1, "La venta sigue después de la firma."]
  ],
  resp: [{ ctx: "Explícale a un compañero en una o dos frases el modelo nuevo de venta de Tracy.", m: "Dedica casi todo el tiempo a ganarte la confianza y a entender qué necesita el cliente; si haces eso bien, la presentación es corta y el cierre sale solo.", c: "Dice que la confianza y entender la necesidad van primero y ocupan la mayor parte; el cierre es la parte más corta." }] },

{ id: "rapport", u: 1, n: "Primera impresión y confianza", src: "Alex Dey · La Biblia del Vendedor", k: "base",
  idea: "El prospecto te analiza desde que te ve, y en el primer saludo ya tiene una opinión de ti. Dey pide cuidar la apariencia, escuchar bien su nombre y usarlo, sonreír de verdad y ser cortés. Para ganarte su confianza lo honras: le pides su consejo, respetas sus opiniones y repites sus propias palabras, porque lo que él dijo lo va a aceptar al cerrar. Tracy coincide: la gente compra cuando confía.",
  f: ["Apariencia impecable: el cliente te juzga en segundos.", "Escucha su nombre y úsalo durante la plática.", "Sonrisa sincera y cortesía.", "Pídele su opinión y repite sus propias palabras.", "Si la plática se desvía, regrésala con diplomacia pero con autoridad."],
  fr: ["Usted que conoce bien su negocio, ¿qué es lo que más le preocupa hoy?"],
  err: "Llegar hablando de ti y del producto sin haber escuchado al cliente.",
  mc: [
    ["¿Por qué repetir las palabras del cliente?", ["Para llenar el silencio", "Porque lo que él dijo lo acepta al cerrar", "Para parecer interesante"], 1, "Sus palabras son tus mejores argumentos."],
    ["La plática se va a otro tema. ¿Qué haces?", ["La dejo correr", "La regreso con diplomacia pero con autoridad", "Me despido"], 1, "Tú llevas el control de la cita."]
  ],
  resp: [{ ctx: "Acabas de sentarte con el señor Ramírez, dueño de una ferretería. Haz una pregunta que construya confianza.", m: "Señor Ramírez, usted que conoce bien su negocio, ¿qué es lo que más le quita el sueño en estos días?", c: "Usa su nombre, lo honra pidiéndole su opinión y hace una pregunta abierta sobre su situación." }] },

{ id: "consultiva", u: 1, n: "Presenta como consultor", src: "Brian Tracy y Alex Dey", k: "base",
  idea: "Tracy enseña a vender como un consultor: primero preguntas y escuchas, después presentas sólo los beneficios que responden a lo que el cliente dijo, del más importante al menos importante, y después de cada beneficio haces una pregunta de prueba. Dey lo resume así: dile lo que le vas a decir, díselo y dile lo que le dijiste.",
  f: ["Pregunta antes de presentar: ¿qué usa hoy?, ¿qué no le gusta?, ¿qué le gustaría mejorar?", "Escucha y anota sus palabras.", "Presenta sólo los beneficios que responden a lo que dijo, del más importante al menos.", "Después de cada beneficio, una pregunta de prueba: «¿Esto le serviría?».", "Dile lo que le vas a decir, díselo y dile lo que le dijiste."],
  fr: ["Dile lo que le vas a decir, díselo y dile lo que le dijiste."],
  err: "Presentar el catálogo completo antes de saber qué necesita.",
  mc: [
    ["¿Qué haces antes de presentar?", ["Decir el precio", "Preguntar y escuchar", "Enseñar todo el catálogo"], 1, "Sin conocer la necesidad, presentas a ciegas."],
    ["¿En qué orden presentas los beneficios?", ["Del más importante para el cliente al menos", "En el orden del folleto", "Del más barato al más caro"], 0, "Lo que más le importa, primero."]
  ],
  resp: [{ cl: "Ando buscando algo para mi negocio, pero no sé bien qué.", m: "Perfecto. Para recomendarle bien, déjeme hacerle tres preguntas: ¿qué usa hoy?, ¿qué es lo que menos le gusta de eso? y si pudiera cambiar una sola cosa, ¿cuál sería?", c: "No presenta todavía; hace preguntas abiertas para descubrir la necesidad antes de ofrecer." }] },

{ id: "metas", u: 9, n: "Metas y disciplina diaria", src: "Brian Tracy y Alex Dey", k: "post",
  idea: "Tracy insiste en escribir las metas: una meta que no está escrita es sólo un deseo. Dey lo lleva al día a día con su hoja «¡Qué precioso día!»: la noche anterior escribes tus seis prioridades, al final del día calificas tu actitud y tu fuerza de voluntad, y apartas tiempo para estudiar. Tus mejores días de ventas casi nunca son los de más horas, sino los de mejor actitud.",
  f: ["Escribe tus metas y revísalas a diario.", "Cada noche, anota las seis prioridades del día siguiente.", "Ponte metas de actividad: prospectos, presentaciones y cierres.", "Estudia ventas todos los días, aunque sean veinte minutos.", "Califica tu día con honestidad: la actitud se trabaja igual que un cierre."],
  fr: ["Viviré este día como si fuera el último de mi vida."],
  err: "Esperar a tener ganas. Las ganas llegan después de empezar.",
  mc: [
    ["¿Cuándo escribes las prioridades del día, según Dey?", ["En la mañana, al llegar", "La noche anterior", "Cuando hay tiempo"], 1, "Así no desperdicias la primera hora decidiendo qué hacer."],
    ["¿Qué tienen en común tus mejores días de ventas?", ["Más horas trabajadas", "Mejor actitud mental", "Más llamadas perdidas"], 1, "La actitud se nota en el cheque."]
  ],
  resp: [{ ctx: "Escribe tus metas de actividad para mañana.", m: "Mañana voy a contactar a 15 prospectos, hacer 4 presentaciones y pedir la venta en cada una.", c: "Son metas de actividad concretas, con números de prospectos, presentaciones y cierres; no metas de dinero." }] }
],

TIPOS: [
  { id: "sanguineo", n: "Sanguíneo", eje: "Rápido · gente", voz: "airy", persona: "Paco Rivas",
    senal: "Bromea, habla con las manos y en los primeros minutos te pregunta algo personal o te cuenta algo que no tiene que ver con la venta.",
    quiere: "Quedar bien, que lo admiren, ser el primero en tenerlo. Compra la experiencia.",
    presenta: "Con energía e historias. Nada de tablas. Mantén tú el control, porque la plática se le va sola.",
    vend: "Tienes el talento natural más grande para vender: le caes bien a la gente sin esfuerzo. Tu enemigo es la inconstancia: confías en tu carisma y no preparas tu presentación. Con disciplina te vuelves imparable.", reto: "prepara tu presentación y mide tus números.", foco: ["presentacion", "conclusion", "numeros"],
    cierres: ["insinua", "envolvente"], espanta: "Los detalles técnicos, las presentaciones largas y serias, el Benjamín Franklin.",
    riesgo: "Dice que sí con muchas ganas y luego no contesta el teléfono. Con él se cierra hoy.",
    rol: "Eres muy sociable y bromista. Te desvías del tema, cuentas anécdotas y te emocionas fácil, pero eres inconstante. Te importa cómo te van a ver los demás. Los números y los detalles técnicos te aburren." },
  { id: "colerico", n: "Colérico", eje: "Rápido · resultado", voz: "glassy", persona: "Marta Salinas",
    senal: "Te recibe de pie o te dice «tiene cinco minutos». Mira el reloj y te interrumpe para preguntar cuánto cuesta.",
    quiere: "El resultado, y ya: cuánto gana, cuánto tiempo ahorra, qué problema se quita. Compra control.",
    presenta: "Directo al grano, con tus tres mejores beneficios y nada más. Firme y sin chistes. Que sienta que decide él.",
    vend: "Tienes disciplina, ambición y carácter para ser el que más vende. Tu enemigo es la impaciencia: atropellas al cliente lento. El colérico que aprende a escuchar cierra el doble.", reto: "escucha, baja el ritmo y aguanta el silencio.", foco: ["espejo", "silencio", "emocion"],
    cierres: ["doble", "comprob"], espanta: "Perder tiempo, las historias, la inseguridad y las técnicas obvias.",
    riesgo: "Decide rápido y descarta rápido. Si en dos minutos no le diste un motivo, se acabó.",
    rol: "Vas con prisa. Eres directo y seco, interrumpes, preguntas el precio muy pronto y quieres resultados concretos. No toleras rodeos ni que te digan qué hacer. Si el vendedor titubea o se extiende, lo cortas." },
  { id: "flematico", n: "Flemático", eje: "Calma · números", voz: "rounded", persona: "Ernesto Luna",
    senal: "Tranquilo y analítico. Te ofrece café, saca la calculadora y pregunta por el interés, el plazo y la letra chiquita.",
    quiere: "Números claros, garantía y saber que a otros les fue bien. Compra tranquilidad.",
    presenta: "Con calma y en orden, con comparativos y garantía por escrito. Contesta todo sin desesperarte. No lo presiones.",
    vend: "Eres constante, ordenado y confiable; los clientes confían en ti. Tu enemigo es la inseguridad: te cuesta pedir la venta. El flemático que se atreve a cerrar tiene los clientes más fieles.", reto: "pide la venta siempre, aunque te cueste.", foco: ["autoconcepto", "conclusion", "doble"],
    cierres: ["franklin", "avion", "elimina"], espanta: "La prisa, la presión, el entusiasmo exagerado y las promesas sin respaldo.",
    riesgo: "Si lo dejas ir a pensarlo, lo piensa seis meses. Dale todo dentro de la cita.",
    rol: "Eres tranquilo y analítico. Preguntas por números, plazos, garantías y letra chiquita. Das pocas señales. La presión te congela y entonces dices que lo tienes que pensar. Sólo decides si te dan seguridad y datos claros." },
  { id: "melancolico", n: "Melancólico", eje: "Calma · sentimientos", voz: "buttery", persona: "Sofía Navarro",
    senal: "Sensible y detallista. Escucha con atención, te mira a los ojos y habla de su familia.",
    quiere: "Que beneficie a quienes quiere y poder confiar en ti. Antes del producto, te compra a ti.",
    presenta: "Con calidez y sinceridad. Pregunta por su familia y escucha de verdad. Dale tiempo.",
    vend: "Lees a la gente mejor que nadie. Tu enemigo es el miedo al cambio y la timidez. El melancólico que vence el miedo al rechazo construye relaciones que duran toda la vida.", reto: "pierde el miedo al «no» y pide referidos.", foco: ["rechazo", "dosno", "ref-nombres"],
    cierres: ["doble", "insinua"], espanta: "La frialdad, la prisa, la manipulación y los cambios bruscos.",
    riesgo: "Le cuesta decir que no; a veces dice que sí por pena y luego se arrepiente.",
    rol: "Eres sensible, reservado y detallista. Te importan tu familia y poder confiar en la persona. Te cuesta decir que no de frente, te asustan los cambios bruscos y la frialdad. Compras si sientes sinceridad y un beneficio para los tuyos." }
],

/* Guion del cliente entrenado (funciona sin IA). Cada momento tiene la línea del cliente por tipo,
   la insistencia si respondes débil, las técnicas que lo resuelven y la lección de referencia.
   Claves de tipo: s sanguíneo, c colérico, f flemático, m melancólico. */
ROLE: {
  open: {
    cierre: { s: "¡Oiga, qué bien explica! Me cayó muy bien. Ya vi todo lo de {p}, pero a ver, a ver…", c: "Ya vi su presentación de {p}. Tengo cinco minutos. Dígame lo importante.", f: "Gracias por la explicación de {p}. Tómese su café con calma; yo todavía tengo mis dudas.", m: "Gracias por venir y por explicarme con paciencia lo de {p}. Me gustó cómo lo platica…" },
    cita: { s: "¿Bueno? ¡Sí, dígame! ¿Quién habla?", c: "¿Bueno? ¿Quién habla? Estoy ocupada.", f: "¿Bueno? Sí, diga… ¿de parte de quién?", m: "¿Bueno? Sí… ¿quién habla, perdón?" }
  },
  beats: {
    caro: { lesson: "obj-caro", good: ["caro", "puerco", "demuestra", "aisla", "doble"],
      c: { s: "Está padrísimo, pero híjole, se me hace carísimo, ¿eh?", c: "¿Ése es el precio? No. Está caro.", f: "Hice cuentas y me sale caro comparado con otras opciones que vi.", m: "Me gusta… pero es mucho dinero para nosotros ahorita." },
      p: { s: "Sí, sí, pero sigue estando caro, ¿no?", c: "Sigue estando caro. ¿Qué más?", f: "Mmm. Los números siguen sin cuadrarme.", m: "Es que de verdad es mucho…" } },
    pensar: { lesson: "obj-pensar", good: ["franklin", "elimina", "duda", "aisla"],
      c: { s: "Me encantó, pero déjeme pensarlo y le llamo, ¿va?", c: "Lo voy a pensar. Le aviso.", f: "Necesito pensarlo con calma unos días.", m: "Déjeme pensarlo, ¿sí? No quiero equivocarme." },
      p: { s: "Sí, pero mejor lo pienso, ¿eh?", c: "Ya le dije: lo voy a pensar.", f: "Prefiero pensarlo, de verdad.", m: "Es que sí necesito pensarlo…" } },
    consultar: { lesson: "obj-consultar", good: ["consultar", "aisla", "doble"],
      c: { s: "¡Mi esposa me mata si compro sin decirle! Lo tengo que platicar con ella.", c: "Esto lo tengo que ver con mi socio.", f: "Tengo que consultarlo con mi esposa antes de decidir.", m: "Lo tengo que platicar con mi esposo; decidimos todo juntos." },
      p: { s: "No, no, primero le pregunto a ella.", c: "Sin mi socio no decido.", f: "Igual necesito consultarlo.", m: "Es que no quiero hacerlo sin él…" } },
    confianza: { lesson: "zapato", good: ["zapato", "referencia", "garantia", "demuestra"],
      c: { s: "Una vez me vendieron algo parecido y luego nadie me contestaba, ¿eh?", c: "Ya me han quedado mal otros vendedores. ¿Por qué ustedes no?", f: "¿Cómo sé que esto sí funciona? ¿Qué respaldo tengo?", m: "Me da un poco de miedo… ya nos han quedado mal antes." },
      p: { s: "Pues sí, pero ya me pasó una vez…", c: "Palabras. ¿Qué garantía tengo?", f: "Necesito algo más concreto que eso.", m: "No sé… me sigue dando desconfianza." } },
    proveedor: { lesson: "obj-primo", good: ["primo", "zapato", "referencia"],
      c: { s: "Es que mi compadre vende algo igualito y siempre le compro a él.", c: "Ya tengo proveedor. No necesito otro.", f: "Tengo años con mi proveedor actual y me funciona.", m: "Le compro a mi primo, y no quisiera quedarle mal." },
      p: { s: "¡Pero es mi compadre!", c: "Ya le dije que tengo proveedor.", f: "No veo razón para cambiar.", m: "Es que es familia…" } },
    gastos: { lesson: "obj-gastos", good: ["gastos", "aisla", "doble"],
      c: { s: "Uy, este mes ando con mil gastos, ¿eh?", c: "Ahorita no hay presupuesto para esto.", f: "Este mes tengo varios compromisos de pago.", m: "Ahorita tenemos muchos gastos en la casa…" },
      p: { s: "Sí, pero ando bien apretado.", c: "No hay presupuesto. Punto.", f: "Mis números de este mes no dan.", m: "De verdad no nos alcanza ahorita…" } },
    viendo: { lesson: "obj-viendo", good: ["buscadores", "amarre", "amarreinv", "doble", "insinua"],
      c: { s: "Jaja, no, yo nada más estoy viendo, ¿eh?", c: "Sólo estoy viendo opciones.", f: "Por ahora sólo estoy recopilando información.", m: "Nada más quería conocer, gracias…" },
      p: { s: "Sí, sí, pero nada más estoy viendo.", c: "Le dije que sólo estoy viendo.", f: "Todavía estoy comparando.", m: "Sólo estoy viendo, de verdad…" } },
    nohoy: { lesson: "obj-nohoy", good: ["banca", "duda", "elimina", "franklin", "doble"],
      c: { s: "Hoy no decido nada, ¿eh? Otro día.", c: "Hoy no lo voy a decidir.", f: "Yo nunca decido el mismo día.", m: "No quisiera decidir hoy…" },
      p: { s: "Otro día, otro día.", c: "Hoy no.", f: "Prefiero no decidir hoy.", m: "Mejor otro día, ¿sí?" } },
    dificil: { lesson: "avion", good: ["avion", "franklin", "garantia", "referencia"],
      c: { s: "¡Ay, es que no sé! Es una decisión difícil.", c: "Es una decisión importante. No quiero equivocarme.", f: "Es una decisión difícil. Me da miedo equivocarme.", m: "Es difícil… ¿y si me equivoco?" },
      p: { s: "Es que sigue siendo difícil.", c: "No me convence todavía.", f: "Sigo con miedo de equivocarme.", m: "Todavía no estoy segura…" } },
    senal: { lesson: "puerco", good: ["puerco", "compromiso", "doble", "envolvente"],
      c: { s: "Oiga, ¿y lo tienen en otro color? Algo que llame la atención.", c: "¿Lo pueden tener listo para el viernes?", f: "¿Y el plan se puede pagar a doce meses?", m: "¿Y se puede poner a nombre de mi hija?" },
      p: { s: "¿Pero sí lo tienen o no?", c: "¿Sí o no? Para el viernes.", f: "¿Entonces sí se puede a doce meses?", m: "¿Entonces sí se puede?" } },
    condicion: { lesson: "compromiso", good: ["compromiso", "demuestra"],
      c: { s: "Me lo llevaría si me dan algo extra, ¿no?", c: "Sólo me sirve si me lo instalan esta semana.", f: "Sólo lo tomaría si la garantía es por escrito.", m: "Lo tomaría si lo pudieran entregar antes del cumpleaños de mi hijo." },
      p: { s: "¿Entonces sí o no?", c: "Esta semana o nada.", f: "Necesito eso por escrito.", m: "¿Sí se podría?" } },
    correo: { lesson: "doble", good: ["doble"], cita: true,
      c: { s: "¡Ah, sí! Mándeme la información por WhatsApp y yo la veo.", c: "Mándeme la información por correo.", f: "Mándeme todo por correo y lo reviso con calma.", m: "¿Me puede mandar la información y yo la veo con mi familia?" },
      p: { s: "Mejor mándemela y luego platicamos.", c: "Por correo. Gracias.", f: "Prefiero leerlo primero.", m: "Mejor mándemela…" } },
    ocupado: { lesson: "doble", good: ["doble", "puerco"], cita: true,
      c: { s: "¡Uy, ahorita ando de un lado para otro!", c: "No tengo tiempo. Estoy ocupada.", f: "Ahorita estoy ocupado, no puedo atenderlo.", m: "Ahorita no tengo mucho tiempo, perdón…" },
      p: { s: "Es que ando bien ocupado esta semana.", c: "Le dije que no tengo tiempo.", f: "No tengo espacio esta semana.", m: "De verdad estoy muy ocupada…" } }
  },
  ok: {
    s: ["¡Jaja, visto así, tiene razón!", "Órale, eso me late.", "Bueno, sí, ya me convenció en eso."],
    c: ["Ok. Tiene sentido.", "Correcto.", "Eso me sirve."],
    f: ["Visto así, tiene lógica.", "Mmm, sí, eso me da más tranquilidad.", "Bien, eso me queda claro."],
    m: ["Gracias por explicármelo así, me da confianza.", "Sí, así lo veo diferente.", "Eso me tranquiliza mucho."]
  },
  bad: {
    discute: { s: "Oiga, tampoco me diga que estoy mal, ¿eh?", c: "No me diga que estoy equivocada.", f: "Prefiero que no me contradiga.", m: "Me siento un poco mal de que me diga eso…" },
    presion: { s: "Uy, no me presione, ¿eh?", c: "A mí nadie me presiona.", f: "Así no. La presión me hace desconfiar.", m: "Me está poniendo nerviosa…" },
    descuento: { s: "¿Ah, entonces el precio no era en serio?", c: "¿Entonces me estaba cobrando de más?", f: "Si me baja tan fácil, ¿cuál es el precio real?", m: "¿Entonces el precio no era el real?" },
    rinde: { s: "¡Va! Ahí le llamo.", c: "Bien. Yo le aviso.", f: "De acuerdo. Yo lo busco.", m: "Sí, gracias, yo le aviso…" },
    largo: { c: "Al grano, por favor." }
  },
  close: {
    s: "¡Ya me antojó! ¿Y luego, cómo le hacemos?", c: "¿Y qué sigue?", f: "Bueno… creo que ya tengo la información que necesitaba.", m: "Me da confianza… creo que sí nos serviría."
  },
  closePush: { s: "¿Y entonces?", c: "¿Entonces qué? Dígame qué sigue.", f: "¿Y ahora?", m: "¿Y ahora qué hacemos?" },
  closeCita: { s: "Bueno, va, ¿cuándo sería?", c: "Está bien. ¿Cuándo?", f: "Podría ser… ¿qué propone?", m: "Bueno… ¿cuándo podría ser?" },
  win: { s: "¡Vámonos! Me lo llevo. [VENTA]", c: "Hágale. Lo tomo. [VENTA]", f: "Bien. Lo vamos a hacer. [VENTA]", m: "Sí… vamos a hacerlo. Gracias por su paciencia. [VENTA]" },
  winCita: { s: "¡Va, ahí lo veo! [VENTA]", c: "Ahí nos vemos. Sea puntual. [VENTA]", f: "De acuerdo, lo anoto. [VENTA]", m: "Sí, ahí lo espero. [VENTA]" },
  lose: { s: "Mejor otro día, ¿va? Gracias. [PERDIDA]", c: "No me convenció. Gracias. [PERDIDA]", f: "Lo voy a pensar con calma. Gracias. [PERDIDA]", m: "Gracias… lo voy a pensar. [PERDIDA]" }
}
};
(D => {
/* Módulos del curso: cada uno junta lecciones, una clase narrada y una demostración hablada. */
D.MODULES = [
  { id: "m1", t: "Mentalidad del cerrador", d: "Antes de cualquier técnica: cómo te ves como vendedor, cómo recibes el «no» y qué hace que la gente compre.", ls: ["autoconcepto", "rechazo", "emocion", "conclusion"], demo: "d1" },
  { id: "m2", t: "Prospectar y conseguir la cita", d: "El ciclo completo de la venta, a quién buscar todos los días y cómo conseguir la cita por teléfono.", ls: ["ciclo", "sietepasos", "prospectar", "cita-tel"], demo: "d2" },
  { id: "m3", t: "Lee a tu cliente", d: "Los cuatro tipos de cliente, qué cierre funciona con cada uno y cómo ganarte su confianza imitando su ritmo.", ls: ["tipos", "tipos-cierre", "espejo"], demo: "d3" },
  { id: "m4", t: "La presentación de ventas", d: "Cómo causar la primera impresión, preguntar antes de presentar, armar una presentación que vende, decir el precio y usar la voz.", ls: ["rapport", "consultiva", "presentacion", "palabras", "precio", "voz"], demo: "d4" },
  { id: "m5", t: "Cierres durante la plática", d: "Los cierres de Alex Dey que vas usando en toda la conversación para juntar síes pequeños.", ls: ["doble", "amarre", "amarre-inv", "puerco", "envolvente", "equivoc"], demo: "d5" },
  { id: "m6", t: "Cierres para cuando el cliente se frena", d: "Compromiso, rebote, eliminación, teoría del silencio y el Benjamín Franklin, el padre de todos los cierres.", ls: ["compromiso", "rebote", "elimina", "silencio", "franklin"], demo: "d6" },
  { id: "m7", t: "Más cierres de Alex Dey", d: "Insinuaciones, comprobación, por referencia y el cierre del avión, según el tipo de cliente.", ls: ["insinua", "comprob", "referencia", "avion"], demo: "d7" },
  { id: "m8", t: "Los cierres de Brian Tracy", d: "Invitación, directivo, punto menor, autorización y el cachorrito: cierres suaves para rematar.", ls: ["invitacion", "directivo", "secundario", "autoriza", "cachorro"], demo: "d8" },
  { id: "m9", t: "Objeciones: el método", d: "Dos no y un sí, los seis pasos para rebatir, el zapato en su pie y cómo aislar la objeción.", ls: ["dosno", "seispasos", "zapato", "aisla"], demo: "d9" },
  { id: "m10", t: "Las objeciones de todos los días", d: "Está caro, lo voy a pensar, lo tengo que consultar, tengo gastos, le compro a mi primo, sólo estoy viendo y no lo decido hoy.", ls: ["obj-caro", "obj-pensar", "obj-consultar", "obj-gastos", "obj-primo", "obj-viendo", "obj-nohoy"], demo: "d10" },
  { id: "m11", t: "Referidos", d: "Los treinta segundos después del cierre: cómo pedir nombres y lograr que el cliente te abra la puerta.", ls: ["ref-nombres", "ref-cita"], demo: "d11" },
  { id: "m12", t: "Disciplina y números", d: "Metas, prioridades diarias y cómo leer tus números para saber dónde se te escapa el dinero.", ls: ["metas", "numeros"], demo: "d12" }
];

/* Demostraciones: escenas habladas. v vendedor, c cliente, n nota del coach. tec: lección que se aplica. */
D.DEMOS = [
  { id: "d1", t: "Un «no me interesa» que se vuelve conversación", ctx: "Seguros. El vendedor llega a la oficina de un cliente que no lo esperaba.", lines: [
    ["n", "Antes de entrar, el vendedor aplica el primer cierre: el cierre por conclusión, que es para él mismo."],
    ["v", "Sí lo quiere, sí lo quiere. Vengo a ayudarle a decidir bien.", "conclusion"],
    ["c", "Buenas. Le advierto que no me interesa nada, ¿eh?"],
    ["v", "Lo entiendo, y no le quiero quitar tiempo. Sólo una pregunta: ¿qué es lo que menos le gusta del seguro que tiene hoy?", "rechazo"],
    ["c", "Pues que cuando lo necesité, nadie me contestó el teléfono."],
    ["v", "Eso es justo lo que vengo a resolver. Dígame, ¿qué es más importante para usted: el precio o que alguien le responda cuando lo necesita?", "emocion"],
    ["c", "Que me respondan, claro."],
    ["n", "Ahí está su botón caliente: el servicio. Toda la presentación va a girar alrededor de eso, y el «no» del principio quedó atrás sin discutir."]
  ] },
  { id: "d2", t: "La llamada que consigue la cita", ctx: "Llamada a un referido. El objetivo no es vender: es la cita.", lines: [
    ["c", "¿Bueno?"],
    ["v", "Buenas tardes, señor Méndez. Habla Carlos Ruiz; su cuñado Roberto Gómez me pidió que le llamara.", "ref-cita"],
    ["c", "Ah, sí… ¿y de qué se trata?"],
    ["v", "Roberto acaba de proteger a su familia con un plan que le gustó mucho y quiso que usted también lo conociera. Son diez minutos.", "cita-tel"],
    ["c", "Mejor mándeme la información por correo."],
    ["v", "Con gusto. Para mandarle sólo lo que le sirve, necesito conocerlo un poco. ¿Le queda mejor el martes a las once o el jueves a las cinco?", "doble"],
    ["c", "El jueves está bien."],
    ["v", "Perfecto, jueves a las cinco. Nos vemos, señor Méndez."],
    ["n", "No vendió nada por teléfono: vendió la cita. Nombre de quien lo recomienda, razón corta y doble alternativa."]
  ] },
  { id: "d3", t: "Cinco minutos con una clienta colérica", ctx: "Software para empresas. La clienta lo recibe de pie y mira el reloj.", lines: [
    ["n", "Rápida y enfocada en resultados: es colérica. Con ella, corto, firme y al grano."],
    ["c", "Tengo cinco minutos. ¿Qué trae?"],
    ["v", "Voy al grano: este sistema le ahorra diez horas de trabajo a la semana a su equipo. Le muestro cómo en tres minutos y usted decide.", "tipos"],
    ["c", "¿Cuánto cuesta?"],
    ["v", "Se lo digo enseguida. Si le demuestro que esas diez horas se pagan solas desde el primer mes, ¿lo implementamos?", "comprob"],
    ["c", "Demuéstremelo."],
    ["n", "Ni chistes ni historias largas. Le habló de resultados, le pidió el compromiso antes de demostrar y la dejó sentir que ella decide."]
  ] },
  { id: "d4", t: "Una presentación que empieza preguntando", ctx: "Venta de autos. La clienta llega a la agencia con sus hijos.", lines: [
    ["v", "Señora Torres, antes de mostrarle nada, ¿qué auto tiene hoy y qué es lo que menos le gusta de él?", "consultiva"],
    ["c", "Un sedán viejo. Gasta mucha gasolina y no caben bien las sillitas de los niños."],
    ["v", "¿Le gustaría un auto donde quepan las dos sillitas y que gaste la mitad de gasolina?", "presentacion"],
    ["c", "Pues sí, claro."],
    ["v", "Este modelo consume la mitad que el suyo y el asiento de atrás está pensado para dos sillas. Una clienta con tres hijos me dijo que fue la mejor decisión de su año.", "presentacion"],
    ["v", "Ahorrar gasolina y que los niños vayan cómodos es importante, ¿verdad?", "amarre"],
    ["c", "Sí, muchísimo."],
    ["n", "Primero preguntó y escuchó. Después presentó sólo lo que ella dijo: atención, interés, deseo y convicción. Y cerró la idea con un amarre."]
  ] },
  { id: "d5", t: "Síes pequeños hasta el cierre", ctx: "Venta de autos. La clienta ya probó el auto y está interesada.", lines: [
    ["c", "¿Lo tienen en color gris?"],
    ["v", "¿Lo quiere en gris?", "puerco"],
    ["c", "Sí, el gris me gusta más."],
    ["v", "Excelente elección. Dígame, ¿quién va a ser el primero en verlo cuando llegue a su casa?", "envolvente"],
    ["c", "Mi esposo, se va a ir de espaldas."],
    ["v", "Entonces, ¿lo registramos a nombre suyo o a nombre de los dos?", "doble"],
    ["c", "De los dos."],
    ["v", "Perfecto. Me dijo que lo quería para el día quince, ¿verdad?", "equivoc"],
    ["c", "No, para el veinte."],
    ["v", "Para el veinte, anotado."],
    ["n", "Cada pregunta juntó un sí pequeño. Cuando ella corrigió la fecha, ya había comprado."]
  ] },
  { id: "d6", t: "«Déjeme pensarlo» resuelto con Benjamín Franklin", ctx: "Seguro de gastos médicos. El cliente es tranquilo y analítico.", lines: [
    ["c", "Me gusta, pero déjeme pensarlo."],
    ["n", "El vendedor guarda sus papeles como si ya se fuera. El cliente baja la guardia."],
    ["v", "Claro. Me imagino que si lo quiere pensar es porque quiere tomar una buena decisión, ¿verdad?", "franklin"],
    ["c", "Sí, exacto."],
    ["v", "Hagamos algo rápido: de un lado anotamos las razones para hacerlo y del otro las que le hacen dudar.", "franklin"],
    ["c", "A favor, la garantía, el servicio y que sí lo necesito. En contra… el pago mensual."],
    ["v", "Si le consigo una mensualidad que le quede cómoda, ¿lo dejamos listo hoy?", "compromiso"],
    ["c", "Si me queda cómoda, sí."],
    ["v", "¿Prefiere pagar el día primero o el día quince?", "doble"],
    ["n", "Y aquí se calla. Teoría del silencio: el primero que habla pierde.", "silencio"],
    ["c", "El quince."]
  ] },
  { id: "d7", t: "Una clienta melancólica que teme equivocarse", ctx: "Seguro de vida. La clienta es mamá de dos niños.", lines: [
    ["c", "Es que es una decisión difícil… no me quiero equivocar."],
    ["v", "Tiene razón, es importante. Un piloto no espera el cielo perfecto: despega cuando revisó lo esencial. ¿Le resuelve lo que necesita? ¿El pago le queda cómodo? ¿Tiene la garantía por escrito?", "avion"],
    ["c", "Sí… sí a las tres."],
    ["v", "Lo mismo sentía una clienta, también mamá de dos niños, hace seis meses. Hoy me dice que duerme tranquila.", "referencia"],
    ["v", "¿Se imagina la tranquilidad de saber que, pase lo que pase, sus hijos van a estar bien?", "insinua"],
    ["c", "Sí… eso es justo lo que quiero."],
    ["v", "¿Incluimos a sus dos hijos como beneficiarios o sólo al mayor?", "doble"],
    ["n", "Con la melancólica: calma, una historia real y una imagen emocional. Nunca prisa."]
  ] },
  { id: "d8", t: "Cerrar con los cierres de Tracy", ctx: "Curso en línea para emprendedores. La presentación ya terminó.", lines: [
    ["v", "¿Tiene alguna pregunta que no le haya contestado?", "invitacion"],
    ["c", "No, creo que todo quedó claro."],
    ["v", "Entonces, ¿por qué no lo prueba?", "invitacion"],
    ["c", "Mmm… ¿y cómo sería?"],
    ["v", "¿Tiene sentido para usted lo que vimos?", "directivo"],
    ["c", "Sí."],
    ["v", "Entonces el siguiente paso es sencillo: llenamos su registro y el lunes ya tiene acceso. ¿Lo quiere con la garantía extendida o con la estándar?", "secundario"],
    ["c", "Con la extendida."],
    ["v", "Perfecto. Si me autoriza aquí, yo me encargo de todo lo demás.", "autoriza"],
    ["n", "Nunca dijo «firme el contrato». Invitó, dirigió, cerró sobre un detalle y pidió autorización."]
  ] },
  { id: "d9", t: "Una mala experiencia, sin discutir", ctx: "Servicio de mantenimiento. El cliente tuvo una mala experiencia con la empresa.", lines: [
    ["c", "No quiero nada con ustedes: la vez pasada nadie me dio servicio."],
    ["v", "Tiene toda la razón y lo comprendo.", "dosno"],
    ["v", "¿Me haría un favor? Imagine que usted es el gerente de nuestra empresa y tiene un vendedor que no atiende a sus clientes. ¿Qué haría?", "zapato"],
    ["c", "¡Pues lo corro!"],
    ["v", "Eso es exactamente lo que hicimos. Ahora cada cliente tiene un asesor fijo. Eso aclara ese punto, ¿verdad?", "seispasos"],
    ["c", "Bueno, sí."],
    ["v", "Por cierto, ese asesor sería yo. Supongamos que el servicio ya no fuera problema: ¿habría algo más que le impidiera decidirse hoy?", "aisla"],
    ["c", "No, sólo era eso."],
    ["n", "No discutió ni contradijo su emoción. Lo puso en el lugar del gerente, confirmó y aisló la objeción antes de cerrar."]
  ] },
  { id: "d10", t: "«Está caro» y «tengo muchos gastos»", ctx: "Muebles para el hogar. La pareja ya eligió el modelo.", lines: [
    ["c", "Está muy caro."],
    ["v", "Comprendo. ¿Caro comparado con qué?", "obj-caro"],
    ["c", "Con lo que vi en otra tienda."],
    ["v", "Dígame algo: ¿qué es más importante para usted, el ahorro o la calidad?", "obj-caro"],
    ["c", "La calidad, pero ahorita tengo muchos gastos."],
    ["v", "Tiene razón, los compromisos tienen prioridad. En algo estamos de acuerdo: le gustó el producto, ¿verdad?", "obj-gastos"],
    ["c", "Sí, me gustó mucho."],
    ["v", "Si lo arreglo para que la inversión inicial sea mínima y la mensual no afecte su presupuesto, ¿cuál tomaría, el plan uno o el dos?", "obj-gastos"],
    ["c", "El dos."],
    ["n", "Nunca bajó el precio de entrada ni discutió: preguntó, le dio la razón y cambió el «si compra» por el «cómo compra»."]
  ] },
  { id: "d11", t: "Los treinta segundos después del sí", ctx: "El cliente acaba de autorizar el pedido y está contento.", lines: [
    ["v", "Señor Gómez, déjeme preguntarle algo: ¿hay alguien más en su familia que se pudiera beneficiar con esto?", "ref-nombres"],
    ["c", "Pues a lo mejor mi cuñado."],
    ["v", "¿Cómo se llama su cuñado?"],
    ["c", "Gabriel. Gabriel Méndez."],
    ["v", "¿Y en su trabajo? ¿Algún compañero con quien platique de estas cosas?", "ref-nombres"],
    ["c", "Sí, Laura, de contabilidad."],
    ["v", "¿Sería tan amable de llamarle a Gabriel para ver si me puede atender hoy en la tarde o mañana sábado?", "ref-cita"],
    ["c", "Sí, deje le marco."],
    ["n", "No preguntó «¿conoce a alguien?». Abrió cajones concretos, pidió nombre y apellido, y logró que el cliente le hiciera la cita."]
  ] },
  { id: "d12", t: "Domingo en la noche: leer los números", ctx: "El vendedor revisa su semana con la gráfica de productividad.", lines: [
    ["v", "Esta semana vi a 30 personas, presenté a 12 y cerré 1.", "numeros"],
    ["n", "Presentaciones altas y cierres bajos: está presentando bien, pero no está pidiendo la venta."],
    ["v", "Una sola corrección para la semana: después de cada beneficio voy a hacer un cierre de prueba, y en cada presentación voy a pedir la venta.", "numeros"],
    ["v", "Mis seis prioridades de mañana: llamar a cinco referidos, dos presentaciones y el seguimiento a Ramón.", "metas"],
    ["n", "Metas de actividad, una sola corrección por semana y las prioridades escritas la noche anterior. Planea tu trabajo y trabaja tu plan."]
  ] }
];

/* Estilos de enseñanza y de venta para la IA. No es la persona real: es su método. */
D.ESTILOS = {
  dey: { n: "Estilo Alex Dey", corto: "Dey", voz: "rounded", rate: 1.06, pitch: 0.95,
    d: "Entusiasta, cálido y directo. Motiva, cuenta anécdotas cortas y te llama campeón.",
    coach: "Tu estilo es el de enseñanza de Alex Dey: entusiasta, cálido, directo y motivador; hablas como un conferencista latino de ventas, usas palabras como «campeón» y «campeona», cuentas anécdotas cortas y das frases contundentes y fáciles de recordar. Enseñas con su método: los doce cierres, los cuatro tipos de cliente, dos no y un sí, la voz en forma de N, el guion de referidos y la agenda del vendedor.",
    vende: "Vendes con el estilo de Alex Dey: cálido, seguro y entusiasta; usas la doble alternativa, los amarres y el puercoespín durante toda la plática; ante objeciones das la razón primero («tiene razón», «comprendo») y aplicas sus cierres; usas palabras que venden (inversión, acuerdo, autorizar) y evitas las prohibidas (contrato, firmar, precio)." },
  tracy: { n: "Estilo Brian Tracy", corto: "Tracy", voz: "glassy", rate: 0.96, pitch: 0.85,
    d: "Sereno, analítico y ordenado. Enseña con principios y pasos claros.",
    coach: "Tu estilo es el de enseñanza de Brian Tracy: sereno, analítico, ordenado y alentador; explicas con principios y pasos numerados, das ejemplos concretos y conectas todo con la psicología de ventas: autoconcepto, botón caliente, venta consultiva, los siete pasos de la venta, aislar objeciones y cierres de invitación, directivo, punto menor, autorización y el cachorrito.",
    vende: "Vendes con el estilo de Brian Tracy: consultivo y sereno. Primero preguntas y escuchas, encuentras el botón caliente, presentas sólo los beneficios que responden a lo que dijo, haces una pregunta de prueba después de cada beneficio, aíslas cada objeción antes de resolverla y cierras con invitación, directivo, punto menor o autorización." }
};
})(window.DOJO);
