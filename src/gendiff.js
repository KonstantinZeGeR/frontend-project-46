import parseJSON from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseJSON(filePath1);
  const data2 = parseJSON(filePath2);

  // Ваша логика сравнения данных должна быть здесь
  const result = `Difference between ${data1} and ${data2}`;
  console.log(result);
};

export default genDiff;
