# NNN Design

## Control Block

```yaml
article_id: NNN
branch: agent/article-NNN
current_state: start
next_recommended_command: /theme NNN
steps:
  theme: pending
  html: pending
  index-card: pending
  inventory: pending
  image-design: pending
  image-prompt: pending
  image: pending
  verify: pending
  publish: pending
```

## Theme Design

```yaml
title:
subtitle:
issue:
lesson:
similar_or_avoid:
```

## Inventory Entry

```yaml
id: NNN
date: YYYY-MM-DD
title:
theme:
distance:
tags: []
similar_or_avoid:
```

## HTML Artifacts

```yaml
post_path: posts/NNN.html
image_filename: NNN-kebab-case-topic.webp
image_path: ../assets/images/NNN-kebab-case-topic.webp
og_image: ../assets/images/NNN-kebab-case-topic.webp
title:
subtitle:
description:
date: YYYY-MM-DD
tags: []
```

## Index Card

```yaml
href: ./posts/NNN.html
image_src: ./assets/images/NNN-kebab-case-topic.webp
alt:
number: "#NNN"
date: YYYY-MM-DD
date_label:
title:
summary:
tags: []
insert_before:
```

## Image Design

```yaml
title:
theme:
core_joke:
learning:
image_filename: NNN-kebab-case-topic.webp
panels:
  1:
  2:
  3:
  4:
```

## Image Prompt Notes

```yaml
reference: docs/agent/image_prompt_sample.md
prompt_status: pending
prompt_text: |
prompt_order:
  - シリーズ基本設定
  - 全体レイアウト
  - 画風固定
  - キャラクター一貫性
  - 衣装固定
  - テーマカラー
  - 文字と読みやすさ
  - 4コマ台本
  - 最下部まとめ
  - 最終チェック
```

## Verification Log

```yaml
status: pending
checked_at:
checks: []
fixes: []
```

## Notes

- 必要な補足だけを短く残す。
