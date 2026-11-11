import mosquitoScreens from "@/assets/images/mosquito-screens.webp";
import rollerBlinds from "@/assets/images/roller-blinds.webp";
import rollerShutters from "@/assets/images/roller-shutters.webp";
import venetianBlinds from "@/assets/images/venetian-blinds.webp";
// Alec Adriano, Pexels License: https://www.pexels.com/photo/36197104/
import internalBlinds from "@/assets/images/variants/blinds-internal.webp";
// Tanya Semenchuk, Unsplash License: https://unsplash.com/photos/a-table-and-chairs-in-a-room-EyhmdoIQpCQ
import blackoutRoller from "@/assets/images/variants/roller-blackout.webp";
// Renaldo Matamoro, Unsplash License: https://unsplash.com/photos/a-kitchen-with-a-sink-dishwasher-and-a-window-NQ5OB3vrdOo
import translucentRoller from "@/assets/images/variants/roller-translucent.webp";
import fixedScreen from "@/assets/images/variants/screens-fixed.webp";
import pleatedScreen from "@/assets/images/variants/screens-pleated.webp";
import rollerScreen from "@/assets/images/variants/screens-roller.webp";
import slidingScreen from "@/assets/images/variants/screens-sliding.webp";
// Emiliano Vittoriosi, Unsplash License: https://unsplash.com/photos/closed-white-roller-shutter-rgUbzEkdblk
import concealedShutters from "@/assets/images/variants/shutters-concealed.webp";

