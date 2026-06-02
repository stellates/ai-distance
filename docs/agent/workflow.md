# workflow.md

「AIとのちょうどいい距離感」の記事追加で使う、状態遷移の定義です。
長い手順を毎回並べるのではなく、現在地から次の1工程を選ぶために使います。

## 状態の正本

- 記事ごとの実際の進行状況は、存在する場合 `docs/agent/designs/NNN_design.md` を優先する
- `/navi` は原則として `NNN_design.md` の短い `Control Block` を読む
- 詳細が必要なコマンドだけ、対応する詳細ブロックを読む
- 実ファイルとの食い違いは `/verify` で確認する

## 基本遷移

```text
start
→ theme
→ image-design
→ image-prompt
→ image
→ inventory
→ html
→ index-card
→ verify
→ publish
```

| State | 目的 | 主な成果物 | 次の基本コマンド |
|---|---|---|---|
| `start` | 対象記事と作業ブランチを決める | `NNN_design.md` | `/theme NNN` |
| `theme` | 1記事1テーマで設計を固める | `Theme Design` | `/html NNN` |
| `html` | 記事固有のHTML差分を作る | `HTML Artifacts` | `/index-card NNN` |
| `index-card` | indexカード差分を作る | `Index Card` | `/inventory NNN` |
| `inventory` | 棚卸し行を作る | `Inventory Entry` | `/image-design NNN` |
| `image-design` | 画像の内容と命名を固める | `Image Design` | `/image-prompt NNN` |
| `image-prompt` | 画像生成用プロンプトを固める | `Image Prompt Notes` | `/image NNN` |
| `image` | 採用画像の配置とWebPを確認する | WebP画像ファイル | `/verify NNN` |
| `verify` | design state と repository state を照合する | `Verification Log` | publish判断 または修正 |
| `publish` | 人間が最終反映を判断する | merge、公開確認 | 完了 |

## 状態更新

- 工程が進んだら `Control Block` の `current_state`、`next_recommended_command`、`steps` を更新する
- 差し戻しがあれば該当stateへ戻し、理由を `Notes` または `Verification Log` に残す
- `/verify` は実ファイルに基づき、状態更新または更新案を出す
- 初回や迷った時は `/navi` を使う

## 作業分担

### ChatGPT

- GitHub上のdesignとテキスト成果物を確認・更新する
- theme、HTML、indexカード、inventoryの差分を作る
- `/navi` と `/verify` で現在地と整合性を案内する

### ユーザー / ローカル

- ブランチ切り替え、pull、実用サイズ画像の配置を行う
- ローカル表示を確認し、最終mergeを判断する

### Codex / ローカル `/auto`

- ローカル作業ツリー上でテキストと画像を扱う
- 生成、design更新、verify、修正、commitまたはcheckpointまで進める

## ブランチ

- 新記事は `agent/article-NNN`
- AGENTS/docs整備は `agent/maintain-short-topic`
- `main` を直接編集しない

## 補足

- HTML、CSS class、scriptは既存構造を維持する
- `index.html` は新記事カード差分だけを扱う
- 画像生成前に設計を固め、配置後は `/verify` で確認する
