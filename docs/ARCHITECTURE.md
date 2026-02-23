# Info-grafik — Teknisk dokumentation och arkitektur

Dokumentationen beskriver projektets uppbyggnad så att du kan förstå eller återskapa det utan att behöva de ursprungliga promptarna.

---

## 1. Projektöversikt

- **Syfte:** Dashboard-applikation med två huvudvyer: (1) en generell dashboard med analys, processflöde och rapporter, och (2) en specialiserad incidensanalys av rotatorcuffkirurgi i Sverige med internationella jämförelser.
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, ReactFlow, Chart.js, pptxgenjs, html-to-image.
- **Design:** Minimalistiskt, ljus bakgrund (Slate-50), mörk text (Slate-900), indigo-accents, Inter som typsnitt, subtila övergångar.

---

## 2. Teknisk stack

| Område | Teknik |
|--------|--------|
| Ramverk | Next.js 16 (App Router) |
| Språk | TypeScript 5 |
| Styling | Tailwind CSS v4, PostCSS |
| UI-komponenter | shadcn/ui (radix-ui), stil: new-york |
| Diagram | Chart.js 4, react-chartjs-2 |
| Flöden | ReactFlow 11 |
| Export | pptxgenjs (PPTX), html-to-image (PNG) |
| Typsnitt | Inter (next/font/google) |

### Beroenden (npm)

