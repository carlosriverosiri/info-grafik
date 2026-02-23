/**
 * Data för incidensanalys av främre korsbandsrekonstruktion (ACLR).
 *
 * Svensk data: Socialstyrelsen, Statistikdatabasen (NGE41).
 * Måttet är "antal ingrepp per 100 000 invånare" (summa av slutenvård
 * och specialiserad öppenvård). Före 2005 finns enbart slutenvårdsdata
 * då öppenvårdsrapporteringen ännu inte var etablerad.
 *
 * Internationell data: Extraherad från publicerade studier.
 */

export const SWEDEN_YEARS = [
  1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018, 2019, 2020, 2021, 2022, 2023, 2024,
] as const;

export type AgeGroup = keyof typeof SWEDEN_BY_AGE_GROUP;

export const SWEDEN_BY_AGE_GROUP = {
  "Totalt": [19.3, 20.0, 21.3, 21.5, 20.4, 22.2, 21.7, 34.6, 37.6, 36.7, 37.9, 37.3, 43.8, 40.4, 47.4, 47.3, 50.7, 45.1, 46.1, 52.3, 41.2, 43.1, 38.9, 34.4, 42.1, 47.7, 48.2],
  "10–14": [0.9, 2.0, 1.4, 1.2, 1.3, 3.2, 2.4, 8.1, 7.1, 10.7, 8.3, 10.8, 14.2, 15.6, 15.3, 14.4, 20.7, 25.1, 20.0, 17.0, 12.4, 14.4, 13.4, 11.0, 15.3, 17.9, 19.8],
  "15–19": [58.0, 59.7, 65.5, 62.7, 61.1, 64.5, 77.5, 120.8, 133.0, 139.4, 135.9, 142.4, 164.7, 161.7, 181.5, 186.1, 205.5, 177.2, 200.3, 215.4, 174.4, 170.2, 154.6, 142.2, 169.0, 185.3, 179.0],
  "20–24": [75.0, 80.1, 78.9, 81.0, 68.0, 79.5, 69.7, 119.1, 126.5, 115.6, 131.5, 132.1, 144.7, 140.2, 164.9, 165.9, 170.9, 145.5, 144.3, 168.0, 141.0, 152.2, 145.6, 120.5, 158.9, 167.3, 165.6],
  "25–29": [71.2, 70.9, 72.9, 72.3, 67.5, 72.0, 63.7, 91.4, 107.6, 94.7, 96.1, 92.2, 108.7, 100.5, 126.1, 113.7, 122.5, 116.3, 120.5, 138.1, 107.5, 113.5, 101.4, 88.1, 105.4, 120.2, 129.9],
  "30–34": [42.9, 41.3, 48.1, 52.6, 49.4, 50.3, 47.6, 72.8, 72.7, 68.9, 67.2, 57.2, 76.1, 64.3, 88.4, 79.6, 82.7, 77.0, 78.7, 89.0, 67.7, 74.9, 66.7, 59.1, 68.0, 83.6, 82.3],
  "35–39": [27.2, 35.0, 36.2, 32.0, 35.4, 39.8, 33.4, 49.2, 61.3, 52.7, 56.0, 54.1, 65.6, 54.6, 60.0, 61.7, 66.4, 60.4, 55.5, 64.7, 49.9, 49.9, 53.0, 40.4, 52.7, 62.5, 68.7],
  "40–44": [14.1, 14.8, 18.3, 22.3, 21.9, 23.0, 26.7, 44.6, 39.6, 45.2, 49.0, 42.8, 46.6, 40.9, 50.5, 61.0, 56.3, 57.4, 52.3, 62.8, 48.0, 47.7, 40.8, 41.5, 45.0, 52.3, 53.2],
} as const;

