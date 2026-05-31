# AGENTS.md

## 共通ルール

### 作品概要・ポリシー

- シリーズ名は「AIとのちょうどいい距離感」
- 生成AIを過信させない
- 生成AIを怖がらせすぎない
- 説教臭くしない
- 軽い、ぼやき調、自虐気味、でも教育的なトーンを維持する
- ITに詳しくない一般ユーザーにも伝わる表現にする
- 1記事1テーマにする

### 新記事作成・既存記事修正作業時のルール

#### シリーズ保持ポリシー

- 既存記事の雰囲気、HTML構造、CSS class、画像配置を尊重する

#### ディレクトリ・ファイル規則
- 画像は `assets/images/` に置く
- 記事HTMLは `posts/NNN.html` に置く
- 記事番号は3桁ゼロ埋めにする

#### 必要ファイルが確認できない場合

- 作業で参照すべきファイルが見つからない場合、推測で作業を進めず、GitHubリポジトリ内のファイルパスもしくは対象ファイルの添付をユーザーに依頼すること

#### 禁止事項
- `styles.css` は原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` は原則変更しない

## 作業モード

まず、以下のモード判断ルールに従って作業モードを判断してください。

### モード判断ルール

ユーザーが明示した場合は、その指示を最優先してください。

明示がない場合は、以下のように判断してください。

###### 記述見直し：判定基準と振り分けモード指定だけ記述にする---ここから
- ChatGPT との通常会話で依頼された場合は、原則として `docs/agent/chatgpt_assistant_spec.md`、`docs/agent/workflow.md` を使う
- `@GitHub` 経由で更新作業を依頼された場合も、原則として `docs/agent/chatgpt_assistant_spec.md`、`docs/agent/workflow.md` を使い、差分出力・人間作業補助として進める
- Codex、coding agent、自動実装、commit まで依頼された場合は `docs/agent/coding_agent_spec.md` を使う
- 判断に迷う場合は、勝手に大きな変更をせず、`docs/agent/chatgpt_assistant_spec.md` ベースで支援する
###### 記述見直し：判定基準と振り分けモード指定だけ記述にする---ここまで

### 1. ChatGPT / 人間補助モード

#### 作業ルール

このモードでは、必ず以下を参照してください。

```text
docs/agent/chatgpt_assistant_spec.md
docs/agent/workflow.md
```

#### 役割

ChatGPT は、`docs/agent/chatgpt_assistant_spec.md` の支援ルールに従い、
必要に応じて `docs/agent/workflow.md` の進行状況を表示しながら、
人間がローカル clone 上で作業しやすい形で支援してください。

特に以下を優先してください。

- ChatGPT は repository を参照し、必要な内容・差分・手順を出力する
- ファイル作成、画像配置、commit、push は人間がローカル clone 上で行う
- `main` への push は、ローカル確認後に人間が行う
- 人間が迷わないよう、「どのファイルに」「何を」「どこへ」反映するかを具体的に示す
- `index.html` は全文生成せず、追加する記事カードブロックのみを出力する
- 既存記事カードを削除・短縮・並べ替えしない
- 画像を人間が追加・確認する必要がある場合は、ファイル名と配置先を明示する
- 人間がローカル確認するための手順を短く明確に示す
- `README.md`、`LICENSE`、`LICENSE-JA.md` を変更対象にしない

#### 出力するもの

ChatGPT がこのリポジトリの更新を補助する場合は、
毎回すべてを説明しすぎず、人間が次に行う作業がすぐ分かる形で出力してください。

特に以下を優先してください。

- 記事番号
- 記事タイトル案
- 画像ファイル名
- 画像保存先
- 画像生成プロンプト
- 作成する `posts/NNN.html` の内容
- `index.html` に追加する記事カードブロック
- `docs/agent/post_inventory.md` に追記する内容
- 貼り付け位置
- ローカル確認手順
- 確認チェックリスト
- git 操作案内
- main push 後の確認URL

#### 安全ルール

ChatGPT / 人間補助モードでは、以下を守ってください。

- 通常の ChatGPT / 人間補助モードでは repository を直接編集しない
- ただし、人間が明示的に GitHub へのファイル作成・更新を依頼した場合は、その依頼範囲に限って対応できる
- ChatGPTでは、ユーザーにrepository編集時は確認が促されるため、Githubのmerge作業に自信がないならキャンセルするように促す
- 作業ブランチを作成しない
- commit しない
- push しない
- PR を作成しない
- merge しない
- 人間の確認前に GitHub Pages 本番環境へ反映される操作をしない
- `index.html` 全文を生成しない
- `index.html` の既存記事カードを削除・短縮・並べ替えしない
- 新記事追加時は、`docs/agent/post_inventory.md` の追記内容も提示する
- 必要ファイルを確認できない場合は推測せず、人間にファイル名・パス・実物を求める

### 2. Codex / 自動作業モード

#### 作業ルール

このモードでは、必ず以下を参照してください。

```text
docs/agent/coding_agent_spec.md
```

#### 役割

Codex / coding agent は、`docs/agent/coding_agent_spec.md` の内容に従い、
新記事作成から commit までを可能な範囲で自動実行してください。

#### 実行すること

Codex または coding agent が作業する場合は、
`docs/agent/coding_agent_spec.md` を最優先してください。

#### 安全ルール

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