# CHATGPT_ASSISTANT_GUIDE.md

このファイルは、ChatGPT が `ai-distance` の更新作業を補助するための支援ルールです。

人間が読む具体的な作業手順は `docs/manual/HUMAN_UPDATE_GUIDE.md` を参照します。
Codex / coding agent に自動作業を任せる場合は `docs/agent/CODING_AGENT_SPEC.md` を参照します。
人間が読む具体的な作業手順は `docs/manual/HUMAN_UPDATE_GUIDE.md` を参照します。
Codex / coding agent に自動作業を任せる場合は `docs/agent/CODING_AGENT_SPEC.md` を参照します。

---

## 目的

ChatGPT は、人間が `ai-distance` に新しい記事を追加する作業を省力化します。

このガイドでは、ChatGPT が GitHub 連携を使い、作業ブランチに変更を push する運用を基本とします。

ただし、人間が確認する前に GitHub Pages の本番環境へ反映されないよう、`main` への直接 push と、人間の確認前の merge は禁止します。

---

## 人間とChatGPTの作業分担

### ChatGPT が担当すること

ChatGPT は、人間から明示依頼があった場合に、以下を行います。

- `AGENTS.md` を確認する
- `docs/manual/HUMAN_UPDATE_GUIDE.md` を必要に応じて確認する
- この `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を確認する
- `docs/manual/HUMAN_UPDATE_GUIDE.md` を必要に応じて確認する
- この `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を確認する
- 既存記事、`index.html`、画像ファイル名の傾向を確認する
- 記事番号を提案する
- 記事タイトル案を作る
- 画像設計案を作る
- 画像生成プロンプトを作る
- 記事本文案を作る
- HTML変更案を作る
- GitHub 上に作業ブランチを作る
- 作業ブランチへ変更を commit / push する
- 必要に応じて PR を作成する
- 人間向けの確認手順を出す

### 人間が担当すること

人間は、以下を行います。

- 画像の最終確認
- 必要に応じた画像保存・追加
- 作業ブランチをローカルへ pull する
- VSCode / ブラウザでローカル確認する
- 問題があれば ChatGPT に修正を依頼する
- 問題がなければ PR を merge する
- main 反映後に GitHub Pages を確認する

---

## 絶対に守る安全ルール

ChatGPT は、以下を守ります。

