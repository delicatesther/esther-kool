import Image from "next/image";
import { Layout } from "@enk/components/Layout";
import pigPic from "../public/images/varken.jpeg";
import babyPic from "../public/images/baby.jpeg";

export default function AlexPage(props) {
  return (
    <Layout>
      <div className="row-spacing-bottom">
        <div className="illustrationContainer" style={{ gridColumnEnd: "span 3" }}>
          <Image src={pigPic} alt="varkentje" width={332} height={184} className="illustration" />
        </div>
        <h1 className="bruksanvisnung" style={{ gridColumn: "span 3" }}>
          bruksanvisnung alex
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;kool
        </h1>
      </div>
      <div className="row-spacing-bottom">
        <div className="two-cols">
          <h2 className="bruksanvisnung">Luiers</h2>
          <p>
            We verschonen Alex voor ieder flesje en/of wanneer dat duidelijk nodig is (gebruik van de neus geadviseerd,
            maar voorzichtigheid is geboden).
          </p>
          <p>
            Meestal heeft ze maar één (indrukwekkende) poepluier per dag, maar mocht dat wat afwijken is het niet
            zorgwekkend.
          </p>
          <h2 className="bruksanvisnung">honger!</h2>
          <div className="illustrationContainer">
            <Image src={babyPic} alt="baby" width={201} height={180} className="illustration" />
          </div>
          <p>Alex wordt gevoed op verzoek. Overdag komt dat neer op grofweg om de vier uur (give or take).</p>
          <p>
            Voorheen maakte we een flesje van 210ml klaar (incl melkpoeder wordt dat 240ml), maar de laatste tijd drinkt
            ze erg slecht.
          </p>
          <p>
            Ze lijkt op papa en mama is is makkelijk afgeleid. De grootste kans op succes heb je als er weinig
            afleidingen zijn, dus radio/TV uit en niet teveel activiteit om haar heen.
          </p>
          <p>
            We maken nu een flesje van 180ml klaar (die niet op komt). Het komt nog een enkele keer voor dat ze om
            d&#39;r oude hoeveelheid vraagt en dan maken we gewoon wat meer klaar, maar schrik niet als ze totaal niet
            wil drinken. Gewoon later nog eens proberen.
          </p>
          <p>
            Ze geeft meestal duidelijk aan wanneer ze klaar is met drinken (dan duwt ze de fles weg of vertikt ze het
            haar mond open te doen als je de fles weer aanbiedt). Overblijfsel gooien we weg.
          </p>
          <h2 className="bruksanvisnung">Flesje klaarmaken</h2>
          <p>
            Qua melkpoeder: we geven nu Albert Heijn fase 1 Bio, simpelweg omdat de reguliere variant momenteel niet te
            krijgen is. Ze drinkt echter op het KDV Nutrilon en ook bij de switch van &quot;normale&quot; AH melkpoeder
            naar Bio merkten we geen verschil. Zolang het maar melkpoeder voor babies is, vindt ze het best.
          </p>
          <p>
            Op de verpakking van het melkpoeder kan je lezen wat de verhouding schepjes tot water is. Als je bij ons
            thuis oppast kan je gebruik maken van de Brezza, die doet dat voor je. Zie onderstaand kopje
            &quot;Brezza&quot;.
          </p>
          <p>Johannesbroodpitmeel kan je vergeten, dat geven we niet meer.</p>
          <h3>Brezza</h3>
          <p>
            De Baby Brezza is de &quot;Senseo&quot; voor melkflesjes. Hier zet je simpelweg een flesje onder, je drukt
            op de &quot;▶&quot; knop en er komt een perfect gemengd flesje uit op de juiste temperatuur.
          </p>
          <p>
            Om die vier flesjes wil hij dat je de trechter onderdelen even afwast anders doet hij het niet meer. Dan
            licht er een trechtertje met het woordje &quot;clean&quot; op. Het zijn de donkergrijs doorschijnende
            onderdelen (twee onderdelen), die kan je er uit klikken en schuiven. Veeg het stuk van het apparaat waar ze
            vandaan kwamen even met een droge (!) doek of stuk keukenpapier af. Ook de trechterstukken moeten na het
            afwassen goed afgedroogd zijn voor je ze weer terugklikt.
          </p>
          <p>
            De Brezza warmt ook water in het reservoir op de achterzijde op tot perfecte baby-melktemperatuur. Om
            koppijn te voorkomen vullen we dit reservoir altijd bij als we ook de trechteronderdelen afwassen. Zo kom je
            nooit in een nog-opwarmend-apparaat-terwijl-Alex-huilt situatie.
          </p>
          <p>
            De &quot;ml&quot; knop is er om de hoeveelheid melk in te stellen, mocht je een kleiner- of groter flesje
            willen.
          </p>
          <p>
            Wanneer de bovenkant van het oranje zwieperonderdeel in het melkpoederreservoir zichtbaar worden, moet er
            nieuw melkpoeder in.
          </p>
          <p>
            De rest kun je allemaal vinden in de{" "}
            <a
              href="https://cdn.shopify.com/s/files/1/1465/2384/files/FPA_IM_EU_DUTCH_190617_45b81ddb-c689-4799-878a-ffccc027da57.pdf?45322"
              rel="noreferrer noopener"
              target="_blank">
              handleiding
            </a>{" "}
            (ook te vinden op de onderste plank van de eikenhouten kast in de keuken). Mocht je van melkpoedertype
            switchen kun je{" "}
            <a href="https://babybrezza.eu/pages/formula-pro-settings" target="_blank" rel="noreferrer noopener">
              hier
            </a>{" "}
            de instellingen vinden.
          </p>
          <h2 className="bruksanvisnung">Oefenhapjes</h2>
          <p>
            Twee keer per dag geven we Alex oefenhapjes om te wennen aan echt eten. (Voor zover je gemagnetreerde
            wortelprut met roerei uit de blender als echt eten kan beschouwen...)
          </p>
          <p>
            Oefenhapjes krijgt ze alleen als ze geen honger heeft. Ze zijn er echt voor bedoeld om te wennen, de fles
            blijft haar echte bron van voedingstoffen. Na haar flesje in de ochtend en na haar flesje rond het avondeten
            mag ze happen.
          </p>
          <p>
            Omdat ze momenteel wat slecht drinkt, krijgt ze per sessie max drie hapjes. Prut uit potjes is prima, zolang
            er maar duidelijk opstaat dat het voor 4+ maanden is en het niet te warm is. Ook kan je wat banaan prakken
            of pompoen stomen en prakken (als je je erg gemotiveerd voelt).
          </p>
          <p>
            Om voedselallergie te voorkomen moet ze wekelijks ook pindakaas en ei krijgen. Dit doen we standaard op
            zondag, dus de rest van de week hoef je daar niet over na te denken. Mocht je op zondag oppassen, vraag dan
            ff naar details.
          </p>
          <h2 className="bruksanvisnung">Moe!</h2>
          <p>
            Als Alex begint te staren, gapen en haar oogjes half dichtvallen weet je het zeker: ze is moe. (Meestal na
            een uur of twee wakker zijn).
          </p>
          <p>
            We hijsen haar dan in een slaapzakje en leggen haar op bed met een knuffeltje en/of een speen. Overdag in
            het ledikant op haar kamer, &#39;s nachts in de co-sleeper op onze slaapkamer. Met de babymonitor houden we
            haar dan in de gaten.
          </p>
          <p>
            Slapen is stoooom, dus meestal is er protest. Als ze een beetje verontwaardigd schreeuwt kan je het nog
            negeren, maar als ze echt huilt moet ze getroost worden.
          </p>
          <p>
            Het liefst kijken we eerst even of dit lukt terwijl ze in bed ligt. Vaak is het bij huilen echter al zo dat
            er wat rondgewandeld met haar moet worden. Soms gaat het echt niet en komt ze weer mee naar beneden.
          </p>
          <h2 className="bruksanvisnung">Rollen</h2>
          <p>
            Alex heeft nu door hoe ze van haar rug naar haar buik rolt en dit doet ze dan ook CONSTANT. Het probleem is
            alleen: terugrollen heeft ze nog niet zo goed door.
          </p>
          <p>
            Als Alex de ruimte heeft (en dit heeft ze bijvoorbeeld al in de co-sleeper) dan is de kans groot dat ze op
            haar buik rolt. Grofweg 10-30 seconden later begint ze te protesteren. Rol haar toch maar weer terug, het is
            zo lullig als ze te moe wordt om haar hoofd te blijven optillen en stikt in het boxkleed/d&#39;r
            matras/whatever.
          </p>
          <p>
            Let dus ook echt even goed op als ze in haar bed ligt. Als ze wakker wordt heb je kans dat je haar even moet
            redden.
          </p>
        </div>
      </div>
    </Layout>
  );
}
