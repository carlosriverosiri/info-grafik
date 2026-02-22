import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const documents = [
  { id: "R-2024-01", titel: "Årsredovisning 2024", datum: "2024-03-15", typ: "Årsrapport", status: "Godkänd" },
  { id: "R-2024-02", titel: "Kvartalsrapport Q1", datum: "2024-04-20", typ: "Kvartal", status: "Godkänd" },
  { id: "R-2024-03", titel: "Internrevision — processer", datum: "2024-05-10", typ: "Revision", status: "Slutrapport" },
  { id: "R-2024-04", titel: "Kvartalsrapport Q2", datum: "2024-07-22", typ: "Kvartal", status: "Godkänd" },
  { id: "R-2024-05", titel: "Riktlinjer och policy", datum: "2024-08-01", typ: "Policy", status: "Aktiv" },
  { id: "R-2024-06", titel: "Kvartalsrapport Q3", datum: "2024-10-18", typ: "Kvartal", status: "Godkänd" },
];

export function RapporterList() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-900 text-lg font-semibold">
          Rapporter — dokumentlista
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-lg border border-slate-200 transition-shadow duration-200 ease-out hover:shadow-sm">
          <table className="w-full text-left text-sm text-slate-900">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Titel</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Typ</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-slate-100 last:border-0 transition-colors duration-150 ease-out hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 font-mono text-slate-600">{doc.id}</td>
                  <td className="px-4 py-3 font-medium">{doc.titel}</td>
                  <td className="px-4 py-3 text-slate-600">{doc.datum}</td>
                  <td className="px-4 py-3 text-slate-600">{doc.typ}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
