# /auto

Codex / ローカル環境で、記事追加をローカル作業ツリー上に反映する。

## 入力

```text
/auto テーマ
/auto NNN テーマ
```

## 対象

- `docs/agent/designs/NNN_design.md`
- `posts/NNN.html`
- `index.html`
- `docs/agent/post_inventory.md`
- `assets/images/` の画像ファイル

## 方針

- 作業ブランチ上で動かす
- 既存HTML構造、CSS、class名、scriptを維持する
- ローカルファイルを扱えるため、実用サイズ画像も配置できる
- push、PR作成、mergeは行わない

## ループ

```text
generate
→ update design
→ convert image to WebP
→ verify
→ fix
→ verify
→ commit / checkpoint
```

## 完了時

- 変更ファイル一覧を示す
- verify結果を示す
- commitまたはcheckpointの状態を示す
- pushしていないことを明記する
