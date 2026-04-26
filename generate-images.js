const fs = require('fs');
const path = require('path');

const exts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
const args = process.argv.slice(2);
const folders = args.length ? args : ['Images', 'Portfolio/Vana'];
const root = process.cwd();

let images = [];

folders.forEach(folder => {
  const folderPath = path.join(root, folder);
  if (!fs.existsSync(folderPath)) {
    console.warn('Folder not found:', folderPath);
    return;
  }
  const entries = fs.readdirSync(folderPath);
  entries.forEach(entry => {
    const full = path.join(folderPath, entry);
    const stat = fs.statSync(full);
    if (stat.isFile()) {
      const ext = path.extname(entry).toLowerCase();
      if (exts.has(ext)) {
        const rel = folder.replace(/\\/g, '/') + '/' + entry;
        images.push(rel);
      }
    }
  });
});

images = images.sort((a,b) => a.localeCompare(b, undefined, {sensitivity:'base'}));

const outPath = path.join(root, 'images.json');
fs.writeFileSync(outPath, JSON.stringify(images, null, 2), 'utf8');
console.log('Wrote', outPath, 'with', images.length, 'images');
