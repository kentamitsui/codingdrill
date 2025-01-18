<div align="center">
  <a href="https://codingdrill.vercel.app/" target="_blank" rel="noopener noreferrer">
    <Img src="public/images/appIcon.svg" width=100 height=100 />
  </a>
  <h1>Coding Drill</h1>
  <Img src="public/gif/demo.gif" />
</div>

<div align="center">
  <p>Coding Drillは、コーディングに関する問題を自動で作成・採点するWebアプリです。</p>
  <p>(Coding Drill is a web app that automatically creates and grades coding questions.)</p>
</div>

[English ver ⬇️](#contents)

## 目次

- [アプリの使い方](#アプリの使い方)
- [機能](#機能)
- [ロードマップ](#ロードマップ)
- [クレジット](#credits)

## アプリの使い方

- ### 問題文の作成から総評文の出力まで

```
1. Difficulty, Data Type, Topic, Translateを選択し、 Generateボタンを押します。
2. Descriptionエリアに問題文が表示されるまでしばらく待ちます。
3. 画面右側のCodeエリアに、回答となるコードを入力してください。
4. CodeエリアのOptionsにカーソルを合わせ、submitボタンを押します。
5. Reviewエリアに総評文が表示されます。
```

---

- ### セーブデータのロード、削除について

```
1. 画面左側のSave Dataにカーソルを移動し、セーブデータを選択します。
2. Optionsにカーソルを移動します。
3. LoadまたはDeleteボタンを選択します。
4. アラートメッセージが表示されるので、OKまたはCancelを選択します。

=> Loadを選択すると、保存されている問題文・入力コード・総評文が表示されます。
=> Deleteを選択すると、保存されているデータが削除されます。
```

<div align="center">
  <Img src="public/gif/demoOptions.gif" width=275 />
</div>

- ### セーブデータの全削除について

```
1. Optionsにカーソルを移動します。
2. All Deleteボタンを押します。（セーブデータを選択する必要はありません）
3. アラートメッセージが2回表示されます。
4. 全てOKを選択すると、セーブデータが全削除されます。
```

---

- ### 仕切り線について

```
• 仕切り線をドラッグ&ドロップすることで、画面比率を調整できます。
• 画面右上のRestoreボタンを押すと、画面比率が初期設定時に戻ります。
```

<div align="center">
  <Img src="public/gif/splitLine.gif" width=500 />
</div>

## 機能

```
• ChatGPT-APIを使用して問題の作成・採点を自動化しています。
• 問題文、入力コード、総評文はローカルストレージに保存されます。
  保存されるタイミングは、総評文が出力された直後です。
• コピーボタンを押すと、エリア内のテキストをコピーできます。
  テキストが空の場合はコピーされません。
• 🌙 または ☀️ アイコンを押すと、カラーテーマが切り替わります。
• CodeエリアのOptionsでは、フォントサイズ、カラーテーマ、プログラミング言語設定を変更できます。
  Input:は、Codeエリアの入力文字数を計測します。
  5000字以内でのみ送信可能で、超過した場合は削除が必要です。
```

> [!NOTE]
>
> - 出力内容の品質や精度には細心の注意を払っていますが、誤った内容を出力する可能性があります。
> - 告知なしに機能やレイアウトが変更される可能性があります。
> - 告知無しにアプリケーションの公開を一時的、または永久的に停止する可能性があります。
> - テキストベースの図解を表示する際、表記ズレが生じる場合があります。予めご了承願います。

## ロードマップ

- [ ] プロンプトの改善やFine Tuning等を行なって、高品質・時間短縮を図る。
- [ ] UI/UXの改善。
- 機能追加
  - [ ] 問題や回答に対するコメントを投稿出来るルームの作成。
  - [ ] 問題文や独自のテストケースに対して、コードを実行し正解出来るか確認する。
  - [ ] ユーザー登録の追加による、使用状況の記録・確認などを行う。
  - [ ] タイマーを追加して、制限時間の設定や回答までの時間測定。(ユーザー登録済の場合、回答までの時間を記録)
  - [ ] 実行時間やメモリ消費量の測定、出力、ランク付け。

---

# English ver

## Contents

- [How To Use](#how-to-use)
- [Features](#features)
- [Roadmap](#roadmap)
- [Credits](#credits)

## How To Use

- ### Question create => General Review output flow

```
1. Select Difficulty, Data Type, Topic, and Translate, and press the Generate button.
2. Wait for a while until the question text appears in the Description area.
3. Input the code for your answer in the Code area on the right side of the screen.
4. Move the cursor to Options in the Code area and press the submit button.
5. General review will be displayed in the Review area.
```

---

- ### About Load, Delete on Save Data

<div align="center">
  <img src="public/gif/demoOptions.gif" width=250 />
</div>

```
1. Move the cursor to Save Data on the left side of the screen and select Save Data.
2. Move the cursor to Options.
3. Select the Load or Delete button.
4. Select OK or Cancel when an alert message appears.

• If you select Load, the stored question text, input codes, and review text will be displayed.
• Select Delete to delete the stored data.
```

- ### About All Delete on Save Data

```
1. Move the cursor to Options.
2. Push the All Delete button (It's not necessary to select any save data).
3. An alert message will appear twice.
4. If you select OK all, all saved data deleted.
```

---

- ### About dividing line

```
• The screen ratio can be adjusted by dragging and dropping the dividing lines.
• Pressing the Restore button in the upper right corner of the screen returns the screen ratio to the default setting.
```

<div align="center">
  <Img src="public/gif/splitLine.gif" width=400 />
</div>

## Features

```
• Automated creation and grading of coding questions using the ChatGPT API.
• Data for question text, input codes, and general review text are stored in local storage.
• The execution time for saving data is immediately after the output of the general review text.
• Pressing the Copy button copies the text.
  If the text is empty, it will not be copied.
• Pressing the 🌙 or ☀️ icon changes the color theme.
• In the Code Area Options, you can set the editor's font size, color theme, and programming language settings.
  The Input: in the code area counts the number of characters entered.
  Only 5000 characters or less can be submitted. If it exceeds 5000, please reduce it.
```

> [!NOTE]
>
> - While I strive for accuracy, there is a possibility that incorrect content may be output.
> - Features and layouts may change without notice.
> - Deployment may be temporarily or permanently stopped without notice.
> - Please note that when displaying text-based illustrations, there may be some misalignment.

## Roadmap

- [ ] Improve prompt quality and utilize Fine-Tuning to enhance output quality and reduce processing time.
- [ ] Improve UI/UX.
- Add new features:
  - [ ] Create rooms where users can post comments on questions and answers.
  - [ ] Allow users to execute code against questions and custom test cases to verify correctness.
  - [ ] Introduce user registration to track and review usage history.
  - [ ] Add a timer function to set time limits and measure response time. (For registered users, record the time taken to answer.)
  - [ ] Measure execution time, memory consumption, and display rankings.

## Credits

This app utilizes the following:

- [OpenAI ChatGPT API](https://openai.com/): Provides AI functionalities for creating and grading coding problems.
- [React Select](https://react-select.com/home)[(Repository)](https://github.com/JedWatson/react-select): For custom dropdown menus in the app.
- [React Split](https://split.js.org/)[(Repository)](https://github.com/nathancahill/split/tree/master/packages/react-split): For custom split line in the app.
- [Monaco Editor](https://microsoft.github.io/monaco-editor)[(npmjs)](https://www.npmjs.com/package/monaco-editor): A powerful code editor used in the app.
- [TailwindCSS](https://tailwindcss.com/)[(npmjs)](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework for styling.
- [next-themes](https://www.npmjs.com/package/next-themes)[(Repository)](https://github.com/pacocoursey/next-themes#readme): Enables dark mode and theme management.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
