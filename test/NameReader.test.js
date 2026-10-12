import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { NameReader } from '../src/NameReader.js';

describe('NameReader', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(tmpdir(), 'name-sorter-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('returns one entry per line', async () => {
    const filePath = path.join(tempDir, 'names.txt');
    await writeFile(filePath, 'Janet Parsons\nVaughn Lewis\n');

    const lines = await new NameReader(filePath).read();

    assert.deepEqual(lines, ['Janet Parsons', 'Vaughn Lewis']);
  });

  it('skips blank lines and trims whitespace', async () => {
    const filePath = path.join(tempDir, 'names.txt');
    await writeFile(filePath, '\n  Janet Parsons  \n\n   \nVaughn Lewis');

    const lines = await new NameReader(filePath).read();

    assert.deepEqual(lines, ['Janet Parsons', 'Vaughn Lewis']);
  });

  it('handles Windows line endings', async () => {
    const filePath = path.join(tempDir, 'names.txt');
    await writeFile(filePath, 'Janet Parsons\r\nVaughn Lewis\r\n');

    const lines = await new NameReader(filePath).read();

    assert.deepEqual(lines, ['Janet Parsons', 'Vaughn Lewis']);
  });

  it('rejects when the file does not exist', async () => {
    const reader = new NameReader(path.join(tempDir, 'missing.txt'));

    await assert.rejects(() => reader.read(), { code: 'ENOENT' });
  });
});
