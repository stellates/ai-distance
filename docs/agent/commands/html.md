# /html

記事HTMLについて、記事固有の差分だけを生成する。

## 入力

```text
/html NNN
```

## 読むもの

- `docs/agent/designs/NNN_design.md`
- 直前の記事HTML
- `docs/skills/post_html.md`

## 原則

- 既存HTML構造を変えない
- CSS、class名、scriptを変えない
- 直前の記事またはテンプレートを構造参照に使う
- 記事固有の値だけを差し替える
- HTML専用テンプレートは作らず、直前の記事HTMLを構造テンプレートとして使う

## 差し替える値

- image src、OGP画像、alt
- 記事番号
- 日付
- title、subtitle、description
- 本文
- tags

## 出力

- ChatGPTがGitHubを直接編集しない場合は、そのまま貼れる大きなコードブロックで出す
- 説明はコードブロックの外に短く置く
- `HTML Artifacts` を更新する、または更新案を出す

## 状態更新

- `Control Block` の `steps.html` を `completed` にする
- `Control Block` の `current_state` を `index-card` にする
- `Control Block` の `next_recommended_command` を `/index-card NNN` にする
- GitHub連携ChatGPTモードでは、記事HTMLと対象記事のdesignを作業ブランチ上で更新する
