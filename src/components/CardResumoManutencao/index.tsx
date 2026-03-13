import { Manutencao } from "@/types/manutencao";
import { Card, CardContent } from "../ui/card";
interface CardResumoManutencaoProps {
  isLoading: boolean;
  manutencoes: Manutencao[];
  totalCusto: number;
}
export function CardResumoManutencao({
  isLoading,
  manutencoes,
  totalCusto,
}: CardResumoManutencaoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {isLoading ? "—" : (manutencoes?.length ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {isLoading
              ? "—"
              : (manutencoes?.filter((m) => m.status === "PENDENTE").length ??
                0)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Em Realização</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {isLoading
              ? "—"
              : (manutencoes?.filter((m) => m.status === "EM_REALIZACAO")
                  .length ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Custo Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {isLoading
              ? "—"
              : totalCusto.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
