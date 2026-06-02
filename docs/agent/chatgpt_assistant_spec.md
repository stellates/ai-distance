# chatgpt_assistant_spec.md

## 役割

- ユーザーが `ai-distance` に新しい記事を追加する作業を補助すること
- GitHub連携が使える場合は作業ブランチ上のテキストと状態を更新し、画像配置、ローカル確認、最終merge判断はユーザーが行う想定で補助する

## 基本方針

- 迷った時は `/navi` を入口にする
- `docs/agent/designs/NNN_design.md` がある場合は、先頭の `Control Block` を進行状況の正本として扱う
- `docs/agent/workflow.md` は、長い手順書ではなく状態遷移の定義として扱う
- 実ファイルとdesignの食い違いが気になる時は `/verify NNN` を使う
- 原則として1stateずつ進める。ただし、ユーザーが明示的にまとめて進めるよう依頼した場合は、その範囲で対応する
- 主要な返信では、現在地と次の1工程を短く示す

基本遷移:

```text
start
→ theme
→ image-design
→ image-prompt
→ image
→ html
→ index-card
→ inventory
→ verify
→ publish
```

## 運用モード

### GitHub連携ChatGPTモード

GitHub connectorが使える場合の基本モード。

#### GitHub連携モード開始条件

以下のいずれかを満たす場合、ChatGPTは手動ChatGPTモードではなくGitHub連携ChatGPTモードを優先する。

- ユーザーが GitHub リポジトリを指定した場合
- GitHub connector経由でリポジトリを参照している場合
- 記事作業コマンド（`/theme` `/html` `/index-card` `/inventory` `/image-design` `/image-prompt` `/image` `/verify`）をGitHubリポジトリに対して実行している場合

#### 記事作業コマンド実行前の必須確認

記事作業コマンドを実行する前に、以下を確認する。

1. 対象リポジトリ
2. 作業ブランチ
3. 対象 `NNN_design.md`
4. `Control Block`

これらを確認できない場合は、成果物生成を開始せず、不足情報または不足ファイルを確認する。

#### GitHub連携モードでの禁止事項

- design未確認のままstateを推測する
- GitHub連携モード中に手動モードへ暗黙に切り替える
- `NNN_design.md` 未確認のままHTMLやindexカードを生成する
- state更新を省略して次工程へ進む
- GitHub連携モードであるにもかかわらず、成果物をチャット出力だけで完了扱いにする
- GitHub更新を試行せずに手動モード相当の出力へ移行する
- フォールバック理由を説明せずに手動モードへ切り替える

#### ChatGPT

- GitHubに今回の記事用の作業ブランチを作成する（例：`agent/article-NNN`）
- GitHub上の作業ブランチでテキストと状態ファイルを確認・更新する
- `docs/agent/designs/NNN_design.md` に設計メモと進行状態を残す
- theme、記事HTML、indexカード、inventoryの差分を作る
- `/navi` で次工程を案内し、`/verify` で整合性確認を補助する
- 画像のprompt、design、命名、WebP化、サイズ確認を支援する

#### ユーザー / ローカル

- ローカル作業ブランチへの切り替えとpullを行う
- 実用サイズの画像ファイルを `assets/images/` に配置する
- ローカル表示を確認する
- 最終的にmerge、publishするか判断する

### 手動ChatGPTモード

GitHub連携モードの条件を満たしている場合は、このモードへ自動的に切り替えない。
GitHub更新が不可能、必要ファイルが存在しない、またはユーザーが明示的に手動反映を希望した場合のみ利用する。

GitHub connectorを使わない場合、またはユーザーが手動反映を希望する場合のモード。

- ChatGPTは、貼り付け先と貼り付け位置を明示する
- 記事HTML、indexカード、inventory行は、そのまま使えるコードブロックで出す
- ユーザーがローカルclone上でファイルへ反映する
- ローカル確認と最終merge、publish判断はユーザーが行う

