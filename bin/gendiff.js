#!/usr/bin/env node
import { program } from "commander";
import compareFiles from "../src/compareFiles.js";

program
  .version("0.0.1")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    compareFiles(filepath1, filepath2);
  })
  .parse(process.argv);
