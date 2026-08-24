---
description: 要件から GitHub Issue を作成する（英日2言語）
---

引数: $ARGUMENTS（issue の要件・背景を自由記述で入力）

## 手順

### 1. 要件の確認

`$ARGUMENTS` の内容を読み、以下が推測できるか判断する:
- 何をしたいか（目的）
- なぜ必要か（背景）

不足している場合は何が足りないかを具体的に指摘し、追加情報を求める。

### 2. 草案作成

`.github/ISSUE_TEMPLATE/general.md` を参照し、以下の構成で草案を作りチャットに提示する。

**タイトル（英語）:** 簡潔な英語タイトル

**ラベル:** 内容から推定
- バグ修正 → `bug`
- 機能追加・改善 → `enhancement`
- ドキュメント → `documentation`
- その他 → なし

**本文（英日2言語）:**

```
## en

### Overview
<Brief description in English>

### Details
1. <Detail 1>
2. <Detail 2>

### Completion criteria
- [ ] <Criterion 1>

## jp

### 概要
<日本語での概要>

### 詳細
1. <詳細1>
2. <詳細2>

### 完了条件
- [ ] <完了条件1>
```

### 3. 確認

草案を提示してユーザーの OK を待つ。修正があれば反映して再提示。
**OK が出るまで issue を作成しない。**

### 4. ラベルの確認・作成

`gh label list` でラベルの存在を確認する。なければ `gh label create` で作成する。

### 5. issue の作成

```bash
gh issue create \
  --title "<タイトル>" \
  --body "<本文>" \
  --label "<ラベル>" \
  --assignee @me
```

作成後、issue の URL を表示する。
