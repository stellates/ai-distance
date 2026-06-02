# /theme

1記事1テーマで、記事と画像の設計を固める。

## 入力

```text
/theme NNN
```

## 読むもの

- `docs/agent/post_inventory.md`
- `docs/skills/theme.md`
- 対象記事の `docs/agent/designs/NNN_design.md`

## 出力

- テーマ
- title、subtitle
- 日常の小さなAIあるある
- 今回の距離感
- 似ている既存記事
- 重複しない理由
- 4コマの方向性

## 状態更新

- 合意内容を `Theme Design` に反映する
- `Control Block` の `steps.theme` を `approved` にする
- `Control Block` の `current_state` を `html` にする
- `Control Block` の `next_recommended_command` を `/html NNN` にする
- GitHub連携ChatGPTモードでは、対象記事のdesignを作業ブランチ上で更新する

## 注意

- コマンド名は `/theme` に統一する
- `docs/skills/theme.md` は既存のテーマ設計ルールとして参照する
