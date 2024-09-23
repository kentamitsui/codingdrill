import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});
const prompt = process.env.PROMPT_CREATE || "Default prompt message.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.PROMPT_CREATE) {
    return res
      .status(400)
      .json({ error: "PROMPT_CREATE is not defined in environment variables" });
  }

  try {
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = request.choices[0].message.content;
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to create a problem" });
  }
}
