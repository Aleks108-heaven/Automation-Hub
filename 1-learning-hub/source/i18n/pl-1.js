/* Polski — Podstawy i narzędzia */
TR.pl=TR.pl||{modules:{}};
Object.assign(TR.pl.modules,{
'what-is-automation':{title:'Czym jest automatyzacja testów',
 sum:'Oprogramowanie, odrębne od testowanego systemu, które steruje wykonaniem testów i porównuje rzeczywiste wyniki z oczekiwanymi.',
 sections:[
  ['Czego się nauczysz',UL(['Definiować automatyzację testów i rolę wyroczni testowej','Wymieniać, w czym automatyzacja jest dobra, a czego za Ciebie nie zrobi','Odróżniać przypadek testowy, skrypt, framework i pipeline','Szacować, kiedy automatyczne sprawdzenie się zwraca'])],
  ['Definicja',`<p>Automatyzacja testów to użycie oprogramowania odrębnego od testowanego systemu, aby <b>sterować wykonaniem testów</b> i <b>porównywać rzeczywiste wyniki z oczekiwanymi</b>. Automatyczne sprawdzenia działają bez ciągłej ręcznej interakcji i zwykle są wpięte w ciągłe testowanie oraz CI/CD.</p>
   ${CO('note','Kluczowa myśl','Automatyzacja nie zastępuje wiedzy testerskiej. Ludzie nadal decydują, co testować, dlaczego to ważne, jakie istnieją ryzyka i czy automatyczne sprawdzenia dają sensowne pokrycie.')}`],
  ['W czym automatyzacja jest dobra',UL(['Powtarzalne sprawdzenia regresyjne','Duże zbiory deterministycznych sprawdzeń API lub UI','Szybka informacja zwrotna po commitach i pull requestach','Wykonanie w wielu przeglądarkach i środowiskach','Testowanie sterowane danymi','Zestawy smoke i sanity','Ponowna weryfikacja poprawek błędów','Równoległe wykonanie, jeśli infrastruktura na to pozwala','Dowody czytelne maszynowo: logi, zrzuty ekranu, ślady, wideo, raporty'])],
  ['Czego za Ciebie nie rozwiąże',UL(['Wyboru właściwych scenariuszy','Testowania eksploracyjnego i odkrywania nieoczekiwanych zachowań','Oceny użyteczności','Analizy ryzyka biznesowego','Niejednoznacznych wymagań','Złych danych testowych lub niestabilnych środowisk','Słabej wyroczni — jeśli oczekiwane zachowanie jest niejasne, automatyzacja może jedynie niezawodnie sprawdzać nie to, co trzeba','Niestabilnej infrastruktury lub zależności'])+CO('risk','Ryzyko','Automatyzacja ma realne koszty: czas tworzenia, utrzymanie, niestabilne testy, infrastrukturę, zarządzanie danymi testowymi, fałszywe poczucie pewności i automatyzację mało wartościowych sprawdzeń.')],
  ['Przypadek, skrypt, framework, pipeline',`${T(['Pojęcie','Czym jest','Przykład'],[
   ['Przypadek testowy','Projekt: warunki wstępne, dane wejściowe, kroki, oczekiwany wynik','„Zarejestrowany użytkownik loguje się poprawnymi danymi i widzi pulpit”'],
   ['Skrypt testowy','Kod wykonujący jeden lub więcej przypadków testowych','login.spec.ts'],
   ['Zestaw testów','Grupa skryptów uruchamianych razem w określonym celu','Zestaw smoke, nocny zestaw regresyjny'],
   ['Framework','Wspólna struktura, na której opierają się skrypty: runner, konfiguracja, fixtures, abstrakcje, raportowanie','Playwright Test plus Twoje pages/, utils/ i fixtures'],
   ['Pipeline','Proces CI/CD, który uruchamia zestawy i reaguje na wyniki','Workflow GitHub Actions uruchamiający smoke przy każdym PR']])}
   ${CO('note','Kluczowa myśl','Często mówi się „framework”, mając na myśli narzędzie. Playwright, Cypress i Selenium to narzędzia; framework to to, co zespół buduje wokół nich.')}`],
  ['Kiedy automatyzacja się zwraca?',`<p>Prosta ocena progu rentowności porównuje koszt zbudowania sprawdzenia z tym, co oszczędza przy każdym uruchomieniu:</p>
${P(0)}
 <p>Uruchamiane przy każdym pull requeście — powiedzmy 10 razy w tygodniu — sprawdzenie zwróci się w niecały miesiąc. Uruchamiane raz na kwartał — po sześciu latach. Zwróć uwagę na koszt utrzymania: niestabilny lub kruchy test go podnosi, a powyżej 2 godzin na uruchomienie sprawdzenie nigdy się nie zwróci.</p>
 ${CO('tip','Wskazówka','Liczby są przybliżone, ale szacowanie wymusza właściwe pytania: jak często to będzie uruchamiane i ile będzie kosztować utrzymanie tego testu przy życiu?')}`],
 ],
 quiz:[
  ['Czego automatyzacja NIE rozwiązuje sama?',['Uruchamiania tych samych sprawdzeń regresyjnych po każdym commicie','Decydowania, które scenariusze warto testować','Wykonywania sprawdzeń w kilku przeglądarkach','Zapisywania zrzutów ekranu i śladów przy błędzie'],'Wybór scenariuszy to projektowanie testów — ludzka ocena ryzyka i wartości. Automatyzacja wykonuje sprawdzenia, ale ich nie wybiera.'],
  ['Czym jest problem „słabej wyroczni”?',['Runner testów jest za wolny','Oczekiwany wynik jest niejasny, więc automatyzacja może z pewnością sprawdzać nie to, co trzeba','Biblioteka asercji ma błędy','Testy działają w złej kolejności'],'Wyrocznia to źródło wiedzy o oczekiwanym wyniku. Jeśli jest mglista, zielony przebieg dowodzi tylko zgodności z mglistym oczekiwaniem.'],
  ['Co automatyzacja szczególnie dobrze wytwarza?',['Opinie o użyteczności','Dowody czytelne maszynowo, np. logi, ślady i raporty','Priorytety ryzyka biznesowego','Doprecyzowane wymagania'],'Automatyzacja niezawodnie zbiera dowody przy każdym przebiegu; ocena użyteczności, ryzyka i wymagań pozostaje ludzka.'],
  ['Wymagania dla funkcji wciąż są przedmiotem sporu. Czy automatyzować teraz jej testy E2E?',['Tak, automatyzacja rozstrzygnie spór','Jeszcze nie — bez jasnej wyroczni zautomatyzujesz niewłaściwe oczekiwanie','Tak, ale tylko z ponowieniami','Tak, przez nagrywanie i odtwarzanie'],'Niejednoznaczne wymagania są na liście rzeczy, których automatyzacja nie rozwiązuje. Najpierw doprecyzuj oczekiwane zachowanie.'],
  ['Co jest frameworkiem, a nie skryptem?',['login.spec.ts','Wspólna konfiguracja runnera, fixtures, page objects i raportowanie, na których opierają się specyfikacje','Pojedyncza asercja','Przebieg w GitHub Actions'],'Skrypt wykonuje przypadki testowe; framework to wspólna struktura używana przez skrypty.'],
  ['Budowa 30 h, ręczne uruchomienie 1,5 h, utrzymanie automatu 0,5 h na uruchomienie. Po ilu uruchomieniach następuje próg rentowności?',['20','30','60','Nigdy'],'Oszczędność na uruchomienie = 1,5 − 0,5 = 1 h; 30 / 1 = 30 uruchomień.'],
 ]},

'manual-vs-automated':{title:'Testowanie ręczne a automatyczne',
 sum:'Uzupełniają się. Automatyzacja wygrywa powtarzalnością i skalą; ludzie — eksploracją i osądem.',
 sections:[
  ['Czego się nauczysz',UL(['Porównywać testowanie ręczne i automatyczne pod względem kosztu, szybkości i dowodów','Wyjaśniać różnicę między testowaniem a sprawdzaniem','Planować tydzień łączący pracę eksploracyjną i automatyczną'])],
  ['Obok siebie',T(['Wymiar','Testowanie ręczne','Testowanie automatyczne'],[
   ['Wykonanie','Przez człowieka','Przez narzędzie / kod'],['Powtarzalność','Umiarkowana','Wysoka, gdy deterministyczne'],['Koszt początkowy','Zwykle niższy','Zwykle wyższy'],
   ['Szybkość regresji','Wolniejsza dla dużych zestawów','Szybka i powtarzalna'],['Eksploracja','Silna','Ograniczona, chyba że celowo zaprojektowana'],['Skala przeglądarek','Kosztowna','Dobrze się nadaje'],
   ['Utrzymanie','Wysiłek człowieka przy każdym przebiegu','Utrzymanie kodu, danych i infrastruktury'],['CI/CD','Ograniczone','Świetnie pasuje'],['Nieoczekiwane problemy UX','Pomaga obserwacja człowieka','Zwykle potrzebne specjalne sprawdzenia'],['Dowody','Notatki, zrzuty ekranu','Logi, raporty, ślady, zrzuty ekranu, wideo']])],
  ['Jak czytać tabelę',`<p>Zwróć uwagę, gdzie przesuwa się koszt. Testowanie ręczne płaci <i>za każdy przebieg</i>; automatyzacja płaci z góry, a potem za <i>utrzymanie</i>. Opłaca się, gdy sprawdzenie jest uruchamiane wystarczająco często i jest wystarczająco stabilne, by koszt początkowy się zwrócił.</p>`+CO('tip','Wskazówka','Dobra reguła: automatyzuj to, co powtarzalne, stabilne i ważne; ludziom zostaw to, co eksploracyjne, nowe lub wymagające osądu.')],
  ['Testowanie a sprawdzanie',`<p>James Bach i Michael Bolton odróżniają <b>sprawdzanie</b> (checking) — ocenę przez stosowanie algorytmicznych reguł decyzyjnych do konkretnych obserwacji — od <b>testowania</b> (testing), szerszego procesu oceny produktu przez poznawanie go w drodze eksploracji i eksperymentu. Automatyzacja potrafi sprawdzać; testowanie obejmuje sprawdzanie, ale także zadawanie pytań, modelowanie i dostrzeganie nieoczekiwanego.</p>
 ${CO('note','Kluczowa myśl','Automatyczne sprawdzenie odpowiada dokładnie na pytanie, dla którego je napisano. Decydowanie, jakie pytania zadać, i dostrzeganie tych, których nikt nie zapisał, to część ludzka.')}`],
  ['Hybrydowy tydzień w praktyce',T(['Kiedy','Automatycznie','Człowiek'],[
   ['Każdy commit / PR','Zestawy jednostkowe, API i smoke dają szybką informację zwrotną','Przegląd błędów: poprawka czy niestabilność'],
   ['Nowa funkcja','Automatyzacja stabilnych kryteriów akceptacji, gdy zachowanie się ustali','Ograniczone czasowo sesje eksploracyjne z kartą, póki funkcja jest nowa'],
   ['Co noc','Pełna regresja w wielu przeglądarkach','Rano przegląd nocnych błędów'],
   ['Przed wydaniem','Smoke wydania i krytyczne ścieżki','Eksploracja ryzykownych obszarów; przegląd użyteczności i dostępności'],
   ['Po incydencie','Dodanie sprawdzenia regresyjnego odtwarzającego błąd','Analiza przyczyny źródłowej: czemu żaden test tego nie złapał?']])],
 ],
 quiz:[
  ['Gdzie automatyzacja zwykle kosztuje WIĘCEJ niż testowanie ręczne?',['Szybkość regresji','Koszt początkowy','Skala przeglądarek','Dopasowanie do CI/CD'],'Zbudowanie automatyzacji — kod, dane, infrastruktura — kosztuje więcej z góry. Zwraca się przez powtarzane przebiegi.'],
  ['Jaki problem testowanie ręczne zwykle łapie lepiej?',['Regresję w stabilnym kontrakcie API','Nieoczekiwaną, mylącą ścieżkę UX','Błąd występujący tylko w Firefoksie','Zepsuty test smoke po wdrożeniu'],'Nieoczekiwane problemy UX wymagają obserwacji człowieka; automatyczne sprawdzenia widzą tylko to, na co je nastawiono.'],
  ['Jaki rodzaj dowodów jest charakterystyczny dla przebiegów automatycznych, a nie ręcznych?',['Notatki testera','Ślady i ustrukturyzowane raporty','Ustne opinie','Karty sesji'],'Automatyzacja wytwarza logi, raporty, ślady, zrzuty ekranu i wideo przy każdym przebiegu.'],
  ['Funkcja zostanie wydana raz i wycofana w przyszłym miesiącu. Automatyzować jej sprawdzenia regresyjne?',['Tak, zawsze automatyzuj','Raczej nie — koszt początkowy nie zwróci się z powtórzeń','Tylko w trzech przeglądarkach','Tylko narzędziami AI'],'Automatyzacja zwraca się przez powtarzanie. Krótko żyjąca funkcja rzadko jest uruchamiana wystarczająco często.'],
  ['Co, w terminologii Bacha i Boltona, robi automatyczne sprawdzenie?',['Testowanie w pełnym sensie','Sprawdzanie: stosowanie reguł decyzyjnych do konkretnych obserwacji','Testowanie eksploracyjne','Analizę ryzyka'],'Automatyzacja wykonuje sprawdzanie; testowanie obejmuje też eksplorację, pytania i uczenie się.'],
  ['Co powinna zrobić strona automatyzacji po incydencie na produkcji?',['Nic','Dodać sprawdzenie regresyjne odtwarzające błąd','Usunąć powiązane testy','Zwiększyć ponowienia'],'Każdy błąd, który przeciekł, staje się sprawdzeniem regresyjnym, by nie wrócił po cichu.'],
 ]},

'test-levels':{title:'Gdzie pasuje automatyzacja',
 sum:'Jednostkowe, komponentowe, API, end-to-end, regresyjne, smoke, dostępności, wizualne i wydajnościowe — każdy poziom odpowiada na inne pytanie.',
 sections:[
  ['Czego się nauczysz',UL(['Dopasowywać ryzyko do najniższego poziomu testów dającego wystarczającą pewność','Czytać piramidę testów, trofeum testów i antywzorzec rożka lodów','Wybierać właściwego dublera testowego: dummy, stub, spy, mock lub fake'])],
  ['Poziomy',T(['Poziom','Co sprawdza'],[
   ['Jednostkowy','Szybkie sprawdzenia blisko kodu'],['Komponentowy','Komponenty UI w kontrolowanej przeglądarce / środowisku'],['API / usług','Kontrakty, reguły biznesowe, autoryzację, walidację, zachowanie przy błędach'],
   ['End-to-end','Pełne, widoczne dla użytkownika ścieżki przez granice systemów'],['Regresyjny','Istniejącą funkcjonalność, wielokrotnie'],['Smoke','Mały zestaw ścieżki krytycznej: czy ten build / środowisko w ogóle nadaje się do testów?'],
   ['Dostępność','Wybrane naruszenia dostępności — uzupełnia ocenę ręczną'],['Wizualny','Wyrenderowany wynik względem zatwierdzonego wzorca'],['Wydajność / obciążenie','Używaj dedykowanych narzędzi, nie funkcjonalnej automatyzacji przeglądarki']])],
  ['Wybór poziomu',`<p>Wybieraj <b>najniższy poziom testów, który daje wystarczającą pewność</b>. Reguła biznesowa sprawdzona przez API jest szybsza i mniej krucha niż ta sama reguła sprawdzana klikaniem po UI. Testy end-to-end zostaw dla krytycznych ścieżek użytkownika i pewności integracji.</p>`+CO('risk','Ryzyko','Nadużywanie testów E2E tworzy wolne, kruche zestawy tam, gdzie testy niższego poziomu dałyby szybszą informację zwrotną.')],
  ['Piramida, trofeum i rożek lodów',`${T(['Kształt','Idea','Kiedy pasuje'],[
  ['Piramida testów (Cohn, spopularyzował Fowler)','Wiele szybkich testów jednostkowych, mniej testów usług / API, mało testów UI','Większość systemów z rozbudowanym backendem'],
  ['Trofeum testów (Kent C. Dodds)','Analiza statyczna u podstawy, największa waga na testach integracyjnych, mało E2E','Aplikacje front-endowe, gdzie testy integracyjne dają najlepszy stosunek pewności do kosztu'],
  ['Rożek lodów (antywzorzec)','Głównie testy ręczne i UI, mało jednostkowych','Nigdy celowo: wolna, krucha, kosztowna informacja zwrotna']])}
 <p>Kształty różnią się szczegółami, ale zgadzają co do sedna: przesuwaj sprawdzenia na najszybszy poziom, który nadal łapie ryzyko, a testy end-to-end zostaw dla ścieżek, które mają sens tylko end-to-end.</p>`],
  ['Dublery testowe',`${T(['Dubler','Co robi','Przykład'],[
  ['Dummy','Przekazywany, ale nigdy nieużywany','Zastępczy argument loggera'],
  ['Stub','Zwraca przygotowane odpowiedzi','API płatności zawsze odpowiada „zatwierdzono”'],
  ['Spy','Stub, który dodatkowo zapisuje, jak go wywołano','Sprawdź, że usługę e-mail wywołano raz'],
  ['Mock','Ma zaprogramowane oczekiwania; oblewa test, gdy wywołania się nie zgadzają','Oczekuj dokładnie jednego wywołania charge(49.99)'],
  ['Fake','Działająca, uproszczona implementacja','Baza danych w pamięci']])}
 ${CO('risk','Ryzyko','Każdy dubler zastępuje prawdziwą integrację założeniem na jej temat. Zachowaj kilka testów na prawdziwym systemie albo test kontraktowy, żeby te założenia były weryfikowane.')}`],
 ],
 quiz:[
  ['Musisz zweryfikować regułę rabatu dla 40 kombinacji cen. Najlepszy poziom?',['End-to-end przez UI koszyka','Testy API / usług sterowane danymi','Testy wizualne','Ręczna sesja eksploracyjna'],'Wiele deterministycznych kombinacji reguły biznesowej to klasyczny przypadek dla API i danych. UI dodaje czas i kruchość, a nie pewność.'],
  ['Do czego służy zestaw smoke?',['Wyczerpująca regresja','Testy obciążeniowe','Ustalenie, czy build / środowisko w ogóle nadaje się do testów','Audyty dostępności'],'Smoke = mały, szybki zestaw ścieżki krytycznej uruchamiany jako pierwszy. Jeśli nie przejdzie, głębsze testy nie mają sensu.'],
  ['Który poziom powinien weryfikować, że użytkownik nie odczyta kontaktów innego tenanta?',['Tylko testy wizualne','Testy API / usług (plus wybrane sprawdzenie E2E)','Tylko testy jednostkowe','Testy wydajnościowe'],'Reguły autoryzacji żyją na granicach usług; testy API trafiają w nie bezpośrednio i szybko.'],
  ['Chcesz wiedzieć, jak koszyk poradzi sobie z 2000 równoczesnych użytkowników. Czego użyć?',['Uruchomić zestaw E2E na 2000 workerach','Dedykowanego narzędzia do testów wydajności / obciążenia','Testów wizualnych','Testów komponentów'],'Przeglądarkowe testy E2E nie są generatorami obciążenia; używaj specjalizowanych narzędzi.'],
  ['Zestaw ma 400 testów UI i 20 jednostkowych. Jaki to kształt?',['Piramida testów','Trofeum testów','Rożek lodów (antywzorzec)','Romb'],'Zestawy zdominowane przez testy UI to rożek lodów.'],
  ['Który dubler testowy zapisuje, jak go wywołano, by można to potem sprawdzić?',['Dummy','Stub','Spy','Fake'],'Spy to stub, który dodatkowo zapisuje swoje wywołania.'],
  ['Baza danych w pamięci zamiast prawdziwej to…',['Mock','Fake','Dummy','Stub'],'Fake to działająca, uproszczona implementacja.'],
 ]},

'playwright':{title:'Playwright',
 sum:'Framework end-to-end dla nowoczesnych aplikacji webowych: zintegrowany runner, asercje, izolacja, równoległość i narzędzia dla Chromium, Firefoksa i WebKit.',
 sections:[
  ['Czego się nauczysz',UL(['Tworzyć, uruchamiać i debugować projekt Playwright','Czytać każdą linię domyślnego playwright.config.ts','Wybierać lokatory w zalecanej kolejności','Strukturyzować test za pomocą bloków describe, hooków, kroków i tagów'])],
  ['Czym jest',`<p>Playwright Test łączy runner testów, asercje web-first, izolację, zrównoleglenie i narzędzia. Uruchamia Chromium, WebKit i Firefox na Windows, Linux i macOS — w trybie headless lub z interfejsem — z emulacją urządzeń mobilnych.</p><p class="empty" style="font-size:14px">Najnowsza wersja w chwili pisania: Playwright 1.63.0 (4 września 2026). Sprawdź release notes, zanim skopiujesz przykłady zależne od wersji.</p>`],
  ['Instalacja i uruchamianie',`${P(0)}
<p>Wygenerowany szkielet: <code class="i">playwright.config.ts</code>, <code class="i">package.json</code>, <code class="i">tests/example.spec.ts</code>.</p>`],
  ['Kluczowe pojęcia',T(['Pojęcie','Dlaczego ważne'],[
   ['Lokatory','Niezawodnie znajdują elementy do interakcji i asercji'],['Asercje web-first','Asercje czekające na stan aplikacji'],['Fixtures','Wielokrotnego użytku przygotowanie/sprzątanie i wstrzykiwane zależności'],
   ['Konteksty przeglądarki','Izolowane sesje — podstawa izolacji testów'],['Projekty','Kombinacje przeglądarek / urządzeń / konfiguracji'],['Równoległość','Uruchamianie testów jednocześnie, gdzie to bezpieczne'],
   ['Ponowienia (retries)','Ponowne uruchamianie błędów według polityki — nigdy po to, by ukryć niestabilność'],['Trace Viewer','Krok po kroku dowody wykonania do debugowania'],['Reporter HTML','Testy zaliczone, nieudane, pominięte i niestabilne z załącznikami'],
   ['Testowanie API','Sprawdzenia HTTP obok ścieżek UI'],['Mockowanie sieci','Kontrola lub symulacja zachowania sieci'],['Codegen','Generuje kod startowy — zrefaktoryzuj go, zanim go zachowasz']])],
  ['playwright.config.ts linia po linii',`<p>To blisko tego, co generuje <code class="i">npm init playwright@latest</code>, z dodanymi najbardziej przydatnymi opcjami:</p>
${P(0)}
 ${CO('tip','Wskazówka','Wszystko w use można nadpisać dla projektu. Projekt „mobilny” z devices[\'Pixel 7\'] uruchamia te same testy z mobilnym viewportem i user agentem.')}`],
  ['Lokatory w kolejności priorytetu',`${T(['Lokator','Do czego'],[
  ['getByRole(role, { name })','Prawie wszystko interaktywne: przyciski, linki, nagłówki, checkboxy. Pierwszy wybór.'],
  ['getByLabel(text)','Pola formularzy z etykietą'],
  ['getByPlaceholder(text)','Pola bez etykiety (i poproś o etykietę — to defekt dostępności)'],
  ['getByText(text)','Nieinteraktywna treść tekstowa'],
  ['getByAltText / getByTitle','Obrazy i elementy z atrybutem title'],
  ['getByTestId(id)','Gdy nic widocznego dla użytkownika nie jest stabilne; domyślnie używa data-testid'],
  ['locator(css lub xpath)','Ostateczność — związany ze szczegółami implementacji']])}
 ${P(0)}
 ${CO('note','Kluczowa myśl','Lokatory są ścisłe: jeśli pasują do kilku elementów, akcja rzuca błąd zamiast zgadywać. Niejednoznaczny selektor staje się jasnym błędem, a nie niestabilnym kliknięciem w zły wiersz.')}`],
  ['Anatomia testu',`${P(0)}
 ${UL(['<b>test.describe</b> grupuje testy; hooki w środku dotyczą tylko tej grupy.','<b>test.step</b> nazywa blok, by w raporcie i śladzie był widoczny jako jeden krok.','<b>Tagi</b> takie jak @smoke pozwalają uruchomić podzbiór: <code class="i">npx playwright test --grep @smoke</code>.','Przydatne flagi do debugowania: <code class="i">--debug</code> (Inspector), <code class="i">--last-failed</code>, <code class="i">--repeat-each=20</code>, by wyłapać niestabilność.'])}`],
  ['Mocne strony',UL(['Szerokie pokrycie silników przeglądarek','Zintegrowany runner i narzędzia','Izolowane testy i równoległe wykonanie','Mocne dowody: ślady, zrzuty ekranu, wideo, raporty','Testowanie UI i API w jednym narzędziu','Dobre dopasowanie do projektów QA w TypeScript'])],
  ['Na co uważać',UL(['Wygenerowane testy stają się kruche, jeśli przyjmie się je bez refaktoryzacji','Równoległe testy kolidują przez wspólne konta, dane lub środowiska','Ponowienia ukrywają niestabilność, jeśli patrzysz tylko na końcowy wynik','Binaria przeglądarek i zależności CI trzeba wersjonować','Za dużo testów E2E daje wolne zestawy'])+CO('tip','Wskazówka','Traktuj wynik Codegen jako szkic: zamień kruche selektory na lokatory oparte na roli lub etykiecie i wydziel powtarzające się kroki do fixtures lub page objects.')],
 ],
 quiz:[
  ['Która funkcja Playwright jest podstawą izolacji testów?',['Codegen','Konteksty przeglądarki','Reporter HTML','Projekty'],'Każdy test dostaje własny kontekst przeglądarki — świeżą, izolowaną sesję z osobnymi ciasteczkami i magazynem.'],
  ['Zestaw jest zielony, ale raport HTML pokazuje 14 testów zaliczonych dopiero po ponowieniu. Co to znaczy?',['Wszystko w porządku','Masz niestabilne testy ukryte przez ponowienia','Trzeba zwiększyć ponowienia','Raport jest błędny'],'Zaliczenie po ponowieniu to sygnał niestabilności. Śledź ponowienia oddzielnie od prawdziwych zaliczeń i badaj je.'],
  ['Które polecenie otwiera interaktywny tryb UI?',['npx playwright show-report','npx playwright test --headed','npx playwright test --ui','npm init playwright@latest'],'--ui otwiera tryb UI do interaktywnego uruchamiania, obserwowania i debugowania testów.'],
  ['Który lokator jest najmniej kruchy dla przycisku „Submit”?',['page.locator(\'div > div:nth-child(3) > button\')','page.getByRole(\'button\', { name: \'Submit\' })','page.locator(\'.btn-x7f2\')','XPath po ścieżce bezwzględnej'],'Lokatory oparte na roli i nazwie odpowiadają temu, co widzi użytkownik, i przetrwają zmiany układu i klas.'],
  ['Co robi forbidOnly: !!process.env.CI?',['Uruchamia w CI tylko jeden test','Oblewa przebieg CI, jeśli w kodzie zostało test.only','Wyłącza ponowienia','Zabrania równoległości'],'Zapobiega temu, by przypadkowe test.only po cichu pominęło resztę zestawu w CI.'],
  ['Który lokator Playwright zaleca próbować najpierw?',['getByTestId','locator(css)','getByRole','XPath'],'Lokatory oparte na roli odzwierciedlają, jak stronę postrzegają użytkownicy i technologie wspomagające.'],
  ['Lokator pasuje do trzech przycisków i wywołujesz .click(). Co się stanie?',['Kliknie pierwszy','Kliknie wszystkie trzy','Rzuci błąd naruszenia ścisłości (strictness violation)','Będzie czekać w nieskończoność'],'Lokatory są ścisłe; niejednoznaczne dopasowania rzucają błąd zamiast zgadywać.'],
  ['Które polecenie uruchamia tylko testy oznaczone @smoke?',['npx playwright test --project=smoke','npx playwright test --grep @smoke','npx playwright smoke','npx playwright test --tag smoke'],'Tagi dopasowuje się przez --grep (i wyklucza przez --grep-invert).'],
 ]},

'playwright-fixtures':{title:'Fixtures w Playwright dogłębnie',
 sum:'Fixtures to sposób, w jaki Playwright daje każdemu testowi dokładnie to, czego potrzebuje — przygotowane przed, posprzątane po, domyślnie izolowane.',
 sections:[
  ['Czego się nauczysz',UL(['Pisać własne fixtures o zakresie testu i workera z przygotowaniem i sprzątaniem','Bezpiecznie ponownie używać sesji logowania przez storageState','Używać fixtures auto i option oraz łączyć zestawy fixtures'])],
  ['Dlaczego fixtures zamiast beforeEach',`<p>Fixture to nazwana zależność, o którą test prosi w swoich argumentach. Playwright tworzy ją tylko wtedy, gdy test jej potrzebuje, przekazuje ją i sprząta po wszystkim. W porównaniu z hookami <code class="i">beforeEach</code> fixtures są <b>tworzone na żądanie</b>, <b>składalne</b> (jedna fixture może używać innej), <b>hermetyzowane</b> (przygotowanie i sprzątanie razem) i <b>typowane</b>.</p>
   ${T(['Wbudowana fixture','Co dostajesz'],[['page','Nową stronę w nowym kontekście przeglądarki, dla każdego testu'],['context','Izolowany kontekst przeglądarki stojący za page'],['browser','Wspólną instancję przeglądarki (zakres workera)'],['browserName','chromium, firefox lub webkit — przydatne do logiki warunkowej'],['request','APIRequestContext do wywołań HTTP']])}`],
  ['Pisanie własnej fixture',`<p>Rozszerz bazowy <code class="i">test</code>. Kod przed <code class="i">use()</code> to przygotowanie; kod po nim to sprzątanie, które działa nawet wtedy, gdy test się nie powiedzie.</p>
${P(0)}
${P(1)}
${CO('note','Kluczowa myśl','Test nigdzie nie wspomina, jak użytkownik jest tworzony ani usuwany. Fixtures wynoszą mechanikę z testów — ten sam cel co Page Objects, zastosowany do przygotowania i danych.')}`],
  ['Zakres testu a zakres workera',`${T(['Zakres','Tworzona','Do czego'],[['test (domyślnie)','Raz na test, sprzątana po nim','Strony, dane testu, wszystko, co zmienne'],['worker','Raz na proces workera, wspólna dla jego testów','Kosztowne zasoby tylko do odczytu: przygotowane konto na workera, połączenie z BD, uruchomiona usługa']])}
${P(0)}
${CO('risk','Ryzyko','Fixture o zakresie workera jest wspólna dla wszystkich testów tego workera. Jeśli testy ją modyfikują, odtworzyłeś współdzielony stan — główną przyczynę niestabilności zależnej od kolejności. Trzymaj fixtures workera tylko do odczytu albo je resetuj.')}`],
  ['Fixtures automatyczne i opcje',UL(['<b>Fixtures auto</b> — <code class="i">[fn, { auto: true }]</code> działają dla każdego testu bez żądania. Dobre do dołączania logów przy błędzie lub sprawdzania błędów w konsoli.','<b>Fixtures option</b> — <code class="i">[defaultValue, { option: true }]</code> można nadpisać dla projektu w <code class="i">playwright.config.ts</code>.','<b>Nadpisywanie wbudowanych</b> — możesz nadpisać nawet <code class="i">page</code>, np. by najpierw przechodzić na trasę bazową.','<b>Łączenie zestawów</b> — <code class="i">mergeTests()</code> i <code class="i">mergeExpects()</code> (od v1.39) łączą zestawy fixtures i asercji z różnych modułów.','<b>Tożsamość równoległa</b> — <code class="i">workerIndex</code> i <code class="i">parallelIndex</code> są dostępne w TestInfo i WorkerInfo; używaj ich jako klucza dla danych workera.'])],
  ['Uwierzytelnianie przez storageState',`<p>Logowanie przez UI w każdym teście jest wolne i dodaje niestabilności. Zaloguj się raz w projekcie setup, zapisz sesję i używaj jej ponownie:</p>
${P(0)}
${CO('risk','Ryzyko','Zapisany plik stanu zawiera żywe ciasteczka sesji. Dodaj playwright/.auth do .gitignore, nigdy nie wysyłaj go jako artefaktu CI i czytaj dane logowania ze zmiennych środowiskowych lub magazynu sekretów.')}
${CO('tip','Wskazówka','Zachowaj co najmniej jeden test logujący się przez prawdziwe UI — storageState pomija ścieżkę logowania, więc coś nadal musi ją pokrywać.')}<p>Istnieje też wariant tylko przez API: zaloguj się przez <code class="i">request.post(...)</code>, a potem zapisz przez <code class="i">request.storageState({ path })</code>.</p>`],
  ['Lista kontrolna projektowania fixtures',UL(['Czy każda fixture robi jedną rzecz, z przygotowaniem i sprzątaniem razem?','Czy zmienne dane mają zakres testu i są unikalne dla każdego testu?','Czy fixtures workera są tylko do odczytu lub kluczowane przez workerIndex?','Czy sprzątanie działa poprawnie, gdy test padnie w połowie?','Czy sekrety są czytane ze środowiska, a nie zapisane na sztywno?','Czy nowy inżynier zrozumie test bez otwierania fixture?'])],
 ],
 quiz:[
  ['Kiedy w własnej fixture wykonuje się kod umieszczony po await use(value)?',['Przed testem','Po zakończeniu testu — nawet jeśli się nie powiódł','Tylko jeśli test przeszedł','Nigdy'],'Wszystko po use() to sprzątanie, wykonywane niezależnie od wyniku testu.'],
  ['Potrzebujesz jednego kosztownego, przygotowanego konta tylko do odczytu na każdego równoległego workera. Jaki zakres?',['test','worker','zmienna globalna','beforeAll w każdym pliku'],'Zakres workera tworzy je raz na proces; klucz workerIndex zapobiega kolizjom między workerami.'],
  ['Testy dzielą fixture koszyka o zakresie workera i każdy dodaje produkty. Co się stanie?',['Nic — fixtures są zawsze izolowane','Wyniki zależne od kolejności i niestabilne, bo testy modyfikują wspólny stan','Szybsze, bardziej niezawodne testy','Playwright rzuci błąd'],'Fixtures workera są wspólne dla testów w tym workerze. Zmienne dane należą do zakresu testu.'],
  ['Jaka jest główna korzyść uwierzytelniania przez storageState?',['Dokładniej testuje stronę logowania','Unika logowania przez UI w każdym teście, więc testy są szybsze i mniej niestabilne','Szyfruje hasła','Zastępuje testy autoryzacji'],'Zaloguj się raz, używaj sesji ponownie. Zachowaj osobny test prawdziwej ścieżki logowania.'],
  ['Gdzie powinien trafić plik playwright/.auth/user.json?',['Do gita dla wygody','Jako artefakt CI','Do .gitignore i nigdzie nie publikowany — zawiera żywe ciasteczka sesji','Do README'],'To w praktyce dane uwierzytelniające. Traktuj go jak sekret.'],
  ['Która opcja fixture sprawia, że działa ona dla każdego testu bez żądania?',['{ scope: "worker" }','{ auto: true }','{ option: true }','{ timeout: 0 }'],'Fixtures z auto: true działają dla każdego testu — przydatne do logowania lub sprawdzania błędów konsoli.'],
  ['Która funkcja łączy zestawy fixtures zdefiniowane w różnych modułach?',['combineFixtures()','mergeTests()','test.extend.all()','useFixtures()'],'mergeTests() scala kilka rozszerzonych obiektów test w jeden.'],
 ]},

'cypress':{title:'Cypress',
 sum:'Platforma jakości skupiona na przeglądarce: testy E2E i komponentów z mocnym lokalnym modelem debugowania oraz opcjonalnymi płatnymi funkcjami chmurowymi.',
 sections:[
  ['Czego się nauczysz',UL(['Wyjaśniać kolejkę poleceń Cypress i ponawialność (retry-ability)','Pisać test, który czeka na przechwycone żądanie zamiast na timer','Buforować logowanie przez cy.session() i wybierać stabilne selektory data-cy','Wiedzieć, które zmiany w Cypress 16 mogą zepsuć istniejący zestaw'])],
  ['Czym jest',`<p>Cypress przedstawia się jako platforma jakości dla nowoczesnych aplikacji webowych: testy end-to-end, testy komponentów, sprawdzanie dostępności i funkcje związane z pokryciem. Lokalnie instalowana <b>aplikacja Cypress jest open source</b>; <b>Cypress Cloud</b> dodaje hostowane nagrywanie, analitykę i orkiestrację.</p>`],
  ['Możliwości',UL(['Testy end-to-end w przeglądarce','Testy komponentów w prawdziwej przeglądarce','Sprawdzanie dostępności','Przechwytywanie i kontrola sieci','Szpiedzy, stuby i zegary','Testy wizualne','Wykonanie w wielu przeglądarkach z obsługiwanych rodzin','Zrzuty ekranu, wideo i raportowanie','Integracja z CI'])],
  ['Jak debugujesz w Cypress',UL(['<b>Command Log</b> i migawki „podróży w czasie” pokazują stan aplikacji wokół każdego polecenia','<b>Automatyczne czekanie</b> zmniejsza potrzebę arbitralnych pauz','Czytelne błędy plus DevTools przeglądarki','<b>Stubowanie sieci</b> odtwarza przypadki brzegowe bez prawdziwych warunków backendu'])],
  ['Kolejka poleceń i ponawialność',`<p>Polecenia Cypress nie wykonują się w chwili wywołania. Są <b>kolejkowane</b> i wykonywane później po kolei, więc nie możesz przypisać ich wyniku do zmiennej jak przy <code class="i">await</code>. Używaj <code class="i">.then()</code>, aliasów lub asercji.</p>
 ${UL(['<b>Zapytania</b> takie jak <code class="i">cy.get()</code>, <code class="i">.find()</code> i <code class="i">cy.contains()</code> są ponawiane razem z dołączonymi asercjami, aż przejdą lub minie limit czasu (domyślnie 4 s).','<b>Akcje</b> takie jak <code class="i">.click()</code> i <code class="i">.type()</code> nie są ponawiane, choć Cypress najpierw czeka, aż element będzie gotowy do akcji.','Umieszczaj asercję zaraz po zapytaniu, od którego zależy, by ponawianie obejmowało cały łańcuch.'])}
${P(0)}`],
  ['Struktura projektu i dobre nawyki',`${P(0)}
 ${UL(['Wybieraj elementy przez dedykowane atrybuty, takie jak <code class="i">data-cy</code>, które przewodnik dobrych praktyk Cypress zaleca zamiast klas lub tekstu zmieniających się wraz ze stylami.','Loguj się raz na specyfikację przez <code class="i">cy.session()</code>, które buforuje ciasteczka i magazyn oraz przywraca je przy kolejnych wywołaniach.','Ustawiaj stan przez API lub <code class="i">cy.task()</code>, zamiast przeklikiwać się przez UI.','Nie używaj <code class="i">cy.wait(5000)</code>. Czekaj na żądanie z aliasem lub na asercję.','Utrzymuj testy niezależne: każdy test powinien móc działać samodzielnie.'])}`],
  ['Cypress Cloud',`<p>Funkcje chmurowe to m.in. odtwarzanie testów, zarządzanie niestabilnymi testami, przegląd gałęzi, orkiestracja, integracje i analityka. Niektóre zaawansowane funkcje dostępności i pokrycia UI są produktami premium. Według przewodnika dokumentacja Cypress opisuje Cypress 16 jako aktualny — przed wdrożeniem sprawdź dostępność funkcji i ceny w bieżącej dokumentacji.</p>`],
  ['Co zmieniło się w Cypress 16 (wrzesień 2026)',`${UL([
 'Cypress <b>16.0.0</b> wydano 1 września 2026; 16.1.0 — 15 września 2026.',
 'W Chrome, Chromium i Edge ruch testowy idzie teraz przez własny stos sieciowy przeglądarki zamiast przez proxy Cypress — sprawdź ponownie zestawy mocno oparte na <code class="i">cy.intercept()</code>.',
 'Wymagany jest Node 22, 24 lub 26+ (20 i 25 wycofano).',
 '<code class="i">Cypress.env()</code> zastąpiono przez <code class="i">Cypress.expose()</code> i <code class="i">cy.env()</code>; <code class="i">cy.exec()</code> usunięto — użyj <code class="i">cy.task()</code>. <code class="i">cy.end()</code> usunięto.',
 'Electron jako przeglądarka testowa jest przestarzały.',
 'Przypomnienie: <code class="i">cy.request()</code> wykonuje prawdziwe wywołanie HTTP i omija <code class="i">cy.intercept()</code>.'])}
 ${CO('tip','Wskazówka','Przed aktualizacją prawdziwego zestawu przeczytaj listę zmian niekompatybilnych w changelogu i najpierw uruchom zestaw na osobnej gałęzi.')}`],
  ['Na co uważać',UL(['Oddziel to, co darmowe i lokalne, od płatnej chmury','Oceń architekturę przeglądarki i zachowanie cross-origin względem swojej aplikacji','Nadmierne stubowanie obniża pewność, że prawdziwa integracja działa','Automatyczne czekanie nie naprawia problemów synchronizacji w samej aplikacji','Nagrywanie w chmurze może przechwycić wrażliwe dane testowe'])+CO('risk','Ryzyko','Nagrane przebiegi, zrzuty ekranu i wideo wysłane do usługi hostowanej mogą zawierać dane osobowe lub dane klientów. Sprawdź, co przechwytujesz, zanim włączysz nagrywanie w chmurze.')],
 ],
 quiz:[
  ['Które stwierdzenie o Cypress jest prawdziwe?',['Wszystko, łącznie z orkiestracją i analityką, jest open source','Lokalna aplikacja Cypress jest open source; Cypress Cloud dodaje płatne funkcje hostowane','Cypress obsługuje tylko testy komponentów','Cypress wymaga Selenium Grid'],'Przewodnik podkreśla oddzielenie otwartej aplikacji lokalnej od płatnej chmury i funkcji premium.'],
  ['Stubujesz każdą odpowiedź API w zestawie E2E. Jakie jest główne ryzyko?',['Testy będą wolniejsze','Tracisz pewność, że prawdziwa integracja frontend–backend działa','Cypress przestanie automatycznie czekać','Zrzuty ekranu przestaną działać'],'Stuby świetnie sprawdzają się w przypadkach brzegowych, ale w pełni ostubowany zestaw nigdy nie sprawdza prawdziwej integracji.'],
  ['Która funkcja Cypress pozwala obejrzeć stan aplikacji przed i po każdym poleceniu?',['Analityka Cypress Cloud','Migawki „podróży w czasie” w Command Log','Selenium Grid','Przegląd gałęzi'],'Command Log z migawkami to serce lokalnego modelu debugowania Cypress.'],
  ['Automatyczne czekanie jest włączone, a test nadal pada, bo zapis kończy się po następnej nawigacji. Co jest prawdą?',['Cypress jest zepsuty','Automatyczne czekanie nie naprawia prawdziwych problemów synchronizacji aplikacji','Dodaj cy.wait(10000)','Wyłącz ponowienia'],'Automatyczne czekanie ponawia polecenia i asercje; nie naprawi wyścigu wewnątrz aplikacji. Sprawdzaj prawdziwy sygnał ukończenia (np. przechwycone żądanie lub komunikat „Zapisano”).'],
  ['Dlaczego nie możesz napisać const text = cy.get(".name").text()?',['cy.get jest przestarzałe','Polecenia Cypress są kolejkowane i wykonywane później — użyj .then() lub asercji','Tekst jest zawsze pusty','Działa to tylko w Cloud'],'Polecenia kolejkują pracę; ich wyniki są dostępne przez łańcuchowanie, nie przez wartości zwracane.'],
  ['Które polecenia Cypress są ponawiane, aż asercje przejdą?',['Akcje takie jak .click()','Zapytania takie jak cy.get() i .find() wraz z ich asercjami','cy.request()','Żadne'],'Zapytania są ponawiane razem z asercjami dołączonymi po nich.'],
  ['Co robi cy.session()?',['Uruchamia Cypress Cloud','Buforuje i przywraca ciasteczka oraz magazyn, np. by ponownie użyć logowania','Nagrywa wideo','Resetuje bazę danych'],'Buforuje stan sesji, więc logowanie działa raz, a potem jest przywracane.'],
  ['Jaki selektor zaleca przewodnik dobrych praktyk Cypress?',['.btn.btn-primary','Dedykowany atrybut, np. [data-cy=save]','#root > div:nth-child(2)','Zawsze tylko tekst przycisku'],'Dedykowane atrybuty testowe są odporne na zmiany stylów i struktury.'],
 ]},

'selenium':{title:'Selenium',
 sum:'Projekt parasolowy — WebDriver, IDE i Grid — do opartej na standardach automatyzacji przeglądarek w wielu językach i na wielu maszynach.',
 sections:[
  ['Czego się nauczysz',UL(['Opisywać architekturę WebDriver i rolę Grid','Pisać jawne oczekiwania w Javie i Pythonie — i wiedzieć, czemu nie mieszać ich z niejawnymi','Wybierać runner dla swojego języka i budować framework wokół WebDriver'])],
  ['Ekosystem',T(['Komponent','Cel'],[['WebDriver','Programowa automatyzacja przeglądarki przez niezależne od języka API / protokół'],['Selenium IDE','Nagrywanie i odtwarzanie w przeglądarce oraz wsparcie w tworzeniu testów'],['Selenium Grid','Zdalne i równoległe wykonanie na różnych maszynach, przeglądarkach i platformach']])],
  ['Architektura WebDriver',`<div class="layers"><div><b>Twój test (wiązanie klienckie)</b><span>Java, Python, C#, JS…</span></div><div><b>Protokół WebDriver</b><span>polecenia niezależne od języka</span></div><div><b>Sterownik przeglądarki</b><span>specyficzny dla przeglądarki</span></div><div class="sut"><b>Przeglądarka</b><span>Chrome, Firefox, Edge, Safari</span></div></div>
   <p>Ponieważ klient i sterownik konkretnej przeglądarki są rozdzielone, Selenium działa z głównymi przeglądarkami bez osadzania kodu automatyzacji w aplikacji.</p>`],
  ['Konfiguracja',OL(['Zainstaluj wiązanie dla swojego języka','Zainstaluj docelową przeglądarkę lub uzyskaj do niej dostęp','Zarządzaj sterownikami — Selenium Manager może to zautomatyzować w obsługiwanych konfiguracjach','Twórz sesje WebDriver','Dodaj runner testów dla swojego języka','Dodaj asercje, fixtures, raportowanie i CI wokół warstwy przeglądarki'])+CO('note','Kluczowa myśl','W Selenium framework wokół warstwy przeglądarki to Twoja odpowiedzialność: runner, asercje, fixtures, raportowanie, dane, konfiguracja i konwencje.')],
  ['Właściwe czekanie',`<p>Selenium nie czeka automatycznie tak jak Playwright i Cypress, więc to synchronizacja najczęściej psuje zestawy Selenium. Używaj <b>jawnych oczekiwań</b>, które odpytują warunek aż do limitu czasu.</p>
${P(0)}
 ${CO('risk','Ryzyko','Dokumentacja Selenium ostrzega przed mieszaniem oczekiwań niejawnych i jawnych: może to powodować nieprzewidywalne czasy oczekiwania. Wybierz jawne oczekiwania, a niejawne zostaw na zero.')}`],
  ['Budowanie frameworku wokół WebDriver',`${T(['Język','Typowy runner','Typowe dodatki'],[
  ['Java','JUnit 5 lub TestNG','AssertJ, raporty Allure, Maven/Gradle'],
  ['Python','pytest','fixtures pytest, pytest-xdist do równoległych przebiegów, pytest-html'],
  ['C#','NUnit lub xUnit','FluentAssertions, dotnet test'],
  ['JavaScript','Mocha lub Jest (albo WebdriverIO, który opakowuje WebDriver)','Chai, dowolne reportery']])}
 ${UL(['<b>Fabryka sterowników</b> tworzy lokalne lub zdalne (Grid) sesje na podstawie konfiguracji.','<b>Page Objects</b> posiadają lokatory i oczekiwania — sama dokumentacja Selenium je zaleca.','Zawsze zamykaj sterownik w sprzątaniu, nawet gdy test pada, inaczej węzły Grid zapełnią się osieroconymi sesjami.','Przy błędzie zapisuj zrzut ekranu i źródło strony: Selenium nie ma trace viewera, więc to są Twoje dowody.'])}`],
  ['Selenium Grid',`<p>Grid kieruje skrypty WebDriver do zdalnych instancji przeglądarek w celu równoległego, wielowersyjnego i wieloplatformowego testowania. Prosty samodzielny Grid udostępnia lokalny punkt końcowy:</p>
${P(0)}`],
  ['Stan obecny (wrzesień 2026)',UL([
 'Najnowsze wydanie: <b>Selenium 4.49.0</b> (9 września 2026).',
 '<b>Selenium Manager</b> jest dostarczany od 4.6 i zarządza przeglądarkami od 4.11 — nadal ma status <b>beta</b>.',
 '<b>WebDriver BiDi</b>: Selenium przenosi implementację z WebDriver Classic na protokół W3C BiDi; obsługa CDP jest opisana jako tymczasowa, do czasu ukończenia BiDi.'])],
  ['Mocne strony i na co uważać',`<h3>Mocne strony</h3>${UL(['Dojrzały ekosystem, szerokie wsparcie języków i przeglądarek','Ustandaryzowany model WebDriver','Mocna historia zdalnego wykonania i Grid','Pasuje do organizacji z istniejącą infrastrukturą Selenium'])}<h3>Na co uważać</h3>${UL(['Zła strategia synchronizacji daje niestabilne testy','Duże zdalne gridy dodają złożoności infrastruktury i obserwowalności','Źle zaprojektowana warstwa Page Object staje się wąskim gardłem utrzymania'])}`],
 ],
 quiz:[
  ['Który komponent Selenium obsługuje równoległe wykonanie na wielu maszynach?',['Selenium IDE','WebDriver','Selenium Grid','Selenium Manager'],'Grid kieruje sesje WebDriver do zdalnych węzłów przeglądarek dla przebiegów równoległych i wieloplatformowych.'],
  ['Co, w porównaniu z Playwright, Selenium zwykle zostawia Tobie?',['Komunikację z przeglądarką','Runner testów, asercje, fixtures i raportowanie','Obsługę wielu języków','Uruchamianie w Chrome'],'Selenium koncentruje się na automatyzacji przeglądarki; otaczający framework składasz sam.'],
  ['W czym pomaga Selenium Manager?',['W pisaniu asercji','W automatyzacji konfiguracji sterownika przeglądarki w obsługiwanych konfiguracjach','W generowaniu raportów','W testach obciążeniowych'],'Selenium Manager potrafi automatycznie pobrać i skonfigurować właściwy sterownik dla przeglądarki.'],
  ['Zestaw Selenium wszędzie używa Thread.sleep(5000). Najbardziej prawdopodobny skutek?',['Szybsze, stabilne testy','Wolne i nadal niestabilne testy — użyj jawnych oczekiwań na warunki','Lepsze pokrycie przeglądarek','Nic'],'Stałe pauzy marnują czas, gdy aplikacja jest szybka, i zawodzą, gdy jest wolna. Czekaj na warunek.'],
  ['Co dokumentacja Selenium mówi o mieszaniu oczekiwań niejawnych i jawnych?',['Zawsze je mieszaj','Nie rób tego — może to powodować nieprzewidywalne czasy oczekiwania','Niejawne oczekiwania są wymagane dla Grid','Jawne oczekiwania są przestarzałe'],'Używaj jawnych oczekiwań, a niejawne zostaw na zero.'],
  ['Zespół Selenium w Pythonie chce równoległych przebiegów. Jaki dodatek do runnera jest typowy?',['pytest-xdist','JUnit 5','NUnit','Mocha'],'pytest-xdist rozdziela testy pytest między procesy.'],
 ]},

'compare-tools':{title:'Porównanie trzech narzędzi',
 sum:'Porównanie możliwości, a nie ranking — wybieraj według architektury, przeglądarek, umiejętności zespołu, CI, potrzeb debugowania i kosztu utrzymania.',
 sections:[
  ['Czego się nauczysz',UL(['Porównywać trzy narzędzia pod względem modelu, przeglądarek, języków i debugowania','Uwzględniać ograniczenia zespołu, infrastruktury i zgodności przy wyborze narzędzia','Planować migrację między narzędziami bez utraty pokrycia'])],
  ['Porównanie możliwości',T(['Obszar','Playwright','Cypress','Selenium'],[
   ['Model podstawowy','Zintegrowany framework E2E','Platforma jakości skupiona na przeglądarce','Ekosystem automatyzacji przeglądarek'],
   ['Przeglądarki','Chromium, Firefox, WebKit','Rodzina Chrome, Firefox i obsługiwane przeglądarki','Główne przeglądarki przez WebDriver'],
   ['Runner','Zintegrowany Playwright Test','Zintegrowany runner / aplikacja','Zwykle zewnętrzny runner'],
   ['Testowanie API','Obsługiwane','Obsługiwane','Zwykle dodawane przez biblioteki'],
   ['Testy komponentów','Obsługiwane','Mocny proces','Przez otaczający ekosystem'],
   ['Dostępność','Przez narzędzia / integracje','Dedykowane możliwości','Wymaga narzędzi z ekosystemu'],
   ['Równoległość','Wbudowana, konfigurowalna','Obsługiwana; Cloud dodaje orkiestrację','Grid / runner / infrastruktura'],
   ['Zdalne wykonanie','Przez infrastrukturę','Procesy CI / chmurowe','Mocny model Grid'],
   ['Debugowanie','Trace Viewer, tryb UI, raporty','Migawki „podróży w czasie”, DevTools','Zależy od frameworku / narzędzi'],
   ['Najlepiej pasuje do','Nowoczesny web E2E, wiele przeglądarek','Zespoły front-endowe chcące zintegrowanego testowania w przeglądarce','Ekosystem WebDriver / zdalny grid']])],
  ['Języki i ekosystemy',T(['','Playwright','Cypress','Selenium'],[
  ['Oficjalne języki','TypeScript/JavaScript, Python, Java, .NET','JavaScript/TypeScript','Java, Python, C#, Ruby, JavaScript'],
  ['Urządzenia mobilne','Emulacja mobilna (viewport, dotyk, user agent)','Emulacja rozmiaru okna','Prawdziwe urządzenia przez Appium (protokół WebDriver)'],
  ['Wiele kart / domen','Obsługiwane','Ograniczone; cy.origin() dla innych domen','Obsługiwane'],
  ['Licencja','Apache-2.0','MIT (aplikacja); Cloud jest komercyjny','Apache-2.0']])],
  ['Decyduj w kontekście',`<p>Weź pod uwagę: architekturę aplikacji, wymagane przeglądarki, język i umiejętności zespołu, infrastrukturę CI, potrzeby debugowania, rodzaje testów, ograniczenia zgodności i koszt utrzymania.</p>`+CO('tip','Wskazówka','Wypróbuj <a href="#picker">wybór narzędzia</a>, by zobaczyć, jak Twoje ograniczenia zmieniają bilans.')],
  ['Migracja między narzędziami',OL(['Zinwentaryzuj obecny zestaw: które testy dają realne pokrycie ryzyka, które są zbędne, które zawsze są niestabilne?','Migruj według <b>wartości</b>, a nie plik po pliku. Zacznij od smoke i krytycznych ścieżek.','Przez pewien czas uruchamiaj stary i nowy zestaw równolegle i porównuj, co łapią.','Przenoś idee frameworku (dane, fixtures, page objects), a nie składnię linia po linii.','Wycofuj stare testy dopiero wtedy, gdy ich pokrycie istnieje w nowym zestawie.','Aktualizuj dokumentację, CI i odpowiedzialność w ramach migracji, a nie potem.'])+CO('risk','Ryzyko','Migracja przenosząca każdy test bez zmian przenosi też każdą słabą asercję i niestabilny wzorzec. Wykorzystaj ją jako okazję do usunięcia testów, które nie dają informacji.')],
 ],
 quiz:[
  ['Musisz uruchamiać testy w WebKit (silnik Safari) na Linuksie w CI. Czyj wbudowany zestaw przeglądarek pokrywa to najbardziej bezpośrednio?',['Playwright','Cypress','Selenium IDE','Żaden'],'Playwright dostarcza silniki Chromium, Firefox i WebKit i uruchamia je na Linux, Windows i macOS.'],
  ['Twoja firma ma duży istniejący grid i zespoły testowe w Javie. Co pasuje najnaturalniej?',['Playwright','Cypress','Selenium','Nowa platforma AI'],'Istniejąca infrastruktura Selenium i wiązania WebDriver to mocne powody, by zostać w tym ekosystemie.'],
  ['Które narzędzie zwykle potrzebuje zewnętrznego runnera testów?',['Playwright','Cypress','Selenium','Wszystkie trzy'],'Selenium zapewnia automatyzację przeglądarki; runner — JUnit, TestNG, pytest lub NUnit — dodajesz sam.'],
  ['Tabelę porównawczą z przewodnika najlepiej opisać jako…',['Ranking od najlepszego do najgorszego','Porównanie możliwości — wybór zależy od kontekstu','Tabelę cen','Benchmark wydajności'],'Przewodnik wprost mówi, że to porównanie możliwości, a nie ranking.'],
  ['Twój zespół pisze testy w C#. Które narzędzia mają oficjalne wsparcie .NET?',['Tylko Cypress','Playwright i Selenium','Cypress i Selenium','Żadne'],'Playwright ma wersję .NET, a Selenium wiązania C#; Cypress to tylko JavaScript/TypeScript.'],
  ['Jaka jest najlepsza kolejność migracji testów do nowego narzędzia?',['Alfabetycznie według plików','Według wartości: najpierw smoke i krytyczne ścieżki','Najpierw najnowsze','Wszystko naraz w jednym PR'],'Najpierw migruj najcenniejsze pokrycie i uruchamiaj stary i nowy zestaw równolegle.'],
 ]},

'api-testing':{title:'Testowanie API',
 sum:'Testuj reguły biznesowe, kontrakty i bezpieczeństwo na poziomie API — szybciej i stabilniej niż przez UI — i łącz to z testami UI.',
 sections:[
  ['Czego się nauczysz',UL(['Używać kodów statusu HTTP i semantyki metod jako wyroczni testowych','Pisać testy API oraz łączone testy API + UI w Playwright','Walidować odpowiedzi względem schematu i kontraktu konsumenta','Testować ryzyka OWASP API Top 10, zaczynając od BOLA'])],
  ['Dlaczego testować na poziomie API',`<p>Większość reguł biznesowych, walidacji i autoryzacji żyje za API. Testowanie tam jest szybkie, deterministyczne i przetrwa przeprojektowanie UI — to „najniższy poziom dający wystarczającą pewność” z modułu o strategii.</p>`],
  ['Podstawy HTTP',`${T(['Kod','Znaczenie','Typowy test'],[
   ['200 OK','Sukces z treścią','GET zwraca zasób'],['201 Created','Utworzono zasób','POST zwraca nowe id (często z nagłówkiem Location)'],['204 No Content','Sukces, pusta treść','DELETE się powiódł'],
   ['400 Bad Request','Błędnie sformułowane żądanie','Niepoprawny JSON, złe typy'],['401 Unauthorized','Brak / nieważne uwierzytelnienie','Brak tokenu, wygasły token'],['403 Forbidden','Uwierzytelniony, ale bez uprawnień','Użytkownik A sięga po zasób użytkownika B'],
   ['404 Not Found','Brak zasobu (także do ukrycia jego istnienia)','Nieznane id'],['409 Conflict','Konflikt z bieżącym stanem','Podwójna rejestracja'],['422 Unprocessable Content','Poprawna składnia, błędy semantyczne','Za krótkie hasło'],
   ['429 Too Many Requests','Przekroczony limit (RFC 6585)','Seria prób logowania'],['500 Internal Server Error','Nieobsłużony błąd serwera','Nie powinien być osiągalny przez dane wejściowe — zgłoś defekt'],['503 Service Unavailable','Tymczasowo niedostępny','Zależność nie działa / konserwacja']])}
   ${T(['Metoda','Bezpieczna','Idempotentna'],[['GET, HEAD, OPTIONS','Tak','Tak'],['PUT, DELETE','Nie','Tak'],['POST, PATCH','Nie','Nie z definicji']])}
   ${CO('note','Kluczowa myśl','Idempotentność oznacza, że powtórzenie tego samego żądania zostawia serwer w tym samym stanie. Sprawdź to: wyślij ten sam PUT lub DELETE dwa razy i zweryfikuj stan (oraz to, że ponowienia w Twoim kliencie są bezpieczne).')}`],
  ['Testy API w Playwright',`<p>Fixture <code class="i">request</code> to izolowany <code class="i">APIRequestContext</code>. Pobiera <code class="i">baseURL</code> i <code class="i">extraHTTPHeaders</code> z <code class="i">use</code> w konfiguracji.</p>
${P(0)}
<p>Inne przydatne elementy: <code class="i">request.get/put/patch/delete/fetch</code>, w odpowiedzi <code class="i">ok()</code> (200–299), <code class="i">status()</code>, <code class="i">headers()</code>, <code class="i">json()</code>; <code class="i">request.newContext({ baseURL, extraHTTPHeaders })</code> dla osobno skonfigurowanego klienta.</p>`],
  ['Łącz API i UI',`<p>Twórz dane przez API, a przez UI weryfikuj tylko to, co użytkownik musi zobaczyć — szybkie przygotowanie, skupione sprawdzenia UI:</p>
${P(0)}`],
  ['Kontrakty i schematy',UL(['<b>Testowanie kontraktowe</b> sprawdza każdą stronę integracji osobno względem wspólnego kontraktu. W <b>Pact</b> jest sterowane przez konsumenta: testy konsumenta generują kontrakt, a dostawca jest względem niego weryfikowany.','<b>Walidacja schematu</b> — sprawdzanie treści odpowiedzi względem JSON Schema (np. biblioteką walidatora taką jak Ajv) wcześnie wyłapuje brakujące pola i złe typy.','Kontrakty uzupełniają, a nie zastępują kilka testów end-to-end prawdziwej integracji.'])],
  ['Przykład walidacji schematu',`${P(0)}
 ${CO('tip','Wskazówka','additionalProperties: false zamienia schemat w małe sprawdzenie bezpieczeństwa: nowe pole, np. passwordHash, w odpowiedzi obleje test, zamiast niepostrzeżenie wyciec.')}`],
  ['Bezpieczeństwo API: OWASP API Top 10 (2023)',`${T(['ID','Ryzyko'],[['API1','Naruszona autoryzacja na poziomie obiektu (BOLA)'],['API2','Naruszone uwierzytelnianie'],['API3','Naruszona autoryzacja na poziomie właściwości obiektu'],['API4','Nieograniczone zużycie zasobów'],['API5','Naruszona autoryzacja na poziomie funkcji'],['API6','Nieograniczony dostęp do wrażliwych procesów biznesowych'],['API7','Fałszowanie żądań po stronie serwera (SSRF)'],['API8','Błędna konfiguracja zabezpieczeń'],['API9','Niewłaściwe zarządzanie inwentarzem'],['API10','Niebezpieczne korzystanie z zewnętrznych API']])}
${P(0)}
${CO('risk','Ryzyko','BOLA jest na 1. miejscu nie bez powodu: API wszędzie ujawniają identyfikatory obiektów. Każdy endpoint przyjmujący id potrzebuje negatywnego testu z innym użytkownikiem.')}`],
  ['Macierz testów dla jednego endpointu',T(['POST /api/contacts','Przykłady'],[['Pozytywne','Poprawny kontakt → 201, treść zgodna ze schematem, GET go zwraca'],['Negatywne','Brak nazwy → 400/422; brak tokenu → 401; id innego tenanta → 403/404'],['Graniczne','Nazwa o maksymalnej długości i max+1; pusty ciąg; Unicode'],['Idempotentność / stan','To samo żądanie dwa razy → obsługa duplikatu zgodnie ze specyfikacją'],['Bezpieczeństwo','Ciągi iniekcji zapisane i zwrócone bezpiecznie; limit → 429'],['Wydajność','Budżet czasu odpowiedzi; zbyt duży payload odrzucony']])],
 ],
 quiz:[
  ['Zalogowany użytkownik żąda zamówienia innego użytkownika i dostaje 200 z danymi. Które to ryzyko OWASP API?',['API4 Nieograniczone zużycie zasobów','API1 Naruszona autoryzacja na poziomie obiektu','API8 Błędna konfiguracja zabezpieczeń','API9 Niewłaściwe zarządzanie inwentarzem'],'Dostęp do obiektu innego użytkownika przez id to BOLA — ryzyko API nr 1.'],
  ['Która metoda jest idempotentna, ale nie bezpieczna?',['GET','POST','PUT','HEAD'],'PUT i DELETE są idempotentne (powtórzenie daje ten sam stan), ale zmieniają stan, więc nie są bezpieczne.'],
  ['Żądanie bez tokenu → jakiego statusu oczekujemy?',['401','403','404','500'],'401 oznacza brak lub nieważne uwierzytelnienie; 403 — uwierzytelniony, ale bez uprawnień.'],
  ['Co sprawdza expect(response).toBeOK() w Playwright?',['Status dokładnie 200','Status w zakresie 2xx','Treść jest poprawnym JSON','Żądanie trwało krócej niż 1 s'],'toBeOK przechodzi dla odpowiedzi 200–299.'],
  ['Kto generuje kontrakt w testowaniu kontraktowym sterowanym przez konsumenta (Pact)?',['Dostawca','Testy konsumenta','Architekt ręcznie','Brama API'],'Testy konsumenta tworzą kontrakt; dostawca jest względem niego weryfikowany.'],
  ['Niepoprawne dane wejściowe powodują, że API zwraca 500. Jaki jest właściwy wniosek?',['Oczekiwane — dane są niepoprawne','Defekt: niepoprawne dane powinny dostać 4xx, a nie nieobsłużony błąd serwera','Niestabilny test','Test powinien akceptować 500'],'5xx na dane od klienta oznacza nieobsłużone błędy — zgłoś defekt.'],
  ['Po co ustawiać additionalProperties: false w schemacie odpowiedzi?',['Szybsze parsowanie','Nieoczekiwane pole, np. passwordHash, obleje wtedy test','Wymaga tego JSON Schema','Aby dopuścić dowolne pole'],'To zamienia walidację schematu w sprawdzenie przeciw przypadkowemu ujawnieniu danych.'],
 ]},
});
