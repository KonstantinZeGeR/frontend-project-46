import stylish from './stylish.js';
import plain from './plain.js';

const format = (diffTree, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diffTree);
    case 'stylish':
      return stylish(diffTree);
    case 'json':
      return JSON.stringify(diffTree, null, 2);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
