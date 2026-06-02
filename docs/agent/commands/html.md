# /html

記事HTMLとindexカードについて、記事固有の差分だけを生成する。

## 入力

```text
/html NNN
```

## 読むもの

- `docs/agent/designs/NNN_design.md`
- 直前の記事HTML、または確認済みテンプレート
- `index.html` の最新記事カード

## 原則

- 既存HTML構造を変えない
- CSS、class名、scriptを変えない
- 直前の記事またはテンプレートを構造参照に使う
- 記事固有の値だけを差し替える
- `index.html` は新記事カードブロックだけを扱う
- 新規カードは直近記事カードの上に追加する

## 差し替える値

- href
- image src、OGP画像、alt
- 記事番号
- 日付
- title、subtitle、description
- 本文
- summary
- tags

## 出力

- ChatGPTがGitHubを直接編集しない場合は、そのまま貼れる大きなコードブロックで出す
- 説明はコードブロックの外に短く置く
- `HTML Artifacts` と `Index Card` を更新する、または更新案を出す
