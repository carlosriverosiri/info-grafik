"use client";

import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialNodes: Node[] = [
  { id: "1", type: "input", position: { x: 120, y: 0 }, data: { label: "Start / Insamling" } },
  { id: "2", position: { x: 120, y: 80 }, data: { label: "Analys" } },
  { id: "3", position: { x: 120, y: 160 }, data: { label: "Beslutsstöd" } },
  { id: "4", position: { x: 120, y: 240 }, data: { label: "Genomförande" } },
  { id: "5", type: "output", position: { x: 120, y: 320 }, data: { label: "Uppföljning" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];

export function ProcessFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-900 text-lg font-semibold">
          Processflöde — steg för steg
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[400px] w-full rounded-lg border border-slate-200 bg-slate-50/50 transition-colors duration-200 ease-out">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="rounded-lg"
          >
            <Background color="#94a3b8" gap={16} />
            <Controls className="!border-slate-200 !bg-white !shadow-sm" />
            <MiniMap
              nodeColor="#4f46e5"
              maskColor="rgba(248, 250, 252, 0.8)"
              className="!border-slate-200 !bg-white"
            />
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
}
