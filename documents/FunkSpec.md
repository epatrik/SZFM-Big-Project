# Funkcionális specifikáció

## Jelenlegi helyzet leírása

A megrendelő egy webes kérdőív alkalmazást szeretne ami lecseréli a jelenlegi kérdőívrendszert,
amelyet többen is jelezték, hogy elavultnak vagy nehezen kezelhetőnek találtak.
Jelenleg a felmérések papír alapon működnek, amit a munkahelyen osztanak ki a kitöltőknek.
A kérdőíveket szövegszerkesztőben hozzák létre, majd otthon vagy a munkahelyen nyomtatják ki,
utóbbi esetben hátráltatva a többi dolgozó munkáját a nyomtató hosszadalmas használatával.
A kérdőívek tollal töltődnek ki és általában 10-20 percet vesznek igénybe.
Kitöltés után a kitöltők beadják a papírjukat egy megadott helyre, amit majd az arra felelősek feldolgoznak.
Ha valami hibát vétettek a dolgozók kitöltés közben, akkor áthúzzák válaszukat és a helyeset
jelölik meg, ami nagyban megnehezíti a kérdőívek kiértékelését és az azokból
kinyert adatok feldolgozását.
A kiértékelés manuálisan végződik és csak azután rögzül elektronikus formában.

## Vágyálom rendszer

Az ideális kérdőívrendszer tulajdonságai:

- A rendszer lehetővé teszi a kérdőív sablonok létrehozását és testreszabását.
- Felhasználóbarát interfésszel rendelkezik a kérdőívek egyszerű és gyors létrehozásához.
- A kérdőíveket online platformon keresztül lehet terjeszteni a résztvevők számára.
- A résztvevők online platformon kitölthetik a kérdőíveket.
- A kérdőívek könnyen elérhetőek és kitöltésükhöz egyszerűen megtehető.
- A válaszokat a rendszer automatikusan rögzíti és tárolja adatbázisban.
- Az adatok biztonságosan tárolódnak és védettek a jogosulatlan hozzáférés ellen.
- A rendszer különböző szintű felhasználói jogosultságokat támogat.

## Követelménylista

| ID | Név | Kifejtés |
|----|-----|----------|
| K1 | Webes reszponzív design | A rendszer webes alapú és bármilyen böngészőből elérhető. |
| K2 | Felhasználói jogosultság | A rendszer különböző szintű felhasználói jogosultságokat támogat. |
| K3 | Egyszerű kezelhetőség | Könnyen felhasználható legyen a rendszer a felhasználók számára. |
| K4 | Adattárolás | A kérdőívekben adott válaszok adatbázisban tárolódnak. |
| K5 | Adatvédelem | Az adatok jogosulatlan hozzáférés elleni védelmének biztosítása. |
| K6 | Adatfeldolgozás | A rendszernek automatikusan kell feldolgoznia a beérkező válaszokat és létre kell hoznia elemzéseket. |
| K7 | Regisztráció/Bejelentkezés | A felhasználók regisztráció után be tudnak jelentkezni email címükkel. |
| K8 | Kérdőív létrehozás | A rendszernek rendelkeznie kell egy kérdőív szerkesztő felülettel a könnyű és gyors kérdőív készítéshez. |
| K9 | Teljesítmény | A rendszernek jó teljesítményt kell nyújtania még a nagy adatmennyiség kezelése esetén is. |
| K10 | Skálázhatóság | A rendszernek könnyen skálázhatónak kell lennie a növekvő felmérési igények kiszolgálásához. |

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

### Regisztráció

- A felhasználó létrehozza a saját felhasználói fiókját, az ahhoz tartozó felhasználónév és jelszó megadásával.
- Ha sikertelen a regisztráció, akkor a rendszer kiírja a megfelelő hibaüzenetet és újra lehet próbálkozni.

### Bejelentkezés

- A felhasználó megadja a bejelentkezési adatatait.
- Ha helyes a megadott jelszó és felhasználónév páros, akkor a rendszer tovább enged és sikeres a bejelentkezés.
- Ellenkező esetben kiírja a megfelelő hibaüzenetet.

### Kérdőív kitöltése

- A felhasználó választ a rendelkezésre álló kérdőívek közül.
- A kiválasztott kérdőívet kitölti a válaszadás módjának megfelelően.
- A kitöltés végeztével a mentés gombra kattintva tudja rögzíteni az adatokat.

## Képernyő tervek

![kepernyoterv1](img/kepernyoterv1.png)
![kepernyoterv2](img/kepernyoterv2.png)

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
