import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test.each([
  ['__tests__/__fixtures__/json/before.json', '__tests__/__fixtures__/json/after.json', '../__tests__/__fixtures__/json/result'],
  ['__tests__/__fixtures__/empty/empty.json', '__tests__/__fixtures__/empty/fulled.json', '../__tests__/__fixtures__/empty/resultIfEmptyFirst'],
  ['__tests__/__fixtures__/empty/fulled.json', '__tests__/__fixtures__/empty/empty.json', '../__tests__/__fixtures__/empty/resultIfEmptySecond'],
  ['__tests__/__fixtures__/json/after.json', '__tests__/__fixtures__/json/after.json', '../__tests__/__fixtures__/json/identityResult'],
  ['__tests__/__fixtures__/yml/before.yml', '__tests__/__fixtures__/yml/after.yml', '../__tests__/__fixtures__/yml/result'],
  ['__tests__/__fixtures__/yml/after.yml', '__tests__/__fixtures__/yml/after.yml', '../__tests__/__fixtures__/yml/identityResult'],
  ['__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', '../__tests__/__fixtures__/ini/result'],
  ['__tests__/__fixtures__/json/nestedBefore.json', '__tests__/__fixtures__/json/nestedAfter.json', '../__tests__/__fixtures__/json/nestedResult'],
  ['__tests__/__fixtures__/yml/nestedBefore.yml', '__tests__/__fixtures__/yml/nestedAfter.yml', '../__tests__/__fixtures__/yml/nestedResult'],
  ['__tests__/__fixtures__/ini/nestedBefore.ini', '__tests__/__fixtures__/ini/nestedAfter.ini', '../__tests__/__fixtures__/ini/nestedResult'],
  ['__tests__/__fixtures__/json/nestedArrayBefore.json', '__tests__/__fixtures__/json/nestedArrayAfter.json', '../__tests__/__fixtures__/json/nestedArrayResult'],
])(
  'diff between(%s, %s)',
  (pathBefore, pathAfter, pathExpected) => {
    const expected = fs.readFileSync(path.resolve(__dirname, pathExpected), 'utf-8');
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
