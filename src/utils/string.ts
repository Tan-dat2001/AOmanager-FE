export function formatPrice(value?: number): string {
  return value !== undefined ? `${value.toLocaleString("vi-VN")} VND` : "";
}

export function formatSoldQuantity(value?: number): string {
  return value !== undefined ? `sold: ${value}` : "";
}

export function formatInventoryQuantity(value?: number): string {
  return value !== undefined ? `Inventory quantity: ${value}` : "";
}
