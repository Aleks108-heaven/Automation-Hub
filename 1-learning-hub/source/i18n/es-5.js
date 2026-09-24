/* Español — v5: herramientas en profundidad, Katalon, Applitools, Vibium, otros frameworks, IA en la automatización */
TR.es=TR.es||{modules:{}};
(()=>{const M=TR.es.modules,add=(id,...s)=>M[id]&&M[id].sections&&M[id].sections.push(...s);
add('playwright',
 ['Simular la red y llamar a APIs en la misma prueba',`<p>Playwright puede interceptar cualquier petición de la página. Úsalo para forzar estados poco frecuentes (errores, listas vacías, respuestas lentas) y para preparar datos por la API antes de usar la UI.</p>
${P(0)}
${CO('tip','Consejo','<code class="i">route.fetch()</code> obtiene la respuesta real, así que puedes cambiar un campo y dejar pasar el resto. Así el mock se mantiene cerca de la realidad.')}`],
 ['Comparaciones visuales',`<p><code class="i">toHaveScreenshot()</code> compara una captura con una referencia guardada, píxel a píxel. La primera ejecución escribe la referencia; las siguientes fallan cuando la diferencia supera tu umbral.</p>
${P(0)}
${CO('risk','Riesgo','Las referencias dependen del sistema operativo, las fuentes y la versión del navegador. Genéralas y compáralas en el mismo entorno, normalmente una imagen de Docker fijada en CI, o cada ejecución será distinta.')}`],
 ['Las herramientas de depuración',T(['Herramienta','Cómo se inicia','Úsala cuando'],[
  ['Modo UI','<code class="i">npx playwright test --ui</code>','Escribes pruebas: modo watch, viaje en el tiempo, elegir locators'],
  ['Inspector','<code class="i">npx playwright test --debug</code>','Recorres una prueba línea a línea'],
  ['Trace Viewer','<code class="i">npx playwright show-trace trace.zip</code>','Un fallo de CI que no reproduces en local'],
  ['Codegen','<code class="i">npx playwright codegen URL</code>','Quieres un primer borrador de locators y pasos'],
  ['Extensión de VS Code','Barra lateral Testing','Ejecutar, depurar y grabar desde el editor'],
  ['Informe HTML','<code class="i">npx playwright show-report</code>','Revisar una ejecución completa, con reintentos y adjuntos']])],
 ['IA y Playwright: MCP y agentes de prueba',`<p>Playwright incluye ahora funciones pensadas para asistentes de programación con IA:</p>
${UL(['<b>Playwright MCP</b>: un servidor de Model Context Protocol con el que un asistente controla un navegador real usando el árbol de accesibilidad de la página en lugar de capturas.','<b>Agentes de prueba</b>: tres definiciones de agentes que se instalan con <code class="i">npx playwright init-agents --loop=vscode</code> (o <code class="i">claude</code>, <code class="i">codex</code>, <code class="i">opencode</code>). El <b>planificador</b> explora la app y escribe un plan de pruebas en Markdown, el <b>generador</b> convierte el plan en archivos de prueba y verifica los locators con la app en marcha, y el <b>sanador</b> ejecuta las pruebas que fallan y propone arreglos.'])}
${CO('note','Idea clave','Los agentes producen código normal de Playwright. Revísalo como el PR de un compañero: comprueba que las aserciones prueban de verdad el requisito y no aceptes nunca una «curación» que solo debilita una aserción.')}`]);
add('cypress',
 ['cy.intercept() en la práctica',`<p><code class="i">cy.intercept()</code> sirve tanto para <b>espiar</b> peticiones (y esperarlas) como para <b>simularlas</b> (y controlar las respuestas). Esperar a un alias es el sustituto fiable de <code class="i">cy.wait(3000)</code>.</p>
${P(0)}`],
 ['Pruebas de componentes',`<p>Las pruebas de componentes montan un solo componente en un navegador real, sin el resto de la app. Son más rápidas que las E2E y detectan pronto errores de renderizado e interacción.</p>
${P(0)}
<p>Cypress admite React, Vue, Angular y Svelte mediante adaptadores y usa el bundler de tu propia app (Vite o webpack).</p>`],
 ['cy.prompt(): pruebas en lenguaje natural',`<p><code class="i">cy.prompt()</code> recibe una lista de pasos en lenguaje natural, pide a un modelo de IA que los convierta en comandos de Cypress, los ejecuta y guarda el resultado en caché. Necesita Cypress Cloud y salió como función experimental, así que comprueba primero su estado actual.</p>
${P(0)}
${UL(['<b>Curación desde caché</b>: cuando un selector se rompe, Cypress prueba primero otros selectores candidatos guardados antes, sin llamar al modelo.','<b>Curación con IA</b>: si ninguno encaja, envía ese paso y la página actual al modelo y guarda el nuevo selector en caché.','<b>Exportar a código</b>: puedes guardar los comandos generados como código de prueba normal y dejar de depender del modelo.'])}
${CO('risk','Riesgo','La curación puede ocultar un cambio real. Si el botón «Iniciar sesión» pasó a ser «Continuar» sin avisar, la prueba curada pasa y nadie revisa un cambio visible para el usuario. Lee el registro de curaciones.')}`]);
add('selenium',
 ['Cómo está montado Selenium 4',T(['Pieza','Qué hace'],[
  ['W3C WebDriver','El protocolo HTTP estándar entre tu código y el driver del navegador'],
  ['Bindings de lenguaje','Clientes Java, Python, C#, JavaScript y Ruby para el mismo protocolo'],
  ['Drivers de navegador','chromedriver, geckodriver, msedgedriver, safaridriver: traducen comandos en acciones del navegador'],
  ['Selenium Manager','Incluido desde la 4.6: encuentra o descarga el driver (y el navegador) adecuado automáticamente'],
  ['WebDriver BiDi','El protocolo bidireccional más nuevo sobre WebSocket: logs de consola, eventos de red y más llegan de vuelta a la prueba'],
  ['Grid 4','Router, distributor, session map, session queue, event bus y nodos; en modo standalone, hub-and-node o totalmente distribuido']])],
 ['Locators relativos y un page object en Java',`${P(0)}
<p>Los locators relativos (<code class="i">above</code>, <code class="i">below</code>, <code class="i">toLeftOf</code>, <code class="i">toRightOf</code>, <code class="i">near</code>) ayudan cuando un elemento no tiene un buen atributo, pero dependen de la maquetación, así que prefiere antes IDs, atributos de prueba o nombres accesibles.</p>`],
 ['Selenium e IA',`<p>Selenium no trae IA integrada, pero su ecosistema sí:</p>
${UL(['<b>Healenium</b>: una librería de código abierto que envuelve WebDriver y, cuando falla un locator, elige el elemento más parecido de la última ejecución correcta.','<b>Plataformas comerciales</b> (Katalon, Testim, Mabl y otras) añaden autorreparación y generación sobre una ejecución al estilo WebDriver.','<b>Vibium</b>: un proyecto nuevo del creador de Selenium, basado en WebDriver BiDi, para agentes de IA y personas. Tiene su propio módulo en este curso.'])}`]);

M['framework-landscape']={title:'Más allá de los tres grandes: otros frameworks',
 sum:'WebdriverIO, Robot Framework, Cucumber, Appium, Karate, Puppeteer y otros: para qué sirve cada uno y cuándo elegirlo.',
 sections:[
  ['Qué aprenderás',UL(['Nombrar las principales herramientas fuera de Playwright, Cypress y Selenium','Distinguir un runner de pruebas de una capa BDD, un framework de palabras clave y un driver móvil','Elegir herramienta según el lenguaje del equipo, el tipo de app y la infraestructura existente'])],
  ['El panorama de un vistazo',T(['Herramienta','Tipo','Lenguaje','Elígela para'],[
   ['WebdriverIO','Framework de pruebas sobre WebDriver y BiDi','JavaScript / TypeScript','Un equipo JS que necesita estándares WebDriver, móvil con Appium o muchos servicios'],
   ['Robot Framework','Framework de palabras clave','Python (palabras clave en texto plano)','Equipos con perfiles mixtos, pruebas de aceptación, RPA; usa SeleniumLibrary o Browser (Playwright)'],
   ['Cucumber / BDD estilo SpecFlow','Capa Gherkin sobre un driver','Java, JS, Ruby, .NET…','Ejemplos compartidos escritos con negocio, no solo «pruebas en inglés»'],
   ['Appium','Driver de automatización móvil (protocolo WebDriver)','Cualquier cliente WebDriver','Apps nativas, híbridas y web móvil en iOS y Android'],
   ['Karate','DSL de pruebas de API (también UI y rendimiento)','DSL tipo Gherkin sobre la JVM','Pruebas de API sin escribir mucho Java; aserciones JSON integradas'],
   ['REST Assured','Librería de pruebas de API','Java','Equipos Java que escriben comprobaciones de API junto a las unitarias'],
   ['Puppeteer','Librería de control del navegador','JavaScript','Scripts para Chrome/Firefox, scraping, PDFs; no es un runner de pruebas'],
   ['TestCafe','Framework E2E','JavaScript / TypeScript','Sin WebDriver, configuración sencilla, funciona en cualquier navegador mediante un proxy'],
   ['Nightwatch','Framework E2E sobre WebDriver','JavaScript','Un runner WebDriver todo en uno con pruebas de componentes'],
   ['Serenity BDD','Capa de informes y Screenplay','Java / JS','Informes de «documentación viva» y el patrón Screenplay']])],
  ['Capas, no rivales',`<p>Muchas de estas herramientas se apilan en lugar de competir. Una suite empresarial típica podría ser <b>Cucumber</b> (escenarios) → <b>Serenity</b> (Screenplay e informes) → <b>Selenium</b> (navegador) → <b>Grid</b> (infraestructura). Una suite móvil podría ser <b>WebdriverIO</b> → <b>Appium</b> → una nube de dispositivos.</p>
${T(['Capa','Pregunta que responde','Ejemplos'],[
   ['Especificación','¿Cómo describimos el comportamiento?','Gherkin, tablas de palabras clave de Robot'],
   ['Runner','¿Cómo se encuentran, ejecutan, reintentan e informan las pruebas?','Playwright Test, Jest, JUnit, pytest, Mocha, TestNG'],
   ['Driver','¿Cómo controlamos la app?','WebDriver, BiDi, CDP, Appium, protocolo de Playwright'],
   ['Infraestructura','¿Dónde se ejecuta?','Selenium Grid, nubes de dispositivos, contenedores de CI'],
   ['Informes','¿Cómo lee la gente los resultados?','Allure, Serenity, reporters HTML, paneles en la nube']])}`],
  ['Elegir: tres preguntas',OL(['<b>¿En qué lenguaje escribe ya el equipo?</b> Una herramienta en un lenguaje que nadie del equipo conoce acabará abandonada.','<b>¿Qué app es?</b> Solo web, móvil, escritorio, mucha API o una mezcla.','<b>¿Qué existe ya?</b> Un Grid que funciona, una nube de dispositivos o miles de pruebas en Selenium cambian las cuentas.'])+CO('tip','Consejo','Haz una prueba de concepto de dos semanas con tus tres escenarios reales más difíciles (login con MFA, subida de archivos, un widget de terceros inestable), no con un sitio de demostración.')],
 ],
 quiz:[
  ['¿Qué herramienta está pensada para apps nativas de iOS y Android mediante el protocolo WebDriver?',['Puppeteer','Appium','Karate','TestCafe'],'Appium extiende WebDriver a apps nativas, híbridas y web móvil.'],
  ['En una pila Cucumber → Serenity → Selenium → Grid, ¿qué aporta Cucumber?',['El control del navegador','La infraestructura remota','La capa de especificación: escenarios en Gherkin','Solo informes HTML'],'Cucumber convierte los escenarios Gherkin en llamadas a pasos; el driver y el grid hacen el trabajo con el navegador.'],
  ['Tu equipo Java quiere pruebas de API con poco código y comparación JSON integrada. ¿Mejor opción?',['Karate','Puppeteer','Nightwatch','Pruebas de componentes de Cypress'],'Karate es un DSL de la JVM hecho para pruebas de API con aserciones JSON integradas.'],
 ]};

M['katalon']={title:'Katalon',
 sum:'Una plataforma low-code comercial sobre Selenium y Appium: graba, escribe scripts en Groovy y ejecuta pruebas web, de API, móviles y de escritorio desde un solo IDE.',
 sections:[
  ['Qué aprenderás',UL(['Describir qué añade Katalon Studio sobre Selenium y Appium','Leer una prueba de Katalon que usa el Object Repository y palabras clave integradas','Nombrar las funciones de IA de Katalon y qué comprobar antes de fiarte de ellas','Sopesar una plataforma low-code frente a un framework en código'])],
  ['Qué es',`<p><b>Katalon Studio</b> es un IDE de pruebas basado en Eclipse. Por debajo controla los navegadores con <b>Selenium</b> y los móviles con <b>Appium</b>, y añade una grabadora, un <b>Object Repository</b> de locators, cientos de palabras clave integradas, archivos de datos e informes. Las pruebas se pueden construir en una <b>vista manual (de tabla)</b> o escribir en <b>Groovy</b> en la vista de script; las dos editan la misma prueba.</p>
${T(['Pieza','Qué hace'],[
   ['Katalon Studio','El IDE de escritorio para pruebas web, de API, móviles y de escritorio Windows'],
   ['Runtime Engine (KRE)','Ejecuta proyectos de Studio desde la línea de comandos en CI; con licencia aparte'],
   ['TestOps / TruePlatform','Planificación, resultados, analítica y programación entre proyectos'],
   ['TestCloud','Navegadores y dispositivos alojados donde ejecutar'],
   ['TrueTest','Genera pruebas de regresión a partir de cómo se mueven los usuarios reales en producción'],
   ['Asistente de IA (antes StudioAssist)','Convierte pasos en lenguaje natural en código de prueba y explica el código existente']])}`],
  ['Una prueba en la vista de script',`${P(0)}
<p><code class="i">findTestObject()</code> busca un locator por su nombre en el Object Repository, así que un botón que cambia se arregla en un solo sitio. Los valores de <code class="i">GlobalVariable</code> salen de los perfiles de ejecución (dev, staging…).</p>`],
  ['Funciones de IA integradas',UL(['<b>Autorreparación</b>: cuando falla el locator principal, Katalon prueba los otros locators guardados para ese objeto (XPath, CSS, atributos, imagen) y registra el cambio para revisarlo.','<b>Smart Wait</b>: espera a que la página deje de cambiar antes de actuar.','<b>Asistente de IA</b>: genera código a partir de comentarios y explica o refactoriza el código seleccionado.','<b>TrueTest</b>: construye pruebas a partir de sesiones reales de usuarios y las regenera cuando cambia un flujo.'])+CO('risk','Riesgo','Aprueba los locators reparados de vuelta en el repositorio. Una ejecución reparada que nadie revisa puede ocultar un cambio real de UI.')],
  ['Ventajas e inconvenientes',T(['Ventajas','Inconvenientes'],[
   ['Arranque rápido para equipos con poca experiencia programando','Licencias: las ejecuciones en CI y las funciones avanzadas requieren licencias de pago'],
   ['Web, API, móvil y escritorio en una sola herramienta','Los proyectos viven en el formato propio de Katalon, lo que dificulta salir'],
   ['Grabadora más Groovy cuando necesitas código','Groovy y Eclipse parecen anticuados a muchos desarrolladores JS/TS'],
   ['Informes, analítica y programación incluidos','Más pesado de ejecutar en contenedores que un proyecto Node o Java sencillo']])+CO('tip','Consejo','Katalon encaja con equipos de perfiles mixtos que necesitan amplitud rápido. Para un equipo web liderado por desarrolladores que ya trabaja en TypeScript, un framework en código suele salir más barato con el tiempo.')],
 ],
 quiz:[
  ['¿Qué usa Katalon Studio por debajo para controlar los navegadores web?',['Su propio motor de navegador','Selenium WebDriver','Cypress','Solo Puppeteer'],'Katalon se apoya en Selenium para web y en Appium para móvil, con su propio IDE y palabras clave encima.'],
  ['¿Por qué guarda Katalon los locators en un Object Repository?',['Para que las pruebas vayan más rápido','Para que un elemento que cambia se arregle en un solo sitio para todas las pruebas que lo usan','Porque Groovy no puede guardar cadenas','Para cifrar contraseñas'],'Los locators centralizados siguen la misma idea que los page objects: un cambio, muchas pruebas arregladas.'],
  ['¿Qué necesitas para ejecutar pruebas de Katalon desde un servidor de CI?',['Nada aparte de Studio','El Runtime Engine (KRE) con licencia','Una cuenta de Cypress Cloud','Selenium IDE'],'La ejecución por línea de comandos en CI usa Katalon Runtime Engine, que requiere licencia.'],
 ]};

M['applitools']={title:'Applitools y Visual AI',
 sum:'Pruebas visuales que comparan pantallas como lo haría una persona: Eyes, niveles de coincidencia, Ultrafast Grid y la plataforma Autonomous.',
 sections:[
  ['Qué aprenderás',UL(['Explicar por qué la comparación de píxeles es ruidosa y cómo Visual AI reduce el ruido','Elegir un nivel de coincidencia para una página','Añadir un punto de control visual a una prueba de Playwright o Cypress','Revisar referencias sin aprobar errores reales'])],
  ['Píxeles frente a Visual AI',`<p>Una comparación de píxeles marca cualquier píxel cambiado: el antialiasing, una fuente que se renderizó 1px más ancha, un carrusel en movimiento. Los equipos suben entonces los umbrales hasta que se cuelan errores reales. <b>Applitools Eyes</b> compara las páginas de forma <b>estructural</b>, reconociendo texto, imágenes, maquetación y regiones, así que ignora el ruido de renderizado pero sigue detectando un botón que falta o un texto que se solapa.</p>
${T(['','Comparación de píxeles','Visual AI (Eyes)'],[
   ['Antialiasing y desplazamientos subpíxel','Falla a menudo','Se ignora'],
   ['Elemento que falta o se solapa','Falla','Falla'],
   ['Texto dinámico (fechas, nombres)','Hay que enmascararlo','Nivel Layout o Dynamic'],
   ['Muchos navegadores y dispositivos','Una ejecución por navegador','Capturar una vez, renderizar en el Ultrafast Grid']])}`],
  ['Niveles de coincidencia',T(['Nivel','Compara','Úsalo para'],[
   ['Strict (por defecto)','Lo que notaría una persona: contenido, color, posición','La mayoría de páginas'],
   ['Layout','Estructura y alineación, no el texto ni las imágenes','Páginas con contenido cambiante, como portadas de noticias'],
   ['Ignore Colors','Todo salvo el color','Cambios de tema, comprobaciones del modo oscuro'],
   ['Dynamic','Patrones de texto (fechas, emails, números) en lugar de valores exactos','Paneles con datos en vivo'],
   ['Exact','Píxel a píxel','Rara vez; gráficos o imágenes que deben ser idénticos']])+`<p>También puedes marcar <b>regiones</b> en la referencia: ignore, floating, layout-only, etc., para un widget en vez de toda la página.</p>`],
  ['Añadir Eyes a una prueba',`${P(0)}
<p>La clave de API sale de la variable de entorno <code class="i">APPLITOOLS_API_KEY</code>. Los nombres y opciones de los SDK cambian entre versiones, así que copia de la documentación actual.</p>`],
  ['Ultrafast Grid y Autonomous',UL(['<b>Ultrafast Grid</b>: la prueba se ejecuta una vez en un navegador; Eyes captura el DOM y el CSS y los renderiza en paralelo en la nube en muchos navegadores, tamaños de ventana y dispositivos.','<b>Revisión de referencias</b>: las diferencias aparecen en el panel de Eyes, donde alguien las acepta (nueva referencia) o las rechaza (error). Los cambios se pueden agrupar para que una decisión cubra muchas pantallas.','<b>Applitools Autonomous</b>: una plataforma aparte que recorre el sitio y permite escribir pruebas funcionales, visuales y de API en inglés natural, con comprobaciones de Visual AI en cada paso.'])+CO('risk','Riesgo','Aceptar una referencia es una decisión de prueba. Acordad quién puede aceptar y no aceptéis nunca en bloque diferencias que no habéis mirado: eso convierte un error real en el nuevo resultado esperado.')],
 ],
 quiz:[
  ['Los titulares de una web de noticias cambian cada hora, pero la maquetación debe seguir igual. ¿Qué nivel de coincidencia?',['Exact','Strict','Layout','No hace falta'],'Layout comprueba estructura y alineación e ignora el texto y las imágenes que cambian.'],
  ['¿Cómo cubre el Ultrafast Grid muchos navegadores con rapidez?',['Ejecuta la prueba completa una vez por navegador en máquinas locales','Captura el DOM y el CSS una vez y los renderiza en muchos navegadores en la nube','Hace una sola captura','Convierte las pruebas a Selenium'],'Capturar una vez, renderizar en todas partes: la prueba funcional se ejecuta una sola vez.'],
  ['¿Cuál es el principal peligro al revisar referencias visuales?',['El panel es lento','Aceptar un error real como nueva referencia','Demasiados niveles de coincidencia','Las capturas son muy grandes'],'Una vez aceptado, el error pasa a ser el resultado esperado y las ejecuciones siguientes pasan.'],
 ]};

M['vibium']={title:'Vibium: automatización de navegador para la era de la IA',
 sum:'Un proyecto joven de código abierto del creador de Selenium: un binario pequeño, WebDriver BiDi por debajo y un servidor MCP para que agentes de IA y pruebas compartan el mismo navegador.',
 sections:[
  ['Qué aprenderás',UL(['Explicar de dónde viene Vibium y qué problema ataca','Describir su arquitectura: cliente, binario, BiDi, navegador','Escribir un primer script y conectarlo a un asistente de IA','Decidir si una herramienta tan joven está lista para tu suite'])],
  ['Por qué existe',`<p>Jason Huggins creó <b>Selenium</b> (2004) y <b>Appium</b> (2012). <b>Vibium</b> es su proyecto para la era de la IA: automatización de navegador que funciona igual de bien para una persona que escribe pruebas que para un agente de IA que navega por un sitio. Es gratuito y de código abierto (Apache 2.0).</p>
${T(['Idea','Qué significa'],[
   ['WebDriver BiDi','Basado en el protocolo bidireccional del W3C en lugar del WebDriver HTTP clásico o del CDP exclusivo de Chrome'],
   ['Un solo binario','Un único programa en Go («clicker») gestiona el navegador; la primera vez descarga Chrome for Testing'],
   ['Espera automática','Las acciones esperan a que el elemento sea visible, estable, esté habilitado y pueda recibir el evento'],
   ['MCP integrado','El mismo binario expone un servidor MCP para que un asistente controle el navegador directamente'],
   ['Clientes ligeros','Clientes JavaScript/TypeScript y Python sobre el mismo motor']])}`],
  ['Un primer script',`${P(0)}
${CO('note','Compruébalo antes','Vibium es nuevo y su API sigue cambiando. Toma este ejemplo como la forma de la API y copia las llamadas exactas del README del proyecto.')}`],
  ['¿Deberías adoptarlo?',T(['Tenlo en cuenta para','Espera si necesitas'],[
   ['Dar a agentes de IA un navegador mediante MCP','Un runner maduro con fixtures, sharding e informes HTML'],
   ['Scripts pequeños y experimentos sobre un protocolo estándar','Garantías de soporte a largo plazo para una gran suite de regresión'],
   ['Entender hacia dónde va WebDriver BiDi','Una comunidad amplia, plugins y facilidad para contratar']])+CO('tip','Consejo','Una forma segura de probarlo: usa Vibium para explorar y reproducir errores con ayuda de IA, y mantén tu suite de regresión en un framework consolidado hasta que el runner de Vibium madure.')],
 ],
 quiz:[
  ['¿Sobre qué protocolo está construido Vibium?',['Solo WebDriver HTTP clásico','WebDriver BiDi','El runner dentro del navegador de Cypress','Microsoft UI Automation'],'Vibium habla el protocolo W3C WebDriver BiDi sobre WebSockets.'],
  ['¿Qué permite a un asistente de IA controlar el navegador de Vibium?',['Una extensión de Chrome','Su servidor MCP integrado','Selenium Grid','Un plugin de Katalon'],'El binario de Vibium expone un servidor MCP al que se pueden conectar los asistentes.'],
  ['¿Quién creó Vibium?',['Los fundadores de Cypress','Jason Huggins, creador de Selenium y Appium','El equipo de Playwright en Microsoft','Katalon'],'Vibium es el proyecto de Jason Huggins, después de Selenium (2004) y Appium (2012).'],
 ]};

M['ai-test-automation']={title:'IA en la automatización de pruebas, en la práctica',
 sum:'Cómo aparece la IA en Playwright, Cypress, Selenium, Katalon, Applitools y Vibium, en qué es buena y qué salvaguardas mantienen fiable una suite.',
 sections:[
  ['Qué aprenderás',UL(['Nombrar cinco usos actuales de la IA en la automatización de pruebas','Comparar las funciones de IA de las principales herramientas','Montar un flujo con agentes y revisión humana','Detectar los modos de fallo: curaciones falsas, aserciones débiles, fugas de datos'])],
  ['Cinco usos de la IA',T(['Uso','Qué ocurre','Ejemplos'],[
   ['Generación','Pasos en lenguaje natural o un recorrido de la app se convierten en código de prueba','Agente generador de Playwright, cy.prompt(), asistente de IA de Katalon, Applitools Autonomous'],
   ['Autorreparación','Un locator roto se sustituye por la mejor coincidencia','Katalon, caché de cy.prompt(), Healenium, agente sanador de Playwright'],
   ['Visual AI','Las pantallas se comparan como lo haría una persona','Applitools Eyes'],
   ['Navegación por agentes','Un asistente controla un navegador real mediante MCP','Playwright MCP, Vibium'],
   ['Análisis','Los fallos se agrupan y se sugiere una causa probable','Paneles en la nube, detección de pruebas inestables']])],
  ['Las herramientas lado a lado',T(['Herramienta','Funciones de IA','Dónde se ejecuta'],[
   ['Playwright','Servidor MCP; agentes planificador, generador y sanador que producen código de prueba normal','Tu máquina y CI; código abierto'],
   ['Cypress','Pasos en lenguaje natural con cy.prompt(), con curación desde caché y con IA','Requiere Cypress Cloud'],
   ['Selenium','Ninguna integrada; Healenium y capas comerciales añaden curación','Tu infraestructura'],
   ['Katalon','Autorreparación, Smart Wait, asistente de IA, TrueTest a partir de sesiones de usuarios','Plataforma Katalon; planes de pago'],
   ['Applitools','Visual AI, pruebas Autonomous en inglés natural','Nube de Applitools'],
   ['Vibium','Servidor MCP integrado; pensado para agentes y personas','Tu máquina; código abierto']])],
  ['Un flujo con agentes y revisión',OL(['<b>Planificar</b>: un agente explora la app y escribe un plan en Markdown. Un tester lo edita: añade riesgos y quita lo trivial.','<b>Generar</b>: el agente escribe pruebas con las fixtures y page objects del proyecto (indícaselos).','<b>Revisar</b>: una persona lee cada aserción. ¿Comprueba el requisito o solo que la página cargó?','<b>Ejecutar en CI</b>: las pruebas generadas pasan por los mismos gates que las escritas a mano.','<b>Curar con aprobación</b>: los arreglos propuestos llegan como pull request, nunca como un cambio silencioso.'])+CO('tip','Consejo','Mantén un <code class="i">AGENTS.md</code> corto o un archivo de instrucciones: reglas de locators, qué fixtures usar, qué no simular nunca. Los agentes siguen mucho mejor las reglas escritas que las implícitas.')],
  ['Modos de fallo y salvaguardas',T(['Modo de fallo','Salvaguarda'],[
   ['Una curación hace clic en un elemento parecido pero equivocado','Registrar cada curación; hacer fallar el build si hay curaciones en flujos críticos'],
   ['Las aserciones generadas son débiles («la página tiene título»)','Checklist de revisión: cada prueba debe comprobar un resultado de negocio'],
   ['La curación oculta un cambio real de UI','Tratar las curaciones como elementos a revisar, no como arreglos'],
   ['Los prompts y datos de las páginas salen de tu red','Solo datos de prueba; revisa cómo conserva los datos el proveedor'],
   ['Generación no determinista','Hacer commit del código generado; no regenerarlo en cada ejecución'],
   ['Los costes crecen con cada llamada a la IA','Guardar resultados en caché; llamar al modelo solo cuando algo cambia']])+CO('risk','Riesgo','Una IA que pone en verde una prueba roja no ha arreglado nada hasta que una persona confirma que el producto está bien. El objetivo son menos fallos falsos, no menos fallos.')],
 ],
 quiz:[
  ['Un sanador de IA cambió un locator y la prueba de pago vuelve a pasar. ¿Qué debe ocurrir después?',['Nada, la prueba está en verde','Una persona revisa la curación, porque el propio cambio de UI puede ser un error','Borrar el historial de locators antiguos','Desactivar la curación en todas partes'],'Una curación es una propuesta. La UI cambió por algún motivo, y ese motivo puede ser un defecto.'],
  ['¿Los agentes de IA de qué herramienta producen archivos de prueba normales que subes al repositorio?',['Agentes de prueba de Playwright','Applitools Ultrafast Grid','Katalon TestOps','Selenium Grid'],'El planificador, el generador y el sanador producen y editan código normal de Playwright.'],
  ['¿Por qué hacer commit del código de prueba generado por IA en lugar de regenerarlo en cada ejecución?',['La generación no es determinista, así que cada ejecución podría probar algo distinto','Lo exige git','Los modelos no funcionan en CI','Hace las pruebas más lentas'],'Lo que importa es una prueba estable y revisada. Regenerarla en cada ejecución hace que los resultados no sean comparables.'],
 ]};

if(TR.es.tracks)TR.es.tracks.tools=['Las herramientas','Playwright, Cypress, Selenium, Katalon, Applitools, Vibium y el panorama más amplio de frameworks.'];
(TR.es.glossary=TR.es.glossary||[]).push(
 ['Katalon Studio','Un IDE de pruebas low-code sobre Selenium y Appium, con grabadora, Object Repository y scripts en Groovy.'],
 ['Object Repository','El almacén central de locators con nombre de Katalon, para que un elemento que cambia se arregle una sola vez.'],
 ['Visual AI','Comparar pantallas de forma estructural, como lo haría una persona, en lugar de píxel a píxel (Applitools Eyes).'],
 ['Nivel de coincidencia','Lo estricta que es la comparación de Applitools en un punto de control: Strict, Layout, Ignore Colors, Dynamic o Exact.'],
 ['Ultrafast Grid','La nube de Applitools que renderiza un DOM capturado en muchos navegadores y dispositivos en paralelo.'],
 ['Vibium','Automatización de navegador de código abierto para la era de la IA, del creador de Selenium, sobre WebDriver BiDi y con servidor MCP.'],
 ['WebDriver BiDi','El protocolo bidireccional del W3C sobre WebSocket para automatizar navegadores, sucesor del WebDriver HTTP clásico.'],
 ['Selenium Manager','Incluido en Selenium 4.6+: encuentra o descarga automáticamente el driver de navegador adecuado.'],
 ['cy.intercept()','Comando de Cypress que espía o simula peticiones de red; espera a su alias en lugar de hacer pausas.'],
 ['cy.prompt()','Comando de Cypress que convierte pasos en lenguaje natural en comandos en caché que se autorreparan (requiere Cypress Cloud).'],
 ['Agentes de prueba de Playwright','Definiciones de agentes planificador, generador y sanador que planifican, escriben y reparan pruebas de Playwright.'],
 ['MCP','Model Context Protocol: una forma estándar de que los asistentes de IA llamen a herramientas, como controlar un navegador.'],
 ['Referencia visual','La captura o instantánea aprobada con la que compara una prueba visual; aceptarla es una decisión de prueba.'],
 ['Appium','Un driver basado en WebDriver para apps nativas, híbridas y web móvil en iOS y Android.'],
 ['Gherkin','El lenguaje Given / When / Then de los escenarios de Cucumber, compartido con negocio.'],
);
})();
