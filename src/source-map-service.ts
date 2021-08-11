import chalk from 'chalk';
import { SourceMapConsumer } from 'source-map';
import * as fs from 'fs';
const path = require('path');

export class SourceMapService {
  constructor(private _sourceMapFolderPath: string) {}

  public originalPositionFor(generatedFileName: string, lineNumber: number, columnNumber: number): void {
    const filePath = path.join(this._sourceMapFolderPath, `${generatedFileName}.map`);
    console.log(chalk.cyan(`Source map folder : ${filePath}`));
    console.log(filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
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
