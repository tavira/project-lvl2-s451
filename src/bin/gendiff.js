#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';
import gendiff from '..';

const description = 'Compares two configuration files and shows a difference.';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = gendiff(firstConfig, secondConfig);
    console.log(diff);
  });

program.parse(process.argv);
