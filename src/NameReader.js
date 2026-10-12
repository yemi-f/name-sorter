import { readFile } from 'node:fs/promises';

/**
 * Reads raw name entries from a text file, one name per line.
 * Surrounding whitespace is trimmed and blank lines are skipped.
 */
export class NameReader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    const content = await readFile(this.filePath, 'utf8');

    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
