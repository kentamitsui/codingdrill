import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Sidebar.tsxからのリクエストで送信されたOptionコンポーネントの値を展開する
  const { difficulty, dataType, topic, displayLanguage } = req.body;
  const promptTemplate = process.env.PROMPT_CREATE;

  if (!promptTemplate) {
    return res
      .status(400)
      .json({ error: "PROMPT_CREATE is not defined in environment variables" });
  }

  // プロンプトの%で囲まれた文字列を、req.bodyのデータで置き換える
  const modifiedPrompt = promptTemplate
    .replace("%difficulty%", difficulty)
    .replace("%type%", dataType)
    .replace("%topic%", topic)
    .replace("%display-language%", displayLanguage);

  try {
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      // 出力形式をJSONで固定(プロンプトでも必ず記載が必要)
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: modifiedPrompt,
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
