import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const buildDiffString = (objectBefore, objectAfter) => {
  const unionKeysBeforeAfter = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  const combined = unionKeysBeforeAfter.map((key) => {
    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      return (objectBefore[key] === objectAfter[key])
        ? [`    ${key}: ${objectBefore[key]}`]
        : [`  + ${key}: ${objectAfter[key]}`, `  - ${key}: ${objectBefore[key]}`];
    }
    if (_.has(objectBefore, key) && !_.has(objectAfter, key)) {
      return [`  - ${key}: ${objectBefore[key]}`];
    }
    return [`  + ${key}: ${objectAfter[key]}`];
  });

  

  return `{\n${_.flatten([...combined]).join('\n')}\n}`;
};

const genDiff = (pathToFileBefore, pathToFileAfter) => {
  const readContent = pathToFile => fs.readFileSync(path.resolve('./', pathToFile), 'utf-8');

  const objectBefore = parse(readContent(pathToFileBefore), path.extname(pathToFileBefore));
  const objectAfter = parse(readContent(pathToFileAfter), path.extname(pathToFileAfter));

  return buildDiffString(objectBefore, objectAfter);
};

export default genDiff;
