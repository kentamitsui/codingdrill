import { NextApiRequest, NextApiResponse } from "next";
import {
  sendOpenAIRequest,
  generatePrompt,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

// APIハンドラ: 問題文を生成する
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // HTTPメソッドのバリデーション
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 環境変数のバリデーション
    validateEnvironmentVariables(["PROMPT_CREATE"]);

    // クライアント側から選択・送信されたデータの取得
    const { difficulty, dataType, topic, uiLanguage } = req.body;

    // 環境変数(.env.local)からプロンプトのテンプレートを取得
    const promptTemplate = process.env.PROMPT_CREATE;
    if (!promptTemplate) {
      return res.status(500).json({ error: "Missing prompt template" });
    }

    // APIへ送信するプロンプトを作成
    const prompt = generatePrompt(promptTemplate, {
      difficulty,
      type: dataType,
      topic,
      display_language: uiLanguage,
    });

    // APIへリクエストを送信・取得
    const responseText = await sendOpenAIRequest(prompt);

    if (!responseText) {
      return res.status(500).json({ error: "Failed to generate response" });
    }

    // APIからのレスポンスを返す
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to create a problem" });
  }
}
