import OpenAI from "openai";

// 環境変数のバリデーション
export function validateEnvironmentVariables(requiredVariables: string[]) {
  const missingVariables: string[] = [];

  // 不足している変数を一度に取得する
  requiredVariables.forEach((variable) => {
    if (!process.env[variable] || process.env[variable]?.trim() === "") {
      missingVariables.push(variable);
    }
  });

  // エラー時に全ての不足変数を通知する
  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(", ")}`,
    );
  }
}

// OpenAIインスタンスを作成
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// プロンプトの生成
export function generatePrompt(
  baseTemplate: string,
  replacements: Record<string, string>,
) {
  // console.log("base:\n", baseTemplate, "\n\n\nreplace:\n", replacements);
  // const result = Object.keys(replacements).reduce(
  //   (template, key) =>
  //     template?.replaceAll(`%${key}%`, replacements[key] || ""),
  //   baseTemplate,
  // );
  // console.log("\n\n\nGenerated prompt:\n", result);

  return Object.keys(replacements).reduce(
    (template, key) =>
      template?.replaceAll(`%${key}%`, replacements[key] || ""),
    baseTemplate,
  );
}

export async function sendOpenAIRequest(prompt: string) {
  try {
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // console.log("Full OpenAI Response:", JSON.stringify(request, null, 2));
    // console.log("Response Text:", request.choices[0].message.content);
    // console.log("Model Used:", request.model);
    console.log("Total Tokens Used:", request.usage?.total_tokens);
    console.log("Prompt Tokens:", request.usage?.prompt_tokens);
    console.log("Completion Tokens:", request.usage?.completion_tokens);

    return request.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw new Error("Failed to create a problem");
  }
}
