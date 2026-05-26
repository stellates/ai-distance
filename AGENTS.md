# AGENTS.md

このリポジトリは「AIとのちょうどいい距離感」の記事を管理するためのものです。

作業者が ChatGPT、Codex、その他 coding agent のいずれであっても、
まずこのファイルを読み、作業モードを判断してください。

---

## 作業モード

このリポジトリには、主に2つの運用モードがあります。

### 1. ChatGPT / 人間補助モード

以下の場合は、このモードを使います。

- 平常時
- Codex 利用枠が枯渇している時
- 人間が VSCode / Git / GitHub Pages を使って作業する時
- ChatGPT は文章作成、構成案、HTML差分作成、確認補助を担当する時

このモードでは、必ず以下を参照してください。

```text
docs/manual/HUMAN_UPDATE_GUIDE.md
docs/agent/CHATGPT_ASSISTANT_GUIDE.md
```

`docs/manual/HUMAN_UPDATE_GUIDE.md` は、人間が読む更新手順書です。
`docs/agent/CHATGPT_ASSISTANT_GUIDE.md` は、ChatGPT が人間の作業を補助するための支援ルールです。

ChatGPT は、`docs/manual/HUMAN_UPDATE_GUIDE.md` の手順と `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` の支援ルールに従い、
人間が作業ブランチをローカル確認しやすい形で支援してください。

特に以下を優先してください。

- 作業ブランチを作成し、変更は作業ブランチに push する
- `main` には直接 push しない
- 人間がローカル確認するための手順を短く明確に示す
- `README.md`、`LICENSE`、`LICENSE-JA.md` を変更対象にしない
- 画像を人間が追加・確認する必要がある場合は、ファイル名と配置先を明示する
- 最終確認と `main` への merge は人間が行う前提にする

---

### 2. Codex / 自動作業モード

以下の場合は、このモードを使います。

- 業務多忙時
- 省力化が必要な時
- Codex または coding agent に実装・生成・更新を任せる時
- テーマだけ渡して、新記事追加を自動化したい時

このモードでは、必ず以下を参照してください。

```text
docs/manual/CODEX_UPDATE_GUIDE.md
docs/agent/CODING_AGENT_SPEC.md
```

Codex / coding agent は、`docs/agent/CODING_AGENT_SPEC.md` の内容に従い、
新記事作成から commit までを可能な範囲で自動実行してください。

---

## 判断ルール

ユーザーが明示した場合は、その指示を最優先してください。

例：

```text
docs/manual/HUMAN_UPDATE_GUIDE.md に従って手伝ってください
```

```text
docs/agent/CODING_AGENT_SPEC.md に従って Codex 向けに作業してください
```

明示がない場合は、以下のように判断してください。

- ChatGPT との通常会話で依頼された場合は、原則として `docs/manual/HUMAN_UPDATE_GUIDE.md` と `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を使う
- `@GitHub` 経由で更新作業を依頼された場合は、原則として `docs/manual/HUMAN_UPDATE_GUIDE.md` と `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を使い、作業ブランチ運用で進める
- Codex、coding agent、自動実装、commit まで依頼された場合は `docs/agent/CODING_AGENT_SPEC.md` を使う
- 判断に迷う場合は、勝手に大きな変更をせず、`docs/manual/HUMAN_UPDATE_GUIDE.md` と `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` ベースで支援する

---

## 共通ルール

どちらのモードでも、以下を守ってください。

- シリーズ名は「AIとのちょうどいい距離感」
- 生成AIを過信させない
- 生成AIを怖がらせすぎない
- 説教臭くしない
- 軽い、ぼやき調、自虐気味、でも教育的なトーンを維持する
- ITに詳しくない一般ユーザーにも伝わる表現にする
- 1記事1テーマにする
- 既存記事の雰囲気、HTML構造、CSS class、画像配置を尊重する
- `styles.css` は原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` は原則変更しない
- 画像は `assets/images/` に置く
- 記事HTMLは `posts/NNN.html` に置く
- 記事番号は3桁ゼロ埋めにする

---

## ChatGPT 向け省力指示

ChatGPT がこのリポジトリの更新を補助する場合は、
毎回すべてを説明しすぎず、作業ブランチ・PR・確認手順がすぐ分かる形で出力してください。

特に以下を優先してください。

- 作業ブランチ名
- PR URL
- 変更ファイル一覧
- 画像ファイル名
- 記事タイトル案
- 確認手順
- 確認チェックリスト
- main merge 後の確認URL

---

## ChatGPT モードの安全ルール

ChatGPT / 人間補助モードでは、以下を守ってください。

- `main` へ直接 push しない
- 人間の確認前に PR を merge しない
- 人間の確認前に GitHub Pages 本番環境へ反映される操作をしない
- 作業ごとに `main` から作業ブランチを作成する
- 作業ブランチへの commit / push は、ユーザーが明示した場合に行う
- merge は人間が行う前提にする

---

## Codex 向け省力指示

Codex または coding agent が作業する場合は、
`docs/agent/CODING_AGENT_SPEC.md` を最優先してください。

特に以下を必ず守ってください。

- 最新3記事を確認する
- `index.html` を確認する
- `assets/` と `posts/` を確認する
- 最大記事番号 + 1 で採番する
- 最新記事を複製して新記事を作る
- 画像を生成し、レビューする
- `index.html` に新記事カードを追加する
- 既存構造、class 名、CSS 設計を変えない
- 作業完了後に git commit する
- git push は行わない

---

## 入口としての位置づけ

この `AGENTS.md` は、作業モードを選ぶための入口です。

詳細手順は以下を参照してください。

- 人間向け ChatGPT 補助更新手順: `docs/manual/HUMAN_UPDATE_GUIDE.md`
- 人間向け Codex 更新手順: `docs/manual/CODEX_UPDATE_GUIDE.md`
- ChatGPT 向け作業ブランチ運用・人間確認補助ルール: `docs/agent/CHATGPT_ASSISTANT_GUIDE.md`
- Codex / coding agent 自動運用仕様: `docs/agent/CODING_AGENT_SPEC.md`
