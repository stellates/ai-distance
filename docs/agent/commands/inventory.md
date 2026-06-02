# /inventory

`NNN_design.md` の `Inventory Entry` から、棚卸しの追記行を生成する。

## 入力

```text
/inventory NNN
```

## 読むもの

- `docs/agent/designs/NNN_design.md` の `Inventory Entry`
- `docs/agent/post_inventory.md`

## 出力

`docs/agent/post_inventory.md` の一覧先頭に追加できる1行を、そのまま貼れる形で出す。

```md
| NNN | YYYY-MM-DD | タイトル | テーマ | 今回の距離感 | タグ1, タグ2, タグ3 | 似ている既存記事・重複回避メモ |
```

## 注意

- `similar_or_avoid` を省略しない
- 既存テーマとの重複回避に使える短さにする
- designとinventoryで値を二重管理せず、`Inventory Entry` を入力元にする

## 状態更新

- `Control Block` の `steps.inventory` を `completed` にする
- `Control Block` の `current_state` を `image-design` にする
- `Control Block` の `next_recommended_command` を `/image-design NNN` にする
- GitHub連携ChatGPTモードでは、棚卸し行と対象記事のdesignを作業ブランチ上で更新する
