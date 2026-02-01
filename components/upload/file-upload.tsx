"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File, Lock, AlertCircle, Loader2 } from "lucide-react";
import { extractCSVFromZip } from "@/lib/parsers/zip-parser";
import { parseWeChatCSV } from "@/lib/parsers/csv-parser";
import { analyzeBills } from "@/lib/analyzers/bill-analyzer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [needsPassword, setNeedsPassword] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setNeedsPassword(selectedFile.name.endsWith(".zip"));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("请先选择文件");
            return;
        }

        setLoading(true);
        try {
            let csvContent = "";
            if (file.name.endsWith(".zip")) {
                csvContent = await extractCSVFromZip(file, password);
            } else if (file.name.endsWith(".csv")) {
                const reader = new FileReader();
                csvContent = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsText(file);
                });
            }

            const entries = await parseWeChatCSV(csvContent);
            const result = analyzeBills(entries);

            // Store in localStorage for now (sensitive data, but only on client)
            // In a real app, maybe use IndexedDB or context
            localStorage.setItem("bill_analysis_result", JSON.stringify(result));

            toast.success(`成功解析 ${entries.length} 条账单记录`);
            router.push("/dashboard");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "解析失败，请检查文件或密码");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>上传账单</CardTitle>
                <CardDescription>
                    支持微信支付导出的 ZIP 压缩包或 CSV 文件
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="bill-file">选择文件</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="bill-file"
                            type="file"
                            accept=".zip,.csv"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                {needsPassword && (
                    <div className="space-y-2">
                        <Label htmlFor="password">解压密码</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="请输入解压密码（通常为6位数字）"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className="pl-10"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            密码仅用于本地解压，不会上传到服务器
                        </p>
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={!file || loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            正在解析...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            开始分析
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
