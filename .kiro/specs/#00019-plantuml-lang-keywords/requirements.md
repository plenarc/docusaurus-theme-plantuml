# Requirements Document

## Introduction
### en
1. This document defines the requirements for adding `plantuml` and `puml` as valid language keywords for PlantUML code block rendering in the `docusaurus-theme-plantuml` package
1. Currently, only `pumld` and `plantuml-diagram` are recognized as valid language keywords in `src/theme/CodeBlock/index.tsx`
1. A new boolean configuration flag `renderCodeBlockPuml` will be introduced to control whether `plantuml` and `puml` trigger PlantUML diagram rendering
1. The flag defaults to `false` to maintain backward compatibility, since `plantuml` and `puml` are commonly used for syntax-highlighted code blocks in existing Docusaurus sites

### ja
1. 本ドキュメントは、`docusaurus-theme-plantuml`パッケージにおいて、`plantuml`および`puml`をPlantUMLコードブロックレンダリングの有効な言語キーワードとして追加するための要件を定義する
1. 現在、`src/theme/CodeBlock/index.tsx`では`pumld`と`plantuml-diagram`のみが有効な言語キーワードとして認識されている
1. 新しいboolean設定フラグ`renderCodeBlockPuml`を導入し、`plantuml`および`puml`がPlantUMLダイアグラムレンダリングをトリガーするかどうかを制御する
1. 既存のDocusaurusサイトでは`plantuml`や`puml`がシンタックスハイライト付きコードブロックとして一般的に使用されているため、後方互換性を維持するためにフラグのデフォルト値は`false`とする

## Glossary
### en
1. **CodeBlock_Component**: The React component at `src/theme/CodeBlock/index.tsx` that determines how code blocks are rendered based on the language keyword
1. **Theme_Config**: The configuration object defined in `docusaurus.config.js` under the `plantuml` key, validated by `src/validateThemeConfig.ts`
1. **renderCodeBlockPuml**: A boolean configuration flag within Theme_Config that controls whether `plantuml` and `puml` language keywords trigger PlantUML diagram rendering
1. **Valid_Language_Keywords**: The set of language identifiers (specified in code fence blocks) that trigger PlantUML diagram rendering instead of standard code block rendering
1. **PlantUML_Component**: The React component at `src/theme/PlantUML` that renders PlantUML diagrams via a PlantUML server

### ja
1. **CodeBlock_Component**: `src/theme/CodeBlock/index.tsx`にあるReactコンポーネント。言語キーワードに基づいてコードブロックのレンダリング方法を決定する
1. **Theme_Config**: `docusaurus.config.js`の`plantuml`キー配下に定義される設定オブジェクト。`src/validateThemeConfig.ts`によりバリデーションされる
1. **renderCodeBlockPuml**: Theme_Config内のboolean設定フラグ。`plantuml`および`puml`言語キーワードがPlantUMLダイアグラムレンダリングをトリガーするかどうかを制御する
1. **Valid_Language_Keywords**: PlantUMLダイアグラムレンダリングをトリガーする言語識別子の集合(コードフェンスブロックで指定)
1. **PlantUML_Component**: `src/theme/PlantUML`にあるReactコンポーネント。PlantUMLサーバー経由でPlantUMLダイアグラムをレンダリングする

## Requirements

### Requirement 1: Add renderCodeBlockPuml Configuration Flag

**User Story:**
### en
1. As a site administrator, I want a configuration flag to control whether `plantuml` and `puml` language keywords render as PlantUML diagrams, so that I can opt in to this behavior without breaking existing syntax-highlighted code blocks

### ja
1. サイト管理者として、`plantuml`および`puml`言語キーワードがPlantUMLダイアグラムとしてレンダリングされるかどうかを制御する設定フラグが欲しい。これにより、既存のシンタックスハイライト付きコードブロックを壊すことなく、この動作をオプトインできる

#### Acceptance Criteria
### en

1. THE Theme_Config SHALL accept an optional `renderCodeBlockPuml` boolean field within the `plantuml` configuration object
1. WHEN `renderCodeBlockPuml` is not provided in the configuration, THE Theme_Config SHALL default `renderCodeBlockPuml` to `false`
1. THE Theme_Config SHALL validate that `renderCodeBlockPuml` is a boolean value when provided

### ja
1. Theme_Configは、`plantuml`設定オブジェクト内にオプションの`renderCodeBlockPuml` booleanフィールドを受け入れなければならない
1. 設定で`renderCodeBlockPuml`が提供されない場合、Theme_Configは`renderCodeBlockPuml`のデフォルト値を`false`に設定しなければならない
1. Theme_Configは、`renderCodeBlockPuml`が提供された場合、boolean値であることをバリデーションしなければならない

### Requirement 2: Extend Valid Language Keywords Based on Configuration

**User Story:**
### en
1. As a documentation author, I want to use `plantuml` or `puml` as language keywords in code fence blocks to render PlantUML diagrams, so that I can use intuitive and commonly recognized language identifiers

### ja
1. ドキュメント作成者として、コードフェンスブロックで`plantuml`または`puml`を言語キーワードとして使用してPlantUMLダイアグラムをレンダリングしたい。これにより、直感的で一般的に認識されている言語識別子を使用できる

