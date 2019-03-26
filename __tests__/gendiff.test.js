import fs from 'fs';
import path from 'path';
// import  from 'jest';
import gendiff from '../src';

test('Check added and deleted property', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/result'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(received).toBe(expected);
});

test('Check output if first json is empty', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/empty/resultIfEmptyFirst'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/empty/empty.json', '__tests__/__fixtures__/empty/fulled.json');
  expect(received).toBe(expected);
});

test('Check output if second json is empty', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/empty/resultIfEmptySecond'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/empty/fulled.json', '__tests__/__fixtures__/empty/empty.json');
  expect(received).toBe(expected);
});

test('Check work if paths are absolute', () => {
  const expected = fs.readFileSync('/tmp/tests/result', 'utf-8');
  const received = gendiff('/tmp/tests/before.json', '/tmp/tests/after.json');
  expect(received).toBe(expected);
});
