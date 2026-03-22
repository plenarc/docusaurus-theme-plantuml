---
inclusion: auto
---

# Development Environment

## 実行環境
1. この開発環境は WSL2 (Ubuntu) 上で動作している
1. Kiro のシステム情報が `Operating System: Windows` と表示されることがあるが、実際のシェルは WSL2 の bash
1. コマンド実行時は必ず Linux/bash コマンドを使用すること
1. PowerShell コマンドや Windows コマンド(Get-ChildItem, Remove-Item 等)は使用禁止

## コマンド例
1. ファイル一覧: `ls -la`
1. ファイル削除: `rm file.txt`
1. ディレクトリ削除: `rm -rf dir`
1. ファイルコピー: `cp source.txt dest.txt`
1. ディレクトリ作成: `mkdir -p dir`
1. ファイル内容表示: `cat file.txt`
1. 検索: `grep -r "pattern" .`
1. コマンド連結: `&&`
