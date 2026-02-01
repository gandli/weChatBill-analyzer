/**
 * 交易记录类型
 */
export interface Transaction {
  /** 交易时间 */
  time: Date;
  /** 交易类型：支出/收入/其他 */
  type: '支出' | '收入' | '其他';
  /** 交易对方 */
  counterparty: string;
  /** 商品说明 */
  description: string;
  /** 金额（元） */
  amount: number;
  /** 收/支方式 */
  paymentMethod: string;
  /** 当前状态 */
  status: string;
  /** 交易单号 */
  transactionId: string;
  /** 商户单号 */
  merchantOrderId: string;
  /** 备注 */
  remark?: string;
}

/**
 * 财务摘要数据
 */
export interface FinancialSummary {
  /** 总支出 */
  totalExpense: number;
  /** 总收入 */
  totalIncome: number;
  /** 收支净额 */
  netFlow: number;
  /** 交易天数 */
  tradingDays: number;
  /** 支出笔数 */
  expenseCount: number;
  /** 收入笔数 */
  incomeCount: number;
  /** 商户数量 */
  merchantCount: number;
  /** 笔均支出 */
  avgExpense: number;
  /** 笔均收入 */
  avgIncome: number;
  /** 日均支出 */
  dailyAvgExpense: number;
  /** 最大单笔支出 */
  maxSingleExpense: number;
  /** 支出天数 */
  expenseDays: number;
}

/**
 * 月度趋势数据
 */
export interface MonthlyTrend {
  /** 月份 (YYYY-MM) */
  month: string;
  /** 月度支出 */
  expense: number;
  /** 月度收入 */
  income: number;
}

/**
 * 分类统计数据
 */
export interface CategoryStat {
  /** 分类名称 */
  name: string;
  /** 金额 */
  value: number;
  /** 占比 */
  percentage: number;
}

/**
 * 商户统计数据
 */
export interface MerchantStat {
  /** 商户名称 */
  name: string;
  /** 累计支出 */
  totalAmount: number;
  /** 交易次数 */
  count: number;
  /** 最高连续消费天数 */
  maxConsecutiveDays: number;
}

/**
 * 小时分布数据
 */
export interface HourlyDistribution {
  /** 小时 (0-23) */
  hour: number;
  /** 交易频次 */
  count: number;
  /** 交易金额 */
  amount: number;
}

/**
 * 完整分析结果
 */
export interface AnalysisResult {
  /** 原始交易数据 */
  transactions: Transaction[];
  /** 财务摘要 */
  summary: FinancialSummary;
  /** 月度趋势 */
  monthlyTrends: MonthlyTrend[];
  /** 资金结构分布 */
  fundStructure: CategoryStat[];
  /** 消费去向（Top 10 商户） */
  topMerchants: MerchantStat[];
  /** 商户支出排行（Top 20） */
  merchantRanking: MerchantStat[];
  /** 24小时交易分布 */
  hourlyDistribution: HourlyDistribution[];
  /** 商户消费频率（Top 15） */
  merchantFrequency: MerchantStat[];
}

/**
 * 文件上传响应
 */
export interface UploadResponse {
  /** 是否成功 */
  success: boolean;
  /** 消息 */
  message: string;
  /** 分析结果 ID */
  analysisId?: string;
  /** 错误信息 */
  error?: string;
}

/**
 * API 错误响应
 */
export interface ApiError {
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 详细信息 */
  details?: unknown;
}
