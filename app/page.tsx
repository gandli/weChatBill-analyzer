import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BarChart3, Download, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-xl font-bold">微信账单分析</h1>
          </div>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="https://github.com/gandli/weChatBill-analyzer" target="_blank">
                GitHub
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              微信账单分析工具
            </h2>
            <p className="text-xl text-muted-foreground">
              上传您的微信支付账单，获取专业的数据分析和可视化报告
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/upload">
                开始分析
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                了解更多
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>文件上传</CardTitle>
                <CardDescription>
                  支持 PDF 和 ZIP 格式，自动解析账单数据
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>数据分析</CardTitle>
                <CardDescription>
                  12+ 核心指标，7 种图表类型，全方位分析
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>导出报告</CardTitle>
                <CardDescription>
                  支持 Excel、PDF、PNG 多种格式导出
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>隐私保护</CardTitle>
                <CardDescription>
                  本地处理，不存储任何用户数据
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 border-t">
            <div>
              <div className="text-4xl font-bold">12+</div>
              <div className="text-sm text-muted-foreground">核心指标</div>
            </div>
            <div>
              <div className="text-4xl font-bold">7</div>
              <div className="text-sm text-muted-foreground">图表类型</div>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">隐私保护</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 微信账单分析工具. MIT License.</p>
          <p className="mt-2">
            <Link href="https://github.com/gandli/weChatBill-analyzer" className="hover:underline" target="_blank">
              GitHub
            </Link>
            {" · "}
            <Link href="/privacy" className="hover:underline">
              隐私政策
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
