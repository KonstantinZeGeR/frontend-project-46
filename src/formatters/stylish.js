import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const getLine = (key, value, depth, sign) => {
  const indentSize = depth * 4 - 2;
  const currentIndent = ' '.repeat(indentSize);
  const line = `${currentIndent}${sign} ${key}: ${value}`;
  return line;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const keys = Object.keys(data);
  const lines = keys.map((key) => {
    const value = data[key];
    const stringValue = stringify(value, depth + 1);
    const line = getLine(key, stringValue, depth + 1, ' ');
    return line;
  });
  const indent = getIndent(depth);
  return `{\n${lines.join('\n')}\n${indent}}`;
};

const formatStylish = (diffTree) => {
  const iter = (node, depth) => {
    const lines = node.flatMap((item) => {
      const { key, type } = item;
      const indentSize = depth * 4 - 2;
      const currentIndent = ' '.repeat(indentSize);
      const nestedIndent = getIndent(depth);
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${key}: {\n${iter(item.children, depth + 1)}\n${nestedIndent}}`;
        case 'added':
          return getLine(key, stringify(item.value, depth), depth, '+');
        case 'removed':
          return getLine(key, stringify(item.value, depth), depth, '-');
        case 'unchanged':
          return getLine(key, stringify(item.value, depth), depth, ' ');
        case 'changed':
          return [
            getLine(key, stringify(item.oldValue, depth), depth, '-'),
            getLine(key, stringify(item.newValue, depth), depth, '+'),
          ];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return lines.join('\n');
  };

  return `{\n${iter(diffTree, 1)}\n}`;
};

export default formatStylish;
