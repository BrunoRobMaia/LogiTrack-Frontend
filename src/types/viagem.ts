import { Veiculo } from "./manutencao";

export interface Viagem {
  id: number;
  veiculo: Veiculo;
  dataSaida: string;
  dataChegada: string;
  origem: string;
  destino: string;
  kmPercorrida: number;
}

export interface ViagemForm {
  veiculoId: string;
  dataSaida: string;
  dataChegada: string;
  origem: string;
  destino: string;
  kmPercorrida: string;
}
