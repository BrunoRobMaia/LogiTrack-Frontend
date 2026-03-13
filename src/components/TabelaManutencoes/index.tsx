import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaEdit, FaTools, FaTrash, FaTruck } from "react-icons/fa";
import { statusColor } from "@/utils/colors";
import { Manutencao } from "@/types/manutencao";

interface TabelaManutencoesProps {
  manutencoes: Manutencao[];
  isLoading: boolean;
  onEditar: (manutencao: Manutencao) => void;
  onDeletar: (id: number) => void;
}

export function TabelaManutencoes({
  manutencoes,
  isLoading,
  onEditar,
  onDeletar,
}: TabelaManutencoesProps) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!manutencoes || manutencoes.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <FaTools size={32} className="mx-auto mb-3 opacity-30" />
        <p className="text-sm">Nenhuma manutenção encontrada</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-slate-50">
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Veículo
            </th>
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Tipo de Serviço
            </th>
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Início
            </th>
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Finalização
            </th>
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Custo
            </th>
            <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
              Status
            </th>
            <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {manutencoes.map((m) => (
            <tr
              key={m.id}
              className="border-b border-gray-50 hover:bg-blue-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 p-1.5 rounded-lg">
                    <FaTruck className="text-blue-500" size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {m.veiculo?.modelo}
                    </p>
                    <p className="text-xs text-gray-400">{m.veiculo?.placa}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-700">{m.tipoServico}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {m.dataInicio
                  ? new Date(m.dataInicio).toLocaleDateString("pt-BR")
                  : "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {m.dataFinalizacao
                  ? new Date(m.dataFinalizacao).toLocaleDateString("pt-BR")
                  : "—"}
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-700">
                  {m.custoEstimado?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${statusColor[m.status ?? ""] ?? ""}`}
                >
                  {m.status?.replace("_", " ")}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditar(m)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 cursor-pointer"
                  >
                    <FaEdit size={13} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeletar(m.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 cursor-pointer"
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
  );
}