```text
next, react, react-dom
typescript
tailwindcss, @tailwindcss/postcss
shadcn (dev), radix-ui, class-variance-authority, clsx, tailwind-merge, lucide-react
chart.js, react-chartjs-2
reactflow
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
│   │   ├── page.tsx                    # Startsida: header + Tabs (Analys | Processflöde | Rapporter)
│   │   ├── globals.css                 # Tailwind + shadcn + tema (Slate/Indigo)
│   │   └── incidens-analys/
│   │       └── page.tsx                # Incidensanalys-dashboard (server component)
│   ├── components/
│   │   ├── ui/                         # shadcn: button, card, tabs, navigation-menu, select
│   │   ├── dashboard/
│   │   │   ├── analys-chart.tsx        # Linjediagram (Chart.js), mjuk indigo
│   │   │   ├── process-flow.tsx        # ReactFlow: steg Start → … → Uppföljning
│   │   │   └── rapporter-list.tsx      # Tabell med fiktiva dokument
│   │   └── incidens-analys/
│   │       ├── incidens-chart.tsx      # Linjediagram: Stockholm vs Riket med åldersgrupps-dropdown
│   │       ├── incidens-bubble.tsx     # Bubbeldiagram: internationell jämförelse + Sverige/Stockholm
│   │       ├── vardform-chart.tsx      # Staplat ytdiagram: slutenvård vs öppenvård
│   │       ├── age-heatmap.tsx         # Heatmap: incidens per åldersgrupp och år
│   │       ├── stockholm-comparison.tsx # Grupperat horisontellt stapeldiagram: Stockholm vs Riket (2024)
│   │       ├── ranking-bars.tsx        # Horisontella staplar: internationell ranking
│   │       └── export-section.tsx      # Wrapper: exportera valfritt kort som PNG eller PPTX
│   ├── data/
│   │   └── incidens-data.ts           # All data: svenska åldersgrupper, Stockholm, internationella studier
│   └── lib/
│       └── utils.ts                    # cn() (clsx + tailwind-merge)
├── data/
│   └── incidens-rotatorcuffkirurgi/    # Källfiler (CSV + PDF)
│       ├── Statistikdatabasen_slutenvård.csv
│       ├── Statistikdatabasen_oppenvard.csv
│       ├── Statistikdatabasen_2026-02-21 15_59_42.csv  # Kombinerad (äldre)
│       └── *.pdf                       # 12 internationella publikationer
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
- **Typsnitt:** Inter via Next.js font, används som `font-sans`.
- **Övergångar:** `transition-colors`, `transition-shadow`, `transition-all` med `duration-150`–`300` och `ease-out`; flikinnehåll med `animate-in fade-in-0 duration-300`.

---

## 5. Sidor och vyer

### 5.1 Startsida (`/`)

Header + Tabs med tre flikar:

- **Analys:** Linjediagram (Chart.js) med 12 månader, en dataserie i mjuk indigo med fill.
- **Processflöde:** ReactFlow med 5 noder: Start/Insamling → Analys → Beslutsstöd → Genomförande → Uppföljning.
- **Rapporter:** Tabell med kolumnerna ID, Titel, Datum, Typ, Status; fiktiva rader.

### 5.2 Incidensanalys (`/incidens-analys`)

Specialiserad dashboard för analys av rotatorcuffkirurgi (operationskod NBL49). Innehåller:

**Datakällor:**
- **Sverige (Socialstyrelsen):** Antal ingrepp per 100 000 invånare, uppdelat på slutenvård och specialiserad öppenvård, per åldersgrupp och år (1998–2024). Separat data för Riket och Region Stockholm.
- **Internationellt:** Incidens extraherad från 12 publicerade studier (Finland, Sydkorea, USA, Japan, Chile, Brasilien, Norge, Belgien m.fl.).

**Komponenter på sidan (uppifrån och ner):**

1. **Nyckeltal** — fyra kort: Ingrepp 2024, Trend 2014–2024, Antal källpublikationer, Stockholm vs Riket-kvot (med sparkline).
2. **Stockholm vs Riket — incidens över tid** (`incidens-chart.tsx`) — interaktivt linjediagram med två linjer (Riket = indigo, Stockholm = sky blue). Dropdown för att filtrera efter åldersgrupp. Tooltip visar kvot och skillnad.
3. **Vårdformsskifte** (`vardform-chart.tsx`) — staplat ytdiagram som visar förskjutningen från slutenvård till specialiserad öppenvård sedan 1998.
4. **Åldersheatmap** (`age-heatmap.tsx`) — HTML-tabell med färgkodade celler. Rader = åldersgrupper (40–44 till 75–79), kolumner = år. Mörkare indigo = högre incidens.
5. **Stockholm vs Riket per åldersgrupp** (`stockholm-comparison.tsx`) — horisontellt grupperat stapeldiagram för 2024, med kvot-label vid varje Stockholm-stapel.
6. **Internationellt bubbeldiagram** (`incidens-bubble.tsx`) — bubblor per land, med multi-bubblor för Sverige (Riket) och Stockholm över tid (varannat år 2004–2024). Custom plugin för selektiva labels.
7. **Internationell ranking** (`ranking-bars.tsx`) — horisontella staplar sorterade högst till lägst, Sverige markerat i indigo.
8. **Internationell jämförelsetabell** — senast rapporterad incidens per land vs Sverige samma år, med procentuell skillnad (grön = Sverige högre, röd = lägre).
9. **Datakällor & metod** — beskrivning av svensk och internationell data, inklusive begränsningar.
10. **Publikationer** — tabell med 12 studier (författare, år, titel, journal, land).

**Exportfunktion:**
Varje diagramkort (1–8) är inneslutet i `ExportableSection` som lägger till en nedladdningsknapp (övre högra hörnet). Klick öppnar en meny med:
- **PNG** — hög upplösning (2x pixel ratio) via `html-to-image`.
- **PPTX** — genererar en PowerPoint-slide (widescreen 16:9) med titel + bild via `pptxgenjs`.

### 5.3 Datamodell (`src/data/incidens-data.ts`)

| Export | Typ | Beskrivning |
|--------|-----|-------------|
| `SWEDEN_YEARS` | `readonly number[]` | År 1998–2024 (27 element) |
| `SWEDEN_BY_AGE_GROUP` | `Record<AgeGroup, readonly number[]>` | Riket: incidens per åldersgrupp och år |
| `STOCKHOLM_BY_AGE_GROUP` | `Record<AgeGroup, readonly number[]>` | Stockholm: incidens per åldersgrupp och år |
| `STOCKHOLM_TOTALT` | `readonly number[]` | Stockholm totalt (deriverad) |
| `SLUTENVARD_TOTALT` | `readonly number[]` | Riket slutenvård totalt |
| `OPPENVARD_TOTALT` | `readonly number[]` | Riket öppenvård totalt |
| `STOCKHOLM_RATIO` | `readonly number[]` | Stockholm/Riket-kvot per år |
| `STOCKHOLM_BY_AGE_2024` | `{ group, stockholm, riket }[]` | 2024 per åldersgrupp (för stapeldiagrammet) |
| `INTERNATIONAL_STUDIES` | `InternationalStudy[]` | 8 länder med datapunkter, färger, referenser |
| `COMPARISON_TABLE` | `ComparisonRow[]` | Beräknad jämförelsetabell |
| `PUBLIKATIONER` | `Publikation[]` | 12 publikationer |
| `STATS` | `object` | Beräknade nyckeltal |
| `AGE_GROUP_OPTIONS` | `{ value, label }[]` | Dropdown-alternativ |

---

## 6. Återskapa projektet (checklista)

1. **Skapa Next.js-app** med TypeScript, Tailwind, App Router, `src/`, ESLint.
2. **Initiera shadcn/ui** (defaults, Tailwind v4); lägg till: **tabs**, **card**, **button**, **navigation-menu**, **select**.
3. **Installera:** `reactflow`, `chart.js`, `react-chartjs-2`, `pptxgenjs`, `html-to-image`.
4. **Tema:** CSS-variabler: bakgrund Slate-50, text Slate-900, primary Indigo-600. Inter som `font-sans`.
5. **Startsida (`/`):** Header + Tabs med tre flikar (Analys, Processflöde, Rapporter).
6. **Incidensanalys (`/incidens-analys`):** Datamodul + 7 diagramkomponenter + exportwrapper, samordnade i en server-sidkomponent.
7. **Data:** Extrahera CSV-data (slutenvård + öppenvård) och internationella siffror från PDF-publikationer. Lagra som typade konstanter i `src/data/incidens-data.ts`.

---

## 7. Kommandoreferens

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

*Senast uppdaterad: 2026-02-22. Vid större förändringar, uppdatera denna fil.*
