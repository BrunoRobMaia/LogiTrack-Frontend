import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { FaCalendarAlt, FaTools } from "react-icons/fa";
import { statusColor } from "@/utils/colors";

interface CronogramaManutencaoProps {
  loading: boolean;
  manutencoes: any[];
}

export function CronogramaManutencao({
  loading,
  manutencoes,
}: CronogramaManutencaoProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-2 rounded-lg">
            <FaCalendarAlt className="text-blue-500" size={14} />
          </div>
          <div>
            <CardTitle className="text-base text-gray-700">
              Cronograma de Manutenções
            </CardTitle>
            <CardDescription className="text-xs">
              Próximas 5 manutenções agendadas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : !manutencoes || manutencoes.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <FaTools size={28} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma manutenção agendada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {manutencoes.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                    <FaTools className="text-blue-400" size={15} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">
                      {m.veiculo?.modelo}
                      <span className="font-normal text-gray-400 ml-2 text-xs">
                        {m.veiculo?.placa}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {m.tipoServico} ·{" "}
                      {new Date(m.dataInicio).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-gray-700">
                    {m.custoEstimado?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${statusColor[m.status] ?? ""}`}
                  >
                    {m.status?.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
