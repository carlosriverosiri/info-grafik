import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysChart } from "@/components/dashboard/analys-chart";
import { ProcessFlow } from "@/components/dashboard/process-flow";
import { RapporterList } from "@/components/dashboard/rapporter-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-6 shadow-sm transition-shadow duration-200 ease-out">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 transition-opacity duration-200">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600 transition-colors duration-200">
            Översikt — Analys, processflöde och rapporter
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Tabs defaultValue="analys" className="w-full">
          <TabsList className="mb-6 h-11 w-full justify-start gap-1 rounded-lg bg-slate-100 p-1 transition-colors duration-200 sm:flex-initial">
            <TabsTrigger
              value="analys"
              className="rounded-md px-4 py-2 transition-all duration-200 ease-out data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:text-slate-900"
            >
              Analys
            </TabsTrigger>
            <TabsTrigger
              value="process"
              className="rounded-md px-4 py-2 transition-all duration-200 ease-out data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:text-slate-900"
            >
              Processflöde
            </TabsTrigger>
            <TabsTrigger
              value="rapporter"
              className="rounded-md px-4 py-2 transition-all duration-200 ease-out data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:text-slate-900"
            >
              Rapporter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analys" className="mt-0 animate-in fade-in-0 duration-300 ease-out">
            <AnalysChart />
          </TabsContent>

          <TabsContent value="process" className="mt-0 animate-in fade-in-0 duration-300 ease-out">
            <ProcessFlow />
          </TabsContent>

          <TabsContent value="rapporter" className="mt-0 animate-in fade-in-0 duration-300 ease-out">
            <RapporterList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
