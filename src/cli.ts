#!/usr/bin/env node
import { exit } from 'process';
import { SourceMapService } from './source-map-service';
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
clear();
console.log(chalk.red(figlet.textSync('source-map', { horizontalLayout: 'full' })));
const yargs = require('yargs');
yargs
  .scriptName('source-map-cli')
  .usage('Usage: $0 -s <source-maps-folder|url-to-source-map>')
  .command(
    ['originalPositionFor <position>'],
    'Find original position for the specified generated position',
    (yargs: any) => {
      yargs.positional('position', {
        describe: 'original position',
        type: 'string',
      });
    },
    (argv: any) => {
      const postion: string = argv.position;
      const positionTab = postion.split(':');
      if (positionTab.length !== 3 || isNaN(parseInt(positionTab[1])) || isNaN(parseInt(positionTab[2]))) {
        console.error(chalk.red('Postion should looks like "file.js:x:y" where x is the line number and y the column number.'));
        exit(-1);
      }

      const generatedFileName = positionTab[0];
      const lineNumber = parseInt(positionTab[1]);
      const columnNumber = parseInt(positionTab[2]);

      const sourceMapService = new SourceMapService(argv.s);
      sourceMapService.originalPositionFor(generatedFileName, lineNumber, columnNumber);
    }
  )
  .demandCommand()
  .option('s', { alias: 'source-maps-folder', describe: 'Folder containing source maps', type: 'string', demandOption: true }).argv;

/* References:
 * - https://galdin.dev/blog/writing-a-node-console-app-in-typescript/
 * - https://github.com/mozilla/source-map/
 * - https://medium.com/@trungutt/yet-another-explanation-on-sourcemap-669797e418ce
 * - https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
 * - https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89
 * - https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
 * - https://walrus.ai/blog/2019/11/typescript-cli/
 */
