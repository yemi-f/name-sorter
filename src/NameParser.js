import { Name } from './Name.js';

/**
 * Turns a line of text such as "Hunter Uriah Mathew Clarke" into a Name.
 * The last word is the last name and every word before it is a given name.
 */
export class NameParser {
  parse(text) {
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    const lastName = words.pop();
    const givenNames = words;

    try {
      return new Name(givenNames, lastName);
    } catch (error) {
      throw new Error(`Invalid name "${text}": ${error.message}`, { cause: error });
    }
  }
}
