import chalk from 'chalk';
import { SourceMapConsumer } from 'source-map';
import * as fs from 'fs';
const path = require('path');

export class SourceMapService {
  constructor(private _sourceMapFolderPath: string) {}

  public originalPositionFor(generatedFileName: string, lineNumber: number, columnNumber: number): void {
    const filePath = path.join(this._sourceMapFolderPath, `${generatedFileName}`);
    const sourceMapFilePath = `${filePath}.map`;
    console.log(`According to source map : '${chalk.green(sourceMapFilePath)}'`);
    console.log(
      `Generated file: '${chalk.green(filePath)}', line number: ${chalk.yellow(lineNumber)}, column number: ${chalk.yellow(
        columnNumber
      )} maps to:`
    );
    fs.readFile(sourceMapFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const whatever = SourceMapConsumer.with(data, null, (consumer) => {
        console.log(
          consumer.originalPositionFor({
            line: lineNumber,
            column: columnNumber,
          })
        );
      });
    });
  }
}
