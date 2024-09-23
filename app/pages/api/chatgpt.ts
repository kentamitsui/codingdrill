// import axios from "axios";
// import * as dotenv from "dotenv";
// import { NextApiRequest, NextApiResponse } from "next";
// dotenv.config();

// export default async function handleCreate(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const prompt_replaced = process.env.PROMPT_CREATE?.replace(
//     "%language%",
//     "JavaScript"
//   )
//     .replace("%difficulty%", "easy")
//     .replace("%type%", "number")
//     .replace("%topic%", "Array")
//     .replace("%display_language%", "Japanese");

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo", // or "gpt-4" depending on your usage
//         messages: [
//           {
//             role: "user",
//             content: prompt_replaced,
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure API key is correct
//         },
//       }
//     );

//     const responseText = response.data.choices[0].message.content;
//     const usageToken_Problem = response.data.usage;

//     // Log usage and response for monitoring
//     console.log(responseText, "\n", usageToken_Problem);

//     // Respond to the client
//     res.status(200).json({ responseText });
//   } catch (error) {
//     console.error("Error fetching data from OpenAI:", error); // Log the error for debugging
//     res.status(500).json({ error: "Error fetching data from OpenAI" });
//   }
// }