- `main` へ直接 push しない
- 人間の確認前に PR を merge しない
- 人間の確認前に GitHub Pages 本番環境へ反映される操作をしない
- ユーザーが明示していない大規模な構造変更をしない
- `styles.css` を原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` を原則変更しない
- 既存記事本文を勝手に改変しない
- 既存HTML構造やCSS classを不要に変更しない

GitHub 連携が利用できても、`main` への merge は人間が行います。

---

## 基本フロー

ChatGPT は、通常以下の流れで作業します。

1. 作業内容を確認する
2. `AGENTS.md` と関連ガイドを確認する
3. 現在の `main` から作業ブランチを作成する
4. 既存記事と `index.html` を確認する
5. 記事番号、タイトル、画像ファイル名を決める
6. 画像設計案と画像生成プロンプトを作る
7. 新記事HTMLと `index.html` の変更を作る
8. 作業ブランチへ commit / push する
9. 必要に応じて PR を作成する
10. 人間向けにローカル確認手順を出す

---

## 作業ブランチルール

ChatGPT は、作業ごとに `main` から新しい作業ブランチを作成します。

ブランチ名は以下の形式を基本とします。

```text
chatgpt/add-post-NNN-short-topic
```

例：

```text
chatgpt/add-post-002-fake-citation
```

ドキュメント整備の場合は以下の形式を使います。

```text
chatgpt/update-docs-short-topic
```

---

## PRルール

作業ブランチに push した後、必要に応じて PR を作成します。

PR の base は `main`、head は作業ブランチとします。

PR本文には以下を含めます。

- 変更内容
- 変更ファイル
- 人間が確認すべき項目
- ローカル確認手順
- main merge 後に GitHub Pages が更新されること

PRは作成してよいですが、merge は人間が行います。

---

## GitHub Pages デプロイ前提

GitHub Pages は、`main` に対象ファイルが入った時だけデプロイされる前提です。

作業ブランチへの push では、本番の GitHub Pages は更新されません。

そのため、ChatGPT は作業ブランチに push し、人間がローカル確認後に PR を merge する運用を基本とします。

---

## GitHub連携が使える場合

ユーザーが `@GitHub` でリポジトリを指定した場合、ChatGPT は可能な範囲で以下を確認します。

- `AGENTS.md`
- `docs/manual/HUMAN_UPDATE_GUIDE.md`
- `docs/agent/CHATGPT_ASSISTANT_GUIDE.md`
- `index.html`
- 最新3件程度の `posts/*.html`
- `assets/images/` の命名傾向
- `.github/workflows/deploy-pages.yml`

確認後、以下を提案または作成します。

- 次の記事番号
- 画像ファイル名
- 記事タイトル案
- 新記事HTML
- `index.html` 追加カード
- 作業ブランチ
- PR
- 人間が実施する確認項目
- commit メッセージ案

---

## シリーズのトーン

シリーズ名は「AIとのちょうどいい距離感」です。

以下のトーンを守ります。

- 軽い
- ぼやき調
- 自虐気味
- 説教しない
- でも学びがある
- 「へ〜！」となる
- ITに詳しくない一般ユーザーにもわかる
- 生成AIを過信させない
- 生成AIを怖がらせすぎない

避けること：

- 極端な煽り
- 専門用語の詰め込み
- AI万能論
- AI危険論に寄りすぎる表現
- 長すぎる説明
- 説教臭い締め方

---

## 記事作成時の支援工程

### 1. テーマ整理

テーマが広すぎる場合は、1記事1テーマに絞ります。

例：

```text
AIがよく間違える
→ 存在しない論文をそれっぽく引用する
```

### 2. 画像設計

いきなり画像生成に進まず、まず漫画の構成案を出します。

出力する内容：

- タイトル案
- 4コマまたは縦長1枚漫画の構成
- 各コマの内容
- セリフ案
- 最後の学び
- 画像生成時の注意点

### 3. 画像生成プロンプト作成

画像設計が固まったら、画像生成用プロンプトを作ります。

条件：

- 日本語の文字を入れる
- 1枚漫画風
- 縦長SNS向け
- かわいいAIキャラクター
- 軽い自虐
- 読後に「へ〜！」となる教育感
- 文字量は多すぎない
- タイトルは「AIとのちょうどいい距離感」
- サブタイトルは記事番号と記事タイトルに合わせる
- 既存記事と雰囲気を合わせる

### 4. 画像レビュー補助

生成画像について、人間が確認しやすいチェックリストを出します。

- 日本語が読めるか
- 変な英字ノイズがないか
- 吹き出しが切れていないか
- 文字量が多すぎないか
- テーマが伝わるか
- 既存記事と雰囲気がズレていないか
- スマホ幅でも読めそうか

### 5. 記事本文・HTML作成補助

記事本文は短く、画像の下に添えるメモと「今回の距離感」を中心にします。

HTMLを作る場合は、既存記事の構造を踏襲します。

守ること：

- class名を変えない
- 余計なdivを増やさない
- 相対パスを維持する
- `posts/NNN.html` では画像パスを `../assets/images/...` にする
- OGP画像がある場合は新記事画像に合わせる
- 前後記事リンクがある場合は整合させる

### 6. index.html 更新補助

`index.html` では、新記事カードを一覧の先頭に追加します。

守ること：

- 既存記事カードの構造を変えない
- 既存記事カードの順序を崩さない
- 新記事カードだけを追加する
- `post-number` と記事番号を一致させる

### 7. 最終確認補助

作業完了後、ChatGPT は人間に以下を提示します。

- 作業ブランチ名
- PR URL
- 変更ファイル一覧
- ローカル確認手順
- 確認チェックリスト
- commit メッセージ
- main merge 後の確認URL

---

## 人間向けローカル確認手順

作業ブランチが作成された後、人間は以下を実行します。

```bash
git fetch origin
git switch 作業ブランチ名
git pull
python3 -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000/
```

確認項目：

- トップページに新記事カードがある
- 記事ページが開く
- 画像が表示される
- スマホ幅で読める
- 誤字がない
- シリーズの雰囲気が合っている

問題なければ、人間が PR を merge します。

---

## 省力モードの応答形式

ユーザーが「省力で」「いつもの手順で」「HUMAN_UPDATE_GUIDE.md ベースで」と言った場合は、短く作業状態を提示します。

```text
作業ブランチ：chatgpt/add-post-NNN-short-topic
PR：URL

変更ファイル：
- posts/NNN.html
- index.html
- assets/images/NNN-topic.png

確認手順：
1. git fetch origin
2. git switch 作業ブランチ名
3. python3 -m http.server 8000
4. http://localhost:8000/ を確認

確認ポイント：
- index.html から開けるか
- 画像が表示されるか
- スマホ幅で読めるか

main merge後の確認URL：
- https://stellates.github.io/ai-distance/
- https://stellates.github.io/ai-distance/posts/NNN.html
```

---

## 完了条件

ChatGPT の作業は、以下を提示した時点で完了とします。

- 作業ブランチ名
- PR URL、または PR を作らなかった理由
- 変更ファイル一覧
- 人間向けローカル確認手順
- main merge 後の確認URL

GitHub Pages の本番反映確認は、main merge 後に人間が行います。
