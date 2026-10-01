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

/* ---------- v6: laboratorios prácticos, chuletas y preparación profesional ---------- */
add('playwright',
 ['Laboratorio práctico',`<p>Practica en la propia app de demostración de Playwright: solo necesitas <code class="i">npm init playwright@latest</code>:</p>
${OL(['Apunta tus pruebas a <a href="https://demo.playwright.dev/todomvc" target="_blank" rel="noopener">demo.playwright.dev/todomvc</a>.','Escribe una prueba que añada tres tareas, marque una como completada y compruebe el número restante.','Escribe una segunda prueba que filtre por «Active» y «Completed» y compruebe la lista visible cada vez.','Añade una tercera prueba que recargue la página y compruebe que las tareas sobrevivieron (local storage).','Ejecuta primero con <code class="i">--ui</code> para construirla de forma interactiva, luego en modo headless de CI, y revisa el informe HTML.'])}
${CO('tip','Reto adicional','Súbelo a un repositorio público de GitHub con un workflow de GitHub Actions que se ejecute en cada push. Ese repositorio es material de portafolio — mira «Preparación profesional».')}`]);
add('cypress',
 ['Laboratorio práctico',`<p>Cypress trae su propia app de práctica para esto — no hace falta levantar ningún servidor:</p>
${OL(['Crea el proyecto con <code class="i">npm init cypress@latest</code> y pon <code class="i">baseUrl</code> apuntando a <a href="https://example.cypress.io" target="_blank" rel="noopener">example.cypress.io</a>.','Escribe una prueba para la página «Actions»: escribe en un campo con <code class="i">.type()</code> y comprueba el valor con <code class="i">.should(\'have.value\', ...)</code>.','Escribe una segunda prueba para la página «Network Requests» usando <code class="i">cy.intercept()</code> para simular una petición y comprobar que la UI reacciona.','Añade un comando propio (<code class="i">Cypress.Commands.add</code>) para un paso repetido y úsalo en las dos pruebas.'])}
${CO('tip','Reto adicional','Abre el Command Log de Cypress mientras se ejecuta una prueba y recorre cada comando hacia atrás — es la forma más rápida de coger el hábito de leer los fallos.')}`]);
add('selenium',
 ['Laboratorio práctico',`<p><a href="https://the-internet.herokuapp.com" target="_blank" rel="noopener">the-internet.herokuapp.com</a> es un sitio de práctica estable y de larga trayectoria, creado justo para esto:</p>
${OL(['Automatiza la página «Dynamic Loading»: pulsa iniciar, usa un <code class="i">WebDriverWait</code> explícito para esperar a que aparezca el texto y luego compruébalo.','Automatiza la página «Multiple Windows»: cambia al handle de la ventana nueva, comprueba su texto y luego vuelve a cambiar.','Automatiza un inicio de sesión en la página «Form Authentication», incluido el caso negativo (una contraseña incorrecta muestra un mensaje flash).','Envuelve la página en una pequeña clase page object con métodos con nombre, tal como describe <a href="#framework-architecture">Arquitectura del framework y POM</a>.'])}
${CO('risk','Riesgo','Resiste la tentación de usar <code class="i">Thread.sleep()</code> para que pase la página de carga dinámica. Usa en su lugar <code class="i">WebDriverWait</code> con <code class="i">ExpectedConditions</code> — ese es justamente el sentido del ejercicio.')}`]);

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
  ['Añadir Eyes a una prueba',`<p>Añade un punto de control visual junto a tu prueba existente — una sola llamada, cualquiera de las dos herramientas:</p>
${P(0)}
${P(1)}
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

TR.es.resourcesHtml=`
<section class="sec"><h2>Chuleta de comandos</h2>
<p>Las mismas cinco acciones, tres herramientas. Suficiente para tener una primera prueba funcionando mientras buscas el resto.</p>
${T(['Acción','Playwright','Cypress','Selenium (Java)'],[
 ['Abrir una página','<code class="i">await page.goto(url)</code>','<code class="i">cy.visit(url)</code>','<code class="i">driver.get(url)</code>'],
 ['Buscar y hacer clic','<code class="i">page.getByRole(\'button\',{name}).click()</code>','<code class="i">cy.get(sel).click()</code>','<code class="i">driver.findElement(by).click()</code>'],
 ['Escribir texto','<code class="i">locator.fill(value)</code>','<code class="i">cy.get(sel).type(value)</code>','<code class="i">element.sendKeys(value)</code>'],
 ['Comprobar visibilidad','<code class="i">await expect(locator).toBeVisible()</code>','<code class="i">cy.get(sel).should(\'be.visible\')</code>','<code class="i">wait.until(ExpectedConditions.visibilityOf(el))</code>'],
 ['Comprobar texto','<code class="i">await expect(locator).toHaveText(x)</code>','<code class="i">cy.get(sel).should(\'have.text\',x)</code>','<code class="i">assertEquals(x, el.getText())</code>'],
 ['Contar coincidencias','<code class="i">await locator.count()</code>','<code class="i">cy.get(sel).its(\'length\')</code>','<code class="i">driver.findElements(by).size()</code>'],
 ['Esperar','Espera automática, integrada','Aserciones con reintento automático, integradas','<code class="i">new WebDriverWait(driver, d)</code>'],
 ['Simular la red','<code class="i">page.route(url, handler)</code>','<code class="i">cy.intercept(method, url)</code>','No integrado (necesita una librería proxy)'],
 ['Captura de pantalla','<code class="i">await page.screenshot({path})</code>','<code class="i">cy.screenshot()</code>','<code class="i">((TakesScreenshot)driver).getScreenshotAs(FILE)</code>'],
 ['Ejecutar en headless','Por defecto','<code class="i">cypress run</code>','<code class="i">ChromeOptions().addArguments(\'--headless=new\')</code>'],
])}
<h3>Prioridad de locators, versión rápida</h3>
${OL(['Un rol visible y un nombre accesible (<code class="i">getByRole</code> / locators de rol ARIA) — coincide con lo que percibe una persona.','Texto de la etiqueta o del placeholder para campos de formulario.','Un atributo de prueba dedicado (<code class="i">data-testid</code>, <code class="i">data-cy</code>) cuando no hay un buen nombre accesible.','Un selector CSS estable como último recurso.','XPath, solo cuando nada más funciona: se rompe con los cambios de maquetación y es lo más difícil de releer después.'])}
${CO('note','Misma idea, tres herramientas','La convención <code class="i">getByRole</code> de Playwright, la de <code class="i">cy.get(\'[data-cy=...]\')</code> de Cypress y los locators relativos de Selenium resuelven todos el mismo problema: encontrar el elemento como lo haría una persona, no por su posición en el DOM.')}
</section>
<section class="sec"><h2>Referencias oficiales seleccionadas</h2>
<p>Marcadores, no deberes — las fuentes primarias con las que se verificó este propio curso.</p>
<div class="grid grid--wide">
${resGroup('Herramientas principales',['pw','cy','se'])}
${resGroup('Más allá de los tres grandes',['wdio','robot','cucumber','appium','karate'])}
${resGroup('Visual y low-code',['katalon','apeyes'])}
${resGroup('IA y agentes',['mcp','pwmcp','vibium','bidi'])}
${resGroup('Certificación',['istqb','istqbc','bcs','atsqa'])}
</div>
</section>
<section class="sec"><h2>Elegir herramienta, en resumen</h2>
${T(['','Playwright','Cypress','Selenium'],[
 ['Navegadores','Chromium, Firefox, WebKit','Familia Chromium, Firefox','Cualquiera, vía WebDriver'],
 ['Lenguajes','JS/TS, Python, Java, .NET','Solo JS/TS','Java, C#, Python, JS, Ruby…'],
 ['Mejor para','Proyectos web nuevos que quieren velocidad y herramientas integradas','Equipos de front-end que quieren un ciclo de desarrollo local rápido','Sistemas grandes, multilenguaje o heredados; móvil vía Appium'],
])}
${CO('tip','Profundiza más','La comparación completa está en «Comparar las tres»; el «Selector de herramientas» interactivo tiene en cuenta tus propias restricciones.')}</section>`;

TR.es.careerHtml=`
<section class="sec"><h2>Banco de preguntas de entrevista</h2>
<p>No es un guion para memorizar — úsalas para comprobar que sabes explicar el «por qué», no solo el «cómo».</p>
${carCat('Fundamentos',[
 ['¿Cuál es la diferencia entre testing y checking?','El checking confirma un comportamiento conocido y especificado (lo que la automatización hace bien). El testing también investiga lo desconocido — explora, cuestiona supuestos, juzga si el producto realmente cumple su propósito. La automatización comprueba; las personas siguen probando.'],
 ['¿Por qué no automatizarlo todo?','Algunas comprobaciones (un juicio visual puntual, las pruebas exploratorias, la usabilidad) son más baratas o solo posibles a mano. La pirámide de pruebas guía dónde la automatización se rentabiliza antes: muchas pruebas unitarias rápidas, menos pruebas de API, y todavía menos pruebas end-to-end lentas y frágiles.'],
 ['Explica la pirámide de pruebas y el antipatrón del «cucurucho de helado».','La pirámide favorece muchas pruebas unitarias rápidas y aisladas, una capa intermedia de pruebas de API/integración y una capa superior delgada de pruebas E2E de UI. El «cucurucho de helado» lo invierte — sobre todo pruebas de UI lentas e inestables y pocas unitarias —, lo que es lento de ejecutar y caro de mantener.'],
 ['¿Qué es un test double y nombra dos tipos.','Un test double sustituye a una dependencia real. Un <b>stub</b> devuelve respuestas preparadas; un <b>mock</b> además verifica que se llamó correctamente. Otros: dummy (nunca se usa, solo rellena un parámetro), spy (registra llamadas sobre un objeto real), fake (una implementación funcional pero más ligera).'],
 ['¿Cómo decides qué automatizar primero?','Por riesgo: automatiza primero las comprobaciones que protegen los flujos de mayor riesgo, más frecuentes y más estables — donde una regresión sale cara y la UI/API difícilmente cambiará cada sprint.'],
])}
${carCat('Herramientas y diseño de frameworks',[
 ['¿Por qué podría un equipo elegir hoy Playwright en vez de Selenium?','Paralelismo integrado, espera automática, tracing y soporte multi-navegador (incluido WebKit) sin montar un Grid, además de un runner de pruebas de primer nivel — a cambio del ecosistema más amplio de lenguajes e infraestructura de Selenium.'],
 ['¿Qué problema resuelve el Page Object Model?','Centraliza los locators y las interacciones de página en una clase por página o componente, así un cambio de UI se arregla en un solo sitio en vez de en cada prueba que toca ese elemento.'],
 ['¿Qué es una prueba flaky y cómo la triarías?','Una prueba que pasa y falla sin cambios en el código. Triaje: reprodúcela con repeticiones, comprueba condiciones de tiempo/carrera, estado compartido o problemas de entorno, ponla en cuarentena fuera del gate obligatorio mientras investigas, y luego arregla la causa raíz en vez de añadir una espera más larga.'],
 ['¿Cómo estructurarías los datos de prueba para que las pruebas puedan ejecutarse en paralelo?','Cada prueba crea y es dueña de sus propios datos (mediante la API, no la UI), usa identificadores únicos para evitar colisiones, y limpia después de sí misma incluso si falla — ninguna prueba debería depender del estado que deja otra.'],
 ['¿Qué te haría rechazar en revisión una prueba generada por IA?','Una aserción débil que no comprueba el requisito real (por ejemplo, «la página tiene un título»), una estrategia de selectores que el equipo no usa, o un «arreglo» que simplemente debilita una aserción en vez de investigar por qué falló.'],
])}
${carCat('CI/CD y estrategia de calidad',[
 ['¿Qué debería incluir un quality gate de CI para un pull request?','Comprobaciones rápidas y deterministas: pruebas unitarias, lint, un subconjunto smoke de pruebas end-to-end y escaneo de secretos. Las suites de regresión completas y más lentas suelen ejecutarse por horario o tras el merge, sin bloquear cada PR.'],
 ['¿Cómo mides si la automatización realmente compensa?','La tasa de fuga de defectos (bugs que una prueba podría haber cazado pero no cazó), la tasa de «verde al reintentar» (inestabilidad), el tiempo hasta obtener feedback y el tiempo para diagnosticar un fallo — no solo el número de pruebas o el porcentaje de cobertura, que son fáciles de manipular.'],
 ['¿Qué es el sharding y para qué sirve?','Repartir una suite de pruebas entre varios workers o máquinas en paralelo, de modo que una ejecución que tardaría 40 minutos en serie termine en pocos minutos de reloj.'],
 ['¿Cómo mantienes los secretos fuera de un pipeline de CI?','Almacenes de secretos específicos de cada entorno (no archivos con commit), un <code class="i">.env.example</code> con commit que solo tenga marcadores de posición, y escaneo de secretos como parte del propio pipeline.'],
 ['Una suite que ayer estaba en verde hoy está en rojo sin cambios de código. ¿Qué compruebas primero?','Las dependencias externas (APIs de terceros, datos de prueba, cambios de entorno/infraestructura), y luego si es una única prueba flaky o un fallo sistémico, antes de asumir que el producto ha tenido una regresión.'],
])}
${carCat('Preguntas de comportamiento y escenarios',[
 ['Cuéntame una vez que una prueba detectó un error real antes del lanzamiento.','Describe la comprobación, qué detectó y — esto es importante — por qué existía esa comprobación (qué riesgo cubría), no solo que pasó.'],
 ['Cuéntame sobre una suite inestable que heredaste. ¿Qué hiciste?','Recorre el triaje, la decisión de cuarentena frente a arreglo, y cómo mediste la mejora (la tasa de inestabilidad bajando con el tiempo), no solo «lo arreglé».'],
 ['¿Cómo respondes cuando te piden automatizar todo lo que hace un tester manual?','Explica el equilibrio coste/beneficio usando la pirámide y la priorización basada en riesgo, y propón qué automatizarías primero y qué se queda manual, con razones.'],
 ['¿Cómo manejas un desacuerdo con un desarrollador sobre si algo es un error?','Céntrate en las evidencias (comportamiento esperado frente al real, referencia al requisito), mantén la curiosidad sobre su razonamiento, y escala con calma y con datos si seguís sin estar de acuerdo.'],
])}
</section>
<section class="sec"><h2>Ideas de proyectos de portafolio</h2>
<p>Un repositorio público vale más que una línea en el currículum. Elige uno, mantén el alcance lo bastante pequeño como para terminarlo, y escribe un README breve explicando tus decisiones.</p>
<div class="grid">
${carProject('Suite de regresión de API + UI','Construye una suite pequeña contra una app de demostración pública (las mismas de los laboratorios prácticos) que cubra tanto API como UI, con una capa de page objects y un workflow de GitHub Actions que reparta la ejecución con sharding.',['Diseño de framework','CI/CD','Pruebas de API'])}
${carProject('Suite de humo visual multi-navegador','Una suite de Playwright que ejecuta las mismas comprobaciones smoke en Chromium, Firefox y WebKit, con una herramienta de comparación visual de nivel gratuito conectada para una página clave.',['Multi-navegador','Pruebas visuales'])}
${carProject('Informe de triaje de pruebas flaky','Ejecuta una suite pequeña varias veces en CI, recopila los resultados y escribe un script o notebook breve que clasifique las pruebas por tasa de éxito y marque las probablemente flaky con evidencias.',['Fiabilidad','Informes'])}
${carProject('Generación asistida por IA, revisada','Usa una función de generación de pruebas con IA (por ejemplo, los agentes de prueba de Playwright) sobre una pequeña app de código abierto, y luego escribe qué aceptaste, qué rechazaste y por qué — la revisión es el punto central.',['IA en testing','Disciplina de revisión'])}
${carProject('Auditoría de accesibilidad','Ejecuta comprobaciones automáticas de accesibilidad (axe) en las páginas clave de un sitio real, triaja los hallazgos por gravedad, y escribe un informe breve que distinga lo que una herramienta puede detectar de lo que necesita revisión humana.',['Accesibilidad','Informes'])}
</div>
</section>
<section class="sec"><h2>Lista de comprobación: habilidades → oferta de empleo</h2>
<p>Lo que realmente significan las palabras de moda de una oferta y dónde lo cubre este curso.</p>
${T(['Verás…','Significa…','Cubierto en'],[
 ['Page Object Model / POM','Locators y acciones de página organizados en clases de página reutilizables','<a href="#framework-architecture">Arquitectura del framework y POM</a>'],
 ['Pipelines de CI/CD','Pruebas que se ejecutan automáticamente en cada push o pull request','<a href="#ci-cd">CI/CD y pruebas continuas</a>'],
 ['Pruebas de API','Probar los endpoints directamente, no solo a través de la UI','<a href="#api-testing">Pruebas de API</a>'],
 ['Pruebas multi-navegador','Las mismas pruebas ejecutándose en Chromium, Firefox y WebKit/Safari','<a href="#compare-tools">Comparar las tres</a>'],
 ['Gestión de pruebas flaky','Detectar, poner en cuarentena y arreglar pruebas que fallan de forma intermitente','<a href="#flaky-tests">Pruebas inestables y fiabilidad</a>'],
 ['Pruebas basadas en riesgo / shift-left','Priorizar qué automatizar según el riesgo y el coste de un fallo','<a href="#strategy-risk">Estrategia y automatización basada en riesgos</a>'],
 ['Pruebas de accesibilidad (a11y)','Comprobaciones automáticas (p. ej. axe) más revisión manual','<a href="#security-performance">Seguridad, privacidad y rendimiento</a>'],
 ['Pruebas asistidas por IA / agénticas','Usar IA para generar, curar o revisar pruebas, con supervisión humana','<a href="#ai-test-automation">IA en la automatización de pruebas, en la práctica</a>'],
 ['Pruebas de regresión visual','Detectar cambios de UI no intencionados comparando capturas o con Visual AI','<a href="#applitools">Applitools y Visual AI</a>'],
 ['ISTQB Foundation / CTFL','La certificación estándar de nivel inicial en testing','<a href="#istqb-ctfl">Lo esencial de ISTQB CTFL</a>'],
])}
${CO('note','Usar esto con responsabilidad','Manejar con soltura estos términos y saber discutir sus compromisos importa más que memorizar definiciones. Si usas herramientas de IA en una prueba de entrevista para casa, dilo abiertamente y prepárate para explicar qué revisaste y qué cambiaste.')}
</section>`;
})();
