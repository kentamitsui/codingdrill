import { NextRequest, NextResponse } from "next/server";
import { createOpenAIRequest } from "../utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  const {
    topic,
    selectedLanguage,
    formattedProblemContent,
    editorLanguage,
    currentEditorValue,
  } = await req.json();
  const modified = process.env.CODE;
  const promptTemplate =
    formattedProblemContent +
    modified?.replace("%language%", editorLanguage) +
    currentEditorValue;

  if (!promptTemplate) {
    return NextResponse.json(
      { error: "PROMPT_CREATE is not defined in environment variables" },
      { status: 400 },
    );
  }

  const modifiedPrompt =
    promptTemplate +
    process.env.PROMPT_CHECK?.replaceAll("%language%", editorLanguage)
      .replaceAll("%topic%", topic)
      .replaceAll("%display_language%", selectedLanguage);

  // console.log("modifiedPrompt\n\n", modifiedPrompt);

  try {
    const responseText = await createOpenAIRequest(modifiedPrompt);
    return NextResponse.json({ responseText });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a problem" },
      { status: 500 },
    );
  }
}
