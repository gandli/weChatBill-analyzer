export type TransactionType = "支出" | "收入" | "转账" | "其他";

export interface BillEntry {
  id: string;
  transactionTime: string; // YYYY-MM-DD HH:MM:SS
  type: TransactionType;
  counterparty: string;
  category: string;
  item: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  merchantOrderId: string;
  remark: string;
}

export interface BillSummary {
  totalExpenditure: number;
  totalIncome: number;
  totalTransfer: number;
  count: number;
  dateRange: {
    start: string;
    end: string;
  };
  categoryDistribution: Record<string, number>;
  monthlyStats: Record<string, { income: number; expenditure: number }>;
}

export interface AnalysisResult {
  entries: BillEntry[];
  summary: BillSummary;
}
