import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NameParser } from '../src/NameParser.js';

describe('NameParser', () => {
  const parser = new NameParser();

  it('treats the last word as the last name and the rest as given names', () => {
    const name = parser.parse('Hunter Uriah Mathew Clarke');

    assert.deepEqual(name.givenNames, ['Hunter', 'Uriah', 'Mathew']);
    assert.equal(name.lastName, 'Clarke');
  });

  it('parses a name with a single given name', () => {
    const name = parser.parse('Janet Parsons');

    assert.deepEqual(name.givenNames, ['Janet']);
    assert.equal(name.lastName, 'Parsons');
  });

  it('ignores extra whitespace around and between words', () => {
    const name = parser.parse('  Beau \t Tristan   Bentley  ');

    assert.equal(name.fullName, 'Beau Tristan Bentley');
  });

  it('names the offending text when the name is invalid', () => {
    assert.throws(() => parser.parse('Clarke'), /Invalid name "Clarke"/);
  });
});
