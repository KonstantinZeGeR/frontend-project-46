import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

test('gendiff for nested JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected_nested.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('gendiff for nested YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected_nested.txt'));
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('genDiff plain format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const result = genDiff(filepath1, filepath2, 'plain');
  console.log(result);
  expect(result).toEqual(expected);
});
