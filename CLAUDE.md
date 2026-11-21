# docusaurus-theme-plantuml プロジェクトガイドライン

## 言語ルール

issue・PR・README の**本文**はすべて英日2言語で記述する。

```
## en
（英語）

## jp
（日本語）
```

参考: https://github.com/plenarc/docusaurus-theme-plantuml/issues/7

### タイトルの扱い

issue・PR の**タイトルは英語のみ**とする（本文が英日2言語であっても）。タイトルは1つしか持てないため。

日本語のタイトルが必要な場合は、本文の1行目（`## en` の前）に置く。

```
start-issue のバージョン更新をプロジェクト側スクリプトへ移譲

## en
...
```

### チェックリストの扱い

チェックリストは `## Checklist` 見出しの下に**1つだけ**置く。`## en` / `## jp` の各セクション内に「Completion criteria」「完了条件」を作って重複させない。

各項目は英語を本文行、日本語訳をインデントした子項目にする（子項目はチェックボックスにしない）。チェック状態の正を1つに保つため。

```
## Checklist
- [ ] English checklist item
  - 日本語訳
- [ ] Another checklist item
  - もう1つの日本語訳
```

参考実装: https://github.com/plenarc/docusaurus-theme-plantuml/issues/40

## Git 使用ガイドライン

1. ファイルの作成・編集・削除は実行してよい
1. `git add`（ステージング）までは実行してよい
1. `git commit` は実行禁止（ユーザーが行う）
1. `git push` は実行禁止（ユーザーが行う）
1. `git fetch` や `git checkout` は必要に応じて実行してよい

## バージョン管理ルール

配布物（`package.json` の `files`: `lib`、`README.md`、`LICENSE`）に入る変更をコミットするときは、`package.json` のバージョンを上げる。配布物に入らない変更（`.claude/`、`docs/`、`.github/`、CI 設定、`CLAUDE.md` など）では上げない。

`publish.yaml` は main へ Merge するたびに未公開の版を publish するため、配布物に入らない変更で上げると、中身が前と同じ版が公開されてしまう。

バンプ幅はブランチ種別ではなく**変更内容**で決める。

| 変更内容 | バンプ | 例 |
|---|---|---|
| 公開 API の破壊的変更 | メジャー | `1.5.1` → `2.0.0` |
| `src/` の機能追加・改善 | マイナー | `1.5.1` → `1.6.0` |
| `src/` のバグ修正 | パッチ | `1.5.1` → `1.5.2` |
| `README.md`・`LICENSE` のみの変更 | パッチ | `1.5.1` → `1.5.2` |
| 配布物に入らない変更（`.claude/`、`docs/`、`.github/`、CI 設定など） | 上げない | `1.5.1` のまま |

配布物に入る変更と入らない変更が混在する場合は、配布物に入る変更の内容でバンプ幅を決める。

パッチバンプは `.claude/scripts/bump-version.sh` で行える。マイナー・メジャーは `package.json` を直接編集する。

依存関係を変更した場合は `pnpm-lock.yaml` もステージングに含める（バージョン変更のみの場合、lockfile に diff は出ない）。
