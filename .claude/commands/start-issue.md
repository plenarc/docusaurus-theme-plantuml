---
description: issue に着手する。ブランチ作成→仕様確認→coderで実装→tester/reviewerで検証→バージョン更新→コミット文提示まで(コミットはしない)。
---

引数: $ARGUMENTS （着手する issue 番号。例: `123`）

以下の手順で issue に着手する。各ステップの結果を簡潔に報告しながら進める。

## 1. issue の把握

- `gh issue view $ARGUMENTS` で本文・ラベル・チェックリストを読む。
- 種別を判定し、根拠(ラベル/本文)を一言で示す:
  - 機能追加・改善 → **機能**
  - バグ修正 → **バグ**
  - ドキュメントのみ → **ドキュメント**

## 2. ブランチ作成

- `git checkout main && git pull --ff-only` で最新化する。
- ブランチ名は必ず命名規約に従う:
  <https://plenarc.github.io/specment/docs/internal/policies/branch-naming-rules>
  - 機能 / ドキュメント: `feature/#$ARGUMENTS-{summary}-{yyyymmdd}`
  - バグ: `bugfix/#$ARGUMENTS-{summary}-{yyyymmdd}`
  - `{summary}` … issue 内容を表す英語ケバブケース(短く)
  - `{yyyymmdd}` … `date +%Y%m%d` の出力
- ブランチ名は `#` を含むためクォートする。例:
  `git checkout -b "feature/#$ARGUMENTS-add-foo-$(date +%Y%m%d)"`

## 3. 段取りの提示と確認(go 待ち)

実装に入る前に以下を提示する:

- 対象仕様(＝満たすべき issue の完了条件)
- 変更対象ファイル/箇所の見込み
- 実装の段取り

そのうえで「この方針で進めていいですか？ `go` で開始します」と確認し、ユーザーの **`go` を待つ**。
go があるまで実装しない。

## 4. 実装

- `coder` サブエージェントに実装させる(Task tool, subagent_type: `coder`)。issue 番号と完了条件を渡す。

## 5. 検証(指摘が消えるまで反復)

- `tester` サブエージェントで動作確認・完了条件の充足を検証する。
- `reviewer` サブエージェントで差分をレビューする。
- 指摘があれば `coder` に修正させ、再度 `tester`/`reviewer`。**指摘がゼロになるまで繰り返す**。

## 6. バージョン更新

`package.json` の version を種別に応じて更新する:

- 機能変更(`.claude/` の変更を含む) … マイナー +1、パッチを 0(例 `1.3.2` → `1.4.0`)
- ドキュメント / バグ修正のみ … パッチ +1(例 `1.3.2` → `1.3.3`)

更新後、`git add package.json` を実行する。

## 7. コミット文の提示(自分ではコミットしない)

- 変更ファイルを `git add` する。
- Conventional Commits 形式のコミットメッセージを、コピペしやすいようコードブロックで囲んで提示する
  (種別に合わせて `feat:` / `fix:` / `docs:` / `chore:`。1行目に要約、必要なら本文)。
- **コミット・プッシュは実行しない**。

## 8. 案内

「確認して問題なければ commit & push してください」と促す。
