import { NextRequest, NextResponse } from "next/server";
import { createOpenAIRequest } from "../utils/openaiRequestHelper";

export async function POST(req: NextRequest) {
  const { difficulty, dataType, topic, selectedLanguage } = await req.json();
  const promptTemplate = process.env.PROMPT_CREATE;

  if (!promptTemplate) {
    return NextResponse.json(
      { error: "PROMPT_CREATE is not defined in environment variables" },
      { status: 400 },
    );
  }

  const modifiedPrompt = promptTemplate
    .replaceAll("%difficulty%", difficulty)
    .replaceAll("%type%", dataType)
    .replaceAll("%topic%", topic)
    .replaceAll("%display_language%", selectedLanguage);

  console.log("OpenAI response:\n\n", modifiedPrompt);

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
