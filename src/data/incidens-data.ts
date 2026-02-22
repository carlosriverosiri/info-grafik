/**
 * Data för incidensanalys av rotatorcuffkirurgi.
 *
 * Svensk data: Socialstyrelsen, Statistikdatabasen (NBL49).
 * Måttet är "antal ingrepp per 100 000 invånare" (summa av slutenvård
 * och specialiserad öppenvård). Före 2005 finns enbart slutenvårdsdata
 * då öppenvårdsrapporteringen ännu inte var etablerad.
 *
 * Internationell data: Extraherad från publicerade studier (se publikationer).
 */

// ---------------------------------------------------------------------------
// Svenska data — Socialstyrelsen, NBL49 (sutur/reinsertion sena axel/överarm)
// Beräknad som: slutenvård + specialiserad öppenvård (antal ingrepp/100 000)
// ---------------------------------------------------------------------------

export const SWEDEN_YEARS = [
  1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018, 2019, 2020, 2021, 2022, 2023, 2024,
] as const;

export type AgeGroup = keyof typeof SWEDEN_BY_AGE_GROUP;

export const SWEDEN_BY_AGE_GROUP = {
  "Totalt": [4.0, 4.1, 4.2, 4.6, 5.3, 5.4, 6.0, 9.5, 10.1, 10.9, 14.2, 19.3, 23.3, 29.2, 29.8, 31.4, 34.9, 35.0, 34.1, 33.4, 34.6, 32.4, 29.6, 30.8, 32.9, 36.8, 37.7],
  "40–44": [4.1, 2.2, 2.4, 4.3, 3.6, 3.7, 4.8, 7.8, 8.9, 10.4, 12.2, 16.8, 17.8, 20.1, 19.4, 20.4, 21.4, 24.8, 25.4, 20.8, 21.4, 17.4, 19.4, 27.2, 19.9, 24.4, 20.7],
  "45–49": [6.1, 5.5, 5.6, 7.0, 9.4, 7.3, 8.5, 13.7, 18.4, 15.1, 19.5, 26.5, 31.5, 41.8, 40.6, 37.6, 43.9, 41.6, 41.6, 42.5, 39.4, 40.5, 38.0, 39.5, 43.5, 45.2, 46.1],
  "50–54": [10.9, 11.1, 10.3, 12.3, 13.1, 12.5, 12.6, 24.9, 24.5, 24.0, 34.4, 44.0, 49.2, 66.0, 70.9, 68.1, 86.2, 76.4, 77.4, 72.1, 78.8, 66.3, 67.0, 62.9, 63.0, 78.9, 79.6],
  "55–59": [14.0, 15.4, 16.9, 17.1, 18.5, 16.9, 18.7, 32.7, 29.4, 32.2, 38.9, 52.5, 69.3, 85.5, 87.8, 87.7, 109.2, 110.8, 113.0, 107.7, 108.3, 103.6, 94.6, 92.6, 102.1, 111.7, 114.4],
  "60–64": [11.2, 11.1, 15.3, 13.8, 16.3, 23.0, 22.8, 30.4, 29.9, 35.2, 42.0, 66.4, 77.4, 89.5, 96.9, 111.0, 112.9, 122.6, 115.0, 118.1, 127.7, 115.4, 114.2, 121.8, 126.7, 138.7, 150.9],
  "65–69": [8.8, 9.1, 9.0, 9.5, 10.7, 9.5, 14.9, 21.0, 21.4, 25.7, 33.1, 47.4, 61.2, 80.7, 70.5, 81.1, 81.7, 87.0, 81.1, 89.1, 90.8, 89.5, 74.1, 85.8, 100.1, 111.7, 111.4],
  "70–74": [7.4, 6.8, 4.9, 7.2, 5.9, 7.4, 9.7, 9.8, 12.7, 16.5, 25.3, 31.0, 34.9, 60.9, 57.1, 63.6, 69.8, 67.1, 64.7, 63.9, 62.3, 67.8, 45.7, 51.6, 57.3, 65.0, 67.9],
  "75–79": [2.6, 2.3, 3.2, 2.4, 4.9, 4.0, 3.2, 5.5, 11.0, 12.3, 20.2, 21.0, 24.0, 24.6, 32.7, 32.8, 35.3, 32.9, 35.9, 32.2, 36.5, 31.8, 27.8, 26.6, 28.4, 32.7, 30.2],
} as const;

