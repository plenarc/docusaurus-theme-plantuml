# Implementation Plan: renderCodeBlockPuml Configuration Flag

`plantuml`および`puml`言語キーワードがPlantUMLダイアグラムレンダリングをトリガーするかどうかを制御する`renderCodeBlockPuml` boolean設定フラグを実装する。変更対象は4ファイル: 型定義、バリデーションスキーマ、CodeBlockコンポーネント、バリデーションテスト。後方互換性のため、フラグのデフォルト値は`false`。

## Tasks

- [-] 1. TypeScript型定義の更新
    - [~] 1.1 `src/theme-plantuml.d.ts`の`PlantumlConfig`インターフェースにオプションの`renderCodeBlockPuml?: boolean`プロパティをJSDocコメント付きで追加する
        - _Requirements: 4.1, 4.2_

- [~] 2. バリデーションスキーマとデフォルト値の更新
    - [~] 2.1 `src/validateThemeConfig.ts`の`DEFAULT_THEME_CONFIG.plantuml`に`renderCodeBlockPuml: false`を追加し、`plantumlSchema`に`renderCodeBlockPuml: Joi.boolean().optional().default(false)`を追加する
        - _Requirements: 1.1, 1.2, 1.3_

- [~] 3. バリデーションテストの追加
    - [~] 3.1 `src/__tests__/validateThemeConfig.test.js`に`renderCodeBlockPuml`のテストを追加する
        - `renderCodeBlockPuml`が未指定の場合にデフォルト値`false`になることをテスト
        - `renderCodeBlockPuml: true`が受け入れられ保持されることをテスト
        - `renderCodeBlockPuml: false`が受け入れられ保持されることをテスト
        - _Requirements: 5.1, 5.2, 5.3_
    - [ ]* 3.2 プロパティテスト: 非boolean値がバリデーションで拒否またはcoerceされることを検証する(`fast-check`使用、最低100イテレーション)
        - _Requirements: 1.3_
    - [ ]* 3.3 プロパティテスト: `renderCodeBlockPuml`なしの既存設定がバリデーション成功しデフォルト`false`が適用されることを検証する(`fast-check`使用、最低100イテレーション)
        - _Requirements: 3.3, 1.2_

- [~] 4. チェックポイント - 全テスト通過を確認
    - 全テストが通過することを確認する。問題があればユーザーに確認する。

- [~] 5. CodeBlockコンポーネントの更新
    - [ ] 5.1 `src/theme/CodeBlock/index.tsx`で`useThemeConfig`と`ThemeConfig`型をインポートし、`validLangs`をモジュールレベル定数からコンポーネント内の算出値に変更する。`baseValidLangs = ['pumld', 'plantuml-diagram']`を基に、`renderCodeBlockPuml`が`true`の場合に`['plantuml', 'puml']`を追加する。オプショナルチェーン(`plantuml?.renderCodeBlockPuml`)で安全にアクセスする。
        - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2_

- [~] 6. 最終チェックポイント - 全テスト通過とTypeScriptコンパイル確認
    - 全テストが通過することを確認する。`tsc`でTypeScriptコンパイルが成功することを検証する。

## Notes

1. `*`マーク付きのタスクはオプションであり、MVP迅速化のためスキップ可能
1. 各タスクはトレーサビリティのため特定の要件を参照する
1. プロパティテストは`fast-check`ライブラリを使用し、設計ドキュメントの正確性プロパティを検証する
1. テストは`node:test`と`node:assert/strict`を使用する(プロジェクト既存のテストフレームワーク)
