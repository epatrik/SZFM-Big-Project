# Rendszerterv

## A rendszer célja

## Projektterv

## Üzleti folyamatok modellje

## Követelmények

## Funkcionális terv

## Fizikai Környezet

### Szerverek

Az alkalmazás szervereket használ a működéshez. Ezek a szerverek lehetnek fizikai gépek egy adatközpontban vagy virtuális szerverek a felhőben. Az alkalmazásnak redundáns szerverekkel kell rendelkeznie, hogy minimalizálja az esetleges kieséseket és biztosítsa a folyamatos rendelkezésre állást.

### Felhasználói Eszközök

A felhasználók különböző eszközökről használják az alkalmazást, ideértve számítógépeket, okostelefonokat és tableteket. Az alkalmazásnak responszív tervezést kell alkalmaznia, hogy különböző képernyőméretek és felbontások esetén is jól működjön. Fontos a platformfüggetlen kompatibilitás is.

### Internetkapcsolat

A felhasználók internetkapcsolatot használnak az alkalmazás eléréséhez és használatához. Az alkalmazásnak el kell készítenie a rossz internetkapcsolatokra vonatkozó stratégiákat, például gyenge sávszélesség vagy időszakos kapcsolatvesztés esetén is működnie kell.

### Operációs Rendszer

Az alkalmazásnak több operációs rendszeren is működnie kell, például Windows, Linux, macOS és különböző mobil operációs rendszerek. Ezért a rendszertervnek meg kell határoznia az operációs rendszerekkel való kompatibilitást és azokon való futtatás módját.

### Biztonság

Az alkalmazásnak magas szintű biztonsági intézkedéseket kell alkalmaznia, különösen a felhasználói adatok védelme érdekében. Erős jelszavakat kell követelnie a felhasználóktól, és titkosítási technológiákat kell alkalmaznia az adatok védelmére. Rendszeres biztonsági frissítések és ellenőrzések szükségesek.

## Absztrakt Domain Modell

## Architektúrális terv

## Tesztterv

1. Bevezetés

    A tesztterv célja, hogy biztosítsa a kérdőív alkalmazás megfelelő működését, az összes funkcionalitás és követelmény szerint.
    A tesztek a következő területekre összpontosítanak:
    - Általános funkcionalitás tesztelése.
    - Felhasználói felület tesztelése.
    - Adatbázis működésének tesztelése.
    - Biztonsági tesztek.

2. Tesztelendő Funkciók

    2.1 Általános Funkcionalitás
    - A kérdőív kitöltése és az eredmények megjelenítése.
    - Kérdőív létrehozás funkció tesztelése.
    - Kérdések véletlenszerű megjelenítésének ellenőrzése.

    2.2 Felhasználói Felület
    - A felhasználói felület általános használhatóságának tesztelése.
    - A képernyők megfelelő megjelenítésének és navigációjának ellenőrzése.
    - Kérdőív választásának tesztelése.
    - Bejelentkezési felület tesztelése.

    2.3 Adatbázis
    - Kérdőívek megfelelő tárolásának tesztelése.
    - Kitöltött kérdőívek megfelelő tárolásának tesztelése.
    - Felhasználói adatok megfelelő tárolásának tesztelése.

    2.4 Biztonság
    - Biztonsági tesztek végrehajtása az adatbázis és a felhasználói adatok védelme érdekében.

3. Tesztek Futtatása

    Minden tesztesetet végre kell hajtani a fejlesztés és az alkalmazás kiadása előtt.
    A tesztek függetlenek kell legyenek egymástól, és egymás után is futtathatók, hogy külön-külön és együtt is tesztelhessük a rendszert.

4. Teszteredmények Rögzítése

    A tesztek futtatása során rögzíteni kell az eredményeket, beleértve a sikeres és sikertelen teszteseteket is.
    A hibákat és problémákat dokumentálni kell, hogy a fejlesztők kijavíthassák azokat.

5. Hibajavítás és Újraellenőrzés

    A tesztek eredményeinek alapján a talált hibákat javítani kell, majd újraellenőrizni a rendszert a javítások után.

6. Elfogadási Teszt

    Az elfogadási teszt során az alkalmazást a végfelhasználók is tesztelik, és visszajelzéseik alapján lehetőség szerint további javításokat végeznek.
