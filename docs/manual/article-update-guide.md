# ai-distance 更新手順

このメモは、Codex を十分に利用できない場合に、
人間が ChatGPT（ブラウザ版 / アプリ版）を使いながら
`ai-distance` に新しい記事を追加し、GitHub Pages に公開するための手順です。

通常運用では `coding_agent_spec.md` を利用した Codex 自動運用を優先します。
このファイルは「人力fallback運用手順」です。

---

## 0. この手順の前提

この手順は以下を前提とします。

- ChatGPT（ブラウザ版 or アプリ版）が利用可能
- VSCode が利用可能
- Git が利用可能
- 画像は人間が保存する
- 最終確認は人間が行う

Codex 自動運用ほど高速ではありませんが、
ChatGPT を補助的に使うことで、短時間で記事を作成できます。

---

## 1. GitHub へのコミット手順

### 1-1. 作業フォルダへ移動

```bash
cd /path/to/ai-distance
```

### 1-2. 変更状況を確認

```bash
git status
```

追加・編集したファイルが表示されます。

### 1-3. 変更をステージング

```bash
git add .
```

特定ファイルだけ追加したい場合は、以下のように指定します。

```bash
git add index.html posts/002.html assets/images/002-example.png
```

### 1-4. コミット

```bash
git commit -m "add post 002"
```

コミットメッセージ例：

```text
add post 002
fix post 001 typo
update top page
add image for post 003
```

### 1-5. GitHubへpush

```bash
git push
```

初回や upstream が未設定の場合は以下です。

```bash
git push -u origin main
```

### 1-6. pushでHTTPエラーが出る場合

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

### 1-7. GitHub Pages の反映確認

push 後、GitHub Pages は自動で更新されます。

トップページ：

```text
https://stellates.github.io/ai-distance/
```

記事ページ例：

```text
https://stellates.github.io/ai-distance/posts/002.html
```

反映まで少し時間がかかる場合があります。

---

## 1. 人力で新しい記事を作る流れ

新しい記事を作るときは、以下の流れで進めます。

---

## 2-1. ネタを決める

まず、1話で扱う「生成AIあるある」を1つに絞ります。

例：

```text
存在しない論文をそれっぽく引用する
数字を自信満々に言う
法律相談にそれっぽく答える
最新情報なのに確認せず答える
人間がAIを過信してしまう
AI導入を怖がりすぎる会社
```

1話1テーマにすると、あとから読みやすくなります。

---

## 2-2. ChatGPTに画像設計を相談する

ChatGPT に「まず構成だけ」を相談します。
いきなり画像生成せず、漫画の流れを固めます。

### プロンプト例

```text
「ai-distance」の新しい記事を作りたいです。
テーマは「存在しない論文をそれっぽく引用する生成AI」です。

以下の前提で、画像化する前に1枚漫画の設計をしてください。

- シリーズ名：AIとのちょうどいい距離感
- トーン：軽い、ぼやき、自虐、でも教育的
- 読者：ITリテラシーが高くない一般ユーザー
- 目的：生成AIを過信も恐怖もしない距離感を伝える
- 構成：4コマ風、または縦長1枚漫画
- 最後に「今回の距離感」として短い学びを入れる

画像はまだ作らず、まず構成案だけください。
```

---

## 2-3. 画像生成用プロンプトを作る

構成案が良さそうなら、画像生成用に整えます。

### プロンプト例

```text
この構成で、画像生成用の最終指示を作ってください。

条件：
- 日本語の文字を入れる
- 1枚漫画風
- 縦長SNS向け
- かわいいAIキャラクター
- 軽い自虐
- 読後に「へ〜！」となる教育感
- 文字量は多すぎない
- タイトルは「AIとのちょうどいい距離感」
- サブタイトルは「#002 存在しない論文をそれっぽく引用する件」
```

その後、画像生成を依頼します。

```text
この内容で画像化してください。
```

生成後は必ず人間が画像を確認します。

確認項目：

```text
日本語が読めるか
変な英字ノイズがないか
吹き出しが切れていないか
文字量が多すぎないか
テーマが伝わるか
既存記事と雰囲気がズレていないか
```

問題があれば、ChatGPT に以下のように伝えて修正します。

```text
文字が崩れているので修正版を作ってください
吹き出しが切れているので修正してください
文字量を減らしてください
```

---

## 2-4. 画像ファイルを保存する

生成された画像をダウンロードして、以下に保存します。

```text
assets/images/002-fake-citation.png
```

ファイル名のルール：

```text
話数-内容がわかる英語名.png
```

例：

```text
001-token-prediction.png
002-fake-citation.png
003-confident-number.png
004-web-search-needed.png
```

既存記事と同じ `assets/images/` に保存します。
別ディレクトリは作らないようにします。

---

## 2-5. 新しい記事HTMLを作る

最新記事をコピーして、新しい記事を作ります。
古い記事より、最新記事をベースにした方が構造差異が少なく安全です。

```bash
cp posts/001.html posts/002.html
```

その後、`posts/002.html` を編集します。

主に変更する箇所：

```text
<title>
ページ見出し
画像パス
本文メモ
今回の距離感
前後リンク
```

---

