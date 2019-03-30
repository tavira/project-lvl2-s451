import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPathsToTestFiles = (fileNameRecieved1, fileNameRecieved2, fileNameExpected) => {
  const basePath = '__tests__/__fixtures__';
  const ext = path.extname(fileNameRecieved1).substring(1);
  const pathToFile1 = `${basePath}/${ext}/${fileNameRecieved1}`;
  const pathToFile2 = `${basePath}/${ext}/${fileNameRecieved2}`;
  const pathToExpected = `${basePath}/result/${fileNameExpected}`;
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
  'diff as tree between(%s, %s)',
  (pathBefore, pathAfter, pathExpected) => {
    const format = 'tree';
    const expected = fs.readFileSync(path.resolve(pathExpected), 'utf-8');
    expect(gendiff(pathBefore, pathAfter, format)).toBe(expected);
  },
);

test.each([
  getPathsToTestFiles('before.json', 'after.json', 'plainResult'),
  getPathsToTestFiles('empty.json', 'fulled.json', 'plainResultIfEmptyFirst'),
  getPathsToTestFiles('fulled.json', 'empty.json', 'plainResultIfEmptySecond'),
  getPathsToTestFiles('after.json', 'after.json', 'plainIdentityResult'),
  getPathsToTestFiles('before.yml', 'after.yml', 'plainResult'),
  getPathsToTestFiles('after.yml', 'after.yml', 'plainIdentityResult'),
  getPathsToTestFiles('before.ini', 'after.ini', 'plainResult'),
  getPathsToTestFiles('nestedBefore.json', 'nestedAfter.json', 'plainNestedResult'),
  getPathsToTestFiles('nestedBefore.ini', 'nestedAfter.ini', 'plainNestedResult'),
  getPathsToTestFiles('nestedBefore.yml', 'nestedAfter.yml', 'plainNestedResult'),
  getPathsToTestFiles('nestedArrayBefore.json', 'nestedArrayAfter.json', 'plainNestedArrayResult'),
])(
  'diff as plain text between(%s, %s)',
  (pathBefore, pathAfter, pathExpected) => {
    const format = 'plain';
    const expected = fs.readFileSync(path.resolve(pathExpected), 'utf-8');
    expect(gendiff(pathBefore, pathAfter, format)).toBe(expected);
  },
);
