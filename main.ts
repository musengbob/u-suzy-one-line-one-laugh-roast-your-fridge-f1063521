// One Line, One Laugh: Roast Your Fridge
// Writes a single one-line roast of a fridge to entry.txt.
// No network, no credentials, no input files.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

function buildEntryLine(): string {
  return "My fridge hums like it's keeping a secret, then flips its light on at 2am and catches me stealing cheese like a disappointed parent who already knew.";
}

const ENTRY = buildEntryLine();

// Kit gate (RULES.txt): entry must be UTF-8 text of 1–200 characters, not only whitespace.
// A single sentence, no trailing newline: the gate counts every byte.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry fails the 1–200 character gate (got ${text.length})`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);

function resolveOutputDir(): string {
  return (
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    (process.env.MAKEFUN_BOT_DIR ? "/output" : join(process.cwd(), "output"))
  );
}

function resolveOutputPath(): string {
  return join(resolveOutputDir(), "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
