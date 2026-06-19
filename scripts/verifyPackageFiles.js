const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

const normalize = (value) => value && value.replace(/^\.\//, '');
const packageFiles = new Set((pkg.files || []).map(normalize));

if (fs.existsSync(path.join(__dirname, '..', 'index.ts'))) {
  const typesEntry = normalize(pkg.types || pkg.typings);
  if (typesEntry !== 'index.d.ts') {
    throw new Error('package.json must expose the generated index.d.ts types');
  }
}

const requiredFiles = [pkg.main, pkg.types, pkg.typings].filter(Boolean);

for (const file of requiredFiles) {
  const normalized = normalize(file);
  if (!packageFiles.has(normalized)) {
    throw new Error(
      `package.json files must include ${normalized} referenced by package metadata`
    );
  }
}

console.log(
  `Verified package metadata files: ${requiredFiles
    .map((file) => path.posix.normalize(normalize(file)))
    .join(', ')}`
);
