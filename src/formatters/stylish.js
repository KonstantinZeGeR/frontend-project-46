// src/formatters/stylish.js

import _ from 'lodash';

const getIndent = (depth, spacesPerLevel = 4) => ' '.repeat(depth * spacesPerLevel - 2);
const getBracketIndent = (depth, spacesPerLevel = 4) => ' '.repeat((depth - 1) * spacesPerLevel);

// Функция stringify

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }

  const spacesPerLevel = 4;
  const currentIndent = getIndent(depth, spacesPerLevel);
  const bracketIndent = getBracketIndent(depth, spacesPerLevel);

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

// Функция stylish
const stylish = (tree, depth = 1) => {
  const spacesPerLevel = 4;
  const currentIndent = getIndent(depth, spacesPerLevel);

  const lines = tree.flatMap((node) => {
    const {
      key, type, value, valueBefore, valueAfter, children,
    } = node;

    switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return [
          `${currentIndent}- ${key}: ${stringify(valueBefore, depth + 1)}`,
          `${currentIndent}+ ${key}: ${stringify(valueAfter, depth + 1)}`,
        ].join('\n');
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`;
      case 'nested':
        return `${currentIndent}  ${key}: ${stylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  const bracketIndent = getBracketIndent(depth, spacesPerLevel);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default (diffTree) => stylish(diffTree);
