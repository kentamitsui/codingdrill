const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg:opacity-0 text-center text-xs">
      <p>
        © {currentYear} CodingDrill. All rights reserved. Powered by{" "}
        <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">
          OpenAI ChatGPT API
        </a>
      </p>
    </footer>
  );
}
