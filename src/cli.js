/**
 * Command-line interface: name-sorter <path-to-unsorted-names-file>
 *
 * This is the only place that knows which concrete classes are used. It wires
 * them together and turns failures into a readable message and exit code.
 */
import path from 'node:path';
import { NameParser } from './NameParser.js';
import { NamePrinter } from './NamePrinter.js';
import { NameReader } from './NameReader.js';
import { NameSorter } from './NameSorter.js';
import { NameSorterApp } from './NameSorterApp.js';
import { NameWriter } from './NameWriter.js';

const OUTPUT_FILE_NAME = 'sorted-names-list.txt';
const USAGE = 'Usage: name-sorter <path-to-unsorted-names-file>';

export async function main(args) {
  const inputFilePath = args[0];

  if (!inputFilePath) {
    console.error(USAGE);
    return 1;
  }

  const app = new NameSorterApp({
    reader: new NameReader(inputFilePath),
    parser: new NameParser(),
    sorter: new NameSorter(),
    printer: new NamePrinter(),
    writer: new NameWriter(path.join(process.cwd(), OUTPUT_FILE_NAME)),
  });

  try {
    await app.run();
    return 0;
  } catch (error) {
    console.error(describeError(error, inputFilePath));
    return 1;
  }
}

function describeError(error, inputFilePath) {
  if (error.code === 'ENOENT') {
    return `Error: could not find the file "${inputFilePath}".`;
  }
  return `Error: ${error.message}`;
}
