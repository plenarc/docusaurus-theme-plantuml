---
description: 現在のブランチから draft PR を作成する。issue特定→Closes/チェックリスト転記→ラベル付与まで。
---

commit & push 済みであることが前提。

## 1. issue の特定

- `git branch --show-current` のブランチ名の `#{issue}` 部分から対象 issue 番号を取得する。
- `gh issue view {issue}` で本文・チェックリスト・種別を確認する。

## 2. PR 作成

- `gh pr create --draft --base main --assignee @me` で作成する。
- タイトルは Conventional Commits 準拠の要約にする。
- 本文に必ず `Closes #{issue}` を含める。

## 3. チェックリスト転記

- issue のチェックリスト項目を PR 本文のチェックリストに `- [ ]` 形式で転記する。

## 4. ラベル付与

種別に応じてラベルを付与する:

- 機能 → `enhancement`
- バグ → `bug`
- ドキュメント修正を含む → `documentation`

ラベルが存在しなければ `gh label create` で作成してから付与する。

## 5. 案内

完了後「/verify-pr 可能です」と伝える。
