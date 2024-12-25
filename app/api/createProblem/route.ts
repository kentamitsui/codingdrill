import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

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
