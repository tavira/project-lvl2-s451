import fs from 'fs';
import path from 'path';
// import  from 'jest';
import gendiff from '../src';

test('JSON - Check added and deleted property', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/result'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(received).toBe(expected);
});

test('JSON - Check output if first json is empty', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/empty/resultIfEmptyFirst'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/empty/empty.json', '__tests__/__fixtures__/empty/fulled.json');
  expect(received).toBe(expected);
});

test('JSON - Check output if second json is empty', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/empty/resultIfEmptySecond'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/empty/fulled.json', '__tests__/__fixtures__/empty/empty.json');
  expect(received).toBe(expected);
});

test('JSON - Check identity files', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/identityResult'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/after.json', '__tests__/__fixtures__/after.json');
  expect(received).toBe(expected);
});

test('YAML - Check added and deleted property', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/yml/result'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/yml/before.yml', '__tests__/__fixtures__/yml/after.yml');
  expect(received).toBe(expected);
});

test('YAML - Check identity files', () => {
  const expected = fs.readFileSync(path.resolve(__dirname, '../__tests__/__fixtures__/identityResult'), 'utf-8');
  const received = gendiff('__tests__/__fixtures__/yml/after.yml', '__tests__/__fixtures__/yml/after.yml');
  expect(received).toBe(expected);
});