// Stockholm (Totalt, slutenvård + öppenvård) — aligned med SWEDEN_YEARS
export const STOCKHOLM_TOTALT: readonly number[] = [
  5.0, 6.2, 5.2, 5.1, 8.3, 8.6, 9.0, 11.6, 11.0, 12.4,
  15.7, 23.7, 27.9, 32.3, 31.6, 36.2, 37.0, 42.1, 38.3, 37.7,
  37.1, 40.3, 37.4, 36.4, 42.3, 50.0, 52.5,
] as const;

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "Totalt", label: "Totalt (alla åldrar)" },
  { value: "40–44", label: "40–44 år" },
  { value: "45–49", label: "45–49 år" },
  { value: "50–54", label: "50–54 år" },
  { value: "55–59", label: "55–59 år" },
  { value: "60–64", label: "60–64 år" },
  { value: "65–69", label: "65–69 år" },
  { value: "70–74", label: "70–74 år" },
  { value: "75–79", label: "75–79 år" },
];

// ---------------------------------------------------------------------------
// Internationella studier — jämförelsedata (totalincidens per 100 000)
// ---------------------------------------------------------------------------

export interface InternationalStudy {
  id: string;
  country: string;
  color: string;
  reference: string;
  denominatorNote: string;
  dataPoints: { year: number; value: number }[];
}

