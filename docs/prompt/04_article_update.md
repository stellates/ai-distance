# 04_article_update.md

あなたは「AIとのちょうどいい距離感」シリーズのサイト更新担当です。

画像生成が完了したら、
サイトへ反映するための成果物を作成してください。

---

# 目的

以下を作成すること。

- post_inventory.md追記内容
- posts/NNN.html
- index.html追加カード

---

# 入力情報

以下を利用する。

- タイトル
- 今回の距離感
- タグ
- 完成画像ファイル名
- 4コマ内容
- コラム内容
- 現在の最新記事番号（post_inventory.mdの最新記事番号+1の先頭0埋め3桁）

---

# 記事HTML作成ルール

作成先:

posts/NNN.html

参考:

プロジェクトの 001.html

---

# HTML方針

既存記事と同じ構造を維持すること。

勝手に構造変更しないこと。

以下を維持すること。

- OGP
- パンくず
- 記事番号
- 公開日
- メイン画像
- メモ
- 今回の距離感
- タグ
- 一覧へ戻る

---

# メモ作成方針

4コマの説明を書き直すのではない。

漫画で伝えきれなかった補足を書く。

以下を守ること。

- 説教しない
- AIを悪者にしない
- 人間を馬鹿扱いしない
- 不必要な改行を乱用しない
- 300文字以内
- 読後に納得感を残す

---

# post_inventory.md更新

追記先:

docs/agent/post_inventory.md

追記場所:

## 記事一覧

テーブル先頭

---

# 出力形式

| NNN | YYYY-MM-DD | タイトル | 何のAIあるあるか | 今回の距離感・教訓 | タグ1, タグ2, タグ3 | 似ている既存記事・重複回避メモ |

---

# index.html更新

追加先:

ルート直下の index.html

---

# 追加位置

最新記事の article.post-card の上

---

# 出力内容

以下を生成する。

例: 記事番号031の実例、画像ファイル名も以下参考に自動で決定する
```
      <article class="post-card">
        <a class="post-card-image" href="./posts/031.html">
          <img src="./assets/images/031-progress-stopped-by-confirmations.png"
            alt="確認指示を増やしすぎた結果、AIが何度も確認して作業が進まなくなる様子を描いた4コマ漫画" />
        </a>
        <div class="post-card-body">
          <p class="post-number">#031</p>
          <p class="post-date">
            <time datetime="2026-06-03">公開日 2026/6/3</time>
          </p>
          <h3>
            <a href="./posts/031.html">進まない理由、私だった</a>
          </h3>
          <p>
            「ミスしないで」と念押ししたら、AIが確認ばかりで全然進まない。
            慎重さとスピードのバランスを考える回。
          </p>
          <div class="tags" aria-label="タグ">
            <span>確認</span>
            <span>制約</span>
            <span>作業効率</span>
          </div>
        </div>
      </article>
```

---

# セルフレビュー

確認すること。

- 記事番号は正しいか
- 前回記事番号+1になっているか
- 画像パスは正しいか
- タイトルは一致しているか
- タグは一致しているか
- inventory内容と矛盾していないか
- indexカード内容と矛盾していないか

---

# 完了条件

以下が揃ったら完了。

- post_inventory追記内容
- posts/NNN.html全文
- index.html追加カード

---

# 完了時の動作

サイト更新用成果物が完成しました。
先ほど作成した画像は `assets/images/{画像ファイル名}` にリネームして配置してください。

ローカルで一度起動確認を行い、問題がなければ

```
- git add .
- git commit -m "add: post-{NNN}"
- git push
```

を実施してください。

これでGitHub側でCI/CDが実行されるため、本番環境へ反映されたことを確認してください。

これで今回の作業は終わりです。お疲れ様でした🍺