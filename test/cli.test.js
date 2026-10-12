import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(projectRoot, 'bin', 'name-sorter.js');
const fixturesDir = path.join(projectRoot, 'test', 'fixtures');
const unsortedFixturePath = path.join(fixturesDir, 'unsorted-names.txt');
const sortedFixturePath = path.join(fixturesDir, 'sorted-names.txt');

describe('name-sorter command line', () => {
  let workingDir;

  beforeEach(async () => {
    workingDir = await mkdtemp(path.join(tmpdir(), 'name-sorter-cli-'));
  });

  afterEach(async () => {
    await rm(workingDir, { recursive: true, force: true });
  });

  it('prints the sorted names and writes them to sorted-names-list.txt', async () => {
    const { stdout } = await run('node', [cliPath, unsortedFixturePath], { cwd: workingDir });

    const expectedOutput = await readFile(sortedFixturePath, 'utf8');
    assert.equal(stdout, expectedOutput);
    const written = await readFile(path.join(workingDir, 'sorted-names-list.txt'), 'utf8');
    assert.equal(written, expectedOutput);
  });

  it('shows usage and fails when no file is given', async () => {
    await assert.rejects(() => run('node', [cliPath], { cwd: workingDir }), (error) => {
      assert.equal(error.code, 1);
      assert.match(error.stderr, /Usage: name-sorter/);
      return true;
    });
  });

  it('reports a missing input file and fails', async () => {
    await assert.rejects(() => run('node', [cliPath, 'missing.txt'], { cwd: workingDir }), (error) => {
      assert.equal(error.code, 1);
      assert.match(error.stderr, /could not find the file "missing.txt"/);
      return true;
    });
  });
});
