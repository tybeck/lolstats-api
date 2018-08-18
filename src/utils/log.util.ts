'use strict';

const chalk = require('chalk');

function Log (msg: string) {

  console.log(`${chalk.red('// lolstats - ')} ${msg}`);

  return Log;

}

export {

  Log

};