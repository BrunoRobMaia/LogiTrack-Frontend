import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRoute, FaDollarSign, FaTrophy } from "react-icons/fa";

interface TopCardDashboardProps {
  loading: boolean;
  dashboard: any;
  projecao: any;
  rankingData: any;
}

export function TopCardDashboard({
  loading,
  dashboard,
  projecao,
  rankingData,
}: TopCardDashboardProps) {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total KM Percorrido
              </CardTitle>
              <div className="bg-blue-50 p-2.5 rounded-xl">
                <FaRoute className="text-blue-500" size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-36" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboard?.totalKmFrota?.toLocaleString("pt-BR") ?? "0"}
                  <span className="text-base font-normal text-gray-400 ml-1.5">
                    km
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1.5">
                  Quilometragem total da frota
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Projeção Financeira
              </CardTitle>
              <div className="bg-green-50 p-2.5 rounded-xl">
                <FaDollarSign className="text-green-500" size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-36" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {projecao?.totalMes?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) ?? "R$ 0,00"}
                </p>
                <p className="text-xs text-gray-400 mt-1.5">
                  Custo estimado no mês atual
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Top Veículo
              </CardTitle>
              <div className="bg-yellow-50 p-2.5 rounded-xl">
                <FaTrophy className="text-yellow-500" size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-36" />
            ) : (
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {rankingData[0]?.modelo ?? "—"}
                </p>
                <p className="text-xs text-gray-400 mt-1.5">
                  {rankingData[0]?.km?.toLocaleString("pt-BR") ?? "0"} km
                  acumulados
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
