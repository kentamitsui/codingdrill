import { NextRequest, NextResponse } from "next/server";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  try {
    validateEnvironmentVariables(["PROMPT_CREATE"]);

    const { difficulty, dataType, topic, selectedLanguage } = await req.json();
    const promptTemplate = process.env.PROMPT_CREATE!;
    const prompt = generatePrompt(promptTemplate, {
      difficulty,
      type: dataType,
      topic,
      display_language: selectedLanguage,
    });

    const responseText = await sendOpenAIRequest(prompt!);
    return NextResponse.json({ responseText });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a problem" },
      { status: 500 },
    );
  }
}
