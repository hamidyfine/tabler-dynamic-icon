import fs from 'node:fs/promises';
import path from 'node:path';

const SRC_PATH = path.resolve(
    process.cwd(),
    'node_modules/@tabler/icons-webfont/dist/tabler-icons.css',
);

const OUT_DIR = path.resolve(process.cwd(), 'src/icon');
const OUT_FILE = path.join(OUT_DIR, 'icon.classes.ts');

const CLASS_NAME_RE = /\.ti-([a-z0-9-]+)\s*::?before\s*\{/gi;

async function main() {
    // READ
    const raw = await fs.readFile(SRC_PATH, 'utf8');

    // EXTRACT
    const names = new Set();
    for (const m of raw.matchAll(CLASS_NAME_RE)) {
        names.add(m[1]);
    }

    if (names.size === 0) {
        throw new Error('No icon selectors found. Check the CSS path or regex.');
    }

    // SORT
    const results = [...names].sort();

    // WRITE
    await fs.mkdir(OUT_DIR, { recursive: true });
    const classesType = toType('IconClasses', results);
    await fs.writeFile(OUT_FILE, classesType, 'utf8');

    console.log(`✅ Generated ${OUT_FILE} with ${results.length} icons.`);
}

function toType(typeName, names) {
    const header = '// Auto-generated from @tabler/icons-webfont — do not edit by hand\n';
    const typeDef =
    `export type ${typeName} =\n` +
    names.map((n) => `  | '${n}'`).join('\n') +
    ';\n';
    return header + '\n' + typeDef;
}

main().catch((err) => {
    console.error('❌ Failed to generate enum:', err);
    process.exit(1);
});