export const INTERNATIONAL_STUDIES: InternationalStudy[] = [
  {
    id: "finland",
    country: "Finland",
    color: "rgb(20, 184, 166)",
    reference: "Paloneva et al. 2015",
    denominatorNote: "Totalpopulation ≥18 år",
    dataPoints: [
      { year: 2008, value: 110 }, { year: 2009, value: 117 },
      { year: 2010, value: 124 }, { year: 2011, value: 131 },
    ],
  },
  {
    id: "korea",
    country: "Sydkorea",
    color: "rgb(249, 115, 22)",
    reference: "Jo et al. 2017",
    denominatorNote: "Åldersjusterad (US 2000 pop.)",
    dataPoints: [
      { year: 2008, value: 20.2 }, { year: 2009, value: 30.9 },
      { year: 2010, value: 43.5 }, { year: 2011, value: 76.4 },
      { year: 2012, value: 105.6 }, { year: 2013, value: 116.5 },
      { year: 2014, value: 117.5 }, { year: 2015, value: 116.0 },
    ],
  },
  {
    id: "usa",
    country: "USA",
    color: "rgb(239, 68, 68)",
    reference: "Colvin et al. 2012",
    denominatorNote: "Ålders-/könsjusterad (US 2000 pop.)",
    dataPoints: [
      { year: 2006, value: 91.8 },
    ],
  },
  {
    id: "japan",
    country: "Japan",
    color: "rgb(100, 116, 139)",
    reference: "Minami et al. 2025",
    denominatorNote: "Totalpopulation (Japan 2015 std.)",
    dataPoints: [
      { year: 2014, value: 14.0 }, { year: 2015, value: 14.0 },
      { year: 2016, value: 14.0 }, { year: 2017, value: 15.2 },
      { year: 2018, value: 16.3 }, { year: 2019, value: 16.8 },
      { year: 2020, value: 16.1 }, { year: 2021, value: 16.4 },
      { year: 2022, value: 16.9 },
    ],
  },
  {
    id: "chile",
    country: "Chile",
    color: "rgb(168, 85, 247)",
    reference: "Vidal et al. 2021",
    denominatorNote: "Population ≥25 år",
    dataPoints: [
      { year: 2008, value: 24.6 }, { year: 2009, value: 27.0 },
      { year: 2010, value: 29.5 }, { year: 2011, value: 31.9 },
      { year: 2012, value: 34.4 }, { year: 2013, value: 36.8 },
      { year: 2014, value: 39.3 }, { year: 2015, value: 41.7 },
      { year: 2016, value: 44.2 }, { year: 2017, value: 46.6 },
      { year: 2018, value: 49.1 },
    ],
  },
  {
    id: "brazil",
    country: "Brasilien (SUS)",
    color: "rgb(234, 179, 8)",
    reference: "Malavolta et al. 2017",
    denominatorNote: "Totalpop. — offentligt system (SUS) enbart",
    dataPoints: [
      { year: 2008, value: 1.87 }, { year: 2009, value: 1.97 },
      { year: 2010, value: 2.16 }, { year: 2011, value: 2.21 },
      { year: 2012, value: 2.50 }, { year: 2013, value: 2.84 },
      { year: 2014, value: 2.96 }, { year: 2015, value: 2.81 },
    ],
  },
  {
    id: "norway",
    country: "Norge",
    color: "rgb(225, 29, 72)",
    reference: "Tjomsland et al. 2025",
    denominatorNote: "Åldersjusterad, totalpop. — NBL49 (samma kod som Sverige)",
    dataPoints: [
      { year: 2019, value: 77 },
      { year: 2020, value: 76 },
      { year: 2021, value: 75 },
      { year: 2022, value: 74 },
      { year: 2023, value: 83 },
    ],
  },
  {
    id: "belgium",
    country: "Belgien",
    color: "rgb(16, 185, 129)",
    reference: "NIHDI 2025",
    denominatorNote: "Standardiserad, per 100 000 försäkrade (≈totalpop.)",
    dataPoints: [
      { year: 2014, value: 121 },
      { year: 2015, value: 119 },
      { year: 2016, value: 118 },
      { year: 2017, value: 116 },
      { year: 2018, value: 114 },
      { year: 2019, value: 112 },
      { year: 2021, value: 109 },
      { year: 2022, value: 108 },
      { year: 2023, value: 111 },
      { year: 2024, value: 115 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Jämförelsetabell — senaste datapunkt per land vs Sverige samma år
// ---------------------------------------------------------------------------

export interface ComparisonRow {
  country: string;
  latestValue: number;
  latestYear: number;
  swedenValue: number | null;
  reference: string;
}

export const COMPARISON_TABLE: ComparisonRow[] = INTERNATIONAL_STUDIES
  .map((study) => {
    const last = study.dataPoints[study.dataPoints.length - 1];
    const idx = (SWEDEN_YEARS as readonly number[]).indexOf(last.year);
    return {
      country: study.country,
      latestValue: last.value,
      latestYear: last.year,
      swedenValue: idx >= 0 ? SWEDEN_BY_AGE_GROUP["Totalt"][idx] : null,
      reference: study.reference,
    };
  })
  .sort((a, b) => b.latestValue - a.latestValue);

// ---------------------------------------------------------------------------
// Publikationer
// ---------------------------------------------------------------------------

export interface Publikation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  country: string;
}

export const PUBLIKATIONER: Publikation[] = [
  { id: "1", authors: "Paloneva et al.", year: 2015, title: "Increasing incidence of rotator cuff repairs — A nationwide registry study in Finland", journal: "BMC Musculoskelet Disord", country: "Finland" },
  { id: "2", authors: "Colvin et al.", year: 2012, title: "National trends in rotator cuff repair", journal: "J Bone Joint Surg Am", country: "USA" },
  { id: "3", authors: "Jo et al.", year: 2017, title: "National Trends in Surgery for Rotator Cuff Disease in Korea", journal: "J Korean Med Sci", country: "Sydkorea" },
  { id: "4", authors: "Minami et al.", year: 2025, title: "Trends of shoulder arthroplasty and rotator cuff repair in Japan: national database analysis", journal: "JSES International", country: "Japan" },
  { id: "5", authors: "Vidal et al.", year: 2021, title: "Increasing incidence of rotator cuff surgery: A nationwide registry study in Chile", journal: "BMC Musculoskelet Disord", country: "Chile" },
  { id: "6", authors: "Malavolta et al.", year: 2017, title: "Rotator cuff repair in the Brazilian Unified Health System: trends from 2003 to 2015", journal: "Rev Bras Ortop", country: "Brasilien" },
  { id: "7", authors: "Longo et al.", year: 2017, title: "The burden of rotator cuff surgery in Italy: a nationwide registry study", journal: "Arch Orthop Trauma Surg", country: "Italien" },
  { id: "8", authors: "Salvatore et al.", year: 2020, title: "Epidemiology of rotator cuff surgery in Italy: regional variation in access to health care", journal: "Musculoskelet Surg", country: "Italien" },
  { id: "9", authors: "Judge et al.", year: 2014, title: "Temporal trends and geographical variation in the use of subacromial decompression and rotator cuff repair in England", journal: "Bone Joint J", country: "England" },
  { id: "10", authors: "Yanik et al.", year: 2021, title: "Trends in rotator cuff repair rates and comorbidity burden among commercially insured patients", journal: "JSES Rev Rep Tech", country: "USA" },
  { id: "11", authors: "Tjomsland et al.", year: 2025, title: "Protocol for a national intervention programme aimed to reduce unwarranted variation and overuse of shoulder arthroscopy in Norway", journal: "BMJ Open Quality", country: "Norge" },
  { id: "12", authors: "Meeus et al. (NIHDI)", year: 2025, title: "Medical practice variations: Shoulder rotator cuff — Rupture. Analysis of distribution of medical practice in Belgium", journal: "NIHDI / RIZIV-INAMI", country: "Belgien" },
];

// ---------------------------------------------------------------------------
// Beräknade nyckeltal (baseras på Sverige, Totalt, 2008–2024)
// ---------------------------------------------------------------------------

const swedenTotalt = SWEDEN_BY_AGE_GROUP["Totalt"];
const n = swedenTotalt.length;

export const STATS = {
  genomsnittligIncidens: +(swedenTotalt.reduce((a, b) => a + b, 0) / n).toFixed(1),
  senaste: swedenTotalt[n - 1],
  trendProcent: +(((swedenTotalt[n - 1] - swedenTotalt[n - 11]) / swedenTotalt[n - 11]) * 100).toFixed(1),
  antalKallor: PUBLIKATIONER.length,
};
