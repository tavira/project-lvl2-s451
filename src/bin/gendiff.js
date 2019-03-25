#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';

const description = 'Compares two configuration files and shows a difference.';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
