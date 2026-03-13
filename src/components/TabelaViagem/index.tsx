import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { FaRoute, FaPlus, FaEdit, FaTrash, FaTruck } from "react-icons/fa";
import { Viagem } from "@/types/viagem";
import { Badge } from "../ui/badge";

interface TabelaViagemProps {
  viagensLoading: boolean;
  viagens: Viagem[];
  abrirCriar: () => void;
  abrirEditar: (viagem: Viagem) => void;
  deletarViagem: (id: number) => void;
}

export function TabelaViagem({
  viagensLoading,
  viagens,
  abrirCriar,
  abrirEditar,
  deletarViagem,
}: TabelaViagemProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-base text-gray-700">
          Lista de Viagens
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {viagensLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : !viagens || viagens.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FaRoute size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma viagem cadastrada</p>
            <Button
              onClick={abrirCriar}
              variant="outline"
              className="mt-4 gap-2"
            >
              <FaPlus size={12} />
              Criar primeira viagem
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-slate-50">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    Veículo
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    Origem → Destino
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    Saída
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    Chegada
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    KM
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                    Tipo
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {viagens.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-50 p-1.5 rounded-lg">
                          <FaTruck className="text-blue-500" size={12} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {v.veiculo?.modelo}
                          </p>
                          <p className="text-xs text-gray-400">
                            {v.veiculo?.placa}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {v.origem}
                        <span className="text-gray-400 mx-1">→</span>
                        {v.destino}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {v.dataSaida
                        ? new Date(v.dataSaida).toLocaleString("pt-BR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {v.dataChegada
                        ? new Date(v.dataChegada).toLocaleString("pt-BR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {v.kmPercorrida?.toLocaleString("pt-BR")} km
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          v.veiculo?.tipo === "LEVE"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-orange-50 text-orange-600 border-orange-200"
                        }
                      >
                        {v.veiculo?.tipo}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => abrirEditar(v)}
                          className="h-8 w-8 p-0 text-gray-400 cursor-pointer hover:text-blue-600"
                        >
                          <FaEdit size={13} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletarViagem(v.id)}
                          className="h-8 w-8 p-0 text-gray-400 cursor-pointer hover:text-red-500"
                        >
                          <FaTrash size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
