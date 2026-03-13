export interface Manutencao {
  id: number;
  veiculo: Veiculo;
  dataInicio: string;
  dataFinalizacao: string;
  tipoServico: string;
  custoEstimado: number;
  status: string;
}
export interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  tipo: string;
  ano: number;
}
export interface ManutencaoForm {
  veiculoId: string;
  dataInicio: string;
  dataFinalizacao: string;
  tipoServico: string;
  custoEstimado: string;
  status: string;
}
