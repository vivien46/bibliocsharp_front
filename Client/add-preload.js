import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

// Chemins vers les fichiers du build
const distDir = resolve('dist');
const manifestPath = join(distDir, '.vite', 'manifest.json');
const indexHtmlPath = join(distDir, 'index.html');

// Vérifiez si le fichier `manifest.json` existe
if (!existsSync(manifestPath)) {
  throw new Error('Le fichier manifest.json est introuvable. Vérifiez que Vite l\'a généré correctement.');
}

// Charger le manifest.json
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

// Charger index.html
let indexHtml = readFileSync(indexHtmlPath, 'utf-8');

// Ajouter les balises preload pour chaque fichier d'entrée
for (const key in manifest) {
  if (manifest[key].isEntry) {
    const file = manifest[key].file;
    const css = manifest[key].css || [];

    // Ajouter preload pour les fichiers CSS
    css.forEach((cssFile) => {
      indexHtml = indexHtml.replace(
        '</head>',
        `<link rel="preload" as="style" href="/${cssFile}" crossorigin="anonymous">\n</head>`
      );

      // Ajouter preload pour le fichier JS
      indexHtml = indexHtml.replace(
        '</head>',
        `<link rel="preload" as="script" href="/${file}" crossorigin="anonymous">\n</head>`
      );

    });
  }
}

// Sauvegarder les modifications dans index.html
writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
console.log('Balises preload ajoutées à index.html');
