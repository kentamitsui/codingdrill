import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import {
  generatePrompt,
  sendOpenAIRequest,
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
    validateEnvironmentVariables(["PROMPT_CHECK"]);

    const {
      topic,
      uiLanguage,
      formattedQuestionText,
      editorLanguage,
      currentEditorValue,
    } = req.body;

    const baseTemplate = formattedQuestionText;
    const codeTemplate =
      `\n\nProgramming Language: ${editorLanguage}` +
      "\n\nUser input code:\n\n" +
      currentEditorValue +
      "\n\n" +
      process.env.PROMPT_CHECK;
    const prompt = generatePrompt(baseTemplate + codeTemplate, {
      topic,
      language: editorLanguage,
      display_language: uiLanguage,
    });

    const responseText = await sendOpenAIRequest(prompt!);
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to create a problem" });
  }
}
