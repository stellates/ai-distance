# /image-design

画像生成前に、漫画の内容、学び、命名を設計する。

## 入力

```text
/image-design NNN
```

## 読むもの

- 対象記事の `docs/agent/designs/NNN_design.md` の `Theme Design`
- 対象記事の `docs/agent/designs/NNN_design.md` の `HTML Artifacts`
- `docs/skills/image_design.md`

## 出力

- title
- theme
- core_joke
- learning
- WebP形式の `image_filename`
- 4コマの内容

## 原則

- この工程では画像生成を実行しない
- 設計、プロンプト改善、差し戻しの依頼を画像生成依頼として扱わない
- 新規記事の配信用ファイル名は `NNN-kebab-case-topic.webp` にする

## 状態更新

- 合意内容を `Image Design` に反映する
- `Control Block` の `steps.image-design` を `approved` にする
- `Control Block` の `current_state` を `image-prompt` にする
- `Control Block` の `next_recommended_command` を `/image-prompt NNN` にする
- GitHub連携ChatGPTモードでは、対象記事のdesignを作業ブランチ上で更新する
