// scripts/generate-css.js
import fs from 'node:fs';

import { parse } from 'yaml';

const file = fs.readFileSync('src/content/config/theme.yaml', 'utf8');

const theme = parse(file);

const CUSTOM_CSS = theme.customCss?.code ?? '/* No custom CSS defined */';

const fileContent = `/* AUTO-GENERATED - DO NOT EDIT */\n\n${CUSTOM_CSS}`;

fs.writeFileSync('src/styles/generated-theme.css', fileContent);
