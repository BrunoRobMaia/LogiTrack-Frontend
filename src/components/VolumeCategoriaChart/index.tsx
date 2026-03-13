import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { FaChartBar } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid,
} from "recharts";
import { CATEGORY_COLORS, DEFAULT_COLORS } from "@/utils/colors";

interface VolumeCategoriaChartProps {
  loading: boolean;
  categoriaData: { tipo: string; quantidade: number }[];
}

export function VolumeCategoriaChart({
  loading,
  categoriaData,
}: VolumeCategoriaChartProps) {
  const total = categoriaData.reduce((acc, d) => acc + d.quantidade, 0);

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-2 rounded-lg">
              <FaChartBar className="text-blue-500" size={14} />
            </div>
            <div>
              <CardTitle className="text-base text-gray-700">
                Volume por Categoria
              </CardTitle>
              <CardDescription className="text-xs">
                Viagens por tipo de veículo
              </CardDescription>
            </div>
          </div>
          {!loading && total > 0 && (
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
              {total} viagens
            </span>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
            </div>
          </div>
        ) : categoriaData.length === 0 ? (
          <div className="h-52 flex flex-col items-center justify-center text-gray-400 gap-2">
            <FaChartBar size={28} className="opacity-20" />
            <p className="text-sm">Sem dados disponíveis</p>
          </div>
        ) : (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={categoriaData}
                barSize={52}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#f1f5f9"
                  strokeDasharray="4 4"
                />
                <XAxis
                  dataKey="tipo"
                  tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Bar
                  dataKey="quantidade"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  <LabelList
                    dataKey="quantidade"
                    position="top"
                    style={{ fontSize: 12, fontWeight: 600, fill: "#475569" }}
                  />
                  {categoriaData.map((entry, index) => {
                    const color =
                      CATEGORY_COLORS[entry.tipo] ??
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                    return <Cell key={entry.tipo} fill={color.fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legenda */}
            <div className="flex flex-wrap gap-3 pt-1">
              {categoriaData.map((entry, index) => {
                const color =
                  CATEGORY_COLORS[entry.tipo] ??
                  DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                const pct =
                  total > 0 ? ((entry.quantidade / total) * 100).toFixed(0) : 0;
                return (
                  <div
                    key={entry.tipo}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: color.light,
                      color: color.fill,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: color.fill }}
                    />
                    {entry.tipo} — {pct}%
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
