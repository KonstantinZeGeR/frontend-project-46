import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const lines = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }

    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }

    if (data1[key] !== data2[key]) {
      return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
    }

    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${_.flatten(lines).join('\n')}\n}`;
};

export default generateDiff;

