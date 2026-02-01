import { FileUpload } from "@/components/upload/file-upload";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <header className="border-b bg-background">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6" />
                        <h1 className="text-xl font-bold">微信账单分析</h1>
                    </Link>
                    <Button variant="ghost" asChild>
                        <Link href="/">返回首页</Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto space-y-8 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">第一步：上传您的账单</h2>
                        <p className="text-muted-foreground text-lg">
                            请上传从微信支付导出的账单文件。我们保证您的数据安全，所有处理均在本地浏览器中完成。
                        </p>
                    </div>

                    <FileUpload />

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-left space-y-4">
                        <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                            如何获取账单文件？
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                            <li>打开微信，点击 <strong>我  支付  钱包</strong></li>
                            <li>点击右上角 <strong>账单</strong></li>
                            <li>点击右上角 <strong>常见问题</strong></li>
                            <li>点击 <strong>下载账单  用于个人对账</strong></li>
                            <li>选择 <strong>账单时间范围</strong></li>
                            <li>输入 <strong>邮箱地址</strong> 以接收账单</li>
                            <li>在邮箱中下载 ZIP 压缩包，并记录邮箱中提供的 <strong>解压密码</strong></li>
                        </ol>
                    </div>
                </div>
            </main>
        </div>
    );
}
