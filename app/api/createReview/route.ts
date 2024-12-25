import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

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

  console.log("modifiedPrompt\n\n", modifiedPrompt);

  try {
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: modifiedPrompt,
        },
      ],
    });

    const responseText = request.choices[0].message.content;
    return NextResponse.json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to create a problem" },
      { status: 500 },
    );
  }
}
