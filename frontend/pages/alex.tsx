import Image from "next/image";
import { Layout } from "@enk/components/Layout";
import pigPic from "../public/images/varken.png";
import babyPic from "../public/images/baby.png";

export default function AlexPage(props) {
  return (
    <Layout>
      <div className="row-spacing-bottom">
        <div className="illustrationContainer" style={{ gridColumnEnd: "span 3" }}>
          <Image src={pigPic} alt="varkentje" width={500} height={279} className="illustration" />
        </div>
        <h1 className="bruksanvisnung" style={{ gridColumn: "span 3" }}>
          bruksanvisnung alex
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;kool
        </h1>
      </div>
      <div className="row-spacing-bottom cms">
        <div className="two-cols">
          <h2 className="bruksanvisnung">honger!</h2>
          <div className="illustrationContainer" style={{maxWidth: "200px"}}>
            <Image src={babyPic} alt="baby" width={200} height={179} className="illustration" />
          </div>
          <p>Alex begint een heus groot meisje te worden en gaat steeds meer richting echte maaltijden. Ze krijgt nog drie flessen à 200 ml opvolgmelk per dag en verder krijgt ze &quot;echt&quot; eten. Grofweg* als volgt:</p>
          <p>Wanneer we opstaan gaat Alex even in de box rommelen terwijl ik (Esther) een flesje voor haar (en een kopje koffie voor mezelf) tap. Vervolgens zet ik het journaal klaar terwijl ik probeer niet op de NPO app te godveren en dan komt Alex bij mij zitten en krijgt ze d&apos;r eerste flesje terwijl we samen naar het journaal kijken.
          </p>
          <p>
           Afhankelijk van hoe vroeg ze al wakker was krijgt ze in de loop van de ochtend net voor- of na haar eerste dutje van de dag een hapje. Soms is dit wat fruit, soms een bakje volle yoghurt met fruit, soms een bakje pap.
          </p>
          <p>
          &apos;s Middags rond de lunchtijd (ik probeer tussen 12:00 en 13:00 aan te houden) krijgt ze een boterham (zonder korstjes, in stukjes). Daar smeren we meestal een fruit/groente prutje of wat pindakaas op. Die mag ze helemaal zelf opeten, dat kan ze prima. (Hoewel je de pindakaas daarna wel uit haar oren moet vegen en dat vindt ze stom, maar ach).
          </p>
          <p>
           Tegen 15:00 à 16:00 is het tijd voor flesje nummer twee.
          </p>
          <p>Terwijl wij avondeten krijgt zij óf hetzelfde als wat wij eten, maar dan (licht) bewerkt met een staafmixer, óf een babymaaltijd uit een potje of pakje. We laten haar zo veel mogelijk met ons mee eten, maar we houden af en toe van voedsel wat voor haar nog niet zo goed is. (Eten met bijvoorbeeld zout, honing, kaas, etc).</p>
          <p>Voordat ze slapen gaat krijgt ze haar laatste flesje. Soms is dat niet zo gek lang na het avondeten, maar dat is niet zo erg. Ze drinkt niet meer dan ze op wil.</p>
          <p>Om deze maaltijden heen geven we haar ook twee kleine glaasjes water, thee of dun aangemaakt diksap. Ook krijgt ze soms nog een knabbel tussendoor (denk aan van die maïsknabbels, of nog een klein stukje banaan ofzo).</p>
          <br/>
          <p>* <em>Meestal</em> gaat dit goed. Soms begint ze te brullen en blijkt ze toch op een ander moment flesbehoeftig. Een beetje improviseren mag altijd.</p>
         <h3>Samenvattend:</h3>
         <ul>
          <li>Drie flesjes à 200ml opvolgmelk rond 07:00, 15:00/16:00, en 19:00/20:00.</li>
          <li>Een bakje fruit (soms met yoghurt) of pap in de loop van de ochtend.</li>
          <li>Een boterhammetje zonder korstjes voor de lunch.</li>
          <li>Een klein bordje avondeten.</li>
          <li>Twee glaasjes water/thee gedurende de dag.</li>
          <li>Een licht knabbeltje tussendoor.</li>
         </ul>
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
            Wanneer de bovenkant van het oranje zwieperonderdeel in het melkpoederreservoir zichtbaar wordt, moet er
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
          <h2 className="bruksanvisnung">Moe!</h2>
          <p>
            Als Alex begint te staren, gapen en haar oogjes half dichtvallen weet je het zeker: ze is moe. (Meestal na
            een uur of drie à vier wakker zijn).
          </p>
          <p>
            We hijsen haar dan in een slaapzakje (afhankelijk van de temperatuur) en leggen haar op bed met een knuffeltje en/of een speen.
          </p>
          <p>
            Slapen is nog steeds stoooom, dus meestal is er protest. Gelukkig duurt dit meestal niet lang meer en kan ze zich ook vaak prima vermaken door met haar speen op het ledikant te timmeren.
          </p>
          <p>Ze is nog steeds een beetje onvoorspelbaar in haar dutjes overdag. Soms slaapt ze 40 minuten, soms gaan we haar na twee uur coma zelf maar wakker maken.</p>
          <p>&apos;s Nachts gaat het nu meestal gewoon goed vanaf een uur of 19:00/20:00 tot ze wakker wordt ergens tussen 05:00 en 07:00. Ze heeft naar ons idee soms wel nachtmerries en wordt dan huilend wakker. Dit gebeurd echter maar zelden en meestal slaapt ze wel weer verder als ze even getroost is.</p>
          <h2 className="bruksanvisnung">Rennen, springen, vliegen, duiken, vallen, opstaan en weer doorgaan</h2>
          <p>
            Alex begint haar lijf te snappen. En nu wil ze dat dat lijf ALLES kan. Ze kruip-tijgert de hele woonkamer door en probeert overal op/onder/doorheen te klimmen.<br/>
            Als ze ergens tegenaan kan leunen probeert ze ook af en toe al te gaan staan.</p>
            <p>De hoeveelheid &quot;bonk&quot;-geluiden in huis zijn vertienvoudigd. Ze moet dus ook echt wat beter in de gaten gehouden worden, nu.</p>
            <p>Soms is ze na een flinke tijd keten ook opeens een beetje chaggo; dan is ze soms gewoon even toe aan wat rust. Even zitten in haar wipstoeltje thuis doet dan vaak al wonderen.
          </p>
        </div>
      </div>
    </Layout>
  );
}
