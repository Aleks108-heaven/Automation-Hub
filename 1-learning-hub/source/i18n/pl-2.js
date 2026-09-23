/* Polski — Inżynieria frameworków */
TR.pl=TR.pl||{modules:{}};
Object.assign(TR.pl.modules,{
'framework-architecture':{title:'Architektura frameworku i POM',
 sum:'Framework to więcej niż biblioteka testowa: warstwy, wspólne usługi, dane, raportowanie i wzorce, które utrzymują czytelność testów.',
 sections:[
  ['Czego się nauczysz',UL(['Opisywać pięć warstw frameworku automatyzacji testów','Stosować zasady projektowe: pojedyncza odpowiedzialność, testy DAMP, asercje w testach','Pisać skupiony Page Object w TypeScript'])],
  ['Model warstwowy',`<div class="layers">
   <div><b>Prezentacja / raportowanie</b><span>raporty HTML/JSON, pulpity, informacja zwrotna w CI</span></div>
   <div><b>Warstwa testów</b><span>zestawy smoke, regresyjne, API, E2E</span></div>
   <div><b>Warstwa biznesowa / domenowa</b><span>page objects, opakowania usług, przepływy</span></div>
   <div><b>Rdzeń frameworku</b><span>konfiguracja, fixtures, logowanie, fabryka przeglądarek</span></div>
   <div><b>Infrastruktura / środowisko</b><span>dane testowe, CI/CD, przeglądarki, kontenery, Grid</span></div>
   <div class="sut"><b>System testowany</b><span>Twoja aplikacja</span></div></div>
   <p>Każda warstwa zależy tylko od warstw pod nią. Testy wyrażają intencję; niższe warstwy odpowiadają za mechanikę.</p>`],
  ['Kluczowe komponenty',UL(['Menedżer konfiguracji','Fabryka przeglądarek / sterowników','Menedżer środowisk','Narzędzia uwierzytelniania / sesji','Menedżer danych testowych','Klient API / opakowania usług','Page Objects lub inne abstrakcje UI','Logowanie i raportowanie','Zbieranie zrzutów ekranu / śladów / wideo','Adaptery bazy danych lub usług zewnętrznych, gdzie potrzebne','Integracja z CI/CD'])],
  ['Page Object Model',`<p>Page Object reprezentuje stronę lub istotny komponent UI i hermetyzuje jego lokatory oraz typowe interakcje, dzięki czemu testy czyta się jak intencję biznesową, a nie mechanikę selektorów.</p>
${P(0)}`+CO('risk','Ryzyko','POM to wzorzec, a nie wymóg. Nie zamieniaj page objects w gigantyczne klasy zawierające każdą regułę biznesową i każdy możliwy przepływ.')],
  ['Zasady projektowania kodu testów',`${T(['Zasada','W kodzie testów'],[
  ['Pojedyncza odpowiedzialność','Page object modeluje jedną stronę lub komponent; fixture przygotowuje jedną rzecz'],
  ['DAMP ponad DRY w testach','Testy powinny być opisowymi i znaczącymi frazami (Descriptive And Meaningful Phrases). Trochę powtórzeń jest w porządku, jeśli każdy test czyta się samodzielnie; usuwaj duplikację w helperach, a nie w historii, którą opowiada test.'],
  ['Asercje w testach','Page objects udostępniają stan; testy decydują, co jest poprawne. Ukryte asercje utrudniają czytanie błędów.'],
  ['Jawne zamiast magii','Preferuj widoczne fixtures i parametry zamiast stanu globalnego i niejawnych hooków'],
  ['Kompozycja zamiast dziedziczenia','Głębokie hierarchie BasePage → AuthPage → AdminPage stają się kruche; składaj małe komponenty'],
  ['KISS','Każda abstrakcja musi na siebie zarobić. Jeśli nowy inżynier potrzebuje diagramu, by prześledzić jeden test, uprość.']])}`],
  ['Page Object w TypeScript',`${P(0)}
 ${CO('note','Kluczowa myśl','Udostępnienie lokatorów jako właściwości tylko do odczytu pozwala testom stosować na nich asercje web-first, bez tego, by page object decydował, co jest „poprawne”.')}`],
 ],
 quiz:[
  ['Gdzie powinien mieszkać helper tworzący przez API unikalnego użytkownika testowego?',['W każdym pliku testowym','W menedżerze danych testowych / warstwie usług','W reporterze HTML','W Page Object strony logowania'],'Tworzenie danych testowych to wspólna usługa frameworku, używana przez wiele testów i trzymana z dala od abstrakcji UI.'],
  ['Jaki jest główny cel Page Object?',['Przyspieszyć przeglądarkę','Hermetyzować lokatory i interakcje, by testy wyrażały intencję','Zastąpić asercje','Przechowywać dane testowe'],'Page Objects ukrywają mechanikę selektorów. Asercje zwykle zostają w teście, by intencja była widoczna.'],
  ['Która warstwa posiada fabrykę przeglądarek / sterowników?',['Warstwa testów','Warstwa biznesowa / domenowa','Rdzeń frameworku','Prezentacja'],'Wspólne usługi techniczne — konfiguracja, fixtures, logowanie, fabryka przeglądarek — należą do rdzenia frameworku.'],
  ['Klasa LoginPage urosła do 2000 linii z przepływami zamówienia i rozliczeń. Co jest nie tak?',['Nic, POM tego wymaga','Page Object stał się „boską klasą” — podziel według stron / komponentów, a przepływy przenieś do warstwy domenowej','Potrzeba więcej komentarzy','Należy używać XPath'],'Przewodnik ostrzega przed gigantycznymi Page Objects z każdą regułą i przepływem; stają się wąskim gardłem utrzymania.'],
  ['Co oznacza „DAMP ponad DRY” dla kodu testów?',['Usunąć każdą powtórzoną linię','Utrzymywać testy opisowe i czytelne samodzielnie, nawet z pewnym powtórzeniem','Używać baz danych','Unikać page objects'],'Czytelne testy są ważniejsze niż minimalna duplikacja; deduplikuj w helperach.'],
  ['Po co udostępniać lokatory jako właściwości page object tylko do odczytu?',['By je ukryć','By testy mogły stosować na nich asercje web-first, a ocena zostawała w teście','Dla szybkości','Bo wymaga tego Playwright'],'Testy sprawdzają; page objects udostępniają stan i interakcje.'],
 ]},

'framework-types':{title:'Typy frameworków: od liniowego do hybrydowego',
 sum:'Klasyczne sposoby strukturyzowania frameworku automatyzacji, w czym każdy jest dobry i jak wybrać odpowiedni dla zespołu.',
 sections:[
  ['Czego się nauczysz',UL(['Nazywać klasyczne typy frameworków, od skryptów liniowych po hybrydowe','Pisać testy sterowane danymi oraz w stylu słów kluczowych / BDD','Wybierać typ frameworku na podstawie umiejętności zespołu i tego, kto pisze testy'])],
  ['Sześć klasycznych typów',T(['Typ','Jak pisze się testy','Dobry do','Psuje się, gdy'],[
   ['Liniowy (nagraj/odtwórz)','Jeden skrypt na test, kroki nagrane lub napisane od góry do dołu','Szybkie prototypy, nauka narzędzia','Cokolwiek się zmienia: każdy skrypt powtarza te same kroki'],
   ['Modułowy','Testy wywołują wspólne moduły (np. login(), addToCart())','Usuwanie duplikacji','Moduły rozrastają się w plątaninę bez wyraźnych warstw'],
   ['Architektura biblioteki','Wspólne funkcje spakowane jako biblioteka importowana przez testy','Wiele zespołów używa tych samych akcji','Biblioteka staje się śmietnikiem'],
   ['Sterowany danymi (data-driven)','Jedna logika testu, wiele wierszy danych wejściowych i oczekiwanych wyników','Reguły biznesowe, walidacja, obliczenia','Logika różni się między wierszami; plik danych staje się kodem'],
   ['Sterowany słowami kluczowymi (keyword-driven)','Testy to tabele słów kluczowych („Open Browser”, „Input Text”) zaimplementowanych raz w kodzie','Nieprogramiści piszą testy; Robot Framework','Słowa kluczowe się mnożą, a debugowanie przechodzi przez dwie warstwy'],
   ['Hybrydowy','Łączy powyższe — zwykle modułowy kod z page objects plus testy sterowane danymi','Większość prawdziwych frameworków','Nikt nie zapisał, który styl stosować gdzie']])+CO('note','Kluczowa myśl','Niemal każdy nowoczesny framework na Playwright czy Selenium jest hybrydowy: modułowe page objects i fixtures, testy sterowane danymi tam, gdzie zmieniają się dane, a czasem warstwa BDD na wierzchu.')],
  ['Testy sterowane danymi w Playwright',`${P(0)}
 ${UL(['Umieść opis przypadku w tytule testu, by błąd wskazywał wiersz, który się zepsuł.','Trzymaj dane obok testu, póki jest ich mało; przenieś je do <code class="i">tests/data/*.json</code> lub CSV, gdy utrzymują je osoby z biznesu.','Wyprowadzaj wiersze z technik projektowania testów — klas i granic — a nie z wartości, które akurat przyszły do głowy.'])}`],
  ['Słowa kluczowe i BDD',`<p><b>Sterowanie słowami kluczowymi</b> (styl Robot Framework) — test to tabela słów kluczowych z argumentami:</p>
${P(0)}
 <p><b>BDD</b> (styl Cucumber/Gherkin) — scenariusze w języku biznesowym, każdy krok powiązany z kodem:</p>
${P(1)}
 ${CO('risk','Ryzyko','BDD się opłaca, gdy osoby produktowe naprawdę czytają lub piszą scenariusze. Jeśli pliki .feature dotykają tylko inżynierowie, dodałeś warstwę tłumaczenia i drugie miejsce na błędy, a wyniku nikt nie czyta.')}`],
  ['Wybór typu',T(['Jeśli…','Skłaniaj się ku'],[
   ['Inżynierowie piszą i utrzymują wszystkie testy','Hybrydzie opartej na kodzie: page objects, fixtures, testy sterowane danymi tam, gdzie pomagają'],
   ['Testy będą pisać testerzy manualni lub analitycy','Słowom kluczowym (Robot Framework) lub narzędziu low-code'],
   ['Właściciele produktu współtworzą kryteria akceptacji','BDD — z prawdziwym nawykiem „trzech amigos”, a nie samą składnią Gherkin'],
   ['Tę samą regułę trzeba sprawdzić dla wielu danych wejściowych','Testom sterowanym danymi, najlepiej na poziomie API'],
   ['Potrzebujesz czegoś działającego jeszcze w tym tygodniu','Zacznij modułowo i prosto; dodawaj warstwy, gdy duplikacja zacznie boleć']])+CO('tip','Wskazówka','Zapisz decyzję i jej uzasadnienie w docs/architecture.md. „Czemu nie używamy BDD?” to jedna z dyskusji, które ciągle wracają.')],
 ],
 quiz:[
  ['Który typ frameworku oddziela jedną logikę testu od wielu wierszy danych wejściowych i oczekiwanych wyników?',['Liniowy','Sterowany słowami kluczowymi','Sterowany danymi','Architektura biblioteki'],'Frameworki sterowane danymi uruchamiają tę samą logikę dla wielu wierszy danych.'],
  ['Większość testów napisze zespół testerów manualnych z niewielkim doświadczeniem w programowaniu. Co pasuje najlepiej?',['Liniowe nagrywanie/odtwarzanie na zawsze','Sterowanie słowami kluczowymi, np. Robot Framework','Czysty TypeScript oparty na kodzie','Nic — nie powinni pisać testów'],'Słowa kluczowe pozwalają nieprogramistom składać testy, a inżynierowie implementują same słowa kluczowe.'],
  ['Większość nowoczesnych frameworków Playwright najlepiej opisać jako…',['Liniowe','Sterowane słowami kluczowymi','Hybrydowe','Nagraj/odtwórz'],'Łączą modułowe page objects i fixtures z testami sterowanymi danymi.'],
  ['Pliki Gherkin zespołu czytają i piszą tylko inżynierowie. Jaka jest główna wada?',['Gherkin jest wolny','Dodatkowa warstwa tłumaczenia bez korzyści ze współpracy, dla której istnieje BDD','Cucumber nie działa w CI','Scenariusze nie mogą być sterowane danymi'],'Wartością BDD jest wspólne rozumienie z biznesem; bez tego to narzut.'],
  ['Po co w teście sterowanym danymi umieszczać wartości wiersza w tytule testu?',['Tytuły muszą być unikalne, a błąd wskazuje wtedy dokładnie wiersz, który się zepsuł','Przyspiesza to testy','Wymaga tego Playwright','Dla pokrycia kodu'],'Unikalne, opisowe tytuły czynią raporty czytelnymi i są wymagane, gdy testy generuje się w pętli.'],
  ['Skąd powinny pochodzić wiersze dla testu rabatu sterowanego danymi?',['Losowe wartości','Klasy równoważności i wartości brzegowe reguły rabatu','Tylko logi produkcyjne','Cokolwiek użył programista'],'Techniki projektowania testów zamieniają regułę w mały zbiór znaczących wierszy.'],
 ]},

'design-patterns':{title:'Wzorce projektowe w kodzie testów',
 sum:'Page Objects to dopiero początek. Obiekty komponentów, Screenplay, buildery, fabryki i klienci API utrzymują czytelność większych frameworków.',
 sections:[
  ['Czego się nauczysz',UL(['Stosować Page Objects, obiekty komponentów i wzorzec Screenplay','Budować dane testowe za pomocą fabryk i builderów','Ukrywać szczegóły HTTP za opakowaniem klienta API','Rozpoznawać przeinżynierowanie w kodzie testów'])],
  ['Wzorce w skrócie',T(['Wzorzec','Jaki problem rozwiązuje','Używaj, gdy'],[
   ['Page Object','Lokatory i interakcje rozrzucone po testach','Strony są dość odrębne'],
   ['Obiekt komponentu','Ten sam widżet (wybór daty, tabela, nawigacja) na wielu stronach','Aplikacja składa się z komponentów UI wielokrotnego użytku'],
   ['Screenplay','Page objects rozrastają się w „boskie klasy”; testy czyta się jak kliknięcia','Duże zestawy, wielu aktorów i ról'],
   ['Builder / fabryka','Przygotowanie danych testowych jest długie i zaszumione','Obiekty mają wiele pól z rozsądnymi wartościami domyślnymi'],
   ['Opakowanie klienta API','Szczegóły HTTP (URL-e, nagłówki, uwierzytelnianie) powtarzane w testach','Testy ustawiają stan przez API'],
   ['Płynny interfejs (fluent)','Długie sekwencje kroków trudno się czyta','Przepływy są liniowe i dobrze znane'],
   ['Strategia / obiekt konfiguracji','Zachowanie różni się w zależności od środowiska lub przeglądarki','Kilka środowisk lub trybów uruchamiania']])],
  ['Obiekty komponentów',`${P(0)}
 ${CO('tip','Wskazówka','Zawężaj komponent do jego lokatora głównego. Wtedy dwie tabele na jednej stronie sobie nie przeszkadzają, a komponent działa wszędzie, gdzie go umieścisz.')}`],
  ['Wzorzec Screenplay',`<p>Screenplay modeluje testy wokół <b>aktorów</b>, którzy mają <b>zdolności</b> (przeglądać web, wywoływać API), wykonują <b>zadania</b> złożone z <b>interakcji</b> i zadają <b>pytania</b> o stan systemu. Najbardziej znaną implementacją jest Serenity BDD (Java oraz Serenity/JS).</p>
${P(0)}
 ${UL(['<b>Zaleta:</b> małe klasy o jednym celu; czyta się jak zachowanie biznesowe; skaluje się na wiele ról.','<b>Koszt:</b> więcej pojęć i plików. Dla małego zestawu zwykle wystarczą page objects i fixtures.'])}`],
  ['Buildery i fabryki danych testowych',`${P(0)}
 ${CO('note','Kluczowa myśl','Z builderem test wspomina tylko dane istotne dla jego wyniku. Czytelnik od razu widzi, czym ten test różni się od pozostałych.')}`],
  ['Opakowania klienta API',`${P(0)}
 <p>Udostępnij opakowanie przez fixture, a testy będą wyglądać tak: <code class="i">await contactsApi.create(aContact())</code>. Zachowaj cienką ścieżkę surowych żądań dla testów <i>samego</i> API — potrzebują kodów statusu i nagłówków, które opakowanie ukrywa.</p>`],
  ['Antywzorce, których należy unikać',UL(['<b>Boski page object</b> — jedna klasa z każdym przepływem w aplikacji.','<b>Głębokie dziedziczenie</b> — BasePage → LoggedInPage → AdminPage → …, gdzie zmiana na górze psuje wszystko.','<b>Asercje ukryte w helperach</b> — błędy wskazują helper, a nie to, czego oczekiwał test.','<b>Helpery oparte na pauzach</b> — <code class="i">waitABit()</code> z ładną nazwą to nadal pauza.','<b>Spekulatywna abstrakcja</b> — warstwy pisane „na wszelki wypadek”. Dodaj warstwę, gdy duplikacja boli, nie wcześniej.','<b>Współdzielone zmienne singletony</b> — globalny „bieżący użytkownik” nadpisywany przez równoległe testy.'])+CO('risk','Ryzyko','Każdy z tych wzorców to narzędzie na konkretny problem. Zastosowanie wszystkich w zestawie 30 testów daje framework, w którym odnajduje się tylko jego autor.')],
 ],
 quiz:[
  ['Ten sam wybór daty występuje na 12 stronach. Który wzorzec pozwala uniknąć duplikacji jego logiki?',['Większy page object na każdej stronie','Obiekt komponentu zawężony do lokatora głównego widżetu','Aktorzy Screenplay','Tabele słów kluczowych'],'Obiekty komponentów modelują widżety wielokrotnego użytku raz i składają się w strony.'],
  ['Kto we wzorcu Screenplay wykonuje zadania?',['Strony','Aktorzy ze zdolnościami','Fixtures','Reportery'],'Aktorzy mają zdolności (przeglądać web, wywoływać API) i wykonują zadania złożone z interakcji.'],
  ['Jaka jest główna korzyść buildera danych testowych z wartościami domyślnymi i nadpisaniami?',['Szybsze wykonanie','Testy podają tylko dane istotne dla ich wyniku','Zastępuje asercje','Szyfruje dane'],'Wartości domyślne ukrywają szum; nadpisania podkreślają, o czym jest test.'],
  ['Po co zachowywać ścieżkę surowych żądań, skoro masz opakowanie ContactsApi?',['Opakowania są wolne','Testy samego API muszą widzieć kody statusu i nagłówki, które opakowanie ukrywa','Surowe żądania są bezpieczniejsze','Wymaga tego Playwright'],'Opakowania służą do przygotowania; testy API potrzebują bezpośredniego dostępu do szczegółów odpowiedzi.'],
  ['Helper waitForPageToSettle() zawiera waitForTimeout(3000). Co to jest?',['Czekanie oparte na warunku','Pauza z ładną nazwą — antywzorzec','Fixture','Asercja web-first'],'Ładna nazwa nie sprawi, że pauza będzie czekać na prawdziwy warunek.'],
  ['Zestaw 30 testów ma już page objects, Screenplay, trzy warstwy builderów i kontener DI. Który antywzorzec?',['Boski page object','Spekulatywna abstrakcja / przeinżynierowanie','Brakujące asercje','Współdzielone dane'],'Abstrakcje muszą na siebie zarobić; małe zestawy rzadko potrzebują ich wszystkich.'],
 ]},

'framework-docs':{title:'Dokumentacja frameworku',
 sum:'Dokumentacja jest częścią frameworku: wersjonowana, aktualizowana w tej samej zmianie i na tyle dobra, by nowy inżynier szybko stał się produktywny.',
 sections:[
  ['Czego się nauczysz',UL(['Wymieniać minimalny zestaw dokumentacji frameworku','Oceniać dokumentację według siedmiu kryteriów jakości','Zacząć od szablonu README, który nowi inżynierowie mogą wykonać'])],
  ['Minimalny zestaw dokumentacji',OL(['README: cel, wymagania wstępne, szybki start','Przegląd architektury z odpowiedzialnością komponentów','Struktura folderów i konwencje nazewnictwa','Środowisko / konfiguracja','Jak uruchomić jeden test, zestaw, smoke i przebieg jak w CI','Strategia danych testowych i zasady sprzątania','Strategia uwierzytelniania / sesji','Konwencje lokatorów','Konwencje Page Object / warstwy usług','Raportowanie i artefakty','Zachowanie pipeline’u CI/CD','Polityka ponowień i niestabilnych testów','Przewodnik rozwiązywania problemów','Zasady wkładu i przeglądu kodu','Zarządzanie zależnościami / wersjami'])],
  ['Kryteria jakości',T(['Kryterium','Dobry stan','Ryzyko, gdy brakuje'],[['Aktualność','Dokumentacja zmienia się razem z kodem frameworku','Rozjazd dokumentacji'],['Odnajdywalność','README linkuje do głębszej dokumentacji','Opóźnienia we wdrażaniu'],['Wykonywalność','Polecenia można skopiować i uruchomić','Nowy inżynier nie może zweryfikować konfiguracji'],['Architektura','Odpowiedzialności i zależności są jawne','Ukryte powiązania'],['Przykłady','Reprezentatywne, działające przykłady','Niespójna implementacja'],['Rozwiązywanie problemów','Znane błędy i diagnostyka','Powtarzane dochodzenia'],['Uzasadnienie','Decyzje projektowe są wyjaśnione','Powtarzane spory architektoniczne']])+CO('tip','Wskazówka','Dodaj „zaktualizowano dokumentację” do listy kontrolnej pull requesta. Rozjazd to najczęstsza porażka dokumentacji frameworków.')],
  ['Szablon README',`${P(0)}
 ${CO('tip','Wskazówka','Testuj README tak jak kod: raz na kwartał niech ktoś nowy przejdzie przez nie na czystej maszynie, a Ty popraw każdy krok, który zawiódł.')}`],
 ],
 quiz:[
  ['Nowy inżynier kopiuje polecenie uruchomienia z README i ono nie działa. Które kryterium jakości jest naruszone?',['Uzasadnienie','Wykonywalność','Odnajdywalność','Przykłady'],'Wykonywalność oznacza, że polecenia z dokumentacji można skopiować i uruchomić tak, jak są.'],
  ['Gdzie powinna mieszkać dokumentacja frameworku?',['W wiki, do której nikt nie linkuje','Wersjonowana razem z frameworkiem, aktualizowana w tej samej zmianie','W głowach ludzi','W logach CI'],'Dokumentacja wersjonowana z kodem i aktualizowana w tym samym PR zapobiega rozjazdowi.'],
  ['Zespoły wciąż na nowo dyskutują „czemu nie używamy BDD?”. Którego kryterium brakuje?',['Uzasadnienia — kluczowe decyzje projektowe nie są zapisane','Wykonywalności','Aktualności','Przykładów'],'Bez zapisanego uzasadnienia te same spory architektoniczne się powtarzają.'],
  ['Co NIE należy do minimalnego zestawu dokumentacji?',['Polityka ponowień i niestabilnych testów','Przewodnik rozwiązywania problemów','Osobisty motyw IDE każdego inżyniera','Konwencje lokatorów'],'Zestaw opisuje, jak uruchamiać, rozszerzać, debugować i przeglądać framework, a nie osobiste preferencje.'],
  ['Jaki jest najlepszy sposób, by szybki start w README był poprawny?',['Przepisywać go co roku','Regularnie dawać go nowej osobie do przejścia na czystej maszynie i poprawiać, co zawiedzie','Dodać więcej zrzutów ekranu','Przenieść do wiki'],'Wykonywalność udowadnia się uruchomieniem — jak test.'],
 ]},

'project-structure':{title:'Struktura projektu i przepływ pracy',
 sum:'Zalecany układ dla Playwright/TypeScript i przykład krok po kroku: od wymagania do utrzymywanego testu wpiętego w CI.',
 sections:[
  ['Czego się nauczysz',UL(['Zorganizować projekt Playwright/TypeScript','Tagować i wybierać zestawy (smoke, regresja) z wiersza poleceń','Konfigurować wiele środowisk bez zmian w kodzie','Przeprowadzić wymaganie do utrzymywanego testu wpiętego w CI'])],
  ['Zalecany układ',`${P(0)}`],
  ['Tagi, zestawy i środowiska',`${P(0)}
 ${UL(['Nazywaj specyfikacje według zachowania: <code class="i">registration.spec.ts</code>, a nie <code class="i">test1.spec.ts</code>.','Nazywaj testy wynikami, które rozpozna interesariusz: „zablokowany użytkownik widzi błąd”, a nie „test logowania 3”.','Wartości zależne od środowiska (URL-e, flagi funkcji) trzymaj w zmiennych środowiskowych lub konfiguracji środowiska, nigdy w kodzie testów.','Commituj <code class="i">.env.example</code> z wartościami zastępczymi, a prawdziwy <code class="i">.env</code> dodaj do .gitignore.'])}`],
  ['Przykład krok po kroku: „użytkownik może się zarejestrować”',OL(['<b>Wymaganie:</b> użytkownik może się zarejestrować.','<b>Analiza ryzyka:</b> duplikat konta, niepoprawny e-mail, słabe reguły haseł, niezgodność API/UI.','<b>Testy API:</b> kontrakt, kody statusu, walidacja, zachowanie przy duplikacie.','<b>Test UI:</b> tylko krytyczna ścieżka użytkownika.','<b>Dane testowe:</b> unikalne konto dla każdego testu.','<b>Asercja:</b> sprawdź zarówno stan aplikacji, jak i wynik widoczny dla użytkownika.','<b>Artefakty:</b> ślad / zrzut ekranu przy błędzie.','<b>CI:</b> smoke rejestracji przy pull requestach.','<b>Regresja:</b> szersza macierz rejestracji po scaleniu / co noc.','<b>Utrzymanie:</b> aktualizuj test i dokumentację w tej samej zmianie.'])+CO('note','Kluczowa myśl','Zwróć uwagę na podział: wiele sprawdzeń na poziomie API, jedna ścieżka na poziomie UI. To piramida testów w praktyce.')],
 ],
 quiz:[
  ['Po co w przykładzie rejestracji generować unikalne konto dla każdego testu?',['By raporty były ładniejsze','By testy pozostały niezależne i mogły działać równolegle bez kolizji','Bo wymaga tego API','By spowolnić testy'],'Wspólne konta to jedna z głównych przyczyn niestabilnych testów zależnych od kolejności, zwłaszcza równolegle.'],
  ['Gdzie w zalecanym układzie znajduje się LoginPage.ts?',['tests/ui/','pages/','utils/','docs/'],'Page Objects są w pages/, oddzielnie od specyfikacji w tests/ i helperów w utils/.'],
  ['Po co w teście rejestracji sprawdzać i odpowiedź API, i wynik widoczny dla użytkownika?',['By podwoić czas działania','UI może pokazać „sukces”, choć konta nie utworzono — lub odwrotnie','Bo Playwright wymaga dwóch asercji','Dla ładniejszych raportów'],'Sprawdzanie stanu i prezentacji łapie niezgodności API/UI — jedno z ryzyk zidentyfikowanych w przykładzie.'],
  ['Kiedy należy aktualizować test rejestracji i jego dokumentację?',['Dokumentację raz w roku','W tej samej zmianie','Tylko gdy nowy inżynier się skarży','Nigdy — kod jest dokumentacją'],'Krok 10 procesu: aktualizuj test i dokumentację razem.'],
  ['Skąd powinien pochodzić URL środowiska staging dla testów?',['Zapisany na sztywno w każdej specyfikacji','Ze zmiennej środowiskowej lub konfiguracji środowiska','Z README','Z page object'],'Wartości zależne od środowiska należą poza kod testów, by jeden zestaw mógł celować w wiele środowisk.'],
  ['Który plik należy commitować: .env czy .env.example?',['.env','.env.example z wartościami zastępczymi','Oba','Żaden'],'Przykład dokumentuje wymagane zmienne; prawdziwy .env zawiera sekrety i jest ignorowany przez git.'],
 ]},

'test-data':{title:'Zarządzanie danymi testowymi',
 sum:'Większość niestabilnych i zależnych od kolejności testów to problemy z danymi. Twórz dane świadomie, izoluj je i sprzątaj.',
 sections:[
  ['Czego się nauczysz',UL(['Wybierać strategię danych testowych: przez API, zasilanie bazy, fabryki, dane syntetyczne lub zamaskowane','Utrzymywać dane unikalne i izolowane, by testy mogły działać równolegle','Planować sprzątanie, które działa nawet przy błędzie testu'])],
  ['Porównanie strategii',T(['Strategia','Jak','Zalety','Ryzyka'],[
   ['Tworzenie przez API dla każdego testu','Fixture lub builder wywołuje API podczas przygotowania','Szybkie, izolowane, realistyczne reguły biznesowe','Wymaga użytecznego API; trzeba sprzątać'],
   ['Zasilanie bazy danych','Skrypty SQL lub migracje ładują znany stan','Pełna kontrola, dobre dla złożonych stanów','Omija reguły biznesowe; związane ze schematem'],
   ['Statyczne fixtures','Pliki JSON/CSV w repozytorium','Proste, łatwe do przeglądu, deterministyczne','Starzeją się; wspólne rekordy kolidują równolegle'],
   ['Syntetyczne / generowane','Biblioteki takie jak Faker generują realistyczne wartości','Różnorodność, brak danych osobowych','Losowe dane mogą utrudniać odtworzenie błędów'],
   ['Zamaskowana kopia produkcji','Zanonimizowany podzbiór prawdziwych danych','Realistyczna skala i przypadki brzegowe','Ryzyko dla prywatności przy niepełnym maskowaniu; przegląd prawny'],
   ['Wirtualizacja usług / mocki','Stuby odpowiedzi systemów zewnętrznych','Kontrola nad stronami trzecimi i rzadkimi błędami','Rozjeżdża się z prawdziwą usługą']])],
  ['Zasady, dzięki którym dane nie powodują niestabilności',OL(['<b>Unikalne dla każdego testu</b>: generuj identyfikatory z UUID lub id przebiegu. Nigdy nie dziel „użytkownika testowego” między równoległe testy.','<b>Posiadaj to, co sprawdzasz</b>: test powinien tworzyć rekordy, których stan weryfikuje, lub mieć je na wyłączność.','<b>Wspólne dane tylko do odczytu są w porządku</b>: dane referencyjne (kraje, katalog produktów) można załadować raz.','<b>Przestrzeń nazw według przebiegu</b>: dodawaj do danych prefiks z id przebiegu, by zadanie sprzątające mogło usunąć wszystko, co przebieg utworzył.','<b>Ziarno losowości</b>: przy generowanych wartościach loguj seed, by błąd dało się odtworzyć.','<b>Żadnych danych osobowych z produkcji</b> w testach, fixtures, logach ani artefaktach.'])],
  ['Sprzątanie, które przetrwa błąd',`${P(0)}
 ${UL(['Preferuj sprzątanie w fixtures zamiast kroków sprzątających na końcu testu, które są pomijane, gdy wcześniej padnie asercja.','Dodaj <b>zamiatacz</b> (sweeper): zaplanowane zadanie usuwające wszystko z prefiksem testowym starsze niż dzień. Łapie to, co sprzątanie pominęło po awariach.','Przy dużych stanach rozważ <b>efemeryczne środowiska</b>: twórz świeżą bazę lub środowisko na każdy przebieg pipeline’u i wyrzucaj je.'])}
 ${CO('tip','Wskazówka','Jeśli sprzątanie jest trudne, sprawdź, czy test w ogóle musi usuwać: dane w unikalnej przestrzeni nazw, których nic innego nie czyta, nie szkodzą, dopóki nie usunie ich zamiatacz.')}`],
  ['Odtwarzalne dane generowane',`${P(0)}
 ${CO('risk','Ryzyko','Generowane nazwiska zawierają apostrofy, znaki diakrytyczne i długie ciągi — dobre do znajdowania błędów, ale przydatne tylko wtedy, gdy potrafisz odtworzyć wartość, która zawiodła. Zawsze loguj seed lub samą wartość.')}`],
 ],
 quiz:[
  ['Dwa równoległe testy logują się jako qa-user@example.test i edytują ten sam profil. Najbardziej prawdopodobny wynik?',['Szybsze testy','Sporadyczne błędy przez kolizje na wspólnych danych','Lepsze pokrycie','Nic'],'Współdzielone zmienne dane między równoległymi workerami to jedna z głównych przyczyn niestabilności.'],
  ['Dlaczego sprzątanie lepiej umieścić w fixture niż na końcu ciała testu?',['Jest szybsze','Sprzątanie w fixture działa nawet wtedy, gdy wcześniej padnie asercja','Playwright zabrania sprzątania w testach','Wymagają tego raporty'],'Kroki po nieudanej asercji się nie wykonują; sprzątanie w fixture — zawsze.'],
  ['Jakie jest główne ryzyko zasilania bazy danych bezpośrednio?',['Jest za wolne','Może omijać reguły biznesowe i wiąże testy ze schematem','Nie da się go zautomatyzować','Zużywa za dużo pamięci'],'Bezpośrednie inserty pomijają walidację, którą zastosowałaby aplikacja, i psują się przy zmianie schematu.'],
  ['Test z danymi z Fakera zawiódł raz i nie da się go odtworzyć. Czego zabrakło?',['Więcej ponowień','Logowania seeda (lub wygenerowanych wartości)','Wolniejszej przeglądarki','Większego zbioru danych'],'Mając seed, można wygenerować dokładnie te same dane.'],
  ['Jakie dane zazwyczaj bezpiecznie dzielić między równoległe testy?',['Wspólny koszyk','Dane referencyjne tylko do odczytu, np. listę krajów','Wspólne konto administratora, którego ustawienia zmieniają testy','Globalne „bieżące zamówienie”'],'Dzielić bezpiecznie można tylko to, czego żaden test nie modyfikuje.'],
  ['Co robi zaplanowane zadanie „zamiatacz”?',['Ponownie uruchamia niestabilne testy','Usuwa pozostałe dane testowe (np. po prefiksie i wieku), które pominęło sprzątanie','Czyści cache CI','Scala raporty'],'Łapie dane pozostawione przez przebiegi, które się wysypały lub zostały anulowane.'],
 ]},

'ci-cd':{title:'CI/CD i ciągłe testowanie',
 sum:'Nie uruchamiaj wszystkiego wszędzie — dawaj informację zwrotną adekwatną do ryzyka na każdym etapie pipeline’u, z przydatnymi artefaktami.',
 sections:[
  ['Czego się nauczysz',UL(['Przypisywać zestawy do etapów pipeline’u','Pisać workflow GitHub Actions z shardingiem i artefaktami','Definiować quality gates utrzymujące zaufanie do CI'])],
  ['Zestawy według etapu',`<div class="pipeline">
   <div><b>LOKALNIE</b>Skupione testy jednostkowe / komponentów / API — szybka informacja dla dewelopera</div>
   <div><b>PULL REQUEST</b>Lint + jednostkowe + smoke + wybrane E2E/API</div>
   <div><b>PO SCALENIU</b>Szersza regresja na zintegrowanej gałęzi</div>
   <div><b>CO NOC</b>Rozszerzona regresja w wielu przeglądarkach</div>
   <div><b>WYDANIE</b>Smoke wydania + krytyczne ścieżki</div>
   <div><b>WEDŁUG HARMONOGRAMU</b>Długie testy / kompatybilność, monitorowanie trendów</div></div>`],
  ['Workflow GitHub Actions z shardingiem',`<p>Sharding dzieli zestaw między kilka maszyn; każdy shard uruchamia wycinek. Reporter <code class="i">blob</code> w Playwright pozwala potem scalić shardy w jeden raport HTML.</p>
${P(0)}
 <p>Kolejne zadanie pobiera artefakty blob i uruchamia <code class="i">npx playwright merge-reports --reporter html ./all-blob-reports</code>.</p>
 ${CO('tip','Wskazówka','Wersje akcji się zmieniają. Przypinaj bieżące wersje główne ze strony każdej akcji i ustaw krótki czas przechowywania artefaktów, które mogą zawierać dane.')}`],
  ['Jakie artefakty zachować',UL(['Wyniki zgodne z JUnit, gdzie obsługiwane','Raporty HTML','Zrzuty ekranu przy błędzie','Wideo, gdzie przydatne','Ślady Playwright lub odpowiedniki','Logi','Metadane środowiska / builda','Informacje o niestabilnych testach i ponowieniach'])],
  ['Quality gates',T(['Gate','Przykładowa reguła','Dlaczego'],[
  ['Sprawdzenia blokujące','Lint, jednostkowe i smoke muszą przejść, by scalić','Wcześnie zatrzymuje oczywiste awarie'],
  ['Bez testów skupionych','forbidOnly w CI','Zabłąkane test.only po cichu pominęłoby resztę'],
  ['Budżet niestabilności','Odsetek zaliczeń po ponowieniu poniżej ustalonego progu, np. 1%','Nie pozwala ponowieniom ukrywać degradacji'],
  ['Budżet czasu','Pipeline PR poniżej ~10–15 minut','Wolna informacja zwrotna jest omijana'],
  ['Nowe testy są stabilne','Nowe lub zmienione testy uruchamiane z --repeat-each przed scaleniem','Łapie niestabilność, zanim trafi do gałęzi'],
  ['Bezpieczeństwo','Skanowanie sekretów; brak artefaktów z prawdziwymi danymi osobowymi','CI jest częścią powierzchni ataku']])],
  ['Ryzyka CI',UL(['Testy przechodzą lokalnie, ale padają w CI przez różnice środowisk','Równoległe workery dzielą zmienne dane','Sekrety pojawiają się w logach lub raportach','Artefakty zawierają dane osobowe lub dane klientów','Ponowienia zamieniają prawdziwe błędy w mylące zielone buildy','Niestabilne testy powodują zmęczenie alertami — zespoły przestają ufać CI'])+CO('risk','Ryzyko','Gdy zespół zaczyna ponownie uruchamiać czerwone buildy „aż zzielenieją”, CI przestaje być sygnałem. Naprawiaj niestabilne testy albo poddawaj je kwarantannie z właścicielem i datą wygaśnięcia.')],
 ],
 quiz:[
  ['Który zestaw najlepiej pasuje do etapu pull requesta?',['Pełna regresja w wielu przeglądarkach','Lint + jednostkowe + smoke + wybrane E2E/API','Długi zestaw kompatybilności','Nic — testuj po scaleniu'],'Sprawdzenia PR muszą być na tyle szybkie, by działać przy każdej zmianie, i jednocześnie łapać regresje przed scaleniem.'],
  ['Który artefakt najbardziej bezpośrednio pomaga debugować test Playwright, który padł w CI?',['package.json','Plik śladu','README','Plik lock'],'Ślady zapisują każdy krok, migawki DOM, sieć i konsolę — najbliżej odtworzenia błędu.'],
  ['Gdzie zwykle należy rozszerzona regresja w wielu przeglądarkach?',['Przed commitem','Pull request','Co noc','Nigdzie'],'Szerokie, wolniejsze zestawy działają co noc, by informacja zwrotna dla PR pozostała szybka.'],
  ['Ślad wysłany jako artefakt CI zawiera adres prawdziwego klienta. Jakiej kontroli brakuje?',['Więcej ponowień','Maskowania danych i kontroli czasu przechowywania artefaktów','Szybszego runnera','Większego dysku'],'Artefakty z danymi osobowymi to nazwane ryzyko CI; maskuj dane i ograniczaj przechowywanie.'],
  ['Co robi --shard=2/4?',['Uruchamia testy dwa razy w czterech przeglądarkach','Uruchamia drugi z czterech wycinków zestawu','Ponawia dwa razy','Używa czterech workerów'],'Sharding dzieli zestaw między maszyny; każda uruchamia jeden wycinek.'],
  ['Jak sekrety bezpiecznie trafiają do zadania GitHub Actions?',['Zapisane w pliku workflow','Przez sekrety repozytorium lub środowiska wstrzykiwane jako zmienne środowiskowe','W README','Jako artefakty'],'Sekrety są przechowywane zaszyfrowane, wstrzykiwane w czasie działania i maskowane w logach.'],
  ['Który quality gate zapobiega temu, by zabłąkane test.only pominęło zestaw?',['retries: 2','forbidOnly w CI','fullyParallel','trace: on-first-retry'],'forbidOnly oblewa przebieg, gdy obecny jest test skupiony.'],
 ]},

'framework-roadmap':{title:'Budowanie frameworku krok po kroku',
 sum:'Etapowy plan od pierwszego testu do dojrzałego frameworku — z kryteriami wyjścia, definicją ukończenia i przeglądem kondycji.',
 sections:[
  ['Czego się nauczysz',UL(['Planować rozwój frameworku etapami z jasnymi kryteriami wyjścia','Definiować „ukończone” dla testu automatycznego','Decydować między budową, rozbudową a zakupem','Przeprowadzać przegląd kondycji frameworku'])],
  ['Etapy i kryteria wyjścia',T(['Etap','Fokus','Przejdź dalej, gdy'],[
   ['0 · Decyzja','Cele, ryzyka, wybór narzędzia, kto pisze testy','Zapisana decyzja z uzasadnieniem; działający prototyp'],
   ['1 · Chodzący szkielet','Jeden test smoke, konfiguracja, README, uruchamiany w CI przy każdym PR','Nowy inżynier uruchamia go z README w mniej niż 30 minut'],
   ['2 · Fundamenty','Fixtures, strategia danych testowych, konwencje lokatorów, pierwsze page objects, klient API','Dziesięć testów działa równolegle bez kolizji'],
   ['3 · Pokrycie według ryzyka','Krytyczne ścieżki w E2E; reguły na poziomie API; tagi dla smoke i regresji','Elementy wysokiego ryzyka mają sprawdzenia; pipeline PR mieści się w budżecie czasu'],
   ['4 · Eksploatacja','Polityka niestabilnych testów, pulpity, odpowiedzialność, przechowywanie artefaktów','Odsetek zaliczeń po ponowieniu jest śledzony i w budżecie'],
   ['5 · Doskonalenie','Kwartalny przegląd kondycji, porządki, refaktoryzacja, szkolenia','Ciągle — framework to produkt z właścicielem']])+CO('note','Kluczowa myśl','Najpierw zdobądź zielony test w CI, a dopiero potem buduj abstrakcje. Warstwy frameworku zaprojektowane, zanim powstały testy, zwykle rozwiązują niewłaściwe problemy.')],
  ['Definicja ukończenia dla testu automatycznego',UL(['Jest powiązany z wymaganiem lub ryzykiem.','Pada, gdy zachowanie się psuje — sprawdzone raz przez celowe zepsucie.','Używa lokatorów widocznych dla użytkownika i czekania na warunki; bez pauz.','Tworzy lub posiada swoje dane i po sobie sprząta.','Działa samodzielnie, w dowolnej kolejności i równolegle.','Przeszedł powtarzany przebieg (np. <code class="i">--repeat-each=10</code>) przed scaleniem.','Jego tytuł mówi, jakie zachowanie sprawdza.','Jest otagowany do właściwych zestawów.','Jego wynik przy błędzie (komunikat, ślad, zrzut ekranu) pozwala komuś innemu zdiagnozować problem.','Dokumentację zaktualizowano w tej samej zmianie, jeśli zmieniły się konwencje.'])],
  ['Zbudować, rozbudować czy kupić',T(['Opcja','Wybierz, gdy','Na co uważać'],[
   ['Budować na otwartym runnerze (Playwright, Cypress, Selenium)','Testy należą do inżynierów; potrzebujesz elastyczności i kontroli wersji','Utrzymanie i konwencje są po Twojej stronie'],
   ['Rozbudować istniejący wewnętrzny framework','Jest w dobrej kondycji i zespół go zna','Dziedziczenie jego niestabilności i długu'],
   ['Kupić komercyjną lub low-code / AI platformę','Testy piszą nieprogramiści; potrzebujesz wsparcia dostawcy lub wbudowanej analityki','Uzależnienie od dostawcy, możliwości eksportu, lokalizacja danych, całkowity koszt w trzy lata']])+CO('tip','Wskazówka','Cokolwiek wybierzesz, przeprowadź dwutygodniowy pilotaż na najtrudniejszym prawdziwym przepływie — logowanie z MFA, iframe, przesyłanie pliku — a nie na aplikacji demo dostawcy.')],
  ['Role i odpowiedzialność',UL(['<b>Właściciel frameworku</b>: utrzymuje rdzeń, przegląda zmiany konwencji, prowadzi przegląd kondycji.','<b>Zespoły produktowe</b>: piszą i naprawiają testy swoich funkcji — błędy trafiają do tego, kto zmienił kod.','<b>Dyżur niestabilnych testów</b>: ktoś w każdym sprincie przegląda nowe zgłoszenia niestabilności, by się nie gromadziły.','<b>Recenzenci</b>: kod testów przechodzi taki sam przegląd jak kod produktu.'])+CO('risk','Ryzyko','Jeśli jedna „osoba od automatyzacji” jest właścicielem każdego testu, zestaw rośnie tylko w jej tempie i umiera, gdy ona odchodzi.')],
 ],
 quiz:[
  ['Jaki powinien być pierwszy kamień milowy nowego frameworku?',['Pełna architektura warstwowa','Jeden test smoke działający w CI przy każdym PR, z README','100 nagranych testów','Własny pulpit raportowy'],'Chodzący szkielet dowodzi całej ścieżki od początku do końca, zanim powstaną abstrakcje.'],
  ['Co należy do definicji ukończenia testu automatycznego?',['Ma więcej niż 50 linii','Widziano, jak pada, gdy zachowanie celowo zepsuto','Używa XPath','Działa tylko w Chrome'],'Test, który nigdy nie padł, może nie być w stanie paść.'],
  ['Demo dostawcy wygląda świetnie. Jaki jest najlepszy krok oceny?',['Podpisać trzyletnią umowę','Dwutygodniowy pilotaż na Twoich najtrudniejszych prawdziwych przepływach','Policzyć integracje','Poprosić o rabat'],'Aplikacje demo omijają trudne miejsca; Twoje MFA, iframe’y i przesyłanie plików — nie.'],
  ['Kto zwykle powinien naprawić test zepsuty przez zmianę funkcji?',['Tylko specjalista od automatyzacji','Zespół, który zmienił funkcję','Nikt — usunąć go','Dostawca'],'Odpowiedzialność podąża za zmianą; jeden właściciel-wąskie gardło się nie skaluje.'],
  ['Które kryterium wyjścia najlepiej pokazuje, że etap 2 (fundamenty) jest ukończony?',['Istnieje README','Dziesięć testów działa równolegle bez kolizji','Pulpit działa','Jest 500 testów'],'Fundamenty to dane, fixtures i izolacja — bezpieczeństwo równoległości to udowadnia.'],
 ]},
});
