# CHATGPT_ASSISTANT_GUIDE.md

このファイルは、ChatGPT が `ai-distance` の更新作業を補助するための支援ルールです。

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
