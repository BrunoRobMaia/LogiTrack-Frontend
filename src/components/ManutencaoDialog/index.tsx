import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Manutencao, ManutencaoForm, Veiculo } from "@/types/manutencao";
import {
  FaTools,
  FaTruck,
  FaCalendarAlt,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { useMemo } from "react";

interface ManutencaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editando: Manutencao | null;
  form: ManutencaoForm;
  onFormChange: (form: ManutencaoForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  veiculos: Veiculo[] | undefined;
  tiposServico: string[];
  isPending: boolean;
}

const statusOptions = [
  {
    value: "PENDENTE",
    label: "Pendente",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  {
    value: "EM_REALIZACAO",
    label: "Em Realização",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "CONCLUIDA",
    label: "Concluída",
    color: "text-green-600 bg-green-50 border-green-200",
  },
];

export function ManutencaoDialog({
  open,
  onOpenChange,
  editando,
  form,
  onFormChange,
  onSubmit,
  veiculos,
  tiposServico,
  isPending,
}: ManutencaoDialogProps) {
  const veiculoSelecionado = useMemo(
    () => veiculos?.find((v) => String(v.id) === form.veiculoId),
    [veiculos, form.veiculoId],
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl! p-0 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-blue-500 px-6 py-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <FaTools className="text-white" size={16} />
              </div>
              <div>
                <DialogTitle className="text-white text-lg font-semibold">
                  {editando ? "Editar Manutenção" : "Nova Manutenção"}
                </DialogTitle>
                <p className="text-blue-100 text-xs mt-0.5">
                  {editando
                    ? "Atualize os dados da manutenção"
                    : "Preencha os dados para agendar"}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Label className="text-gray-600 font-medium flex items-center gap-1.5">
              <FaTruck size={12} className="text-blue-400" />
              Veículo
            </Label>
            <Select
              value={form.veiculoId}
              onValueChange={(v) =>
                onFormChange({ ...form, veiculoId: v as string })
              }
            >
              <SelectTrigger className="border-gray-200 focus:border-blue-400 w-full h-10">
                {veiculoSelecionado ? (
                  <div className="flex items-center gap-2">
                    <FaTruck size={11} className="text-gray-400" />
                    <span>{veiculoSelecionado.modelo}</span>
                    <span className="text-gray-400 text-xs">
                      — {veiculoSelecionado.placa}
                    </span>
                  </div>
                ) : (
                  <SelectValue placeholder="Selecione um veículo" />
                )}
              </SelectTrigger>
              <SelectContent>
                {veiculos?.map((v) => (
                  <SelectItem key={v.id} value={String(v.id)}>
                    <div className="flex items-center gap-2">
                      <FaTruck size={11} className="text-gray-400" />
                      <span>{v.modelo}</span>
                      <span className="text-gray-400 text-xs">— {v.placa}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-gray-600 font-medium flex items-center gap-1.5">
              <FaTools size={11} className="text-blue-400" />
              Tipo de Serviço
            </Label>
            <Select
              value={form.tipoServico}
              onValueChange={(v) =>
                onFormChange({ ...form, tipoServico: v as string })
              }
              required
            >
              <SelectTrigger className="border-gray-200 focus:border-blue-400 w-full h-10">
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                {tiposServico.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-blue-400" />
                Data de Início
              </Label>
              <Input
                type="date"
                value={form.dataInicio}
                onChange={(e) =>
                  onFormChange({ ...form, dataInicio: e.target.value })
                }
                required
                className="border-gray-200 focus:border-blue-400 w-full h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-blue-400" />
                Finalização Prevista
              </Label>
              <Input
                type="date"
                value={form.dataFinalizacao}
                onChange={(e) =>
                  onFormChange({ ...form, dataFinalizacao: e.target.value })
                }
                className="border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-gray-600 font-medium flex items-center gap-1.5">
              <FaDollarSign size={12} className="text-blue-400" />
              Custo Estimado
            </Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="R$ 0,00"
                value={form.custoEstimado}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const formatted = (Number(raw) / 100).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  );

                  onFormChange({
                    ...form,
                    custoEstimado: formatted,
                  });
                }}
                className=" border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600 font-medium flex items-center gap-1.5">
              <FaCheckCircle size={11} className="text-blue-400" />
              Status
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onFormChange({ ...form, status: s.value })}
                  className={`px-3 py-2 cursor-pointer rounded-lg border text-xs font-medium transition-all ${
                    form.status === s.value
                      ? s.color + " ring-2 ring-offset-1 ring-current"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 cursor-pointer border-gray-200 text-gray-500"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Salvando...
                </span>
              ) : editando ? (
                "Salvar alterações"
              ) : (
                "Criar manutenção"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
