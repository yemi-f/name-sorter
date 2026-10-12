/**
 * Runs the workflow: read, parse, sort, then print and write the result.
 *
 * Collaborators are injected and used only through their methods:
 * reader.read(), parser.parse(line), sorter.sort(names),
 * printer.print(names), writer.write(names).
 * Any of them can be swapped without changing this class.
 */
export class NameSorterApp {
  constructor({ reader, parser, sorter, printer, writer }) {
    this.reader = reader;
    this.parser = parser;
    this.sorter = sorter;
    this.printer = printer;
    this.writer = writer;
  }

  async run() {
    const lines = await this.reader.read();
    const names = lines.map((line) => this.parser.parse(line));
    const sortedNames = this.sorter.sort(names);

    this.printer.print(sortedNames);
    await this.writer.write(sortedNames);
  }
}
