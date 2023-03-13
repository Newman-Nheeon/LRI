const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

sass.render({
  file: path.join(__dirname, 'sass', 'main.scss'),
  outFile: path.join(__dirname, 'public', 'main.css')
}, (err, result) => {
  if (err) throw err;
  fs.writeFileSync(path.join(__dirname, 'public', 'main.css'), result.css);
});