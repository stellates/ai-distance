# index_html.md

- 新記事カードだけを追加する
- `post-number` と記事番号を一致させる
- 貼り付け位置を明示する

人間への指示例：

```text
以下のカードブロックを、`index.html` の記事一覧セクション内で、
現在の最新記事カードより上に貼り付けてください。

既存の記事カードは削除・短縮・並べ替えしないでください。
`index.html` 全文を置き換えないでください。
```

禁止事項:

- インデントを変えない
- `index.html` 全文を出力しない
- `index.html` 全文を置き換えさせない
- `index.html` の既存記事カードを削除しない
- `index.html` の既存記事カードを短縮しない
- `index.html` の既存記事カードを並べ替えしない

## 出力フォーマット

```html
      <article class="post-card">
        <a class="post-card-image" href="./posts/027.html">
          <img src="./assets/images/027-stop-buzzwords.png" alt="AIがQOLやUXなどの略語を連発し、人間が困惑している4コマ漫画" />
        </a>
        <div class="post-card-body">
          <p class="post-number">#027</p>
          <p class="post-date"><time datetime="2026-05-30">公開日 2026/5/30</time></p>
          <h3><a href="./posts/027.html">急に横文字やめて（笑）</a></h3>
          <p>
            AIは親切なつもりでQOLやUXなどの略語を使うことがある。分からない時は「略語なしで説明して」と頼むと、意外とすんなり話が通じる。
          </p>
          <div class="tags" aria-label="タグ">
            <span>略語</span>
            <span>説明</span>
            <span>プロンプト</span>
          </div>
        </div>
      </article>
```