import { clipboardCopyProps } from "@/app/type/type";

/**
 * クリップボードにコピーするハンドラー
 * - 現在のエディタの入力内容をコピーする
 * - EditorSection で入力した内容は currentEditorInputed に集約されている
 */
const clipboardCopy = ({ context }: clipboardCopyProps) => {
  if (context === null) {
    return;
  } else if (context?.length === 0) {
    return;
  }

  navigator.clipboard
    .writeText(context)
    .then(() => {
      alert("Copied to clipboard.");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text.");
    });
};

export default clipboardCopy;
