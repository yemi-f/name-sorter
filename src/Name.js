const MIN_GIVEN_NAMES = 1;
const MAX_GIVEN_NAMES = 3;

/**
 * A person's name: one to three given names followed by a last name.
 *
 * Validation happens here, so any Name that exists is valid.
 * Instances are immutable.
 */
export class Name {
  constructor(givenNames, lastName) {
    if (givenNames.length < MIN_GIVEN_NAMES || givenNames.length > MAX_GIVEN_NAMES) {
      throw new Error(
        `A name must have between ${MIN_GIVEN_NAMES} and ${MAX_GIVEN_NAMES} given names, ` +
          `but ${givenNames.length} were provided.`
      );
    }
    if (!lastName) {
      throw new Error('A name must have a last name.');
    }

    this.givenNames = Object.freeze([...givenNames]);
    this.lastName = lastName;
    Object.freeze(this);
  }

  /** The name as it is written, e.g. "Hunter Uriah Mathew Clarke". */
  get fullName() {
    return [...this.givenNames, this.lastName].join(' ');
  }

  toString() {
    return this.fullName;
  }
}
