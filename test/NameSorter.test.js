import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NameParser } from '../src/NameParser.js';
import { NameSorter } from '../src/NameSorter.js';

const parser = new NameParser();
const sorter = new NameSorter();

/** Sorts plain strings so each test reads as "this list becomes that list". */
function sortFullNames(fullNames) {
  return sorter.sort(fullNames.map((text) => parser.parse(text))).map((name) => name.fullName);
}

describe('NameSorter', () => {
  it('orders names by last name', () => {
    assert.deepEqual(sortFullNames(['Janet Parsons', 'Marin Alvarez', 'Leo Gardner']), [
      'Marin Alvarez',
      'Leo Gardner',
      'Janet Parsons',
    ]);
  });

  it('breaks last name ties using the first given name', () => {
    assert.deepEqual(sortFullNames(['Zoe Smith', 'Adam Smith']), ['Adam Smith', 'Zoe Smith']);
  });

  it('breaks ties on earlier given names using later given names', () => {
    assert.deepEqual(sortFullNames(['Ann Zara Smith', 'Ann Beth Smith']), [
      'Ann Beth Smith',
      'Ann Zara Smith',
    ]);
  });

  it('places a name with fewer given names first when the others match', () => {
    assert.deepEqual(sortFullNames(['Ann Marie Smith', 'Ann Smith']), [
      'Ann Smith',
      'Ann Marie Smith',
    ]);
  });

  it('compares given names word by word rather than as one string', () => {
    // As a single string "Ann Marie" < "Anna", but "Ann" < "Anna" is what matters.
    assert.deepEqual(sortFullNames(['Anna Smith', 'Ann Marie Smith']), [
      'Ann Marie Smith',
      'Anna Smith',
    ]);
  });

  it('ignores letter case', () => {
    assert.deepEqual(sortFullNames(['Bob smith', 'Amy Smith', 'Cal adams']), [
      'Cal adams',
      'Amy Smith',
      'Bob smith',
    ]);
  });

  it('does not modify the input array', () => {
    const names = ['Janet Parsons', 'Marin Alvarez'].map((text) => parser.parse(text));
    const original = [...names];

    sorter.sort(names);

    assert.deepEqual(names, original);
  });

  it('handles an empty list', () => {
    assert.deepEqual(sorter.sort([]), []);
  });
});
