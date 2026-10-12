import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NamePrinter } from '../src/NamePrinter.js';
import { Name } from '../src/Name.js';

describe('NamePrinter', () => {
  it('prints each full name on its own line, in order', () => {
    const printed = [];
    const fakeOutput = { log: (message) => printed.push(message) };
    const names = [new Name(['Marin'], 'Alvarez'), new Name(['Hunter', 'Uriah', 'Mathew'], 'Clarke')];

    new NamePrinter(fakeOutput).print(names);

    assert.deepEqual(printed, ['Marin Alvarez', 'Hunter Uriah Mathew Clarke']);
  });
});
