import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export async function createOpenAIRequest(prompt: string) {
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

    return request.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw new Error("Failed to create a problem");
  }
}
