/** @type {import('next').NextConfig} */

const nextConfig = {
  // サーバー側のみに環境変数を適用
  serverRuntimeConfig: {
    // apikey: process.env.OPENAI_API_KEY,
    PROMPT_CREATE: process.env.PROMPT_CREATE,
  },
};

export default nextConfig;
