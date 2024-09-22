import stylish from './stylish.js';

const format = (diffTree, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unknown formatter: ${formatterName}`);
  }
};

export default format;
