import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
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
};

export default Footer;
