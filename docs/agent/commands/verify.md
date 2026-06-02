# /verify

`NNN_design.md` の状態と、repository state の整合性を確認する。

## 入力

```text
/verify NNN
```

## 確認対象

- `posts/NNN.html` が存在する
- `index.html` に対象記事カードがある
- `docs/agent/post_inventory.md` に対象記事の行がある
- 画像ファイルのパスとファイル名が正しい
- title、date、tags、OGP、description が矛盾していない
- `NNN_design.md` の `Control Block` と実ファイルが矛盾していない

## 確認方法

- `HTML Artifacts` と `posts/NNN.html` を照合する
- `Index Card` と `index.html` の対象カードを照合する
- `Inventory Entry` と `docs/agent/post_inventory.md` の対象行を照合する
- `Image Design` の `image_filename` と、HTML、index、実画像を照合する

## 出力

- OK、要修正、未確認を分けて短く示す
- 修正が必要なら、対象ファイルと直す値を示す
- `Verification Log` と `Control Block` の更新内容、または更新案を出す
- 問題がなければ、次は人間によるpublish判断だと案内する

## 状態更新

- 問題がなければ `Verification Log.status` を `passed` にする
- 問題がなければ `Control Block` の `steps.verify` を `passed` にする
- 問題がなければ `Control Block` の `current_state` を `publish` にする
- 問題がなければ `Control Block` の `next_recommended_command` を `publish判断` にする
- 問題があれば該当stateへ戻し、修正内容を `Verification Log.fixes` に残す
