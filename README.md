# Name Sorter

Sorts names by last name, then by given names. Each name has 1–3 given names followed by a last name.

## Requirements

Node.js 22+. No dependencies.

## Run

```sh
npm link                                   # one-time: installs the `name-sorter` command
name-sorter ./unsorted-names-list.txt
```

Or without installing:

```sh
node bin/name-sorter.js ./unsorted-names-list.txt
```

The sorted names are printed and written to `sorted-names-list.txt` in the current directory. To remove the command: `npm unlink -g name-sorter`.

## Sorting rules

- Last name first.
- If last names match, given names are compared one at a time, in order.
- If one set of given names is the start of the other (`Ann Smith` vs `Ann Marie Smith`), the shorter one comes first.
- Letter case is ignored.

## Invalid input

The input has one name per line; blank lines are ignored. If a line has fewer than 1 or more than 3 given names, the tool prints an error naming that line, exits with code `1`, and writes nothing.

## Test

```sh
npm test
```

## Structure

```
bin/name-sorter.js       Executable; calls main() in src/cli.js
src/
  cli.js                 Reads arguments, wires the classes together, reports errors
  Name.js                A name; enforces 1–3 given names
  NameParser.js          Text line → Name
  NameSorter.js          Ordering: last name, then given names (case-insensitive)
  NameSorterApp.js       Read → parse → sort → print and write
  NameReader.js          Reads non-blank lines from a file
  NamePrinter.js         Prints names to the screen
  NameWriter.js          Writes names to a file
test/                    One test file per class, plus cli.test.js (end-to-end)
  fixtures/              Input and expected output for the CLI test
```

Only `src/cli.js` chooses the concrete classes. `NameSorterApp` receives its collaborators through its constructor, so any of them can be swapped without changing it.
