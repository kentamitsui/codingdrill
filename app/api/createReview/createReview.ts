import { NextApiRequest, NextApiResponse } from "next";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 環境変数のバリデーション
    validateEnvironmentVariables(["PROMPT_CHECK"]);

    const {
      topic,
      uiLanguage,
      formattedQuestionText,
      editorLanguage,
      currentEditorValue,
    } = req.body;

    const baseTemplate = formattedQuestionText;
    const codeTemplate =
      `\n\nProgramming Language: ${editorLanguage}` +
      "\n\nUser input code:\n\n" +
      currentEditorValue +
      "\n\n" +
      process.env.PROMPT_CHECK;
    if (!baseTemplate || !codeTemplate) {
      return res.status(500).json({ error: "Missing prompt template" });
    }

    // APIへ送信するプロンプトを作成
    const prompt = generatePrompt(baseTemplate + codeTemplate, {
      topic,
      language: editorLanguage,
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
