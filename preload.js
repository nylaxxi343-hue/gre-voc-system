const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

const wordsFilePath = path.join(__dirname, 'words.json');

function readWords() {
  try {
    if (!fs.existsSync(wordsFilePath)) {
      fs.writeFileSync(wordsFilePath, '[]', 'utf-8');
    }
    const raw = fs.readFileSync(wordsFilePath, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    console.error('读取 words.json 失败:', error);
    return [];
  }
}

function saveWords(words) {
  try {
    fs.writeFileSync(wordsFilePath, JSON.stringify(words, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('保存 words.json 失败:', error);
    return { success: false, error: error.message };
  }
}

contextBridge.exposeInMainWorld('desktopWordsAPI', {
  readWords,
  saveWords
});