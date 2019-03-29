import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPathsToTestFiles = (fileNameRecieved1, fileNameRecieved2, fileNameExpected) => {
  const basePath = '__tests__/__fixtures__';
  const ext = path.extname(fileNameRecieved1).substring(1);
  const pathToFile1 = `${basePath}/${ext}/${fileNameRecieved1}`;
  const pathToFile2 = `${basePath}/${ext}/${fileNameRecieved2}`;
  const pathToExpected = `${basePath}/${ext}/${fileNameExpected}`;
  return [pathToFile1, pathToFile2, pathToExpected];
};


test.each([
  getPathsToTestFiles('before.json', 'after.json', 'result'),
  getPathsToTestFiles('empty.json', 'fulled.json', 'resultIfEmptyFirst'),
  getPathsToTestFiles('fulled.json', 'empty.json', 'resultIfEmptySecond'),
  getPathsToTestFiles('after.json', 'after.json', 'identityResult'),
  getPathsToTestFiles('before.yml', 'after.yml', 'result'),
  getPathsToTestFiles('after.yml', 'after.yml', 'identityResult'),
  getPathsToTestFiles('before.ini', 'after.ini', 'result'),
  getPathsToTestFiles('nestedBefore.json', 'nestedAfter.json', 'nestedResult'),
  getPathsToTestFiles('nestedBefore.ini', 'nestedAfter.ini', 'nestedResult'),
  getPathsToTestFiles('nestedBefore.yml', 'nestedAfter.yml', 'nestedResult'),
  getPathsToTestFiles('nestedArrayBefore.json', 'nestedArrayAfter.json', 'nestedArrayResult'),
])(
  'diff between(%s, %s)',
  (pathBefore, pathAfter, pathExpected) => {
    const expected = fs.readFileSync(path.resolve(pathExpected), 'utf-8');
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
