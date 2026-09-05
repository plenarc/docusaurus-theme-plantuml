# start-issue 固有ルール（docusaurus-theme-plantuml）

グローバル `start-issue` スキルの汎用手順に対する、このリポジトリだけの差分。矛盾する場合はこちらを優先する。

## バージョンの正

`package.json` の `version`。単一パッケージ（モノレポではない）。

## バンプ後の commit

- **コミット・プッシュはユーザーが行う。Claude は `git commit` を実行しない**（`git add` までは可）。
- バージョン変更のみの stage が終わったら、Conventional Commits 形式のコミットメッセージ案をコードブロックで提示して停止する（`feat:` / `fix:` / `chore:` など、変更種別に応じて）。
- コミット要約は日本語・英語どちらでもよい。

## `pnpm-lock.yaml`

このリポジトリの `pnpm-lock.yaml`（lockfileVersion 9）はパッケージ自身の `version` を保持しないため、`bump-version.sh` によるバージョンのみの変更では通常 diff が出ない。依存関係を追加・更新した場合のみ `pnpm-lock.yaml` も `git add` に含める。

## バージョン種別の判断

`bump-version.sh` はパッチ固定。CLAUDE.md のルール（`feature/` → マイナー、`bugfix/`・`hotfix/` → マイナー(API影響) または パッチ）でマイナーバンプが必要な場合は、`bump-version.sh` の出力後に手動で `package.json` の `minor` 桁を調整することをユーザーに確認する。

## issue・PR の言語

issue・PR 本文は英日2言語（`## en` / `## jp`）。チェックリストは1本のみ、各項目は英語を本文行・日本語を入れ子の補足行にする（`## Checklist` セクション、言語ごとの重複チェックリストは作らない）。参考実装: https://github.com/plenarc/docusaurus-theme-plantuml/issues/40
