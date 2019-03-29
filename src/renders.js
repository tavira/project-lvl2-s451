import _ from 'lodash';

const w = k => '  '.repeat(k);
const printObject = (value, depth = 0) => `{\n${Object.keys(value).map(el => `${w(depth + 3)}${el}: ${value[el]}`)}\n${w(depth + 1)}}`;
const printArray = (value) => {
  const values = value.map(el => `${el}`).join(', ').trim();
  return `[${values}]`;
};

const printProperty = (value, depth) => {
  if (_.isPlainObject(value)) {
    return printObject(value, depth);
  }
  if (Array.isArray(value)) {
    return printArray(value);
  }
  return value;
};

const buildDiffAsString = (ast) => {
  const buildDiff = (astree, depth = 1) => {
    const printActions = {
      unchanged: el => `${w(depth)}  ${el.key}: ${printProperty(el.valueBefore, depth)}`,
      changed: el => `${w(depth)}+ ${el.key}: ${printProperty(el.valueAfter, depth)}\n${w(depth)}- ${el.key}: ${printProperty(el.valueBefore, depth)}`,
      deleted: el => `${w(depth)}- ${el.key}: ${printProperty(el.valueBefore, depth)}`,
      added: el => `${w(depth)}+ ${el.key}: ${printProperty(el.valueAfter, depth)}`,
      nested: el => `${w(depth)}  ${el.key}: ${buildDiff(el.children, depth + 2)}`,
    };
    return `{\n${astree.map(el => printActions[el.state](el)).join('\n')}\n${w(depth - 1)}}`;
  };
  return buildDiff(ast);
};

export default buildDiffAsString;
