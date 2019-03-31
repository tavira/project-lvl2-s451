import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPathsToFiles = (fileNameBefore, fileNameAfter, fileNameResult) => {
  const basePath = '__tests__/__fixtures__';
  const ext = path.extname(fileNameBefore).substring(1);
  return [
    path.resolve(basePath, ext, fileNameBefore),
    path.resolve(basePath, ext, fileNameAfter),
    path.resolve(basePath, 'result', fileNameResult),
  ];
};

const testFilesMapping = [
  ['before.json', 'after.json', 'result'],
  ['empty.json', 'fulled.json', 'resultIfEmptyFirst'],
  ['fulled.json', 'empty.json', 'resultIfEmptySecond'],
  ['after.json', 'after.json', 'identityResult'],
  ['before.yml', 'after.yml', 'result'],
  ['after.yml', 'after.yml', 'identityResult'],
  ['before.ini', 'after.ini', 'result'],
  ['nestedBefore.json', 'nestedAfter.json', 'nestedResult'],
  ['nestedBefore.ini', 'nestedAfter.ini', 'nestedResult'],
  ['nestedBefore.yml', 'nestedAfter.yml', 'nestedResult'],
  ['nestedArrayBefore.json', 'nestedArrayAfter.json', 'nestedArrayResult'],
  ['before.json', 'after.json', 'plainResult', 'plain'],
  ['empty.json', 'fulled.json', 'plainResultIfEmptyFirst', 'plain'],
  ['fulled.json', 'empty.json', 'plainResultIfEmptySecond', 'plain'],
  ['after.json', 'after.json', 'plainIdentityResult', 'plain'],
  ['before.yml', 'after.yml', 'plainResult', 'plain'],
  ['after.yml', 'after.yml', 'plainIdentityResult', 'plain'],
  ['before.ini', 'after.ini', 'plainResult', 'plain', 'plain'],
  ['nestedBefore.json', 'nestedAfter.json', 'plainNestedResult', 'plain'],
  ['nestedBefore.ini', 'nestedAfter.ini', 'plainNestedResult', 'plain'],
  ['nestedBefore.yml', 'nestedAfter.yml', 'plainNestedResult', 'plain'],
  ['nestedArrayBefore.json', 'nestedArrayAfter.json', 'plainNestedArrayResult', 'plain'],
  ['nestedArrayBefore.json', 'nestedArrayAfter.json', 'jsonNestedArrayResult', 'json'],
  ['before.ini', 'after.ini', 'jsonResult', 'json'],
  ['nestedBefore.yml', 'nestedAfter.yml', 'jsonNestedResult', 'json'],
];

test.each(testFilesMapping)(
  'diff between(%s, %s) ',
  (fileNameBefore, fileNameAfter, fileNameResult, format = 'tree') => {
    const [
      pathBefore,
      pathAfter,
      pathExpected,
    ] = getPathsToFiles(fileNameBefore, fileNameAfter, fileNameResult);
    expect(gendiff(pathBefore, pathAfter, format)).toBe(fs.readFileSync(pathExpected, 'utf-8'));
  },
);
