import { promises as fs } from 'node:fs';
import path from 'node:path';

const SRC_PATH = path.resolve(
    process.cwd(),
    'node_modules/@tabler/icons-react/dist/tabler-icons-react.d.ts',
);

const OUT_DIR = path.resolve(process.cwd(), 'src/icon');
const OUT_FILE = path.join(OUT_DIR, 'icon.enums.ts');

const AS_EXPORT_RE = /\bas\s+(Icon[A-Za-z0-9_]+)\b/g;
const DECL_CONST_RE = /\bdeclare\s+const\s+(Icon[A-Za-z0-9_]+)\b/g;

async function main() {
    const raw = await fs.readFile(SRC_PATH, 'utf8');

    const results = [];
    const seen = new Set();

    // 1) Matches from "as IconX"
    for (const m of raw.matchAll(AS_EXPORT_RE)) {
        const name = m[1];
        if (!seen.has(name)) {
            seen.add(name);
            results.push(name);
        }
    }

    // 2) Matches from "declare const IconX"
    for (const m of raw.matchAll(DECL_CONST_RE)) {
        const name = m[1];
        if (!seen.has(name)) {
            seen.add(name);
            results.push(name);
        }
    }

    if (results.length === 0) {
        throw new Error(
            'No icon names were found. The .d.ts structure might have changed.',
        );
    }

    results.sort((a, b) => a.localeCompare(b));

    // Ensure output dir exists
    await fs.mkdir(OUT_DIR, { recursive: true });

    // Write enum
    const enumCode = toEnum('IconsName', results);
    await fs.writeFile(OUT_FILE, enumCode, 'utf8');

    console.log(`✅ Generated ${OUT_FILE} with ${results.length} icons.`);
}

function toEnum(enumName, names) {
    const header = '// Auto-generated from @tabler/icons-react.d.ts — do not edit by hand\n';
    const enumBody =
    `export enum ${enumName} {\n` +
    names.map((n) => `  ${n} = "${n}",`).join('\n') +
    '\n}\n';
    return header + '\n' + enumBody;
}

main().catch((err) => {
    console.error('❌ Failed to generate enum:', err);
    process.exit(1);
});
