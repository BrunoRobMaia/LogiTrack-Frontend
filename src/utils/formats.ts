export function formatCurrency(value: string) {
  const number = value.replace(/\D/g, "");
  const formatted = (Number(number) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatted;
}
