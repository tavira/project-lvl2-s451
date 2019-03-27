import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', '../__tests__/__fixtures__/result'],
  ['__tests__/__fixtures__/empty/empty.json', '__tests__/__fixtures__/empty/fulled.json', '../__tests__/__fixtures__/empty/resultIfEmptyFirst'],
  ['__tests__/__fixtures__/empty/fulled.json', '__tests__/__fixtures__/empty/empty.json', '../__tests__/__fixtures__/empty/resultIfEmptySecond'],
  ['__tests__/__fixtures__/after.json', '__tests__/__fixtures__/after.json', '../__tests__/__fixtures__/identityResult'],
  ['__tests__/__fixtures__/yml/before.yml', '__tests__/__fixtures__/yml/after.yml', '../__tests__/__fixtures__/yml/result'],
  ['__tests__/__fixtures__/yml/after.yml', '__tests__/__fixtures__/yml/after.yml', '../__tests__/__fixtures__/identityResult'],
  ['__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', '../__tests__/__fixtures__/ini/result'],
])(
  'diff between(%s, %s)',
  (pathBefore, pathAfter, pathExpected) => {
    const expected = fs.readFileSync(path.resolve(__dirname, pathExpected), 'utf-8');
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
