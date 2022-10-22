#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../src/page-loader.js';

const program = new Command();

program
  .description('Page loader utility')
  .version('0.0.1', '-v, --version', 'output version number')
  .option('-o, --output [dir]', 'output dir (default: "/home/user/current-dir")')
  .action((url, dir) => {
    pageLoader(url, dir);
  });

program.parse();
