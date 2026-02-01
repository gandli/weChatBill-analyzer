"use client";

import React, { useEffect, useState } from "react";
import { AnalysisResult } from "@/types/bill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingDown,
    TrendingUp,
    ArrowLeftRight,
    Calendar,
    BarChart3,
    Download,
    Table as TableIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { exportToCSV } from "@/lib/utils";

const SpendingTrendChart = dynamic(() => import("@/components/charts/bill-charts").then(mod => mod.SpendingTrendChart), { ssr: false });
const CategoryPieChart = dynamic(() => import("@/components/charts/bill-charts").then(mod => mod.CategoryPieChart), { ssr: false });

export default function DashboardPage() {
    const [data, setData] = useState<AnalysisResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedData = localStorage.getItem("bill_analysis_result");
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            router.push("/upload");
        }
    }, [router]);

    const handleExport = () => {
        if (!data) return;
        exportToCSV(data.entries, `wechat_bills_${data.summary.dateRange.start}_${data.summary.dateRange.end}.csv`);
    };

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">正在加载数据...</p>
            </div>
        );
    }

    const { summary } = data;

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="border-b bg-background sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">账单分析报告</h1>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/upload">重新上传</Link>
                        </Button>
                        <Button size="sm" onClick={handleExport}>
                            <Download className="mr-2 h-4 w-4" />
                            导出数据
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Date Range Summary */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">数据概览</h2>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {summary.dateRange.start} 至 {summary.dateRange.end}
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        共计 {summary.count} 条记录
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-red-50/50 border-red-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-red-600">总支出</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-700">¥ {summary.totalExpenditure.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50/50 border-emerald-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-600">总收入</CardTitle>
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-700">¥ {summary.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50/50 border-blue-100">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600">转账/其他</CardTitle>
                            <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-700">¥ {summary.totalTransfer.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>月度收支趋势</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SpendingTrendChart monthlyStats={summary.monthlyStats} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>支出分类分布</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CategoryPieChart distribution={summary.categoryDistribution} />
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Transactions (Optional Preview) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <TableIcon className="h-5 w-5" />
                            明细预览 (前 10 条)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">时间</th>
                                        <th className="px-4 py-3">类型</th>
                                        <th className="px-4 py-3">交易对方</th>
                                        <th className="px-4 py-3">项目</th>
                                        <th className="px-4 py-3 text-right">金额</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.entries.slice(0, 10).map((entry) => (
                                        <tr key={entry.id} className="border-b last:border-0 hover:bg-muted/30">
                                            <td className="px-4 py-3 whitespace-nowrap">{entry.transactionTime}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${entry.type === '支出' ? 'bg-red-100 text-red-700' :
                                                    entry.type === '收入' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {entry.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 truncate max-w-[150px]">{entry.counterparty}</td>
                                            <td className="px-4 py-3 truncate max-w-[200px]">{entry.item}</td>
                                            <td className={`px-4 py-3 text-right font-medium ${entry.type === '支出' ? 'text-red-600' :
                                                entry.type === '收入' ? 'text-emerald-600' : ''
                                                }`}>
                                                {entry.type === '支出' ? '-' : entry.type === '收入' ? '+' : ''}
                                                ¥ {entry.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
