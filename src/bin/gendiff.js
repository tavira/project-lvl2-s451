#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';
import gendiff from '..';

const description = 'Compares two configuration files and shows a difference.';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = gendiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  });

program.parse(process.argv);
