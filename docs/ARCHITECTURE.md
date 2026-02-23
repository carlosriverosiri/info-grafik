# Info-grafik — Teknisk dokumentation och arkitektur

Dokumentationen beskriver projektets uppbyggnad så att du kan förstå eller återskapa det utan att behöva de ursprungliga promptarna.

---

## 1. Projektöversikt

- **Syfte:** Dashboard-applikation för analys av nationella operationsincidenser (antal ingrepp per 100 000 invånare) med interaktiva diagram, åldersfördelning, vårdformsskifte, Stockholm-vs-Riket-jämförelser och internationella jämförelser från publicerade populationsstudier.
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Chart.js, pptxgenjs, html-to-image.
- **Design:** Minimalistiskt, ljus bakgrund (Slate-50), mörk text (Slate-900), färgkodade accenter per kategori, Inter som typsnitt, subtila övergångar.

---

## 2. Teknisk stack

| Område | Teknik |
|--------|--------|
| Ramverk | Next.js 16 (App Router) |
| Språk | TypeScript 5 |
| Styling | Tailwind CSS v4, PostCSS |
| UI-komponenter | shadcn/ui (radix-ui), stil: new-york |
| Diagram | Chart.js 4, react-chartjs-2 |
| Export | pptxgenjs (PPTX), html-to-image (PNG) |
| Typsnitt | Inter (next/font/google) |

### Beroenden (npm)

```text
next, react, react-dom
typescript
tailwindcss, @tailwindcss/postcss
shadcn (dev), radix-ui, class-variance-authority, clsx, tailwind-merge, lucide-react
chart.js, react-chartjs-2
pptxgenjs, html-to-image
tw-animate-css
```

### shadcn/ui-komponenter i användning

- `tabs`, `card`, `button`, `navigation-menu`, `select`

---

## 3. Mappstruktur och ansvar

