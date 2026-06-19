// scripts/generate-css.js
import fs from 'node:fs';

// biome-ignore lint/style/noRestrictedImports: Must use relative import here
import config from '../src/config/site.json' with { type: 'json' };

const CUSTOM_CSS = config.theme?.customCSS || '/* No custom CSS defined */';

const fileContent = `/* AUTO-GENERATED - DO NOT EDIT */\n\n${CUSTOM_CSS}`;

fs.writeFileSync('src/styles/generated-theme.css', fileContent);
