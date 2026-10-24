# workflow: docusaurus-theme-plantuml

## 設定

| 項目 | 値 |
| --- | --- |
| flow | pr |
| language | en-ja |
| bump | start-issue |
| bump-file | package.json |
| bump-rule | kind |
| checks | `nr format` → `nr lint` → `nr build` (CI の test.yaml と同じ) |
| implementer | subagents |
| after-merge | publish-on-main |

## ラベル

| 種別 | ラベル |
| --- | --- |
| 機能 | `enhancement` |
| バグ | `bug` |
| ドキュメント修正を含む | `documentation` |

## メモ

- `.github/workflows/publish.yaml` は main への push (= Merge) で npm publish する (Trusted Publishing / OIDC)。tag は版の記録用。パッケージ名は `docusaurus-theme-plantuml`
- issue 本文は `.github/ISSUE_TEMPLATE/general.md` に沿う
