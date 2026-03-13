"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { FaTruck, FaRoute, FaSignOutAlt, FaWrench } from "react-icons/fa";
import { DashboardData } from "@/types/dashboard";
import { Manutencao } from "@/types/manutencao";
import { ProjecaoFinanceira } from "@/types/projecao";
import { TopCardDashboard } from "@/components/TopCardDashboard";
import { VolumeCategoriaChart } from "@/components/VolumeCategoriaChart";
import { RankingUtilizacaoChart } from "@/components/RankingUtilizaçãoChart/index";
import { CronogramaManutencao } from "@/components/CronogramaManutencao";
import { Header } from "@/components/Header";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const { data: dashboard, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboard"],
      queryFn: async () => {
        const response = await api.get("/dashboard");
        return response.data;
      },
    });

  const { data: manutencoes, isLoading: manutencoesLoading } = useQuery<
    Manutencao[]
  >({
    queryKey: ["manutencoes-proximas"],
    queryFn: async () => {
      const response = await api.get("/manutencoes/proximas");
      return response.data;
    },
  });

  const { data: projecao, isLoading: projecaoLoading } =
    useQuery<ProjecaoFinanceira>({
      queryKey: ["projecao-financeira"],
      queryFn: async () => {
        const response = await api.get("/projecao/financeira");
        return response.data;
      },
    });

  const loading = dashboardLoading || manutencoesLoading || projecaoLoading;

  const categoriaData = dashboard?.volumePorCategoria ?? [];

  const rankingData = dashboard?.rankingUtilizacao ?? [];

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title={"LogiTrack Pro"}
        subTitle={"Painel de Controle"}
        icon={<FaTruck size={20} />}
      >
        <Button
          variant="outline"
          onClick={() => router.push("/viagens")}
          className="gap-2 cursor-pointer text-gray-500 border-gray-200 hover:text-blue-500 hover:border-blue-200 transition-colors"
        >
          <FaRoute size={13} />
          Viagens
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/manuntencao")}
          className="gap-2 cursor-pointer text-gray-500 border-gray-200 hover:text-blue-500 hover:border-blue-200 transition-colors"
        >
          <FaWrench size={13} />
          Manutenção
        </Button>
        <Button
          variant="outline"
          onClick={logout}
          className="gap-2 cursor-pointer text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <FaSignOutAlt size={13} />
          Sair
        </Button>
      </Header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">
            Visão geral da frota e operações
          </p>
        </div>

        <TopCardDashboard
          loading={loading}
          dashboard={dashboard}
          projecao={projecao}
          rankingData={rankingData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <VolumeCategoriaChart
            loading={loading}
            categoriaData={categoriaData}
          />
          <RankingUtilizacaoChart loading={loading} rankingData={rankingData} />
        </div>

        <CronogramaManutencao
          loading={loading}
          manutencoes={manutencoes || []}
        />
      </main>
    </div>
  );
}
