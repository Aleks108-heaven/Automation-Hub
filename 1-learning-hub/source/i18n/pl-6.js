/* Polski — v6: projektowanie testów, testy bezpieczeństwa dla QA, defekty i raporty QA */
TR.pl=TR.pl||{modules:{}};
(()=>{const M=TR.pl.modules;

M['test-design']={title:'Techniki projektowania testów',
 sum:'Klasy równoważności, wartości brzegowe, tablice decyzyjne, przejścia stanów i kombinacje parami: jak wybrać mały zestaw przypadków, który nadal wykrywa większość defektów.',
 sections:[
  ['Czego się nauczysz',UL(['Dzielić dane wejściowe na klasy równoważności i wybierać wartości brzegowe','Redukować tablicę decyzyjną do najmniejszego zestawu reguł','Testować dozwolone i niedozwolone przejścia stanów','Ograniczać eksplozję kombinacji testowaniem parami','Zapisywać wybrane przypadki i zamieniać je na testy sterowane danymi'])],
  ['Najpierw projekt, potem automatyzacja',`<p>Playwright, Cypress i Selenium wykonują sprawdzenia. Nie decydują, <i>które</i> sprawdzenia warto uruchamiać. Techniki projektowania testów to powtarzalne metody wyboru małego zestawu przypadków, który nadal wykrywa większość defektów. Odpowiadają na pytanie „jakie dane, jakie stany, jakie kombinacje?” zanim powstanie jakikolwiek kod.</p>
${T(['Technika','Kiedy jej użyć','Przykład'],[
   ['Podział na klasy równoważności','Dane wejściowe dzielą się na grupy traktowane przez system tak samo','Wiek poniżej, w środku i powyżej dozwolonego zakresu'],
   ['Analiza wartości brzegowych','Są zakresy i granice; tu żyją błędy o jeden','17, 18, 19 oraz 64, 65, 66'],
   ['Tablica decyzyjna','Kilka warunków w kombinacji daje różne wyniki','Członek × kupon × kwota zamówienia'],
   ['Przejścia stanów','Zachowanie zależy od historii lub statusu','Zamówienie: szkic → wysłane → zatwierdzone'],
   ['Testowanie parami','Wiele parametrów z kilkoma wartościami każdy','Przeglądarka × plan × język'],
   ['Zgadywanie błędów, eksploracyjne','Doświadczenie podpowiada, gdzie to się psuje','Podwójne kliknięcie „Wyślij”, wklejenie ogromnego tekstu']])}
${CO('note','Kluczowa myśl','Sylabus ISTQB Foundation (v4.0) wymienia podział na klasy równoważności, analizę wartości brzegowych, tablice decyzyjne i testowanie przejść stanów jako techniki czarnoskrzynkowe, a zgadywanie błędów i testowanie eksploracyjne jako techniki oparte na doświadczeniu. Testowania parami nie ma na tej liście, ale w praktyce jest szeroko stosowane.')}`],
  ['Klasy równoważności i wartości brzegowe',`<p>Formularz rejestracji przyjmuje wiek od 18 do 65 lat. <b>Podział na klasy równoważności</b> grupuje dane, które system powinien traktować tak samo, i testuje po jednej wartości z każdej grupy. <b>Analiza wartości brzegowych</b> dodaje krańce każdego poprawnego zakresu, bo błędy o jeden (<code class="i">&gt;</code> zamiast <code class="i">&gt;=</code>) skupiają się właśnie tam.</p>
${T(['Klasa','Przykładowa wartość','Oczekiwany wynik'],[
   ['Poniżej zakresu (niepoprawne)','10','Odrzucone, komunikat podaje zakres od 18 do 65'],
   ['W zakresie (poprawne)','40','Przyjęte'],
   ['Powyżej zakresu (niepoprawne)','80','Odrzucone'],
   ['Nie liczba','abc','Odrzucone, bez awarii'],
   ['Puste','(puste pole)','Odrzucone: pole wymagane']])}
<p>Zestaw wartości brzegowych metodą trzech wartości dla 18–65 to <b>17, 18, 19</b> oraz <b>64, 65, 66</b>. Przekaż przypadki do jednego testu sterowanego danymi:</p>
${P(0)}
${CO('tip','Wskazówka','Sprawdzaj regułę walidacji na najniższym poziomie, który ją posiada. Dziewięć uruchomień w przeglądarce dla jednej reguły jest wolne: sprawdź wszystkie dziewięć wartości na poziomie unit lub API, a w UI zostaw po jednym przypadku na klasę, by potwierdzić komunikat i podłączenie.')}`],
  ['Tablice decyzyjne',`<p>Gdy warunki się łączą, wypisz każdą kombinację i jej wynik. Reguły: dostawa jest darmowa dla członków <i>lub</i> dla zamówień od 100, a kupon daje 10 % zniżki tylko na zamówienia od 100. Trzy warunki tak/nie dają 2 × 2 × 2 = 8 kombinacji, z których wiele ma ten sam wynik, więc łączy się je (kreska oznacza, że warunek nie ma znaczenia).</p>
${T(['Reguła','Członek','Kupon','Kwota ≥ 100','Dostawa','Zniżka'],[
   ['R1','–','Tak','Tak','Darmowa','10 %'],
   ['R2','–','Nie','Tak','Darmowa','Brak'],
   ['R3','Tak','–','Nie','Darmowa','Brak'],
   ['R4','Nie','–','Nie','Płatna','Brak']])}
<p>Osiem kombinacji sprowadza się do czterech reguł, więc cztery testy pokrywają każdy odrębny wynik. Budowa tablicy ujawnia też pytania, na które specyfikacja nie odpowiedziała, na przykład co robi kupon przy zamówieniu 99,99. Dodaj do tych samych testów sprawdzenia brzegowe kwoty (99,99; 100,00).</p>`],
  ['Testowanie przejść stanów',`<p>Gdy zachowanie zależy od historii, zamodeluj stany i zdarzenia, które między nimi przenoszą. Zamówienie może przejść ścieżkę szkic → wysłane → zatwierdzone → wysłane do klienta i można je anulować przed wysyłką.</p>
${T(['Ze stanu','Zdarzenie','Do stanu','Oczekiwane'],[
   ['Szkic','Wyślij','Wysłane','Dozwolone'],
   ['Wysłane','Zatwierdź','Zatwierdzone','Dozwolone'],
   ['Zatwierdzone','Wyślij do klienta','Wysłane do klienta','Dozwolone'],
   ['Wysłane lub zatwierdzone','Anuluj','Anulowane','Dozwolone'],
   ['Zatwierdzone','Otwórz ponownie','Szkic','Odmowa'],
   ['Wysłane do klienta','Anuluj','Anulowane','Odmowa'],
   ['Anulowane','Zatwierdź','Zatwierdzone','Odmowa']])}
<p>Pokryj każde dozwolone przejście co najmniej raz, a potem spróbuj tych odrzucanych. Każde powinno zostać odrzucone i zostawić stan bez zmian; tu kryje się większość błędów stanów.</p>
${P(0)}
${CO('tip','Wskazówka','Sprawdzaj stan po odrzuconej akcji, nie tylko kod błędu. Odpowiedź 409, po której zamówienie jednak się zmieniło, to błąd.')}`],
  ['Testowanie parami',`<p>Trzy parametry po trzy wartości dają 3 × 3 × 3 = 27 kombinacji; dziesięć parametrów może dać tysiące. Większość defektów wywołuje jedna wartość lub interakcja dwóch, więc zestaw <b>parami</b> pokrywa każdą parę wartości co najmniej raz przy znacznie mniejszej liczbie testów. Dla poniższych parametrów 9 testów pokrywa wszystkie pary.</p>
${T(['Parametr','Wartości'],[['Przeglądarka','Chromium, Firefox, WebKit'],['Plan','Free, Pro, Team'],['Język','en, uk, pl']])}
<p>Wygeneruj zestaw narzędziem takim jak <b>PICT</b> lub <b>allpairspy</b> i przekaż wiersze do testu sterowanego danymi, jak w tabeli wieku powyżej. Oba przyjmują <b>ograniczenia</b>, więc niemożliwe kombinacje (język, którego plan Free nie oferuje) nigdy nie są generowane.</p>
${CO('risk','Ryzyko','Testowanie parami może przeoczyć defekt wymagający trzech lub więcej konkretnych wartości naraz. Dodaj ręcznie najbardziej ryzykowne kombinacje, zwłaszcza dotyczące pieniędzy lub danych osobowych.')}`],
  ['Zgadywanie błędów i karty eksploracji',`<p>Doświadczenie dodaje przypadki, których nie da żadna technika. Typowe miejsca do sprawdzenia:</p>
${UL(['Dwukrotnie kliknąć lub dwukrotnie wysłać formularz','Nacisnąć Wstecz lub Odśwież zaraz po wysłaniu','Wkleić bardzo długi tekst, emoji lub tekst od prawej do lewej','Użyć cudzysłowów, nawiasów ostrych i liter z akcentami','Otworzyć ten sam rekord w dwóch kartach lub pozwolić sesji wygasnąć w trakcie zadania','Użyć dat na krańcach: 29 lutego, zmiana czasu, koniec roku'])}
<p><b>Sesja eksploracyjna</b> jest ograniczona czasowo (30 do 60 minut) i prowadzona przez <b>kartę</b> (charter): <i>zbadaj</i> obszar <i>używając</i> pewnych zasobów, <i>aby odkryć</i> ryzyko. Zapisuj pytania, błędy i nowe ryzyka na bieżąco.</p>
${CO('note','Przykładowa karta','Zbadaj składanie zamówienia z wygasłymi kartami i dwiema kartami przeglądarki, aby odkryć problemy ze stanem płatności.')}`],
  ['Zapisywanie przypadków',`<p>Przypadek nadaje się do ponownego użycia tylko wtedy, gdy ktoś inny może go wykonać. Trzymaj krótki, spójny format i oznacz, co automatyzować.</p>
${T(['ID','Technika','Typ','Kroki','Oczekiwane','Automatyzować'],[
   ['TC-001','Wartości brzegowe','Brzegowy','Wpisz wiek 17','Odrzucone; komunikat podaje zakres od 18 do 65','Tak'],
   ['TC-002','Tablica decyzyjna R3','Pozytywny','Członek, kwota 40, bez kuponu','Darmowa dostawa, bez zniżki','Tak'],
   ['TC-003','Przejścia stanów','Negatywny','Otwórz ponownie zatwierdzone zamówienie','Odmowa; zamówienie pozostaje zatwierdzone','Tak'],
   ['TC-004','Karta eksploracji','–','Dwie karty, sesja wygasa w trakcie zamówienia','Notatki, pytania, błędy','Nie']])}
${CO('tip','Wskazówka','Automatyzuj przypadki stabilne, częste i istotne (zob. „Strategia i automatyzacja oparta na ryzyku”). Karta eksploracji z założenia pozostaje ręczna.')}`],
 ],
 quiz:[
  ['Pole ilości przyjmuje od 1 do 10. Który zestaw jest zestawem brzegowym metodą trzech wartości dla górnej granicy?',['9, 10, 11','Tylko 10','5, 10, 20','1, 10'],'Analiza metodą trzech wartości testuje granicę i obu sąsiadów: 9, 10 i 11.'],
  ['Dlaczego podział na klasy równoważności zmniejsza liczbę testów?',['Usuwa potrzebę oczekiwanych wyników','Jedna wartość reprezentuje całą grupę, którą system traktuje tak samo','Testuje tylko poprawne dane','Testuje każdą możliwą wartość raz'],'Jeśli wszystkie wartości klasy zachowują się tak samo, jeden reprezentant wystarczy, by znaleźć defekt w tej klasie.'],
  ['Co daje łączenie wierszy o identycznych wynikach w tablicy decyzyjnej?',['Usuwa warunki, które mają znaczenie','Wydłuża tablicę','Mniej reguł do przetestowania, a każdy odrębny wynik nadal jest pokryty','Zastępuje analizę wartości brzegowych'],'Reguły różniące się tylko nieistotnym warunkiem zlewają się w jedną, więc każdy odrębny wynik testujesz raz.'],
  ['Co powinno się stać przy próbie niedozwolonego przejścia stanu, na przykład ponownego otwarcia wysłanego zamówienia?',['Powinno zostać przyjęte i zapisane w logu','Stan powinien wrócić do początkowego','Powinno zostać odrzucone, a stan pozostać bez zmian','Nic nie trzeba sprawdzać'],'Niedozwolone przejście musi zostać odrzucone bez skutków ubocznych; sprawdzenie, że stan się nie zmienił, wyłapuje częściowo wykonane akcje.'],
  ['3 przeglądarki × 3 plany × 3 języki dają 27 kombinacji. Co obiecuje zestaw parami?',['Każda kombinacja trzech wartości jest testowana','Każda para wartości występuje w co najmniej jednym teście, zwykle przy znacznie mniejszej liczbie testów','Testowana jest tylko najpopularniejsza przeglądarka','Język nigdy nie ma znaczenia'],'Testowanie parami pokrywa wszystkie interakcje dwuskładnikowe, gdzie pojawia się większość defektów kombinacyjnych, za ułamek pełnego zestawu.'],
  ['Co jest słabością testowania parami?',['Nie da się go zautomatyzować','Wymaga więcej testów niż wszystkie kombinacje','Działa tylko dla liczb','Może przeoczyć defekt wymagający trzech lub więcej konkretnych wartości naraz'],'Testowanie parami pokrywa pary, nie trójki. Ryzykowne kombinacje dodawaj ręcznie.'],
 ]};

M['security-testing']={title:'Testowanie bezpieczeństwa dla QA',
 sum:'Spacer testera po OWASP Top 10:2025: trzymaj się zakresu, sprawdzaj nagłówki i ciasteczka, testuj autoryzację dwoma użytkownikami i oceniaj znaleziska.',
 sections:[
  ['Czego się nauczysz',UL(['Trzymać się zakresu: testować tylko to, co jest twoje lub do czego masz uprawnienia, i nigdy destrukcyjnie','Używać OWASP Top 10:2025 jako listy kontrolnej testera','Sprawdzać nagłówki bezpieczeństwa i flagi ciasteczek w teście automatycznym','Pisać test autoryzacji z dwoma użytkownikami (BOLA / IDOR)','Sprawdzać zależności i sekrety oraz oceniać znalezisko jako wpływ × prawdopodobieństwo'])],
  ['Najpierw zakres i bezpieczeństwo',`${UL(['Testuj tylko systemy, które są twoje lub na których testowanie masz pisemną zgodę. Nigdy nie testuj cudzych systemów ani produkcji bez niej.','Wybieraj środowisko stagingowe z kontami i danymi testowymi.','Sprawdzaj bezpiecznie: nieszkodliwe znaczniki i niewykonywalne ładunki. Bez ataków DoS, wycieku danych i prawdziwych płatności.','Uczciwie oznaczaj każdy wynik: <b>Confirmed</b> (odtworzone), <b>Suspected</b> (tylko przesłanki) lub <b>Not tested</b> (nie testowano).','Zgłaszaj sekrety przez miejsce i typ, nigdy przez wartość.'])}
${CO('risk','Ryzyko','Alert skanera to trop, nie znalezisko. Odtwórz go bezpiecznie albo zgłoś jako Suspected.')}`],
  ['OWASP Top 10:2025 jako lista kontrolna testera',`${T(['ID','Kategoria','Co bezpiecznie sprawdzić'],[
   ['A01','Błędna kontrola dostępu','Zmieniaj identyfikatory w URL-ach i ciałach żądań; otwieraj trasy administracyjne jako zwykły użytkownik; funkcje pobierania z URL (SSRF jest teraz tutaj)'],
   ['A02','Błędna konfiguracja zabezpieczeń','Domyślne konta, tryb debugowania, szczegółowe błędy, odsłonięte konsole, brakujące nagłówki'],
   ['A03','Awarie łańcucha dostaw oprogramowania','Niezablokowane lub niewspierane zależności, brak pliku lock, sekrety w CI (nowość w 2025)'],
   ['A04','Awarie kryptograficzne','HTTP zamiast HTTPS, tokeny w URL-ach, wrażliwe dane bez ochrony'],
   ['A05','Wstrzykiwanie','Nieszkodliwe znaczniki w danych wejściowych i miejsca, gdzie wracają: strony, zapytania, polecenia, szablony'],
   ['A06','Niebezpieczny projekt','Brak limitów żądań, pominięte kroki, ujemne ilości, kupony do wielokrotnego użycia'],
   ['A07','Awarie uwierzytelniania','Brak blokady, sesje niekończone przy wylogowaniu, wyliczanie użytkowników przez komunikaty błędów'],
   ['A08','Awarie integralności oprogramowania lub danych','Niepodpisane aktualizacje, niebezpieczna deserializacja, skrypty zewnętrzne bez kontroli integralności'],
   ['A09','Awarie logowania i alertów bezpieczeństwa','Czy logowania i odmowy dostępu są rejestrowane? Czy logi zawierają sekrety?'],
   ['A10','Niewłaściwa obsługa wyjątkowych sytuacji','Błędne, zbyt duże i ucięte dane: czy błędy „otwierają drzwi” albo ujawniają szczegóły wewnętrzne? (nowość w 2025)']])}
${CO('note','Kluczowa myśl','Edycja 2025 dodała A03 i A10 oraz włączyła fałszowanie żądań po stronie serwera (SSRF) do A01. Starsze raporty używają nazw z 2021 roku; „Vulnerable and Outdated Components” odpowiada A03. Aktualną listę sprawdź na owasp.org.')}`],
  ['Nagłówki i ciasteczka w teście',`<p>Przeglądarki włączają zabezpieczenia na podstawie nagłówków odpowiedzi, więc łatwo je zweryfikować.</p>
${T(['Nagłówek','Co robi'],[
   ['Content-Security-Policy','Ogranicza, skąd można ładować skrypty, ramki i inną zawartość; główna obrona przed XSS. Jego dyrektywa <code class="i">frame-ancestors</code> określa, kto może osadzać stronę, i zastępuje X-Frame-Options'],
   ['Strict-Transport-Security','Każe przeglądarkom używać wyłącznie HTTPS (ignorowany przez zwykły HTTP)'],
   ['X-Content-Type-Options: nosniff','Powstrzymuje przeglądarkę przed zgadywaniem typu pliku'],
   ['Referrer-Policy','Kontroluje, jaka część URL jest wysyłana do innych witryn'],
   ['Permissions-Policy','Wyłącza funkcje przeglądarki, których aplikacja nie używa']])}
${P(0)}
${CO('tip','Wskazówka','Brakujący nagłówek sam w sobie to zwykle Low lub Informational: oceniaj go przez to, co ujawnia. Sprawdzaj nagłówki, które uznałeś za wymagane, aby regresja była widoczna.')}`],
  ['Autoryzacja: dwóch użytkowników, jeden obiekt',`<p>Kontrola dostępu to najczęstsza poważna wada aplikacji webowych (OWASP A01 i BOLA na liście API). Testuj ją dwoma kontami: użytkownik A tworzy prywatny obiekt, a użytkownik B próbuje go odczytać, zmienić i usunąć.</p>
${P(0)}
<p>Powtórz dla aktualizacji i usunięcia, dla trasy tylko dla administratora używanej jako zwykły użytkownik (eskalacja pionowa) oraz dla drugiego najemcy. Moduł <a href="#api-testing">Testowanie API</a> opisuje ryzyka OWASP dla API dokładniej.</p>`],
  ['Zależności i sekrety',UL(['Uruchom audyt menedżera pakietów (<code class="i">npm audit</code>, <code class="i">pip-audit</code>, <code class="i">dotnet list package --vulnerable</code>) i porównaj z osv.dev. Nie nazywaj zależności podatną bez advisory.','Commituj pliki lock, przypinaj wersje i instaluj w CI przez <code class="i">npm ci</code>.','Skanuj repozytorium i jego historię pod kątem sekretów (na przykład gitleaks). Trzymaj pliki <code class="i">.env</code> poza Git.','Przypinaj zewnętrzne akcje CI i obrazy kontenerów do wersji lub digestu.','Traktuj wyciekły sekret jako skompromitowany: zrotuj go. Usunięcie commitu nie wystarczy.'])],
  ['Ocena znaleziska',`<p>Ten hub stosuje prostą konwencję: pomnóż <b>wpływ</b> (od 1 do 5) przez <b>prawdopodobieństwo</b> (od 1 do 5) i odczytaj przedział.</p>
${T(['Wynik','Waga'],[['20–25','Critical'],['12–19','High'],['6–11','Medium'],['2–5','Low'],['0–1','Informational']])}
<p>Cudze zamówienie do odczytania przez zmianę identyfikatora: wpływ 5 × prawdopodobieństwo 4 = 20, <b>Critical</b>. Brak Referrer-Policy w narzędziu wewnętrznym: 1 × 2 = 2, <b>Low</b>. Podnieś prawdopodobieństwo przy dostępności z internetu, obniż, gdy dostęp jest tylko z localhost lub inna kontrola już blokuje atak, i powiedz, jaką korektę zastosowano.</p>
${CO('note','Kluczowa myśl','Pewność (High, Medium, Low) podaje się osobno i nie zmienia wagi. Dla znanych podatności w cudzym oprogramowaniu użyj oceny CVSS z advisory zamiast własnej.')}`],
 ],
 quiz:[
  ['Skaner zgłasza możliwy SQL injection, a ty go nie odtworzyłeś. Jak to zgłosić?',['Confirmed, Critical','Zawsze Informational','Suspected, dopóki nie odtworzysz bezpiecznie','Nie warto zgłaszać'],'Przesłanka bez odtworzonego skutku to Suspected. Tylko odtworzona wada jest Confirmed.'],
  ['Użytkownik B żąda zamówienia użytkownika A po identyfikatorze i dostaje dane A z kodem 200. Która kategoria OWASP Top 10:2025 pasuje najlepiej?',['A02 Błędna konfiguracja zabezpieczeń','A05 Wstrzykiwanie','A01 Błędna kontrola dostępu','A10 Niewłaściwa obsługa wyjątkowych sytuacji'],'Odczyt cudzego obiektu przez zmianę identyfikatora to wada kontroli dostępu (BOLA / IDOR).'],
  ['Które dwie kategorie są nowe w OWASP Top 10:2025?',['Wstrzykiwanie i Niebezpieczny projekt','Błędna kontrola dostępu i Awarie kryptograficzne','Logowanie zabezpieczeń i SSRF','Awarie łańcucha dostaw oprogramowania i Niewłaściwa obsługa wyjątkowych sytuacji'],'A03 i A10 są nowe w 2025; SSRF włączono do A01.'],
  ['Który nagłówek odpowiedzi każe przeglądarkom używać wyłącznie HTTPS przy kolejnych wizytach?',['Strict-Transport-Security','Referrer-Policy','X-Content-Type-Options','Permissions-Policy'],'HSTS sprawia, że przeglądarka przechodzi na HTTPS. Przeglądarki ignorują go, gdy przyjdzie zwykłym HTTP.'],
  ['Wpływ 4 i prawdopodobieństwo 4 dają 16. Który to przedział wagi (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',['Low','Medium','Critical','High'],'4 × 4 = 16, to przedział 12–19: High.'],
  ['Ciasteczko sesji nie ma flagi HttpOnly. Na co to pozwala?',['Ciasteczko nie może być wysyłane przez HTTPS','Skryptom strony czytać ciasteczko, więc luka XSS może wykraść sesję','Innym witrynom osadzać stronę','Ciasteczko natychmiast wygasa'],'HttpOnly ukrywa ciasteczko przed JavaScriptem. Bez niego wstrzyknięty skrypt może odczytać i wykraść sesję.'],
 ]};

M['defect-reporting']={title:'Zgłoszenia defektów i raporty QA',
 sum:'Napisz defekt, który ktoś inny odtworzy, odróżniaj wagę od priorytetu, uczciwie oznaczaj dowody i kończ werdyktem wybranym według stałych reguł.',
 sections:[
  ['Czego się nauczysz',UL(['Pisać zgłoszenie defektu, które ktoś inny odtworzy bez dodatkowych pytań','Odróżniać wagę (severity) od priorytetu','Oznaczać każde twierdzenie jako Confirmed, Suspected lub Not tested','Wybierać końcowy status QA według stałych reguł','Układać raport tak, by decydent przeczytał go w dwie minuty'])],
  ['Defekt, który ktoś inny odtworzy',`<p>Zgłoszenie jest użyteczne, gdy programista, który nigdy nie widział problemu, może go odtworzyć wyłącznie z tekstu. Większości zgłoszeń, które wracają, brakuje tych samych kilku rzeczy.</p>
${T(['Pole','Co napisać'],[
   ['Tytuł','Co jest nie tak i gdzie, w jednej linii'],
   ['Środowisko','Przeglądarka i system, wersja aplikacji, konto testowe lub rola'],
   ['Warunki wstępne','Stan potrzebny przed krokiem 1'],
   ['Kroki','Ponumerowane i dokładne, od znanego stanu'],
   ['Oczekiwane / rzeczywiste','Oba, obok siebie'],
   ['Dowody','Zrzut ekranu, trace, żądanie i odpowiedź, linie logu: prawdziwe, z zamaskowanymi sekretami'],
   ['Powtarzalność','Zawsze, sporadycznie (jak często) lub nieodtworzone'],
   ['Waga i priorytet','Wpływ z uzasadnieniem; jak szybko naprawić']])}
${T(['Słabe','Lepsze'],[
   ['„Zamówienie nie działa”','„Zamówienie: przycisk Pay nic nie robi dla zapisanej karty Visa (Chromium, build 2.14.1)”'],
   ['„Czasem się wywala”','„Pada w 3 z 10 uruchomień; zawsze przechodzi, gdy koszyk ma jedną pozycję”'],
   ['„Powinno działać”','„Oczekiwane: strona potwierdzenia. Rzeczywiste: zostaje na płatności; konsola pokazuje HTTP 500 z /api/pay”']])}
${CO('tip','Wskazówka','Trace Playwrighta lub krótkie nagranie ekranu często zastępuje stronę opisu. Dołącz je.')}`],
  ['Waga i priorytet',`<p><b>Waga</b> (severity) to wpływ defektu, jeśli trafi do wydania. <b>Priorytet</b> to jak szybko należy go naprawić. Są powiązane, ale różne, i zwykle mają różnych właścicieli: QA proponuje wagę, właściciel produktu ustala priorytet.</p>
${T(['Waga','Znaczenie','Przykład'],[
   ['Critical','Utrata lub uszkodzenie danych, naruszenie bezpieczeństwa albo kluczowa ścieżka niemożliwa bez obejścia','Każdy zalogowany użytkownik może czytać zamówienia innych'],
   ['High','Główna funkcja zawodzi lub istnieje poważna słabość, a obejście jest trudne lub ryzykowne','Zamówienie nie działa dla jednej metody płatności'],
   ['Medium','Częściowa utrata funkcji albo realna słabość z obejściem lub ograniczoną ekspozycją','Filtr ignoruje jedno kryterium'],
   ['Low','Drobny defekt o znikomym wpływie','Etykieta jest przesunięta'],
   ['Informational','Obserwacja lub usprawnienie, nie defekt','Brakuje opcjonalnego nagłówka odpowiedzi']])}
${T(['Priorytet','Znaczenie'],[['P1','Naprawić przed wydaniem'],['P2','Naprawić w bieżącym cyklu'],['P3','Zaplanować'],['P4','Backlog']])}
${CO('note','Kluczowa myśl','Literówka w nazwie firmy na stronie głównej to Low pod względem wagi, ale P1 w przeddzień premiery. Awaria eksportu używanego raz w roku może mieć wagę High, ale tylko P3. Zawsze podawaj wagę z jednozdaniowym uzasadnieniem.')}`],
  ['Confirmed, Suspected, Not tested',`<p>Każde twierdzenie w raporcie nosi jedną z trzech etykiet, by czytelnicy wiedzieli, na ile mu ufać.</p>
${UL(['<b>Confirmed</b>: odtworzone, z dowodami, które można pokazać.','<b>Suspected</b>: są przesłanki, ale skutek nie jest dowiedziony. Alert skanera lub „zapach kodu” zaczyna się tutaj.','<b>Not tested</b>: nie sprawdzałeś tego. Powiedz o tym i dlaczego.'])}
<p>Trzy zasady utrzymują uczciwość raportów: brak dowodów nie jest dowodem braku; nigdy nie wymyślaj logów, wersji ani wyników; oddzielaj obserwacje od założeń. Oceniając znalezisko, użyj wpływu × prawdopodobieństwa jak w module <a href="#security-testing">Testowanie bezpieczeństwa dla QA</a>, a pewność podaj osobno.</p>`],
  ['Status końcowy',`<p>Zakończ raport QA jednym statusem wybranym według stałych reguł, aby dwie osoby czytające te same znaleziska doszły do tego samego werdyktu. Sprawdzaj reguły po kolei; pierwsza pasująca decyduje.</p>
${T(['Kolejność','Status','Kiedy stosować'],[
   ['1','FAIL','Jakiekolwiek Confirmed Critical lub High, albo kluczowa ścieżka użytkownika Confirmed zepsuta'],
   ['2','NOT ENOUGH EVIDENCE','Cel był niedostępny albo zweryfikowano zbyt mało, by wyciągnąć jakikolwiek wniosek'],
   ['3','PARTIALLY VERIFIED','Część zakresu jest zablokowana lub nietestowana, albo nierozstrzygnięte Suspected Critical lub High (i nic Confirmed Critical ani High)'],
   ['4','PASS WITH FINDINGS','Cały zakres zweryfikowano, otwarte zostały tylko znaleziska Medium, Low lub Informational'],
   ['5','PASS','Cały zakres zweryfikowano i nic powyżej Informational nie pozostaje otwarte']])}
${CO('risk','Ryzyko','Nigdy nie wybieraj PASS tylko dlatego, że nie znaleziono defektów. PASS wymaga zweryfikowania całego żądanego zakresu.')}`],
  ['Układ raportu',`<p>Werdykt stawiaj na początku. Czytelnik powinien móc zatrzymać się po pierwszej sekcji i nadal podjąć działanie.</p>
${T(['#','Sekcja','Co zawiera'],[
   ['1','Podsumowanie dla zarządu','Werdykt, trzy główne problemy i jeden następny krok'],
   ['2','Zakres i ograniczenia','Co sprawdzono, czego nie (i dlaczego), założenia, narzędzia'],
   ['3','Przegląd znalezisk','ID, waga, obszar, tytuł, pewność'],
   ['4','Szczegółowe znaleziska','Dowody, wpływ, proponowana poprawka, jak ją zweryfikować'],
   ['5','Co wyglądało zdrowo','Obszary sprawdzone bez uwag'],
   ['6','Rekomendacje','Uporządkowane według wagi i nakładu'],
   ['7','Testy uzupełniające','Negatywne, brzegowe i eksploracyjne'],
   ['8','Co jeszcze sprawdzić?','Luki warte drugiego spojrzenia']])}
${CO('tip','Wskazówka','Sekcja 5 ma znaczenie. Czysty obszar zgłoszony jako czysty mówi czytelnikom, gdzie mogą przestać się martwić. Do każdej proponowanej poprawki dodaj jej ryzyko, jak ją cofnąć i jak potwierdzić, że zadziałała.')}`],
 ],
 quiz:[
  ['Które stwierdzenie o wadze i priorytecie jest poprawne?',['Waga to jak szybko naprawić; priorytet to wpływ','Znaczą to samo','Waga to wpływ, jeśli defekt trafi do wydania; priorytet to jak szybko naprawić','Wagę ustalają wyłącznie programiści'],'Waga opisuje wpływ; priorytet to decyzja planistyczna. Defekt kosmetyczny może być pilny, a poważny może poczekać.'],
  ['Literówka w nazwie firmy na stronie głównej w przeddzień premiery to najlepiej…',['High waga, P4','Critical waga, P3','Informational, bez priorytetu','Low waga, P1'],'Wpływ jest mały (Low), ale czas czyni ją pilną (P1).'],
  ['Zgłoszenie mówi „Zamówienie czasem nie działa”. Jakiej informacji brakuje najbardziej?',['Kto to spowodował','Dokładnych kroków, środowiska, wyniku oczekiwanego i rzeczywistego oraz tego, jak często się zdarza','Dłuższego tytułu','Domysłu o przyczynie źródłowej'],'Powtarzalne kroki i kontekst pozwalają programiście zobaczyć problem. Obwinianie i zgadywanie nie.'],
  ['Odtworzyłeś lukę pozwalającą jednemu użytkownikowi czytać zamówienia drugiego. Jaka etykieta?',['Suspected','Not tested','Confirmed','Informational'],'Odtworzone znalezisko z dowodami to Confirmed.'],
  ['Cały zakres zweryfikowano; otwarte pozostały jedno Medium i dwa Low; nic High ani Critical. Jaki status?',['PASS','PARTIALLY VERIFIED','FAIL','PASS WITH FINDINGS'],'Cały zakres zweryfikowany i otwarte tylko Medium, Low lub Informational: reguła 4, PASS WITH FINDINGS.'],
  ['Jedna usługa była niedostępna, więc połowy zakresu nie przetestowano. Drugą połowę zweryfikowano bez Confirmed Critical ani High. Jaki status?',['PASS WITH FINDINGS','NOT ENOUGH EVIDENCE','PARTIALLY VERIFIED','PASS'],'Część zakresu to Not tested i nie ma Confirmed Critical ani High, więc działa reguła 3. Reguła 2 jest na sytuację, gdy zweryfikowano zbyt mało, by wnioskować.'],
 ]};

(TR.pl.glossary=TR.pl.glossary||[]).push(
 ['Tablica decyzyjna','Siatka kombinacji warunków i ich wyników; identyczne wiersze łączy się, by każdy odrębny wynik testować raz.'],
 ['Testowanie przejść stanów','Sprawdzanie dozwolonych i odrzucanych przejść między stanami, na przykład zamówienia od szkicu do zatwierdzonego.'],
 ['Testowanie parami','Pokrycie każdej pary wartości parametrów co najmniej raz zamiast każdej kombinacji; zestawy generują narzędzia takie jak PICT.'],
 ['Zgadywanie błędów','Dobór przypadków z doświadczenia, gdzie oprogramowanie zwykle się psuje: podwójne wysłanie, ogromne dane, wygasłe sesje.'],
 ['Karta testu (charter)','Jednozdaniowa misja ograniczonej czasowo sesji eksploracyjnej: zbadaj obszar, z użyciem zasobów, aby odkryć ryzyko.'],
 ['Content-Security-Policy','Nagłówek odpowiedzi ograniczający, skąd strona może ładować skrypty, ramki i inną zawartość; główna obrona przed XSS.'],
 ['Awaria łańcucha dostaw oprogramowania','OWASP Top 10:2025 A03: ryzyko od zależności, potoków budowania i dystrybucji, np. niezablokowane lub podmienione pakiety.'],
 ['Confirmed vs suspected','Etykiety dowodów w raporcie QA: Confirmed oznacza odtworzone z dowodami; Suspected tylko przesłanki.'],
);

TR.pl.exam.push(
 ['Hasło musi mieć od 8 do 64 znaków. Jakie długości tworzą zestaw brzegowy metodą trzech wartości?',['7, 8, 9 oraz 63, 64, 65','Tylko 8 i 64','1, 32, 100','0, 8, 64'],'Metoda trzech wartości testuje każdą granicę i obu jej sąsiadów.'],
 ['Co gwarantuje zestaw testów parami?',['Pokryta jest każda kombinacja trzech wartości','Znalezione są wszystkie defekty','Każda para wartości parametrów występuje w co najmniej jednym teście','Używane są tylko poprawne kombinacje'],'Testowanie parami pokrywa wszystkie interakcje dwuskładnikowe przy znacznie mniejszej liczbie testów niż pełny iloczyn.'],
 ['Tablica decyzyjna ma trzy warunki tak/nie. Ile jest kombinacji przed połączeniem identycznych wyników?',['3','8','6','9'],'2 × 2 × 2 = 8.'],
 ['Skaner oznaczył możliwy XSS, a tester go nie odtworzył. Jaka etykieta pasuje?',['Confirmed','Suspected','Fixed','Tylko Informational'],'Przesłanki bez odtworzonego skutku to Suspected.'],
 ['Który nagłówek odpowiedzi ogranicza, skąd strona może ładować skrypty?',['Referrer-Policy','Cache-Control','Content-Security-Policy','Accept-Language'],'Content-Security-Policy ogranicza źródła skryptów, ramek i innej zawartości.'],
 ['Wpływ 5 i prawdopodobieństwo 3 dają 15. Który to przedział (20–25 Critical, 12–19 High, 6–11 Medium, 2–5 Low)?',['Critical','High','Medium','Low'],'5 × 3 = 15, to przedział 12–19: High.'],
);
})();
