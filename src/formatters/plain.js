const isComplexValue = (value) => typeof value === 'object' && value !== null;
const formatValue = (value) => {
  if (isComplexValue(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diffTree) => {
  const iter = (node, ancestry) => {
    const lines = node.flatMap((item) => {
      const property = [...ancestry, item.key].join('.');
      switch (item.type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(
            item.value,
          )}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was changed. From ${formatValue(
            item.oldValue,
          )} to ${formatValue(item.newValue)}`;
        case 'nested':
          return iter(item.children, [...ancestry, item.key]);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });
    return lines.join('\n');
  };
  return iter(diffTree, []);
};

export default plain;
