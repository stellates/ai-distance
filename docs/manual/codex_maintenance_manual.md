# CODEX_UPDATE_GUIDE.md

このメモは、人間が Codex / coding agent を使って `ai-distance` に新しい記事を追加し、
GitHub Pages に公開するための手順です。

Codex は `docs/agent/coding_agent_spec.md` に従って、ローカル作業ツリー上で新記事作成から `git commit` までを行います。

`git push`、PR作成、`main` への merge、GitHub Pages の本番反映確認は人間が行います。

---

## 0. この手順の前提

この手順は以下を前提とします。

- Codex / coding agent が利用可能
- VSCode が利用可能
- Git が利用可能
- 人間がローカルで最終確認する
- Codex は commit までで停止する
- `git push` は人間が行う

Codex 側の詳細な作業仕様は `docs/agent/coding_agent_spec.md` を参照します。
ChatGPT 連携で作業ブランチ運用を行う場合は `docs/manual/HUMAN_UPDATE_GUIDE.md` と `docs/agent/chatgpt_assistant_spec.md` を参照します。

---

## 1. 全体の流れ

Codex を使って新しい記事を追加するときは、以下の流れで進めます。

```text
1. 人間がローカルの main を最新化する
2. 人間が Codex にテーマを渡す
3. Codex が docs/agent/coding_agent_spec.md を読んで作業する
4. Codex が新記事HTML、画像、index.html を更新する
5. Codex が git commit まで行って停止する
6. 人間がローカルで確認する
7. 問題があれば Codex に修正を依頼する
8. 問題がなければ人間が git push する
9. GitHub Pages の反映を確認する
```

---

## 2. 作業前に main を最新化する

Codex に依頼する前に、ローカルの `main` を最新にします。

```bash
git switch main
git pull
```

未commitの変更がある場合は、先に整理してください。

```bash
git status
```

---

## 3. Codex に作業を依頼する

Codex に、以下のように依頼します。

```text
AGENTS.md を読んで、docs/agent/coding_agent_spec.md に従ってください。

テーマ「ここにテーマを書く」で、新しい記事を追加してください。

作業は現在のローカル main 上で行って構いません。
ただし、git commit までで停止してください。
git push、PR作成、merge、GitHub Pages の公開操作は行わないでください。

commit 後に、変更ファイル一覧、commit hash、ローカル確認手順を教えてください。
```

テーマ例：

```text
存在しない論文をそれっぽく引用する生成AI
数字を自信満々に言う生成AI
法律相談にそれっぽく答える生成AI
最新情報なのに確認せず答える生成AI
人間がAIを過信してしまう話
AI導入を怖がりすぎる会社
```

---

## 4. Codex の完了結果を確認する

Codex の作業が終わると、通常は以下が提示されます。

```text
commit hash
変更ファイル一覧
ローカル確認手順
push は未実行であること
```

まず以下で状態を確認します。

```bash
git status
git log --oneline -1
```

`git status` が clean で、直近 commit が Codex の作成した commit になっていることを確認します。

---

## 5. ローカルで確認する

簡易サーバーを起動します。

```bash
python3 -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000/
```

確認項目：

```text
トップページに新記事が表示されているか
記事リンクが開けるか
画像が表示されているか
スマホ幅でも読みやすいか
誤字がないか
シリーズの雰囲気が合っているか
「説教臭さ」が強すぎないか
```

画像については、特に以下を確認します。

```text
日本語が読めるか
変な英字ノイズがないか
吹き出しが切れていないか
テーマが伝わるか
既存記事と雰囲気がズレていないか
```

---

## 6. 問題がある場合は Codex に修正を依頼する

ローカル確認で問題があれば、Codex に修正を依頼します。

例：

```text
先ほどの commit を確認しました。
以下を修正してください。

- 記事本文が少し説教臭いので、もう少し軽いぼやき調にしてください
- index.html の説明文を短くしてください
- 画像altを記事内容に合わせてください

修正後、追加 commit または amend commit まで行ってください。
git push はしないでください。
```

修正後、もう一度ローカルで確認します。

```bash
git status
git log --oneline -3
python3 -m http.server 8000
```

---

## 7. 問題がなければ push する

ローカル確認で問題がなければ、人間が作業ブランチを push します。

```bash
git push
```

作業ブランチを `main` へ反映するかは人間が判断します。
`main` へ反映後、GitHub Pages のデプロイが実行されます。

---

## 8. GitHub Pages の反映を確認する

現在の workflow では、`main` に以下の対象ファイルが入った場合にデプロイされます。

```text
*.html
*.css
*.png
*.webp
.github/workflows/deploy-pages.yml
```

反映後、以下を確認します。

トップページ：

```text
https://stellates.github.io/ai-distance/
```

記事ページ例：

```text
https://stellates.github.io/ai-distance/posts/NNN.html
```

反映まで少し時間がかかる場合があります。

---

## 9. 画像ファイル名のルール

画像は以下に保存します。

```text
assets/images/
```

画像生成元がPNGの場合は、WebP quality 75〜80を目安に変換してから配置します。
既存記事のPNGは変更しません。

ファイル名は以下の形式にします。

```text
NNN-topic-name.webp
```

例：

```text
030-copy-paste-boss-mode.webp
031-short-topic-name.webp
```

別ディレクトリは作らないようにします。

---

## 10. Codex 運用時の注意

- Codex は commit までで停止する
- `git push` は人間が行う
- 本番反映前に必ずローカル確認する
- 画像の文字品質は人間が必ず確認する
- `styles.css` は原則変更しない
- `README.md`、`LICENSE`、`LICENSE-JA.md` は原則変更しない
- 完璧を目指しすぎない
- 1話1テーマにする
- 技術的に正しすぎる説明より、「へ〜！」を優先する
- 過信も恐怖も煽らない

---

## 11. トラブル時

### Codex が push しようとした場合

Codex には以下のように止めます。

```text
push は行わないでください。
docs/agent/coding_agent_spec.md の通り、commit までで停止してください。
```

### git status が clean ではない場合

変更内容を確認します。

```bash
git status
git diff
```

必要に応じて Codex に、未commitの変更を整理して commit するよう依頼します。

### pushでHTTPエラーが出る場合

以前発生したようなエラー：

```text
error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
```

この場合は、以下を実行してから再度 push します。

```bash
git config --global http.postBuffer 524288000
git push
```
