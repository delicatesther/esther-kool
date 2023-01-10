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
          <p>Alex wordt gevoed op verzoek. Overdag komt dat neer op grofweg om de drie uur (give or take).</p>
          <p>
            We maken dan een flesje van 150ml klaar (die niet op komt). De ene keer slurpt ze in 10 minuten 130ml op, de
            andere keer sabbelt ze een half uur lang met tegenzin en drinkt ze maar 50ml.
          </p>
          <p>
            Op zich geen ramp, maar dan is de kans dat ze zich eerder meldt voor het volgende flesje iets groter. Ze
            geeft meestal duidelijk aan wanneer ze klaar is met drinken (dan begint ze haar hoofd wat heen en weer te
            gooien en vertikt ze het haar mond open te doen als je de fles weer aanbiedt). Overblijfsel gooien we weg.
          </p>
          <p>
            Uiteindelijk is het de bedoeling dat ze ongeveer 150ml per kilo lichaamsgewicht per dag binnenkrijgt, en dat
            redt ze wel.
          </p>
          <h2 className="bruksanvisnung">Flesje klaarmaken</h2>
          <p>
            We gebruiken momenteel alleen de Doctor Brown flessen met de groene plastic flieber er in. Die schijnt
            krampjes tegen te gaan en ze drinkt er goed uit.
          </p>
          <p>
            Eerst doen we een half schepje johannesbroodpitmeel* in de fles. (* 37 punten in Scrabble zonder bonussen).
            Vervolgens zetten we de fles onder de Babybrezza en drukken we op het play knopje. Daarna nog even roeren
            (doen wij met zo&#39;n Aziatisch eetstokje) om het JBPM van de bodem van de fles te krijgen en met de melk
            te mengen. Als laatst de groene plastic flieber er in en de speen er op en de fles één of twee keer op
            zo&#39;n kop draaien.
          </p>
          <p>
            Dat JBPM kan wat klonteren als het niet goed gemengd is, maar teveel schudden en roeren zorgt weer voor
            teveel lucht in de fles, dus poog voor de gulden middenweg.
          </p>
          <p>
            Het spul helpt voorkomen dat Alex spuugt. Ze geeft nog wel eens een mondje terug (dus hou spuugdoekjes
            paraat), maar we hebben al een tijd geen bed meer hoeven verschonen omdat er zoveel omhoog kwam.
          </p>
          <h2 className="bruksanvisnung">Moe!</h2>
          <p>Als Alex begint te staren, gapen en haar oogjes half dichtvallen weet je het zeker: ze is moe.</p>
          <p>
            We proberen haar dan niet beneden in de box of in het babynestje te leggen, maar haar in een slaapzakje te
            hijsen en in de co-sleeper op onze slaapkamer te leggen. Met de babymonitor houden we haar dan in de gaten.
          </p>
          <p>Als ze dan nog een beetje rommelt is het prima, maar zodra ze huilt moet ze getroost worden.</p>
          <p>
            Het liefst kijken we eerst even of dit lukt terwijl ze in bed ligt (met een speentje en door de co-sleeper
            te wiegen). Vaak is het bij huilen echter al zo dat er wat rondgewandeld met haar moet worden. Soms gaat het
            echt niet en komt ze weer mee naar beneden.
          </p>
        </div>
      </div>
    </Layout>
  );
}
