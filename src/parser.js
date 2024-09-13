import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

export default parseFile;
