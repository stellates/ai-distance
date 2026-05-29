# ai-distance 人間向け更新手順

このメモは、人間が ChatGPT を使って `ai-distance` に新しい記事を追加し、GitHub Pages に公開するための入口です。

現在の運用では、人間が毎回読む必要があるのは、基本的に「最初に ChatGPT へ渡す固定インストラクション」です。

固定インストラクションを渡した後は、ChatGPT が以下のファイルを参照しながら作業を誘導します。

```text
docs/agent/CHATGPT_ASSISTANT_GUIDE.md
docs/agent/CHATGPT_WORKFLOW_CHECKLIST.md
docs/agent/POST_INVENTORY.md
```

そのため、この手順書の主な役割は、最初の依頼文を迷わず投げられるようにすることです。

ファイル作成、画像配置、commit、push は、人間がローカル clone 上で行います。
`main` に push されるまで GitHub Pages の本番環境には反映されません。

---

## 0. 最初に ChatGPT へ渡す固定インストラクション

新しい記事作成を始めるときは、まず ChatGPT に以下を渡します。

```text
@GitHub stellates/ai-distance

AGENTS.md を読んで、ChatGPT / 人間補助モードで進めてください。

以下を参照してください。
- docs/manual/HUMAN_UPDATE_GUIDE.md
- docs/agent/CHATGPT_ASSISTANT_GUIDE.md
- docs/agent/CHATGPT_WORKFLOW_CHECKLIST.md
- docs/agent/POST_INVENTORY.md

新しい記事追加を手伝ってください。

あなたは通常、repository を直接編集しないでください。
ただし、私が明示的に GitHub へのファイル作成・更新を依頼した場合は、その依頼範囲に限って対応して構いません。

commit、push、PR作成、merge は行わないでください。

まず、進行状況チェックリストを表示し、POST_INVENTORY.md を確認してから、テーマ重複チェックに進んでください。
```

テーマがすでに決まっている場合は、末尾に以下を追加します。

```text
テーマ：ここにテーマを書く

補足：
必要なら背景や避けたい方向を書く。
```

---

## 1. 途中でテーマを出し直してほしい場合

ChatGPT が出したテーマ案がしっくりこない場合は、以下のように依頼します。

```text
提案されたテーマとは別のテーマ案を出してください。
ただし、POST_INVENTORY.md を確認し、既存記事との重複を避けてください。
似ている既存記事があれば、記事番号と違いも示してください。
```

その他の修正は、基本的に自然文で伝えます。

例：

```text
少し説教臭いので、もっと軽いぼやき調にしてください。
タイトルはもう少し短くしてください。
画像の文字量が多いので、吹き出しを減らしてください。
本文のオチが弱いので、もう少し「へ〜」となる締めにしてください。
```

---

## 2. 以降の旧手順について

以下の手順は、以前の運用で使っていた詳細手順です。

現在の通常運用では、最初の固定インストラクションを渡した後、ChatGPT が `docs/agent/CHATGPT_WORKFLOW_CHECKLIST.md` に沿って進行状況を示しながら誘導します。

そのため、人間は以降の旧手順を毎回読む必要はありません。
流れを理解したい場合や、ChatGPT の案内が不十分な場合の参考として使ってください。

---

## 3. 旧手順: この手順の前提

この手順は以下を前提とします。

- ChatGPT が利用可能
- 必要に応じて ChatGPT で GitHub 連携が利用可能
- VSCode が利用可能
- Git が利用可能
- ローカル clone が最新である
- 画像の生成・最終確認は人間が行う
- ファイル作成、画像配置、commit、push は人間が行う

詳細な ChatGPT 側の支援ルールは `docs/agent/CHATGPT_ASSISTANT_GUIDE.md` を参照します。
Codex / coding agent に自動作業を任せる場合は `docs/agent/CODING_AGENT_SPEC.md` を参照します。
Codex を使う人間向け手順は `docs/manual/CODEX_UPDATE_GUIDE.md` を参照します。

---

## 4. 旧手順: 全体の流れ

新しい記事を追加するときは、以下の流れで進めます。

```text
1. テーマ決定
2. 構成決定
3. 画像生成
4. HTML生成、index.html差分生成
5. 最終確認
6. 修正
7. git push（CI/CD）
```

人間が行う作業は、主に以下です。

```text
ChatGPTにテーマ相談
→ 構成確定
→ 画像生成チャットで画像作成
→ 指定ファイル名で assets/images/ に保存
→ ChatGPT が出力した posts/NNN.html を作成
→ ChatGPT が出力した index.html 追加カードを貼る
→ python3 -m http.server 8000 で確認
→ 必要なら ChatGPT に修正依頼
→ git add / commit / push
→ GitHub Actions と GitHub Pages を確認
```

---

## 5. 旧手順: ChatGPT に作業を依頼する

ChatGPT に、まず以下のように依頼します。

```text
@GitHub stellates/ai-distance

AGENTS.md を読んで、docs/agent/CHATGPT_ASSISTANT_GUIDE.md に従ってください。

テーマ「ここにテーマを書く」で、新しい記事追加を手伝ってください。

あなたは GitHub や repository を直接編集しないでください。
commit、push、PR作成、merge は行わないでください。

人間がローカル clone 上でファイル作成、画像配置、commit、push を行います。

posts/NNN.html の内容と、index.html に追加する記事カードブロックだけを出力してください。
index.html 全文は出力しないでください。
```

テーマは、必要に応じて以下のように補足します。

