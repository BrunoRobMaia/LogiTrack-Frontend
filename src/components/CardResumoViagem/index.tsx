import { Viagem } from "@/types/viagem";
import { Card, CardContent } from "../ui/card";

interface CardResumoViagemProps {
  isLoading: boolean;
  viagens: Viagem[];
}

export function CardResumoViagem({
  isLoading,
  viagens,
}: CardResumoViagemProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Total de Viagens</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {isLoading ? "—" : (viagens?.length ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">KM Total</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {isLoading ? (
              "—"
            ) : (
              <>
                {viagens
                  ?.reduce((acc, v) => acc + (v.kmPercorrida ?? 0), 0)
                  .toLocaleString("pt-BR")}
                <span className="text-base font-normal text-gray-400 ml-1">
                  km
                </span>
              </>
            )}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Veículos Utilizados</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {isLoading ? "—" : new Set(viagens?.map((v) => v.veiculo?.id)).size}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
