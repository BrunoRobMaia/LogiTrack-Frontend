import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Viagem, ViagemForm } from "@/types/viagem";
import { Veiculo } from "@/types/manutencao";
import {
  FaRoute,
  FaTruck,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useMemo } from "react";

interface ViagemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editando: Viagem | null;
  form: ViagemForm;
  onFormChange: (form: ViagemForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  veiculos: Veiculo[] | undefined;
  isPending: boolean;
}

export function ViagemDialog({
  open,
  onOpenChange,
  editando,
  form,
  onFormChange,
  onSubmit,
  veiculos,
  isPending,
}: ViagemDialogProps) {
  const veiculoSelecionado = useMemo(
    () => veiculos?.find((v) => String(v.id) === form.veiculoId),
    [veiculos, form.veiculoId],
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl! p-0 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <FaRoute className="text-white" size={16} />
              </div>
              <div>
                <DialogTitle className="text-white text-lg font-semibold">
                  {editando ? "Editar Viagem" : "Nova Viagem"}
                </DialogTitle>
                <p className="text-green-100 text-xs mt-0.5">
                  {editando
                    ? "Atualize os dados da viagem"
                    : "Preencha os dados para registrar"}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-blue-400" />
                Data/Hora de Saída
              </Label>
              <Input
                type="datetime-local"
                value={form.dataSaida}
                onChange={(e) =>
                  onFormChange({ ...form, dataSaida: e.target.value })
                }
                required
                className="border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-blue-400" />
                Data/Hora de Chegada
              </Label>
              <Input
                type="datetime-local"
                value={form.dataChegada}
                onChange={(e) =>
                  onFormChange({ ...form, dataChegada: e.target.value })
                }
                className="border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaMapMarkerAlt size={11} className="text-blue-400" />
                Cidade de Origem
              </Label>
              <Input
                placeholder="Ex: São Paulo"
                value={form.origem}
                onChange={(e) =>
                  onFormChange({ ...form, origem: e.target.value })
                }
                required
                className="border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-600 font-medium flex items-center gap-1.5">
                <FaMapMarkerAlt size={11} className="text-blue-400" />
                Cidade de Destino
              </Label>
              <Input
                placeholder="Ex: Rio de Janeiro"
                value={form.destino}
                onChange={(e) =>
                  onFormChange({ ...form, destino: e.target.value })
                }
                required
                className="border-gray-200 focus:border-blue-400 h-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-gray-600 font-medium flex items-center gap-1.5">
              <FaTachometerAlt size={12} className="text-blue-400" />
              Quilometragem Percorrida
            </Label>
            <Input
              type="number"
              placeholder="Ex: 450"
              value={form.kmPercorrida}
              onChange={(e) =>
                onFormChange({ ...form, kmPercorrida: e.target.value })
              }
              required
              className="border-gray-200 focus:border-blue-400 h-10"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 text-gray-500 cursor-pointer"
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
                "Criar viagem"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
