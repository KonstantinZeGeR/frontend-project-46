import parseJSON from './parser.js';

const compareFiles = (filePath1, filePath2) => {
  const data1 = parseJSON(filePath1);
  const data2 = parseJSON(filePath2);

  // Ваша логика сравнения данных должна быть здесь
  const result = `Difference between ${filePath1} and ${filePath2}`;
  console.log(result);
};

export default compareFiles;
