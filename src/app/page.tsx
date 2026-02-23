import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { STATS as RC_STATS } from "@/data/incidens-data";
import { STATS as ACL_STATS } from "@/data/incidens-acl-data";

interface CategoryCard {
  title: string;
  region: string;
  code: string;
  description: string;
  href: string;
  accentClass: string;
  iconBgClass: string;
  iconTextClass: string;
  stats: { senaste: number; trendProcent: number; antalKallor: number } | null;
}

const categories: CategoryCard[] = [
  {
    title: "Rotatorcuffkirurgi",
    region: "Axel",
    code: "NBF/NBG",
    description:
      "Sutur och rekonstruktion av rotatorcuffen. Slutenvård + öppenvård, 1998–2024.",
    href: "/incidens-analys",
    accentClass: "border-t-indigo-500",
    iconBgClass: "bg-indigo-50",
    iconTextClass: "text-indigo-600",
    stats: RC_STATS,
  },
  {
    title: "Främre korsbandskirurgi",
    region: "Knä",
    code: "NGE41",
    description:
      "Rekonstruktion av främre korsbandet. Slutenvård + öppenvård, 1998–2024.",
    href: "/incidens-acl",
    accentClass: "border-t-sky-500",
    iconBgClass: "bg-sky-50",
    iconTextClass: "text-sky-600",
    stats: ACL_STATS,
  },
  {
    title: "Hallux valgus",
    region: "Fot",
    code: "NHK/NHL",
    description: "Osteotomi och korrigerande kirurgi vid hallux valgus.",
    href: "/incidens-hallux",
    accentClass: "border-t-emerald-500",
    iconBgClass: "bg-emerald-50",
    iconTextClass: "text-emerald-600",
    stats: null,
  },
  {
    title: "Dupuytrens kontraktur",
    region: "Hand",
    code: "NDM",
    description: "Fasciotomi och fasciektomi vid Dupuytrens kontraktur.",
    href: "/incidens-dupuytren",
    accentClass: "border-t-amber-500",
    iconBgClass: "bg-amber-50",
    iconTextClass: "text-amber-600",
    stats: null,
  },
  {
    title: "Höftplastik",
    region: "Höft",
    code: "NFB",
    description:
      "Primär total höftledsplastik. Elektiva och akuta indikationer.",
    href: "/incidens-hoft",
    accentClass: "border-t-rose-500",
    iconBgClass: "bg-rose-50",
    iconTextClass: "text-rose-600",
    stats: null,
  },
];

function TrendBadge({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        up
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {up ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {up ? "+" : ""}
      {pct.toFixed(1)} %
    </span>
  );
}

export default function Home() {
  const activeCount = categories.filter((c) => c.stats).length;
  const plannedCount = categories.length - activeCount;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Incidensanalys
              </h1>
              <p className="text-sm text-slate-500">
                Nationella operationsincidenser — Sverige &amp; Stockholm
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            Interaktiva dashboards med incidensdata från Socialstyrelsens
            statistikdatabas, kompletterade med internationella jämförelser från
            publicerade populationsstudier.
          </p>
          <div className="mt-4 flex gap-6 text-xs text-slate-400">
            <span>
              <strong className="font-semibold text-slate-600">
                {activeCount}
              </strong>{" "}
              aktiva analyser
            </span>
            <span>
              <strong className="font-semibold text-slate-600">
                {plannedCount}
              </strong>{" "}
              under utveckling
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const isActive = cat.stats !== null;
            const inner = (
              <Card
                className={`group relative overflow-hidden border-t-4 ${cat.accentClass} border-slate-200 bg-white shadow-sm transition-all duration-200 ${
                  isActive
                    ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                    : ""
                }`}
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.iconBgClass}`}
                    >
                      <Activity className={`h-4 w-4 ${cat.iconTextClass}`} />
                    </div>
                    {isActive ? (
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-500" />
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        <Clock className="h-2.5 w-2.5" />
                        Kommer
                      </span>
                    )}
                  </div>

                  <div className="mt-3.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[15px] font-semibold text-slate-900 leading-snug">
                        {cat.title}
                      </h2>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {cat.region} &middot; {cat.code}
                    </p>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    {cat.description}
                  </p>

                  {cat.stats ? (
                    <div className="mt-auto pt-4">
                      <div className="flex items-end justify-between border-t border-slate-100 pt-3.5">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                            Senaste incidens
                          </p>
                          <p className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">
                            {cat.stats.senaste.toFixed(1)}
                            <span className="ml-1 text-xs font-normal text-slate-400">
                              / 100k
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <TrendBadge pct={cat.stats.trendProcent} />
                          <p className="mt-1 text-[11px] text-slate-400">
                            10-årstrend
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] text-slate-400">
                        {cat.stats.antalKallor} internationella källor
                      </p>
                    </div>
                  ) : (
                    <div className="mt-auto pt-4">
                      <div className="flex items-center gap-2 border-t border-dashed border-slate-200 pt-3.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <p className="text-xs text-slate-400">
                          Data samlas in — analys pågår
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            if (isActive) {
              return (
                <Link key={cat.title} href={cat.href} className="contents">
                  {inner}
                </Link>
              );
            }
            return <div key={cat.title}>{inner}</div>;
          })}
        </div>

        <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Om datakällorna
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            All svensk data hämtas från{" "}
            <strong>Socialstyrelsens statistikdatabas</strong> och avser antal
            ingrepp per 100&nbsp;000 invånare (slutenvård + specialiserad
            öppenvård). Internationella jämförelser baseras på publicerade
            populationsstudier och nationella register. Varje analyssida
            innehåller interaktiva diagram, åldersfördelning, vårdformsskifte
            samt Stockholm-vs-Riket-jämförelser.
          </p>
        </section>
      </main>
    </div>
  );
}