// Stockholm per åldersgrupp (slutenvård + öppenvård)
export const STOCKHOLM_BY_AGE_GROUP: Record<AgeGroup, readonly number[]> = {
  "Totalt": [26.7, 28.5, 33.7, 30.1, 30.2, 38.2, 33.4, 40.0, 44.7, 42.6, 50.4, 46.5, 59.7, 54.5, 80.2, 75.4, 85.3, 81.8, 84.0, 92.0, 50.0, 53.2, 48.9, 47.5, 50.1, 62.1, 62.3],
  "10–14": [2.0, 2.9, 4.6, 4.4, 0.8, 6.6, 6.5, 14.8, 12.6, 16.5, 9.9, 17.5, 21.5, 32.5, 32.6, 34.9, 36.8, 54.4, 32.3, 26.0, 20.9, 21.0, 19.2, 22.9, 17.5, 27.5, 26.1],
  "15–19": [91.4, 81.8, 104.7, 92.7, 88.2, 90.0, 116.2, 128.7, 164.9, 135.0, 143.7, 142.9, 186.9, 204.5, 265.7, 262.3, 287.1, 269.6, 325.8, 338.2, 184.3, 183.4, 174.8, 178.2, 179.3, 235.8, 203.3],
  "20–24": [74.6, 96.3, 101.3, 93.8, 88.8, 117.2, 80.4, 124.8, 117.9, 92.4, 141.3, 150.6, 171.6, 163.8, 228.7, 214.6, 266.4, 224.3, 212.4, 240.3, 124.0, 136.9, 154.8, 127.5, 154.5, 179.4, 178.5],
  "25–29": [84.2, 85.5, 91.2, 83.2, 79.1, 109.6, 91.5, 92.5, 113.9, 112.8, 120.6, 111.3, 130.0, 112.1, 197.4, 142.3, 175.0, 181.0, 205.4, 219.9, 110.2, 129.0, 108.1, 114.7, 104.9, 117.1, 146.4],
  "30–34": [55.1, 56.1, 73.7, 72.5, 74.9, 84.1, 77.6, 83.6, 80.2, 79.7, 93.2, 68.0, 110.5, 92.9, 152.1, 140.1, 132.2, 127.7, 133.1, 140.4, 88.6, 101.5, 84.1, 72.6, 75.0, 104.5, 103.1],
  "35–39": [38.8, 47.2, 57.3, 37.5, 52.6, 73.8, 47.1, 60.4, 62.0, 58.9, 80.6, 70.5, 88.9, 80.4, 109.1, 106.3, 124.5, 114.7, 103.0, 114.0, 58.9, 54.8, 66.1, 53.2, 76.3, 75.3, 78.3],
  "40–44": [22.9, 27.3, 30.1, 36.0, 31.6, 45.9, 42.1, 42.3, 58.9, 57.2, 75.7, 68.2, 69.5, 44.0, 98.6, 117.0, 98.9, 124.8, 114.7, 117.0, 63.2, 67.1, 49.0, 61.6, 60.7, 76.6, 76.3],
};

export const STOCKHOLM_TOTALT: readonly number[] = STOCKHOLM_BY_AGE_GROUP["Totalt"] as unknown as number[];

// --------------------------------------------------------------------------
// Vårdformsdata — slutenvård vs öppenvård (Riket, Totalt, per 100 000)
// --------------------------------------------------------------------------

export const SLUTENVARD_TOTALT: readonly number[] = [
  19.3, 20.0, 21.3, 21.5, 20.4, 22.2, 21.7, 20.7, 21.4, 16.9,
  13.1, 12.0, 12.8, 13.5, 13.2, 12.9, 12.2, 10.6, 8.5, 6.7,
  4.6, 3.7, 3.4, 1.8, 1.7, 2.6, 3.0,
] as const;

export const OPPENVARD_TOTALT: readonly number[] = [
  0, 0, 0, 0, 0, 0, 0, 13.9, 16.2, 19.8,
  24.8, 25.3, 31.0, 26.9, 34.2, 34.4, 38.5, 34.5, 37.6, 45.6,
  36.6, 39.4, 35.5, 32.6, 40.4, 45.1, 45.2,
] as const;

// Stockholm per åldersgrupp 2024 (slutenvård + öppenvård)
export const STOCKHOLM_BY_AGE_2024: { group: string; stockholm: number; riket: number }[] = [
  { group: "15–19", stockholm: 203.3, riket: 179.0 },
  { group: "20–24", stockholm: 178.5, riket: 165.6 },
  { group: "25–29", stockholm: 146.4, riket: 129.9 },
  { group: "30–34", stockholm: 103.1, riket: 82.3 },
  { group: "35–39", stockholm: 78.3, riket: 68.7 },
  { group: "40–44", stockholm: 76.3, riket: 53.2 },
];

