import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

async function createProblem() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: process.env.PROMPT_CREATE,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

createProblem();
