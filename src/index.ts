#!/usr/bin/env node
import * as fs from 'fs';
import { SourceMapConsumer } from 'source-map';
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');

clear();
console.log(
  chalk.red(
    figlet.textSync('source-map', { horizontalLayout: 'full' })
  )
);

const yargs = require('yargs');
const options = yargs
  // TODO $0 shows bin.js
 .usage("Usage: $0 -s <source-maps-folder> -f <file> -l <line> -c <column>")
 .option("s", { alias: "source-maps-folder", describe: "Folder containing source maps", type: "string", demandOption: true })
 .option("f", { alias: "file", describe: "JavaScript file name", type: "string", demandOption: true })
 .option("l", { alias: "line", describe: "Line number", type: "number", default: 1, demandOption: true })
 .option("c", { alias: "column", describe: "Column number", type: "number", demandOption: true })
 .argv;

 const filePath = path.join(options.sourceMapsFolder, `${options.file}.map`);
console.log(chalk.cyan(`Source map folder : ${filePath}`));
console.log(filePath);
fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const whatever = SourceMapConsumer.with(data, null, consumer => {
    console.log(
      consumer.originalPositionFor({
        line: options.line,
        column: options.column
      })
    );
  });
})

/* References:
 * - https://galdin.dev/blog/writing-a-node-console-app-in-typescript/
 * - https://github.com/mozilla/source-map/
 * - https://medium.com/@trungutt/yet-another-explanation-on-sourcemap-669797e418ce
 * - https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
 */
