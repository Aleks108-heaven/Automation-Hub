/* Español — v6: diseño de pruebas, pruebas de seguridad para QA, defectos e informes de QA */
TR.es=TR.es||{modules:{}};
(()=>{const M=TR.es.modules;

M['test-design']={title:'Técnicas de diseño de pruebas',
 sum:'Particiones de equivalencia, valores límite, tablas de decisión, transiciones de estado y combinaciones por pares: cómo elegir un conjunto pequeño de casos que aun así encuentre la mayoría de los defectos.',
 sections:[
  ['Qué aprenderás',UL(['Dividir una entrada en particiones de equivalencia y elegir valores límite','Reducir una tabla de decisión al conjunto de reglas más pequeño','Probar transiciones de estado válidas e inválidas','Frenar una explosión combinatoria con pruebas por pares','Escribir los casos elegidos y convertirlos en pruebas guiadas por datos'])],
  ['Primero diseño, después automatización',`<p>Playwright, Cypress y Selenium ejecutan comprobaciones. No deciden <i>cuáles</i> merece la pena ejecutar. Las técnicas de diseño de pruebas son métodos repetibles para elegir un conjunto pequeño de casos que aun así encuentre la mayoría de los defectos. Responden a «¿qué entradas, qué estados, qué combinaciones?» antes de escribir una sola línea de código.</p>
${T(['Técnica','Úsala cuando','Ejemplo'],[
   ['Partición de equivalencia','Las entradas forman grupos que el sistema trata igual','Edad por debajo, dentro y por encima del rango permitido'],
   ['Análisis de valores límite','Hay rangos y límites; aquí viven los errores de «uno de más o de menos»','17, 18, 19 y 64, 65, 66'],
   ['Tabla de decisión','Varias condiciones se combinan y dan resultados distintos','Socio × cupón × importe del pedido'],
   ['Transición de estado','El comportamiento depende del historial o del estado','Pedido: borrador → enviado → aprobado'],
   ['Pruebas por pares','Muchos parámetros con varios valores cada uno','Navegador × plan × idioma'],
   ['Adivinación de errores, exploratoria','La experiencia indica dónde se rompe','Doble clic en enviar, pegar un texto enorme']])}
${CO('note','Idea clave','El temario ISTQB Foundation (v4.0) incluye la partición de equivalencia, el análisis de valores límite, las tablas de decisión y las pruebas de transición de estado como técnicas de caja negra, y la adivinación de errores y las pruebas exploratorias como técnicas basadas en la experiencia. Las pruebas por pares no figuran en esa lista, pero se usan mucho en la práctica.')}`],
  ['Particiones de equivalencia y valores límite',`<p>Un formulario de registro acepta una edad de 18 a 65. La <b>partición de equivalencia</b> agrupa las entradas que el sistema debe tratar igual y prueba un valor de cada grupo. El <b>análisis de valores límite</b> añade los extremos de cada rango válido, porque los errores de «uno de más o de menos» (<code class="i">&gt;</code> donde se quería <code class="i">&gt;=</code>) se concentran ahí.</p>
${T(['Partición','Valor de ejemplo','Resultado esperado'],[
   ['Por debajo del rango (inválido)','10','Rechazado; el mensaje indica el rango de 18 a 65'],
   ['Dentro del rango (válido)','40','Aceptado'],
   ['Por encima del rango (inválido)','80','Rechazado'],
   ['No es un número','abc','Rechazado, sin fallo'],
   ['Vacío','(campo vacío)','Rechazado: obligatorio']])}
<p>El conjunto límite de tres valores para 18–65 es <b>17, 18, 19</b> y <b>64, 65, 66</b>. Pasa los casos a una única prueba guiada por datos:</p>
${P(0)}
${CO('tip','Consejo','Comprueba una regla de validación en el nivel más bajo que la posea. Nueve ejecuciones en el navegador para una regla son lentas: prueba los nueve valores a nivel unitario o de API y deja un caso de UI por partición para demostrar el mensaje y la conexión.')}`],
  ['Tablas de decisión',`<p>Cuando las condiciones se combinan, enumera cada combinación y su resultado. Las reglas: el envío es gratis para socios <i>o</i> para pedidos de 100 o más, y un cupón da un 10 % de descuento solo en pedidos de 100 o más. Tres condiciones sí/no dan 2 × 2 × 2 = 8 combinaciones, y muchas comparten resultado, así que se fusionan (un guion significa que la condición no importa).</p>
${T(['Regla','Socio','Cupón','Total ≥ 100','Envío','Descuento'],[
   ['R1','–','Sí','Sí','Gratis','10 %'],
   ['R2','–','No','Sí','Gratis','Ninguno'],
   ['R3','Sí','–','No','Gratis','Ninguno'],
   ['R4','No','–','No','De pago','Ninguno']])}
<p>Ocho combinaciones se reducen a cuatro reglas, así que cuatro pruebas cubren cada resultado distinto. Construir la tabla también saca a la luz preguntas que la especificación nunca respondió, como qué hace un cupón en un pedido de 99,99. Añade comprobaciones límite del total (99,99; 100,00) a las mismas pruebas.</p>`],
  ['Pruebas de transición de estado',`<p>Cuando el comportamiento depende del historial, modela los estados y los eventos que mueven entre ellos. Un pedido puede pasar de borrador → enviado → aprobado → despachado, y puede cancelarse antes de despacharse.</p>
${T(['Desde','Evento','Hasta','Esperado'],[
   ['Borrador','Enviar','Enviado','Permitido'],
   ['Enviado','Aprobar','Aprobado','Permitido'],
   ['Aprobado','Despachar','Despachado','Permitido'],
   ['Enviado o aprobado','Cancelar','Cancelado','Permitido'],
   ['Aprobado','Reabrir','Borrador','Rechazado'],
   ['Despachado','Cancelar','Cancelado','Rechazado'],
   ['Cancelado','Aprobar','Aprobado','Rechazado']])}
<p>Cubre cada transición permitida al menos una vez y luego prueba las rechazadas. Cada una debe ser rechazada y dejar el estado intacto; aquí se esconden la mayoría de los errores de estado.</p>
${P(0)}
${CO('tip','Consejo','Comprueba el estado después de una acción rechazada, no solo el código de error. Un 409 tras el cual el pedido aun así cambió es un error.')}`],
  ['Pruebas por pares',`<p>Tres parámetros con tres valores cada uno dan 3 × 3 × 3 = 27 combinaciones; diez parámetros pueden dar miles. La mayoría de los defectos los provoca un solo valor o la interacción de dos, así que un conjunto <b>por pares</b> cubre cada par de valores al menos una vez con muchas menos pruebas. Para los parámetros de abajo, 9 pruebas cubren todos los pares.</p>
${T(['Parámetro','Valores'],[['Navegador','Chromium, Firefox, WebKit'],['Plan','Free, Pro, Team'],['Idioma','en, uk, pl']])}
<p>Genera el conjunto con una herramienta como <b>PICT</b> o <b>allpairspy</b> y pasa las filas a una prueba guiada por datos como la tabla de edades de arriba. Ambas aceptan <b>restricciones</b>, así que las combinaciones imposibles (un idioma que el plan Free no ofrece) nunca se generan.</p>
${CO('risk','Riesgo','Las pruebas por pares pueden pasar por alto un defecto que necesita tres o más valores concretos a la vez. Añade a mano las combinaciones más arriesgadas, sobre todo las que manejan dinero o datos personales.')}`],
  ['Adivinación de errores y cartas exploratorias',`<p>La experiencia añade casos que ninguna técnica produce. Lugares habituales donde mirar:</p>
${UL(['Hacer doble clic o enviar dos veces un formulario','Pulsar Atrás o Actualizar justo después de enviar','Pegar un texto muy largo, un emoji o texto de derecha a izquierda','Usar comillas, corchetes angulares y letras con acentos','Abrir el mismo registro en dos pestañas o dejar caducar la sesión a mitad de la tarea','Usar fechas en los extremos: 29 de febrero, un cambio de hora, fin de año'])}
<p>Una <b>sesión exploratoria</b> tiene el tiempo acotado (30 a 60 minutos) y se guía por una <b>carta</b> (charter): <i>explora</i> un área <i>con</i> ciertos recursos <i>para descubrir</i> un riesgo. Anota preguntas, errores y riesgos nuevos sobre la marcha.</p>
${CO('note','Carta de ejemplo','Explora el pago con tarjetas caducadas y dos pestañas del navegador para descubrir problemas del estado del pago.')}`],
  ['Escribir los casos',`<p>Un caso solo es reutilizable si otra persona puede ejecutarlo. Mantén un formato corto y coherente y marca qué automatizar.</p>
${T(['ID','Técnica','Tipo','Pasos','Esperado','Automatizar'],[
   ['TC-001','Valor límite','Límite','Introducir edad 17','Rechazado; el mensaje indica el rango de 18 a 65','Sí'],
   ['TC-002','Tabla de decisión R3','Positivo','Socio, total 40, sin cupón','Envío gratis, sin descuento','Sí'],
   ['TC-003','Transición de estado','Negativo','Reabrir un pedido aprobado','Rechazado; el pedido sigue aprobado','Sí'],
   ['TC-004','Carta exploratoria','–','Dos pestañas, la sesión caduca durante el pago','Notas, preguntas, errores','No']])}
${CO('tip','Consejo','Automatiza los casos estables, frecuentes y de alto impacto (ver «Estrategia y automatización basada en riesgos»). Una carta exploratoria sigue siendo manual por diseño.')}`],
 ],
 quiz:[
  ['Un campo de cantidad acepta de 1 a 10. ¿Qué conjunto es el límite de tres valores para el extremo superior?',['9, 10, 11','Solo 10','5, 10, 20','1, 10'],'El análisis de tres valores prueba el límite y sus dos vecinos: 9, 10 y 11.'],
  ['¿Por qué la partición de equivalencia reduce el número de pruebas?',['Elimina la necesidad de resultados esperados','Un valor representa a todo un grupo que el sistema trata igual','Solo prueba entradas válidas','Prueba cada valor posible una vez'],'Si todos los valores de una partición se comportan igual, un representante basta para encontrar un defecto en esa partición.'],
  ['¿Qué consigue fusionar filas con resultados idénticos en una tabla de decisión?',['Elimina condiciones que importan','Alarga la tabla','Menos reglas que probar, con cada resultado distinto aún cubierto','Sustituye al análisis de valores límite'],'Las reglas que solo difieren en una condición irrelevante se funden en una, así que pruebas cada resultado distinto una vez.'],
  ['¿Qué debería pasar al intentar una transición de estado inválida, como reabrir un pedido despachado?',['Debería aceptarse y registrarse','El estado debería volver al inicio','Debería rechazarse y dejar el estado intacto','No hace falta comprobar nada'],'Una transición inválida debe rechazarse sin efectos secundarios; comprobar que el estado no cambió detecta acciones aplicadas a medias.'],
  ['3 navegadores × 3 planes × 3 idiomas dan 27 combinaciones. ¿Qué promete un conjunto por pares?',['Se prueba cada combinación de tres valores','Cada par de valores aparece en al menos una prueba, normalmente con muchas menos pruebas','Solo se prueba el navegador más común','El idioma nunca importa'],'Las pruebas por pares cubren todas las interacciones de dos factores, donde aparece la mayoría de los defectos combinatorios, con una fracción del conjunto completo.'],
  ['¿Cuál es una debilidad de las pruebas por pares?',['No se pueden automatizar','Necesitan más pruebas que todas las combinaciones','Solo funcionan con números','Pueden pasar por alto un defecto que necesita tres o más valores concretos a la vez'],'Las pruebas por pares cubren pares, no tríos. Añade a mano las combinaciones de alto riesgo.'],
 ]};

M['security-testing']={title:'Pruebas de seguridad para QA',
 sum:'Un recorrido de tester por el OWASP Top 10:2025: mantente dentro del alcance, revisa cabeceras y cookies, prueba la autorización con dos usuarios y valora lo que encuentres.',
 sections:[
  ['Qué aprenderás',UL(['Mantenerte dentro del alcance: probar solo lo que es tuyo o estás autorizado a probar, y nunca de forma destructiva','Usar el OWASP Top 10:2025 como lista de comprobación del tester','Revisar cabeceras de seguridad y atributos de cookies en una prueba automática','Escribir una prueba de autorización con dos usuarios (BOLA / IDOR)','Revisar dependencias y secretos y valorar un hallazgo como impacto × probabilidad'])],
  ['Primero alcance y seguridad',`${UL(['Prueba solo sistemas que son tuyos o para los que tienes permiso escrito. Nunca pruebes sistemas de terceros ni producción sin él.','Prefiere un entorno de staging con cuentas y datos de prueba.','Sondea con seguridad: marcadores inofensivos y cargas que no se ejecutan. Sin denegación de servicio, sin extracción de datos, sin pagos reales.','Etiqueta cada resultado con honestidad: <b>Confirmed</b> (reproducido), <b>Suspected</b> (solo indicios) o <b>Not tested</b> (no probado).','Informa de los secretos por ubicación y tipo, nunca por valor.'])}
${CO('risk','Riesgo','La alerta de un escáner es una pista, no un hallazgo. Reprodúcela con seguridad o infórmala como Suspected.')}`],
  ['OWASP Top 10:2025 como lista de comprobación del tester',`${T(['ID','Categoría','Qué sondear con seguridad'],[
   ['A01','Control de acceso roto','Cambia ids en URL y cuerpos; abre rutas de administración como usuario normal; funciones que descargan desde una URL (SSRF ahora está aquí)'],
   ['A02','Configuración de seguridad incorrecta','Cuentas por defecto, modo depuración, errores detallados, consolas expuestas, cabeceras ausentes'],
   ['A03','Fallos en la cadena de suministro de software','Dependencias sin fijar o sin mantenimiento, sin lockfile, secretos en CI (novedad de 2025)'],
   ['A04','Fallos criptográficos','HTTP en lugar de HTTPS, tokens en URL, datos sensibles sin proteger'],
   ['A05','Inyección','Marcadores inofensivos en las entradas y dónde reaparecen: páginas, consultas, comandos, plantillas'],
   ['A06','Diseño inseguro','Sin límites de frecuencia, pasos omitidos, cantidades negativas, cupones reutilizables'],
   ['A07','Fallos de autenticación','Sin bloqueo, sesiones que no terminan al salir, enumeración de usuarios por mensajes de error'],
   ['A08','Fallos de integridad del software o los datos','Actualizaciones sin firmar, deserialización insegura, scripts de terceros sin comprobación de integridad'],
   ['A09','Fallos de registro y alertas de seguridad','¿Se registran los inicios de sesión y las denegaciones de acceso? ¿Hay secretos en los registros?'],
   ['A10','Gestión incorrecta de condiciones excepcionales','Entradas mal formadas, enormes y truncadas: ¿los errores «abren la puerta» o filtran detalles internos? (novedad de 2025)']])}
${CO('note','Idea clave','La edición de 2025 añadió A03 y A10 e integró la falsificación de peticiones del lado del servidor (SSRF) en A01. Los informes antiguos usan los nombres de 2021; «Vulnerable and Outdated Components» corresponde a A03. Consulta owasp.org para la lista vigente.')}`],
  ['Cabeceras y cookies en una prueba',`<p>Los navegadores activan protecciones a partir de las cabeceras de respuesta, así que es barato comprobarlas.</p>
${T(['Cabecera','Qué hace'],[
   ['Content-Security-Policy','Limita desde dónde pueden cargarse scripts, marcos y otro contenido; una defensa principal contra XSS. Su directiva <code class="i">frame-ancestors</code> indica quién puede incrustar la página y sustituye a X-Frame-Options'],
   ['Strict-Transport-Security','Indica a los navegadores que usen solo HTTPS (se ignora por HTTP simple)'],
   ['X-Content-Type-Options: nosniff','Impide que el navegador adivine el tipo de un archivo'],
   ['Referrer-Policy','Controla cuánto de la URL se envía a otros sitios'],
   ['Permissions-Policy','Desactiva funciones del navegador que la aplicación no usa']])}
${P(0)}
${CO('tip','Consejo','Una cabecera ausente suele ser Low o Informational por sí sola: valórala por lo que expone. Comprueba las cabeceras que decidiste exigir, para que una regresión se detecte.')}`],
  ['Autorización: dos usuarios, un objeto',`<p>El control de acceso es el fallo grave más común en la web (OWASP A01 y BOLA en la lista de API). Pruébalo con dos cuentas: el usuario A crea un objeto privado y el usuario B intenta leerlo, modificarlo y borrarlo.</p>
${P(0)}
<p>Repite para actualizar y borrar, para una ruta solo de administrador usada como usuario normal (escalada vertical) y para un segundo inquilino. El módulo <a href="#api-testing">Pruebas de API</a> trata con más detalle los riesgos OWASP de API.</p>`],
  ['Dependencias y secretos',UL(['Ejecuta la auditoría del gestor de paquetes (<code class="i">npm audit</code>, <code class="i">pip-audit</code>, <code class="i">dotnet list package --vulnerable</code>) y contrástala con osv.dev. No llames vulnerable a una dependencia sin un aviso (advisory).','Haz commit de los lockfiles, fija versiones e instala en CI con <code class="i">npm ci</code>.','Escanea el repositorio y su historial en busca de secretos (por ejemplo con gitleaks). Mantén los archivos <code class="i">.env</code> fuera de Git.','Fija las acciones de CI de terceros y las imágenes de contenedor a una versión o digest.','Trata un secreto filtrado como comprometido: rótalo. Borrar el commit no basta.'])],
  ['Valorar un hallazgo',`<p>Este hub usa una convención sencilla: multiplica el <b>impacto</b> (de 1 a 5) por la <b>probabilidad</b> (de 1 a 5) y lee la banda.</p>
${T(['Puntuación','Gravedad'],[['20–25','Critical'],['12–19','High'],['6–11','Medium'],['2–5','Low'],['0–1','Informational']])}
<p>El pedido de otro usuario legible cambiando un id: impacto 5 × probabilidad 4 = 20, <b>Critical</b>. Un Referrer-Policy ausente en una herramienta interna: 1 × 2 = 2, <b>Low</b>. Sube la probabilidad si hay exposición a internet, bájala si la exposición es solo localhost o si otro control ya bloquea el ataque, y di qué ajuste aplicaste.</p>
${CO('note','Idea clave','La confianza (High, Medium, Low) se informa aparte y no cambia la gravedad. Para vulnerabilidades conocidas en software de terceros, usa la puntuación CVSS publicada en el aviso en lugar de calcular la tuya.')}`],
 ],
 quiz:[
  ['Un escáner informa de una posible inyección SQL y no la has reproducido. ¿Cómo la informas?',['Confirmed, Critical','Siempre Informational','Suspected, hasta que la reproduzcas con seguridad','No merece la pena informarla'],'Un indicio sin efecto reproducido es Suspected. Solo un fallo reproducido es Confirmed.'],
  ['El usuario B pide el pedido del usuario A por id y recibe los datos de A con un 200. ¿Qué categoría del OWASP Top 10:2025 encaja mejor?',['A02 Configuración de seguridad incorrecta','A05 Inyección','A01 Control de acceso roto','A10 Gestión incorrecta de condiciones excepcionales'],'Leer el objeto de otro usuario cambiando un id es un fallo de control de acceso (BOLA / IDOR).'],
  ['¿Qué dos categorías son nuevas en el OWASP Top 10:2025?',['Inyección y Diseño inseguro','Control de acceso roto y Fallos criptográficos','Registro de seguridad y SSRF','Fallos en la cadena de suministro de software y Gestión incorrecta de condiciones excepcionales'],'A03 y A10 son nuevas en 2025; SSRF se integró en A01.'],
  ['¿Qué cabecera de respuesta indica a los navegadores que usen solo HTTPS en visitas futuras?',['Strict-Transport-Security','Referrer-Policy','X-Content-Type-Options','Permissions-Policy'],'HSTS hace que el navegador pase a HTTPS. Los navegadores lo ignoran si llega por HTTP simple.'],
  ['Impacto 4 y probabilidad 4 dan 16. ¿Qué banda de gravedad es (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',['Low','Medium','Critical','High'],'4 × 4 = 16, que cae en la banda 12–19: High.'],
  ['A una cookie de sesión le falta el atributo HttpOnly. ¿Qué permite?',['Que la cookie no pueda enviarse por HTTPS','Que los scripts de la página lean la cookie, así que un fallo XSS puede robar la sesión','Que otros sitios incrusten la página','Que la cookie caduque de inmediato'],'HttpOnly oculta la cookie a JavaScript. Sin él, un script inyectado puede leer y exfiltrar la sesión.'],
 ]};

M['defect-reporting']={title:'Informes de defectos e informes de QA',
 sum:'Escribe un defecto que otra persona pueda reproducir, distingue gravedad de prioridad, etiqueta la evidencia con honestidad y termina con un veredicto elegido por reglas fijas.',
 sections:[
  ['Qué aprenderás',UL(['Escribir un informe de defecto que otra persona reproduzca sin hacerte preguntas','Distinguir gravedad (severity) de prioridad','Etiquetar cada afirmación como Confirmed, Suspected o Not tested','Elegir un estado final de QA con reglas de decisión fijas','Maquetar un informe que quien decide pueda leer en dos minutos'])],
  ['Un defecto que otra persona pueda reproducir',`<p>Un informe es útil cuando un desarrollador que nunca ha visto el problema puede reproducirlo solo con el texto. A la mayoría de los informes que rebotan les faltan las mismas pocas cosas.</p>
${T(['Campo','Qué escribir'],[
   ['Título','Qué falla y dónde, en una línea'],
   ['Entorno','Navegador y SO, versión de la aplicación, cuenta o rol de prueba'],
   ['Precondiciones','El estado necesario antes del paso 1'],
   ['Pasos','Numerados y exactos, desde un estado conocido'],
   ['Esperado / real','Ambos, uno junto al otro'],
   ['Evidencia','Captura, trace, petición y respuesta, líneas de log: reales y con los secretos enmascarados'],
   ['Reproducibilidad','Siempre, intermitente (con qué frecuencia) o no reproducido'],
   ['Gravedad y prioridad','El impacto, con un motivo; con qué urgencia corregirlo']])}
${T(['Flojo','Mejor'],[
   ['«El pago está roto»','«Pago: el botón Pay no hace nada con una tarjeta Visa guardada (Chromium, build 2.14.1)»'],
   ['«A veces falla»','«Falla en 3 de 10 ejecuciones; siempre pasa cuando el carrito tiene un artículo»'],
   ['«Debería funcionar»','«Esperado: página de confirmación. Real: se queda en el pago; la consola muestra HTTP 500 de /api/pay»']])}
${CO('tip','Consejo','Un trace de Playwright o una breve grabación de pantalla suele sustituir una página de descripción. Adjúntalo.')}`],
  ['Gravedad y prioridad',`<p>La <b>gravedad</b> (severity) es el impacto del defecto si llega a producción. La <b>prioridad</b> es con qué urgencia debe corregirse. Están relacionadas pero son distintas, y suelen tener dueños distintos: QA propone la gravedad, el responsable de producto fija la prioridad.</p>
${T(['Gravedad','Significado','Ejemplo'],[
   ['Critical','Pérdida o corrupción de datos, una brecha de seguridad o un recorrido central imposible sin alternativa','Cualquier usuario con sesión puede leer los pedidos de otros'],
   ['High','Falla una función importante o existe una debilidad seria, y la alternativa es difícil o arriesgada','El pago falla con un método de pago'],
   ['Medium','Pérdida parcial de función, o una debilidad real con alternativa o exposición limitada','Un filtro ignora un criterio'],
   ['Low','Defecto menor de impacto insignificante','Una etiqueta está desalineada'],
   ['Informational','Observación o mejora, no un defecto','Falta una cabecera de respuesta opcional']])}
${T(['Prioridad','Significado'],[['P1','Corregir antes de la versión'],['P2','Corregir en el ciclo actual'],['P3','Planificar'],['P4','Backlog']])}
${CO('note','Idea clave','Una errata en el nombre de la empresa en la página de inicio es de gravedad Low, pero P1 el día antes de un lanzamiento. Un fallo en una exportación que se usa una vez al año puede ser de gravedad High pero solo P3. Da siempre la gravedad con un motivo de una frase.')}`],
  ['Confirmed, Suspected, Not tested',`<p>Cada afirmación de un informe lleva una de tres etiquetas, para que los lectores sepan cuánto fiarse.</p>
${UL(['<b>Confirmed</b>: reproducido, con evidencia que puedes mostrar.','<b>Suspected</b>: hay indicios, pero el efecto no está demostrado. Una alerta de escáner o un «olor» en el código empieza aquí.','<b>Not tested</b>: no lo comprobaste. Dilo y explica por qué.'])}
<p>Tres reglas mantienen honestos los informes: la ausencia de evidencia no es evidencia de ausencia; nunca inventes logs, versiones ni resultados; separa las observaciones de las suposiciones. Al puntuar un hallazgo, usa impacto × probabilidad como en <a href="#security-testing">Pruebas de seguridad para QA</a> e informa de la confianza aparte.</p>`],
  ['El estado final',`<p>Termina un informe de QA con un único estado elegido por reglas fijas, para que dos personas que lean los mismos hallazgos lleguen al mismo veredicto. Comprueba las reglas en orden; decide la primera que coincida.</p>
${T(['Orden','Estado','Úsalo cuando'],[
   ['1','FAIL','Hay algún hallazgo Confirmed Critical o High, o un recorrido central de usuario está Confirmed roto'],
   ['2','NOT ENOUGH EVIDENCE','El objetivo era inaccesible, o se pudo verificar tan poco que no sostiene ninguna conclusión'],
   ['3','PARTIALLY VERIFIED','Parte del alcance está bloqueada o sin probar, o hay un hallazgo Suspected Critical o High sin resolver (y ninguno Confirmed Critical o High)'],
   ['4','PASS WITH FINDINGS','Se verificó todo el alcance y solo quedan abiertos hallazgos Medium, Low o Informational'],
   ['5','PASS','Se verificó todo el alcance y no queda abierto nada por encima de Informational']])}
${CO('risk','Riesgo','Nunca elijas PASS solo porque no se encontraron defectos. PASS exige que se haya verificado todo el alcance solicitado.')}`],
  ['Estructura del informe',`<p>Pon el veredicto primero. El lector debería poder parar tras la primera sección y aun así actuar.</p>
${T(['N.º','Sección','Qué contiene'],[
   ['1','Resumen ejecutivo','El veredicto, los 3 problemas principales y la siguiente acción'],
   ['2','Alcance y límites','Qué se comprobó, qué no (y por qué), supuestos, herramientas'],
   ['3','Resumen de hallazgos','ID, gravedad, área, título, confianza'],
   ['4','Hallazgos detallados','Evidencia, impacto, corrección sugerida, cómo verificarla'],
   ['5','Qué se vio sano','Áreas comprobadas sin nada que informar'],
   ['6','Recomendaciones','Ordenadas por gravedad y esfuerzo'],
   ['7','Pruebas de seguimiento','Negativas, límite y exploratorias'],
   ['8','¿Qué más revisar?','Huecos que merecen una segunda mirada']])}
${CO('tip','Consejo','La sección 5 importa. Informar de un área limpia como limpia dice a los lectores dónde pueden dejar de preocuparse. A cada corrección sugerida añade su riesgo, cómo deshacerla y cómo confirmar que funcionó.')}`],
 ],
 quiz:[
  ['¿Qué afirmación sobre gravedad y prioridad es correcta?',['La gravedad es con qué urgencia corregir; la prioridad es el impacto','Significan lo mismo','La gravedad es el impacto si llega a producción; la prioridad es con qué urgencia corregir','La gravedad la fijan solo los desarrolladores'],'La gravedad describe el impacto; la prioridad es una decisión de planificación. Un defecto cosmético puede ser urgente y uno grave puede esperar.'],
  ['Una errata en el nombre de la empresa en la página de inicio el día antes de un lanzamiento se describe mejor como…',['Gravedad High, P4','Gravedad Critical, P3','Informational, sin prioridad','Gravedad Low, P1'],'El impacto es pequeño (Low) pero el momento la hace urgente (P1).'],
  ['Un informe dice «El pago a veces está roto». ¿Qué información falta y es más útil?',['Quién lo causó','Pasos exactos, entorno, resultado esperado frente al real y con qué frecuencia ocurre','Un título más largo','Una suposición sobre la causa raíz'],'Pasos reproducibles y contexto permiten al desarrollador ver el problema. Culpar o adivinar, no.'],
  ['Has reproducido un fallo que permite a un usuario leer los pedidos de otro. ¿Qué etiqueta aplica?',['Suspected','Not tested','Confirmed','Informational'],'Un hallazgo reproducido con evidencia es Confirmed.'],
  ['Se verificó todo el alcance; quedan abiertos un hallazgo Medium y dos Low; ninguno High ni Critical. ¿Qué estado?',['PASS','PARTIALLY VERIFIED','FAIL','PASS WITH FINDINGS'],'Todo el alcance verificado y solo Medium, Low o Informational abiertos: regla 4, PASS WITH FINDINGS.'],
  ['Un servicio no estaba disponible y la mitad del alcance no se probó. La otra mitad se verificó sin hallazgos Confirmed Critical ni High. ¿Qué estado?',['PASS WITH FINDINGS','NOT ENOUGH EVIDENCE','PARTIALLY VERIFIED','PASS'],'Parte del alcance está Not tested y no hay Confirmed Critical ni High, así que aplica la regla 3. La regla 2 es para cuando se verificó tan poco que no se puede concluir nada.'],
 ]};

(TR.es.glossary=TR.es.glossary||[]).push(
 ['Tabla de decisión','Cuadrícula de combinaciones de condiciones y sus resultados; las filas idénticas se fusionan para probar cada resultado distinto una vez.'],
 ['Pruebas de transición de estado','Probar los movimientos permitidos y rechazados entre estados, como un pedido de borrador a aprobado.'],
 ['Pruebas por pares','Cubrir cada par de valores de parámetros al menos una vez en lugar de cada combinación; herramientas como PICT generan los conjuntos.'],
 ['Adivinación de errores','Elegir casos por la experiencia de dónde suele romperse el software: doble envío, entradas enormes, sesiones caducadas.'],
 ['Carta de prueba (charter)','Misión de una frase para una sesión exploratoria acotada en el tiempo: explorar un área, con recursos, para descubrir un riesgo.'],
 ['Content-Security-Policy','Cabecera de respuesta que limita desde dónde una página puede cargar scripts, marcos y otro contenido; una defensa principal contra XSS.'],
 ['Fallo en la cadena de suministro de software','OWASP Top 10:2025 A03: riesgo por dependencias, canalizaciones de compilación y distribución, como paquetes sin fijar o manipulados.'],
 ['Confirmed vs suspected','Etiquetas de evidencia en un informe de QA: Confirmed significa reproducido con evidencia; Suspected, solo indicios.'],
);

TR.es.exam.push(
 ['Una contraseña debe tener de 8 a 64 caracteres. ¿Qué longitudes forman el conjunto límite de tres valores?',['7, 8, 9 y 63, 64, 65','Solo 8 y 64','1, 32, 100','0, 8, 64'],'El método de tres valores prueba cada límite y sus dos vecinos.'],
 ['¿Qué garantiza un conjunto de pruebas por pares?',['Se cubre cada combinación de tres valores','Se encuentran todos los defectos','Cada par de valores de parámetros aparece en al menos una prueba','Solo se usan combinaciones válidas'],'Las pruebas por pares cubren todas las interacciones de dos factores con muchas menos pruebas que el producto completo.'],
 ['Una tabla de decisión tiene tres condiciones sí/no. ¿Cuántas combinaciones hay antes de fusionar resultados idénticos?',['3','8','6','9'],'2 × 2 × 2 = 8.'],
 ['Un escáner señala un posible XSS y el tester no lo ha reproducido. ¿Qué etiqueta encaja?',['Confirmed','Suspected','Fixed','Solo Informational'],'Los indicios sin efecto reproducido son Suspected.'],
 ['¿Qué cabecera de respuesta limita desde dónde puede una página cargar scripts?',['Referrer-Policy','Cache-Control','Content-Security-Policy','Accept-Language'],'Content-Security-Policy restringe las fuentes de scripts, marcos y otro contenido.'],
 ['Impacto 5 y probabilidad 3 dan 15. ¿Qué banda es (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',['Critical','High','Medium','Low'],'5 × 3 = 15, que cae en la banda 12–19: High.'],
);
})();
