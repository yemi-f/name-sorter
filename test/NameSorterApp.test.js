import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { NameSorterApp } from '../src/NameSorterApp.js';

// Builds the app with pass-through collaborators; each test overrides only what it checks.
function createApp({
  lines = [],
  parse = (line) => line,
  sort = (names) => names,
  printer = { print() {} },
  writer = { write: async () => {} },
} = {}) {
  return new NameSorterApp({
    reader: { read: async () => lines },
    parser: { parse },
    sorter: { sort },
    printer,
    writer,
  });
}

describe('NameSorterApp', () => {
  it('parses every line from the reader', async () => {
    const parse = mock.fn((line) => line);

    await createApp({ lines: ['Janet Parsons', 'Marin Alvarez'], parse }).run();

    const parsedLines = parse.mock.calls.map((call) => call.arguments[0]);
    assert.deepEqual(parsedLines, ['Janet Parsons', 'Marin Alvarez']);
  });

  it('sorts the parsed names', async () => {
    const sort = mock.fn((names) => names);

    await createApp({ lines: ['a', 'b'], parse: (line) => `parsed ${line}`, sort }).run();

    assert.equal(sort.mock.callCount(), 1);
    assert.deepEqual(sort.mock.calls[0].arguments[0], ['parsed a', 'parsed b']);
  });

  it("prints and writes the sorter's result", async () => {
    const sortedNames = ['sorted result'];
    const printer = { print: mock.fn() };
    const writer = { write: mock.fn(async () => {}) };

    await createApp({ sort: () => sortedNames, printer, writer }).run();

    assert.equal(printer.print.mock.callCount(), 1);
    assert.equal(printer.print.mock.calls[0].arguments[0], sortedNames);
    assert.equal(writer.write.mock.callCount(), 1);
    assert.equal(writer.write.mock.calls[0].arguments[0], sortedNames);
  });

  it('prints and writes nothing when a line cannot be parsed', async () => {
    const printer = { print: mock.fn() };
    const writer = { write: mock.fn(async () => {}) };
    const parse = () => {
      throw new Error('cannot parse');
    };

    await assert.rejects(createApp({ lines: ['bad'], parse, printer, writer }).run(), /cannot parse/);
    assert.equal(printer.print.mock.callCount(), 0);
    assert.equal(writer.write.mock.callCount(), 0);
  });
});
