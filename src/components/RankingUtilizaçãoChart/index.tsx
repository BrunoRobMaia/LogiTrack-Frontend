import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaTrophy } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS } from "@/utils/colors";

interface RankingUtilizacaoChartProps {
  loading: boolean;
  rankingData: { modelo: string; km: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { modelo, km } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2.5 text-sm">
        <p className="font-semibold text-gray-700">{modelo}</p>
        <p className="text-gray-500 mt-0.5">
          {km.toLocaleString("pt-BR")} <span className="text-gray-400">km</span>
        </p>
      </div>
    );
  }
  return null;
};

export function RankingUtilizacaoChart({
  loading,
  rankingData,
}: RankingUtilizacaoChartProps) {
  const total = rankingData.reduce((acc, d) => acc + d.km, 0);
  const top = rankingData[0];

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <FaTrophy className="text-yellow-500" size={14} />
            </div>
            <div>
              <CardTitle className="text-base text-gray-700">
                Ranking de Utilização
              </CardTitle>
              <CardDescription className="text-xs">
                KM acumulado por veículo
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-full" />
            </div>
          </div>
        ) : rankingData.length === 0 ? (
          <div className="h-52 flex flex-col items-center justify-center text-gray-400 gap-2">
            <FaTrophy size={28} className="opacity-20" />
            <p className="text-sm">Sem dados disponíveis</p>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <div className="shrink-0">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={rankingData}
                    dataKey="km"
                    nameKey="modelo"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    isAnimationActive={true}
                    animationDuration={800}
                  >
                    {rankingData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length].fill}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2.5 min-w-0">
              {rankingData.map((entry, index) => {
                const color = COLORS[index % COLORS.length];
                const pct =
                  total > 0 ? ((entry.km / total) * 100).toFixed(0) : 0;
                return (
                  <div key={entry.modelo} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: color.fill }}
                        />
                        <span className="font-medium text-gray-700 truncate">
                          {index === 0 && "🏆 "}
                          {entry.modelo}
                        </span>
                      </div>
                      <span className="text-gray-400 shrink-0 ml-2">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: color.fill,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      {entry.km.toLocaleString("pt-BR")} km
                    </p>
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
