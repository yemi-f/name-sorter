import { writeFile } from 'node:fs/promises';

/**
 * Writes names to a text file, one per line, replacing any existing content.
 */
export class NameWriter {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async write(names) {
    const content = names.map((name) => `${name.fullName}\n`).join('');
    await writeFile(this.filePath, content, 'utf8');
  }
}
