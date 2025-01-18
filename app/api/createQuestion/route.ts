import { NextRequest, NextResponse } from "next/server";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  try {
    // 環境変数のバリデーション（設定されていなければエラーレスポンス）
    validateEnvironmentVariables(["PROMPT_CREATE"]);

    const { difficulty, dataType, topic, uiLanguage } = await req.json();
    // プロンプトテンプレートを取得
    const promptTemplate = process.env.PROMPT_CREATE;
    if (!promptTemplate) {
      return NextResponse.json(
        { error: "Missing prompt template" },
        { status: 500 },
      );
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
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 },
      );
    }

    // APIからのレスポンスを返す
    return NextResponse.json({ responseText });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a problem" },
      { status: 500 },
    );
  }
}
