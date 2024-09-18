import genDiff from '../src/generateDiff.js';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const expectedOutput = `{
  - follow: false
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff should return correct diff', () => {
  const data1 = JSON.parse(fs.readFileSync(jsonFile1));
  const data2 = JSON.parse(fs.readFileSync(jsonFile2));
  
  const diff = genDiff(data1, data2);
  expect(diff).toBe(expectedOutput);
});