```text
info-grafik/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout: Inter, metadata, lang="sv"
│   │   ├── page.tsx                    # Startsida: incidensanalys-hub med kategorikort
│   │   ├── globals.css                 # Tailwind + shadcn + tema (Slate/Indigo)
│   │   ├── incidens-analys/
│   │   │   └── page.tsx                # Rotatorcuffkirurgi-dashboard (server component)
│   │   └── incidens-acl/
│   │       └── page.tsx                # Främre korsbandskirurgi-dashboard (server component)
│   ├── components/
│   │   ├── ui/                         # shadcn: button, card, tabs, navigation-menu, select
│   │   ├── incidens-analys/            # Diagramkomponenter för rotatorcuff
│   │   │   ├── incidens-chart.tsx      # Linjediagram: Stockholm vs Riket med åldersgrupps-dropdown
│   │   │   ├── incidens-bubble.tsx     # Bubbeldiagram: internationell jämförelse + Sverige/Stockholm
│   │   │   ├── vardform-chart.tsx      # Staplat ytdiagram: slutenvård vs öppenvård
│   │   │   ├── age-heatmap.tsx         # Heatmap: incidens per åldersgrupp och år
│   │   │   ├── stockholm-comparison.tsx # Grupperat stapeldiagram: Stockholm vs Riket (2024)
│   │   │   ├── ranking-bars.tsx        # Horisontella staplar: internationell ranking
│   │   │   └── export-section.tsx      # Wrapper: exportera valfritt kort som PNG eller PPTX
│   │   └── incidens-acl/              # Diagramkomponenter för ACL (speglar incidens-analys/)
│   │       ├── incidens-chart.tsx
│   │       ├── incidens-bubble.tsx
│   │       ├── vardform-chart.tsx
│   │       ├── age-heatmap.tsx
│   │       ├── stockholm-comparison.tsx
│   │       └── ranking-bars.tsx
│   ├── data/
│   │   ├── incidens-data.ts           # Rotatorcuff: svenska åldersgrupper, Stockholm, internationella studier
│   │   └── incidens-acl-data.ts       # ACL: svenska åldersgrupper, Stockholm, internationella studier
│   └── lib/
│       └── utils.ts                    # cn() (clsx + tailwind-merge)
├── data/
│   ├── incidens-rotatorcuffkirurgi/    # Källfiler (CSV + PDF)
│   │   ├── Statistikdatabasen_slutenvård.csv
│   │   ├── Statistikdatabasen_oppenvard.csv
│   │   └── *.pdf                       # Internationella publikationer
│   └── incidens-acl/                   # Källfiler (CSV + PDF) för ACL
│       ├── acl-slutenvard.csv
│       ├── acl-oppenvard.csv
│       └── *.pdf                       # Internationella publikationer
├── docs/
│   └── ARCHITECTURE.md                 # Denna fil
├── components.json                     # shadcn config (aliases, style: new-york)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 4. Design och tema

- **Bakgrund:** Slate-50 (`oklch(0.984 0.003 247.858)`).
- **Text:** Slate-900 (`oklch(0.208 0.016 252.894)`).
- **Primär/knappar:** Indigo-600 (`oklch(0.511 0.262 276.966)`); primär text på knappar vit.
- **Kort:** Vit bakgrund, tunna Slate-kanter, lätt skugga; hover: `shadow-md`.
- **Kategorifärger (dashboard):** Indigo (rotatorcuff), Sky (ACL), Emerald (hallux valgus), Amber (Dupuytren), Rose (höftplastik).
- **Typsnitt:** Inter via Next.js font, används som `font-sans`.
- **Övergångar:** `transition-colors`, `transition-shadow`, `transition-all` med `duration-150`–`300` och `ease-out`.

---

## 5. Sidor och vyer

### 5.1 Startsida (`/`)

Incidensanalys-hub med fem kategorikort i ett responsivt rutnät (1/2/3 kolumner). Varje kort representerar en kirurgisk kategori:

| Kategori | Anatomisk region | Operationskod | Status |
|----------|-----------------|---------------|--------|
| Rotatorcuffkirurgi | Axel | NBF/NBG | Aktiv → `/incidens-analys` |
| Främre korsbandskirurgi | Knä | NGE41 | Aktiv → `/incidens-acl` |
| Hallux valgus | Fot | NHK/NHL | Planerad |
| Dupuytrens kontraktur | Hand | NDM | Planerad |
| Höftplastik | Höft | NFB | Planerad |

Aktiva kort visar: senaste incidens (per 100k), 10-årstrend (%), antal internationella källor. Klick navigerar till analysdashboard. Planerade kort visar "Kommer"-badge.

Informationssektion om datakällorna (Socialstyrelsen, internationella studier) längst ned.

### 5.2 Incidensanalys — Rotatorcuffkirurgi (`/incidens-analys`)

Dashboard för analys av rotatorcuffkirurgi (operationskod NBL49). Data: Socialstyrelsen 1998–2024.

**Komponenter (uppifrån och ner):**

1. **Nyckeltal** — fyra kort: Ingrepp 2024, Trend 2014–2024, Antal källpublikationer, Stockholm vs Riket-kvot (med sparkline).
2. **Stockholm vs Riket — incidens över tid** — interaktivt linjediagram med dropdown för åldersgrupp.
3. **Vårdformsskifte** — staplat ytdiagram (slutenvård → öppenvård).
4. **Åldersheatmap** — HTML-tabell, mörkare indigo = högre incidens.
5. **Stockholm vs Riket per åldersgrupp** — grupperat stapeldiagram (2024).
6. **Internationellt bubbeldiagram** — multi-bubblor för Sverige/Stockholm + enskilda länder.
7. **Internationell ranking** — horisontella staplar sorterade högst till lägst.
8. **Internationell jämförelsetabell** — senast rapporterad incidens per land vs Sverige.
9. **Datakällor & metod**
10. **Publikationer** — tabell med internationella studier.

### 5.3 Incidensanalys — Främre korsbandskirurgi (`/incidens-acl`)

Dashboard för analys av ACL-rekonstruktion (operationskod NGE41). Speglar rotatorcuff-layouten med ACL-specifik data. Data: Socialstyrelsen 1998–2024.

**Skillnader mot rotatorcuff-sidan:**
- Åldersgrupper anpassade för ACL: 10–14 till 40–44 år (vs 40–44 till 75–79 för rotatorcuff).
- Heatmap sorterad med yngsta åldersgruppen nederst.
- 9 internationella länder: Australien, Kanada (Alberta), Danmark, Finland, Italien, Nya Zeeland, Norge, USA, Rumänien.
- 15 publikationer.

### 5.4 Exportfunktion

Varje diagramkort (alla analyssidor) är inneslutet i `ExportableSection` (delar komponent, `incidens-analys/export-section.tsx`) som lägger till en nedladdningsknapp:
- **PNG** — hög upplösning (2x pixel ratio) via `html-to-image`.
- **PPTX** — genererar en PowerPoint-slide (widescreen 16:9) via `pptxgenjs`.

---

## 6. Datamodell

### 6.1 Rotatorcuff (`src/data/incidens-data.ts`)

| Export | Typ | Beskrivning |
|--------|-----|-------------|
| `SWEDEN_YEARS` | `readonly number[]` | År 1998–2024 (27 element) |
| `SWEDEN_BY_AGE_GROUP` | `Record<AgeGroup, readonly number[]>` | Riket: incidens per åldersgrupp och år |
| `STOCKHOLM_BY_AGE_GROUP` | `Record<AgeGroup, readonly number[]>` | Stockholm: incidens per åldersgrupp och år |
| `STOCKHOLM_TOTALT` | `readonly number[]` | Stockholm totalt (deriverad) |
| `SLUTENVARD_TOTALT` | `readonly number[]` | Riket slutenvård totalt |
| `OPPENVARD_TOTALT` | `readonly number[]` | Riket öppenvård totalt |
| `STOCKHOLM_RATIO` | `readonly number[]` | Stockholm/Riket-kvot per år |
| `STOCKHOLM_BY_AGE_2024` | `{ group, stockholm, riket }[]` | 2024 per åldersgrupp |
| `INTERNATIONAL_STUDIES` | `InternationalStudy[]` | Länder med datapunkter, färger, referenser |
| `COMPARISON_TABLE` | `ComparisonRow[]` | Beräknad jämförelsetabell |
| `PUBLIKATIONER` | `Publikation[]` | Publikationslista |
| `STATS` | `object` | Beräknade nyckeltal (genomsnitt, senaste, trend, antal källor) |
| `AGE_GROUP_OPTIONS` | `{ value, label }[]` | Dropdown-alternativ |

### 6.2 ACL (`src/data/incidens-acl-data.ts`)

Samma struktur som rotatorcuff-modulen. Åldersgrupper: Totalt, 10–14, 15–19, 20–24, 25–29, 30–34, 35–39, 40–44.

9 internationella studier: Australien (Zbrojkiewicz 2018), Kanada (Paudel 2022), Danmark (Singh 2018 / Granan 2009), Finland (Arimaa 2023), Italien (Longo 2021, 8 datapunkter 2001–2015), Nya Zeeland (Gianotti 2009), Norge (Granan 2009), USA (Mall 2014), Rumänien (Tolan 2025).

15 publikationer.

---

## 7. Återskapa projektet (checklista)

1. **Skapa Next.js-app** med TypeScript, Tailwind, App Router, `src/`, ESLint.
2. **Initiera shadcn/ui** (defaults, Tailwind v4); lägg till: **tabs**, **card**, **button**, **navigation-menu**, **select**.
3. **Installera:** `chart.js`, `react-chartjs-2`, `pptxgenjs`, `html-to-image`.
4. **Tema:** CSS-variabler: bakgrund Slate-50, text Slate-900, primary Indigo-600. Inter som `font-sans`.
5. **Startsida (`/`):** Incidensanalys-hub med kategorikort, importerar `STATS` från respektive datamodul.
6. **Analysdashboard:** Datamodul + 6 diagramkomponenter + exportwrapper per kirurgisk kategori.
7. **Data:** Extrahera CSV-data (slutenvård + öppenvård, Socialstyrelsen) och internationella siffror från PDF-publikationer. Lagra som typade konstanter i `src/data/`.

---

## 8. Kommandoreferens

```bash
# Utveckling
npm run dev

# Produktionsbuild
npm run build
npm start

# shadcn (vid behov)
npx shadcn@latest add <komponent>
```

---

*Senast uppdaterad: 2026-02-23. Vid större förändringar, uppdatera denna fil.*
