const fs = require('fs');
const path = require('path');

function fixImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const fixedContent = content.replace(
    /from\s+['"](\.\/.+?)['"];/g,
    (match, importPath) => {
      if (!importPath.endsWith('.js')) {
        return match.replace(importPath, importPath + '.js');
      }
      return match;
    }
  );
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(` Imports corrigés dans ${filePath}`);
  }
}

function processJsFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(` Dossier ${dir} non trouvé !`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processJsFiles(filePath);
    } else if (file.endsWith('.js')) {
      fixImports(filePath);
    }
  });
}

processJsFiles('./dist');
console.log(' Correction des imports terminée !'); 