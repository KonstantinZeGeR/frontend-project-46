#!/usr/bin/env node
import { Command } from "commander";
import parseFile from "./src/parser.js";

const program = new Command();
program
  .version("0.0.1")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);

    console.log("Data from file1:", JSON.stringify(file1Data, null, 2));
    console.log("Data from file2:", JSON.stringify(file2Data, null, 2));

    // Здесь далее можно будет добавить логику сравнения данных
  })
  .helpOption("-h, --help", "output usage information")
  .parse(process.argv);