## GitHub連携時に読むもの

ユーザーが `@GitHub` でリポジトリを指定した場合、ChatGPTは必要に応じて以下を確認する。

- `AGENTS.md`
- `docs/agent/chatgpt_assistant_spec.md`
- `docs/agent/workflow.md`
- `docs/agent/post_inventory.md`
- `docs/agent/designs/NNN_design.md`
- `.github/workflows/deploy-pages.yml`

## GitHub操作の方針

- `main` を直接編集しない
- 新記事では `agent/article-NNN` の作業ブランチを使う
- GitHub連携ChatGPTモードでは、作業ブランチ上の状態ファイルとテキスト成果物を更新できる
- 実用サイズ画像の配置、最終merge、本番確認は人間が行う
- ユーザーの依頼なしにmergeしない

新記事開始時:

1. `main` の最新状態から `agent/article-NNN` を作成する。
2. `docs/agent/designs/NNN_design.md` をテンプレートとして読み、記事番号を入れた `docs/agent/designs/030_design.md` のような記事別designを作業ブランチ上に作成する。
3. 各工程の完了時に、作業ブランチ上のdesignを更新する。
4. テキスト成果物を更新したら、ユーザーへローカルで `git pull` するよう案内する。

GitHub connectorでは、`main` のHEADを基準に作業ブランチを作り、テキストファイルの作成・更新ごとに作業ブランチへcommitする。
実用サイズ画像はconnectorへ直接送らず、ユーザーのローカル配置後にrepository stateを確認する。

### GitHub連携モードでの成果物更新順序

GitHub連携ChatGPTモードでは、原則として以下の順序で作業する。

1. design確認または作成
2. state確認
3. 成果物更新
4. design更新
5. ユーザーへ現在地と次工程を通知

設計状態を確認していない場合は、成果物のみを先に出力しない。

また、GitHub連携モードではGitHub上の更新を主成果物とする。
チャット上のHTML、indexカード、inventory行は説明やレビュー用途であり、GitHub更新の代替として扱わない。

GitHub更新に失敗した場合のみ、手動モードへフォールバックできる。
その場合は以下を明示する。

- なぜGitHub更新できなかったか
- どの工程で停止したか
- 手動反映が必要な理由

## コマンドルーター

コマンドを受け取った場合は、対応する仕様ファイルを必ず読んでから作業する。
読み込めない場合は作業を停止し、ユーザーに所在を確認する。

| コマンド | 必須参照ファイル |
|---|---|
| `/navi` | `docs/agent/commands/navi.md` |
| `/theme` | `docs/agent/commands/theme.md` |
| `/image-design` | `docs/agent/commands/image-design.md` |
| `/image-prompt` | `docs/agent/commands/image-prompt.md` |
| `/image` | `docs/agent/commands/image.md` |
| `/html` | `docs/agent/commands/html.md` |
| `/index-card` | `docs/agent/commands/index-card.md` |
| `/inventory` | `docs/agent/commands/inventory.md` |
| `/verify` | `docs/agent/commands/verify.md` |
| `/auto` | `docs/agent/commands/auto.md` |

## stateごとの確認

### `start`

- 対象記事番号と作業ブランチを確認する
- `NNN_design.md` がなければ、テンプレートを基に作成する

### `theme`

- `docs/agent/post_inventory.md` と `docs/skills/theme.md` を確認する
- 1記事1テーマに絞る
- 似ている既存記事、重複しない理由、今回だけの新しさを短く示す
- title、subtitle、4コマの方向性、今回の距離感を `Theme Design` に反映する

### `html`

- `docs/skills/post_html.md` を確認する
- 直前の記事HTMLを構造参照にする
- 既存HTML構造、CSS、class名、scriptを変えない
- 記事固有の値だけを差し替える
- `HTML Artifacts` を更新する

### `index-card`

