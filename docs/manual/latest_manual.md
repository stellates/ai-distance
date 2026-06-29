# webp変換コマンド

事前にcwebpのインストール必要

```
brew install webp
```

変換コマンドは以下

```
cwebp -q 85 -m 6 input.png -o output.webp
```

これで2MB→400KBぐらいまで見た目の品質を落とさずにファイルサイズ圧縮可能