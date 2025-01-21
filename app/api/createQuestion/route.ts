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
      validateEnvironmentVariables(["OPENAI_API_KEY", "PROMPT_CREATE"]);
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
    const { difficulty, dataType, topic, uiLanguage } = requestData;

    //  プロンプトテンプレートの取得とバリデーション
    const promptTemplate = process.env.PROMPT_CREATE;
    if (!promptTemplate) {
      console.error("PROMPT_CREATE is not set.");
      return NextResponse.json(
        { error: "Server misconfiguration: Missing prompt template." },
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
    // プロンプトのundefinedチェック
    if (!prompt) {
      console.error("Generated prompt is undefined or empty.");
      return NextResponse.json(
        {
          error:
            "Failed to generate a valid prompt. Please check your request parameters.",
        },
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
      console.error("Empty response from OpenAI API.");
      return NextResponse.json(
        { error: "Received an empty response from OpenAI API." },
        { status: 500 },
      );
    }

    // APIからのレスポンスを返す
    return NextResponse.json({ responseText });
  } catch (error) {
    console.error("Error processing OpenAI request:", error);
    return NextResponse.json(
      { error: "Failed to create a problem" },
      { status: 500 },
    );
  }
}
