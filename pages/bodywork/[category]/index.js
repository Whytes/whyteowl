import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Import the data directly
const bodyworkData = [
  {
    "category": "imports",
    "brands": [
      {
        "name": "Albany",
        "slug": "albany",
        "models": [
          {
            "name": "Station",
            "slug": "station",
            "parts": []
          },
          {
            "name": "Escelator",
            "slug": "escelator",
            "parts": []
          },
          {
            "name": "BG5-V",
            "slug": "bg5-v",
            "parts": []
          }
        ]
      },
      {
        "name": "Annis",
        "slug": "annis",
        "models": [
          {
            "name": "Sunny",
            "slug": "sunny",
            "parts": []
          },
          {
            "name": "GTIR",
            "slug": "gtir",
            "parts": []
          },
          {
            "name": "37Z",
            "slug": "37z",
            "parts": []
          },
          {
            "name": "160sx",
            "slug": "160sx",
            "parts": []
          },
          {
            "name": "F13",
            "slug": "f13",
            "parts": []
          },
          {
            "name": "F14",
            "slug": "f14",
            "parts": []
          },
          {
            "name": "F15",
            "slug": "f15",
            "parts": []
          },
          {
            "name": "300ce",
            "slug": "300ce",
            "parts": []
          },
          {
            "name": "Fairman X",
            "slug": "fairman-x",
            "parts": []
          },
          {
            "name": "H34",
            "slug": "h34",
            "parts": []
          },
          {
            "name": "HZ 24",
            "slug": "hz-24",
            "parts": []
          },
          {
            "name": "H32 GTR",
            "slug": "h32-gtr",
            "parts": []
          },
          {
            "name": "H33",
            "slug": "h33",
            "parts": []
          },
          {
            "name": "H35 GTR",
            "slug": "h35-gtr",
            "parts": []
          }
        ]
      },
      {
        "name": "Apollo",
        "slug": "apollo",
        "models": [
          {
            "name": "Razor",
            "slug": "razor",
            "parts": []
          }
        ]
      },
      {
        "name": "Azda",
        "slug": "azda",
        "models": [
          {
            "name": "Tiata",
            "slug": "tiata",
            "parts": []
          },
          {
            "name": "ARX7",
            "slug": "arx7",
            "parts": []
          },
          {
            "name": "ARX8",
            "slug": "arx8",
            "parts": []
          }
        ]
      },
      {
        "name": "BF",
        "slug": "bf",
        "models": [
          {
            "name": "Ant",
            "slug": "ant",
            "parts": []
          },
          {
            "name": "Ghire",
            "slug": "ghire",
            "parts": []
          },
          {
            "name": "Mk3",
            "slug": "mk3",
            "parts": []
          },
          {
            "name": "Mk7",
            "slug": "mk7",
            "parts": []
          },
          {
            "name": "Mk8",
            "slug": "mk8",
            "parts": []
          }
        ]
      },
      {
        "name": "Benefactor",
        "slug": "benefactor",
        "models": [
          {
            "name": "500",
            "slug": "500",
            "parts": []
          },
          {
            "name": "P45S",
            "slug": "p45s",
            "parts": []
          },
          {
            "name": "L55 DMG",
            "slug": "l55-dmg",
            "parts": []
          },
          {
            "name": "F63 DMG",
            "slug": "f63-dmg",
            "parts": []
          },
          {
            "name": "A500",
            "slug": "a500",
            "parts": []
          },
          {
            "name": "AL65",
            "slug": "al65",
            "parts": []
          },
          {
            "name": "DLS 63",
            "slug": "dls-63",
            "parts": []
          },
          {
            "name": "D63 S",
            "slug": "d63-s",
            "parts": []
          },
          {
            "name": "L63 18'",
            "slug": "l63-18",
            "parts": []
          },
          {
            "name": "BE63",
            "slug": "be63",
            "parts": []
          },
          {
            "name": "L63 22'",
            "slug": "l63-22",
            "parts": []
          },
          {
            "name": "TT63 S",
            "slug": "tt63-s",
            "parts": []
          },
          {
            "name": "A650",
            "slug": "a650",
            "parts": []
          },
          {
            "name": "T63 6x6",
            "slug": "t63-6x6",
            "parts": []
          },
          {
            "name": "SLS",
            "slug": "sls",
            "parts": []
          },
          {
            "name": "DMG GTR",
            "slug": "dmg-gtr",
            "parts": []
          },
          {
            "name": "ALR",
            "slug": "alr",
            "parts": []
          }
        ]
      },
      {
        "name": "Bollokan",
        "slug": "bollokan",
        "models": [
          {
            "name": "Dinger GT",
            "slug": "dinger-gt",
            "parts": []
          },
          {
            "name": "Evvi",
            "slug": "evvi",
            "parts": []
          }
        ]
      },
      {
        "name": "Bravado",
        "slug": "bravado",
        "models": [
          {
            "name": "Ham 7000",
            "slug": "ham-7000",
            "parts": []
          },
          {
            "name": "HAM TRS",
            "slug": "ham-trs",
            "parts": []
          },
          {
            "name": "Charchar 69'",
            "slug": "charchar-69",
            "parts": []
          },
          {
            "name": "Arrow 68'",
            "slug": "arrow-68",
            "parts": []
          },
          {
            "name": "Chelengar",
            "slug": "chelengar",
            "parts": []
          },
          {
            "name": "Python 99",
            "slug": "python-99",
            "parts": []
          },
          {
            "name": "Python",
            "slug": "python",
            "parts": []
          },
          {
            "name": "Charchar SRT",
            "slug": "charchar-srt",
            "parts": []
          },
          {
            "name": "HAM TRS 22'",
            "slug": "ham-trs-22",
            "parts": []
          },
          {
            "name": "Charchar Helldog",
            "slug": "charchar-helldog",
            "parts": []
          },
          {
            "name": "Trackeagle",
            "slug": "trackeagle",
            "parts": []
          },
          {
            "name": "Devil",
            "slug": "devil",
            "parts": []
          },
          {
            "name": "Anitdote",
            "slug": "anitdote",
            "parts": []
          }
        ]
      },
      {
        "name": "Brute",
        "slug": "brute",
        "models": [
          {
            "name": "Sierra",
            "slug": "sierra",
            "parts": []
          },
          {
            "name": "Colossus EV",
            "slug": "colossus-ev",
            "parts": []
          }
        ]
      },
      {
        "name": "Buckingham",
        "slug": "buckingham",
        "models": [
          {
            "name": "Waythe",
            "slug": "waythe",
            "parts": []
          },
          {
            "name": "Spirit",
            "slug": "spirit",
            "parts": []
          },
          {
            "name": "Cullyham",
            "slug": "cullyham",
            "parts": []
          }
        ]
      },
      {
        "name": "Canis",
        "slug": "canis",
        "models": [
          {
            "name": "Mavern",
            "slug": "mavern",
            "parts": []
          }
        ]
      },
      {
        "name": "Coil",
        "slug": "coil",
        "models": [
          {
            "name": "S",
            "slug": "s",
            "parts": []
          },
          {
            "name": "X",
            "slug": "x",
            "parts": []
          },
          {
            "name": "R",
            "slug": "r",
            "parts": []
          },
          {
            "name": "CT",
            "slug": "ct",
            "parts": []
          }
        ]
      },
      {
        "name": "Declasse",
        "slug": "declasse",
        "models": [
          {
            "name": "Paris",
            "slug": "paris",
            "parts": []
          },
          {
            "name": "Bel-Sky",
            "slug": "bel-sky",
            "parts": []
          },
          {
            "name": "Deer TT",
            "slug": "deer-tt",
            "parts": []
          },
          {
            "name": "El Jesse",
            "slug": "el-jesse",
            "parts": []
          },
          {
            "name": "Laker",
            "slug": "laker",
            "parts": []
          },
          {
            "name": "Superfast",
            "slug": "superfast",
            "parts": []
          },
          {
            "name": "Camario R28",
            "slug": "camario-r28",
            "parts": []
          },
          {
            "name": "Stingray E6 R06",
            "slug": "stingray-e6-r06",
            "parts": []
          },
          {
            "name": "Stingray E7",
            "slug": "stingray-e7",
            "parts": []
          },
          {
            "name": "Camario RL1",
            "slug": "camario-rl1",
            "parts": []
          },
          {
            "name": "Stingray E8",
            "slug": "stingray-e8",
            "parts": []
          },
          {
            "name": "Stingray XR1",
            "slug": "stingray-xr1",
            "parts": []
          }
        ]
      },
      {
        "name": "Dewbauchee",
        "slug": "dewbauchee",
        "models": [
          {
            "name": "DBL",
            "slug": "dbl",
            "parts": []
          },
          {
            "name": "Vanish",
            "slug": "vanish",
            "parts": []
          },
          {
            "name": "Supersport",
            "slug": "supersport",
            "parts": []
          }
        ]
      },
      {
        "name": "Dinka",
        "slug": "dinka",
        "models": [
          {
            "name": "Abby",
            "slug": "abby",
            "parts": []
          },
          {
            "name": "Divic",
            "slug": "divic",
            "parts": []
          },
          {
            "name": "Divic TK9",
            "slug": "divic-tk9",
            "parts": []
          },
          {
            "name": "Incegra TC5",
            "slug": "incegra-tc5",
            "parts": []
          },
          {
            "name": "Divic EK8",
            "slug": "divic-ek8",
            "parts": []
          },
          {
            "name": "F2000",
            "slug": "f2000",
            "parts": []
          },
          {
            "name": "NOESX 90'",
            "slug": "noesx-90",
            "parts": []
          },
          {
            "name": "NOESX 16'",
            "slug": "noesx-16",
            "parts": []
          }
        ]
      },
      {
        "name": "Emperor",
        "slug": "emperor",
        "models": [
          {
            "name": "SI100",
            "slug": "si100",
            "parts": []
          },
          {
            "name": "XL 570",
            "slug": "xl-570",
            "parts": []
          },
          {
            "name": "Flexus",
            "slug": "flexus",
            "parts": []
          },
          {
            "name": "RFA",
            "slug": "rfa",
            "parts": []
          }
        ]
      },
      {
        "name": "Enus",
        "slug": "enus",
        "models": [
          {
            "name": "Gentaya",
            "slug": "gentaya",
            "parts": []
          },
          {
            "name": "Continent",
            "slug": "continent",
            "parts": []
          },
          {
            "name": "Aristro",
            "slug": "aristro",
            "parts": []
          }
        ]
      },
      {
        "name": "Fathom",
        "slug": "fathom",
        "models": [
          {
            "name": "Elantro",
            "slug": "elantro",
            "parts": []
          },
          {
            "name": "L30M",
            "slug": "l30m",
            "parts": []
          }
        ]
      },
      {
        "name": "Gallivanter",
        "slug": "gallivanter",
        "models": [
          {
            "name": "Diver SC",
            "slug": "diver-sc",
            "parts": []
          },
          {
            "name": "Diver SCR",
            "slug": "diver-scr",
            "parts": []
          },
          {
            "name": "Diver Belar",
            "slug": "diver-belar",
            "parts": []
          },
          {
            "name": "Attacker",
            "slug": "attacker",
            "parts": []
          }
        ]
      },
      {
        "name": "Grotti",
        "slug": "grotti",
        "models": [
          {
            "name": "412",
            "slug": "412",
            "parts": []
          },
          {
            "name": "Lusy",
            "slug": "lusy",
            "parts": []
          },
          {
            "name": "X420",
            "slug": "x420",
            "parts": []
          },
          {
            "name": "I454",
            "slug": "i454",
            "parts": []
          },
          {
            "name": "X819",
            "slug": "x819",
            "parts": []
          },
          {
            "name": "699",
            "slug": "699",
            "parts": []
          },
          {
            "name": "588",
            "slug": "588",
            "parts": []
          },
          {
            "name": "X12 TDF",
            "slug": "x12-tdf",
            "parts": []
          },
          {
            "name": "X50",
            "slug": "x50",
            "parts": []
          },
          {
            "name": "La Purrari",
            "slug": "la-purrari",
            "parts": []
          },
          {
            "name": "Sangueo",
            "slug": "sangueo",
            "parts": []
          }
        ]
      },
      {
        "name": "Karin",
        "slug": "karin",
        "models": [
          {
            "name": "DUBYARX STD",
            "slug": "dubyarx-std",
            "parts": []
          },
          {
            "name": "DUBYARX GX",
            "slug": "dubyarx-gx",
            "parts": []
          },
          {
            "name": "Leaf",
            "slug": "leaf",
            "parts": []
          },
          {
            "name": "Cammy",
            "slug": "cammy",
            "parts": []
          },
          {
            "name": "LAV4",
            "slug": "lav4",
            "parts": []
          },
          {
            "name": "Chacer JZR",
            "slug": "chacer-jzr",
            "parts": []
          },
          {
            "name": "Land Lover J79",
            "slug": "land-lover-j79",
            "parts": []
          },
          {
            "name": "TR Roller",
            "slug": "tr-roller",
            "parts": []
          },
          {
            "name": "TR Garis",
            "slug": "tr-garis",
            "parts": []
          },
          {
            "name": "Zupra MK4",
            "slug": "zupra-mk4",
            "parts": []
          },
          {
            "name": "A90 Zupra",
            "slug": "a90-zupra",
            "parts": []
          }
        ]
      },
      {
        "name": "Lampadati",
        "slug": "lampadati",
        "models": [
          {
            "name": "Movitec",
            "slug": "movitec",
            "parts": []
          },
          {
            "name": "GT",
            "slug": "gt",
            "parts": []
          },
          {
            "name": "Jewel Qudra",
            "slug": "jewel-qudra",
            "parts": []
          }
        ]
      },
      {
        "name": "Miabatsu",
        "slug": "miabatsu",
        "models": [
          {
            "name": "Devo 9",
            "slug": "devo-9",
            "parts": []
          },
          {
            "name": "Devo 10",
            "slug": "devo-10",
            "parts": []
          }
        ]
      },
      {
        "name": "Maxwell",
        "slug": "maxwell",
        "models": [
          {
            "name": "Coarser",
            "slug": "coarser",
            "parts": []
          }
        ]
      },
      {
        "name": "Obey",
        "slug": "obey",
        "models": [
          {
            "name": "R4",
            "slug": "r4",
            "parts": []
          },
          {
            "name": "SR6 B1",
            "slug": "sr6-b1",
            "parts": []
          },
          {
            "name": "R4 B8",
            "slug": "r4-b8",
            "parts": []
          },
          {
            "name": "O8",
            "slug": "o8",
            "parts": []
          },
          {
            "name": "SR3",
            "slug": "sr3",
            "parts": []
          },
          {
            "name": "SR3 '20",
            "slug": "sr3-20",
            "parts": []
          },
          {
            "name": "SR3 '22",
            "slug": "sr3-22",
            "parts": []
          },
          {
            "name": "SR6",
            "slug": "sr6",
            "parts": []
          },
          {
            "name": "SR7",
            "slug": "sr7",
            "parts": []
          },
          {
            "name": "SR6 '20",
            "slug": "sr6-20",
            "parts": []
          },
          {
            "name": "SR7 '23",
            "slug": "sr7-23",
            "parts": []
          },
          {
            "name": "SR5-R",
            "slug": "sr5-r",
            "parts": []
          },
          {
            "name": "SR7 '23",
            "slug": "sr7-23",
            "parts": []
          },
          {
            "name": "SRO8",
            "slug": "sro8",
            "parts": []
          },
          {
            "name": "T8",
            "slug": "t8",
            "parts": []
          },
          {
            "name": "T8 '13",
            "slug": "t8-13",
            "parts": []
          }
        ]
      },
      {
        "name": "Ocelot",
        "slug": "ocelot",
        "models": [
          {
            "name": "D-Type '68",
            "slug": "d-type-68",
            "parts": []
          },
          {
            "name": "R-Pace",
            "slug": "r-pace",
            "parts": []
          },
          {
            "name": "Project 17",
            "slug": "project-17",
            "parts": []
          }
        ]
      },
      {
        "name": "Overflod",
        "slug": "overflod",
        "models": [
          {
            "name": "Nagara",
            "slug": "nagara",
            "parts": []
          },
          {
            "name": "Vesco",
            "slug": "vesco",
            "parts": []
          }
        ]
      },
      {
        "name": "Peggasi",
        "slug": "peggasi",
        "models": [
          {
            "name": "Durus",
            "slug": "durus",
            "parts": []
          },
          {
            "name": "Devil SC",
            "slug": "devil-sc",
            "parts": []
          },
          {
            "name": "Tsunami EP 540",
            "slug": "tsunami-ep-540",
            "parts": []
          },
          {
            "name": "Wiyra",
            "slug": "wiyra",
            "parts": []
          },
          {
            "name": "Tsunami Evo Spoider",
            "slug": "tsunami-evo-spoider",
            "parts": []
          },
          {
            "name": "Tsunami Perfy",
            "slug": "tsunami-perfy",
            "parts": []
          },
          {
            "name": "Huntach B004",
            "slug": "huntach-b004",
            "parts": []
          },
          {
            "name": "Michela Angelo SC",
            "slug": "michela-angelo-sc",
            "parts": []
          },
          {
            "name": "Matador EP 720-2 SC",
            "slug": "matador-ep-720-2-sc",
            "parts": []
          },
          {
            "name": "Revolto",
            "slug": "revolto",
            "parts": []
          },
          {
            "name": "Serrata",
            "slug": "serrata",
            "parts": []
          }
        ]
      },
      {
        "name": "Pfister",
        "slug": "pfister",
        "models": [
          {
            "name": "711(772) Targa",
            "slug": "711-772-targa",
            "parts": []
          },
          {
            "name": "ELS",
            "slug": "els",
            "parts": []
          },
          {
            "name": "711(722) Coupe",
            "slug": "711-722-coupe",
            "parts": []
          },
          {
            "name": "Panarama Turbo",
            "slug": "panarama-turbo",
            "parts": []
          },
          {
            "name": "Teacan Turbo S",
            "slug": "teacan-turbo-s",
            "parts": []
          },
          {
            "name": "711 Turbo S",
            "slug": "711-turbo-s",
            "parts": []
          },
          {
            "name": "ET3 RS",
            "slug": "et3-rs",
            "parts": []
          },
          {
            "name": "711 Turbo S '21",
            "slug": "711-turbo-s-21",
            "parts": []
          }
        ]
      },
      {
        "name": "Progen",
        "slug": "progen",
        "models": [
          {
            "name": "360s",
            "slug": "360s",
            "parts": []
          },
          {
            "name": "675XY Spoider",
            "slug": "675xy-spoider",
            "parts": []
          },
          {
            "name": "Y1 GTR",
            "slug": "y1-gtr",
            "parts": []
          },
          {
            "name": "E1",
            "slug": "e1",
            "parts": []
          },
          {
            "name": "M1",
            "slug": "m1",
            "parts": []
          }
        ]
      },
      {
        "name": "Renetto",
        "slug": "renetto",
        "models": [
          {
            "name": "Twig",
            "slug": "twig",
            "parts": []
          },
          {
            "name": "Calypso V12",
            "slug": "calypso-v12",
            "parts": []
          }
        ]
      },
      {
        "name": "Supporters",
        "slug": "supporters",
        "models": [
          {
            "name": "SuperKart",
            "slug": "superkart",
            "parts": []
          }
        ]
      },
      {
        "name": "Truffade",
        "slug": "truffade",
        "models": [
          {
            "name": "Vayrone",
            "slug": "vayrone",
            "parts": []
          },
          {
            "name": "Verfasto",
            "slug": "verfasto",
            "parts": []
          }
        ]
      },
      {
        "name": "Ubermacht",
        "slug": "ubermacht",
        "models": [
          {
            "name": "D38",
            "slug": "d38",
            "parts": []
          },
          {
            "name": "N5 T60",
            "slug": "n5-t60",
            "parts": []
          },
          {
            "name": "N3 T92",
            "slug": "n3-t92",
            "parts": []
          },
          {
            "name": "N4 F82",
            "slug": "n4-f82",
            "parts": []
          },
          {
            "name": "N3 G80",
            "slug": "n3-g80",
            "parts": []
          },
          {
            "name": "N3 G80 Tour N2",
            "slug": "n3-g80-tour-n2",
            "parts": []
          },
          {
            "name": "P6M F16",
            "slug": "p6m-f16",
            "parts": []
          },
          {
            "name": "P3M",
            "slug": "p3m",
            "parts": []
          },
          {
            "name": "N8 Compizzare",
            "slug": "n8-compizzare",
            "parts": []
          },
          {
            "name": "B8",
            "slug": "b8",
            "parts": []
          },
          {
            "name": "N5 Z90",
            "slug": "n5-z90",
            "parts": []
          },
          {
            "name": "N5 G90",
            "slug": "n5-g90",
            "parts": []
          },
          {
            "name": "N5 G90 Tour",
            "slug": "n5-g90-tour",
            "parts": []
          }
        ]
      },
      {
        "name": "Vapid",
        "slug": "vapid",
        "models": [
          {
            "name": "T150 XLT '78",
            "slug": "t150-xlt-78",
            "parts": []
          },
          {
            "name": "Tuskang '65",
            "slug": "tuskang-65",
            "parts": []
          },
          {
            "name": "T250 '08",
            "slug": "t250-08",
            "parts": []
          },
          {
            "name": "Bucko",
            "slug": "bucko",
            "parts": []
          },
          {
            "name": "T150 Captur",
            "slug": "t150-captur",
            "parts": []
          },
          {
            "name": "Tuskang GT",
            "slug": "tuskang-gt",
            "parts": []
          },
          {
            "name": "Fokkus JS",
            "slug": "fokkus-js",
            "parts": []
          },
          {
            "name": "Hellaby GT",
            "slug": "hellaby-gt",
            "parts": []
          },
          {
            "name": "VelociCaptur 6x6",
            "slug": "velocicaptur-6x6",
            "parts": []
          },
          {
            "name": "Grand Tour",
            "slug": "grand-tour",
            "parts": []
          },
          {
            "name": "Grand Tour '05",
            "slug": "grand-tour-05",
            "parts": []
          },
          {
            "name": "T150 Captur '19",
            "slug": "t150-captur-19",
            "parts": []
          }
        ]
      },
      {
        "name": "Weeny",
        "slug": "weeny",
        "models": [
          {
            "name": "Helee",
            "slug": "helee",
            "parts": []
          }
        ]
      },
      {
        "name": "Willard",
        "slug": "willard",
        "models": [
          {
            "name": "TNX",
            "slug": "tnx",
            "parts": []
          }
        ]
      },
      {
        "name": "РУССКИЙ",
        "slug": "russkiy",
        "models": [
          {
            "name": "РУССКИЙ",
            "slug": "russkiy",
            "parts": []
          }
        ]
      }
    ]
  }
];

