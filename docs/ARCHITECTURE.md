# Info-grafik — Teknisk dokumentation och arkitektur

Dokumentationen beskriver projektets uppbyggnad så att du kan förstå eller återskapa det utan att behöva de ursprungliga promptarna.

---

## 1. Projektöversikt

- **Syfte:** Dashboard för professionell institution (bank/läkare/universitet) med tre vyer: Analys (diagram), Processflöde (flödesschema) och Rapporter (dokumentlista).
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, ReactFlow, Chart.js.
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
| Typsnitt | Inter (next/font/google) |

### Beroenden (npm)

```text
next, react, react-dom
typescript
tailwindcss, @tailwindcss/postcss
shadcn (dev), radix-ui, class-variance-authority, clsx, tailwind-merge, lucide-react
chart.js, react-chartjs-2
reactflow
tw-animate-css
```

### shadcn/ui-komponenter i användning

- `tabs`, `card`, `button`, `navigation-menu`

---

## 3. Mappstruktur och ansvar

```text
info-grafik/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout: Inter, metadata, lang="sv"
│   │   ├── page.tsx        # Startsida: header + Tabs (Analys | Processflöde | Rapporter)
│   │   └── globals.css     # Tailwind + shadcn + tema (Slate/Indigo)
│   ├── components/
│   │   ├── ui/             # shadcn: button, card, tabs, navigation-menu
│   │   └── dashboard/
│   │       ├── analys-chart.tsx    # Linjediagram (Chart.js), mjuk indigo
│   │       ├── process-flow.tsx    # ReactFlow: steg Start → Analys → Beslutsstöd → Genomförande → Uppföljning
│   │       └── rapporter-list.tsx  # Tabell med fiktiva dokument (ID, titel, datum, typ, status)
│   └── lib/
│       └── utils.ts        # cn() (clsx + tailwind-merge)
├── docs/
│   └── ARCHITECTURE.md     # Denna fil
├── components.json         # shadcn config (aliases, style: new-york)
├── package.json
├── tsconfig.json
└── next.config.ts
```

- **layout.tsx:** Sätter Inter som `--font-inter`, `font-sans`, `antialiased`; metadata för titel/description; `<html lang="sv">`.
- **page.tsx:** En sida med header (titel + undertext) och `<Tabs>` med tre `TabsContent`. Varje flik renderar en dashboard-komponent.
- **globals.css:** `@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`; `@theme inline` med CSS-variabler; `:root` med Slate-50-bakgrund, Slate-900-foreground, Indigo-600-primary.
- **Dashboard-komponenter:** Analys (client, Chart.js Line), Processflöde (client, ReactFlow med initial nodes/edges), Rapporter (tabell, ingen client).

---

## 4. Design och tema

- **Bakgrund:** Slate-50 (`oklch(0.984 0.003 247.858)`).
- **Text:** Slate-900 (`oklch(0.208 0.016 252.894)`).
- **Primär/knappar:** Indigo-600 (`oklch(0.511 0.262 276.966)`); primär text på knappar vit.
- **Kort:** Vit bakgrund, tunna Slate-kanter, lätt skugga; hover: `shadow-md`.
- **Typsnitt:** Inter via Next.js font, används som `font-sans`.
- **Övergångar:** `transition-colors`, `transition-shadow`, `transition-all` med `duration-150`–`300` och `ease-out`; flikinnehåll med `animate-in fade-in-0 duration-300`.

---

## 5. Innehåll per flik

- **Analys:** Ett linjediagram (Chart.js) med 12 månader, en dataserie i mjuk indigo med fill; responsiv höjd (t.ex. 320px).
- **Processflöde:** ReactFlow med 5 noder (input → default → default → default → output): Start/Insamling → Analys → Beslutsstöd → Genomförande → Uppföljning; Background, Controls, MiniMap; indigo-noder.
- **Rapporter:** Tabell med kolumnerna ID, Titel, Datum, Typ, Status; 6 fiktiva rader; status som badge (indigo-50/indigo-700).

---

## 6. Återskapa projektet (checklista / “master-prompt”)

Använd följande som specifikation för att bygga ett liknande projekt (manuellt eller med hjälp av AI):

1. **Skapa Next.js-app** med TypeScript, Tailwind, App Router, `src/`, ESLint. Projektnamn i lowercase (t.ex. `info-grafik`).
2. **Initiera shadcn/ui** (defaults, Tailwind v4); lägg till komponenterna: **tabs**, **card**, **button**, **navigation-menu**.
3. **Installera:** `reactflow`, `chart.js`, `react-chartjs-2`.
4. **Tema:** Sätt i CSS-variabler (eller Tailwind): bakgrund Slate-50, text Slate-900, primary Indigo-600. Använd Inter som `font-sans` i layout.
5. **Startsida:** En header (titel + undertext) och en Tabs med tre flikar: **Analys**, **Processflöde**, **Rapporter**.
6. **Analys-flik:** Client-komponent med Chart.js Line (CategoryScale, LinearScale, LineElement, PointElement, Filler); mjuk indigo färg; wrappa i Card.
7. **Processflöde-flik:** Client-komponent med ReactFlow; 5 noder i sekvens (Start → Analys → Beslutsstöd → Genomförande → Uppföljning); Background, Controls, MiniMap; wrappa i Card.
8. **Rapporter-flik:** Tabell med kolumnerna ID, Titel, Datum, Typ, Status; några fiktiva rader; wrappa i Card.
9. **Subtil övergångar:** På kort: `transition-shadow`, `hover:shadow-md`. På flik-triggers: `transition-all duration-200 ease-out`. På TabsContent: `animate-in fade-in-0 duration-300 ease-out`. På tabellrader: `transition-colors duration-150` vid hover.

Efter detta ska du kunna köra `npm run dev` och få en fungerande dashboard med samma arkitektur och utseende.

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

*Senast uppdaterad enligt nuvarande kodbas. Vid större förändringar, uppdatera denna fil.*
