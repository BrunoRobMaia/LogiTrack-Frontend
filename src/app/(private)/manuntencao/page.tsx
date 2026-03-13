"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlus, FaTools, FaTruck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Manutencao, ManutencaoForm, Veiculo } from "@/types/manutencao";
import { Header } from "@/components/Header";
import { CardResumoManutencao } from "@/components/CardResumoManutencao";
import { ManutencaoDialog } from "@/components/ManutencaoDialog";
import { TabelaManutencoes } from "@/components/TabelaManutencoes";

const formVazio: ManutencaoForm = {
  veiculoId: "",
  dataInicio: "",
  dataFinalizacao: "",
  tipoServico: "",
  custoEstimado: "",
  status: "PENDENTE",
};

const tiposServico = [
  "Troca de Óleo",
  "Troca de Pneus",
  "Revisão de Freios",
  "Revisão de Motor",
  "Troca de Filtro",
  "Alinhamento e Balanceamento",
  "Revisão Geral",
  "Outro",
];

export default function ManutencoesPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editando, setEditando] = useState<Manutencao | null>(null);
  const [form, setForm] = useState<ManutencaoForm>(formVazio);
  const [filtroStatus, setFiltroStatus] = useState<string>("TODOS");
  const router = useRouter();

  const { data: manutencoes, isLoading } = useQuery<Manutencao[]>({
    queryKey: ["manutencoes"],
    queryFn: async () => (await api.get("/manutencoes")).data,
  });

  const { data: veiculos } = useQuery<Veiculo[]>({
    queryKey: ["veiculos"],
    queryFn: async () => (await api.get("/veiculos")).data,
  });

  const criarMutation = useMutation({
    mutationFn: (data: object) => api.post("/manutencoes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manutencoes"] });
      toast.success("Manutenção criada com sucesso!");
      fecharDialog();
    },
    onError: () => toast.error("Erro ao criar manutenção!"),
  });

  const editarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: object }) =>
      api.put(`/manutencoes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manutencoes"] });
      toast.success("Manutenção atualizada com sucesso!");
      fecharDialog();
    },
    onError: () => toast.error("Erro ao atualizar manutenção!"),
  });

  const deletarMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/manutencoes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manutencoes"] });
      toast.success("Manutenção removida com sucesso!");
    },
    onError: () => toast.error("Erro ao remover manutenção!"),
  });

  function abrirCriar() {
    setEditando(null);
    setForm(formVazio);
    setDialogOpen(true);
  }

  function abrirEditar(m: Manutencao) {
    setEditando(m);
    setForm({
      veiculoId: String(m.veiculo.id),
      dataInicio: m.dataInicio ?? "",
      dataFinalizacao: m.dataFinalizacao ?? "",
      tipoServico: m.tipoServico,
      custoEstimado: String(m.custoEstimado),
      status: m.status ?? "PENDENTE",
    });
    setDialogOpen(true);
  }

  function fecharDialog() {
    setDialogOpen(false);
    setEditando(null);
    setForm(formVazio);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const rawValue = form.custoEstimado.replace(/\D/g, "");
    const custoNumerico = rawValue ? Number(rawValue) / 100 : 0;

    const payload = {
      veiculo: { id: Number(form.veiculoId) },
      dataInicio: form.dataInicio,
      dataFinalizacao: form.dataFinalizacao,
      tipoServico: form.tipoServico,
      custoEstimado: custoNumerico,
      status: form.status,
    };
    if (editando) {
      editarMutation.mutate({ id: editando.id, data: payload });
    } else {
      criarMutation.mutate(payload);
    }
  }

  const manutencoesFiltradas =
    filtroStatus === "TODOS"
      ? (manutencoes ?? [])
      : (manutencoes?.filter((m) => m.status === filtroStatus) ?? []);

  const totalCusto =
    manutencoes?.reduce((acc, m) => acc + (m.custoEstimado ?? 0), 0) ?? 0;

  const isPending = criarMutation.isPending || editarMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title={"Módulo de Manutenções"}
        subTitle={"Agendamento e controle de manutenções"}
        icon={<FaTools size={20} />}
      >
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="gap-2 cursor-pointer text-gray-500 border-gray-200 hover:text-blue-500 hover:border-blue-200 transition-colors"
        >
          <FaTruck size={13} />
          Dashboard
        </Button>
        <Button
          onClick={abrirCriar}
          className="gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaPlus size={13} />
          Nova Manutenção
        </Button>
      </Header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <CardResumoManutencao
          manutencoes={manutencoes ?? []}
          isLoading={isLoading}
          totalCusto={totalCusto}
        />

        <div className="flex gap-2">
          {["TODOS", "PENDENTE", "EM_REALIZACAO", "CONCLUIDA"].map((s) => (
            <Button
              key={s}
              variant={filtroStatus === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroStatus(s)}
              className={
                filtroStatus === s
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-500 cursor-pointer"
              }
            >
              {s === "TODOS" ? "Todos" : s.replace("_", " ")}
            </Button>
          ))}
        </div>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base text-gray-700">
              Lista de Manutenções
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TabelaManutencoes
              manutencoes={manutencoesFiltradas}
              isLoading={isLoading}
              onEditar={abrirEditar}
              onDeletar={(id) => deletarMutation.mutate(id)}
            />
          </CardContent>
        </Card>
      </main>

      <ManutencaoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editando={editando}
        form={form}
        onFormChange={setForm}
        onSubmit={handleSubmit}
        veiculos={veiculos}
        tiposServico={tiposServico}
        isPending={isPending}
      />
    </div>
  );
}
