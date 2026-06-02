# /index-card

`index.html` に追加する新記事カード差分を生成する。

## 入力

```text
/index-card NNN
```

## 読むもの

- 対象記事の `docs/agent/designs/NNN_design.md`
- `index.html` の最新記事カード
- `docs/skills/index_html.md`
- `docs/agent/templates/index_card.md`

## 原則

- `index.html` 全文を扱わない
- 既存記事カードを削除、短縮、並べ替えしない
- 最新記事カードの構造を踏襲する
- 新記事カードだけを直近記事カードの上に追加する

## 出力

- 新記事カードブロックだけを出す
- 手動ChatGPTモードでは、そのまま貼れる大きなコードブロックで出す
- `Index Card` を更新する、または更新案を出す

## 状態更新

- `Control Block` の `steps.index-card` を `completed` にする
- `Control Block` の `current_state` を `inventory` にする
- `Control Block` の `next_recommended_command` を `/inventory NNN` にする
- GitHub連携ChatGPTモードでは、`index.html` と対象記事のdesignを作業ブランチ上で更新する
