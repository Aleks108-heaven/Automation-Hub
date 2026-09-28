/* Polski — v5: pogłębione narzędzia, Katalon, Applitools, Vibium, inne frameworki, AI w automatyzacji */
TR.pl=TR.pl||{modules:{}};
(()=>{const M=TR.pl.modules,add=(id,...s)=>M[id]&&M[id].sections&&M[id].sections.push(...s);
add('playwright',
 ['Mockowanie sieci i wywołania API w jednym teście',`<p>Playwright może przechwycić każde żądanie strony. Używaj tego, by wymusić rzadkie stany (błędy, puste listy, wolne odpowiedzi) i przygotować dane przez API przed pracą z UI.</p>
${P(0)}
${CO('tip','Wskazówka','<code class="i">route.fetch()</code> pobiera prawdziwą odpowiedź, więc możesz zmienić jedno pole, a resztę przepuścić. Dzięki temu mock pozostaje bliski rzeczywistości.')}`],
 ['Porównania wizualne',`<p><code class="i">toHaveScreenshot()</code> porównuje zrzut ekranu z zapisanym wzorcem piksel po pikselu. Pierwszy przebieg zapisuje wzorzec; kolejne padają, gdy różnica przekroczy próg.</p>
${P(0)}
${CO('risk','Ryzyko','Wzorce zależą od systemu, czcionek i wersji przeglądarki. Twórz je i porównuj w tym samym środowisku, zwykle w przypiętym obrazie Dockera w CI, inaczej każdy przebieg będzie inny.')}`],
 ['Narzędzia do debugowania',T(['Narzędzie','Jak uruchomić','Kiedy używać'],[
  ['Tryb UI','<code class="i">npx playwright test --ui</code>','Pisanie testów: tryb watch, podróż w czasie, wybór lokatorów'],
  ['Inspector','<code class="i">npx playwright test --debug</code>','Przechodzenie jednego testu linia po linii'],
  ['Trace Viewer','<code class="i">npx playwright show-trace trace.zip</code>','Błąd w CI, którego nie da się odtworzyć lokalnie'],
  ['Codegen','<code class="i">npx playwright codegen URL</code>','Pierwszy szkic lokatorów i kroków'],
  ['Rozszerzenie VS Code','Panel Testing','Uruchamianie, debugowanie i nagrywanie z edytora'],
  ['Raport HTML','<code class="i">npx playwright show-report</code>','Przegląd całego przebiegu, z ponowieniami i załącznikami']])],
 ['AI i Playwright: MCP i agenci testowi',`<p>Playwright ma teraz funkcje stworzone dla asystentów AI do kodowania:</p>
${UL(['<b>Playwright MCP</b>: serwer Model Context Protocol, przez który asystent steruje prawdziwą przeglądarką na podstawie drzewa dostępności strony, a nie zrzutów ekranu.','<b>Agenci testowi</b>: trzy definicje agentów instalowane poleceniem <code class="i">npx playwright init-agents --loop=vscode</code> (lub <code class="i">claude</code>, <code class="i">codex</code>, <code class="i">opencode</code>). <b>Planista</b> eksploruje aplikację i pisze plan testów w Markdown, <b>generator</b> zamienia plan w pliki testów i sprawdza lokatory na działającej aplikacji, a <b>uzdrowiciel</b> uruchamia padające testy i proponuje poprawki.'])}
${CO('note','Kluczowa myśl','Agenci tworzą zwykły kod Playwright. Przeglądaj go jak PR kolegi: sprawdź, czy asercje naprawdę testują wymaganie, i nigdy nie akceptuj „naprawy”, która tylko osłabia asercję.')}`]);
add('cypress',
 ['cy.intercept() w praktyce',`<p><code class="i">cy.intercept()</code> zarówno <b>szpieguje</b> żądania (by na nie czekać), jak i je <b>stubuje</b> (by kontrolować odpowiedzi). Czekanie na alias to niezawodny zamiennik <code class="i">cy.wait(3000)</code>.</p>
${P(0)}`],
 ['Testy komponentów',`<p>Testy komponentów montują jeden komponent w prawdziwej przeglądarce, bez reszty aplikacji. Są szybsze niż testy E2E i wcześnie łapią błędy renderowania i interakcji.</p>
${P(0)}
<p>Cypress obsługuje React, Vue, Angular i Svelte przez adaptery frameworków i używa bundlera Twojej aplikacji (Vite lub webpack).</p>`],
 ['cy.prompt(): testy w zwykłym języku',`<p><code class="i">cy.prompt()</code> przyjmuje listę kroków w zwykłym języku, prosi model AI o zamianę ich na polecenia Cypress, wykonuje je i buforuje wynik. Wymaga Cypress Cloud i został wydany jako funkcja eksperymentalna, więc najpierw sprawdź jego obecny status.</p>
${P(0)}
${UL(['<b>Naprawa z bufora</b>: gdy selektor się psuje, Cypress najpierw próbuje innych zapisanych wcześniej kandydatów, bez wywoływania modelu.','<b>Naprawa przez AI</b>: jeśli żaden nie pasuje, wysyła ten krok i bieżącą stronę do modelu i buforuje nowy selektor.','<b>Eksport do kodu</b>: wygenerowane polecenia można zapisać jako zwykły kod testu i przestać zależeć od modelu.'])}
${CO('risk','Ryzyko','Naprawa może ukryć prawdziwą zmianę. Jeśli przycisk „Zaloguj” po cichu stał się „Dalej”, naprawiony test przejdzie, a zmiany widocznej dla użytkownika nikt nie przejrzał. Czytaj dziennik napraw.')}`]);
add('selenium',
 ['Jak zbudowany jest Selenium 4',T(['Część','Co robi'],[
  ['W3C WebDriver','Standardowy protokół HTTP między Twoim kodem a sterownikiem przeglądarki'],
  ['Wiązania językowe','Klienci Java, Python, C#, JavaScript i Ruby dla tego samego protokołu'],
  ['Sterowniki przeglądarek','chromedriver, geckodriver, msedgedriver, safaridriver: zamieniają polecenia na akcje przeglądarki'],
  ['Selenium Manager','Wbudowany od 4.6: sam znajduje lub pobiera właściwy sterownik (i przeglądarkę)'],
  ['WebDriver BiDi','Nowszy dwukierunkowy protokół na WebSocket: logi konsoli, zdarzenia sieciowe i więcej wracają do testu'],
  ['Grid 4','Router, distributor, session map, session queue, event bus i węzły; tryb standalone, hub-and-node lub w pełni rozproszony']])],
 ['Lokatory względne i page object w Javie',`${P(0)}
<p>Lokatory względne (<code class="i">above</code>, <code class="i">below</code>, <code class="i">toLeftOf</code>, <code class="i">toRightOf</code>, <code class="i">near</code>) pomagają, gdy element nie ma dobrego atrybutu, ale zależą od układu, więc najpierw preferuj ID, atrybuty testowe lub nazwy dostępne.</p>`],
 ['Selenium i AI',`<p>Sam Selenium nie ma wbudowanego AI, ale jego ekosystem tak:</p>
${UL(['<b>Healenium</b>: otwarta biblioteka opakowująca WebDriver, która przy błędzie lokatora wybiera najbardziej podobny element z ostatniego udanego przebiegu.','<b>Platformy komercyjne</b> (Katalon, Testim, Mabl i inne) dodają samonaprawianie i generowanie na bazie wykonania w stylu WebDriver.','<b>Vibium</b>: nowy projekt twórcy Selenium, oparty na WebDriver BiDi, dla agentów AI i ludzi. Ma w tym kursie własny moduł.'])}`]);

/* ---------- v6: praktyczne ćwiczenia, ściągawki i przygotowanie do kariery ---------- */
add('playwright',
 ['Ćwiczenie praktyczne',`<p>Poćwicz na własnej aplikacji demo Playwright — wystarczy <code class="i">npm init playwright@latest</code>:</p>
${OL(['Skieruj testy na <a href="https://demo.playwright.dev/todomvc" target="_blank" rel="noopener">demo.playwright.dev/todomvc</a>.','Napisz test, który dodaje trzy zadania, oznacza jedno jako ukończone i sprawdza pozostałą liczbę.','Napisz drugi test, który filtruje według „Active” i „Completed” i za każdym razem sprawdza widoczną listę.','Dodaj trzeci test, który odświeża stronę i sprawdza, że zadania przetrwały (local storage).','Uruchom najpierw z <code class="i">--ui</code>, by zbudować test interaktywnie, potem w trybie headless CI, i sprawdź raport HTML.'])}
${CO('tip','Cel dodatkowy','Wypchnij to do publicznego repozytorium GitHub z workflow GitHub Actions uruchamianym przy każdym push. To repozytorium to materiał do portfolio — zobacz „Przygotowanie do kariery”.')}`]);
add('cypress',
 ['Ćwiczenie praktyczne',`<p>Cypress ma do tego własną aplikację ćwiczeniową — nie trzeba uruchamiać serwera:</p>
${OL(['Zbuduj projekt poleceniem <code class="i">npm init cypress@latest</code> i ustaw <code class="i">baseUrl</code> na <a href="https://example.cypress.io" target="_blank" rel="noopener">example.cypress.io</a>.','Napisz test dla strony „Actions”: wpisz tekst w pole przez <code class="i">.type()</code> i sprawdź wartość przez <code class="i">.should(\'have.value\', ...)</code>.','Napisz drugi test dla strony „Network Requests”, używając <code class="i">cy.intercept()</code>, by zastubować jedno żądanie i sprawdzić reakcję UI.','Dodaj własne polecenie (<code class="i">Cypress.Commands.add</code>) dla powtarzającego się kroku i użyj go w obu testach.'])}
${CO('tip','Cel dodatkowy','Otwórz dziennik poleceń Cypress (Command Log) podczas działania testu i przejdź wstecz przez każde polecenie — to najszybszy sposób, by wyrobić nawyk czytania błędów.')}`]);
add('selenium',
 ['Ćwiczenie praktyczne',`<p><a href="https://the-internet.herokuapp.com" target="_blank" rel="noopener">the-internet.herokuapp.com</a> to od dawna działająca, stabilna strona ćwiczeniowa zbudowana właśnie do tego:</p>
${OL(['Zautomatyzuj stronę „Dynamic Loading”: kliknij start, użyj jawnego <code class="i">WebDriverWait</code>, by poczekać na pojawienie się tekstu, a potem go sprawdź.','Zautomatyzuj stronę „Multiple Windows”: przełącz się na uchwyt nowego okna, sprawdź jego tekst, a potem przełącz się z powrotem.','Zautomatyzuj logowanie na stronie „Form Authentication”, wraz z przypadkiem negatywnym (błędne hasło pokazuje komunikat flash).','Opakuj stronę w mały obiekt page object z nazwanymi metodami, tak jak opisuje to <a href="#framework-architecture">Architektura frameworku i POM</a>.'])}
${CO('risk','Ryzyko','Oprzyj się pokusie użycia <code class="i">Thread.sleep()</code>, by strona dynamicznego ładowania przeszła. Zamiast tego użyj <code class="i">WebDriverWait</code> z <code class="i">ExpectedConditions</code> — o to właśnie chodzi w tym ćwiczeniu.')}`]);

M['framework-landscape']={title:'Poza wielką trójką: inne frameworki',
 sum:'WebdriverIO, Robot Framework, Cucumber, Appium, Karate, Puppeteer i inne: do czego służy każdy i kiedy go wybrać.',
 sections:[
  ['Czego się nauczysz',UL(['Nazywać główne narzędzia poza Playwright, Cypress i Selenium','Odróżniać runner testów od warstwy BDD, frameworku słów kluczowych i sterownika mobilnego','Wybierać narzędzie według języka zespołu, typu aplikacji i istniejącej infrastruktury'])],
  ['Krajobraz w skrócie',T(['Narzędzie','Typ','Język','Wybierz do'],[
   ['WebdriverIO','Framework testowy na WebDriver i BiDi','JavaScript / TypeScript','Zespół JS, który potrzebuje standardów WebDriver, mobile przez Appium lub wielu usług'],
   ['Robot Framework','Framework słów kluczowych','Python (słowa kluczowe jako zwykły tekst)','Zespoły o mieszanych umiejętnościach, testy akceptacyjne, RPA; przez SeleniumLibrary lub Browser (Playwright)'],
   ['Cucumber / BDD w stylu SpecFlow','Warstwa Gherkin nad sterownikiem','Java, JS, Ruby, .NET…','Wspólne przykłady pisane z biznesem, a nie tylko „testy po angielsku”'],
   ['Appium','Sterownik automatyzacji mobilnej (protokół WebDriver)','Dowolny klient WebDriver','Natywne, hybrydowe i mobilne aplikacje webowe na iOS i Androidzie'],
   ['Karate','DSL do testów API (także UI i wydajności)','DSL podobny do Gherkin na JVM','Testy API bez dużej ilości Javy; wbudowane asercje JSON'],
   ['REST Assured','Biblioteka do testów API','Java','Zespoły Java piszące sprawdzenia API obok testów jednostkowych'],
   ['Puppeteer','Biblioteka sterowania przeglądarką','JavaScript','Skrypty dla Chrome/Firefox, scraping, PDF; to nie runner testów'],
   ['TestCafe','Framework E2E','JavaScript / TypeScript','Bez WebDriver, prosta konfiguracja, działa w każdej przeglądarce przez proxy'],
   ['Nightwatch','Framework E2E na WebDriver','JavaScript','Runner „wszystko w jednym” na WebDriver z testami komponentów'],
   ['Serenity BDD','Warstwa raportowania i Screenplay','Java / JS','Raporty „żywej dokumentacji” i wzorzec Screenplay']])],
  ['Warstwy, nie rywale',`<p>Wiele z tych narzędzi układa się warstwami, zamiast konkurować. Typowy zestaw korporacyjny to <b>Cucumber</b> (scenariusze) → <b>Serenity</b> (Screenplay i raporty) → <b>Selenium</b> (przeglądarka) → <b>Grid</b> (infrastruktura). Zestaw mobilny to <b>WebdriverIO</b> → <b>Appium</b> → chmura urządzeń.</p>
${T(['Warstwa','Na jakie pytanie odpowiada','Przykłady'],[
   ['Specyfikacja','Jak opisujemy zachowanie?','Gherkin, tabele słów kluczowych Robot'],
   ['Runner','Jak testy są znajdowane, uruchamiane, ponawiane i raportowane?','Playwright Test, Jest, JUnit, pytest, Mocha, TestNG'],
   ['Sterownik','Jak sterujemy aplikacją?','WebDriver, BiDi, CDP, Appium, protokół Playwright'],
   ['Infrastruktura','Gdzie to działa?','Selenium Grid, chmury urządzeń, kontenery CI'],
   ['Raportowanie','Jak ludzie czytają wyniki?','Allure, Serenity, reportery HTML, pulpity w chmurze']])}`],
  ['Wybór: trzy pytania',OL(['<b>W jakim języku zespół już pisze?</b> Narzędzie w języku, którego nikt w zespole nie zna, zostanie porzucone.','<b>Jaka to aplikacja?</b> Tylko web, mobilna, desktopowa, dużo API czy mieszanka.','<b>Co już istnieje?</b> Działający Grid, chmura urządzeń czy tysiące testów Selenium zmieniają rachunek.'])+CO('tip','Wskazówka','Zrób dwutygodniowy proof of concept na trzech najtrudniejszych prawdziwych scenariuszach (logowanie z MFA, przesyłanie pliku, niestabilny widżet zewnętrzny), a nie na stronie demo.')],
 ],
 quiz:[
  ['Które narzędzie służy do natywnych aplikacji iOS i Android przez protokół WebDriver?',['Puppeteer','Appium','Karate','TestCafe'],'Appium rozszerza WebDriver na aplikacje natywne, hybrydowe i mobilne webowe.'],
  ['Co w stosie Cucumber → Serenity → Selenium → Grid zapewnia Cucumber?',['Sterowanie przeglądarką','Zdalną infrastrukturę','Warstwę specyfikacji: scenariusze w Gherkin','Tylko raporty HTML'],'Cucumber zamienia scenariusze Gherkin na wywołania kroków; pracę z przeglądarką wykonują sterownik i grid.'],
  ['Zespół Java chce testów API z minimum kodu i wbudowanym dopasowaniem JSON. Co pasuje najlepiej?',['Karate','Puppeteer','Nightwatch','Testy komponentów Cypress'],'Karate to DSL na JVM stworzony do testów API z wbudowanymi asercjami JSON.'],
 ]};

M['katalon']={title:'Katalon',
 sum:'Komercyjna platforma low-code na Selenium i Appium: nagrywanie, skrypty w Groovy i uruchamianie testów web, API, mobilnych i desktopowych z jednego IDE.',
 sections:[
  ['Czego się nauczysz',UL(['Opisywać, co Katalon Studio dodaje do Selenium i Appium','Czytać test Katalon z Object Repository i wbudowanymi słowami kluczowymi','Nazywać funkcje AI w Katalon i to, co sprawdzić, zanim się na nich oprzesz','Porównywać platformę low-code z frameworkiem w kodzie'])],
  ['Czym jest',`<p><b>Katalon Studio</b> to IDE testowe zbudowane na Eclipse. Pod spodem steruje przeglądarkami przez <b>Selenium</b>, a telefonami przez <b>Appium</b>, i dodaje rejestrator, <b>Object Repository</b> lokatorów, setki wbudowanych słów kluczowych, pliki danych i raporty. Testy można budować w <b>widoku ręcznym (tabeli)</b> lub pisać w <b>Groovy</b> w widoku skryptu; oba edytują ten sam test.</p>
${T(['Część','Co robi'],[
   ['Katalon Studio','Desktopowe IDE do testów web, API, mobilnych i aplikacji Windows'],
   ['Runtime Engine (KRE)','Uruchamia projekty Studio z wiersza poleceń w CI; licencjonowany osobno'],
   ['TestOps / TruePlatform','Planowanie, wyniki, analityka i harmonogramy dla wielu projektów'],
   ['TestCloud','Hostowane przeglądarki i urządzenia do uruchamiania'],
   ['TrueTest','Generuje testy regresyjne na podstawie tego, jak prawdziwi użytkownicy poruszają się po produkcji'],
   ['Asystent AI (dawniej StudioAssist)','Zamienia kroki w zwykłym języku na kod testu i objaśnia istniejący kod']])}`],
  ['Test w widoku skryptu',`${P(0)}
<p><code class="i">findTestObject()</code> wyszukuje lokator po nazwie w Object Repository, więc zmieniony przycisk poprawia się w jednym miejscu. Wartości <code class="i">GlobalVariable</code> pochodzą z profili wykonania (dev, staging…).</p>`],
  ['Wbudowane funkcje AI',UL(['<b>Samonaprawianie</b>: gdy główny lokator zawodzi, Katalon próbuje innych lokatorów zapisanych dla obiektu (XPath, CSS, atrybuty, obraz) i loguje zamianę do przeglądu.','<b>Smart Wait</b>: czeka, aż strona przestanie się zmieniać, zanim wykona akcję.','<b>Asystent AI</b>: generuje kod z komentarzy oraz objaśnia lub refaktoryzuje zaznaczony kod.','<b>TrueTest</b>: buduje testy z prawdziwych sesji użytkowników i generuje je ponownie, gdy przepływ się zmienia.'])+CO('risk','Ryzyko','Zatwierdzaj naprawione lokatory z powrotem w repozytorium. Naprawiony przebieg, którego nikt nie przejrzał, może ukryć prawdziwą zmianę UI.')],
  ['Mocne strony i kompromisy',T(['Mocne strony','Kompromisy'],[
   ['Szybki start dla zespołów z niewielkim doświadczeniem w kodowaniu','Licencje: przebiegi w CI i zaawansowane funkcje wymagają płatnych licencji'],
   ['Web, API, mobile i desktop w jednym narzędziu','Projekty są w formacie Katalon, co utrudnia odejście'],
   ['Rejestrator plus Groovy, gdy potrzebny jest kod','Groovy i Eclipse wydają się przestarzałe wielu programistom JS/TS'],
   ['Raporty, analityka i harmonogramy w zestawie','Trudniej uruchamiać w kontenerach niż zwykły projekt Node lub Java']])+CO('tip','Wskazówka','Katalon pasuje zespołom o mieszanych umiejętnościach, które szybko potrzebują szerokiego zakresu. Dla zespołu programistów webowych piszących już w TypeScript framework w kodzie jest zwykle tańszy w dłuższym czasie.')],
 ],
 quiz:[
  ['Czego Katalon Studio używa pod spodem do sterowania przeglądarkami?',['Własnego silnika przeglądarki','Selenium WebDriver','Cypress','Tylko Puppeteer'],'Katalon jest zbudowany na Selenium dla webu i Appium dla mobile, z własnym IDE i słowami kluczowymi na wierzchu.'],
  ['Dlaczego Katalon trzyma lokatory w Object Repository?',['By testy działały szybciej','By zmieniony element poprawić w jednym miejscu dla wszystkich testów, które go używają','Bo Groovy nie przechowuje ciągów','By szyfrować hasła'],'Centralne lokatory to ta sama idea co page objects: jedna zmiana naprawia wiele testów.'],
  ['Czego potrzeba, by uruchamiać testy Katalon z serwera CI?',['Niczego poza Studio','Runtime Engine (KRE) z licencją','Konta Cypress Cloud','Selenium IDE'],'Uruchamianie z wiersza poleceń w CI używa Katalon Runtime Engine, który jest licencjonowany.'],
 ]};

M['applitools']={title:'Applitools i Visual AI',
 sum:'Testy wizualne porównujące ekrany tak, jak zrobiłby to człowiek: Eyes, poziomy dopasowania, Ultrafast Grid i platforma Autonomous.',
 sections:[
  ['Czego się nauczysz',UL(['Wyjaśniać, dlaczego porównanie pikseli jest zaszumione i jak Visual AI ogranicza szum','Wybierać poziom dopasowania dla strony','Dodawać wizualny punkt kontrolny do testu Playwright lub Cypress','Przeglądać wzorce, nie zatwierdzając prawdziwych błędów'])],
  ['Piksele a Visual AI',`<p>Porównanie pikseli oznacza każdy zmieniony piksel: antyaliasing, czcionkę wyrenderowaną o 1px szerzej, ruchomą karuzelę. Zespoły podnoszą progi, aż prawdziwe błędy się prześlizgują. <b>Applitools Eyes</b> porównuje strony <b>strukturalnie</b>, rozpoznając tekst, obrazy, układ i regiony, więc szum renderowania jest ignorowany, a brakujący przycisk czy nachodzący tekst nadal są wykrywane.</p>
${T(['','Porównanie pikseli','Visual AI (Eyes)'],[
   ['Antyaliasing i przesunięcia subpikselowe','Często pada','Ignorowane'],
   ['Brakujący lub nachodzący element','Pada','Pada'],
   ['Dynamiczny tekst (daty, imiona)','Wymaga maskowania','Poziom Layout lub Dynamic'],
   ['Wiele przeglądarek i urządzeń','Osobny przebieg na przeglądarkę','Przechwyć raz, wyrenderuj w Ultrafast Grid']])}`],
  ['Poziomy dopasowania',T(['Poziom','Porównuje','Używaj do'],[
   ['Strict (domyślny)','To, co zauważy człowiek: treść, kolor, położenie','Większości stron'],
   ['Layout','Strukturę i wyrównanie, a nie sam tekst czy obrazy','Stron ze zmienną treścią, np. serwisów informacyjnych'],
   ['Ignore Colors','Wszystko poza kolorem','Zmian motywu, sprawdzania trybu ciemnego'],
   ['Dynamic','Wzorce tekstu (daty, e-maile, liczby) zamiast dokładnych wartości','Pulpitów z danymi na żywo'],
   ['Exact','Piksel w piksel','Rzadko; wykresy lub obrazy, które muszą być identyczne']])+`<p>Możesz też oznaczać <b>regiony</b> na wzorcu: ignore, floating, layout-only itd. — dla jednego widżetu zamiast całej strony.</p>`],
  ['Dodawanie Eyes do testu',`<p>Dodaj wizualny punkt kontrolny obok istniejącego testu — jedno wywołanie, dowolne narzędzie:</p>
${P(0)}
${P(1)}
<p>Klucz API pochodzi ze zmiennej środowiskowej <code class="i">APPLITOOLS_API_KEY</code>. Nazwy i opcje SDK zmieniają się między wersjami, więc kopiuj z aktualnej dokumentacji.</p>`],
  ['Ultrafast Grid i Autonomous',UL(['<b>Ultrafast Grid</b>: test działa raz w jednej przeglądarce; Eyes przechwytuje DOM i CSS i renderuje je równolegle w chmurze w wielu przeglądarkach, rozmiarach okna i urządzeniach.','<b>Przegląd wzorców</b>: różnice pojawiają się na pulpicie Eyes, gdzie ktoś je akceptuje (nowy wzorzec) lub odrzuca (błąd). Zmiany można grupować, by jedna decyzja objęła wiele ekranów.','<b>Applitools Autonomous</b>: osobna platforma, która przeszukuje serwis i pozwala pisać testy funkcjonalne, wizualne i API zwykłym angielskim, ze sprawdzeniami Visual AI na każdym kroku.'])+CO('risk','Ryzyko','Zaakceptowanie wzorca to decyzja testowa. Ustalcie, kto może akceptować, i nigdy nie akceptujcie hurtem różnic, których nie obejrzeliście: prawdziwy błąd staje się wtedy nowym oczekiwanym wynikiem.')],
 ],
 quiz:[
  ['Nagłówki na stronie z wiadomościami zmieniają się co godzinę, ale układ musi pozostać ten sam. Jaki poziom dopasowania?',['Exact','Strict','Layout','Żaden'],'Layout sprawdza strukturę i wyrównanie, ignorując zmieniający się tekst i obrazy.'],
  ['Jak Ultrafast Grid szybko pokrywa wiele przeglądarek?',['Uruchamia pełny test osobno dla każdej przeglądarki na lokalnych maszynach','Przechwytuje DOM i CSS raz i renderuje je w wielu przeglądarkach w chmurze','Robi tylko jeden zrzut ekranu','Konwertuje testy na Selenium'],'Przechwyć raz, renderuj wszędzie: test funkcjonalny działa jeden raz.'],
  ['Jakie jest główne niebezpieczeństwo przy przeglądzie wzorców wizualnych?',['Pulpit jest wolny','Zaakceptowanie prawdziwego błędu jako nowego wzorca','Za dużo poziomów dopasowania','Zrzuty ekranu są za duże'],'Po akceptacji błąd staje się oczekiwanym wynikiem, a kolejne przebiegi przechodzą.'],
 ]};

M['vibium']={title:'Vibium: automatyzacja przeglądarki na erę AI',
 sum:'Młody projekt open source twórcy Selenium: jeden mały plik binarny, WebDriver BiDi pod spodem i serwer MCP, by agenci AI i testy dzielili tę samą przeglądarkę.',
 sections:[
  ['Czego się nauczysz',UL(['Wyjaśniać, skąd pochodzi Vibium i jaki problem rozwiązuje','Opisywać jego architekturę: klient, plik binarny, BiDi, przeglądarka','Napisać pierwszy skrypt i połączyć go z asystentem AI','Ocenić, czy młode narzędzie jest gotowe dla Twojego zestawu'])],
  ['Dlaczego powstał',`<p>Jason Huggins stworzył <b>Selenium</b> (2004) i <b>Appium</b> (2012). <b>Vibium</b> to jego projekt na erę AI: automatyzacja przeglądarki, która działa równie dobrze dla człowieka piszącego testy i dla agenta AI klikającego po stronie. Jest darmowy i otwarty (Apache 2.0).</p>
${T(['Idea','Co to oznacza'],[
   ['WebDriver BiDi','Zbudowany na dwukierunkowym protokole W3C zamiast klasycznego HTTP WebDriver czy CDP tylko dla Chrome'],
   ['Jeden plik binarny','Jeden program w Go („clicker”) obsługuje przeglądarkę; przy pierwszym uruchomieniu pobiera Chrome for Testing'],
   ['Automatyczne czekanie','Akcje czekają, aż element będzie widoczny, stabilny, aktywny i zdolny przyjąć zdarzenie'],
   ['Wbudowany MCP','Ten sam plik binarny udostępnia serwer MCP, więc asystent może bezpośrednio sterować przeglądarką'],
   ['Cienkie klienty','Klienci JavaScript/TypeScript i Python na tym samym silniku']])}`],
  ['Pierwszy skrypt',`${P(0)}
${CO('note','Najpierw sprawdź','Vibium jest nowy, a jego API wciąż się zmienia. Traktuj ten przykład jako kształt API, a dokładne wywołania kopiuj z README projektu.')}`],
  ['Czy go wdrożyć?',T(['Rozważ do','Poczekaj, jeśli potrzebujesz'],[
   ['Dawania agentom AI przeglądarki przez MCP','Dojrzałego runnera z fixtures, shardingiem i raportami HTML'],
   ['Małych skryptów i eksperymentów na standardowym protokole','Gwarancji długoterminowego wsparcia dla dużego zestawu regresyjnego'],
   ['Poznania kierunku rozwoju WebDriver BiDi','Szerokiej społeczności, wtyczek i rynku specjalistów']])+CO('tip','Wskazówka','Bezpieczny sposób na próbę: używaj Vibium do eksploracji wspomaganej AI i odtwarzania błędów, a zestaw regresyjny trzymaj w sprawdzonym frameworku, dopóki runner Vibium nie dojrzeje.')],
 ],
 quiz:[
  ['Na jakim protokole zbudowany jest Vibium?',['Tylko klasyczny HTTP WebDriver','WebDriver BiDi','Wewnątrzprzeglądarkowy runner Cypress','Microsoft UI Automation'],'Vibium używa protokołu W3C WebDriver BiDi przez WebSockety.'],
  ['Co pozwala asystentowi AI sterować przeglądarką Vibium?',['Rozszerzenie Chrome','Jego wbudowany serwer MCP','Selenium Grid','Wtyczka Katalon'],'Plik binarny Vibium udostępnia serwer MCP, z którym mogą łączyć się asystenci.'],
  ['Kto stworzył Vibium?',['Założyciele Cypress','Jason Huggins, twórca Selenium i Appium','Zespół Playwright w Microsofcie','Katalon'],'Vibium to projekt Jasona Hugginsa, po Selenium (2004) i Appium (2012).'],
 ]};

M['ai-test-automation']={title:'AI w automatyzacji testów w praktyce',
 sum:'Jak AI pojawia się w Playwright, Cypress, Selenium, Katalon, Applitools i Vibium, w czym jest dobre i jakie zabezpieczenia utrzymują wiarygodność zestawu.',
 sections:[
  ['Czego się nauczysz',UL(['Nazywać pięć dzisiejszych zastosowań AI w automatyzacji testów','Porównywać funkcje AI głównych narzędzi','Ustawiać pracę z agentami z ludzkim przeglądem','Zauważać tryby awarii: fałszywe naprawy, słabe asercje, wyciek danych'])],
  ['Pięć zastosowań AI',T(['Zastosowanie','Co się dzieje','Przykłady'],[
   ['Generowanie','Kroki w zwykłym języku lub przeszukanie aplikacji stają się kodem testu','Agent generator Playwright, cy.prompt(), asystent AI Katalon, Applitools Autonomous'],
   ['Samonaprawianie','Zepsuty lokator jest zastępowany najlepszym dopasowaniem','Katalon, bufor cy.prompt(), Healenium, agent uzdrowiciel Playwright'],
   ['Visual AI','Ekrany są porównywane tak, jak zrobiłby to człowiek','Applitools Eyes'],
   ['Przeglądanie przez agenta','Asystent steruje prawdziwą przeglądarką przez MCP','Playwright MCP, Vibium'],
   ['Analiza','Błędy są grupowane i sugerowana jest prawdopodobna przyczyna','Pulpity w chmurze, wykrywanie niestabilnych testów']])],
  ['Narzędzia obok siebie',T(['Narzędzie','Funkcje AI','Gdzie działa'],[
   ['Playwright','Serwer MCP; agenci planista, generator i uzdrowiciel tworzący zwykły kod testów','Twoja maszyna i CI; open source'],
   ['Cypress','Kroki w zwykłym języku cy.prompt() z naprawą z bufora i przez AI','Wymaga Cypress Cloud'],
   ['Selenium','Brak wbudowanych; Healenium i warstwy komercyjne dodają naprawy','Twoja infrastruktura'],
   ['Katalon','Samonaprawianie, Smart Wait, asystent AI, TrueTest z sesji użytkowników','Platforma Katalon; płatne plany'],
   ['Applitools','Visual AI, testy Autonomous zwykłym angielskim','Chmura Applitools'],
   ['Vibium','Wbudowany serwer MCP; zaprojektowany dla agentów i ludzi','Twoja maszyna; open source']])],
  ['Praca z agentami i przeglądem',OL(['<b>Plan</b>: agent eksploruje aplikację i pisze plan w Markdown. Tester go edytuje: dodaje ryzyka, usuwa drobiazgi.','<b>Generowanie</b>: agent pisze testy z użyciem fixtures i page objects projektu (wskaż mu je).','<b>Przegląd</b>: człowiek czyta każdą asercję. Czy sprawdza wymaganie, czy tylko to, że strona się załadowała?','<b>Uruchomienie w CI</b>: wygenerowane testy przechodzą przez te same bramki co pisane ręcznie.','<b>Naprawa z akceptacją</b>: proponowane poprawki przychodzą jako pull request, a nie jako cicha zmiana.'])+CO('tip','Wskazówka','Trzymaj krótki <code class="i">AGENTS.md</code> lub plik instrukcji: zasady lokatorów, których fixtures używać, czego nigdy nie mockować. Agenci o wiele lepiej trzymają się zapisanych zasad niż domyślnych.')],
  ['Tryby awarii i zabezpieczenia',T(['Tryb awarii','Zabezpieczenie'],[
   ['Naprawa klika niewłaściwy, ale podobny element','Loguj każdą naprawę; oblewaj build przy naprawach w krytycznych przepływach'],
   ['Wygenerowane asercje są słabe („strona ma tytuł”)','Lista kontrolna przeglądu: każdy test musi sprawdzać wynik biznesowy'],
   ['Naprawa ukrywa prawdziwą zmianę UI','Traktuj naprawy jako elementy do przeglądu, a nie poprawki'],
   ['Prompty i dane stron opuszczają Twoją sieć','Tylko dane testowe; sprawdź, jak dostawca przechowuje dane'],
   ['Niedeterministyczne generowanie','Commituj wygenerowany kod; nie generuj go od nowa przy każdym przebiegu'],
   ['Koszty rosną z każdym wywołaniem AI','Buforuj wyniki; wywołuj model tylko przy zmianach']])+CO('risk','Ryzyko','AI, które zmienia czerwony test w zielony, niczego nie naprawiło, dopóki człowiek nie potwierdzi, że produkt działa poprawnie. Celem jest mniej fałszywych błędów, a nie mniej błędów.')],
 ],
 quiz:[
  ['Uzdrowiciel AI zmienił lokator i test zamówienia znów przechodzi. Co powinno się stać dalej?',['Nic, test jest zielony','Człowiek przegląda naprawę, bo sama zmiana UI może być błędem','Usunąć historię starych lokatorów','Wyłączyć naprawy wszędzie'],'Naprawa to propozycja. UI zmienił się z jakiegoś powodu, a ten powód może być defektem.'],
  ['Agenci AI którego narzędzia tworzą zwykłe pliki testów, które commitujesz do repozytorium?',['Agenci testowi Playwright','Applitools Ultrafast Grid','Katalon TestOps','Selenium Grid'],'Planista, generator i uzdrowiciel tworzą i edytują zwykły kod Playwright.'],
  ['Po co commitować kod testów wygenerowany przez AI, zamiast generować go przy każdym przebiegu?',['Generowanie jest niedeterministyczne, więc każdy przebieg mógłby testować coś innego','Wymaga tego git','Modele nie działają w CI','To spowalnia testy'],'Chodzi o stabilny, przejrzany test. Generowanie przy każdym przebiegu sprawia, że wyników nie da się porównać.'],
 ]};

if(TR.pl.tracks)TR.pl.tracks.tools=['Narzędzia','Playwright, Cypress, Selenium, Katalon, Applitools, Vibium i szerszy krajobraz frameworków.'];
(TR.pl.glossary=TR.pl.glossary||[]).push(
 ['Katalon Studio','IDE testowe low-code na Selenium i Appium z rejestratorem, Object Repository i skryptami w Groovy.'],
 ['Object Repository','Centralny magazyn nazwanych lokatorów w Katalon, dzięki któremu zmieniony element poprawia się raz.'],
 ['Visual AI','Porównywanie ekranów strukturalnie, tak jak robi to człowiek, zamiast piksel po pikselu (Applitools Eyes).'],
 ['Poziom dopasowania','Jak ściśle Applitools porównuje punkt kontrolny: Strict, Layout, Ignore Colors, Dynamic lub Exact.'],
 ['Ultrafast Grid','Chmura Applitools renderująca jeden przechwycony DOM równolegle w wielu przeglądarkach i urządzeniach.'],
 ['Vibium','Otwarta automatyzacja przeglądarki na erę AI od twórcy Selenium, na WebDriver BiDi, z serwerem MCP.'],
 ['WebDriver BiDi','Dwukierunkowy protokół W3C na WebSocket do automatyzacji przeglądarek, następca klasycznego HTTP WebDriver.'],
 ['Selenium Manager','Wbudowany w Selenium 4.6+: sam znajduje lub pobiera właściwy sterownik przeglądarki.'],
 ['cy.intercept()','Polecenie Cypress, które szpieguje lub stubuje żądania sieciowe; czekaj na jego alias zamiast pauzy.'],
 ['cy.prompt()','Polecenie Cypress zamieniające kroki w zwykłym języku na buforowane, samonaprawiające się polecenia (wymaga Cypress Cloud).'],
 ['Agenci testowi Playwright','Definicje agentów planisty, generatora i uzdrowiciela, którzy planują, piszą i naprawiają testy Playwright.'],
 ['MCP','Model Context Protocol: standardowy sposób, w jaki asystenci AI wywołują narzędzia, np. sterują przeglądarką.'],
 ['Wzorzec wizualny','Zatwierdzony zrzut ekranu lub migawka, z którą porównuje test wizualny; akceptacja to decyzja testowa.'],
 ['Appium','Sterownik oparty na WebDriver dla natywnych, hybrydowych i mobilnych aplikacji webowych na iOS i Androidzie.'],
 ['Gherkin','Język Given / When / Then scenariuszy Cucumber, wspólny z biznesem.'],
);

TR.pl.resourcesHtml=`
<section class="sec"><h2>Ściągawka poleceń</h2>
<p>Te same pięć akcji, trzy narzędzia. Wystarczy, by uruchomić pierwszy test, szukając reszty.</p>
${T(['Akcja','Playwright','Cypress','Selenium (Java)'],[
 ['Otwórz stronę','<code class="i">await page.goto(url)</code>','<code class="i">cy.visit(url)</code>','<code class="i">driver.get(url)</code>'],
 ['Znajdź i kliknij','<code class="i">page.getByRole(\'button\',{name}).click()</code>','<code class="i">cy.get(sel).click()</code>','<code class="i">driver.findElement(by).click()</code>'],
 ['Wpisz tekst','<code class="i">locator.fill(value)</code>','<code class="i">cy.get(sel).type(value)</code>','<code class="i">element.sendKeys(value)</code>'],
 ['Sprawdź widoczność','<code class="i">await expect(locator).toBeVisible()</code>','<code class="i">cy.get(sel).should(\'be.visible\')</code>','<code class="i">wait.until(ExpectedConditions.visibilityOf(el))</code>'],
 ['Sprawdź tekst','<code class="i">await expect(locator).toHaveText(x)</code>','<code class="i">cy.get(sel).should(\'have.text\',x)</code>','<code class="i">assertEquals(x, el.getText())</code>'],
 ['Policz dopasowania','<code class="i">await locator.count()</code>','<code class="i">cy.get(sel).its(\'length\')</code>','<code class="i">driver.findElements(by).size()</code>'],
 ['Poczekaj','Automatyczne czekanie, wbudowane','Automatyczne ponawianie asercji, wbudowane','<code class="i">new WebDriverWait(driver, d)</code>'],
 ['Zastub sieć','<code class="i">page.route(url, handler)</code>','<code class="i">cy.intercept(method, url)</code>','Niewbudowane (potrzebna biblioteka proxy)'],
 ['Zrzut ekranu','<code class="i">await page.screenshot({path})</code>','<code class="i">cy.screenshot()</code>','<code class="i">((TakesScreenshot)driver).getScreenshotAs(FILE)</code>'],
 ['Uruchom headless','Domyślnie','<code class="i">cypress run</code>','<code class="i">ChromeOptions().addArguments(\'--headless=new\')</code>'],
])}
<h3>Priorytet lokatorów, w skrócie</h3>
${OL(['Widoczna rola i dostępna nazwa (<code class="i">getByRole</code> / lokatory roli ARIA) — odpowiada temu, co widzi użytkownik.','Tekst etykiety (label) lub placeholdera dla pól formularza.','Dedykowany atrybut testowy (<code class="i">data-testid</code>, <code class="i">data-cy</code>), gdy nie ma dobrej dostępnej nazwy.','Stabilny selektor CSS jako ostateczność.','XPath — tylko gdy nic innego nie działa: psuje się przy zmianach układu i najtrudniej go potem odczytać.'])}
${CO('note','Ta sama idea, trzy narzędzia','Konwencja <code class="i">getByRole</code> w Playwright, <code class="i">cy.get(\'[data-cy=...]\')</code> w Cypress i lokatory względne Selenium — wszystkie rozwiązują ten sam problem: znaleźć element tak, jak zrobiłby to człowiek, a nie po jego pozycji w DOM.')}
</section>
<section class="sec"><h2>Wyselekcjonowane oficjalne źródła</h2>
<p>Zakładki, nie zadanie domowe — podstawowe źródła, z którymi zweryfikowano ten kurs.</p>
<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
${resGroup('Podstawowe narzędzia',['pw','cy','se'])}
${resGroup('Poza wielką trójką',['wdio','robot','cucumber','appium','karate'])}
${resGroup('Wizualne i low-code',['katalon','apeyes'])}
${resGroup('AI i agenci',['mcp','pwmcp','vibium','bidi'])}
${resGroup('Certyfikacja',['istqb','istqbc','bcs','atsqa'])}
</div>
</section>
<section class="sec"><h2>Wybór narzędzia, w skrócie</h2>
${T(['','Playwright','Cypress','Selenium'],[
 ['Przeglądarki','Chromium, Firefox, WebKit','Rodzina Chromium, Firefox','Dowolna, przez WebDriver'],
 ['Języki','JS/TS, Python, Java, .NET','Tylko JS/TS','Java, C#, Python, JS, Ruby…'],
 ['Najlepsze do','Nowych projektów webowych ceniących szybkość i wbudowane narzędzia','Zespołów front-end potrzebujących szybkiej lokalnej pętli developerskiej','Dużych, wielojęzycznych lub starszych systemów; mobile przez Appium'],
])}
${CO('tip','Zgłęb temat','Pełne porównanie jest w „Porównanie trzech narzędzi”; interaktywny „Wybór narzędzia” uwzględnia Twoje własne ograniczenia.')}</section>`;

TR.pl.careerHtml=`
<section class="sec"><h2>Bank pytań rekrutacyjnych</h2>
<p>To nie scenariusz do wyuczenia się na pamięć — użyj tego, by sprawdzić, czy potrafisz wyjaśnić „dlaczego”, a nie tylko „jak”.</p>
${carCat('Podstawy',[
 ['Jaka jest różnica między testowaniem a sprawdzaniem (checking)?','Sprawdzanie potwierdza znane, określone zachowanie (w czym automatyzacja jest dobra). Testowanie bada też nieznane — eksploruje, kwestionuje założenia, ocenia, czy produkt naprawdę spełnia swój cel. Automatyzacja sprawdza; ludzie wciąż testują.'],
 ['Dlaczego nie warto automatyzować wszystkiego?','Niektóre sprawdzenia (jednorazowa ocena wizualna, testy eksploracyjne, użyteczność) są tańsze lub możliwe tylko ręcznie. Piramida testów pokazuje, gdzie automatyzacja zwraca się najszybciej: dużo szybkich testów jednostkowych, mniej testów API, jeszcze mniej wolnych, kruchych testów end-to-end.'],
 ['Wyjaśnij piramidę testów i antywzorzec „rożka z lodami”.','Piramida faworyzuje wiele szybkich, izolowanych testów jednostkowych, środkową warstwę testów API/integracyjnych i cienką górną warstwę testów UI end-to-end. „Rożek z lodami” odwraca to — głównie wolne, niestabilne testy UI i mało testów jednostkowych — co działa wolno i jest drogie w utrzymaniu.'],
 ['Czym jest test double i wymień dwa rodzaje.','Test double zastępuje prawdziwą zależność. <b>Stub</b> zwraca gotowe odpowiedzi; <b>mock</b> dodatkowo sprawdza, czy został poprawnie wywołany. Inne: dummy (nigdy nieużywany, tylko wypełnia parametr), spy (zapisuje wywołania na prawdziwym obiekcie), fake (działająca, lżejsza implementacja).'],
 ['Jak decydujesz, co automatyzować w pierwszej kolejności?','Na podstawie ryzyka: automatyzuj najpierw sprawdzenia chroniące przepływy o najwyższym ryzyku, najczęstsze i najbardziej stabilne — tam, gdzie regresja jest kosztowna, a UI/API rzadko się zmienia z sprintu na sprint.'],
])}
${carCat('Narzędzia i projektowanie frameworku',[
 ['Dlaczego zespół mógłby dziś wybrać Playwright zamiast Selenium?','Wbudowany równoległy przebieg, automatyczne czekanie, śledzenie (tracing) i wsparcie wielu przeglądarek (w tym WebKit) bez budowania Grid, plus runner testów najwyższej klasy — kosztem szerszego ekosystemu językowego i infrastrukturalnego Selenium.'],
 ['Jaki problem rozwiązuje Page Object Model?','Centralizuje lokatory i interakcje ze stroną w jednej klasie na stronę lub komponent, więc zmiana UI jest naprawiana w jednym miejscu zamiast w każdym teście, który dotyka tego elementu.'],
 ['Czym jest niestabilny (flaky) test i jak go zdiagnozować?','Test, który przechodzi i pada bez zmiany kodu. Diagnoza: odtwórz z powtórzeniami, sprawdź warunki czasowe/wyścigowe, współdzielony stan lub problemy środowiska, wyłącz go z obowiązkowej bramki na czas badania, a potem napraw przyczynę zamiast dodawać dłuższe oczekiwanie.'],
 ['Jak zorganizować dane testowe, by testy mogły działać równolegle?','Każdy test tworzy i posiada własne dane (przez API, nie UI), używa unikalnych identyfikatorów, by uniknąć kolizji, i sprząta po sobie nawet po awarii — żaden test nie powinien zależeć od pozostałości stanu innego testu.'],
 ['Co skłoniłoby Cię do odrzucenia testu wygenerowanego przez AI podczas review?','Słaba asercja, która nie sprawdza rzeczywistego wymagania (np. „strona ma tytuł”), strategia selektorów, której zespół nie używa, lub „naprawa”, która po cichu osłabia asercję zamiast zbadać przyczynę awarii.'],
])}
${carCat('CI/CD i strategia jakości',[
 ['Co powinno znaleźć się w bramce jakości CI dla pull requesta?','Szybkie, deterministyczne sprawdzenia: testy jednostkowe, lint, podzbiór smoke testów end-to-end i skanowanie sekretów. Wolniejsze pełne zestawy regresyjne zwykle działają wg harmonogramu lub po scaleniu, nie blokując każdego PR.'],
 ['Jak zmierzyć, czy automatyzacja naprawdę się opłaca?','Wskaźnik ucieczki defektów (błędy, które test mógł, ale nie złapał), odsetek „zielone po ponowieniu” (niestabilność), czas do informacji zwrotnej i czas diagnozy awarii — a nie same liczby testów czy procent pokrycia, które łatwo naciągnąć.'],
 ['Czym jest sharding i po co go używać?','Podział zestawu testów między wiele równoległych workerów lub maszyn, dzięki czemu przebieg, który trwałby 40 minut sekwencyjnie, kończy się w kilka minut rzeczywistego czasu.'],
 ['Jak trzymać sekrety poza pipeline\'em CI?','Magazyny sekretów specyficzne dla środowiska (nie zacommitowane pliki), zacommitowany <code class="i">.env.example</code> z samymi placeholderami i skanowanie sekretów jako część samego pipeline\'u.'],
 ['Zestaw, który wczoraj był zielony, dziś jest czerwony bez zmian w kodzie. Co sprawdzasz najpierw?','Zależności zewnętrzne (API stron trzecich, dane testowe, zmiany środowiska/infrastruktury), a potem czy to jeden niestabilny test, czy awaria systemowa, zanim założysz regresję produktu.'],
])}
${carCat('Pytania behawioralne i sytuacyjne',[
 ['Opowiedz o sytuacji, gdy test złapał prawdziwy błąd przed wydaniem.','Opisz sprawdzenie, co złapało i — co ważne — dlaczego to sprawdzenie istniało (jakie ryzyko obejmowało), a nie tylko to, że przeszło.'],
 ['Opowiedz o niestabilnym zestawie testów, który odziedziczyłeś. Co zrobiłeś?','Przejdź przez diagnozę, decyzję kwarantanna kontra naprawa i jak zmierzyłeś poprawę (spadek odsetka niestabilności w czasie), a nie tylko „naprawiłem to”.'],
 ['Jak reagujesz, gdy proszą Cię o zautomatyzowanie wszystkiego, co robi tester manualny?','Wyjaśnij bilans kosztów i korzyści za pomocą piramidy i priorytetyzacji opartej na ryzyku oraz zaproponuj, co zautomatyzować najpierw, a co pozostawić ręcznie, z uzasadnieniem.'],
 ['Jak radzisz sobie z niezgodą z programistą co do tego, czy coś jest błędem?','Skup się na dowodach (oczekiwane kontra rzeczywiste zachowanie, odniesienie do wymagania), zachowaj ciekawość co do jego rozumowania i spokojnie eskaluj z danymi, jeśli nadal się nie zgadzacie.'],
])}
</section>
<section class="sec"><h2>Pomysły na projekty do portfolio</h2>
<p>Publiczne repozytorium jest warte więcej niż punkt w CV. Wybierz jeden, ogranicz zakres tak, by dało się go skończyć, i napisz krótki README wyjaśniający Twoje decyzje.</p>
<div class="grid">
${carProject('Zestaw regresyjny API + UI','Zbuduj mały zestaw dla publicznej aplikacji demo (tych samych z ćwiczeń praktycznych) obejmujący i API, i UI, z warstwą page object i workflow GitHub Actions dzielącym przebieg na sharding.',['Projektowanie frameworku','CI/CD','Testowanie API'])}
${carProject('Krzyżowo-przeglądarkowy zestaw smoke z testami wizualnymi','Zestaw Playwright uruchamiający te same testy smoke w Chromium, Firefox i WebKit, z darmowym narzędziem do porównań wizualnych podłączonym dla jednej kluczowej strony.',['Wiele przeglądarek','Testy wizualne'])}
${carProject('Raport diagnozy niestabilnych testów','Uruchamiaj mały zestaw wielokrotnie w CI, zbieraj wyniki i napisz krótki skrypt lub notebook rankingujący testy według wskaźnika przejść i oznaczający prawdopodobnie niestabilne, z dowodami.',['Niezawodność','Raportowanie'])}
${carProject('Generowanie wspomagane AI, z przeglądem','Użyj funkcji generowania testów AI (np. agentów testowych Playwright) na małej aplikacji open source, a potem opisz, co zaakceptowałeś, co odrzuciłeś i dlaczego — przegląd jest tu najważniejszy.',['AI w testowaniu','Dyscyplina przeglądu'])}
${carProject('Audyt dostępności','Uruchom automatyczne sprawdzenia dostępności (axe) na kluczowych stronach prawdziwej witryny, posegreguj wyniki według istotności i napisz krótki raport rozróżniający to, co wykrywa narzędzie, od tego, co wymaga sprawdzenia przez człowieka.',['Dostępność','Raportowanie'])}
</div>
</section>
<section class="sec"><h2>Lista kontrolna: umiejętności → ogłoszenie o pracę</h2>
<p>Co naprawdę oznaczają modne słowa z ogłoszeń i gdzie ten kurs to omawia.</p>
${T(['Zobaczysz…','To oznacza…','Omówione w'],[
 ['Page Object Model / POM','Lokatory i interakcje ze stroną zorganizowane w wielokrotnego użytku klasy stron','<a href="#framework-architecture">Architektura frameworku i POM</a>'],
 ['Pipeline\'y CI/CD','Testy uruchamiane automatycznie przy każdym push lub pull requeście','<a href="#ci-cd">CI/CD i ciągłe testowanie</a>'],
 ['Testowanie API','Testowanie endpointów bezpośrednio, nie tylko przez UI','<a href="#api-testing">Testowanie API</a>'],
 ['Testowanie wielu przeglądarek','Te same testy działające w Chromium, Firefox i WebKit/Safari','<a href="#compare-tools">Porównanie trzech narzędzi</a>'],
 ['Zarządzanie niestabilnymi testami','Wykrywanie, kwarantannowanie i naprawianie testów padających sporadycznie','<a href="#flaky-tests">Niestabilne testy i niezawodność</a>'],
 ['Testowanie oparte na ryzyku / shift-left','Priorytetyzacja tego, co automatyzować, według ryzyka i kosztu awarii','<a href="#strategy-risk">Strategia i automatyzacja oparta na ryzyku</a>'],
 ['Testowanie dostępności (a11y)','Automatyczne sprawdzenia (np. axe) plus ręczny przegląd','<a href="#security-performance">Bezpieczeństwo, prywatność i wydajność</a>'],
 ['Testowanie wspomagane AI / agentowe','Używanie AI do generowania, naprawiania lub przeglądania testów pod ludzkim nadzorem','<a href="#ai-test-automation">AI w automatyzacji testów w praktyce</a>'],
 ['Testowanie regresji wizualnej','Wykrywanie niezamierzonych zmian UI przez porównanie zrzutów ekranu lub Visual AI','<a href="#applitools">Applitools i Visual AI</a>'],
 ['ISTQB Foundation / CTFL','Standardowa certyfikacja podstawowego poziomu w testowaniu','<a href="#istqb-ctfl">Podstawy ISTQB CTFL</a>'],
])}
${CO('note','Odpowiedzialne korzystanie','Swobodne posługiwanie się tymi pojęciami i umiejętność dyskutowania kompromisów liczy się bardziej niż wykuwanie definicji na pamięć. Jeśli używasz narzędzi AI w zadaniu rekrutacyjnym do domu, powiedz o tym wprost i bądź gotów wyjaśnić, co sprawdziłeś i zmieniłeś.')}
</section>`;
})();
