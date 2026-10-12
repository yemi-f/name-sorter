/**
 * Orders names by last name first, then by each given name in turn.
 *
 * Comparison ignores letter case, so "smith" and "Smith" are treated as equal.
 */
export class NameSorter {
  #collator = new Intl.Collator('en', { sensitivity: 'base' });

  // Returns a new array; the input is not modified.
  sort(names) {
    return [...names].sort((a, b) => this.compare(a, b));
  }

  compare(a, b) {
    return (
      this.#compareWords(a.lastName, b.lastName) ||
      this.#compareGivenNames(a.givenNames, b.givenNames)
    );
  }

  /**
   * Compares given names one position at a time. When one list is a prefix of
   * the other (e.g. "Ann" vs "Ann Marie"), the shorter list comes first.
   */
  #compareGivenNames(a, b) {
    const sharedLength = Math.min(a.length, b.length);

    for (let i = 0; i < sharedLength; i++) {
      const result = this.#compareWords(a[i], b[i]);
      if (result !== 0) {
        return result;
      }
    }

    return a.length - b.length;
  }

  #compareWords(a, b) {
    return this.#collator.compare(a, b);
  }
}
