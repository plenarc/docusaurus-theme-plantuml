---
description: Merge 後の後処理。publish は Merge(push to main)で起動済み。タグ/リリースを記録し、publish成否とnpm versionを確認。
---

Merge 済みであることが前提。

## 1. main へ切替え・最新化

- `git checkout main && git fetch --prune && git pull`

## 2. タグ作成・push(記録用)

- `VERSION=$(jq -r .version package.json)`
- `git tag "v$VERSION" && git push origin "v$VERSION"`
  - 注: `.github/workflows/publish.yaml` は **main への push(＝Merge)で既に npm publish をトリガー済み**。
    このタグは版の記録用(npm publish のトリガーではない)。

## 3. GitHub リリース作成

- `gh release create "v$VERSION" --generate-notes`

## 4. publish の確認

- `gh run list --workflow=publish.yaml` で **Merge により起動した** publish の成否を確認する(failed なら内容を提示)。
- `npm view docusaurus-theme-plantuml version` が `$VERSION` と一致することを確認する。

## 5. issue の close 確認

- 関連 issue が close されたか確認し、漏れがあれば `gh issue close` する。
