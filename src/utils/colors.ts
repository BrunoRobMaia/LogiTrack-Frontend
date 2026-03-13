export const COLORS = [
  { fill: "#2563eb", light: "#dbeafe" },
  { fill: "#f97316", light: "#ffedd5" },
  { fill: "#10b981", light: "#d1fae5" },
  { fill: "#8b5cf6", light: "#ede9fe" },
  { fill: "#f43f5e", light: "#ffe4e6" },
];

export const statusColor: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-700 border-yellow-200",
  EM_REALIZACAO: "bg-blue-100 text-blue-700 border-blue-200",
  CONCLUIDA: "bg-green-100 text-green-700 border-green-200",
};
export const CATEGORY_COLORS: Record<string, { fill: string; light: string }> =
  {
    LEVE: { fill: "#2563eb", light: "#dbeafe" },
    PESADO: { fill: "#f97316", light: "#ffedd5" },
  };

export const DEFAULT_COLORS = [
  { fill: "#2563eb", light: "#dbeafe" },
  { fill: "#f97316", light: "#ffedd5" },
  { fill: "#10b981", light: "#d1fae5" },
  { fill: "#8b5cf6", light: "#ede9fe" },
];
