npm run watch-users
npm run watch-db
npm run watch-orders
npm run dev

Personlig reflektion av projektet
Detta projektet var lite av en utmaning för mig, givet att jag på grund av personliga skäl missade ett par undervisningstillfällen. För att lösa uppgiften behövde jag därför ta till mig information om framförallt REACT och localstorage via internet och mina klasskamrater. Detta medförde att jag vid projektets start inte var helt säker på vilken struktur jag skulle ha på logiken.

Jag började givetvis med Figma där jag designade appens gränssnitt, så här i efterhand borde jag gjort samma sak med logiken. Alltså strukturerat upp den och haft en tydlig roadmap för vart jag skulle börja och vilka hooks som behövdes. Jag bestämde mig tidigt för att jag ville använda mig av context i appen, men när jag efter många timmars arbete inte såg någon användning för detta så kastade jag bort den hooken. I slutet av projektets gång arbetade jag med favoriter och upptäckte då att context hade hjälpt mig väldigt mycket, på så sätt att den hade kunnat hålla statet av mina favoriter över flera olika komponenter. Vid den tiden var det dock för sent att skriva om hela min "back end" och göra om all logik för att inkorporera detta. Därför skulle det hjälpt mig väldigt mycket att ha gjort en figma-liknande skiss av logiken redan från början.

Nu löste jag detta problemet istället genom att force reloada, sidan när jag stänger ner favorit popupen, inte lika snyggt men det fungerar.

Som vanligt har jag varit väldigt dålig på att kommentera min kod, jag tror det beror på att jag ofta hamnar i ett stim och bara kör tills logiken funkar, och vid det laget har jag själv inte alltid koll på vad jag gjort eller vilket som körs beroende på vad. Även i detta hade struktur kunnat vara behjälpligt. Om jag kommenterat ut vad jag vill ha gjort och stakat upp det i steg hade jag löst båda problemen på en gång.

Min CSS är kladdig, men enligt mitt tycke rätt snygg (och det är ju hela poängen). Jag tror jag lyckats få sidan att vara reaktiv, när jag minskar sidans bredd fungerar allt som jag vill och sidan ser mobilanpassad ut. När jag däremot kollar via chromes inspektera läge så dyker det upp ett vitt utrymme bredvid appen, men denna syns som sagt aldrig i praktiken och min body täcker hela apparatens bredd och längd.

Summering:
Projektet har utmanat mig, jag har slitit mitt hår och kollat lösningar på alla möjliga ställen, framförallt vad gäller favorites, men jag har samtidigt lärt mig väldigt mycket och fått en helt annan uppskattning för att designa gränssnitt och att koda i React. Till slut blev det väldigt bra och jag är nöjd med mitt arbete och hur jag tog mig an det. Under sommarledigheten tror jag att jag kommer ägna mig åt att bygga en riktig back-end för appen, det ska bli kul!