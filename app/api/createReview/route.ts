import { NextRequest, NextResponse } from "next/server";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  try {
    try {
      // 環境変数のバリデーション
      validateEnvironmentVariables(["OPENAI_API_KEY", "PROMPT_CHECK"]);
    } catch (envError) {
      console.error("Missing required environment variables:", envError);
      return NextResponse.json(
        { error: (envError as Error).message },
        { status: 500 },
      );
    }

    // 直接catchしてエラーハンドリング
    const requestData = await req.json().catch((error) => {
      console.error("Invalid JSON format in request:", error);
      return NextResponse.json(
        { error: "Invalid request format. Please send a valid JSON payload." },
        { status: 400 },
      );
    });
    // requestDataのundefinedチェック
    if (!requestData) {
      return NextResponse.json(
        { error: "Invalid request format. Please send a valid JSON payload." },
        { status: 400 },
      );
    }
    // エラーハンドリング、undefinedチェックが成功したら、requestDataから必要な情報を取得
    const {
      topic,
      uiLanguage,
      formattedQuestionText,
      editorLanguage,
      currentEditorValue,
    } = requestData;

    // プロンプトテンプレートの取得とバリデーション
    if (!formattedQuestionText || !editorLanguage || !currentEditorValue) {
      return NextResponse.json(
        { error: "Missing required request parameters." },
        { status: 400 },
      );
    }
    // APIへ送信するプロンプトを作成
    const prompt = generatePrompt(
      formattedQuestionText +
        `\n\nProgramming Language: ${editorLanguage}\n\nUser input code:\n\n${currentEditorValue}\n\n${process.env.PROMPT_CHECK}`,
      { topic, language: editorLanguage, display_language: uiLanguage },
    );

    // プロンプトのundefinedチェック
    if (!prompt) {
      console.error("Generated prompt is undefined or empty.");
      return NextResponse.json(
        { error: "Failed to generate a valid prompt." },
        { status: 500 },
      );
    }

    // APIへリクエストを送信・取得
    let responseText;
    try {
      responseText = await sendOpenAIRequest(prompt);
    } catch (apiError) {
      console.error("OpenAI API request failed:", apiError);
      return NextResponse.json(
        { error: "Failed to communicate with OpenAI API." },
        { status: 500 },
      );
    }

    //  APIレスポンスのundefinedチェック
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
      { error: "Failed to create a review response." },
      { status: 500 },
    );
  }
}
