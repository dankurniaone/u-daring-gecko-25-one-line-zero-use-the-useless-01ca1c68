// One Line, Zero Use: The Useless Superpower Sprint
// Entry: a single original one-liner (<=200 chars) naming a hilariously
// useless superpower. The program writes the line to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I can see exactly three seconds into the future, but only when nothing interesting is about to happen.";

// The grader reads /output/entry.txt. If /output is not writable in some
// sandbox, fall back to a local output directory next to the entry.
const OUT_DIRS = ["/output", "./output"];

function main(): void {
  const line = LINE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  let lastError: unknown = null;
  for (const dir of OUT_DIRS) {
    try {
      mkdirSync(dir, { recursive: true });
      const file = join(dir, "entry.txt");
      writeFileSync(file, line, "utf8");
      console.log(`wrote ${line.length} chars to ${file}`);
      console.log(line);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

main();
