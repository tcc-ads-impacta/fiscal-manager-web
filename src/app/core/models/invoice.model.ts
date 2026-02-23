export interface InvoiceItemDto {
  id: number;
  description: string;
  amount: number;
  date: string; // ISO 8601 gerado pelo C#
  status: string;
  severity: string;
  daysUntilDue: number;
  publicUrl: string;
}

export interface InvoicePayload {
  description: string;
  amount: number;
  date: string;
  file?: File; // Opcional para cobrir o cenário de PUT
}