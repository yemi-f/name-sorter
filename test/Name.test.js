import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Name } from '../src/Name.js';

describe('Name', () => {
  it('accepts between 1 and 3 given names', () => {
    assert.doesNotThrow(() => new Name(['Marin'], 'Alvarez'));
    assert.doesNotThrow(() => new Name(['Hunter', 'Uriah', 'Mathew'], 'Clarke'));
  });

  it('rejects a name with no given names', () => {
    assert.throws(() => new Name([], 'Clarke'), /between 1 and 3 given names/);
  });

  it('rejects a name with more than three given names', () => {
    assert.throws(
      () => new Name(['Hunter', 'Uriah', 'Mathew', 'James'], 'Clarke'),
      /between 1 and 3 given names/
    );
  });

  it('rejects a name with no last name', () => {
    assert.throws(() => new Name(['Hunter'], ''), /last name/);
  });

  it('formats the full name with given names before the last name', () => {
    const name = new Name(['Adonis', 'Julius'], 'Archer');

    assert.equal(name.fullName, 'Adonis Julius Archer');
    assert.equal(String(name), 'Adonis Julius Archer');
  });

  it('cannot be changed after it is created', () => {
    const givenNames = ['Leo'];
    const name = new Name(givenNames, 'Gardner');

    givenNames.push('Changed');

    assert.deepEqual(name.givenNames, ['Leo']);
    assert.throws(() => {
      name.lastName = 'Other';
    }, TypeError);
  });
});
