/* Español — Ingeniería de frameworks */
TR.es=TR.es||{modules:{}};
Object.assign(TR.es.modules,{
'framework-architecture':{title:'Arquitectura del framework y POM',
 sum:'Un framework es más que una librería de pruebas: capas, servicios compartidos, datos, informes y los patrones que mantienen legibles las pruebas.',
 sections:[
  ['Qué aprenderás',UL(['Describir las cinco capas de un framework de automatización de pruebas','Aplicar principios de diseño: responsabilidad única, pruebas DAMP, aserciones en las pruebas','Escribir un Page Object enfocado en TypeScript'])],
  ['Un modelo por capas',`<div class="layers">
   <div><b>Presentación / informes</b><span>informes HTML/JSON, paneles, retroalimentación en CI</span></div>
   <div><b>Capa de pruebas</b><span>suites smoke, de regresión, de API y E2E</span></div>
   <div><b>Capa de negocio / dominio</b><span>page objects, envoltorios de servicios, flujos</span></div>
   <div><b>Núcleo del framework</b><span>configuración, fixtures, logging, fábrica de navegadores</span></div>
   <div><b>Infraestructura / entorno</b><span>datos de prueba, CI/CD, navegadores, contenedores, Grid</span></div>
   <div class="sut"><b>Sistema bajo prueba</b><span>tu aplicación</span></div></div>
   <p>Cada capa depende solo de las que tiene debajo. Las pruebas expresan la intención; las capas inferiores se encargan de la mecánica.</p>`],
  ['Componentes principales',UL(['Gestor de configuración','Fábrica de navegadores / drivers','Gestor de entornos','Utilidades de autenticación / sesión','Gestor de datos de prueba','Cliente de API / envoltorios de servicios','Page Objects u otras abstracciones de UI','Logging e informes','Recogida de capturas / trazas / vídeos','Adaptadores de base de datos o servicios externos, donde haga falta','Integración con CI/CD'])],
  ['Page Object Model',`<p>Un Page Object representa una página o un componente de UI relevante y encapsula sus locators e interacciones habituales, para que las pruebas se lean como intención de negocio y no como mecánica de selectores.</p>
${P(0)}`+CO('risk','Riesgo','POM es un patrón, no un requisito. No conviertas los page objects en clases gigantes que contengan todas las reglas de negocio y todos los flujos posibles.')],
  ['Principios de diseño para el código de pruebas',`${T(['Principio','En el código de pruebas'],[
  ['Responsabilidad única','Un page object modela una página o componente; una fixture prepara una cosa'],
  ['DAMP antes que DRY en las pruebas','Las pruebas deben ser frases descriptivas y con significado (Descriptive And Meaningful Phrases). Algo de repetición está bien si cada prueba se lee por sí sola; elimina la duplicación en los helpers, no en la historia que cuenta la prueba.'],
  ['Aserciones en las pruebas','Los page objects exponen el estado; las pruebas deciden qué es correcto. Las aserciones ocultas hacen difíciles de leer los fallos.'],
  ['Explícito mejor que mágico','Prefiere fixtures y parámetros visibles al estado global y los hooks implícitos'],
  ['Composición antes que herencia','Las jerarquías profundas BasePage → AuthPage → AdminPage se vuelven frágiles; compón componentes pequeños'],
  ['KISS','Cada abstracción debe pagarse sola. Si un ingeniero nuevo necesita un diagrama para seguir una prueba, simplifica.']])}`],
  ['Un Page Object en TypeScript',`${P(0)}
 ${CO('note','Idea clave','Exponer los locators como propiedades de solo lectura permite a las pruebas aplicarles aserciones web-first sin que el page object decida qué es «correcto».')}`],
 ],
 quiz:[
  ['¿Dónde debe vivir un helper que crea un usuario de prueba único por la API?',['En cada archivo de prueba','En el gestor de datos de prueba / capa de servicios','En el reporter HTML','En el Page Object de la página de inicio de sesión'],'Crear datos de prueba es un servicio compartido del framework, reutilizado por muchas pruebas y separado de las abstracciones de UI.'],
  ['¿Cuál es el propósito principal de un Page Object?',['Acelerar el navegador','Encapsular locators e interacciones para que las pruebas expresen la intención','Sustituir las aserciones','Guardar datos de prueba'],'Los Page Objects ocultan la mecánica de los selectores. Las aserciones suelen quedarse en la prueba para que la intención sea visible.'],
  ['¿Qué capa es dueña de la fábrica de navegadores / drivers?',['Capa de pruebas','Capa de negocio / dominio','Núcleo del framework','Presentación'],'Los servicios técnicos compartidos —configuración, fixtures, logging, fábrica de navegadores— pertenecen al núcleo del framework.'],
  ['Una clase LoginPage ha crecido hasta 2000 líneas con flujos de pago y facturación. ¿Qué falla?',['Nada, POM lo exige','El Page Object se ha convertido en una «clase dios»: divídelo por páginas / componentes y lleva los flujos a una capa de dominio','Necesita más comentarios','Debería usar XPath'],'La guía advierte contra los Page Objects gigantes con todas las reglas y flujos: se convierten en el cuello de botella del mantenimiento.'],
  ['¿Qué significa «DAMP antes que DRY» en el código de pruebas?',['Eliminar cada línea repetida','Mantener las pruebas descriptivas y legibles por sí solas, aunque haya algo de repetición','Usar bases de datos','Evitar los page objects'],'Las pruebas legibles importan más que la duplicación mínima; deduplica en los helpers.'],
  ['¿Por qué exponer los locators como propiedades de solo lectura en un page object?',['Para ocultarlos','Para que las pruebas les apliquen aserciones web-first mientras la prueba conserva el juicio','Por velocidad','Porque lo exige Playwright'],'Las pruebas comprueban; los page objects exponen estado e interacciones.'],
 ]},

'framework-types':{title:'Tipos de framework: de lineal a híbrido',
 sum:'Las formas clásicas de estructurar un framework de automatización, en qué es bueno cada una y cómo elegir la adecuada para tu equipo.',
 sections:[
  ['Qué aprenderás',UL(['Nombrar los tipos clásicos de framework, de scripts lineales a híbridos','Escribir pruebas guiadas por datos y de estilo palabras clave / BDD','Elegir un tipo de framework según las habilidades del equipo y quién escribe las pruebas'])],
  ['Los seis tipos clásicos',T(['Tipo','Cómo se escriben las pruebas','Bueno para','Falla cuando'],[
   ['Lineal (grabar/reproducir)','Un script por prueba, pasos grabados o escritos de arriba abajo','Prototipos rápidos, aprender una herramienta','Algo cambia: cada script repite los mismos pasos'],
   ['Modular','Las pruebas llaman a módulos compartidos (p. ej., login(), addToCart())','Eliminar duplicación','Los módulos crecen hasta ser una maraña sin capas claras'],
   ['Arquitectura de librería','Funciones compartidas empaquetadas en una librería que importan las pruebas','Varios equipos que reutilizan las mismas acciones','La librería se convierte en un cajón de sastre'],
   ['Guiado por datos (data-driven)','Una lógica de prueba, muchas filas de entradas y resultados esperados','Reglas de negocio, validación, cálculos','La lógica varía por fila; el archivo de datos se convierte en código'],
   ['Guiado por palabras clave (keyword-driven)','Las pruebas son tablas de palabras clave («Open Browser», «Input Text») implementadas una vez en código','Pruebas escritas por no programadores; Robot Framework','Las palabras clave se multiplican y depurar atraviesa dos capas'],
   ['Híbrido','Mezcla los anteriores; normalmente código modular con page objects más pruebas guiadas por datos','La mayoría de frameworks reales','Nadie dejó escrito qué estilo usar en cada sitio']])+CO('note','Idea clave','Casi todos los frameworks modernos con Playwright o Selenium son híbridos: page objects y fixtures modulares, guiados por datos donde varían los datos y a veces una capa BDD encima.')],
  ['Pruebas guiadas por datos en Playwright',`${P(0)}
 ${UL(['Pon la descripción del caso en el título de la prueba para que un fallo indique qué fila se rompió.','Mantén los datos junto a la prueba mientras sean pocos; muévelos a <code class="i">tests/data/*.json</code> o CSV cuando los mantengan personas de negocio.','Obtén las filas de técnicas de diseño de pruebas —particiones y límites—, no de los valores que se te ocurran.'])}`],
  ['Palabras clave y BDD',`<p><b>Guiado por palabras clave</b> (estilo Robot Framework): una prueba es una tabla de palabras clave con argumentos:</p>
${P(0)}
 <p><b>BDD</b> (estilo Cucumber/Gherkin): escenarios en lenguaje de negocio, cada paso enlazado a código:</p>
${P(1)}
 ${CO('risk','Riesgo','BDD compensa cuando las personas de producto realmente leen o escriben los escenarios. Si solo los ingenieros tocan los archivos .feature, has añadido una capa de traducción y un segundo lugar para los bugs, sin que nadie lea el resultado.')}`],
  ['Elegir un tipo',T(['Si…','Inclínate por'],[
   ['Los ingenieros escriben y mantienen todas las pruebas','Un híbrido centrado en código: page objects, fixtures, datos donde ayuden'],
   ['Escribirán pruebas testers manuales o analistas','Palabras clave (Robot Framework) o una herramienta low-code'],
   ['Los product owners colaboran en los criterios de aceptación','BDD, con un verdadero hábito de «tres amigos», no solo sintaxis Gherkin'],
   ['Hay que comprobar la misma regla con muchas entradas','Guiado por datos, idealmente en la capa de API'],
   ['Necesitas algo que funcione esta semana','Empieza modular y simple; añade capas solo cuando la duplicación duela']])+CO('tip','Consejo','Deja escrita la decisión y su motivo en docs/architecture.md. «¿Por qué no usamos BDD?» es uno de esos debates que siempre vuelven.')],
 ],
 quiz:[
  ['¿Qué tipo de framework separa una lógica de prueba de muchas filas de entradas y resultados esperados?',['Lineal','Guiado por palabras clave','Guiado por datos','Arquitectura de librería'],'Los frameworks guiados por datos ejecutan la misma lógica con muchas filas de datos.'],
  ['Un equipo de testers manuales con poca experiencia programando escribirá la mayoría de las pruebas. ¿Qué tipo les encaja mejor?',['Grabar/reproducir lineal para siempre','Guiado por palabras clave, p. ej. Robot Framework','TypeScript puro centrado en código','Ninguno: no deberían escribir pruebas'],'Las palabras clave permiten a los no programadores componer pruebas mientras los ingenieros implementan las palabras clave.'],
  ['La mayoría de los frameworks modernos con Playwright se describen mejor como…',['Lineales','Guiados por palabras clave','Híbridos','Grabar/reproducir'],'Mezclan page objects y fixtures modulares con pruebas guiadas por datos.'],
  ['Solo los ingenieros leen o escriben los archivos Gherkin del equipo. ¿Principal inconveniente?',['Gherkin es lento','Una capa extra de traducción sin el beneficio de colaboración para el que existe BDD','Cucumber no funciona en CI','Los escenarios no pueden ser guiados por datos'],'El valor de BDD es el entendimiento compartido con negocio; sin eso, es sobrecarga.'],
  ['En una prueba guiada por datos, ¿por qué incluir los valores de la fila en el título?',['Los títulos deben ser únicos y así un fallo indica exactamente la fila que se rompió','Hace las pruebas más rápidas','Lo exige Playwright','Por la cobertura de código'],'Los títulos únicos y descriptivos hacen legibles los informes y son obligatorios cuando las pruebas se generan en un bucle.'],
  ['¿De dónde deberían salir las filas de una prueba de descuentos guiada por datos?',['Valores aleatorios','Particiones de equivalencia y valores límite de la regla de descuento','Solo de los logs de producción','De lo que usó el desarrollador'],'Las técnicas de diseño de pruebas convierten una regla en un conjunto pequeño de filas significativas.'],
 ]},

'design-patterns':{title:'Patrones de diseño para el código de pruebas',
 sum:'Los Page Objects son solo el principio. Component objects, Screenplay, builders, factorías y clientes de API mantienen legibles los frameworks grandes.',
 sections:[
  ['Qué aprenderás',UL(['Aplicar Page Objects, component objects y el patrón Screenplay','Construir datos de prueba con factorías y builders','Ocultar los detalles HTTP tras un envoltorio de cliente de API','Reconocer la sobreingeniería en el código de pruebas'])],
  ['Los patrones de un vistazo',T(['Patrón','Problema que resuelve','Úsalo cuando'],[
   ['Page Object','Locators e interacciones dispersos por las pruebas','Las páginas son bastante distintas'],
   ['Component object','El mismo widget (selector de fecha, tabla, navegación) en muchas páginas','Tu app está hecha de componentes de UI reutilizables'],
   ['Screenplay','Los page objects crecen hasta ser clases dios; las pruebas se leen como clics','Suites grandes, muchos actores y roles'],
   ['Builder / factoría','La preparación de datos de prueba es larga y ruidosa','Los objetos tienen muchos campos con valores por defecto razonables'],
   ['Envoltorio de cliente de API','Detalles HTTP (URLs, cabeceras, autenticación) repetidos en las pruebas','Las pruebas preparan el estado por la API'],
   ['Interfaz fluida','Las secuencias largas de pasos son difíciles de leer','Los flujos son lineales y conocidos'],
   ['Estrategia / objeto de configuración','El comportamiento varía según el entorno o el navegador','Varios entornos o modos de ejecución']])],
  ['Component objects',`${P(0)}
 ${CO('tip','Consejo','Acota el componente a su locator raíz. Así dos tablas en una misma página no se interfieren y el componente funciona dondequiera que se coloque.')}`],
  ['El patrón Screenplay',`<p>Screenplay modela las pruebas en torno a <b>actores</b> que tienen <b>habilidades</b> (navegar por la web, llamar a una API), realizan <b>tareas</b> formadas por <b>interacciones</b> y hacen <b>preguntas</b> sobre el estado del sistema. Serenity BDD (Java, y Serenity/JS) es la implementación más conocida.</p>
${P(0)}
 ${UL(['<b>Ventaja:</b> clases pequeñas con un único propósito; se lee como comportamiento de negocio; escala a muchos roles.','<b>Coste:</b> más conceptos y archivos. Para una suite pequeña, page objects y fixtures suelen bastar.'])}`],
  ['Builders y factorías de datos de prueba',`${P(0)}
 ${CO('note','Idea clave','Con un builder, la prueba menciona solo los datos que importan para su resultado. Quien la lee ve al instante en qué se diferencia de las demás.')}`],
  ['Envoltorios de cliente de API',`${P(0)}
 <p>Expón el envoltorio mediante una fixture y las pruebas quedarán así: <code class="i">await contactsApi.create(aContact())</code>. Mantén una vía fina de peticiones en bruto para las pruebas <i>de</i> la propia API: necesitan ver los códigos de estado y las cabeceras que el envoltorio oculta.</p>`],
  ['Antipatrones a evitar',UL(['<b>Page object dios</b>: una clase con todos los flujos de la app.','<b>Herencia profunda</b>: BasePage → LoggedInPage → AdminPage → …, donde un cambio arriba lo rompe todo.','<b>Aserciones escondidas en helpers</b>: los fallos señalan al helper, no a lo que esperaba la prueba.','<b>Helpers basados en pausas</b>: <code class="i">waitABit()</code> con un nombre bonito sigue siendo una pausa.','<b>Abstracción especulativa</b>: capas escritas «por si acaso». Añade una capa cuando la duplicación duela, no antes.','<b>Singletons mutables compartidos</b>: un «usuario actual» global que las pruebas en paralelo sobrescriben.'])+CO('risk','Riesgo','Cada patrón es una herramienta contra un problema concreto. Adoptarlos todos en una suite de 30 pruebas produce un framework que solo entiende su autor.')],
 ],
 quiz:[
  ['El mismo selector de fecha aparece en 12 páginas. ¿Qué patrón evita duplicar su lógica?',['Un page object más grande por página','Un component object acotado al locator raíz del widget','Actores de Screenplay','Tablas de palabras clave'],'Los component objects modelan una vez los widgets reutilizables y se componen dentro de las páginas.'],
  ['En el patrón Screenplay, ¿quién realiza las tareas?',['Las páginas','Los actores con habilidades','Las fixtures','Los reporters'],'Los actores tienen habilidades (navegar, llamar a una API) y realizan tareas formadas por interacciones.'],
  ['¿Cuál es la principal ventaja de un builder de datos de prueba con valores por defecto y sobrescrituras?',['Ejecución más rápida','Las pruebas indican solo los datos relevantes para su resultado','Sustituye a las aserciones','Cifra los datos'],'Los valores por defecto esconden el ruido; las sobrescrituras resaltan de qué trata la prueba.'],
  ['¿Por qué mantener una vía de peticiones en bruto si tienes un envoltorio ContactsApi?',['Los envoltorios son lentos','Las pruebas de la propia API necesitan ver los códigos de estado y cabeceras que el envoltorio oculta','Las peticiones en bruto son más seguras','Lo exige Playwright'],'Los envoltorios son para preparar; las pruebas de API necesitan acceso directo a los detalles de la respuesta.'],
  ['Un helper llamado waitForPageToSettle() contiene waitForTimeout(3000). ¿Qué es?',['Una espera basada en condiciones','Una pausa con un nombre bonito: un antipatrón','Una fixture','Una aserción web-first'],'Darle nombre a una pausa no hace que espere a una condición real.'],
  ['Una suite de 30 pruebas ya tiene page objects, Screenplay, tres capas de builders y un contenedor de DI. ¿Qué antipatrón?',['Page object dios','Abstracción especulativa / sobreingeniería','Aserciones ausentes','Datos compartidos'],'Las abstracciones deben pagarse solas; las suites pequeñas rara vez las necesitan todas.'],
 ]},

'framework-docs':{title:'Documentación del framework',
 sum:'La documentación forma parte del framework: versionada, actualizada en el mismo cambio y lo bastante buena para que un ingeniero nuevo sea productivo rápido.',
 sections:[
  ['Qué aprenderás',UL(['Enumerar el conjunto mínimo de documentación de un framework','Evaluar la documentación con siete criterios de calidad','Partir de una plantilla de README que los ingenieros nuevos puedan ejecutar'])],
  ['Conjunto mínimo de documentación',OL(['README: propósito, requisitos previos, inicio rápido','Visión general de la arquitectura con las responsabilidades de cada componente','Estructura de carpetas y convenciones de nombres','Entorno / configuración','Cómo ejecutar una prueba, una suite, smoke y ejecuciones equivalentes a CI','Estrategia de datos de prueba y reglas de limpieza','Estrategia de autenticación / sesión','Convenciones de locators','Convenciones de Page Object / capa de servicios','Informes y artefactos','Comportamiento del pipeline de CI/CD','Política de reintentos y pruebas inestables','Guía de resolución de problemas','Reglas de contribución y revisión de código','Gestión de dependencias / versiones'])],
  ['Criterios de calidad',T(['Criterio','Buen estado','Riesgo si falta'],[['Actualidad','La documentación cambia junto con el código del framework','Desfase de la documentación'],['Localizable','El README enlaza a documentación más detallada','Retrasos en la incorporación'],['Ejecutable','Los comandos se pueden copiar y ejecutar','Un ingeniero nuevo no puede validar su entorno'],['Arquitectura','Responsabilidades y dependencias explícitas','Acoplamiento oculto'],['Ejemplos','Ejemplos representativos que funcionan','Implementación inconsistente'],['Resolución de problemas','Fallos conocidos y diagnóstico','Investigaciones repetidas'],['Justificación','Decisiones de diseño explicadas','Debates de arquitectura repetidos']])+CO('tip','Consejo','Incluye «documentación actualizada» en la checklist de los pull requests. El desfase es el fallo más común de la documentación de frameworks.')],
  ['Una plantilla de README',`${P(0)}
 ${CO('tip','Consejo','Prueba el README como pruebas el código: una vez por trimestre, pide a alguien nuevo que lo siga en una máquina limpia y corrige cada paso que falle.')}`],
 ],
 quiz:[
  ['Un ingeniero nuevo copia el comando de ejecución del README y falla. ¿Qué criterio de calidad se incumple?',['Justificación','Ejecutable','Localizable','Ejemplos'],'Ejecutable significa que los comandos de la documentación se pueden copiar y ejecutar tal cual.'],
  ['¿Dónde debería vivir la documentación del framework?',['En una wiki a la que nadie enlaza','Versionada con el framework y actualizada en el mismo cambio','En la cabeza de la gente','En los logs de CI'],'La documentación versionada con el código y actualizada en el mismo PR evita el desfase.'],
  ['Los equipos vuelven una y otra vez a debatir «¿por qué no usamos BDD?». ¿Qué criterio falta?',['Justificación: las decisiones de diseño clave no están escritas','Ejecutable','Actualidad','Ejemplos'],'Sin una justificación escrita, se repiten los mismos debates de arquitectura.'],
  ['¿Qué NO forma parte del conjunto mínimo de documentación?',['Política de reintentos y pruebas inestables','Guía de resolución de problemas','El tema del IDE de cada ingeniero','Convenciones de locators'],'El conjunto cubre cómo ejecutar, ampliar, depurar y revisar el framework, no preferencias personales.'],
  ['¿Cuál es la mejor forma de mantener correcto el inicio rápido del README?',['Reescribirlo cada año','Que alguien nuevo lo siga regularmente en una máquina limpia y corregir lo que falle','Añadir más capturas','Pasarlo a una wiki'],'Que sea ejecutable se demuestra ejecutándolo, como una prueba.'],
 ]},

'project-structure':{title:'Estructura del proyecto y flujo de trabajo',
 sum:'Una estructura recomendada para Playwright/TypeScript y un ejemplo guiado: de un requisito a una prueba mantenida y conectada a CI.',
 sections:[
  ['Qué aprenderás',UL(['Organizar un proyecto de Playwright/TypeScript','Etiquetar y seleccionar suites (smoke, regresión) desde la línea de comandos','Configurar varios entornos sin cambiar código','Llevar un requisito hasta una prueba mantenida y conectada a CI'])],
  ['Estructura recomendada',`${P(0)}`],
  ['Etiquetas, suites y entornos',`${P(0)}
 ${UL(['Nombra las specs por comportamiento: <code class="i">registration.spec.ts</code>, no <code class="i">test1.spec.ts</code>.','Nombra las pruebas como resultados que reconocería un stakeholder: «un usuario bloqueado ve un error», no «prueba de login 3».','Guarda los valores propios de cada entorno (URLs, feature flags) en variables de entorno o configuración por entorno, nunca en el código de las pruebas.','Sube a git un <code class="i">.env.example</code> con valores de relleno e ignora el <code class="i">.env</code> real.'])}`],
  ['Ejemplo guiado: «un usuario puede registrarse»',OL(['<b>Requisito:</b> un usuario puede registrarse.','<b>Análisis de riesgos:</b> cuenta duplicada, email no válido, reglas de contraseña débiles, discrepancia API/UI.','<b>Pruebas de API:</b> contrato, códigos de estado, validación, comportamiento ante duplicados.','<b>Prueba de UI:</b> solo el recorrido crítico del usuario.','<b>Datos de prueba:</b> una cuenta única por prueba.','<b>Aserción:</b> verifica tanto el estado de la aplicación como el resultado visible para el usuario.','<b>Artefactos:</b> traza / captura al fallar.','<b>CI:</b> smoke de registro en los pull requests.','<b>Regresión:</b> matriz de registro más amplia tras el merge / cada noche.','<b>Mantenimiento:</b> actualiza prueba y documentación en el mismo cambio.'])+CO('note','Idea clave','Fíjate en el reparto: muchas comprobaciones en la API y un solo recorrido en la UI. Es la pirámide de pruebas en la práctica.')],
 ],
 quiz:[
  ['En el ejemplo de registro, ¿por qué generar una cuenta única por prueba?',['Para que los informes queden más bonitos','Para que las pruebas sigan siendo independientes y puedan ir en paralelo sin chocar','Porque lo exige la API','Para ralentizar las pruebas'],'Las cuentas compartidas son una de las principales causas de pruebas inestables y dependientes del orden, sobre todo en paralelo.'],
  ['En la estructura recomendada, ¿dónde está LoginPage.ts?',['tests/ui/','pages/','utils/','docs/'],'Los Page Objects están en pages/, separados de las specs en tests/ y de los helpers en utils/.'],
  ['¿Por qué comprobar en la prueba de registro tanto la respuesta de la API como el resultado visible?',['Para duplicar el tiempo de ejecución','La UI puede decir «éxito» sin que se haya creado la cuenta, o al revés','Porque Playwright exige dos aserciones','Para informes más bonitos'],'Comprobar estado y presentación detecta discrepancias API/UI, uno de los riesgos identificados en el ejemplo.'],
  ['¿Cuándo deben actualizarse la prueba de registro y su documentación?',['La documentación, una vez al año','En el mismo cambio','Solo cuando se queje un ingeniero nuevo','Nunca: el código es la documentación'],'Paso 10 del flujo: actualiza prueba y documentación juntas.'],
  ['¿De dónde debería salir la URL de staging para las pruebas?',['Escrita en cada spec','De una variable de entorno o configuración por entorno','Del README','De un page object'],'Los valores propios de cada entorno van fuera del código de pruebas para que una suite pueda apuntar a muchos entornos.'],
  ['¿Qué archivo se sube a git: .env o .env.example?',['.env','.env.example con valores de relleno','Los dos','Ninguno'],'El ejemplo documenta las variables necesarias; el .env real contiene secretos y se ignora en git.'],
 ]},

'test-data':{title:'Gestión de datos de prueba',
 sum:'La mayoría de las pruebas inestables y dependientes del orden son problemas de datos. Crea los datos a propósito, mantenlos aislados y límpialos.',
 sections:[
  ['Qué aprenderás',UL(['Elegir una estrategia de datos de prueba: por API, carga en base de datos, factorías, datos sintéticos o enmascarados','Mantener los datos únicos y aislados para que las pruebas puedan ir en paralelo','Planificar una limpieza que funcione aunque la prueba falle'])],
  ['Comparación de estrategias',T(['Estrategia','Cómo','Ventajas','Riesgos'],[
   ['Crear por API en cada prueba','Una fixture o un builder llama a la API al preparar','Rápido, aislado, reglas de negocio realistas','Requiere una API utilizable; hay que limpiar'],
   ['Cargar la base de datos','Scripts SQL o migraciones cargan un estado conocido','Control total, bueno para estados complejos','Se salta las reglas de negocio; ligado al esquema'],
   ['Fixtures estáticas','Archivos JSON/CSV en el repositorio','Simple, revisable, determinista','Se queda obsoleto; los registros compartidos chocan en paralelo'],
   ['Sintéticos / generados','Librerías como Faker generan valores realistas','Variedad, sin datos personales','Los datos aleatorios pueden dificultar reproducir los fallos'],
   ['Copia enmascarada de producción','Subconjunto anonimizado de datos reales','Volumen y casos límite realistas','Riesgo de privacidad si el enmascarado es incompleto; revisión legal'],
   ['Virtualización de servicios / mocks','Stubs de las respuestas de sistemas externos','Controla a terceros y los errores poco frecuentes','Se desvía del servicio real']])],
  ['Reglas para que los datos no causen inestabilidad',OL(['<b>Únicos por prueba</b>: genera identificadores con un UUID o un id de ejecución. Nunca compartas un «usuario de prueba» entre pruebas en paralelo.','<b>Sé dueño de lo que compruebas</b>: una prueba debe crear, o poseer en exclusiva, los registros cuyo estado verifica.','<b>Los datos compartidos de solo lectura están bien</b>: los datos de referencia (países, catálogo de productos) pueden cargarse una vez.','<b>Espacio de nombres por ejecución</b>: prefija los datos con un id de ejecución para que un trabajo de limpieza pueda borrar todo lo que creó esa ejecución.','<b>Semilla de la aleatoriedad</b>: cuando uses valores generados, registra la semilla para poder reproducir un fallo.','<b>Nada de datos personales de producción</b> en pruebas, fixtures, logs ni artefactos.'])],
  ['Una limpieza que sobrevive al fallo',`${P(0)}
 ${UL(['Prefiere la limpieza en fixtures a los pasos de limpieza al final de la prueba, que se saltan si antes falla una aserción.','Añade un <b>barrendero</b> (sweeper): un trabajo programado que borra todo lo que tenga prefijo de prueba y más de un día. Recoge lo que la limpieza no pudo tras un fallo grave.','Para estados grandes, plantéate <b>entornos efímeros</b>: crea una base de datos o entorno nuevo por ejecución del pipeline y descártalo después.'])}
 ${CO('tip','Consejo','Si limpiar es difícil, comprueba si la prueba realmente necesita borrar: los datos en un espacio de nombres único que nadie más lee no hacen daño hasta que el barrendero los elimina.')}`],
  ['Datos generados reproducibles',`${P(0)}
 ${CO('risk','Riesgo','Los nombres generados incluyen apóstrofos, acentos y cadenas largas: muy útiles para encontrar bugs, pero solo si puedes reproducir el valor que falló. Registra siempre la semilla o el valor.')}`],
 ],
 quiz:[
  ['Dos pruebas en paralelo inician sesión como qa-user@example.test y editan el mismo perfil. ¿Resultado más probable?',['Pruebas más rápidas','Fallos intermitentes por choques sobre datos compartidos','Mejor cobertura','Nada'],'Los datos mutables compartidos entre workers en paralelo son una de las principales causas de inestabilidad.'],
  ['¿Por qué poner la limpieza en el teardown de la fixture y no al final del cuerpo de la prueba?',['Es más rápido','El teardown se ejecuta aunque antes falle una aserción','Playwright prohíbe limpiar en las pruebas','Lo exigen los informes'],'Los pasos tras una aserción fallida no se ejecutan; el teardown de la fixture siempre.'],
  ['¿Cuál es el principal riesgo de cargar datos directamente en la base de datos?',['Es demasiado lento','Puede saltarse las reglas de negocio y ata las pruebas al esquema','No se puede automatizar','Usa demasiada memoria'],'Las inserciones directas se saltan la validación que aplicaría la aplicación y se rompen al cambiar el esquema.'],
  ['Una prueba con datos de Faker falla una vez y no se puede reproducir. ¿Qué faltaba?',['Más reintentos','Registrar la semilla (o los valores generados)','Un navegador más lento','Un conjunto de datos mayor'],'Con la semilla puedes regenerar exactamente los mismos datos.'],
  ['¿Qué datos se pueden compartir en general sin riesgo entre pruebas en paralelo?',['Un carrito compartido','Datos de referencia de solo lectura, como una lista de países','Una cuenta de administrador compartida cuyos ajustes cambian las pruebas','Un «pedido actual» global'],'Compartir solo es seguro cuando ninguna prueba modifica los datos.'],
  ['¿Qué hace un trabajo «barrendero» programado?',['Vuelve a ejecutar las pruebas inestables','Borra los datos de prueba sobrantes (p. ej., por prefijo y antigüedad) que la limpieza no eliminó','Limpia las cachés de CI','Fusiona informes'],'Recoge los datos que dejaron las ejecuciones que fallaron gravemente o se cancelaron.'],
 ]},

'ci-cd':{title:'CI/CD y pruebas continuas',
 sum:'No ejecutes todo en todas partes: da una retroalimentación adecuada al riesgo en cada etapa del pipeline, con artefactos útiles.',
 sections:[
  ['Qué aprenderás',UL(['Asignar suites a etapas del pipeline','Escribir un workflow de GitHub Actions con sharding y artefactos','Definir quality gates que mantengan la confianza en el CI'])],
  ['Suites por etapa',`<div class="pipeline">
   <div><b>LOCAL</b>Unitarias / de componentes / de API enfocadas: retroalimentación rápida al desarrollador</div>
   <div><b>PULL REQUEST</b>Lint + unitarias + smoke + E2E/API seleccionadas</div>
   <div><b>TRAS EL MERGE</b>Regresión más amplia en la rama integrada</div>
   <div><b>CADA NOCHE</b>Regresión ampliada en varios navegadores</div>
   <div><b>RELEASE</b>Smoke de release + recorridos críticos</div>
   <div><b>PROGRAMADO</b>Pruebas largas / de compatibilidad, seguimiento de tendencias</div></div>`],
  ['Un workflow de GitHub Actions con sharding',`<p>El sharding reparte la suite entre varias máquinas; cada shard ejecuta una parte. El reporter <code class="i">blob</code> de Playwright permite después fusionar los shards en un único informe HTML.</p>
${P(0)}
 <p>Un trabajo posterior descarga los artefactos blob y ejecuta <code class="i">npx playwright merge-reports --reporter html ./all-blob-reports</code>.</p>
 ${CO('tip','Consejo','Las versiones de las actions cambian. Fija las versiones mayores actuales desde la página de cada action y usa una retención corta para los artefactos que puedan contener datos.')}`],
  ['Artefactos a conservar',UL(['Resultados compatibles con JUnit, donde se soporten','Informes HTML','Capturas al fallar','Vídeos, donde sean útiles','Trazas de Playwright o equivalentes','Logs','Metadatos del entorno / build','Información de pruebas inestables y reintentos'])],
  ['Quality gates',T(['Gate','Regla de ejemplo','Por qué'],[
  ['Comprobaciones bloqueantes','Lint, unitarias y smoke deben pasar para hacer merge','Frena pronto las roturas evidentes'],
  ['Sin pruebas focalizadas','forbidOnly en CI','Un test.only olvidado se saltaría el resto en silencio'],
  ['Presupuesto de inestabilidad','Tasa de aprobados en reintento por debajo de un umbral acordado, p. ej. 1%','Evita que los reintentos oculten el deterioro'],
  ['Presupuesto de duración','Pipeline de PR por debajo de ~10–15 minutos','La retroalimentación lenta acaba esquivándose'],
  ['Las pruebas nuevas son estables','Las pruebas nuevas o modificadas se ejecutan con --repeat-each antes del merge','Detecta la inestabilidad antes de que entre'],
  ['Seguridad','Escaneo de secretos; ningún artefacto con datos personales reales','El CI forma parte de la superficie de ataque']])],
  ['Riesgos del CI',UL(['Las pruebas pasan en local pero fallan en CI por diferencias de entorno','Los workers en paralelo comparten datos mutables','Aparecen secretos en logs o informes','Los artefactos contienen datos personales o de clientes','Los reintentos convierten fallos reales en builds verdes engañosos','Las pruebas inestables causan fatiga de alertas y los equipos dejan de confiar en el CI'])+CO('risk','Riesgo','En cuanto un equipo empieza a relanzar builds rojos «hasta que salen verdes», el CI deja de ser una señal. Arregla las pruebas inestables o ponlas en cuarentena con un responsable y una fecha de caducidad.')],
 ],
 quiz:[
  ['¿Qué suite encaja mejor en la etapa de pull request?',['Regresión completa en varios navegadores','Lint + unitarias + smoke + E2E/API seleccionadas','Suite de compatibilidad larga','Nada: probar tras el merge'],'Las comprobaciones de PR deben ser lo bastante rápidas para cada cambio y aun así detectar regresiones antes del merge.'],
  ['¿Qué artefacto ayuda más directamente a depurar una prueba de Playwright que falla en CI?',['El package.json','Un archivo de traza','El README','El lockfile'],'Las trazas capturan cada paso, instantáneas del DOM, red y consola: lo más parecido a volver a reproducir el fallo.'],
  ['¿Dónde suele ir una regresión ampliada en varios navegadores?',['Antes del commit','En el pull request','Cada noche','En ningún sitio'],'Las suites amplias y lentas se ejecutan cada noche para que la retroalimentación del PR siga siendo rápida.'],
  ['Una traza subida como artefacto de CI contiene la dirección de un cliente real. ¿Qué control falta?',['Más reintentos','Enmascarado de datos y control de retención de artefactos','Un runner más rápido','Un disco más grande'],'Los artefactos con datos personales son un riesgo conocido del CI; enmascara los datos y limita la retención.'],
  ['¿Qué hace --shard=2/4?',['Ejecuta las pruebas dos veces en cuatro navegadores','Ejecuta la segunda de cuatro partes de la suite','Reintenta dos veces','Usa cuatro workers'],'El sharding reparte la suite entre máquinas; cada una ejecuta una parte.'],
  ['¿Cómo llegan los secretos de forma segura a un trabajo de GitHub Actions?',['Escritos en el archivo del workflow','Mediante secretos del repositorio o del entorno inyectados como variables de entorno','En el README','Como artefactos'],'Los secretos se guardan cifrados, se inyectan en tiempo de ejecución y se enmascaran en los logs.'],
  ['¿Qué quality gate impide que un test.only olvidado se salte la suite?',['retries: 2','forbidOnly en CI','fullyParallel','trace: on-first-retry'],'forbidOnly hace fallar la ejecución si hay una prueba focalizada.'],
 ]},

'framework-roadmap':{title:'Construir un framework paso a paso',
 sum:'Un plan por etapas desde la primera prueba hasta un framework maduro, con criterios de salida, una definición de terminado y una revisión de salud.',
 sections:[
  ['Qué aprenderás',UL(['Planificar el crecimiento del framework por etapas con criterios de salida claros','Definir «terminado» para una prueba automatizada','Decidir entre construir, ampliar o comprar','Hacer una revisión de salud del framework'])],
  ['Etapas y criterios de salida',T(['Etapa','Foco','Avanza cuando'],[
   ['0 · Decidir','Objetivos, riesgos, elección de herramienta, quién escribe las pruebas','Decisión escrita con sus motivos; un prototipo que funciona'],
   ['1 · Esqueleto andante','Una prueba smoke, configuración, README, ejecución en CI en cada PR','Un ingeniero nuevo la ejecuta siguiendo el README en menos de 30 minutos'],
   ['2 · Cimientos','Fixtures, estrategia de datos de prueba, convenciones de locators, primeros page objects, cliente de API','Diez pruebas se ejecutan en paralelo sin choques'],
   ['3 · Cobertura por riesgo','Recorridos críticos en E2E; reglas en la API; etiquetas para smoke y regresión','Los elementos de alto riesgo tienen comprobaciones; el pipeline de PR cumple su presupuesto de tiempo'],
   ['4 · Operar','Política de pruebas inestables, paneles, responsables, retención de artefactos','La tasa de aprobados en reintento se sigue y está dentro del presupuesto'],
   ['5 · Mejorar','Revisión de salud trimestral, poda, refactorización, formación','Continuo: el framework es un producto con un responsable']])+CO('note','Idea clave','Consigue una prueba en verde en CI antes de construir abstracciones. Las capas de framework diseñadas antes de que existan pruebas suelen resolver los problemas equivocados.')],
  ['Definición de terminado para una prueba automatizada',UL(['Se vincula a un requisito o a un riesgo.','Falla cuando el comportamiento se rompe: comprobado rompiéndolo a propósito una vez.','Usa locators visibles para el usuario y esperas basadas en condiciones; sin pausas.','Crea o posee sus datos y limpia después.','Se ejecuta sola, en cualquier orden y en paralelo.','Pasó una ejecución repetida (p. ej., <code class="i">--repeat-each=10</code>) antes del merge.','Su título dice qué comportamiento comprueba.','Está etiquetada para las suites adecuadas.','Su salida al fallar (mensaje, traza, captura) permite a otra persona diagnosticarla.','La documentación se actualizó en el mismo cambio si cambiaron las convenciones.'])],
  ['Construir, ampliar o comprar',T(['Opción','Elígela cuando','A tener en cuenta'],[
   ['Construir sobre un runner de código abierto (Playwright, Cypress, Selenium)','Las pruebas son de los ingenieros; necesitas flexibilidad y control de versiones','El mantenimiento y las convenciones son tuyos'],
   ['Ampliar un framework interno existente','Está sano y el equipo lo conoce','Heredar su inestabilidad y su deuda'],
   ['Comprar una plataforma comercial, low-code o de IA','Las pruebas las escriben no programadores; necesitas soporte del proveedor o analítica integrada','Dependencia del proveedor, opciones de exportación, residencia de datos, coste total a tres años']])+CO('tip','Consejo','Elijas lo que elijas, haz un piloto de dos semanas con tu flujo real más difícil —un login con MFA, un iframe, una subida de archivos—, no con la app de demostración del proveedor.')],
  ['Roles y responsabilidades',UL(['<b>Responsable del framework</b>: mantiene el núcleo, revisa los cambios de convenciones y dirige la revisión de salud.','<b>Equipos de producto</b>: escriben y arreglan las pruebas de sus funcionalidades; los fallos van a quien cambió el código.','<b>Turno de pruebas inestables</b>: alguien en cada sprint revisa los nuevos informes de inestabilidad para que no se acumulen.','<b>Revisores</b>: el código de pruebas pasa la misma revisión que el código de producto.'])+CO('risk','Riesgo','Si una sola «persona de automatización» es dueña de todas las pruebas, la suite crece solo al ritmo de esa persona y muere cuando se va.')],
 ],
 quiz:[
  ['¿Cuál debería ser el primer hito de un framework nuevo?',['Una arquitectura por capas completa','Una prueba smoke ejecutándose en CI en cada PR, con un README','100 pruebas grabadas','Un panel de informes a medida'],'Un esqueleto andante demuestra todo el camino de principio a fin antes de construir abstracciones.'],
  ['¿Qué forma parte de la definición de terminado de una prueba automatizada?',['Tiene más de 50 líneas','Se la ha visto fallar al romper el comportamiento a propósito','Usa XPath','Solo se ejecuta en Chrome'],'Una prueba que nunca ha fallado quizá no sea capaz de fallar.'],
  ['La demo de un proveedor tiene muy buena pinta. ¿Cuál es el mejor paso de evaluación?',['Firmar un contrato de tres años','Un piloto de dos semanas con tus flujos reales más difíciles','Contar sus integraciones','Pedir un descuento'],'Las apps de demostración esquivan las partes difíciles; tu MFA, tus iframes y tus subidas de archivos, no.'],
  ['¿Quién debería arreglar normalmente una prueba rota por un cambio en una funcionalidad?',['Solo el especialista en automatización','El equipo que cambió la funcionalidad','Nadie: se borra','El proveedor'],'La responsabilidad sigue al cambio; un único responsable que haga de cuello de botella no escala.'],
  ['¿Qué criterio de salida muestra mejor que la etapa 2 (cimientos) está completa?',['Existe el README','Diez pruebas se ejecutan en paralelo sin choques','Hay un panel en marcha','Hay 500 pruebas'],'Los cimientos son datos, fixtures y aislamiento; la seguridad en paralelo lo demuestra.'],
 ]},
});
