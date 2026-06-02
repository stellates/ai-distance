# /navi

記事追加ワークフローの現在地を確認し、次の1工程を案内する。
迷った時の基本入口として使う。

## 入力

```text
/navi
/navi NNN
```

## 読むもの

- 対象記事の `docs/agent/designs/NNN_design.md` があれば、先頭の `Control Block`
- `NNN_design.md` がない場合は、ユーザー申告、作業ブランチ、repository state
- 状態遷移は `docs/agent/workflow.md`

## 動作

1. 対象記事番号と作業ブランチを推定する。
2. `Control Block` があれば、`current_state` と `steps` を確認する。
3. 必要に応じてrepository stateから食い違いを推定する。
4. 現在地と、次にすすめるコマンドを1つ返す。

次工程は `docs/agent/workflow.md` の基本遷移に従う。
`next_recommended_command` とrepository stateが矛盾する場合は、先に `/verify NNN` をすすめる。

## 出力

次のコマンドは、そのままコピペできる形で出す。

```text
現在地:
- 029はテーマ確定済み
- HTMLは未作成

おすすめ:

/html 029
```

## 注意

- 全工程の説明は、初回またはユーザーが迷っている時だけ短く出す
- 毎回長い手順書を出さない
- 状態が怪しい時は `/verify NNN` をすすめる
