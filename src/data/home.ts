import hero from "@/assets/hero.jpg";
import belt from "@/assets/belt.jpg";
import dojang from "@/assets/dojang.jpg";
import poomsaeImg from "@/assets/poomsae.jpg";
import sparring from "@/assets/sparring.jpg";
import breakImg from "@/assets/break.jpg";
import type { IPais } from "@/interfaces/IPais";

export const principios = [
  {
    ko: "예 의",
    es: "Cortesía",
    d: "Ye Ui — respeto por el maestro, el compañero y uno mismo.",
  },
  {
    ko: "염 치",
    es: "Integridad",
    d: "Yom Chi — distinguir lo correcto y sostenerlo.",
  },
  {
    ko: "인 내",
    es: "Perseverancia",
    d: "In Nae — repetir hasta que la técnica sea carácter.",
  },
  {
    ko: "극기",
    es: "Autocontrol",
    d: "Guk Gi — dominar la fuerza antes de usarla.",
  },
  {
    ko: "백절불굴",
    es: "Espíritu indomable",
    d: "Baekjul Boolgul — nunca rendirse.",
  },
];

export const grados = [
  {
    c: "Blanco",
    n: "10º–9º Gup",
    t: "Pureza.",
    hex: "#f5f5f5",
  },
  {
    c: "Amarillo",
    n: "8º–7º Gup",
    t: "Sol naciente o semilla creciendo.",
    hex: "#facc15",
  },
  {
    c: "Verde",
    n: "6º–5º Gup",
    t: "Árbol creciente.",
    hex: "#16a34a",
  },
  {
    c: "Azul",
    n: "4º–3º Gup",
    t: "Cielo.",
    hex: "#2563eb",
  },
  {
    c: "Rojo",
    n: "2º–1º Gup",
    t: "Ocaso.",
    hex: "#dc2626",
  },
  {
    c: "Negro",
    n: "1er Dan+",
    t: "Roca.",
    hex: "#111111",
  },
];

export const galeria = [
  {
    src: dojang,
    alt: "Estudiantes saludando en el dojang",
    cap: "Saludo · Kyeong-nye",
  },
  {
    src: sparring,
    alt: "Combate de taekwondo con petos electrónicos",
    cap: "Kyorugi · Combate",
  },
  {
    src: poomsaeImg,
    alt: "Practicante ejecutando una forma",
    cap: "Poomsae · Formas",
  },
  { src: breakImg, alt: "Rotura de tabla con la mano", cap: "Kyokpa · Rotura" },
  {
    src: belt,
    alt: "Cinturón negro doblado sobre el dobok",
    alt2: true,
    cap: "Ti · Cinturón",
  },
  {
    src: hero,
    alt: "Patada voladora de taekwondo",
    cap: "Twio Chagi · Patada en salto",
  },
];

export const paises: IPais[] = [
  {
    id: "kr",
    nombre: "Corea del Sur",
    bandera: "🇰🇷",
    desde: "1955",
    historia:
      "Tras la liberación de 1945 surgieron los kwan (escuelas) como Chung Do Kwan, Moo Duk Kwan y Ji Do Kwan. En 1955 se unificó el nombre 'Taekwondo'. En 1972 se inauguró el Kukkiwon como sede central y en 1973 nació la World Taekwondo Federation, consolidando el arte como deporte nacional y patrimonio cultural.",
    hitos: [
      "1955 · Se adopta el nombre Taekwondo",
      "1972 · Kukkiwon",
      "1973 · Primer Mundial en Seúl",
    ],
    legado: "Cuna técnica y cultural del Taekwondo moderno.",
    enfoque: "Poomsae, kyorugi, disciplina escolar y formación Kukkiwon.",
    figura: "Sede de Kukkiwon y World Taekwondo",
    colores: ["#ffffff", "#cd2e3a", "#0047a0"],
  },
  {
    id: "co",
    nombre: "Colombia",
    bandera: "🇨🇴",
    desde: "1970s",
    historia:
      "El Taekwondo llegó a Colombia en la década de 1970 por maestros coreanos y por practicantes colombianos formados en el exterior, primero en Bogotá, Medellín y Cali. En 1975 se organizan las primeras ligas departamentales y luego la Federación Colombiana de Taekwondo, que ordenó cinturones, exámenes y competencia nacional. Hoy el país es potencia panamericana con medallistas mundiales y olímpicos.",
    hitos: [
      "1970s · Primeros dojangs en Bogotá y Cali",
      "1980s · Consolidación de ligas y federación",
      "2000s · Medallas panamericanas y mundiales",
    ],
    legado: "Potencia panamericana con una escuela competitiva en crecimiento.",
    enfoque: "Procesos de liga, desarrollo juvenil, kyorugi y poomsae.",
    figura: "Medallistas olímpicos y circuitos nacionales",
    colores: ["#fcd116", "#003893", "#ce1126"],
  },
  {
    id: "us",
    nombre: "Estados Unidos",
    bandera: "🇺🇸",
    desde: "1956",
    historia:
      "Instructores coreanos como Jhoon Rhee — llamado 'el padre del Taekwondo americano' — enseñaron desde finales de los 50 en universidades y bases militares. El arte creció con escuelas comerciales, torneos abiertos y una fuerte presencia en el cine y la televisión de los 70 y 80.",
    hitos: [
      "1956 · Jhoon Rhee enseña en Texas",
      "1974 · US Taekwondo Union",
      "1988 · Seúl como deporte de exhibición",
    ],
    legado: "Expansión universitaria, militar y comercial a gran escala.",
    enfoque: "Competencia, educación física y circuitos abiertos.",
    figura: "Jhoon Rhee, pionero de la difusión nacional",
    colores: ["#b22234", "#ffffff", "#3c3b6e"],
  },
  {
    id: "mx",
    nombre: "México",
    bandera: "🇲🇽",
    desde: "1969",
    historia:
      "Dai Won Moon y otros maestros coreanos comenzaron la enseñanza en Ciudad de México a finales de los 60. La federación mexicana se formalizó en los 70 y el país se transformó en una potencia olímpica, con oros en Sídney 2000, Atenas 2004 y Londres 2012.",
    hitos: [
      "1969 · Llegada de maestros coreanos",
      "2000 · Primer oro olímpico",
      "2012 · Nuevo oro olímpico",
    ],
    legado: "Una tradición olímpica reconocida por su intensidad competitiva.",
    enfoque: "Kyorugi, selecciones estatales y formación de élite.",
    figura: "Dai Won Moon, referente de la expansión mexicana",
    colores: ["#006847", "#ffffff", "#ce1126"],
  },
  {
    id: "de",
    nombre: "Alemania",
    bandera: "🇩🇪",
    desde: "1965",
    historia:
      "Demostraciones de equipos coreanos en la Europa central abrieron el camino; en 1965 aparecen las primeras escuelas y en 1981 la Deutsche Taekwondo Union se integra plenamente a la estructura europea, con un modelo de clubes y formación técnica muy estructurado.",
    hitos: [
      "1965 · Primeras escuelas",
      "1981 · Deutsche Taekwondo Union",
      "1990s · Escuela técnica europea",
    ],
    legado: "Modelo de clubes estructurado y formación técnica metódica.",
    enfoque: "Clubes regionales, poomsae técnico y competencia europea.",
    figura: "Deutsche Taekwondo Union",
    colores: ["#181818", "#dd0000", "#ffce00"],
  },
];
