# ai-distance

生成AIとのちょうどいい距離感を考えるための、ゆるいネタ置き場です。

生成AI、便利。
でも、たまに「おいおい」ってなる。

そんな「すごい」「惜しい」「なんでやねん」を、
画像と短いメモで少しずつ貯めていきます。

## ライセンス（日本語）

このリポジトリでは、コードとコンテンツでライセンスを分けています。

- コード：MIT License
- 画像・漫画・記事本文など：CC BY-NC-SA 4.0

日本語での説明は `LICENSE-JA.md` を参照してください。

## License

- Code: MIT License
- Images, comics, articles, and other non-code content: CC BY-NC-SA 4.0

This means the site code can be reused freely under the MIT License, while the
content may be shared or adapted for non-commercial purposes with attribution
and share-alike conditions.

## メンテナンス担当向け

記事の追加手順は以下を参照してください。

- このシリーズの漫画画像は `Image-gen2.0` を用いて作成しています。
- 画像生成工程の都合上、記事追加作業には `ChatGPT` または `Codex` の利用を前提としています。

---

### ChatGPTで行う場合

[🗒️ 通常更新手順書](docs/manual/HUMAN_UPDATE_GUIDE.md)

- Codexは利用枠に限りがあるため、通常はこちらの手順を推奨します。
- 手順に従ってChatGPTを起動すると、ワークフロー形式で作業を補助します。

---

### Codexで行う場合

[🗒️ 半自動更新手順書](docs/manual/CODEX_UPDATE_GUIDE.md)

- Codex利用枠に余裕があり、作業時間を短縮したい場合はこちらを利用してください。
- 2026/5/31時点では、1回の実行でChatGPT Plusの5時間利用枠をおおむね5%前後消費します。
- テーマや構成イメージは事前に決めておく必要があります。
- 画像生成品質に問題がある場合は、ChatGPTで差し替え用画像を生成し、人手で差し替えてください。
- 記事内容に不満がある場合は、人手またはChatGPT補助で修正してください。
- 過度な期待はせず、「うまくいけばラッキー」くらいの気持ちで使うことをおすすめします。

### AI向け設定

ChatGPT / Codex は、以下の設定ファイルを参照して動作します。

[AGENTS.md](AGENTS.md)