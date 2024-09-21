import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const extname = path.extname(filepath).toLowerCase();

  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extension: ${extname}`);
  }
};

export default parseFile;
