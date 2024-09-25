import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { language, difficulty, dataType, topic, displayLanguage } = req.body;
  const promptTemplate =
    process.env.PROMPT_CREATE ||
    "Prompt is not defined. Only output text 'test.'";

  if (!promptTemplate) {
    return res
      .status(400)
      .json({ error: "PROMPT_CREATE is not defined in environment variables" });
  }

  const modifiedPrompt = promptTemplate
    .replace("%language%", language)
    .replace("%difficulty%", difficulty)
    .replace("%type%", dataType)
    .replace("%topic%", topic)
    .replace("%display-language%", displayLanguage);

  try {
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: modifiedPrompt,
        },
      ],
    });

    // console.log(modifiedPrompt);

    const responseText = request.choices[0].message.content;
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to create a problem" });
  }
}
