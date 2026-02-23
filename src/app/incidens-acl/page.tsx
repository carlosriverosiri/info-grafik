import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IncidensChart } from "@/components/incidens-acl/incidens-chart";
import { IncidensBubbleChart } from "@/components/incidens-acl/incidens-bubble";
import { VardformChart } from "@/components/incidens-acl/vardform-chart";
import { AgeHeatmap } from "@/components/incidens-acl/age-heatmap";
import { RankingBars } from "@/components/incidens-acl/ranking-bars";
import { StockholmComparison } from "@/components/incidens-acl/stockholm-comparison";
import { ExportableSection } from "@/components/incidens-analys/export-section";
import {
  STATS,
  PUBLIKATIONER,
  COMPARISON_TABLE,
  STOCKHOLM_RATIO,
  SWEDEN_YEARS,
} from "@/data/incidens-acl-data";
import {
  TrendingUp,
  TrendingDown,
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
  title: "Incidensanalys — Främre korsbandskirurgi",
  description:
    "Incidensanalys av främre korsbandsrekonstruktion baserat på nationell och internationell data",
};

export default function IncidensAclPage() {
  const trendPositive = STATS.trendProcent >= 0;

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
            Tillbaka till Incidensanalys
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Incidensanalys: Främre korsbandskirurgi
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">
            Nationell incidens av rekonstruktion av ligament i knäled (NGE41)
            baserat på data från Socialstyrelsen (slutenvård + specialiserad
            öppenvård, 1998–2024), med internationella jämförelser från
            publicerade populationsstudier.
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
                {trendPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                Trend 2014–2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-baseline gap-2 text-3xl font-bold tracking-tight text-slate-900">
                {trendPositive ? "+" : ""}
                {STATS.trendProcent}%
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    trendPositive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {trendPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {trendPositive ? "Ökning" : "Minskning"}
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
                  <span className="text-sky-500">— streckad = 1.0x</span>
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
                                const diff =
                                  ((row.swedenValue! - row.latestValue) /
                                    row.latestValue) *
                                  100;
                                const sign = diff >= 0 ? "+" : "";
                                return (
                                  <span
                                    className={`ml-1.5 text-xs font-semibold ${
                                      diff >= 0
                                        ? "text-emerald-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {sign}
                                    {Math.round(diff)} %
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
                <em>antal ingrepp per 100 000 invånare</em>, beräknat som summan
                av slutenvård och specialiserad öppenvård med operationskod{" "}
                <strong>NGE41</strong> (rekonstruktion av ligament i knäled utan
                främmande material, artroskopisk). Datan omfattar hela rikets
                totalpopulation och är uppdelad per femårig åldersgrupp och
                kalenderår 1998–2024. Före 2005 finns enbart slutenvårdsdata då
                öppenvårdsrapporteringen ännu inte var etablerad.
              </p>
              <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-xs leading-relaxed">
                  Inrapporteringen för den specialiserade öppenvården har
                  förbättrats över åren. Förändringar mellan år kan delvis bero
                  på ökad inrapportering, inte enbart på att fler faktiskt söker
                  vård (Socialstyrelsen). Det svenska korsbandsregistret
                  rapporterade 4 554 primära rekonstruktioner 2023 med en
                  registertäckning &gt;90 %.
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
                  <strong>Australien — högst rapporterad incidens:</strong>{" "}
                  Zbrojkiewicz et al. 2018 visar 77 per 100 000 med
                  totalpopulation som denominator.
                </li>
                <li>
                  <strong>Kanada (Alberta):</strong> Paudel et al. 2022
                  rapporterar en ökning från 38 till 51 per 100 000 under
                  2002–2018 i en populationsbaserad studie.
                </li>
                <li>
                  <strong>Norden:</strong> Granan et al. 2009 visar att Norge
                  hade ca 34 per 100 000 (2004–2007) baserat på nationella
                  korsbandsregister.
                </li>
                <li>
                  <strong>Rumänien — låg incidens:</strong> Tolan et al. 2025
                  visar 8–10 per 100 000, med stor regional variation
                  (Bukarest–Ilfov 40, enstaka regioner &lt;1).
                </li>
                <li>
                  <strong>Denominator:</strong> De flesta studier använder
                  totalpopulationen. Åldersstandardisering varierar.
                </li>
                <li>
                  <strong>Operationskoder:</strong> Olika klassifikationssystem
                  (NOMESCO, ICD-10-PCS, CPT) och definitioner av ACLR kan
                  inkludera/exkludera partiella rekonstruktioner.
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