```text
テーマ：たった2文字の違いで？！

補足：
「今の〜は？」と「〜は？」の違いで、
知識回答になるか、Web検索結果ベースになるかがぶれる。

伝えたい学び：
AIへの質問は、最新情報が必要かどうかを明確にした方がよい。

寄せたい方向：
軽いぼやき調。日常の小さな失敗談っぽく。

避けたい方向：
AI批判を強くしすぎない。専門用語を増やさない。

誤解されやすい点：
AIが常にWeb検索しているわけではない、という点。
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

## 6. 旧手順: テーマと構成を決める

ChatGPT から、以下を出してもらいます。

- 記事番号
- 記事タイトル案
- 1記事1テーマに絞ったテーマ説明
- 4コマまたは縦長1枚漫画の構成
- セリフ案
- 最後の学び
- 画像ファイル名案

構成がしっくりこない場合は、自然文で修正依頼します。

例：

```text
少し説教臭いので、もっと軽いぼやき調にしてください。
タイトルはもう少し短くしてください。
最後の学びを「へ〜！」となる感じに寄せてください。
```

---

## 7. 旧手順: 画像を生成する

画像生成は、必要に応じて画像生成専用チャットに分岐します。

ただし、作業管理の中心はメインチャットに置きます。
画像生成チャットに工程全体を引き継ぐ必要はありません。

メインチャット側で、以下を確定しておきます。

- 記事番号
- 記事タイトル
- 画像生成プロンプト
- 画像ファイル名
- 画像保存先

ChatGPT には、以下のような指示を出してもらいます。

```text
画像生成は別チャットで行ってください。

以下のプロンプトを貼り付ける前に、既存漫画PNGを3つ程度添付してください。
例：

- assets/images/022-free-plan-limit.png
- assets/images/023-two-words-now.png
- assets/images/024-all-is-too-much.png

添付したサンプルの作風、余白、文字量、漫画構成に合わせて生成してください。

生成後、採用する画像を以下に保存してください。

assets/images/NNN-topic.png

保存できたら、このメインチャットに戻ってください。
```

画像生成チャットでは、画像の生成とリテイクのみを行います。
HTML生成、`index.html` 更新、git操作、CI/CD確認はメインチャット側で扱います。

---

## 8. 旧手順: 画像を保存する

採用する画像が決まったら、ChatGPT が指定したファイル名で保存します。

保存先：

```text
assets/images/NNN-topic.png
```

例：

```text
assets/images/025-search-or-memory.png
```

ファイル名は、ChatGPT が後で `posts/NNN.html` から参照するため、勝手に変更しないでください。
変更した場合は、メインチャットで ChatGPT に新しいファイル名を伝えます。

---

## 9. 旧手順: posts/NNN.html を作成する

ChatGPT が出力した内容で、新しい記事HTMLを作成します。

例：

```text
posts/025.html
```

ChatGPT の指示例：

```text
以下の内容で `posts/025.html` を新規作成してください。
既存の `posts/024.html` は変更しないでください。
```

`posts/NNN.html` では、画像パスが以下のようになっていることを確認します。

```text
../assets/images/NNN-topic.png
```

---

## 10. 旧手順: index.html に記事カードを追加する

`index.html` は全文置き換えしません。

ChatGPT が出力した、追加する記事カードブロックだけを貼り付けます。

必ず守ること：

- `index.html` 全文を置き換えない
- 既存記事カードを削除しない
- 既存記事カードを短縮しない
- 既存記事カードを並べ替えない
- 新記事カードだけを追加する

ChatGPT の指示例：

```text
以下のカードブロックを、`index.html` の記事一覧セクション内で、
現在の最新記事カードより上に貼り付けてください。

既存の記事カードは削除・短縮・並べ替えしないでください。
`index.html` 全文を置き換えないでください。
```

---

## 11. 旧手順: ローカルで確認する

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
index.html の既存記事カードが消えていないか
既存記事へのリンクが壊れていないか
```

---

## 12. 旧手順: 問題がある場合は ChatGPT に修正を依頼する

ローカル確認で問題があれば、ChatGPT に自然文で修正を依頼します。

例：

```text
ローカルで確認しました。
以下を修正したいです。

- 記事本文が少し説教臭いので、もう少し軽いぼやき調にしてください
- index.html の説明文を短くしてください
- 画像altを記事内容に合わせてください

どのファイルのどこをどう直せばよいか、具体的に指示してください。
```

ChatGPT から、修正後の全文または差し替え箇所を出してもらい、ローカルで反映します。

修正後、もう一度ローカルで確認します。

---

## 13. 旧手順: git push する

確認が完了したら、人間が git 操作を行います。

```bash
git status
git add posts/NNN.html index.html assets/images/NNN-topic.png
git commit -m "add post NNN"
git push origin main
```

ファイル名や記事番号は、実際に追加したものに置き換えてください。

---

## 14. 旧手順: GitHub Pages の反映を確認する

`main` に push されると、GitHub Pages のデプロイが実行されます。

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

---

## 15. 旧手順: ChatGPT が必要ファイルを確認できない場合

GitHub連携や検索で必要ファイルを確認できない場合、ChatGPT に推測で作業を進めさせないでください。

以下のいずれかを提示します。

- 正しいファイル名・パス
- Repository Map
- 対象ファイルの添付
- 対象ファイルの内容貼り付け

特に、以下は実物確認なしで推測させないでください。

- `index.html` の貼り付け位置
- 既存記事HTMLの構造
- 画像ファイル名の命名規則
- CSS class
- 前後記事リンク
