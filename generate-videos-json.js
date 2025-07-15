// videos-list.js
const fs   = require('fs');
const path = require('path');

const dirPath     = path.join(__dirname, 'videos');      // папка с видео
const outputPath  = path.join(dirPath, 'videos.json');
const extensions  = ['.mp4', '.webm', '.ogg'];

const files = fs.readdirSync(dirPath)
  .filter(f => extensions.includes(path.extname(f).toLowerCase()))
  .map(fname => ({
      name: fname,
      mtime: fs.statSync(path.join(dirPath, fname)).mtimeMs   // время в мс
  }))
  .sort((a, b) => b.mtime - a.mtime)                          // ↓ новые сверху
  .map(({ name }) => name);                                   // оставляем только имена

fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
console.log('✅ videos.json создан и отсортирован по новизне.');
