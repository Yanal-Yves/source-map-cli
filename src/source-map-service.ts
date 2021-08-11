import chalk from 'chalk';
import { SourceMapConsumer } from 'source-map';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
const path = require('path');

export class SourceMapService {
  constructor(private _sourceMapFolderPath: string) {}

  public originalPositionFor(generatedFileName: string, lineNumber: number, columnNumber: number): void {
    const regExp = /^http[s]?:\/\//;
    const filePath = regExp.test(this._sourceMapFolderPath)
      ? new URL(`${generatedFileName}`, this._sourceMapFolderPath).href
      : path.join(this._sourceMapFolderPath, `${generatedFileName}`);
    const sourceMapFilePath = `${filePath}.map`;
    console.log(`According to source map : '${chalk.green(sourceMapFilePath)}'`);
    console.log(
      `Generated file: '${chalk.green(filePath)}', line number: ${chalk.yellow(lineNumber)}, column number: ${chalk.yellow(
        columnNumber
      )} maps to:`
    );

    if (regExp.test(this._sourceMapFolderPath)) {
      this.loadSourceMap(sourceMapFilePath, (res) => {
        this.originalPositionForInternal(res.data, lineNumber, columnNumber);
      });
    } else {
      fs.readFile(sourceMapFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        this.originalPositionForInternal(data, lineNumber, columnNumber);
      });
    }
  }

  private loadSourceMap(sourceMapFilePath: string, onfulfilled: (value: AxiosResponse<any>) => void) {
    axios({
      method: 'get',
      url: sourceMapFilePath,
    })
      .then((res) => {
        onfulfilled(res);
      })
      .catch((err) => {
        console.log(chalk.red(`Source map not found from ${sourceMapFilePath}`));
        const log = chalk.red(err);
        console.log(log);
      });
  }

  private originalPositionForInternal(rawSourceMap: string, lineNumber: number, columnNumber: number): void {
    SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
      console.log(
        consumer.originalPositionFor({
          line: lineNumber,
          column: columnNumber,
        })
      );
    });
  }
}
