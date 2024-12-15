import { useState } from "react";

export default function EditorOptionsMenu({
  fontSize,
  setFontSize,
  editorTheme,
  setEditorTheme,
  editorLanguage,
  setEditorLanguage,
  copyToClipboard,
  handleCreateReview,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionChange = (optionType: string, value: string) => {
    if (optionType === "fontSize") setFontSize(value);
    if (optionType === "theme") setEditorTheme(value);
    if (optionType === "language") setEditorLanguage(value);
  };

  return (
    <div className="relative">
      {/* トリガーボタン */}
      <button
        className="rounded-md bg-gray-300 p-2 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600"
        onClick={toggleMenu}
      >
        Editor Options
      </button>

      {/* ドロップダウンメニュー */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-[200px] border border-gray-300 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {/* Font Size */}
          <div className="p-2">
            <label className="mb-1 block text-sm font-bold">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => handleOptionChange("fontSize", e.target.value)}
              className="w-full rounded border p-1 dark:bg-slate-700"
            >
              {[10, 12, 14, 16, 18, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="p-2">
            <label className="mb-1 block text-sm font-bold">Theme</label>
            <select
              value={editorTheme}
              onChange={(e) => handleOptionChange("theme", e.target.value)}
              className="w-full rounded border p-1 dark:bg-slate-700"
            >
              <option value="vs">vs</option>
              <option value="vs-dark">vs-dark</option>
              <option value="hc-light">hc-light</option>
              <option value="hc-black">hc-black</option>
            </select>
          </div>

          {/* Language */}
          <div className="p-2">
            <label className="mb-1 block text-sm font-bold">Language</label>
            <select
              value={editorLanguage}
              onChange={(e) => handleOptionChange("language", e.target.value)}
              className="w-full rounded border p-1 dark:bg-slate-700"
            >
              {Object.entries(config.menuLists.languages).map(
                ([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 p-2">
            <button
              className="w-full rounded bg-blue-500 p-1 text-white hover:bg-blue-600"
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              className="w-full rounded bg-green-500 p-1 text-white hover:bg-green-600"
              onClick={handleCreateReview}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
