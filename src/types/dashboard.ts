export interface DashboardData {
  totalKmFrota: number;
  volumePorCategoria: {
    tipo: string;
    quantidade: number;
  }[];
  rankingUtilizacao: {
    modelo: string;
    km: number;
  }[];
}
