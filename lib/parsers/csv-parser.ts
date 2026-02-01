import Papa from "papaparse";
import { BillEntry, TransactionType } from "@/types/bill";
import { v4 as uuidv4 } from "uuid";

export const parseWeChatCSV = async (csvString: string): Promise<BillEntry[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvString, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as string[][];
                const entries: BillEntry[] = [];

                // Find where the actual data starts (usually after several header lines)
                let dataStartIndex = -1;
                for (let i = 0; i < data.length; i++) {
                    if (data[i][0]?.includes("交易时间") && data[i][1]?.includes("交易类型")) {
                        dataStartIndex = i + 1;
                        break;
                    }
                }

                if (dataStartIndex === -1) {
                    // If no header found, maybe it's a direct CSV without comments
                    dataStartIndex = 0;
                }

                for (let i = dataStartIndex; i < data.length; i++) {
                    const row = data[i];
                    if (row.length < 5) continue;

                    const amountStr = row[5]?.replace("¥", "").replace(",", "").trim();
                    const amount = parseFloat(amountStr) || 0;

                    // Mapping "收/支" to TransactionType
                    let type: TransactionType = "其他";
                    const typeStr = row[4];
                    if (typeStr === "支出") type = "支出";
                    else if (typeStr === "收入") type = "收入";
                    else if (typeStr === "转账") type = "转账";

                    entries.push({
                        id: uuidv4(),
                        transactionTime: row[0]?.trim() || "",
                        type: type,
                        counterparty: row[2]?.trim() || "",
                        category: "", // WeChat CSV usually doesn't have a category field in the same way Alipay does
                        item: row[3]?.trim() || "",
                        amount: amount,
                        paymentMethod: row[6]?.trim() || "",
                        status: row[7]?.trim() || "",
                        transactionId: row[8]?.trim() || "",
                        merchantOrderId: row[9]?.trim() || "",
                        remark: row[10]?.trim() || "",
                    });
                }
                resolve(entries);
            },
            error: (error: any) => {
                reject(error);
            },
        });
    });
};