- `docs/skills/index_html.md` と `docs/agent/templates/index_card.md` を確認する
- `index.html` の最新記事カードを構造参照にする
- `index.html` は追加カードブロックだけを扱う
- `Index Card` を更新する

### `inventory`

- `NNN_design.md` の `Inventory Entry` から追記行を生成する
- 記事番号、タイトル、公開日、テーマ、今回の距離感、タグ、重複回避メモを含める

### `image-design`

- いきなり画像生成しない
- `Theme Design` と `HTML Artifacts` を基に `Image Design` を固める
- 4コマの内容、学び、ファイル名を確認する

### `image-prompt`

- `Image Design` を確認する
- `docs/agent/templates/image_prompt.md` と `docs/skills/image_design.md` を参照する
- 必要に応じて `docs/agent/image_prompt_sample.md` も参照する
- 画像生成前にプロンプトを確定する

### `image`

- 確定済みの `Image Design` と `Image Prompt Notes` を確認する
- 採用画像は `docs/skills/image_review.md` の観点で確認する
- 生成元がPNGの場合はWebP quality 75〜80を目安に変換する
- 新規記事の実用サイズ画像は、WebPとしてユーザーがローカルへ配置する

画像レビューの主な確認項目:

- 日本語が読める
- 変な英字ノイズがない
- 吹き出しが切れていない
- 文字量が多すぎない
- テーマが伝わる
- スマホ幅でも読めそう
- 既存記事と雰囲気が大きくズレていない
- キャラクター、衣装、小物が不自然に変わっていない

### `verify`

- `/verify NNN` でdesign stateとrepository stateを照合する
- 問題があれば修正内容を示し、必要なstateへ戻す
- 問題がなければ、人間によるpublish判断へ進む

### `publish`

- 人間がローカル確認後に最終mergeを判断する
- GitHub ActionsとGitHub Pagesの反映を確認する

## ローカル確認

ローカル確認用の起動手順:

```bash
python3 -m http.server 8000
```

確認URL:

```text
http://localhost:8000/
```

確認項目:

- トップページに新記事が表示されている
- 記事リンクが開ける
- 画像が表示されている
- スマホ幅でも読みやすい
- 誤字がない
- シリーズの雰囲気が合っている
- 説教臭さが強すぎない
- 既存記事カードが消えていない
- 既存記事へのリンクが壊れていない
- `docs/agent/post_inventory.md` に新記事が反映されている

## GitHub Pages確認

- `main` への反映後、GitHub Actionsを確認する
- GitHub Pagesの公開URLで新記事を確認する
- 公開反映は、人間が最終mergeを判断した後に行う

## ファイル操作の禁止事項

- `styles.css` を原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` を原則変更しない
- `posts/*.html` の既存記事本文を勝手に改変しない
- 既存HTML構造、CSS class、scriptを不要に変更しない
- `index.html` 全文を出力しない
- 既存記事カードを削除、短縮、並べ替えしない

## 出力時の注意

- 長文になりそうな場合は、まず現在地と次の1工程だけを示す
- 手動ChatGPTモードでは、作成するファイル名、貼り付け位置、変更してよい範囲を明示する
- `index.html` は、追加または差し替え対象の記事カードブロックだけを出す
- HTMLやカードブロックは、余計な説明を混ぜずコピーしやすくする

## 修正・差し戻し

- 修正が必要な場合は、自然文で依頼を受け付ける
- 状態が分からなくなった時は `/navi NNN` を使う
- designと実ファイルの食い違いが疑われる時は `/verify NNN` を使う

## 読んだフリ防止の指示

GitHub連携モードで記事作業コマンドを受けた場合は、作業ブランチ、design、現在stateの確認結果も合わせて報告する。
未確認のまま成果物生成へ進んではならない。

`docs/agent/chatgpt_assistant_spec.md` を読み込んだ時、ユーザーに通知するために役割ブロックだけ復唱する。
