# Funkcionális specifikáció

## Jelenlegi helyzet leírása

## Vágyálom rendszer

## Követelménylista

## Jelenlegi üzleti folyamatok leírása

A felmérések elkészítése jelenleg lassú és költséges folyamat a következő lépésekkel:

1. Felhasználónak otthon kérdéseket kell összeállítania.
2. A kérdések összeállításához egy Word dokumentumot kell létrehoznia.
3. A dokumentumot kinyomtatnia.
4. Kézzel eljuttatnia a kérdőívet a felmérni kívánt közösséghez.
5. Visszagyűjtenie a kitöltött kérdőíveket.
6. Manuálisan összeszámolnia és összegeznie az egyes válaszokat.

Az új alkalmazás célja a folyamat jelentős leegyszerűsítése és hatékonyságának növelése.

## Igényelt üzleti folyamatok leírása

### 1. Felhasználói regisztráció és bejelentkezés

#### Felhasználói regisztráció

- Felhasználók a következő információkat adják meg a regisztráció során: név, e-mail cím és jelszó.
- Az alkalmazásnak ellenőriznie kell az e-mail cím formátumát és egyediségét a rendszerben.
- A jelszónak megfelelő erősségűnek kell lennie, és a jelszóváltoztatás lehetőségének kell lennie.

#### Bejelentkezés

- Regisztrált felhasználók bejelentkezhetnek az alkalmazásba a megadott e-mail cím és jelszó segítségével.
- A bejelentkezés során az alkalmazásnak ellenőriznie kell a hitelesítő adatok helyességét.

### 2. Kérdőív létrehozása

- Felhasználók létrehozhatnak új kérdőíveket az alkalmazásban.
- Lehetőség van címek, leírások és egyéb metaadatok hozzáadására a kérdőívekhez.
- Felhasználók különböző típusú kérdéseket adhatnak hozzá a kérdőívekhez, például egyszerű szöveges vagy választási lehetőségekkel rendelkező.

### 3. Kérdőív kitöltése

- Felhasználók kitölthetik a létrehozott kérdőíveket.
- Az alkalmazásnak támogatnia kell a válaszok rögzítését.

### 4. Kérdőívek megosztása

- Felhasználók megoszthatják a létrehozott kérdőíveket más felhasználókkal vagy külső személyekkel.
- Az alkalmazásnak biztosítania kell lehetőségeket a megosztásra, beleértve a hozzáférési jogosultságokat és a megosztási linkeket.

### 5. Kérdőívek értékelése és elemzése

#### Kérdőívek értékelése

- Felhasználók és adminisztrátorok képesek kell legyenek megtekinteni a kitöltött kérdőíveket.

#### Kérdőívek elemzése

- Az alkalmazásnak statisztikai információkat is kell biztosítania, amelyek segítik a kérdőívek teljesítményének értékelését.

### 6. Felhasználói profilok kezelése

- Felhasználóknak lehetősége van módosítani a saját profiljukat, beleértve a jelszóváltoztatást és a profilinformációk frissítését.

### 7. Biztonság és adatvédelem

- Az alkalmazásnak megfelelő biztonsági intézkedéseket kell biztosítania a felhasználói adatok védelme érdekében. Ideálisan a jelszavakat biztonságosan kell tárolni és az adatok titkosítását kell alkalmazni.

### 8. Adminisztratív funkciók

- Adminisztrátoroknak lehetőséget kell adni a kérdőívek moderálására.
- Az alkalmazásnak nyomon kell követnie a felhasználók tevékenységét és a kérdőívek teljesítményét adminisztratív célokra.

## Használati esetek
### Regisztráció:
- A felhasználó létrehozza a saját felhasználói fiókját, az ahhoz tartozó felhasználónév és jelszó megadásával.
- Ha sikertelen a regisztráció, akkor a rendszer kiírja a megfelelő hibaüzenetet és újra lehet próbálkozni. 
### Bejelentkezés:
- A felhasználó megadja a bejelentkezési adatatait.
- Ha helyes a megadott jelszó és felhasználónév páros, akkor a rendszer tovább enged és sikeres a bejelentkezés.
- Ellenkező esetben kiírja a megfelelő hibaüzenetet.
### Kérdőív kitöltése:
- A felhasználó választ a rendelkezésre álló kérdőívek közül.
- A kiválasztott kérdőívet kitölti a válaszadás módjának megfelelően.
- A kitöltés végeztével a mentés gombra kattintva tudja rögzíteni az adatokat.

## Képernyő tervek
TODO

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