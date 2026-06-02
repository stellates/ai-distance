# AGENTS.md

## シリーズトーン

シリーズ名は「AIとのちょうどいい距離感」。

以下のトーンを厳守する。

- 軽い
- ぼやき調
- 自虐気味
- 説教しない
- でも学びがある
- 「へ〜！」となる
- ITに詳しくない一般ユーザーにもわかる
- 生成AIを過信させない
- 生成AIを怖がらせすぎない
- 日本人向け

避けること

- 極端な煽り
- 専門用語の詰め込み
- IT業界しか伝わらないテーマ選定
- 過剰な略語の使用
- AI万能論
- AI危険論に寄りすぎる表現
- 長すぎる説明
- 説教臭い締め方
- 日本語以外の使用

## 絶対禁止事項

- この工程作業は、AGENTS.mdおよびそこから指定される各種参照ファイルに記載のあるファイルの呼び飛ばしは絶対に行わない
- ファイルの呼び飛ばしは、確実に工程作業の事故になることを強く強く強く認識すること
- 明示されているファイルが読み込めていない場合、ユーザーに請求する以外の発言は絶対にしないこと

## 共通ルール

- 1記事1テーマにする
- 迷った時や現在地が分からない時は、まず `/navi` を使う
- `AGENTS.md` を読み込んだ時は、必ず読み込みファイル名と何回目の読み込みかをユーザーに通知する
- `AGENTS.md` やdocs/配下のmdファイルを読み込めない時は、ユーザーに所在を確認する
- GitHubを参照する必要がある場合、GitHub連携コネクタを利用すること
- GitHub連携コネクタが利用できない場合、ユーザーにその旨を伝えて適切な対処方法を伝えること

### 作業ブランチ

- 通常のChatGPT支援でも、`main` を直接編集せず作業ブランチを使う
- 新記事作成は `agent/article-NNN` を基本とする
- AGENTS/docs整備は `agent/maintain-short-topic` のように目的が分かる名前にする
- 最終的に `main` へ反映するかは、人間がローカル確認後に判断する

### 作業分担

#### ChatGPT

- GitHub上のテキストと状態ファイルを確認・更新する
- `docs/agent/designs/NNN_design.md` に設計メモと進行状態を残す
- HTML、indexカード、inventoryの差分を作る
- `/navi` で次工程を案内し、`/verify` で整合性確認を補助する

#### ユーザー / ローカル

- 作業ブランチへの切り替えとpullを行う
- 実用サイズの画像ファイルを `assets/images/` に配置する
- ローカル表示を確認する
- 最終的にmergeするか判断する

#### Codex / ローカル `/auto`

- ローカル作業ツリーを直接扱う
- HTML、index、inventory、designの更新に加えて、画像ファイルの配置も行える
- verifyと修正を繰り返し、commitまたはcheckpointまで進められる

### 新記事作成・既存記事修正作業時のルール

#### シリーズ保持ポリシー

- 既存記事の雰囲気、HTML構造、CSS class、画像配置を維持する

#### ディレクトリ・ファイル規則
- 画像は `assets/images/` に置く
- 記事HTMLは `posts/NNN.html` に置く
- 記事番号は3桁ゼロ埋めにする

#### 禁止事項
- `styles.css` は原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` は原則変更しない
- 本ファイルで指定されたファイルを確認せず、推測で進行すること
- 指定ファイルの内容が曖昧で作業方針が定まらない場合に、確認せず作業を進めること

### コマンドルーター

記事追加・更新作業で以下のコマンドを受け取った場合は、対応するファイルを必ず読み込んでから作業する。
対応ファイルを読み込めない場合は作業を停止し、ユーザーに所在を確認する。

| コマンド | 必須参照ファイル |
|---|---|
| `/navi` | `docs/agent/commands/navi.md` |
| `/theme` | `docs/agent/commands/theme.md` |
| `/html` | `docs/agent/commands/html.md` |
| `/index-card` | `docs/agent/commands/index-card.md` |
| `/inventory` | `docs/agent/commands/inventory.md` |
| `/image-design` | `docs/agent/commands/image-design.md` |
| `/image-prompt` | `docs/agent/commands/image-prompt.md` |
| `/image` | `docs/agent/commands/image.md` |
| `/verify` | `docs/agent/commands/verify.md` |
| `/auto` | `docs/agent/commands/auto.md` |

## 作業モード

まず、ユーザーの依頼内容から作業種別を判定する。

- 記事追加・更新作業を人間向けに支援する場合は `docs/agent/chatgpt_assistant_spec.md` を参照する
- 記事追加・更新作業を自動実行する場合は `docs/agent/coding_agent_spec.md` を参照する
- 記事追加・更新以外の依頼は、必要に応じて関連ファイルを参照する

作業種別を判定できない場合は作業を開始せず、以下から選択を求める。

1. 記事追加支援
2. 記事自動追加
3. その他の支援依頼（AGENTS.md関係の整備、README.mdの修正、機能追加やバグ対応などの改修作業、改善点の壁打ちなど）

依頼内容が不明確な場合は、認識が一致するまで確認を行う。
