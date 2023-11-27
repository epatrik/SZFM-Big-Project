# Test log

| ID | Dátum | Tesztelő | Teszt leírása | Várt eredmény | Kapott eredmény | Átment/Megbukott |
|----|-------|----------|---------------|---------------|-----------------|------------------|
|1|11/26|Vadon Dániel|Kérdőív lista gomb megnyomása|Megnyílik a /list oldal|Megnyílt a /list oldal|Átment|
|2|11/26|Vadon Dániel|/list oldal megnyitása|Megjelennek a kérdőívek|Megjelentek a kérdőívek|Átment|
|3|11/26|Vadon Dániel|/list kérdőívek sorrendje|kérdőívek legújabbtól kezdve jelennek meg|kérdőívek legújabbtól kezdve jelentek meg|Átment|
|4|11/26|Vadon Dániel|/list kérdőívek szűrése|csak a nyilvános kérdőívek jelennek meg|csak a nyilvános kérdőívek jelentek meg|Átment|
|5|11/26|Vadon Dániel|/list kérdőívek szűrése|csak a aktív kérdőívek jelennek meg|csak az aktív kérdőívek jelentek meg|Átment|
|6|11/26|Vadon Dániel|/list kérdőívek megjelenítése|kérdőívek címe megjelenik|kérdőívek címe megjelent|Átment|
|7|11/26|Vadon Dániel|/list kérdőívek hivatkozása|a megfelelő kérdőív linkre hivatkozik|a megfelelő kérdőív linkre hivatkozott|Átment|
|8|11/26|Vadon Dániel|/questionnaire megnyitása|megjelenik egy kérdőív|megjelent egy kérdőív|Átment|
|9|11/26|Vadon Dániel|/questionnaire kérdőív ellenőrzése|a /id alapján indikált kérdőív jelenik meg|a /id alapján indikált kérdőív jelent meg|Átment|
|10|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|annyi kérdés jelenik meg amennyi a kérdőívhez tartozik|annyi kérdés jelent meg amennyi a kérdőívhez tartozik|Átment|
|11|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|azok a kérdések jelennek meg, melyek az adott kérdőívhez tartoznak|azok a kérdések jelentek meg, melyek az adott kérdőívhez tartoznak|Átment|
|12|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|kérdések típusa megfelelő|kérdések típusa megfelelő|Átment|
|13|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|választható opciók megjelennek|választható opciók megjelentek|Átment|
|14|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|a megfelelő választható opciók jelennek meg|a megfelelő választható opciók jelentek meg|Átment|
|15|11/26|Vadon Dániel|/questionnaire oldal navigálása|Tab gombbal navigálás kérdések között|Tab gomb navigál a kérdések között|Átment|
|16|11/26|Vadon Dániel|/questionnaire kitöltés|több opciónál nincs semmi eredetileg kiválasztva|több opciónál nem volt semmi eredetileg kiválasztva|Átment|
|17|11/26|Vadon Dániel|/questionnaire kitöltés|szám mezőbe nem lehet mást írni|szám mezőbe nem lehetett mást írni|Átment|
|18|11/26|Vadon Dániel|/questionnaire kérdések ellenőrzése|helyesen jelölve vannak a kötelezően kitöltendő kérdések|helyesen jelölve voltak a kötelezően kitöltendő kérdések|Átment|
|19|11/26|Vadon Dániel|/questionnaire kitöltés|Kötelezőnek megjelölt kérdések kitöltése nélkül nem lehet beküldeni a kitöltött kérdőívet|Kötelezőnek megjelölt kérdések kitöltése nélkül nem lehetett beküldeni a kitöltött kérdőívet|Átment|
|20|11/26|Vadon Dániel|/questionnaire kitöltés|Nyilvános kérdőívekre válaszokat többször is be lehet küldeni|Nyilvános kérdőívekre válaszokat többször is be lehetett küldeni|Átment|
| 21 | 11/26 | Csepreghy Tamás | Kérdőív listában megváltozik-e a gombok háttere, ha rajta van a kurzor | Megváltozik a háttérszín | Megváltozott a háttérszín | Átment |
| 22 | 11/26 | Csepreghy Tamás | A kérdőív listában a kezdőlap gombra kattintva visszajutunk-e a kezdőlapra | Visszajutunk a kezdőlapra | Visszajutottunk a kezdőlapra | Átment |
| 23 | 11/26 | Csepreghy Tamás | A kérdőív készítés nem jelenik meg, ha nincs bejelentkezve a felhasználó | Nem jelenik meg | Nem jelent meg | Átment |
| 24 | 11/26 | Csepreghy Tamás | A kérdőív listában a header fixált pozícióban marad-e | Fixált pozícióban marad | Fixált pozícióban maradt | Átment |
| 25 | 11/26 | Csepreghy Tamás | Kérdőív kitöltésekor lehet-e szöveget megadni számot váró válaszhoz | Nem lehet | Nem lehetett | Átment |
| 26 | 11/26 | Csepreghy Tamás | Bejelentkezéskor hibás adatok esetén a megfelelő hibaüzenet jelenik-e meg | Igen | Igen | Átment |
| 27 | 11/26 | Csepreghy Tamás | Bejelentkezéskor helyes adatok esetén visszakerülünk a kezdőlapra bejelentkezve | Igen | Igen | Átment |
| 28 | 11/26 | Csepreghy Tamás | Bejelentkezve láthatjuk a saját kérdőíveinket | Igen | Igen | Átment |
| 29 | 11/26 | Csepreghy Tamás | A saját kérdőíveinkre mozgatva a kurzort megváltozik a háttérszínük | Megváltozik a háttérszínük | Megváltozott a háttérszínük | Átment |
| 30 | 11/26 | Csepreghy Tamás | A saját kérdőívünkre kattintva megnyílik a kérdőív eredmény táblázata | Megnyílik a táblázat | Megnyílt a táblázat | Átment |
| 31 | 11/26 | Csepreghy Tamás | A kérdőív eredmény táblázata helyes adatokat tartalmaz | Igen | Igen | Átment |
| 32 | 11/26 | Csepreghy Tamás | A bejelentkezés felületről át lehet térni a regisztrációs felületre | Igen | Igen | Átment |
| 33 | 11/26 | Csepreghy Tamás | A regisztrációs felületről át lehet réni a bejelentkezési felületre | Igen | Igen | Átment |
| 34 | 11/26 | Csepreghy Tamás | Ha üresen hagyjuk a kitöltendő mezőket regisztráció során, akkor a megfelelő hibaüzenetet jeleníti meg az oldal | Igen | Igen | Átment |
| 35 | 11/26 | Csepreghy Tamás | Ha már foglalt a megadott felhasználónév, akkor a megfelelő hibaüzenetet jeleníti meg az oldal | Igen | Igen | Átment |
| 36 | 11/26 | Csepreghy Tamás | A kérdőív készítés felülete reszponzívan jelenik meg különböző méretű kijelzőn | Igen | Igen | Átment |
| 37 | 11/26 | Csepreghy Tamás | Bejelentkezéskor hiányos adatok esetén a megfelelő hibaüzenet jelenik meg | Igen | Igen | Átment |
| 38 | 11/26 | Csepreghy Tamás | A kijelentkezés gomb működik és a kezdőfelületre kerül vissza az oldal | Igen | Igen | Átment |
| 39 | 11/26 | Csepreghy Tamás | A kérdőív készítés során, sok kérdés esetén nem csúsznak ki a kérdések a keretből | Igen | Igen | Átment |
| 40 | 11/26 | Csepreghy Tamás | Ha egy kérdést nem kötelező kitölteni, akkor azt üresen hagyva is beküldhető az eredmény | Igen | Igen | Átment |
