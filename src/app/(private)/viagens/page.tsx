"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRoute, FaTruck } from "react-icons/fa";
import { Header } from "@/components/Header";
import { Viagem, ViagemForm } from "@/types/viagem";
import { Veiculo } from "@/types/manutencao";
import { CardResumoViagem } from "@/components/CardResumoViagem";
import { TabelaViagem } from "@/components/TabelaViagem";
import { ViagemDialog } from "@/components/ViagemDialog";

const formVazio: ViagemForm = {
  veiculoId: "",
  dataSaida: "",
  dataChegada: "",
  origem: "",
  destino: "",
  kmPercorrida: "",
};

export default function ViagensPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<Viagem | null>(null);
  const [form, setForm] = useState<ViagemForm>(formVazio);

  const { data: viagens, isLoading: viagensLoading } = useQuery<Viagem[]>({
    queryKey: ["viagens"],
    queryFn: async () => (await api.get("/viagens")).data,
  });

  const { data: veiculos } = useQuery<Veiculo[]>({
    queryKey: ["veiculos"],
    queryFn: async () => (await api.get("/veiculos")).data,
  });

  const criarMutation = useMutation({
    mutationFn: (data: object) => api.post("/viagens", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viagens"] });
      toast.success("Viagem criada com sucesso!");
      fecharDialog();
    },
    onError: () => toast.error("Erro ao criar viagem!"),
  });

  const editarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: object }) =>
      api.put(`/viagens/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viagens"] });
      toast.success("Viagem atualizada com sucesso!");
      fecharDialog();
    },
    onError: () => toast.error("Erro ao atualizar viagem!"),
  });

  const deletarMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/viagens/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viagens"] });
      toast.success("Viagem removida com sucesso!");
    },
    onError: () => toast.error("Erro ao remover viagem!"),
  });

  function abrirCriar() {
    setEditando(null);
    setForm(formVazio);
    setDialogOpen(true);
  }

  function abrirEditar(viagem: Viagem) {
    setEditando(viagem);
    setForm({
      veiculoId: String(viagem.veiculo.id),
      dataSaida: viagem.dataSaida?.slice(0, 16) ?? "",
      dataChegada: viagem.dataChegada?.slice(0, 16) ?? "",
      origem: viagem.origem,
      destino: viagem.destino,
      kmPercorrida: String(viagem.kmPercorrida),
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
    const payload = {
      veiculo: { id: Number(form.veiculoId) },
      dataSaida: form.dataSaida,
      dataChegada: form.dataChegada,
      origem: form.origem,
      destino: form.destino,
      kmPercorrida: Number(form.kmPercorrida),
    };
    if (editando) {
      editarMutation.mutate({ id: editando.id, data: payload });
    } else {
      criarMutation.mutate(payload);
    }
  }

  const isPending = criarMutation.isPending || editarMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Módulo de Viagens"
        subTitle="Gestão de viagens da frota"
        icon={<FaRoute size={20} />}
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
          Nova Viagem
        </Button>
      </Header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <CardResumoViagem isLoading={viagensLoading} viagens={viagens || []} />

        <TabelaViagem
          viagensLoading={viagensLoading}
          viagens={viagens || []}
          abrirCriar={abrirCriar}
          abrirEditar={abrirEditar}
          deletarViagem={(id) => deletarMutation.mutate(id)}
        />
      </main>

      <ViagemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editando={editando}
        form={form}
        onFormChange={setForm}
        onSubmit={handleSubmit}
        veiculos={veiculos}
        isPending={isPending}
      />
    </div>
  );
}
