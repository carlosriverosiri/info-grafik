import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IncidensChart } from "@/components/incidens-analys/incidens-chart";
import { IncidensBubbleChart } from "@/components/incidens-analys/incidens-bubble";
import { VardformChart } from "@/components/incidens-analys/vardform-chart";
import { AgeHeatmap } from "@/components/incidens-analys/age-heatmap";
import { RankingBars } from "@/components/incidens-analys/ranking-bars";
import { StockholmComparison } from "@/components/incidens-analys/stockholm-comparison";
import { ExportableSection } from "@/components/incidens-analys/export-section";
import {
  STATS,
  PUBLIKATIONER,
  COMPARISON_TABLE,
  STOCKHOLM_RATIO,
  SWEDEN_YEARS,
} from "@/data/incidens-data";
import {
  TrendingUp,
  Activity,
  FileText,
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  Database,
  MapPin,
  Layers,
  Grid3x3,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Incidensanalys — Rotatorcuffkirurgi",
  description:
    "Incidensanalys av rotatorcuffkirurgi baserat på nationell och internationell data",
};

export default function IncidensAnalysPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* ─── Header ────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors duration-200 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka till Dashboard
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Incidensanalys: Rotatorcuffkirurgi
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">
            Nationell incidens av sutur eller reinsertion av sena i axel/överarm
            (NBL49) baserat på data från Socialstyrelsen (slutenvård +
            specialiserad öppenvård, 1998–2024), med internationella
            jämförelser från publicerade populationsstudier.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        {/* ─── Nyckeltal ───────────────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-1">
              <CardDescription className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                <Activity className="h-3.5 w-3.5" />
                Ingrepp 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {STATS.senaste}
                <span className="ml-1.5 text-sm font-normal text-slate-400">
                  / 100 000
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-1">
              <CardDescription className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                <TrendingUp className="h-3.5 w-3.5" />
                Trend 2014–2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-baseline gap-2 text-3xl font-bold tracking-tight text-slate-900">
                +{STATS.trendProcent}%
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  <TrendingUp className="h-3 w-3" />
                  Ökning
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-1">
              <CardDescription className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                <FileText className="h-3.5 w-3.5" />
                Antal källpublikationer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {STATS.antalKallor}
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-1">
              <CardDescription className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                Stockholm vs Riket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {STOCKHOLM_RATIO[STOCKHOLM_RATIO.length - 1]}x
              </p>
              <div className="mt-2">
                <svg
                  viewBox={`0 0 ${STOCKHOLM_RATIO.length * 6} 28`}
                  className="h-6 w-full"
                  preserveAspectRatio="none"
                >
                  <polyline
                    fill="none"
                    stroke="rgb(14, 165, 233)"
                    strokeWidth="1.5"
                    points={STOCKHOLM_RATIO.map(
                      (v, i) => `${i * 6},${28 - (v / 2) * 14}`
                    ).join(" ")}
                  />
                  <line
                    x1="0"
                    y1="14"
                    x2={STOCKHOLM_RATIO.length * 6}
                    y2="14"
                    stroke="rgb(203, 213, 225)"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                  />
                </svg>
                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>{SWEDEN_YEARS[0]}</span>
                  <span className="text-sky-500">
                    — streckad = 1.0x
                  </span>
                  <span>{SWEDEN_YEARS[SWEDEN_YEARS.length - 1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Huvuddiagram ────────────────────────────────────────── */}
        <ExportableSection title="Stockholm vs Riket — incidens över tid">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Stockholm vs Riket — incidens över tid
              </CardTitle>
              <CardDescription className="text-slate-500">
                Antal ingrepp per 100&nbsp;000 invånare. Välj åldersgrupp i
                dropdownen för att jämföra Stockholm med riksgenomsnittet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncidensChart />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Vårdformsskifte ─────────────────────────────────────── */}
        <ExportableSection title="Vårdformsskifte: sluten- vs öppenvård">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Layers className="h-5 w-5 text-indigo-600" />
                Vårdformsskifte: sluten- vs öppenvård
              </CardTitle>
              <CardDescription className="text-slate-500">
                Förskjutningen från slutenvård till specialiserad öppenvård
                sedan 1998. Öppenvårdsrapporteringen startade runt 2005.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VardformChart />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Åldersheatmap ──────────────────────────────────────── */}
        <ExportableSection title="Incidens per åldersgrupp — heatmap">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Grid3x3 className="h-5 w-5 text-indigo-600" />
                Incidens per åldersgrupp — heatmap
              </CardTitle>
              <CardDescription className="text-slate-500">
                Antal ingrepp per 100 000 invånare, efter åldersgrupp och
                kalenderår. Mörkare färg = högre incidens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgeHeatmap />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Stockholm vs Riket per åldersgrupp ─────────────────── */}
        <ExportableSection title="Stockholm vs Riket — per åldersgrupp (2024)">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Stockholm vs Riket — per åldersgrupp (2024)
              </CardTitle>
              <CardDescription className="text-slate-500">
                Antal ingrepp per 100&nbsp;000 invånare uppdelat på åldersgrupp.
                Kvoten (blå siffra) visar hur många gånger högre Stockholms
                incidens är jämfört med riksgenomsnittet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StockholmComparison />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Bubbeldiagram ──────────────────────────────────────── */}
        <ExportableSection title="Internationell jämförelse — bubbeldiagram">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Internationell jämförelse — bubbeldiagram
              </CardTitle>
              <CardDescription className="text-slate-500">
                Varje bubbla visar ett lands senast rapporterade incidens.
                Bubblans storlek är proportionell mot incidensen. Sverige
                visas i indigo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncidensBubbleChart />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Rankinglista ─────────────────────────────────────────── */}
        <ExportableSection title="Internationell ranking">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Internationell ranking
              </CardTitle>
              <CardDescription className="text-slate-500">
                Senast rapporterad incidens per land, sorterad högst till lägst.
                Sverige markerat i indigo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RankingBars />
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Jämförelsetabell ─────────────────────────────────────── */}
        <ExportableSection title="Internationell jämförelse — tabell">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Internationell jämförelse
              </CardTitle>
              <CardDescription className="text-slate-500">
                Senast rapporterad incidens per land jämfört med Sveriges incidens
                samma år (Totalt, alla åldrar, per 100 000 invånare)
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <th className="pb-3 pr-4">Land</th>
                    <th className="pb-3 pr-4 text-right">Incidens</th>
                    <th className="pb-3 pr-4 text-right">Sverige samma år</th>
                    <th className="pb-3">Studie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_TABLE.map((row) => (
                    <tr
                      key={row.country}
                      className="transition-colors duration-150 hover:bg-slate-50"
                    >
                      <td className="py-3 pr-4 font-medium text-slate-900">
                        {row.country}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums text-slate-900">
                        {row.latestValue}
                        <span className="ml-1 text-xs text-slate-400">
                          ({row.latestYear})
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums">
                        {row.swedenValue !== null ? (
                          <>
                            <span className="font-semibold text-indigo-600">
                              {row.swedenValue}
                            </span>
                            {(() => {
                              const diff = ((row.swedenValue! - row.latestValue) / row.latestValue) * 100;
                              const sign = diff >= 0 ? "+" : "";
                              return (
                                <span
                                  className={`ml-1.5 text-xs font-semibold ${
                                    diff >= 0
                                      ? "text-emerald-600"
                                      : "text-red-500"
                                  }`}
                                >
                                  {sign}{Math.round(diff)} %
                                </span>
                              );
                            })()}
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 text-slate-500 italic">
                        {row.reference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </CardContent>
          </Card>
        </ExportableSection>

        {/* ─── Databeskrivning ─────────────────────────────────────── */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Database className="h-5 w-5 text-indigo-600" />
              Datakällor &amp; metod
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-relaxed text-slate-700">
            <div>
              <h3 className="mb-1 font-semibold text-slate-900">
                Sverige — Socialstyrelsen
              </h3>
              <p>
                Nationell statistik hämtad från Socialstyrelsens
                statistikdatabas. Måttet avser{" "}
                <em>antal ingrepp per 100 000 invånare</em>, beräknat som
                summan av slutenvård och specialiserad öppenvård med
                operationskod <strong>NBL49</strong> (sutur eller reinsertion
                av sena i axel eller överarm). Datan omfattar hela rikets
                totalpopulation och är uppdelad per femårig åldersgrupp
                och kalenderår 1998–2024. Före 2005 finns enbart
                slutenvårdsdata då öppenvårdsrapporteringen ännu inte
                var etablerad.
              </p>
              <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-xs leading-relaxed">
                  Inrapporteringen för den specialiserade öppenvården har
                  förbättrats över åren. Förändringar mellan år kan delvis
                  bero på ökad inrapportering, inte enbart på att fler
                  faktiskt söker vård (Socialstyrelsen).
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-slate-900">
                Internationella jämförelser
              </h3>
              <p>
                Incidens från andra länder har extraherats ur publicerade
                populationsstudier. Observera att studierna skiljer sig åt i:
              </p>
              <ul className="mt-1.5 list-inside list-disc space-y-1 text-slate-600">
                <li>
                  <strong>Norge — direkt jämförbar:</strong> Norsk data
                  (Tjomsland et al. 2025) använder samma operationskod
                  NBL49 som Sverige och är åldersjusterad per 100 000.
                  Norges nationella snitt 2023 var 83 per 100 000, med
                  stor regional variation (Sydöst 57, Mitt 110).
                </li>
                <li>
                  <strong>Belgien — hög incidens:</strong> Belgisk data
                  (NIHDI 2025) visar en standardiserad incidens på 115
                  per 100 000 försäkrade (2024), med stor regional
                  variation (Flandern 139, Bryssel 63). Belgien har
                  nära-universell sjukförsäkring, varför &quot;försäkrade&quot;
                  i praktiken ≈ totalpopulationen.
                </li>
                <li>
                  <strong>Denominator:</strong> Finlands data avser befolkning
                  ≥18 år, Chiles ≥25 år, medan Sverige, Norge och Japan
                  använder totalpopulationen.
                </li>
                <li>
                  <strong>Åldersstandardisering:</strong> Sydkorea och USA
                  använder åldersjusterade tal (US 2000-population), vilket
                  påverkar jämförbarheten.
                </li>
                <li>
                  <strong>Systemtäckning:</strong> Brasiliens data omfattar
                  enbart det offentliga systemet SUS (ca 75 % av
                  befolkningen). Privat vård ingår ej.
                </li>
                <li>
                  <strong>Operationskoder:</strong> Olika ICD-klassifikationer
                  och procedurkoder kan inkludera eller exkludera
                  akromioplastik utan senreparation.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* ─── Publikationstabell ──────────────────────────────────── */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Publikationer
            </CardTitle>
            <CardDescription className="text-slate-500">
              Studier som utgör underlag för den internationella jämförelsen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <th className="pb-3 pr-4">Författare</th>
                    <th className="pb-3 pr-4">År</th>
                    <th className="hidden pb-3 pr-4 md:table-cell">Titel</th>
                    <th className="pb-3 pr-4">Journal</th>
                    <th className="pb-3 text-right">Land</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PUBLIKATIONER.map((pub) => (
                    <tr
                      key={pub.id}
                      className="transition-colors duration-150 hover:bg-slate-50"
                    >
                      <td className="py-3 pr-4 font-medium text-slate-900">
                        {pub.authors}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">{pub.year}</td>
                      <td className="hidden py-3 pr-4 text-slate-600 md:table-cell">
                        {pub.title}
                      </td>
                      <td className="py-3 pr-4 italic text-slate-500">
                        {pub.journal}
                      </td>
                      <td className="py-3 text-right text-slate-700">
                        {pub.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