export default function BodyworkCategory() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { category } = router.query;

  // Get the brands for this category
  const categoryData = bodyworkData.find(cat => cat.category === category);
  const brands = categoryData?.brands || [];

  // Handle loading state when router is not ready
  if (!router.isReady || !category) {
    return (
      <div className="pt-16 flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Helper to extract manufacturer from model name (simple split, customize as needed)
  const getManufacturer = (modelName) => {
    const parts = modelName.split(' ');
    // If first part is a year, use second part
    if (/^\d{2,4}'?/.test(parts[0])) {
      return parts[1] || parts[0];
    }
    return parts[0];
  };

  // State for collapsible brands
  // Start all brands expanded by default
  const [openBrands, setOpenBrands] = useState({});

  // Reset expanded state when categoryData changes
  useEffect(() => {
    if (categoryData?.brands) {
      const initialBrands = {};
      categoryData.brands.forEach(brand => {
        initialBrands[brand.slug] = true; // Start expanded
      });
      setOpenBrands(initialBrands);
    }
  }, [categoryData]);

  // Toggle brand section
  const toggleBrand = (brandSlug) => {
    setOpenBrands((prev) => ({ ...prev, [brandSlug]: !prev[brandSlug] }));
  };

  return (
  <div className="pt-16">
    <h1 className="text-3xl font-bold mb-8 capitalize text-white drop-shadow text-center">{category} Cars</h1>
    <div className="mb-8 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search vehicles or manufacturers..."
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400/60 text-lg bg-gray-800 text-white shadow-lg"
      />
    </div>
      <div className="space-y-8 max-w-4xl mx-auto">
        {brands.map(brand => {
          // Filter models by search
          const filteredModels = brand.models.filter(model =>
            !search || model.name.toLowerCase().includes(search.toLowerCase()) || brand.name.toLowerCase().includes(search.toLowerCase())
          );
          if (filteredModels.length === 0) return null;

          return (
            <section key={brand.slug} className="rounded-2xl bg-gray-900/50 backdrop-blur-xl shadow-lg border border-gray-700 mb-6">
              <button
                className="w-full flex items-center justify-between px-6 py-3 text-xl font-bold text-blue-400 capitalize focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-all rounded-2xl bg-gray-800/50 backdrop-blur-md shadow-sm hover:bg-gray-700/50 hover:shadow-md border border-gray-600"
                onClick={() => toggleBrand(brand.slug)}
                aria-expanded={!!openBrands[brand.slug]}
              >
                <span className="flex items-center gap-3">
                  {brand.name}
                </span>
                {openBrands[brand.slug] ? <FaChevronUp className="text-lg" /> : <FaChevronDown className="text-lg" />}
              </button>
              <div className={`${openBrands[brand.slug] ? 'block' : 'hidden'} transition-all duration-300`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4">
                  {filteredModels.map(model => (
                    <Link key={model.slug} href={`/bodywork/${category}/${brand.slug}/${model.slug}`} className="group block bg-gray-800 text-white border border-gray-600 rounded-lg p-3 text-center font-medium transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:border-blue-400">
                      <span className="text-base font-bold group-hover:text-white capitalize">
                        {model.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        {brands.length === 0 && (
          <div className="text-gray-400 text-center py-8">No brands found.</div>
        )}
      </div>
    </div>
  );
}
