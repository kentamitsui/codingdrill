import { NextRequest, NextResponse } from "next/server";
import {
  generatePrompt,
  sendOpenAIRequest,
  validateEnvironmentVariables,
} from "../utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  try {
    validateEnvironmentVariables(["PROMPT_CHECK"]);

    const {
      topic,
      selectedLanguage,
      formattedProblemContent,
      editorLanguage,
      currentEditorValue,
    } = await req.json();

    const baseTemplate = formattedProblemContent;
    const codeTemplate =
      `\n\nProgramming Language: ${editorLanguage}` +
      "\n\nUser input code:\n\n" +
      currentEditorValue +
      "\n\n" +
      process.env.PROMPT_CHECK;
    const prompt = generatePrompt(baseTemplate + codeTemplate, {
      topic,
      language: editorLanguage,
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
