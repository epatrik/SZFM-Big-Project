# Követelmény specifikáció

## Jelenlegi helyzet leírása

## Vágyálom rendszer

## Jelenlegi üzleti folyamatok leírása

Jelenleg ha valaki egy felmérést szeretne végezni egy kérdőívvel

1. Otthon külön össze kell írnia kérdéseket
1. Word dokumentumban összeállítani egy saját kérdéssort
1. Kinyomtatni a dokumentumot
1. Eljuttatni a kérdőívet a felmérni kivánt közösséghez
1. Összegyűjteni a kitöltött kérdőíveket
1. Összeszámolni és összegezni egyesével a válaszokat

Ez egy lassú, hosszadalmas és költséges folyamat, melyet egy alkalmazás jelentősen leegyszerüsítene.

## Igényelt üzleti folyamatok leírása

1. **Felhasználói regisztráció és bejelentkezés:**
   - Felhasználók regisztrálhatnak az alkalmazásba, megadva az alapvető információkat, mint például név, e-mail cím és jelszó.
   - Regisztrált felhasználók bejelentkezhetnek az alkalmazásba a megadott hitelesítő adatokkal.

2. **Kérdőív létrehozása:**
   - Felhasználók létrehozhatnak új kérdőíveket az alkalmazásban.
   - A kérdőívekhez hozzá lehet adni címeket, leírásokat és egyéb metaadatokat.
   - Lehetőség van különböző típusú kérdések hozzáadására, például egyszerű szöveges vagy választási lehetőségekkel.

3. **Kérdőív kitöltése:**
   - Felhasználók kitölthetik a létrehozott kérdőíveket.
   - Az alkalmazásnak támogatnia kell a válaszok rögzítését.

4. **Kérdőívek megosztása:**
   - Felhasználók megoszthatják a létrehozott kérdőíveket más felhasználókkal vagy külső személyekkel.
   - Meg kell adni lehetőségeket a megosztásra, például a hozzáférési jogosultságokat és a megosztási linkeket.

5. **Kérdőívek értékelése és elemzése:**
   - Felhasználók és adminisztrátorok képesek kell legyenek megtekinteni és elemezni a kitöltött kérdőíveket.
   - Az alkalmazásnak statisztikai információkat is biztosítania kell.

6. **Felhasználói profilok kezelése:**
   - Felhasználók módosíthatják a saját profiljukat, beleértve a jelszóváltoztatást és a profilinformációk frissítését.

7. **Biztonság és adatvédelem:**
   - Az alkalmazásnak megfelelő biztonsági intézkedéseket kell biztosítania a felhasználói adatok védelme érdekében.

8. **Adminisztratív funkciók:**
   - Adminisztrátoroknak lehetőség kell adni a kérdőívek moderálására és a felhasználók kezelésére.
   - A felhasználók tevékenységének és a kérdőívek teljesítményének nyomon követésére szolgáló eszközök is szükségesek.

## Követelménylista

## A rendszerre vonatkozó szabályok
   - A web felület szabványos eszközökkel készüljön: html/css/js. 
   - A képek jpeg és png formátumúak lehetnek. 
   - A felhasználókat azonosító web oldalak esetében szükséges jogszabályokat be kell tartani: GDPR.
   - A kinézet legyen igényes, és egyszerűen átlátható.
   - A rendszer bíztosítsa a kérdőívet kitöltő személy teljes anonimítását.

## Fogalomszótár
   1. **Kérdőív**: Több azonos témájú kérdésből álló űrlap, melyet a felhasználó tölt ki.
   2. **HTML** - angolul: **HyperText Markup Language**, egy leíró nyelv, melyet weboldalak készítéséhez fejlesztettek ki.
   3. **CSS** - **Cascading Style Sheets**, a számítástechnikában egy stílusleíró nyelv, mely a HTML vagy XHTML típusú strukturált dokumentumok megjelenését írja le.
   4. **JavaScript** - programozási nyelv, egy objektumorientált szkriptnyelv, amelyet weboldalakon elterjedten használnak.
   5. **HTTPS** - **HyperText Transfer Protocol Safe** egy URI-séma, amely *biztonságos* http kapcsolatot jelöl.
   6. **Kliens** - olyan számítógép vagy azon futó program, amely hozzáfér egy (távoli) szolgáltatáshoz, amelyet egy *számítógép-hálózathoz* tartozó másik számítógép (*szerver*) nyújt.
   7. **GDPR**: A **GDPR** a **General Data Protection Regulation** kezdőbetűiből képzett mozaikszó. 2018 májusától lépett életbe az EU 28 tagállamában, így Magyarországon is, és alapjaiban forgatta fel a korábbi adatvédelmi rutint. Nem véletlen, hogy a legszigorúbb rendeletek között tartják számon. A **NAIH** (Nemzeti Adatvédelmi Hivatal) akár 20 millió euróig (6 milliárd Ft) terjedő büntetést is kiszabhat azokra, akik nem tartják be az adatvédelmi szabályokat.
   8. **Adatfeldolgozás** - Az a folyamat mely során az adat feldolgozásra kerül.
   9. **Felhasználói felület** - A rendszer azon elemei, mely közvetlenül a felhasználóval lépnek interakcióba.