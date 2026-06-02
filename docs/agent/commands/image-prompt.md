# /image-prompt

確定した画像設計から、画像生成用プロンプトを作る。

## 入力

```text
/image-prompt NNN
```

## 読むもの

- 対象記事の `docs/agent/designs/NNN_design.md` の `Image Design`
- `docs/agent/templates/image_prompt.md`
- `docs/skills/image_design.md`
- 作風確認が必要な場合は `docs/agent/image_prompt_sample.md`

## 原則

- この工程では画像生成を実行しない
- `Image Design` が未確定なら `/image-design NNN` に戻す
- テンプレートの順序を維持し、記事固有の値だけを埋める

## 出力

- そのまま画像生成へ渡せる1つのプロンプト
- 必要に応じて、成功サンプルとの差分確認結果

## 状態更新

- 確定したプロンプトを `Image Prompt Notes.prompt_text` に反映する
- `Image Prompt Notes.prompt_status` を `approved` にする
- `Control Block` の `steps.image-prompt` を `approved` にする
- `Control Block` の `current_state` を `image` にする
- `Control Block` の `next_recommended_command` を `/image NNN` にする
- GitHub連携ChatGPTモードでは、対象記事のdesignを作業ブランチ上で更新する
