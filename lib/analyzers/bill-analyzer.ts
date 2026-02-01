import { BillEntry, BillSummary, AnalysisResult } from "@/types/bill";
import { parse, format, isWithinInterval } from "date-fns";

export const analyzeBills = (entries: BillEntry[]): AnalysisResult => {
    if (entries.length === 0) {
        return {
            entries: [],
            summary: {
                totalExpenditure: 0,
                totalIncome: 0,
                totalTransfer: 0,
                count: 0,
                dateRange: { start: "", end: "" },
                categoryDistribution: {},
                monthlyStats: {},
            },
        };
    }

    let totalExpenditure = 0;
    let totalIncome = 0;
    let totalTransfer = 0;
    const categoryDistribution: Record<string, number> = {};
    const monthlyStats: Record<string, { income: number; expenditure: number }> = {};

    let startDate = entries[0].transactionTime;
    let endDate = entries[0].transactionTime;

    entries.forEach((entry) => {
        const amount = entry.amount;

        // Date range
        if (entry.transactionTime < startDate) startDate = entry.transactionTime;
        if (entry.transactionTime > endDate) endDate = entry.transactionTime;

        // Monthly stats
        const month = entry.transactionTime.substring(0, 7); // YYYY-MM
        if (!monthlyStats[month]) {
            monthlyStats[month] = { income: 0, expenditure: 0 };
        }

        if (entry.type === "支出") {
            totalExpenditure += amount;
            monthlyStats[month].expenditure += amount;

            // Category distribution
            const category = entry.category || "未分类";
            categoryDistribution[category] = (categoryDistribution[category] || 0) + amount;
        } else if (entry.type === "收入") {
            totalIncome += amount;
            monthlyStats[month].income += amount;
        } else if (entry.type === "转账") {
            totalTransfer += amount;
        }
    });

    return {
        entries,
        summary: {
            totalExpenditure,
            totalIncome,
            totalTransfer,
            count: entries.length,
            dateRange: { start: startDate, end: endDate },
            categoryDistribution,
            monthlyStats,
        },
    };
};
