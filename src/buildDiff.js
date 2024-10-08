import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'updated', // Изменено с 'updated' на 'changed'
        oldValue: value1, // Переименовано с 'valueBefore' на 'oldValue'
        newValue: value2, // Переименовано с 'valueAfter' на 'newValue'
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
  return result;
};

export default buildDiff;
