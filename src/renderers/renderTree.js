import _ from 'lodash';

const w = k => '  '.repeat(k);
const stringifyObject = (obj, depth = 0) => `{\n${Object.keys(obj).map(el => `${w(depth + 3)}${el}: ${obj[el]}`)}\n${w(depth + 1)}}`;
const stringifyArray = (arr) => {
  const items = arr.map(el => `${el}`).join(', ').trim();
  return `[${items}]`;
};

const stringify = (prop, depth) => {
  if (_.isPlainObject(prop)) {
    return stringifyObject(prop, depth);
  }
  if (Array.isArray(prop)) {
    return stringifyArray(prop);
  }
  return prop;
};

const render = (ast) => {
  const buildDiff = (astree, depth = 1) => {
    const actions = {
      unchanged: el => `${w(depth)}  ${el.key}: ${stringify(el.valueBefore, depth)}`,
      changed: el => [
        `${w(depth)}+ ${el.key}: ${stringify(el.valueAfter, depth)}`,
        `${w(depth)}- ${el.key}: ${stringify(el.valueBefore, depth)}`,
      ],
      deleted: el => `${w(depth)}- ${el.key}: ${stringify(el.valueBefore, depth)}`,
      added: el => `${w(depth)}+ ${el.key}: ${stringify(el.valueAfter, depth)}`,
      parent: el => `${w(depth)}  ${el.key}: ${buildDiff(el.children, depth + 2)}`,
    };
    return `{\n${_.flatten(astree.map(el => actions[el.type](el))).join('\n')}\n${w(depth - 1)}}`;
  };
  return buildDiff(ast);
};

export default render;
