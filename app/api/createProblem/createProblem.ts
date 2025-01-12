import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import {
  sendOpenAIRequest,
  generatePrompt,
  validateEnvironmentVariables,
} from "@/app/api/utils/openaiRequestHelper";
dotenv.config({ path: ".env.local" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    validateEnvironmentVariables(["PROMPT_CREATE"]);

    const { difficulty, dataType, topic, selectedLanguage } = req.body;
    const promptTemplate = process.env.PROMPT_CREATE;
    const prompt = generatePrompt(promptTemplate, {
      difficulty,
      type: dataType,
      topic,
      display_language: selectedLanguage,
    });

    const responseText = await sendOpenAIRequest(prompt!);
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to create a problem" });
  }
}
