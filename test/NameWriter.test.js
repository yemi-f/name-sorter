import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { NameWriter } from '../src/NameWriter.js';
import { Name } from '../src/Name.js';

describe('NameWriter', () => {
  let tempDir;
  let filePath;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(tmpdir(), 'name-sorter-'));
    filePath = path.join(tempDir, 'sorted-names-list.txt');
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('writes one full name per line', async () => {
    const names = [new Name(['Marin'], 'Alvarez'), new Name(['Adonis', 'Julius'], 'Archer')];

    await new NameWriter(filePath).write(names);

    assert.equal(await readFile(filePath, 'utf8'), 'Marin Alvarez\nAdonis Julius Archer\n');
  });

  it('overwrites an existing file', async () => {
    await writeFile(filePath, 'old content that should disappear\n');

    await new NameWriter(filePath).write([new Name(['Leo'], 'Gardner')]);

    assert.equal(await readFile(filePath, 'utf8'), 'Leo Gardner\n');
  });

  it('writes an empty file when there are no names', async () => {
    await new NameWriter(filePath).write([]);

    assert.equal(await readFile(filePath, 'utf8'), '');
  });
});