// Stockholm / Riket-kvot (Totalt)
export const STOCKHOLM_RATIO: readonly number[] = (STOCKHOLM_BY_AGE_GROUP["Totalt"] as unknown as number[]).map(
  (sthlm, i) => {
    const riket = SWEDEN_BY_AGE_GROUP["Totalt"][i];
    return riket > 0 ? +((sthlm / riket).toFixed(2)) : 0;
  }
);

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "Totalt", label: "Totalt (alla åldrar)" },
  { value: "10–14", label: "10–14 år" },
  { value: "15–19", label: "15–19 år" },
  { value: "20–24", label: "20–24 år" },
  { value: "25–29", label: "25–29 år" },
  { value: "30–34", label: "30–34 år" },
  { value: "35–39", label: "35–39 år" },
  { value: "40–44", label: "40–44 år" },
];

// --------------------------------------------------------------------------
// Internationella studier
// --------------------------------------------------------------------------

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
    id: "australia",
    country: "Australien",
    color: "rgb(234, 179, 8)",
    reference: "Zbrojkiewicz et al. 2018",
    denominatorNote: "Totalpopulation",
    dataPoints: [{ year: 2015, value: 77 }],
  },
  {
    id: "canada",
    country: "Kanada (Alberta)",
    color: "rgb(239, 68, 68)",
    reference: "Paudel et al. 2022",
    denominatorNote: "Populationsbaserad, Alberta, 2002–2018",
    dataPoints: [
      { year: 2002, value: 38 }, { year: 2006, value: 42 },
      { year: 2010, value: 47 }, { year: 2014, value: 49 },
      { year: 2018, value: 51 },
    ],
  },
  {
    id: "denmark",
    country: "Danmark",
    color: "rgb(59, 130, 246)",
    reference: "Singh 2018 / Granan et al. 2009",
    denominatorNote: "Nationellt korsbandsregister (DKRR), 2005–2007",
    dataPoints: [{ year: 2006, value: 38 }],
  },
  {
    id: "finland",
    country: "Finland",
    color: "rgb(20, 184, 166)",
    reference: "Arimaa et al. 2023",
    denominatorNote: "Totalpopulation, registerdata",
    dataPoints: [{ year: 2020, value: 46 }],
  },
  {
    id: "italy",
    country: "Italien",
    color: "rgb(249, 115, 22)",
    reference: "Longo et al. 2021",
    denominatorNote: "Nationell sjukvårdsdata (SDO), vuxenpopulation ≥ 15 år, 2001–2015",
    dataPoints: [
      { year: 2001, value: 21.7 }, { year: 2003, value: 27.6 },
      { year: 2005, value: 31.5 }, { year: 2007, value: 33.2 },
      { year: 2009, value: 35.9 }, { year: 2011, value: 37.1 },
      { year: 2013, value: 34.8 }, { year: 2015, value: 33.6 },
    ],
  },
  {
    id: "new_zealand",
    country: "Nya Zeeland",
    color: "rgb(16, 185, 129)",
    reference: "Gianotti et al. 2009",
    denominatorNote: "Försäkringsdata (ACC), juli 2000 – juni 2005",
    dataPoints: [{ year: 2003, value: 37 }],
  },
  {
    id: "norway",
    country: "Norge",
    color: "rgb(225, 29, 72)",
    reference: "Granan et al. 2009",
    denominatorNote: "Nationellt korsbandsregister, 2004–2007",
    dataPoints: [
      { year: 2004, value: 34 }, { year: 2005, value: 34 },
      { year: 2006, value: 35 }, { year: 2007, value: 34 },
    ],
  },
  {
    id: "usa",
    country: "USA",
    color: "rgb(99, 102, 241)",
    reference: "Mall et al. 2014",
    denominatorNote: "National Hospital Discharge Survey + National Survey of Ambulatory Surgery",
    dataPoints: [{ year: 2006, value: 43 }],
  },
  {
    id: "romania",
    country: "Rumänien",
    color: "rgb(100, 116, 139)",
    reference: "Tolan et al. 2025",
    denominatorNote: "Totalpopulation, nationell sjukvårdsdata (CNAS)",
    dataPoints: [
      { year: 2017, value: 7.9 }, { year: 2018, value: 8.2 },
      { year: 2019, value: 9.4 }, { year: 2020, value: 5.3 },
      { year: 2021, value: 6.7 }, { year: 2022, value: 10.0 },
      { year: 2023, value: 9.8 },
    ],
  },
];

