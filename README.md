<div align="center">
  <a href="https://codingdrill.vercel.app/" target="_blank" rel="noopener noreferrer">
    <Img src="public/images/appIcon.svg" width=100 height=100 />
  </a>
  <h1>💻 Coding Drill</h1>
</div>

## 📖このプロジェクトについて(About this project)

Coding Drillは、コーディングに関する問題を自動で作成・採点する個人開発プロジェクトとして作成しています。  
目標は、ユーザーが気軽に使用出来てコーディングの知識が深める為に、少しでも役立てる場を提供する事です。  
(Coding Drill is a personal development project that automatically creates and grades coding questions.  
The goal is to provide a place where users can easily use it and can help deepen their coding knowledge.)

## 📌目次

- 📜[アプリの使い方](#アプリの使い方)
- 🔧[機能](#機能)
- 💡[今後の展望](#今後の展望)
- 🛠[使用技術](#technologies-used)
- 🌍[デプロイ](#deployment)

📢[English ver ↓](#english-ver)

---

## 🕹アプリの使い方

Coding Drillがどのように動くか、まずはデモGIFを見て下さい。

![デモ](public/gif/demo.gif)

### **主な機能**

1. **問題を生成** → **Difficulty, Data Type, Topic, and Translate**を全て選択し、**Generate**を押します。
2. **解答を入力** → **Code**エリアでコードを入力し、**Options**にカーソルを合わせ**submit**を押します。
3. **提出 ＆ AIによるフィードバック** → **Review**エリアに総評文が表示されます。

### 💾セーブデータのロード、削除について

1. 画面左側の**Save Data**にカーソルを移動し、セーブデータを選択します。
2. **Options**にカーソルを移動し、**Load**または**Delete**を選択します。
3. アラートメッセージが表示されるので、**OK**または**Cancel**を選択します。

- **Load**を選択すると、保存されている問題文・入力コード・総評文が表示されます。
- **Delete**を選択すると、保存されているデータが削除されます。

<div align="center">
  <Img src="public/gif/demoOptions.gif" width=275 />
</div>

### 🗑セーブデータの全削除について

1. **Options**にカーソルを移動します。
2. **All Delete**を押します。（セーブデータを選択する必要はありません）
3. アラートメッセージが**2回表示**されるので、全て**OK**を選択するとセーブデータが全削除されます。

### 📏仕切り線について

1. 仕切り線を**ドラッグ&ドロップ**することで、画面比率を調整できます。
2. 画面右上の**Restore**ボタンを押すと、画面比率が初期設定時に戻ります。

<div align="center">
  <Img src="public/gif/splitLine.gif" width=500 />
</div>

---

## 🔧機能

- **ChatGPT-APIを使用して問題の作成・採点を自動化しています。**
- **問題文、入力コード、総評文はローカルストレージに保存されます。**  
  **保存されるタイミングは、総評文が出力された直後です。**
- **「Copy」ボタンを押すと、エリア内のテキストをコピーできます。**  
  **テキストが空の場合はコピーされません。**
- **🌙 または ☀️ アイコンを押すと、カラーテーマが切り替わります。**
- **Codeエリアの「Options」では、フォントサイズ、カラーテーマ、プログラミング言語設定を変更できます。**  
  **「Input:」は、Codeエリアの入力文字数を計測します。**  
  **5000字以内でのみ送信可能で、超過した場合は削除が必要です。**

> [!NOTE]
>
> - 出力内容の品質や精度には細心の注意を払っていますが、誤った内容を出力する可能性があります。
> - 告知なしに機能やレイアウトが変更される可能性があります。
> - 告知無しにアプリケーションの公開を一時的、または永久的に停止する可能性があります。
> - テキストベースの図解を表示する際、表記ズレが生じる場合があります。予めご了承願います。

---

## 💡今後の展望

- **プロンプトの改善 & Fine Tuning**
- **UI/UXの改善**

  - [ ] 縦型レイアウトの導入、最適化。

- [ ] **ユーザー登録機能の実装**

  - ユーザーごとの使用履歴の記録・管理を可能にする。

- [ ] **タイマー機能の導入**

  - 制限時間を設定し、解答までの時間を測定。登録ユーザーの場合、履歴を記録。

- [ ] **パフォーマンス測定 & ランキング機能**

  - 実行時間・メモリ消費量を測定する。

---

# English ver

## 📌Contents

- 📜[How To Use](#how-to-use)
- 🔧[Features](#features)
- 💡[Future Plans](#future-plans)
- 🛠[Technologies Used](#technologies-used)
- 🌍[Deploy](#deployment)

---

## 🕹How To Use

Watch the demo to see how Coding Drill works.

![demo](public/gif/demo.gif)

### **Main Features**

1. **Generate a Question** → Select **Difficulty, Data Type, Topic, and Translate**, then press Generate.
2. **Enter Your Answer** → Input your code in the **Code** area, move the cursor to **Options**, and press Submit.
3. **Submit & Get AI Feedback** → The general review will be displayed in the **Review** area.

### 💾About Load, Delete on Save Data

1. Move the cursor to **Save Data** on the left side of the screen and select save data.
2. Move the cursor to **Options**, select the Load or **Delete** button.
3. Select **OK** or **Cancel** when an alert message appears.

- If you select **Load**, the stored question text, input codes, and review text will be displayed.
- Select **Delete** to delete the stored data.

<div align="center">
  <img src="public/gif/demoOptions.gif" width=275 />
</div>

### 🗑About All Delete on Save Data

1. Move the cursor to **Options**.
2. Push the **All Delete**(There is no need to select any saved data).
3. An alert message will **appear twice**, so select **OK** both times to delete all saved data.

### 📏About dividing line

1. The screen ratio can be adjusted by **dragging and dropping** the dividing lines.
2. Pressing the **Restore** button in the upper right corner of the screen returns the screen ratio to the default setting.

<div align="center">
  <Img src="public/gif/splitLine.gif" width=500 />
</div>

---

## 🔧Features

- **Automated creation and grading of coding questions using the ChatGPT API.**
- **Data for question text, input codes, and general review text are stored in local storage.**
- **Data is saved to local storage immediately after the general review text is generated.**
- **Pressing the Copy button copies the text.**
  - **If the text is empty, it will not be copied.**
- **Pressing the 🌙 or ☀️ icon changes the color theme.**
- **In the Code Area Options, you can set the editor's font size, color theme, and programming language settings.**
  - **The Input: in the code area counts the number of characters entered.**  
    **Only 5000 characters or less can be submitted. If it exceeds 5000, please reduce it.**

> [!NOTE]
>
> - While I strive for accuracy, there is a possibility that incorrect content may be output.
> - Features and layouts may change without notice.
> - Deployment may be temporarily or permanently stopped without notice.
> - Please note that when displaying text-based illustrations, there may be some misalignment.

---

## 💡Future Plans

- **Improve Prompt & Fine Tuning**
- **Improve UI/UX**

  - [ ] Implement and optimize a vertical layout.

- [ ] **Implement User Registration**

  - Enable tracking and managing user activity history.

- [ ] **Introduce Timer Functionality**

  - Set time limits and measure response speed. For registered users, record the time taken to answer.

- [ ] **Performance Measurement & Ranking System**

  - Measure execution time and memory consumption and display rankings.

---

## 🛠**Technologies Used**

This project is built using the following technologies:

### **Framework & Libraries**

- [**NextJS**](https://nextjs.org/)[(Repository)](https://github.com/vercel/next.js) - Full-stack React framework
- [**React**](https://react.dev/)[(Repository)](https://github.com/facebook/react) - UI library for building components

### **API & Data Handling**

- [**OpenAI API**](https://openai.com/)[(Repository)](https://github.com/OPENAI) - ChatGPT API integration

### **Editor & UI**

- [**Monaco Editor**](https://microsoft.github.io/monaco-editor)[(npmjs)](https://www.npmjs.com/package/monaco-editor) - VSCode-based code editor
- [**React Select**](https://react-select.com/home)[(Repository)](https://github.com/JedWatson/react-select) - Custom dropdown component
- [**React Split**](https://split.js.org/)[(Repository)](https://github.com/nathancahill/split/tree/master/packages/react-split) - Resizable split panes

### **Styling**

- [**Tailwind CSS**](https://tailwindcss.com/)[(npmjs)](https://www.npmjs.com/package/tailwindcss) - Utility-first CSS framework
- [**Next themes**](https://www.npmjs.com/package/next-themes)[(Repository)](https://github.com/pacocoursey/next-themes#readme) - Theme and dark mode management

### **Environment Variables**

- Next.js automatically loads environment variables from `.env.local`

### **Type & Development Tools**

- **TypeScript** - Static typing
- **ESLint & Prettier** - Code formatting & linting
- **Stylelint & Autoprefixer** - CSS linting and auto-prefixing

### **Build Tools**

- **PostCSS** - Tailwind processing and CSS optimizations

### **🤔 Why These Technologies?**

- **NextJS**: Supports SSR & SSG for fast rendering.
- **Tailwind CSS**: Rapid styling with utility-first approach.
- **Monaco Editor**: Provides VSCode-like editing experience.
- **OpenAI API**: Enables AI-generated coding challenges and feedback.
- **Vercel**: Handles seamless deployment with serverless functions.

---

## 🌍Deployment

This project is deployed on **Vercel** with automatic CI/CD using **GitHub Actions**.

### **🔧 How to Deploy**

1. **Push to `main` branch** → Triggers Vercel deployment.
2. **API keys are managed via Vercel Environment Variables**.
3. **Check live status** → [Deployed Version](https://codingdrill.vercel.app/)

---

## 📌Getting Started

To get started with this project, follow these steps:

1. **git clone https://github.com/kentamitsui/codingdrill.git** in terminal.
2. **cd codingdrill** in terminal.
3. **npm i(install dependencies)** in terminal.
4. Input **npm run dev** in terminal.
5. Set up **.env.local**.
> [!NOTE]
>
> - After checking the project's contents, please consider and create the environment variables yourself.
6. Input **npm run dev** in terminal.
7. Open **https://localhost:3000** in your blowser.
