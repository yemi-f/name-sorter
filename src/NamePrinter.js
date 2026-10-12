/**
 * Prints names to the screen, one per line.
 * Output defaults to the console; tests pass a fake.
 */
export class NamePrinter {
  constructor(output = console) {
    this.output = output;
  }

  print(names) {
    for (const name of names) {
      this.output.log(name.fullName);
    }
  }
}