## 2-6. 記事本文をChatGPTに作ってもらう

### プロンプト例

```text
「ai-distance」の記事本文を作ってください。

テーマ：存在しない論文をそれっぽく引用する生成AI
記事番号：#002
画像ファイル：../assets/images/002-fake-citation.png

文体：
- 軽い
- ぼやき調
- ITに詳しくない人にもわかる
- 説教しない
- でも学びがある

構成：
1. タイトル
2. 画像の下に置く短いメモ
3. 「今回の距離感」
4. トップページへ戻るリンク

HTMLに貼りやすい文章でください。
```

---

## 2-7. トップページに記事リンクを追加する

`index.html` の「最近のぼやき」や一覧部分に、新しい記事へのリンクを追加します。

例：

```html
<a class="post-card" href="posts/002.html">
  <span class="post-number">#002</span>
  <h3>存在しない論文をそれっぽく引用する件</h3>
  <p>それっぽい引用、でも本当にあるとは限らない。</p>
</a>
```

---

## 2-8. ローカルで確認する

ブラウザで `index.html` を開いて確認します。

チェック項目：

```text
トップページに新記事が表示されているか
記事リンクが開けるか
画像が表示されているか
スマホ幅でも読みやすいか
誤字がないか
```

簡易サーバーで確認したい場合：

```bash
python3 -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000/
```

特に以下は重要です。

- スマホ幅で文字が詰まりすぎていないか
- 画像の雰囲気がシリーズから浮いていないか
- 「説教臭さ」が強すぎないか

---

## 2-9. コミットして公開する
```bash
git status
git add .
git commit -m "add post 002: fake citation"
git push
```

公開後に確認します。

```text
https://stellates.github.io/ai-distance/posts/002.html
```

---

## 3. 人力運用時の実行順まとめ

```text
1. ネタを決める
2. ChatGPT に漫画構成を相談する
3. 画像生成用プロンプトを作る
4. 画像を生成する
5. 人間が画像品質を確認する
6. assets/images/ に保存する
7. 最新記事をコピーして posts/NNN.html を作る
8. 本文を ChatGPT に補助してもらいながら調整する
9. index.html に記事カードを追加する
10. ローカル確認する
11. git add .
12. git commit
13. git push
14. GitHub Pages の反映を確認する
```

---

## 4. 記事テンプレート

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>#002 記事タイトル | AIとのちょうどいい距離感</title>
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <header class="site-header">
    <a class="brand" href="../index.html">
      <span class="brand-mark">AI</span>
      <span>AIとのちょうどいい距離感</span>
    </a>
  </header>

  <main class="post-main">
    <article class="post-article">
      <p class="eyebrow">ぼやき #002</p>
      <h1>記事タイトル</h1>

      <figure class="post-visual">
        <img src="../assets/images/002-example.png" alt="記事タイトルの漫画" />
      </figure>

      <section class="post-note">
        <h2>メモ</h2>
        <p>
          ここに短い解説を書く。
        </p>
      </section>

      <section class="distance-note">
        <h2>今回の距離感</h2>
        <p>
          ここに、この回で伝えたい距離感を書く。
        </p>
      </section>

      <nav class="post-nav">
        <a href="../index.html">← 一覧へ戻る</a>
      </nav>
    </article>
  </main>
</body>
</html>
```

---

## 5. 運用メモ

- 完璧を目指さない。
- 1話1テーマにする。
- 画像だけで完結させすぎず、短いメモを添える。
- 技術的に正しすぎる説明より、「へ〜！」を優先する。
- 過信も恐怖も煽らない。
- 生成AIを推すのではなく、距離感を整える。

## 6. ChatGPT を補助的に使うコツ

以下のように ChatGPT に依頼すると、
人力作業をかなり省力化できます。

```text
「AIとのちょうどいい距離感」の新記事作成を手伝ってください。

記事番号：#002
テーマ：存在しない論文をそれっぽく引用する生成AI
記事タイトル：存在しない論文をそれっぽく引用する件
画像ファイル：assets/images/002-fake-citation.png

作業内容：
1. posts/001.html を参考に posts/002.html を作成する
2. posts/002.html の title、h1、画像パス、alt、本文、「今回の距離感」を新記事用に変更する
3. index.html の「最近のぼやき」に #002 の記事カードを追加する
4. 既存のHTML構造、CSSクラス、デザインは変更しない
5. README.md、LICENSE、LICENSE-JA.md は変更しない
6. 画像ファイルが存在しない場合は、パスだけ設定しておく

文体：
- 軽い
- ぼやき調
- ITに詳しくない人にもわかる
- 説教しない
- でも学びがある
- 「へ〜！」となる

完了後、変更したファイル一覧を教えてください。
```

---

## 7. この手順の位置づけ

このファイルは「人力fallback運用」のための手順です。

通常運用では、`coding_agent_spec.md` を利用した
Codex 自動運用を優先します。

Codex 制限時や、最終調整を人間が丁寧に行いたい場合に、
この手順を利用します。

---

## さらに強くするなら

第2話以降は、毎回これだけ変えればよくなります。

```text
記事番号
テーマ
記事タイトル
画像ファイル名
今回の距離感
```