# AIとのちょうどいい距離感 リポジトリ改修仕様書

## 目的

以下を実現する。

- index.html の肥大化解消
- スマホユーザーの初回通信量削減
- 記事データの一元管理
- HTML手編集箇所の削減
- ChatGPT / Codex による運用自動化の前提整備
- GitHub Pages → Cloudflare Pages 移行を見据えた構造整理

---

# サイト構成

## トップページ

### index.html

役割：

- サイト入口
- HERO表示
- 最新記事表示
- archives.htmlへの導線

表示内容：

- HERO
- サイト説明
- 最新記事（最新3件）
- archives.htmlへのリンク

記事一覧機能は持たない。

記事データは data/posts.json を読み込み、JavaScriptで描画する。

---

## 記事一覧

### archives.html

役割：

- 全記事一覧
- 検索
- タグ絞り込み

現在の index.html の機能を移植する。

記事データは data/posts.json を読み込み、JavaScriptで描画する。

漫画画像には lazy loading を適用する。

---

## 記事ページ

### article.html

役割：

- 個別記事表示

現在の

```text
/posts/001.html
/posts/002.html
...
```

形式は廃止する。

代わりに

```text
/article.html?id=001
/article.html?id=002
...
```

形式とする。

記事本文も data/posts.json から取得し、JavaScriptで描画する。

HTMLテンプレートは1枚のみ保持する。

---

# データ構造

## data/posts.json

サイト全体の唯一の正（Single Source of Truth）とする。

用途：

- 最新記事表示
- アーカイブ表示
- 検索
- タグ絞り込み
- 個別記事表示
- 重複チェック
- 新記事提案支援

---

## 廃止対象

### docs/agent/post_inventory.md

廃止する。

記事管理情報は posts.json に集約する。

今後の重複チェックや記事提案も posts.json を参照して実施する。

---

## 記事データ例

```json
{
  "id": 35,
  "title": "もう読んだの！？",
  "subtitle": "速すぎると、逆に信じられない。",
  "date": "2026-06-07",

  "theme": "AIが資料や添付ファイルを一瞬で処理するため本当に読んだのか不安になる",

  "distance": "AIを信じるか疑うかではなく、理解したか確認する",

  "summary": "長い資料を渡したら一瞬で要約。速すぎて逆に不安になる、人間とAIの感覚のズレを描く回。",

  "memo": [
    "本文1",
    "本文2",
    "本文3"
  ],

  "tags": [
    "添付ファイル",
    "要約",
    "確認大事"
  ],

  "image": {
    "file": "035.webp",
    "alt": "長い資料をAIに渡したら一瞬で要約され、本当に読んだのか疑ってしまう様子を描いた4コマ漫画"
  },

  "similarAvoid": "020との重複回避メモ",

  "updatedAt": "2026-06-07"
}
```

---

# 画像管理

## 保存形式

WebP

---

## 圧縮方式

lossless

---

## PNG

保存しない。

生成後に WebP 化し、GitHub 管理対象は WebP のみとする。

目的：

- GitHubストレージ削減
- 転送量削減

---

## 保存場所

```text
assets/images/
```

---

## 命名規則

初版

```text
001.webp
002.webp
035.webp
```

---

## 差し替え

```text
035-v2.webp
035-v3.webp
```

とする。

---

## 採用画像管理

posts.json 側で管理する。

例：

```json
"image": {
  "file": "035-v2.webp",
  "alt": "..."
}
```

画像差し替え時は posts.json を更新する。

これによりブラウザキャッシュを維持しつつ新画像配信を行う。

---

# キャッシュ方針

基本方針：

- HTMLは固定
- JavaScriptは固定
- CSSは固定
- 記事データのみ更新

---

## キャッシュ対象

```text
index.html
archives.html
article.html

styles.css

js/*
```

---

## 更新対象

```text
data/posts.json
```

---

## 画像

画像URL固定時はブラウザキャッシュ利用。

画像差し替え時のみ

```text
035.webp
↓
035-v2.webp
```

へ変更する。

---

# 運用フロー

## 00_start.md

役割：

- ChatGPT作業開始
- posts.json読込
- 最新状態確認

---

## 01_plan.md

役割：

- 新記事企画
- 重複チェック
- 記事確定

更新対象：

```text
data/posts.json
```

---

## 02_image.md

役割：

- キャラクター設計
- 4コマ構成
- セリフ作成
- 画像生成プロンプト作成
- 画像生成

---

## 03_check.md

役割：

- WebP変換
- ユーザーによる画像配置
- git pull
- ローカル確認
- git push

GitHub Actions / Cloudflare Pages による自動デプロイ前提

---

## 04_closing.md

役割：

- 本番環境確認
- 作業漏れ確認
- クロージング

---

# GitHub運用

可能な限り ChatGPT / Codex が GitHub ブランチ上で直接作業する。

目標：

- 人間はレビューと画像配置のみ
- データ更新とコード更新は自動化

---

# 残課題

- posts.json スキーマ確定
- article.html テンプレート設計
- archives.html 検索仕様設計
- Cloudflare Pages 移行
- GitHub Actions による posts.json 検証
- GitHub Actions による WebP 検証
- キャッシュポリシー最終確認
