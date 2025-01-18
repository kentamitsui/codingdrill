import { NextRequest, NextResponse } from "next/server";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  try {
    // 環境変数のバリデーション
    validateEnvironmentVariables(["PROMPT_CHECK"]);

    const {
      topic,
      uiLanguage,
      formattedQuestionText,
      editorLanguage,
      currentEditorValue,
    } = await req.json();

    // プロンプトテンプレートを取得
    const baseTemplate = formattedQuestionText;
    const codeTemplate =
      `\n\nProgramming Language: ${editorLanguage}` +
      "\n\nUser input code:\n\n" +
      currentEditorValue +
      "\n\n" +
      process.env.PROMPT_CHECK;
    if (!baseTemplate || !codeTemplate) {
      return NextResponse.json(
        { error: "Missing prompt template" },
        { status: 500 },
      );
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
