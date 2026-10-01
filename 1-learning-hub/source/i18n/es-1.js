/* Español — Fundamentos y herramientas */
TR.es=TR.es||{modules:{}};
Object.assign(TR.es.modules,{
'what-is-automation':{title:'Qué es la automatización de pruebas',
 sum:'Software, independiente del sistema bajo prueba, que controla la ejecución de las pruebas y compara los resultados reales con los esperados.',
 sections:[
  ['Qué aprenderás',UL(['Definir la automatización de pruebas y el papel del oráculo de prueba','Enumerar en qué es buena la automatización y qué no puede hacer por ti','Distinguir un caso de prueba, un script, un framework y un pipeline','Estimar cuándo se amortiza una comprobación automatizada'])],
  ['Definición',`<p>La automatización de pruebas es el uso de software independiente del sistema bajo prueba para <b>controlar la ejecución de las pruebas</b> y <b>comparar los resultados reales con los esperados</b>. Las comprobaciones automatizadas se ejecutan sin interacción manual continua y suelen integrarse en las pruebas continuas y en CI/CD.</p>
   ${CO('note','Idea clave','La automatización no sustituye la experiencia en pruebas. Las personas siguen decidiendo qué probar, por qué importa, qué riesgos existen y si las comprobaciones automatizadas dan una cobertura significativa.')}`],
  ['En qué es buena la automatización',UL(['Comprobaciones de regresión repetibles','Grandes conjuntos de comprobaciones deterministas de API o UI','Retroalimentación rápida tras commits y pull requests','Ejecución en varios navegadores y entornos','Pruebas guiadas por datos','Suites smoke y sanity','Reverificación de correcciones','Ejecución en paralelo, si la infraestructura lo permite','Evidencia legible por máquina: logs, capturas, trazas, vídeos, informes'])],
  ['Lo que no resuelve por ti',UL(['Elegir los escenarios correctos','Las pruebas exploratorias y el descubrimiento de comportamientos inesperados','El juicio sobre la usabilidad','El análisis de riesgos de negocio','Los requisitos ambiguos','Los datos de prueba deficientes o los entornos inestables','Un oráculo débil: si el comportamiento esperado no está claro, la automatización solo puede verificar de forma fiable lo que no es','La infraestructura o las dependencias inestables'])+CO('risk','Riesgo','La automatización tiene costes reales: tiempo de desarrollo, mantenimiento, pruebas inestables, infraestructura, gestión de datos de prueba, falsa confianza y automatizar comprobaciones de poco valor.')],
  ['Caso, script, framework, pipeline',`${T(['Término','Qué es','Ejemplo'],[
   ['Caso de prueba','El diseño: precondiciones, entradas, pasos, resultado esperado','«Un usuario registrado inicia sesión con credenciales válidas y ve el panel»'],
   ['Script de prueba','Código que ejecuta uno o más casos de prueba','login.spec.ts'],
   ['Suite de pruebas','Un grupo de scripts que se ejecutan juntos con un propósito','La suite smoke, la suite de regresión nocturna'],
   ['Framework','La estructura compartida en la que se apoyan los scripts: runner, configuración, fixtures, abstracciones, informes','Playwright Test más tus pages/, utils/ y fixtures'],
   ['Pipeline','El proceso de CI/CD que lanza las suites y actúa según los resultados','Un workflow de GitHub Actions que ejecuta smoke en cada PR']])}
   ${CO('note','Idea clave','Muchas veces se dice «el framework» cuando se habla de la herramienta. Playwright, Cypress y Selenium son herramientas; el framework es lo que tu equipo construye a su alrededor.')}`],
  ['¿Cuándo se amortiza la automatización?',`<p>Una estimación sencilla del punto de equilibrio compara el coste de construir una comprobación con lo que ahorra en cada ejecución:</p>
${P(0)}
 <p>Si se ejecuta en cada pull request —digamos 10 veces por semana—, esta comprobación se amortiza en menos de un mes. Si se ejecuta una vez por trimestre, tarda seis años. Fíjate en el coste de mantenimiento: una prueba inestable o frágil lo eleva, y por encima de 2 horas por ejecución la comprobación nunca se amortiza.</p>
 ${CO('tip','Consejo','Los números son aproximados, pero estimarlos obliga a hacerse las preguntas correctas: ¿con qué frecuencia se ejecutará y cuánto costará mantener viva esta prueba?')}`],
 ],
 quiz:[
  ['¿Cuál de estas cosas NO resuelve la automatización por sí sola?',['Ejecutar las mismas comprobaciones de regresión tras cada commit','Decidir qué escenarios merece la pena probar','Ejecutar comprobaciones en varios navegadores','Capturar pantallas y trazas cuando algo falla'],'Elegir escenarios es diseño de pruebas: un juicio humano sobre riesgo y valor. La automatización ejecuta comprobaciones; no las elige.'],
  ['¿Qué es el problema del «oráculo débil»?',['El runner de pruebas es demasiado lento','El resultado esperado no está claro, así que la automatización puede verificar con total seguridad lo que no es','La librería de aserciones tiene fallos','Las pruebas se ejecutan en el orden equivocado'],'El oráculo es cómo sabes cuál es el resultado esperado. Si es vago, una ejecución en verde solo demuestra que el sistema coincide con una expectativa vaga.'],
  ['¿Qué produce especialmente bien la automatización?',['Opiniones sobre usabilidad','Evidencia legible por máquina como logs, trazas e informes','Prioridades de riesgo de negocio','Requisitos aclarados'],'La automatización captura evidencia de forma fiable en cada ejecución; el juicio sobre usabilidad, riesgo y requisitos sigue siendo humano.'],
  ['Los requisitos de una funcionalidad aún están en discusión. ¿Automatizas ya sus pruebas E2E?',['Sí, la automatización zanjará la discusión','Todavía no: sin un oráculo claro automatizarías la expectativa equivocada','Sí, pero solo con reintentos','Sí, con grabar y reproducir'],'Los requisitos ambiguos figuran entre lo que la automatización no resuelve. Aclara primero el comportamiento esperado.'],
  ['¿Cuál es un framework y no un script?',['login.spec.ts','La configuración compartida del runner, fixtures, page objects e informes en los que se apoyan las specs','Una sola aserción','Una ejecución de GitHub Actions'],'Un script ejecuta casos de prueba; el framework es la estructura compartida que usan los scripts.'],
  ['Construcción 30 h, ejecución manual 1,5 h, mantenimiento automatizado 0,5 h por ejecución. ¿Tras cuántas ejecuciones se alcanza el equilibrio?',['20','30','60','Nunca'],'Ahorro por ejecución = 1,5 − 0,5 = 1 h; 30 / 1 = 30 ejecuciones.'],
 ]},

'manual-vs-automated':{title:'Pruebas manuales frente a automatizadas',
 sum:'Son complementarias. La automatización gana en repetibilidad y escala; las personas, en exploración y juicio.',
 sections:[
  ['Qué aprenderás',UL(['Comparar pruebas manuales y automatizadas en coste, velocidad y evidencia','Explicar la diferencia entre probar y comprobar','Planificar una semana que combine trabajo exploratorio y automatizado'])],
  ['Lado a lado',T(['Dimensión','Pruebas manuales','Pruebas automatizadas'],[
   ['Ejecución','Por una persona','Por herramienta / código'],['Repetibilidad','Moderada','Alta cuando es determinista'],['Coste inicial','Normalmente menor','Normalmente mayor'],
   ['Velocidad de regresión','Más lenta en suites grandes','Rápida y repetible'],['Exploración','Fuerte','Limitada salvo que se diseñe a propósito'],['Escala en navegadores','Cara','Muy adecuada'],
   ['Mantenimiento','Esfuerzo humano en cada ejecución','Mantenimiento de código, datos e infraestructura'],['CI/CD','Limitada','Encaja muy bien'],['Problemas de UX inesperados','Ayuda la observación humana','Suele requerir comprobaciones especializadas'],['Evidencia','Notas, capturas','Logs, informes, trazas, capturas, vídeos']])],
  ['Cómo leer la tabla',`<p>Fíjate en hacia dónde se desplaza el coste. Las pruebas manuales pagan <i>por ejecución</i>; la automatización paga por adelantado y después en <i>mantenimiento</i>. Merece la pena cuando una comprobación se ejecuta con suficiente frecuencia, y se mantiene lo bastante estable, como para amortizar el coste inicial.</p>`+CO('tip','Consejo','Una buena regla: automatiza lo repetitivo, estable y de alto impacto; deja a las personas lo exploratorio, lo nuevo o lo que exige juicio.')],
  ['Probar frente a comprobar',`<p>James Bach y Michael Bolton distinguen entre <b>comprobar</b> (checking) —evaluar aplicando reglas de decisión algorítmicas a observaciones concretas— y <b>probar</b> (testing), el proceso más amplio de evaluar un producto aprendiendo sobre él mediante exploración y experimentación. La automatización puede comprobar; probar incluye comprobar, pero también cuestionar, modelar y notar lo inesperado.</p>
 ${CO('note','Idea clave','Una comprobación automatizada responde exactamente a la pregunta para la que se escribió. Decidir qué preguntas hacer, y notar las que nadie anotó, es la parte humana.')}`],
  ['Una semana híbrida en la práctica',T(['Cuándo','Automatizado','Humano'],[
   ['Cada commit / PR','Suites unitarias, de API y smoke dan retroalimentación rápida','Revisar fallos; decidir si es un arreglo o inestabilidad'],
   ['Funcionalidad nueva','Automatizar los criterios de aceptación estables cuando el comportamiento se asiente','Sesiones exploratorias acotadas con un charter mientras es nueva'],
   ['Cada noche','Regresión completa en varios navegadores','Revisar por la mañana los fallos nocturnos'],
   ['Antes de una release','Smoke de release y recorridos críticos','Pasada exploratoria por las zonas de riesgo; revisión de usabilidad y accesibilidad'],
   ['Tras un incidente','Añadir una comprobación de regresión que reproduzca el fallo','Análisis de causa raíz: ¿por qué ninguna prueba lo detectó?']])],
 ],
 quiz:[
  ['¿Dónde suele costar MÁS la automatización que las pruebas manuales?',['Velocidad de regresión','Coste inicial','Escala en navegadores','Encaje con CI/CD'],'Construir la automatización —código, datos, infraestructura— cuesta más al principio. Se amortiza con las ejecuciones repetidas.'],
  ['¿Qué tipo de problema suelen detectar mejor las pruebas manuales?',['Una regresión en un contrato de API estable','Un flujo de UX inesperado y confuso','Un fallo que solo aparece en Firefox','Una prueba smoke rota tras un despliegue'],'Los problemas de UX inesperados necesitan observación humana; las comprobaciones automáticas solo ven lo que se les dijo que miraran.'],
  ['¿Qué tipo de evidencia es característica de las ejecuciones automatizadas y no de las manuales?',['Notas del tester','Trazas e informes estructurados','Comentarios verbales','Charters de sesión'],'La automatización genera logs, informes, trazas, capturas y vídeos en cada ejecución.'],
  ['Una funcionalidad sale una vez y se retirará el mes que viene. ¿Automatizas sus comprobaciones de regresión?',['Sí, siempre automatiza','Probablemente no: el coste inicial no se recuperará con ejecuciones repetidas','Solo en tres navegadores','Solo con herramientas de IA'],'La automatización se amortiza con la repetición. Una funcionalidad efímera rara vez se ejecuta lo suficiente para justificarla.'],
  ['En términos de Bach y Bolton, ¿qué hace una comprobación automatizada?',['Probar en sentido pleno','Comprobar: aplicar reglas de decisión a observaciones concretas','Pruebas exploratorias','Análisis de riesgos'],'La automatización comprueba; probar incluye además explorar, cuestionar y aprender.'],
  ['Tras un incidente en producción, ¿qué debe hacer la parte automatizada del equipo?',['Nada','Añadir una comprobación de regresión que reproduzca el fallo','Borrar las pruebas relacionadas','Aumentar los reintentos'],'Cada fallo que se escapa se convierte en una comprobación de regresión para que no vuelva en silencio.'],
 ]},

'test-levels':{title:'Dónde encaja la automatización',
 sum:'Unitarias, de componentes, de API, end-to-end, de regresión, smoke, de accesibilidad, visuales y de rendimiento: cada nivel responde a una pregunta distinta.',
 sections:[
  ['Qué aprenderás',UL(['Asignar un riesgo al nivel de prueba más bajo que dé suficiente confianza','Interpretar la pirámide de pruebas, el trofeo de pruebas y el antipatrón del cucurucho de helado','Elegir el doble de prueba adecuado: dummy, stub, spy, mock o fake'])],
  ['Los niveles',T(['Nivel','Qué comprueba'],[
   ['Unitario','Comprobaciones rápidas cerca del código'],['Componente','Componentes de UI en un navegador / entorno controlado'],['API / servicio','Contratos, reglas de negocio, autorización, validación, comportamiento ante errores'],
   ['End-to-end','Flujos completos visibles para el usuario a través de los límites del sistema'],['Regresión','La funcionalidad existente, una y otra vez'],['Smoke','Una suite pequeña del camino crítico: ¿se puede probar siquiera esta build / entorno?'],
   ['Accesibilidad','Algunas infracciones de accesibilidad; complementa la evaluación manual'],['Visual','Resultado renderizado frente a lo aprobado'],['Rendimiento / carga','Usa herramientas dedicadas, no automatización funcional del navegador']])],
  ['Elegir el nivel',`<p>Elige el <b>nivel de prueba más bajo que dé suficiente confianza</b>. Una regla de negocio comprobada a través de la API es más rápida y menos frágil que la misma regla comprobada haciendo clic en la UI. Reserva las pruebas end-to-end para los recorridos críticos del usuario y la confianza en la integración.</p>`+CO('risk','Riesgo','Abusar de las pruebas E2E crea suites lentas y frágiles donde pruebas de nivel inferior darían una retroalimentación más rápida.')],
  ['Pirámide, trofeo y cucurucho de helado',`${T(['Forma','Idea','Cuándo encaja'],[
  ['Pirámide de pruebas (Cohn, popularizada por Fowler)','Muchas pruebas unitarias rápidas, menos de servicio/API, pocas de UI','La mayoría de sistemas con mucho backend'],
  ['Trofeo de pruebas (Kent C. Dodds)','Análisis estático en la base, el mayor peso en pruebas de integración, pocas E2E','Aplicaciones front-end donde las pruebas de integración dan la mejor confianza por coste'],
  ['Cucurucho de helado (antipatrón)','Sobre todo pruebas manuales y de UI, pocas unitarias','Nunca a propósito: retroalimentación lenta, frágil y cara']])}
 <p>Las formas discrepan en los detalles, pero coinciden en lo esencial: baja las comprobaciones al nivel más rápido que aún detecte el riesgo y reserva las pruebas end-to-end para los recorridos que solo tienen sentido de extremo a extremo.</p>`],
  ['Dobles de prueba',`${T(['Doble','Qué hace','Ejemplo'],[
  ['Dummy','Se pasa pero nunca se usa','Un argumento de logger de relleno'],
  ['Stub','Devuelve respuestas preparadas','La API de pagos siempre responde «aprobado»'],
  ['Spy','Un stub que además registra cómo se le llamó','Comprobar que el servicio de email se llamó una vez'],
  ['Mock','Programado con expectativas; hace fallar la prueba si las llamadas no coinciden','Esperar exactamente una llamada a charge(49.99)'],
  ['Fake','Una implementación simplificada que funciona','Una base de datos en memoria']])}
 ${CO('risk','Riesgo','Cada doble sustituye una integración real por una suposición sobre ella. Mantén algunas pruebas contra el sistema real, o una prueba de contrato, para que esas suposiciones se verifiquen.')}`],
 ],
 quiz:[
  ['Debes verificar una regla de descuento para 40 combinaciones de precios. ¿Mejor nivel?',['End-to-end a través de la UI de pago','Pruebas de API / servicio guiadas por datos','Pruebas visuales','Una sesión exploratoria manual'],'Muchas combinaciones deterministas de una regla de negocio son un caso clásico de API y datos. La UI añade tiempo y fragilidad, no confianza.'],
  ['¿Para qué sirve una suite smoke?',['Regresión exhaustiva','Pruebas de carga','Establecer si una build / entorno se puede probar siquiera','Auditorías de accesibilidad'],'Smoke = una suite pequeña y rápida del camino crítico que se ejecuta primero. Si falla, no tiene sentido probar más a fondo.'],
  ['¿Qué nivel debería verificar que los usuarios no pueden leer los contactos de otro tenant?',['Solo pruebas visuales','Pruebas de API / servicio (más una comprobación E2E seleccionada)','Solo pruebas unitarias','Pruebas de rendimiento'],'Las reglas de autorización viven en los límites de los servicios; las pruebas de API las atacan de forma directa y rápida.'],
  ['Quieres saber cómo aguanta el pago 2000 usuarios concurrentes. ¿Qué usas?',['Ejecutar la suite E2E con 2000 workers','Una herramienta dedicada de rendimiento / carga','Pruebas visuales','Pruebas de componentes'],'Las pruebas E2E de navegador no son generadores de carga; usa herramientas específicas.'],
  ['Una suite tiene 400 pruebas de UI y 20 unitarias. ¿Qué forma tiene?',['Pirámide de pruebas','Trofeo de pruebas','Cucurucho de helado (antipatrón)','Diamante'],'Las suites dominadas por pruebas de UI son el cucurucho de helado.'],
  ['¿Qué doble de prueba registra cómo se le llamó para poder comprobarlo después?',['Dummy','Stub','Spy','Fake'],'Un spy es un stub que además registra sus llamadas.'],
  ['Una base de datos en memoria usada en lugar de la real es un…',['Mock','Fake','Dummy','Stub'],'Un fake es una implementación simplificada que funciona.'],
 ]},

'playwright':{title:'Playwright',
 sum:'Un framework end-to-end para aplicaciones web modernas: runner integrado, aserciones, aislamiento, paralelismo y herramientas para Chromium, Firefox y WebKit.',
 sections:[
  ['Qué aprenderás',UL(['Crear, ejecutar y depurar un proyecto de Playwright','Leer cada línea de un playwright.config.ts por defecto','Elegir locators en el orden de prioridad recomendado','Estructurar una prueba con bloques describe, hooks, pasos y etiquetas'])],
  ['Qué es',`<p>Playwright Test reúne un runner, aserciones web-first, aislamiento, paralelización y herramientas. Ejecuta Chromium, WebKit y Firefox en Windows, Linux y macOS —en modo headless o con interfaz— con emulación móvil.</p><p class="empty empty--md">Última versión en el momento de escribir: Playwright 1.63.0 (4 de septiembre de 2026). Revisa las release notes antes de copiar ejemplos que dependan de la versión.</p>`],
  ['Instalar y ejecutar',`${P(0)}
<p>La estructura generada: <code class="i">playwright.config.ts</code>, <code class="i">package.json</code>, <code class="i">tests/example.spec.ts</code>.</p>`],
  ['Conceptos clave',T(['Concepto','Por qué importa'],[
   ['Locators','Encuentran elementos de forma robusta para interactuar y hacer aserciones'],['Aserciones web-first','Aserciones que esperan al estado de la aplicación web'],['Fixtures','Preparación/limpieza reutilizable y dependencias inyectadas'],
   ['Contextos de navegador','Sesiones aisladas: la base del aislamiento de pruebas'],['Projects','Combinaciones de navegador / dispositivo / configuración'],['Paralelismo','Ejecutar pruebas a la vez donde sea seguro'],
   ['Reintentos (retries)','Volver a ejecutar fallos según una política, nunca para ocultar la inestabilidad'],['Trace Viewer','Evidencia de la ejecución paso a paso para depurar'],['Reporter HTML','Pruebas superadas, fallidas, omitidas e inestables con adjuntos'],
   ['Pruebas de API','Comprobaciones HTTP junto a los flujos de UI'],['Mock de red','Controlar o simular el comportamiento de la red'],['Codegen','Genera código inicial: refactorízalo antes de conservarlo']])],
  ['playwright.config.ts, línea a línea',`<p>Esto se parece mucho a lo que genera <code class="i">npm init playwright@latest</code>, con las opciones más útiles añadidas:</p>
${P(0)}
 ${CO('tip','Consejo','Todo lo que está en use se puede sobrescribir por proyecto. Un proyecto «móvil» con devices[\'Pixel 7\'] ejecuta las mismas pruebas con viewport y user agent móviles.')}`],
  ['Locators, por orden de prioridad',`${T(['Locator','Úsalo para'],[
  ['getByRole(role, { name })','Casi todo lo interactivo: botones, enlaces, encabezados, casillas. Primera opción.'],
  ['getByLabel(text)','Campos de formulario con etiqueta'],
  ['getByPlaceholder(text)','Campos sin etiqueta (y pide una etiqueta: es un defecto de accesibilidad)'],
  ['getByText(text)','Contenido de texto no interactivo'],
  ['getByAltText / getByTitle','Imágenes y elementos con title'],
  ['getByTestId(id)','Cuando nada visible para el usuario es estable; usa data-testid por defecto'],
  ['locator(css o xpath)','Último recurso: ligado a detalles de implementación']])}
 ${P(0)}
 ${CO('note','Idea clave','Los locators son estrictos: si coinciden con varios elementos, las acciones lanzan un error en lugar de adivinar. Eso convierte un selector ambiguo en un error claro, no en un clic inestable en la fila equivocada.')}`],
  ['Anatomía de una prueba',`${P(0)}
 ${UL(['<b>test.describe</b> agrupa pruebas; los hooks de dentro solo se aplican a ese grupo.','<b>test.step</b> da nombre a un bloque para que aparezca como un paso en el informe y la traza.','<b>Las etiquetas</b> como @smoke permiten ejecutar un subconjunto: <code class="i">npx playwright test --grep @smoke</code>.','Flags útiles para depurar: <code class="i">--debug</code> (Inspector), <code class="i">--last-failed</code>, <code class="i">--repeat-each=20</code> para destapar la inestabilidad.'])}`],
  ['Puntos fuertes',UL(['Amplia cobertura de motores de navegador','Runner y herramientas integrados','Pruebas aisladas y ejecución en paralelo','Evidencia sólida: trazas, capturas, vídeos, informes','Pruebas de UI y API en una sola herramienta','Muy adecuado para proyectos de QA en TypeScript'])],
  ['A tener en cuenta',UL(['Las pruebas generadas se vuelven frágiles si se aceptan sin refactorizar','Las pruebas en paralelo chocan por cuentas, datos o entornos compartidos','Los reintentos ocultan la inestabilidad si solo miras el resultado final','Los binarios de navegador y las dependencias de CI deben versionarse','Demasiadas pruebas E2E producen suites lentas'])+CO('tip','Consejo','Trata la salida de Codegen como un primer borrador: sustituye los selectores frágiles por locators basados en rol o etiqueta y extrae los pasos repetidos a fixtures o page objects.')],
 ],
 quiz:[
  ['¿Qué característica de Playwright es la base del aislamiento de pruebas?',['Codegen','Contextos de navegador','Reporter HTML','Projects'],'Cada prueba recibe su propio contexto de navegador: una sesión nueva y aislada con cookies y almacenamiento propios.'],
  ['Tu suite está en verde, pero el informe HTML muestra 14 pruebas que solo pasaron al reintentar. ¿Qué te dice?',['Todo va bien','Tienes pruebas inestables ocultas por los reintentos','Hay que aumentar los reintentos','El informe está mal'],'Pasar en un reintento es una señal de inestabilidad. Registra los reintentos por separado de los aprobados reales e investígalos.'],
  ['¿Qué comando abre el modo UI interactivo?',['npx playwright show-report','npx playwright test --headed','npx playwright test --ui','npm init playwright@latest'],'--ui abre el modo UI para ejecutar, observar y depurar pruebas de forma interactiva.'],
  ['¿Qué locator es el menos frágil para un botón «Submit»?',['page.locator(\'div > div:nth-child(3) > button\')','page.getByRole(\'button\', { name: \'Submit\' })','page.locator(\'.btn-x7f2\')','XPath por ruta absoluta'],'Los locators por rol y nombre siguen lo que ven los usuarios y sobreviven a cambios de maquetación y de clases.'],
  ['¿Qué hace forbidOnly: !!process.env.CI?',['Ejecuta una sola prueba en CI','Hace fallar la ejecución de CI si quedó un test.only en el código','Desactiva los reintentos','Prohíbe el paralelismo'],'Evita que un test.only olvidado se salte en silencio el resto de la suite en CI.'],
  ['¿Qué locator recomienda Playwright probar primero?',['getByTestId','locator(css)','getByRole','XPath'],'Los locators por rol reflejan cómo perciben la página los usuarios y las tecnologías de asistencia.'],
  ['Un locator coincide con tres botones y llamas a .click(). ¿Qué ocurre?',['Hace clic en el primero','Hace clic en los tres','Lanza un error de violación de rigurosidad (strictness violation)','Espera indefinidamente'],'Los locators son estrictos; las coincidencias ambiguas lanzan un error en lugar de adivinar.'],
  ['¿Qué comando ejecuta solo las pruebas etiquetadas con @smoke?',['npx playwright test --project=smoke','npx playwright test --grep @smoke','npx playwright smoke','npx playwright test --tag smoke'],'Las etiquetas se filtran con --grep (y se excluyen con --grep-invert).'],
 ]},

'playwright-fixtures':{title:'Fixtures de Playwright a fondo',
 sum:'Las fixtures son la forma en que Playwright da a cada prueba justo lo que necesita: preparado antes, limpiado después y aislado por defecto.',
 sections:[
  ['Qué aprenderás',UL(['Escribir fixtures propias con ámbito de prueba y de worker, con preparación y limpieza','Reutilizar una sesión iniciada de forma segura con storageState','Usar fixtures auto y option y combinar conjuntos de fixtures'])],
  ['Por qué fixtures en lugar de beforeEach',`<p>Una fixture es una dependencia con nombre que la prueba pide en sus argumentos. Playwright la construye solo cuando una prueba la necesita, se la entrega y limpia después. Frente a los hooks <code class="i">beforeEach</code>, las fixtures son <b>bajo demanda</b>, <b>componibles</b> (una fixture puede usar otra), <b>encapsuladas</b> (preparación y limpieza juntas) y <b>tipadas</b>.</p>
   ${T(['Fixture integrada','Qué obtienes'],[['page','Una página nueva en un contexto de navegador nuevo, por prueba'],['context','El contexto de navegador aislado detrás de page'],['browser','La instancia compartida del navegador (ámbito de worker)'],['browserName','chromium, firefox o webkit: útil para lógica condicional'],['request','Un APIRequestContext para llamadas HTTP']])}`],
  ['Escribir una fixture propia',`<p>Extiende el <code class="i">test</code> base. El código antes de <code class="i">use()</code> es la preparación; el de después es la limpieza, que se ejecuta aunque la prueba falle.</p>
${P(0)}
${P(1)}
${CO('note','Idea clave','La prueba nunca menciona cómo se crea o se borra el usuario. Las fixtures sacan la mecánica de las pruebas: el mismo objetivo que los Page Objects, aplicado a la preparación y a los datos.')}`],
  ['Ámbito de prueba frente a ámbito de worker',`${T(['Ámbito','Se crea','Úsalo para'],[['test (por defecto)','Una vez por prueba y se limpia después','Páginas, datos por prueba, todo lo mutable'],['worker','Una vez por proceso worker, compartida por sus pruebas','Recursos caros de solo lectura: una cuenta preparada por worker, una conexión a BD, un servicio arrancado']])}
${P(0)}
${CO('risk','Riesgo','Una fixture de ámbito worker la comparten todas las pruebas de ese worker. Si las pruebas la modifican, has recreado el estado compartido, la principal causa de inestabilidad dependiente del orden. Mantén las fixtures de worker de solo lectura o reinícialas.')}`],
  ['Fixtures automáticas y opciones',UL(['<b>Fixtures auto</b>: <code class="i">[fn, { auto: true }]</code> se ejecutan en cada prueba sin que se pidan. Útiles para adjuntar logs al fallar o comprobar errores en la consola.','<b>Fixtures option</b>: <code class="i">[defaultValue, { option: true }]</code> se pueden sobrescribir por proyecto en <code class="i">playwright.config.ts</code>.','<b>Sobrescribir las integradas</b>: puedes sobrescribir incluso <code class="i">page</code>, por ejemplo para navegar primero a una ruta base.','<b>Combinar conjuntos</b>: <code class="i">mergeTests()</code> y <code class="i">mergeExpects()</code> (desde v1.39) combinan conjuntos de fixtures y aserciones de distintos módulos.','<b>Identidad en paralelo</b>: <code class="i">workerIndex</code> y <code class="i">parallelIndex</code> están disponibles tanto en TestInfo como en WorkerInfo; úsalos como clave de los datos de cada worker.'])],
  ['Autenticación con storageState',`<p>Iniciar sesión por la UI en cada prueba es lento y añade inestabilidad. Inicia sesión una vez en un proyecto de setup, guarda la sesión y reutilízala:</p>
${P(0)}
${CO('risk','Riesgo','El archivo de estado guardado contiene cookies de sesión activas. Añade playwright/.auth a .gitignore, nunca lo subas como artefacto de CI y lee las credenciales de variables de entorno o de un almacén de secretos.')}
${CO('tip','Consejo','Conserva al menos una prueba que inicie sesión por la UI real: storageState se salta el flujo de inicio de sesión, así que algo tiene que seguir cubriéndolo.')}<p>También existe una variante solo por API: inicia sesión con <code class="i">request.post(...)</code> y guarda con <code class="i">request.storageState({ path })</code>.</p>`],
  ['Lista de comprobación del diseño de fixtures',UL(['¿Cada fixture hace una sola cosa, con preparación y limpieza juntas?','¿Los datos mutables tienen ámbito de prueba y son únicos por prueba?','¿Las fixtures de worker son de solo lectura o están indexadas por workerIndex?','¿La limpieza funciona bien cuando la prueba falla a mitad?','¿Los secretos se leen del entorno y nunca se escriben en el código?','¿Entendería la prueba un ingeniero nuevo sin abrir la fixture?'])],
 ],
 quiz:[
  ['En una fixture propia, ¿cuándo se ejecuta el código situado después de await use(value)?',['Antes de la prueba','Cuando termina la prueba, aunque haya fallado','Solo si la prueba pasó','Nunca'],'Todo lo que va después de use() es limpieza y se ejecuta tanto si la prueba pasa como si falla.'],
  ['Necesitas una cuenta preparada, cara y de solo lectura por cada worker en paralelo. ¿Qué ámbito?',['test','worker','variable global','beforeAll en cada archivo'],'El ámbito worker la crea una vez por proceso; indexarla por workerIndex evita choques entre workers.'],
  ['Las pruebas comparten una fixture de carrito de ámbito worker y cada una añade artículos. ¿Qué pasará?',['Nada: las fixtures siempre están aisladas','Resultados inestables y dependientes del orden porque las pruebas modifican estado compartido','Pruebas más rápidas y fiables','Playwright lanza un error'],'Las fixtures de worker se comparten entre las pruebas de ese worker. Los datos mutables van en ámbito de prueba.'],
  ['¿Cuál es la principal ventaja de autenticarse con storageState?',['Prueba más a fondo la página de inicio de sesión','Evita iniciar sesión por la UI en cada prueba, con pruebas más rápidas y menos inestables','Cifra las contraseñas','Sustituye las pruebas de autorización'],'Inicia sesión una vez y reutiliza la sesión. Mantén una prueba aparte para el flujo real de inicio de sesión.'],
  ['¿Dónde debe acabar el archivo playwright/.auth/user.json?',['En git, por comodidad','Subido como artefacto de CI','Ignorado en git y nunca publicado: contiene cookies de sesión activas','En el README'],'En la práctica es una credencial. Trátalo como un secreto.'],
  ['¿Qué opción de fixture hace que se ejecute en cada prueba sin pedirla?',['{ scope: "worker" }','{ auto: true }','{ option: true }','{ timeout: 0 }'],'Las fixtures con auto: true se ejecutan en cada prueba: útiles para logs o para comprobar errores de consola.'],
  ['¿Qué función combina conjuntos de fixtures definidos en módulos distintos?',['combineFixtures()','mergeTests()','test.extend.all()','useFixtures()'],'mergeTests() fusiona varios objetos test extendidos en uno.'],
 ]},

'cypress':{title:'Cypress',
 sum:'Una plataforma de calidad centrada en el navegador: pruebas E2E y de componentes con un sólido modelo de depuración local, más funciones en la nube de pago opcionales.',
 sections:[
  ['Qué aprenderás',UL(['Explicar la cola de comandos de Cypress y su capacidad de reintento (retry-ability)','Escribir una prueba que espere a una petición interceptada en lugar de a un temporizador','Cachear el inicio de sesión con cy.session() y elegir selectores data-cy estables','Saber qué cambios de Cypress 16 pueden romper una suite existente'])],
  ['Qué es',`<p>Cypress se presenta como una plataforma de calidad para aplicaciones web modernas: pruebas end-to-end, pruebas de componentes, comprobaciones de accesibilidad y capacidades orientadas a la cobertura. La <b>aplicación Cypress instalada en local es de código abierto</b>; <b>Cypress Cloud</b> añade grabación alojada, analítica y orquestación.</p>`],
  ['Capacidades',UL(['Pruebas end-to-end en un navegador','Pruebas de componentes en un navegador real','Comprobación de accesibilidad','Interceptación y control de red','Espías, stubs y relojes','Pruebas visuales','Ejecución en varios navegadores de las familias soportadas','Capturas, vídeos e informes','Integración con CI'])],
  ['Cómo se depura en Cypress',UL(['El <b>Command Log</b> y las instantáneas de «viaje en el tiempo» muestran el estado de la app alrededor de cada comando','La <b>espera automática</b> reduce la necesidad de pausas arbitrarias','Errores legibles más las DevTools del navegador','Los <b>stubs de red</b> reproducen casos límite sin las condiciones reales del backend'])],
  ['La cola de comandos y los reintentos',`<p>Los comandos de Cypress no se ejecutan cuando se llaman. Se <b>encolan</b> y se ejecutan después en orden, así que no puedes asignar su resultado a una variable como harías con <code class="i">await</code>. Usa <code class="i">.then()</code>, alias o aserciones.</p>
 ${UL(['Las <b>consultas</b> como <code class="i">cy.get()</code>, <code class="i">.find()</code> y <code class="i">cy.contains()</code> se reintentan junto con las aserciones encadenadas hasta que pasan o se agota el tiempo (4 s por defecto).','Las <b>acciones</b> como <code class="i">.click()</code> y <code class="i">.type()</code> no se reintentan, aunque Cypress espera primero a que el elemento sea accionable.','Pon la aserción justo después de la consulta de la que depende, para que el reintento cubra toda la cadena.'])}
${P(0)}`],
  ['Estructura del proyecto y buenos hábitos',`${P(0)}
 ${UL(['Selecciona elementos con atributos dedicados como <code class="i">data-cy</code>, que la guía de buenas prácticas de Cypress recomienda frente a clases o textos que cambian con los estilos.','Inicia sesión una vez por spec con <code class="i">cy.session()</code>, que cachea cookies y almacenamiento y los restaura en llamadas posteriores.','Establece el estado a través de la API o de <code class="i">cy.task()</code> en lugar de llegar a él haciendo clic en la UI.','No uses <code class="i">cy.wait(5000)</code>. Espera a una petición con alias o a una aserción.','Mantén las pruebas independientes: cada prueba debe poder ejecutarse sola.'])}`],
  ['Cypress Cloud',`<p>Las funciones en la nube incluyen repetición de pruebas, gestión de pruebas inestables, revisión de ramas, orquestación, integraciones y analítica. Algunas capacidades avanzadas de accesibilidad y cobertura de UI son productos premium. Según la guía, la documentación de Cypress describe Cypress 16 como vigente: verifica la disponibilidad de funciones y los precios en la documentación actual antes de adoptarlo.</p>`],
  ['Qué cambió en Cypress 16 (septiembre de 2026)',`${UL([
 'Cypress <b>16.0.0</b> salió el 1 de septiembre de 2026; la 16.1.0, el 15 de septiembre de 2026.',
 'En Chrome, Chromium y Edge, el tráfico de pruebas pasa ahora por la pila de red del propio navegador en lugar del proxy de Cypress: vuelve a revisar las suites que dependen mucho de <code class="i">cy.intercept()</code>.',
 'Se requiere Node 22, 24 o 26+ (se eliminan 20 y 25).',
 '<code class="i">Cypress.env()</code> se sustituye por <code class="i">Cypress.expose()</code> y <code class="i">cy.env()</code>; <code class="i">cy.exec()</code> se elimina: usa <code class="i">cy.task()</code>. <code class="i">cy.end()</code> se elimina.',
 'Electron queda obsoleto como navegador de pruebas.',
 'Recordatorio: <code class="i">cy.request()</code> hace una llamada HTTP real y se salta <code class="i">cy.intercept()</code>.'])}
 ${CO('tip','Consejo','Antes de actualizar una suite real, lee la lista de cambios incompatibles del changelog y ejecuta primero la suite en una rama.')}`],
  ['A tener en cuenta',UL(['Separa lo gratuito y local de lo que es nube de pago','Evalúa la arquitectura del navegador y el comportamiento cross-origin frente a tu aplicación','Abusar de los stubs reduce la confianza en que la integración real funciona','La espera automática no arregla los problemas de sincronización de la aplicación','La grabación en la nube puede capturar datos de prueba sensibles'])+CO('risk','Riesgo','Las ejecuciones grabadas, capturas y vídeos enviados a un servicio alojado pueden contener datos personales o de clientes. Revisa qué capturas antes de activar la grabación en la nube.')],
 ],
 quiz:[
  ['¿Qué afirmación sobre Cypress es correcta?',['Todo, incluida la orquestación y la analítica, es de código abierto','La app local de Cypress es de código abierto; Cypress Cloud añade funciones alojadas de pago','Cypress solo admite pruebas de componentes','Cypress necesita Selenium Grid'],'La guía insiste en separar la app local de código abierto de la nube de pago y las capacidades premium.'],
  ['Pones stubs a todas las respuestas de API de tu suite E2E. ¿Cuál es el riesgo principal?',['Las pruebas serán más lentas','Pierdes confianza en que la integración real front-end–back-end funciona','Cypress deja de esperar automáticamente','Las capturas dejan de funcionar'],'Los stubs son geniales para casos límite, pero una suite totalmente con stubs nunca ejercita la integración real.'],
  ['¿Qué función de Cypress permite inspeccionar el estado de la app antes y después de cada comando?',['La analítica de Cypress Cloud','Las instantáneas de «viaje en el tiempo» del Command Log','Selenium Grid','La revisión de ramas'],'El Command Log con instantáneas es el corazón del modelo de depuración local de Cypress.'],
  ['La espera automática está activa, pero una prueba falla porque el guardado termina después de la siguiente navegación. ¿Qué es cierto?',['Cypress está roto','La espera automática no arregla problemas reales de sincronización de la aplicación','Añadir cy.wait(10000)','Desactivar los reintentos'],'La espera automática reintenta comandos y aserciones; no puede arreglar una condición de carrera dentro de la aplicación. Asegura la señal real de finalización (p. ej., una petición interceptada o un mensaje «Guardado»).'],
  ['¿Por qué no puedes escribir const text = cy.get(".name").text()?',['cy.get está obsoleto','Los comandos de Cypress se encolan y se ejecutan después: usa .then() o aserciones','El texto siempre está vacío','Solo funciona en Cloud'],'Los comandos encolan trabajo; sus resultados están disponibles mediante el encadenamiento, no como valores devueltos.'],
  ['¿Qué comandos de Cypress se reintentan hasta que pasan las aserciones?',['Acciones como .click()','Consultas como cy.get() y .find(), con sus aserciones','cy.request()','Ninguno'],'Las consultas se reintentan junto con las aserciones encadenadas tras ellas.'],
  ['¿Qué hace cy.session()?',['Inicia Cypress Cloud','Cachea y restaura cookies y almacenamiento, por ejemplo para reutilizar un inicio de sesión','Graba vídeo','Reinicia la base de datos'],'Cachea el estado de sesión para que el inicio de sesión se ejecute una vez y después se restaure.'],
  ['¿Qué selector recomienda la guía de buenas prácticas de Cypress?',['.btn.btn-primary','Un atributo dedicado como [data-cy=save]','#root > div:nth-child(2)','Siempre solo el texto del botón'],'Los atributos de prueba dedicados están aislados de los cambios de estilo y estructura.'],
 ]},

'selenium':{title:'Selenium',
 sum:'Un proyecto paraguas —WebDriver, IDE y Grid— para la automatización de navegadores basada en estándares en varios lenguajes y máquinas.',
 sections:[
  ['Qué aprenderás',UL(['Describir la arquitectura de WebDriver y el papel de Grid','Escribir esperas explícitas en Java y Python, y saber por qué no mezclarlas con las implícitas','Elegir un runner para tu lenguaje y montar un framework alrededor de WebDriver'])],
  ['El ecosistema',T(['Componente','Propósito'],[['WebDriver','Automatización programática del navegador mediante una API / protocolo independiente del lenguaje'],['Selenium IDE','Grabación y reproducción en el navegador y ayuda al desarrollo de pruebas'],['Selenium Grid','Ejecución remota y en paralelo en varias máquinas, navegadores y plataformas']])],
  ['Arquitectura de WebDriver',`<div class="layers"><div><b>Tu prueba (binding cliente)</b><span>Java, Python, C#, JS…</span></div><div><b>Protocolo WebDriver</b><span>comandos independientes del lenguaje</span></div><div><b>Driver del navegador</b><span>específico de cada navegador</span></div><div class="sut"><b>Navegador</b><span>Chrome, Firefox, Edge, Safari</span></div></div>
   <p>Como el cliente y el driver específico del navegador están separados, Selenium funciona con los principales navegadores sin incrustar código de automatización en la aplicación.</p>`],
  ['Configuración',OL(['Instala un binding para tu lenguaje','Instala el navegador de destino o consigue acceso a él','Gestiona los drivers: Selenium Manager puede automatizarlo en configuraciones soportadas','Crea sesiones de WebDriver','Añade un runner de pruebas para tu lenguaje','Añade aserciones, fixtures, informes y CI alrededor de la capa del navegador'])+CO('note','Idea clave','Con Selenium, el framework alrededor de la capa del navegador es responsabilidad tuya: runner, aserciones, fixtures, informes, datos, configuración y convenciones.')],
  ['Esperar como es debido',`<p>Selenium no espera automáticamente como Playwright y Cypress, así que la sincronización es donde más fallan las suites de Selenium. Usa <b>esperas explícitas</b>, que sondean una condición hasta un tiempo máximo.</p>
${P(0)}
 ${CO('risk','Riesgo','La documentación de Selenium advierte que no mezcles esperas implícitas y explícitas: puede provocar tiempos de espera impredecibles. Elige las explícitas y deja la implícita a cero.')}`],
  ['Montar un framework alrededor de WebDriver',`${T(['Lenguaje','Runner habitual','Añadidos típicos'],[
  ['Java','JUnit 5 o TestNG','AssertJ, informes Allure, Maven/Gradle'],
  ['Python','pytest','fixtures de pytest, pytest-xdist para ejecuciones en paralelo, pytest-html'],
  ['C#','NUnit o xUnit','FluentAssertions, dotnet test'],
  ['JavaScript','Mocha o Jest (o WebdriverIO, que envuelve WebDriver)','Chai, reporters a elección']])}
 ${UL(['Una <b>fábrica de drivers</b> crea sesiones locales o remotas (Grid) a partir de la configuración.','Los <b>Page Objects</b> gestionan los locators y las esperas; la propia documentación de Selenium los recomienda.','Cierra siempre el driver en la limpieza, aunque la prueba falle, o los nodos de Grid se llenarán de sesiones huérfanas.','Guarda una captura y el código fuente de la página al fallar: Selenium no tiene trace viewer, así que esa es tu evidencia.'])}`],
  ['Selenium Grid',`<p>Grid dirige los scripts de WebDriver a instancias de navegador remotas para pruebas en paralelo, multiversión y multiplataforma. Un Grid autónomo sencillo expone un endpoint local:</p>
${P(0)}`],
  ['Estado actual (septiembre de 2026)',UL([
 'Última versión: <b>Selenium 4.49.0</b> (9 de septiembre de 2026).',
 '<b>Selenium Manager</b> se distribuye desde la 4.6 y gestiona navegadores desde la 4.11; sigue marcado como <b>beta</b>.',
 '<b>WebDriver BiDi</b>: Selenium está migrando su implementación de WebDriver Classic al protocolo W3C BiDi; el soporte de CDP se describe como temporal hasta que BiDi esté completo.'])],
  ['Puntos fuertes y a tener en cuenta',`<h3>Puntos fuertes</h3>${UL(['Ecosistema maduro, amplio soporte de lenguajes y navegadores','Modelo WebDriver estandarizado','Sólida historia de ejecución remota y Grid','Encaja en organizaciones con infraestructura Selenium existente'])}<h3>A tener en cuenta</h3>${UL(['Una mala estrategia de sincronización produce pruebas inestables','Los grids remotos grandes añaden complejidad de infraestructura y observabilidad','Una capa de Page Object mal diseñada se convierte en un cuello de botella de mantenimiento'])}`],
 ],
 quiz:[
  ['¿Qué componente de Selenium se encarga de la ejecución en paralelo en varias máquinas?',['Selenium IDE','WebDriver','Selenium Grid','Selenium Manager'],'Grid dirige las sesiones de WebDriver a nodos de navegador remotos para ejecuciones en paralelo y multiplataforma.'],
  ['Comparado con Playwright, ¿qué suele dejarte Selenium a ti?',['Comunicarse con el navegador','El runner, las aserciones, las fixtures y los informes','Soportar varios lenguajes','Ejecutar en Chrome'],'Selenium se centra en la automatización del navegador; el framework que lo rodea lo montas tú.'],
  ['¿En qué ayuda Selenium Manager?',['A escribir aserciones','A automatizar la configuración del driver del navegador en configuraciones soportadas','A generar informes','A ejecutar pruebas de carga'],'Selenium Manager puede descargar y configurar automáticamente el driver adecuado para tu navegador.'],
  ['Una suite de Selenium usa Thread.sleep(5000) por todas partes. ¿Consecuencia más probable?',['Pruebas más rápidas y estables','Pruebas lentas y aun así inestables: usa esperas explícitas sobre condiciones','Mejor cobertura de navegadores','Ninguna'],'Las pausas fijas desperdician tiempo cuando la app es rápida y fallan cuando es lenta. Espera a una condición.'],
  ['¿Qué dice la documentación de Selenium sobre mezclar esperas implícitas y explícitas?',['Mézclalas siempre','No lo hagas: puede provocar tiempos de espera impredecibles','Las esperas implícitas son obligatorias con Grid','Las esperas explícitas están obsoletas'],'Usa esperas explícitas y deja la implícita a cero.'],
  ['Un equipo de Selenium en Python quiere ejecuciones en paralelo. ¿Qué complemento del runner es típico?',['pytest-xdist','JUnit 5','NUnit','Mocha'],'pytest-xdist reparte las pruebas de pytest entre procesos.'],
 ]},

'compare-tools':{title:'Comparar las tres',
 sum:'Una comparación de capacidades, no un ranking: elige según arquitectura, navegadores, habilidades del equipo, CI, necesidades de depuración y coste de mantenimiento.',
 sections:[
  ['Qué aprenderás',UL(['Comparar las tres herramientas por modelo, navegadores, lenguajes y depuración','Sopesar las restricciones del equipo, la infraestructura y el cumplimiento en la elección de herramienta','Planificar una migración entre herramientas sin perder cobertura'])],
  ['Comparación de capacidades',T(['Área','Playwright','Cypress','Selenium'],[
   ['Modelo principal','Framework E2E integrado','Plataforma de calidad centrada en el navegador','Ecosistema de automatización de navegadores'],
   ['Navegadores','Chromium, Firefox, WebKit','Familia Chrome, Firefox y navegadores soportados','Navegadores principales vía WebDriver'],
   ['Runner','Playwright Test integrado','Runner / app integrados','Normalmente un runner externo'],
   ['Pruebas de API','Soportadas','Soportadas','Normalmente mediante librerías'],
   ['Pruebas de componentes','Soportadas','Flujo muy sólido','Mediante el ecosistema circundante'],
   ['Accesibilidad','Mediante herramientas / integraciones','Capacidades dedicadas','Requiere herramientas del ecosistema'],
   ['Paralelismo','Integrado y configurable','Soportado; Cloud añade orquestación','Grid / runner / infraestructura'],
   ['Ejecución remota','Mediante infraestructura','Flujos de CI / nube','Sólido modelo Grid'],
   ['Depuración','Trace Viewer, modo UI, informes','Instantáneas de «viaje en el tiempo», DevTools','Depende del framework / herramientas'],
   ['Ideal para','Web moderna E2E, varios navegadores','Equipos front-end que quieren pruebas integradas en el navegador','Ecosistema WebDriver / grid remoto']])],
  ['Lenguajes y ecosistemas',T(['','Playwright','Cypress','Selenium'],[
  ['Lenguajes oficiales','TypeScript/JavaScript, Python, Java, .NET','JavaScript/TypeScript','Java, Python, C#, Ruby, JavaScript'],
  ['Móvil','Emulación móvil (viewport, táctil, user agent)','Emulación del tamaño de ventana','Dispositivos reales mediante Appium (protocolo WebDriver)'],
  ['Varias pestañas / orígenes','Soportado','Limitado; cy.origin() para otros orígenes','Soportado'],
  ['Licencia','Apache-2.0','MIT (app); Cloud es comercial','Apache-2.0']])],
  ['Decide con contexto',`<p>Sopesa: arquitectura de la aplicación, navegadores necesarios, lenguaje y habilidades del equipo, infraestructura de CI, necesidades de depuración, tipos de prueba, restricciones de cumplimiento y coste de mantenimiento.</p>`+CO('tip','Consejo','Prueba el <a href="#picker">selector de herramientas</a> para ver cómo tus propias restricciones cambian el equilibrio.')],
  ['Migrar entre herramientas',OL(['Haz inventario de la suite actual: ¿qué pruebas aportan cobertura de riesgo real, cuáles son redundantes y cuáles son siempre inestables?','Migra por <b>valor</b>, no archivo por archivo. Empieza por smoke y los recorridos críticos.','Ejecuta la suite antigua y la nueva en paralelo durante un tiempo y compara lo que detecta cada una.','Traslada las ideas del framework (datos, fixtures, page objects), no la sintaxis línea a línea.','Retira las pruebas antiguas solo cuando su cobertura exista en la nueva suite.','Actualiza la documentación, el CI y la responsabilidad como parte de la migración, no después.'])+CO('risk','Riesgo','Una migración que traslada cada prueba sin cambios también traslada cada aserción débil y cada patrón inestable. Aprovéchala para eliminar pruebas que no aportan información.')],
 ],
 quiz:[
  ['Debes ejecutar pruebas en WebKit (el motor de Safari) en CI con Linux. ¿Qué conjunto de navegadores integrado lo cubre más directamente?',['Playwright','Cypress','Selenium IDE','Ninguno'],'Playwright incluye los motores Chromium, Firefox y WebKit y los ejecuta en Linux, Windows y macOS.'],
  ['Tu empresa tiene un gran grid existente y equipos de pruebas en Java. ¿Qué encaja de forma más natural?',['Playwright','Cypress','Selenium','Una nueva plataforma de IA'],'La infraestructura Selenium existente y los bindings de WebDriver son razones de peso para quedarse en ese ecosistema.'],
  ['¿Qué herramienta suele necesitar un runner de pruebas externo?',['Playwright','Cypress','Selenium','Las tres'],'Selenium aporta la automatización del navegador; el runner —JUnit, TestNG, pytest o NUnit— lo añades tú.'],
  ['La tabla comparativa de la guía se describe mejor como…',['Un ranking de mejor a peor','Una comparación de capacidades: la elección depende del contexto','Una tabla de precios','Un benchmark de rendimiento'],'La guía dice explícitamente que es una comparación de capacidades, no un ranking.'],
  ['Tu equipo escribe pruebas en C#. ¿Qué herramientas tienen soporte oficial para .NET?',['Solo Cypress','Playwright y Selenium','Cypress y Selenium','Ninguna'],'Playwright tiene versión .NET y Selenium bindings de C#; Cypress es solo JavaScript/TypeScript.'],
  ['¿Cuál es el mejor orden para migrar pruebas a una herramienta nueva?',['Alfabético por archivo','Por valor: primero smoke y recorridos críticos','Las más nuevas primero','Todo a la vez en un PR'],'Migra primero la cobertura de más valor y ejecuta la suite antigua y la nueva en paralelo.'],
 ]},

'api-testing':{title:'Pruebas de API',
 sum:'Prueba reglas de negocio, contratos y seguridad en la API —más rápido y estable que por la UI— y combínalo con pruebas de UI.',
 sections:[
  ['Qué aprenderás',UL(['Usar los códigos de estado HTTP y la semántica de los métodos como oráculos de prueba','Escribir pruebas de API y pruebas combinadas de API + UI con Playwright','Validar respuestas frente a un esquema y un contrato de consumidor','Probar los riesgos del OWASP API Top 10, empezando por BOLA'])],
  ['Por qué probar en la capa de API',`<p>La mayoría de las reglas de negocio, la validación y la autorización viven detrás de una API. Probar ahí es rápido, determinista y sobrevive a los rediseños de la UI: el «nivel más bajo que da suficiente confianza» del módulo de estrategia.</p>`],
  ['Fundamentos de HTTP',`${T(['Código','Significado','Prueba típica'],[
   ['200 OK','Éxito con cuerpo','GET devuelve el recurso'],['201 Created','Se creó un recurso','POST devuelve el nuevo id (a menudo con cabecera Location)'],['204 No Content','Éxito, cuerpo vacío','DELETE correcto'],
   ['400 Bad Request','Petición mal formada','JSON no válido, tipos incorrectos'],['401 Unauthorized','Autenticación ausente o no válida','Sin token, token caducado'],['403 Forbidden','Autenticado pero sin permiso','El usuario A accede al recurso del usuario B'],
   ['404 Not Found','No existe el recurso (también para ocultar su existencia)','Id desconocido'],['409 Conflict','Conflicto con el estado actual','Registro duplicado'],['422 Unprocessable Content','Sintaxis válida, errores semánticos','Contraseña demasiado corta'],
   ['429 Too Many Requests','Límite de peticiones alcanzado (RFC 6585)','Ráfaga de intentos de inicio de sesión'],['500 Internal Server Error','Error de servidor no controlado','Nunca debería provocarse con una entrada: registra un defecto'],['503 Service Unavailable','No disponible temporalmente','Dependencia caída / mantenimiento']])}
   ${T(['Método','Seguro','Idempotente'],[['GET, HEAD, OPTIONS','Sí','Sí'],['PUT, DELETE','No','Sí'],['POST, PATCH','No','No por definición']])}
   ${CO('note','Idea clave','Idempotente significa que repetir la misma petición deja el servidor en el mismo estado. Pruébalo: envía el mismo PUT o DELETE dos veces y comprueba el estado (y que los reintentos de tu cliente sean seguros).')}`],
  ['Pruebas de API con Playwright',`<p>La fixture <code class="i">request</code> es un <code class="i">APIRequestContext</code> aislado. Toma <code class="i">baseURL</code> y <code class="i">extraHTTPHeaders</code> de <code class="i">use</code> en la configuración.</p>
${P(0)}
<p>Otras piezas útiles: <code class="i">request.get/put/patch/delete/fetch</code>, en la respuesta <code class="i">ok()</code> (200–299), <code class="i">status()</code>, <code class="i">headers()</code>, <code class="i">json()</code>; y <code class="i">request.newContext({ baseURL, extraHTTPHeaders })</code> para un cliente configurado aparte.</p>`],
  ['Combina API y UI',`<p>Crea los datos por la API y verifica por la UI solo lo que el usuario debe ver: preparación rápida, comprobaciones de UI enfocadas:</p>
${P(0)}`],
  ['Contratos y esquemas',UL(['Las <b>pruebas de contrato</b> verifican cada lado de una integración por separado frente a un contrato compartido. Con <b>Pact</b> están dirigidas por el consumidor: las pruebas del consumidor generan el contrato y el proveedor se verifica frente a él.','La <b>validación de esquemas</b> —comprobar los cuerpos de respuesta frente a un JSON Schema (p. ej., con una librería validadora como Ajv)— detecta pronto campos ausentes y tipos incorrectos.','Los contratos complementan, no sustituyen, unas pocas comprobaciones end-to-end de la integración real.'])],
  ['Ejemplo de validación de esquema',`${P(0)}
 ${CO('tip','Consejo','additionalProperties: false convierte el esquema en una pequeña comprobación de seguridad: un campo nuevo como passwordHash en una respuesta hace fallar la prueba en lugar de filtrarse sin que nadie lo note.')}`],
  ['Seguridad de API: OWASP API Top 10 (2023)',`${T(['ID','Riesgo'],[['API1','Autorización rota a nivel de objeto (BOLA)'],['API2','Autenticación rota'],['API3','Autorización rota a nivel de propiedad de objeto'],['API4','Consumo de recursos sin restricciones'],['API5','Autorización rota a nivel de función'],['API6','Acceso sin restricciones a flujos de negocio sensibles'],['API7','Falsificación de peticiones del lado del servidor (SSRF)'],['API8','Configuración de seguridad incorrecta'],['API9','Gestión inadecuada del inventario'],['API10','Consumo inseguro de APIs de terceros']])}
${P(0)}
${CO('risk','Riesgo','BOLA es el n.º 1 por algo: las APIs exponen identificadores de objeto por todas partes. Cada endpoint que recibe un id necesita una prueba negativa con otro usuario.')}`],
  ['Una matriz de pruebas para un endpoint',T(['POST /api/contacts','Ejemplos'],[['Positivas','Contacto válido → 201, el cuerpo cumple el esquema, GET lo devuelve'],['Negativas','Sin nombre → 400/422; sin token → 401; id de otro tenant → 403/404'],['Límite','Nombre con la longitud máxima y máx.+1; cadena vacía; Unicode'],['Idempotencia / estado','La misma petición dos veces → gestión del duplicado según la especificación'],['Seguridad','Cadenas de inyección guardadas y devueltas de forma segura; límite → 429'],['Rendimiento','Presupuesto de tiempo de respuesta; payload demasiado grande rechazado']])],
 ],
 quiz:[
  ['Un usuario con sesión iniciada pide el pedido de otro usuario y recibe 200 con los datos. ¿Qué riesgo de OWASP API es?',['API4 Consumo de recursos sin restricciones','API1 Autorización rota a nivel de objeto','API8 Configuración de seguridad incorrecta','API9 Gestión inadecuada del inventario'],'Acceder al objeto de otro usuario por su id es BOLA, el riesgo n.º 1 de las APIs.'],
  ['¿Qué método es idempotente pero no seguro?',['GET','POST','PUT','HEAD'],'PUT y DELETE son idempotentes (repetirlos deja el mismo estado), pero cambian el estado, así que no son seguros.'],
  ['Petición sin token → ¿qué estado se espera?',['401','403','404','500'],'401 significa autenticación ausente o no válida; 403, autenticado pero sin permiso.'],
  ['¿Qué comprueba expect(response).toBeOK() en Playwright?',['Que el estado sea exactamente 200','Que el estado esté en el rango 2xx','Que el cuerpo sea JSON válido','Que la petición tardara menos de 1 s'],'toBeOK pasa con respuestas 200–299.'],
  ['En las pruebas de contrato dirigidas por el consumidor (Pact), ¿quién genera el contrato?',['El proveedor','Las pruebas del consumidor','Un arquitecto a mano','El API gateway'],'Las pruebas del consumidor producen el contrato; el proveedor se verifica frente a él.'],
  ['Una entrada no válida hace que la API devuelva 500. ¿Conclusión correcta?',['Es lo esperado: la entrada no es válida','Un defecto: una entrada no válida debería recibir un 4xx, no un error de servidor no controlado','Una prueba inestable','La prueba debería aceptar 500'],'Un 5xx ante una entrada del cliente indica errores no controlados: registra un defecto.'],
  ['¿Por qué usar additionalProperties: false en un esquema de respuesta?',['Análisis más rápido','Así un campo inesperado como passwordHash hace fallar la prueba','Lo exige JSON Schema','Para permitir cualquier campo'],'Convierte la validación de esquema en una comprobación contra la exposición accidental de datos.'],
 ]},
});
