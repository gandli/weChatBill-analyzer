import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";

export const extractCSVFromZip = async (
    zipFile: File,
    password?: string
): Promise<string> => {
    const zipReader = new ZipReader(new BlobReader(zipFile));
    try {
        const entries = await zipReader.getEntries();

        // Look for the CSV file in the ZIP
        // Usually named something like "微信支付交易明细...csv"
        const csvEntry = entries.find(entry => entry.filename.endsWith(".csv"));

        if (!csvEntry) {
            throw new Error("ZIP 文件中未找到 CSV 账单文件");
        }

        if (!(csvEntry as any).getData) {
            throw new Error("无法读取 ZIP 中的文件内容");
        }

        const csvContent = await (csvEntry as any).getData(new TextWriter(), { password });
        return csvContent;
    } catch (error: any) {
        if (error.message?.includes("password")) {
            throw new Error("密码错误或 ZIP 已加密但未提供密码");
        }
        throw error;
    } finally {
        await zipReader.close();
    }
};
