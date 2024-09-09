#!/usr/bin/env node

import { program } from "commander";

program
  .version("0.0.1")
  .description("Compares two configuration files and shows a difference.")
  .option("-c, --config <type>", "set config");
program.helpOption("-h, --help", "display help for command");
program.parse(process.argv);
