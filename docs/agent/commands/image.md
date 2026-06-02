# /image

採用画像の確認、WebP化、配置を支援する。

## 入力

```text
/image NNN
```

## 読むもの

- 対象記事の `docs/agent/designs/NNN_design.md` の `Image Design`
- 対象記事の `docs/agent/designs/NNN_design.md` の `Image Prompt Notes`
- `docs/skills/image_review.md`

## 原則

- `/image-design NNN` と `/image-prompt NNN` が完了してから進める
- 生成元がPNGの場合は、WebP quality 75〜80 を目安に変換する
- 新規記事の配信用画像はWebPを標準とする
- 既存記事のPNGは変更しない
- ファイル名、画像パス、変換後サイズを確認する

## 配置方針

- ChatGPTのGitHub connectorは、小さいbinary blobならcommitできる
- 実用サイズの記事画像は、base64を使うtool callには大きすぎる可能性が高い
- ChatGPTはWebP化、サイズ確認、配置案内を支援する
- 実用サイズ画像の配置は、ユーザーのローカル作業または Codex / ローカル `/auto` で行う

## 状態更新

- 採用画像のファイル名とパスを `Image Design`、`HTML Artifacts`、`Index Card` に反映する
- `Control Block` の `steps.image` を `completed` にする
- `Control Block` の `current_state` を `verify` にする
- `Control Block` の `next_recommended_command` を `/verify NNN` にする
- 配置後は `/verify NNN` をすすめる
