# /image

画像設計、プロンプト、命名、Web配信用の確認を支援する。

## 入力

```text
/image NNN
```

## 読むもの

- `docs/agent/designs/NNN_design.md` の `Image Design`
- `docs/agent/designs/NNN_design.md` の `Image Prompt Notes`
- `docs/agent/image_prompt_sample.md`
- `docs/skills/image_design.md`

## 原則

- いきなり画像生成せず、設計とプロンプトを先に確認する
- PNG出力は大きくなりやすい
- Web配信は WebP quality 75〜80 を目安にする
- ファイル名、画像パス、変換後サイズを確認する

## 配置方針

- ChatGPTのGitHub connectorは、小さいbinary blobならcommitできる
- 実用サイズの記事画像は、base64を使うtool callには大きすぎる可能性が高い
- ChatGPTはprompt、design、命名、WebP化、サイズ確認を支援する
- 実用サイズ画像の配置は、ユーザーのローカル作業または Codex / ローカル `/auto` で行う

## 状態更新

- 採用画像のファイル名を `Image Design` と `HTML Artifacts` に反映する
- 配置後は `/verify NNN` をすすめる