#### Acceptance Criteria
### en
1. WHILE `renderCodeBlockPuml` is set to `true`, THE CodeBlock_Component SHALL include `plantuml` and `puml` in the Valid_Language_Keywords
1. WHILE `renderCodeBlockPuml` is set to `false`, THE CodeBlock_Component SHALL use only `pumld` and `plantuml-diagram` as Valid_Language_Keywords
1. WHILE `renderCodeBlockPuml` is set to `true`, WHEN a code fence block specifies `plantuml` as the language, THE CodeBlock_Component SHALL render the content using the PlantUML_Component
1. WHILE `renderCodeBlockPuml` is set to `true`, WHEN a code fence block specifies `puml` as the language, THE CodeBlock_Component SHALL render the content using the PlantUML_Component

### ja
1. `renderCodeBlockPuml`が`true`に設定されている間、CodeBlock_ComponentはValid_Language_Keywordsに`plantuml`と`puml`を含めなければならない
1. `renderCodeBlockPuml`が`false`に設定されている間、CodeBlock_Componentは`pumld`と`plantuml-diagram`のみをValid_Language_Keywordsとして使用しなければならない
1. `renderCodeBlockPuml`が`true`に設定されている間、コードフェンスブロックが言語として`plantuml`を指定した場合、CodeBlock_ComponentはPlantUML_Componentを使用してコンテンツをレンダリングしなければならない
1. `renderCodeBlockPuml`が`true`に設定されている間、コードフェンスブロックが言語として`puml`を指定した場合、CodeBlock_ComponentはPlantUML_Componentを使用してコンテンツをレンダリングしなければならない

### Requirement 3: Backward Compatibility

**User Story:**
### en
1. As an existing user of docusaurus-theme-plantuml, I want the default behavior to remain unchanged after this update, so that my existing site continues to work without modification

### ja
1. docusaurus-theme-plantumlの既存ユーザーとして、このアップデート後もデフォルトの動作が変わらないことを望む。これにより、既存のサイトが変更なしで引き続き動作する

#### Acceptance Criteria
### en
1. WHEN a site upgrades to the new version without changing configuration, THE CodeBlock_Component SHALL render `pumld` and `plantuml-diagram` code blocks as PlantUML diagrams
1. WHEN a site upgrades to the new version without changing configuration, THE CodeBlock_Component SHALL render `plantuml` and `puml` code blocks as standard syntax-highlighted code blocks
1. THE Theme_Config SHALL accept existing configurations without the `renderCodeBlockPuml` field and produce identical behavior to the previous version

### ja
1. サイトが設定を変更せずに新バージョンにアップグレードした場合、CodeBlock_Componentは`pumld`と`plantuml-diagram`コードブロックをPlantUMLダイアグラムとしてレンダリングしなければならない
1. サイトが設定を変更せずに新バージョンにアップグレードした場合、CodeBlock_Componentは`plantuml`と`puml`コードブロックを標準のシンタックスハイライト付きコードブロックとしてレンダリングしなければならない
1. Theme_Configは、`renderCodeBlockPuml`フィールドなしの既存の設定を受け入れ、以前のバージョンと同一の動作を生成しなければならない

### Requirement 4: Update TypeScript Type Definitions

**User Story:**
### en
1. As a TypeScript developer, I want the type definitions to include the `renderCodeBlockPuml` field, so that I get proper type checking and autocompletion when configuring the theme

### ja
1. TypeScript開発者として、型定義に`renderCodeBlockPuml`フィールドが含まれていることを望む。これにより、テーマ設定時に適切な型チェックとオートコンプリートが得られる

#### Acceptance Criteria
### en
1. THE PlantumlConfig interface in `src/theme-plantuml.d.ts` SHALL include an optional `renderCodeBlockPuml` boolean property
1. THE PlantumlConfig interface SHALL document the `renderCodeBlockPuml` property with a JSDoc comment describing its purpose and default value

### ja
1. `src/theme-plantuml.d.ts`のPlantumlConfigインターフェースは、オプションの`renderCodeBlockPuml` booleanプロパティを含まなければならない
1. PlantumlConfigインターフェースは、`renderCodeBlockPuml`プロパティの目的とデフォルト値を説明するJSDocコメントを記載しなければならない

### Requirement 5: Update Validation Tests

**User Story:**
### en
1. As a developer, I want validation tests to cover the `renderCodeBlockPuml` configuration flag, so that configuration behavior is verified and regressions are prevented

### ja
1. 開発者として、`renderCodeBlockPuml`設定フラグをカバーするバリデーションテストが欲しい。これにより、設定の動作が検証され、リグレッションが防止される

#### Acceptance Criteria
### en
1. WHEN `renderCodeBlockPuml` is not provided in the configuration, THE validation test SHALL verify that `renderCodeBlockPuml` defaults to `false`
1. WHEN `renderCodeBlockPuml` is set to `true`, THE validation test SHALL verify that the value is accepted and preserved
1. WHEN `renderCodeBlockPuml` is set to `false`, THE validation test SHALL verify that the value is accepted and preserved

### ja
1. 設定で`renderCodeBlockPuml`が提供されない場合、バリデーションテストは`renderCodeBlockPuml`のデフォルト値が`false`であることを検証しなければならない
1. `renderCodeBlockPuml`が`true`に設定された場合、バリデーションテストはその値が受け入れられ保持されることを検証しなければならない
1. `renderCodeBlockPuml`が`false`に設定された場合、バリデーションテストはその値が受け入れられ保持されることを検証しなければならない
