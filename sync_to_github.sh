#!/bin/zsh

PROJECT_DIR="$HOME/Desktop/xy_workp/gre_voc_desktop"
BACKUP_REPO_DIR="$HOME/Desktop/xy_workp/gre_voc_system"

echo "PROJECT_DIR=$PROJECT_DIR"
echo "BACKUP_REPO_DIR=$BACKUP_REPO_DIR"

cp "$PROJECT_DIR/words.json" "$BACKUP_REPO_DIR/words.json"

cd "$BACKUP_REPO_DIR" || exit 1

git add words.json .gitignore

if git diff --cached --quiet; then
  echo "没有新的变化需要提交"
  exit 0
fi

git commit -m "Auto update words.json"
git push origin main

echo "同步完成"