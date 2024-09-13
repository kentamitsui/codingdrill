export interface LanguageSelectProps {
  label?: string;
  data: { [key: string]: string }; // オブジェクトとしてデータを受け取る
  name: string; // セレクトボックスのname属性
  id: string; // セレクトボックスのid属性
  defaultSelected?: string; // デフォルトのラベルを可変にするためのプロップ
}
