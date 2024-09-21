#!/usr/bin/env node
import { Command } from 'commander';
import parseFile from '../src/parser.js';
import genDiff from '../src/index.js';

const program = new Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1); // Добавлено для парсинга данных из файлов
    const data2 = parseFile(filepath2);
    const diff = genDiff(data1, data2);
    console.log('Data from file1:', JSON.stringify(data1, null, 2));
    console.log('Data from file2:', JSON.stringify(data2, null, 2));
    console.log(diff);

    // Здесь далее можно будет добавить логику сравнения данных
  })
  .parse(process.argv);