// --------------------------------------------------------------------------
// Jämförelsetabell
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
// Publikationer
// --------------------------------------------------------------------------

export interface Publikation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  country: string;
}

export const PUBLIKATIONER: Publikation[] = [
  { id: "1", authors: "Paudel et al.", year: 2022, title: "Increasing incidence of anterior cruciate ligament reconstruction: a 17-year population-based study", journal: "BMC Musculoskelet Disord", country: "Kanada" },
  { id: "2", authors: "Mall et al.", year: 2014, title: "Incidence and Trends of Anterior Cruciate Ligament Reconstruction in the United States", journal: "Am J Sports Med", country: "USA" },
  { id: "3", authors: "Buller et al.", year: 2014, title: "Trends in Anterior Cruciate Ligament Reconstruction in the United States", journal: "Orthop J Sports Med", country: "USA" },
  { id: "4", authors: "Granan et al.", year: 2009, title: "The Scandinavian ACL registries 2004–2007: baseline epidemiology", journal: "Acta Orthop", country: "Skandinavien" },
  { id: "5", authors: "Tolan et al.", year: 2025, title: "Nationwide Trends in Arthroscopic Knee Surgery and ACL Reconstruction in Romania, 2017–2023", journal: "Healthcare", country: "Rumänien" },
  { id: "6", authors: "Tolan et al.", year: 2026, title: "Unequal Regional Access to ACL Reconstruction in Romania: A Nationwide Epidemiologic Assessment (2017–2023)", journal: "Healthcare", country: "Rumänien" },
  { id: "7", authors: "Zbrojkiewicz et al.", year: 2018, title: "A systematic review of the incidence of ACL reconstruction", journal: "Knee Surg Sports Traumatol Arthrosc", country: "Australien" },
  { id: "8", authors: "Arimaa et al.", year: 2023, title: "Incidence of ACL reconstruction in Finland", journal: "Scand J Med Sci Sports", country: "Finland" },
  { id: "9", authors: "Ihn et al.", year: 2025, title: "Peripandemic Utilization of Primary Anterior Cruciate Ligament Reconstruction in a United States–Based Integrated Health Care System", journal: "Am J Sports Med", country: "USA" },
  { id: "10", authors: "Herzog et al.", year: 2017, title: "Incidence of Anterior Cruciate Ligament Reconstruction Among Adolescent Females in the United States", journal: "JAMA Pediatrics", country: "USA" },
  { id: "11", authors: "Wittig et al.", year: 2021, title: "Application and Surgical Technique of ACL Reconstruction Using Worldwide Registry Datasets", journal: "JISAKOS", country: "Internationellt" },
  { id: "12", authors: "Singh", year: 2018, title: "International Epidemiology of Anterior Cruciate Ligament Injuries", journal: "Orthop Res Online J", country: "Internationellt" },
  { id: "13", authors: "Longo et al.", year: 2021, title: "Epidemiology of Anterior Cruciate Ligament Reconstruction Surgery in Italy: A 15-Year Nationwide Registry Study", journal: "J Clin Med", country: "Italien" },
  { id: "14", authors: "Sanders et al.", year: 2016, title: "Incidence of Anterior Cruciate Ligament Tears and Reconstruction: A 21-Year Population-Based Study", journal: "Am J Sports Med", country: "USA" },
  { id: "15", authors: "Gianotti et al.", year: 2009, title: "Incidence of anterior cruciate ligament injury and other knee ligament injuries: a national population-based study", journal: "J Sci Med Sport", country: "Nya Zeeland" },
];

// --------------------------------------------------------------------------
// Beräknade nyckeltal
// --------------------------------------------------------------------------

const swedenTotalt = SWEDEN_BY_AGE_GROUP["Totalt"];
const n = swedenTotalt.length;

export const STATS = {
  genomsnittligIncidens: +(swedenTotalt.reduce((a, b) => a + b, 0) / n).toFixed(1),
  senaste: swedenTotalt[n - 1],
  trendProcent: +(((swedenTotalt[n - 1] - swedenTotalt[n - 11]) / swedenTotalt[n - 11]) * 100).toFixed(1),
  antalKallor: PUBLIKATIONER.length,
};
