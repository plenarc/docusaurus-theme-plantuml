# docusaurus-theme-plantuml プロジェクトガイドライン

## 言語ルール

issue・PR・README はすべて英日2言語で記述する。

```
## en
（英語）

## jp
（日本語）
```

参考: https://github.com/plenarc/docusaurus-theme-plantuml/issues/7

## Git 使用ガイドライン

1. ファイルの作成・編集・削除は実行してよい
1. `git add`（ステージング）までは実行してよい
1. `git commit` は実行禁止（ユーザーが行う）
1. `git push` は実行禁止（ユーザーが行う）
1. `git fetch` や `git checkout` は必要に応じて実行してよい

## バージョン管理ルール

| ブランチ種別 | バンプ対象 | 例 |
|---|---|---|
| `feature/` | マイナー | `1.3.2` → `1.4.0` |
| `bugfix/` `hotfix/` | マイナー（公開APIへの影響がある修正） または パッチ | `1.3.2` → `1.3.3` |

コミット時は `package.json` と `pnpm-lock.yaml` を必ずステージングに含める。
