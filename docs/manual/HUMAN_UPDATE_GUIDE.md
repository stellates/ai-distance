# ai-distance 人間向け更新手順

このメモは、人間が ChatGPT を使って `ai-distance` に新しい記事を追加し、
GitHub Pages に公開するための手順です。

この手順では、ChatGPT が GitHub 連携を使って作業ブランチに変更を push し、
人間がローカルで確認してから `main` に merge します。

`main` に merge されるまで GitHub Pages の本番環境には反映されません。

---

## 0. この手順の前提

この手順は以下を前提とします。

- ChatGPT が利用可能
- ChatGPT で GitHub 連携が利用可能
- VSCode が利用可能
- Git が利用可能
- 画像の最終確認は人間が行う
- 作業ブランチのローカル確認は人間が行う
- `main` への merge は人間が行う

詳細な ChatGPT 側の支援ルールは `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を参照します。
Codex / coding agent に自動作業を任せる場合は `docs/agent/CODING_AGENT_SPEC.md` を参照します。
Codex を使う人間向け手順は `docs/manual/CODEX_UPDATE_GUIDE.md` を参照します。

---

## 1. 全体の流れ

新しい記事を追加するときは、以下の流れで進めます。

```text
1. 人間がテーマを決める
2. ChatGPT に作業を依頼する
3. ChatGPT が作業ブランチを作成する
4. ChatGPT が記事HTMLや index.html を更新する
5. ChatGPT が作業ブランチへ push し、必要に応じて PR を作成する
6. 人間が作業ブランチを pull してローカル確認する
7. 問題があれば ChatGPT に修正を依頼する
8. 問題がなければ人間が PR を main に merge する
9. GitHub Pages の反映を確認する
```

---

## 2. ChatGPT に作業を依頼する

ChatGPT に、まず以下のように依頼します。

```text
@GitHub ai-distance

AGENTS.md を読んで、docs/agent/CHATGPT_ASSISTANT_GUIDE.md に従ってください。

テーマ「ここにテーマを書く」で、新しい記事追加を手伝ってください。

main には直接 push しないでください。
作業ブランチを作成し、そこに変更を push してください。
必要に応じて PR も作成してください。

人間が作業ブランチを pull してローカル確認してから、main に merge します。
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

## 3. ChatGPT の作業結果を確認する

ChatGPT の作業が終わると、通常は以下が提示されます。

```text
作業ブランチ名
PR URL
変更ファイル一覧
ローカル確認手順
確認チェックリスト
main merge 後の確認URL
```

作業ブランチ名と PR URL を控えておきます。

---

## 4. 作業ブランチをローカルに取り込む

ChatGPT が作成した作業ブランチを、ローカルに取り込みます。

```bash
git fetch origin
git switch 作業ブランチ名
git pull
```

例：

```bash
git fetch origin
git switch chatgpt/add-post-002-fake-citation
git pull
```

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

画像がまだ未追加の場合は、ChatGPT が指定したファイル名で以下に保存します。

```text
assets/images/NNN-topic.png
```

画像を追加した場合は、作業ブランチに commit / push します。

```bash
git status
git add assets/images/NNN-topic.png
git commit -m "add image for post NNN"
git push
```

---

## 6. 問題がある場合は ChatGPT に修正を依頼する

ローカル確認で問題があれば、ChatGPT に修正を依頼します。

例：

```text
@GitHub
作業ブランチ chatgpt/add-post-002-fake-citation を確認しました。
以下を修正してください。

- 記事本文が少し説教臭いので、もう少し軽いぼやき調にしてください
- index.html の説明文を短くしてください
- 画像altを記事内容に合わせてください

main には直接 push せず、同じ作業ブランチに追加 commit してください。
```

修正後、もう一度ローカルで確認します。

```bash
git pull
python3 -m http.server 8000
```

---

## 7. 問題がなければ PR を merge する

ローカル確認で問題がなければ、GitHub 上で PR を `main` に merge します。

merge は人間が行います。

ChatGPT には、原則として merge を依頼しません。

---

## 8. GitHub Pages の反映を確認する

`main` に merge されると、GitHub Pages のデプロイが実行されます。

現在の workflow では、`main` に以下の対象ファイルが入った場合にデプロイされます。

```text
*.html
*.css
*.png
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

## 9. 作業後に main へ戻る

作業が終わったら、ローカルのブランチを `main` に戻しておきます。

```bash
git switch main
git pull
```

必要であれば、作業ブランチを削除します。

```bash
git branch -d 作業ブランチ名
```

---

## 10. 画像ファイル名のルール

画像は以下に保存します。

```text
assets/images/
```

ファイル名は以下の形式にします。

```text
NNN-topic-name.png
```

例：

```text
001-token-prediction.png
002-fake-citation.png
003-confident-number.png
004-web-search-needed.png
```

別ディレクトリは作らないようにします。

---

## 11. 運用メモ

- 完璧を目指しすぎない
- 1話1テーマにする
- 画像だけで完結させすぎず、短いメモを添える
- 技術的に正しすぎる説明より、「へ〜！」を優先する
- 過信も恐怖も煽らない
- 生成AIを推すのではなく、距離感を整える
- `main` へ入れる前に必ずローカルで確認する

---

## 12. トラブル時

### 作業ブランチに切り替えられない場合

```bash
git fetch origin
git branch -a
```

作業ブランチ名を確認してから、再度切り替えます。

```bash
git switch 作業ブランチ名
```

### ローカルに古い内容が残っている場合

```bash
git pull
```

ブラウザのキャッシュが残っていそうな場合は、スーパーリロードします。

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