export const products = [
  {
    slug: "komarniki",
    name: "Komarniki",
    title: "Servis komarnikov",
    copy: "Popravimo obstoječe komarnike in vgradimo nove: fiksne, rolo, plise ali drsne.",
    image: mosquitoScreens,
    alt: "Nočni metulj na mreži komarnika",
    description:
      "Servis komarnikov po vsej Sloveniji. Strgana mreža ali zatikanje pri odpiranju? Komarnik pregledamo, popravimo ali po potrebi zamenjamo.",
    variantsTitle: "KOMARNIKI ZA OKNA IN VRATA.",
    variantsIntro:
      "Pomagamo izbrati komarnik za vaša okna ali vrata. Preverimo mere, prostor za montažo in način odpiranja.",
    variants: [
      {
        name: "Fiksni",
        copy: "Mreža v fiksnem okvirju ščiti pred mrčesom. Za okna, ki jih odpirate predvsem za zračenje.",
        image: fixedScreen,
        alt: "Spodnji vogal fiksnega komarnika s kovinskim pritrdilom ob belem oknu",
        credit: {
          title: "Fenster-Spannrahmen richtig einsetzen - Hansen Insektenschutz",
          author: "Tom Rothenbücher",
          href: "https://www.youtube.com/watch?v=pCT-ZewPDH0&t=26s",
          license: "CC BY",
          licenseHref: "https://www.youtube.com/t/creative_commons",
          changes: "Izsek iz videa pri 0:26, pomanjšano in obrezano.",
        },
      },
      {
        name: "Rolo",
        copy: "Mrežo potegnete navzdol, ko jo potrebujete. Sicer ostane zvita nad oknom.",
        image: rollerScreen,
        alt: "Bela spodnja letev rolo komarnika z ročajem in napeto mrežo",
        credit: {
          title: "Rollo I Funktion I Webseite I ISP Zürisee AG",
          author: "ISP-Zürisee AG",
          href: "https://www.youtube.com/watch?v=bYREsZEeuTk&t=18s",
          license: "CC BY",
          licenseHref: "https://www.youtube.com/t/creative_commons",
          changes: "Izsek iz videa pri 0:18, pomanjšano in obrezano.",
        },
      },
      {
        name: "Plise",
        copy: "Za balkonska in terasna vrata. Ob odpiranju se mreža zloži ob stran.",
        image: pleatedScreen,
        alt: "Plise komarnik s temnim okvirjem in nagubano mrežo ob ročaju",
        credit: {
          title: "Hoef Kozijnen - Originele Plissehordeur | Productfilm",
          author: "De Film Makelaar",
          href: "https://www.youtube.com/watch?v=m0h3UbgM-ZQ&t=153s",
          license: "CC BY",
          licenseHref: "https://www.youtube.com/t/creative_commons",
          changes: "Izsek iz videa pri 2:33, pomanjšano in obrezano.",
        },
      },
      {
        name: "Drsni",
        copy: "Okvir z mrežo potisnete vstran. Za večja balkonska in terasna vrata.",
        image: slidingScreen,
        alt: "Drsni komarnik v svetlem okvirju ob leseni fasadi hiše",
        credit: {
          title: "Villa FA con infissi in alluminio a Ravenna",
          author: "Bisacchi dal 1973 Finestre Porte Cancelli",
          href: "https://www.youtube.com/watch?v=2ecV9nYk6E0&t=65s",
          license: "CC BY",
          licenseHref: "https://www.youtube.com/t/creative_commons",
          changes: "Izsek fotografije iz videa pri 1:05, obrezano.",
        },
      },
    ],
    faqs: [
      {
        id: "ali-lahko-zamenjate-samo-mrezo-komarnika",
        question: "Ali je treba zaradi strgane mreže zamenjati cel komarnik?",
        answer:
          "Ne nujno. Če sta okvir in mehanizem v dobrem stanju, je lahko dovolj zamenjava mreže. Preverimo vrsto komarnika, način pritrditve mreže in stanje drugih delov, preden predlagamo popravilo.",
      },
      {
        id: "zakaj-mrces-prihaja-mimo-zaprtega-komarnika",
        question: "Zakaj mrčes prihaja mimo zaprtega komarnika?",
        answer:
          "Poleg lukenj v mreži so lahko težava tudi reže ob okvirju ali komarnik, ki se ne zapre do konca. Preverimo robove mreže, tesnjenje in zapiranje. Menjava mreže ne odpravi težave, če mrčes prihaja skozi režo ob okvirju.",
      },
      {
        id: "ali-lahko-komarnik-vgradite-ob-obstojecih-roletah",
        question: "Ali lahko komarnik vgradite ob obstoječih roletah?",
        answer:
          "Pogosto je to mogoče, vendar je treba preveriti prostor med oknom in roleto ter način odpiranja okna ali vrat. Pri izmeri preverimo tudi, da komarnik ne ovira premikanja rolete. Ni vsaka izvedba komarnika primerna za vsako okno.",
      },
      {
        id: "kaj-storiti-ce-se-komarnik-zatika",
        question:
          "Kaj storiti, če se komarnik zatika ali se mreža ne navije do konca?",
        answer:
          "Komarnika ne vlecite na silo. Preverite, ali so v vodilih listje, prah ali druge ovire, in vodila očistite po navodilih proizvajalca. Če se mreža še vedno guba, zatika ali ne navije do konca, je treba pregledati mrežo, vodila in mehanizem.",
      },
      {
        id: "kateri-komarnik-izbrati-za-balkonska-vrata",
        question: "Kateri komarnik izbrati za balkonska vrata?",
        answer:
          "Za balkonska in terasna vrata sta primerni plise in drsna izvedba. Pri pliseju se mreža zloži ob stran, pri drsnem pa odmaknete celoten okvir z mrežo. Drsni komarnik potrebuje dovolj prostora ob vratih. Pri izmeri preverimo, katera rešitev ustreza vašim vratom.",
      },
    ],
  },
  {
    slug: "zaluzije",
    name: "Zunanje in notranje žaluzije",
    title: "Servis žaluzij",
    copy: "Popravimo zunanje in notranje žaluzije, zamenjamo dotrajane dele ali vgradimo nove žaluzije.",
    image: venetianBlinds,
    alt: "Zunanje žaluzije na stekleni fasadi sodobne hiše",
    description:
      "Servis zunanjih in notranjih žaluzij po vsej Sloveniji. Žaluzija se zatika ali se lamele ne obračajo? Preverimo vzrok in popravimo poškodovane dele.",
    variantsTitle: "ZUNANJE ALI NOTRANJE ŽALUZIJE.",
    variantsIntro:
      "Z nagibom lamel prilagajate svetlobo v prostoru in zastrete pogled od zunaj. Svetujemo vam pri izbiri žaluzij za vaša okna.",
    variants: [
      {
        name: "Zunanje",
        copy: "Sonce zastrejo že pred oknom, zato se prostor poleti manj segreje.",
        image: venetianBlinds,
        alt: "Zunanje žaluzije na stekleni fasadi sodobne hiše",
      },
      {
        name: "Notranje",
        copy: "Na notranji strani okna. Z nagibom lamel uravnavate svetlobo in poskrbite za zasebnost.",
        image: internalBlinds,
        alt: "Notranje žaluzije z vodoravnimi lamelami ob oknu",
      },
    ],
    faqs: [
      {
        id: "kaj-storiti-ce-se-zaluzija-dviga-postrani",
        question:
          "Kaj storiti, če se žaluzija dviga postrani ali se strga vrvica?",
        answer:
          "Žaluzije ne dvigujte naprej na silo. Vzrok je lahko poškodovana vrvica ali dvižni trak, ovira v vodilu oziroma napaka v mehanizmu. Strgana vrvica sama po sebi še ne pomeni, da potrebujete novo žaluzijo. Preverimo poškodbo in možnost zamenjave posameznih delov.",
      },
      {
        id: "zakaj-se-rocica-zaluzije-vrti-v-prazno",
        question:
          "Zakaj se ročica žaluzije vrti v prazno ali jo je težko obračati?",
        answer:
          "Vzrok je lahko v povezavi med ročico in mehanizmom, v reduktorju ali v zatikanju žaluzije. Ročice ne obračajte na silo. Pred mazanjem je treba ugotoviti vzrok, saj mazivo ne odpravi obrabljenega ali poškodovanega dela.",
      },
      {
        id: "kako-ocistiti-zaluzije",
        question: "Kako očistiti žaluzije, da jih ne poškodujemo?",
        answer:
          "Prah odstranjujte nežno, z mehko krpo ali omelom, brez upogibanja lamel. Za mokro čiščenje in izbiro čistila upoštevajte navodila proizvajalca.",
      },
      {
        id: "ali-zaluzije-povsem-zatemnijo-prostor",
        question: "Ali žaluzije povsem zatemnijo prostor?",
        answer:
          "Ne povsem. Svetloba lahko prodre med zaprtimi lamelami in ob robovih žaluzije. Če potrebujete čim bolj temno spalnico, je to dobro upoštevati že pri izbiri senčila.",
      },
    ],
  },
  {
    slug: "roloji",
    name: "Roloji",
    title: "Servis rolojev",
    copy: "Popravimo notranje roloje in vgradimo nove. Izbirate lahko med prosojnimi in zatemnitvenimi roloji.",
    image: rollerBlinds,
    alt: "Rolo dan-noč na kuhinjskem oknu",
    description:
      "Servis rolojev in rolo zaves po vsej Sloveniji. Se platno navija postrani ali se verižica zatika? Rolo pregledamo in predlagamo popravilo.",
    variantsTitle: "SVETLOBA PO VAŠI MERI.",
    variantsIntro:
      "Želite ublažiti sonce ali prostor zatemniti? Pomagamo izbrati tkanino, pred montažo pa izmerimo okna in preverimo, kam lahko rolo pritrdimo.",
    variants: [
      {
        name: "Prosojni",
        copy: "Ublažijo neposredno sonce in prepuščajo dnevno svetlobo. Prostor ostane svetel.",
        image: translucentRoller,
        alt: "Siv prosojni rolo nad kuhinjskim oknom",
      },
      {
        name: "Zatemnitveni",
        copy: "Neprosojna tkanina za zatemnitev prostora. Nekaj svetlobe lahko še vedno prodre ob robovih.",
        image: blackoutRoller,
        alt: "Bež roloji ob velikih oknih s pogledom na drevesa",
      },
    ],
    faqs: [
      {
        id: "ali-je-mogoce-zamenjati-samo-platno-roloja",
        question: "Ali je mogoče zamenjati samo platno roloja?",
        answer:
          "Pri nekaterih rolojih je to mogoče, če so cev, nosilci in mehanizem še ustrezni. Novo platno mora ustrezati meram in obstoječemu sistemu. Pred odločitvijo preverimo, ali je takšna menjava izvedljiva in smiselna.",
      },
      {
        id: "kaj-storiti-ce-se-verizica-roloja-zatika",
        question:
          "Kaj storiti, če se verižica zatika ali se rolo ob vlečenju ne premika?",
        answer:
          "Verižice ne vlecite na silo. Preverimo, ali težavo povzroča verižica, pogonski mehanizem ali zatikanje platna. Takšna napaka še ne pomeni, da je treba zamenjati cel rolo; rešitev je odvisna od stanja in izvedbe mehanizma.",
      },
      {
        id: "kako-ocistiti-platno-roloja",
        question: "Kako očistiti platno roloja?",
        answer:
          "Prah nežno odstranite z mehko krpo. Za madeže najprej preverite navodila za tkanino, saj vsi materiali ne prenesejo mokrega čiščenja. Platna ne namakajte in ne perite v pralnem stroju, razen če proizvajalec to izrecno dovoljuje.",
      },
      {
        id: "zakaj-se-platno-roloja-navija-postrani",
        question: "Zakaj se platno roloja navija postrani?",
        answer:
          "Vzrok je lahko v pritrditvi roloja, položaju platna ali mehanizmu. Če platno drgne ob rob ali se guba, roloja ne vlecite na silo. Preverimo nosilce, platno in navijanje ter ugotovimo, kaj je treba nastaviti ali zamenjati.",
      },
      {
        id: "ali-zatemnitveni-rolo-povsem-zatemni-prostor",
        question: "Ali zatemnitveni rolo povsem zatemni prostor?",
        answer:
          "Ne povsem. Zatemnitvena tkanina ne prepušča svetlobe, ob robovih roloja pa lahko ostanejo svetle reže. Zato je pomembno, kako širok je rolo in kam ga pritrdimo. Pri izmeri se pogovorimo, koliko želite prostor zatemniti, in predlagamo ustrezno rešitev.",
      },
    ],
  },
  {
    slug: "rolete",
    name: "Rolete",
    title: "Servis rolet",
    copy: "Popravimo rolete, zamenjamo obrabljene dele ali vgradimo nove predokenske in podometne rolete.",
    image: rollerShutters,
    alt: "Spuščene zunanje rolete na oknih sodobne hiše",
    description:
      "Servis rolet po vsej Sloveniji. Roleta se zatika, trak je obrabljen ali so lamele poškodovane? Preverimo vzrok in predlagamo popravilo ali zamenjavo.",
    variantsTitle: "ROLETE ZA NOVOGRADNJO ALI OBNOVO.",
    variantsIntro:
      "Pri izbiri rolet je pomembno, ali je fasada že izdelana ali jo šele načrtujete. Preverimo prostor nad okni in vam svetujemo pri vgradnji.",
    variants: [
      {
        name: "Predokenske",
        copy: "Škatla rolete ostane vidna nad oknom. Vgradimo jih lahko tudi na hišo z dokončano fasado.",
        image: rollerShutters,
        alt: "Predokenske rolete z vidnimi škatlami nad okni",
      },
      {
        name: "Podometne",
        copy: "Škatla rolete je skrita pod fasado. Vgradnjo načrtujemo, preden je fasada dokončana.",
        image: concealedShutters,
        alt: "Spuščena roleta na fasadi z geometrijskimi sencami",
      },
    ],
    faqs: [
      {
        id: "ali-je-zaradi-strganega-traku-treba-zamenjati-roleto",
        question: "Ali je zaradi strganega traku treba zamenjati celo roleto?",
        answer:
          "Ne nujno. Če so drugi deli v dobrem stanju, je lahko dovolj menjava traku. Preverimo tudi navijalec in vzrok obrabe, da se nov trak ne obrabi prehitro.",
      },
      {
        id: "ali-je-mogoce-popraviti-starejse-rolete",
        question:
          "Ali je mogoče popraviti starejše rolete ali zamenjati le nekaj lamel?",
        answer:
          "Možnost popravila je odvisna od stanja rolete in razpoložljivosti ustreznih delov. Pri lamelah morata ustrezati oblika in velikost, zato ni vsaka nova lamela primerna za starejšo roleto. Po pregledu predlagamo zamenjavo poškodovanih delov ali zamenjavo rolete, če ustrezni deli niso več dobavljivi.",
      },
      {
        id: "elektricna-roleta-se-ne-odziva",
        question: "Električna roleta se ne odziva. Ali je pokvarjen motor?",
        answer:
          "Ne nujno. Težava je lahko tudi v napajanju, stikalu ali daljincu. Če uporabljate daljinec, najprej preverite baterijo. Če ima roleta tudi stensko stikalo, preverite, ali se odzove nanj. Za pregled je koristno vedeti, ali se ob pritisku sliši motor. Električnih delov ne odpirajte sami.",
      },
      {
        id: "ali-lahko-rolete-vgradite-po-koncani-fasadi",
        question: "Ali lahko rolete vgradite tudi po končani fasadi?",
        answer:
          "Predokenske rolete so lahko primerne tudi za hišo z dokončano fasado. Njihova škatla ostane vidna nad oknom. Pred vgradnjo preverimo mere, prostor za škatlo in vodila ter način pritrditve.",
      },
    ],
  },
];

export type Product = (typeof products)[number];
