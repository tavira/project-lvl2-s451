import _ from 'lodash';

const printArray = (value) => {
  const values = value.map(el => `${el}`).join(', ').trim();
  return `[${values}]`;
};

const printProperty = (prop) => {
  if (_.isPlainObject(prop)) {
    return '[complex value]';
  }
  if (Array.isArray(prop)) {
    return printArray(prop);
  }
  if (typeof prop === 'number') {
    return prop;
  }
  if (typeof prop === 'string') {
    return `'${prop}'`;
  }
  return prop;
};

const render = (ast) => {
  const buildDiff = (astree, elParentName = '') => {
    const printActions = {
      // unchanged: el => `Property '${elParentName}${el.key}' was not changed`,
      deleted: el => `Property '${elParentName}${el.key}' was removed`,
      added: el => `Property '${elParentName}${el.key}' was added with value: ${printProperty(el.valueAfter)}`,
      changed: el => `Property '${elParentName}${el.key}' was updated. From ${printProperty(el.valueBefore)} to ${printProperty(el.valueAfter)}`,
      parent: el => buildDiff(el.children, `${elParentName}${el.key}.`),
    };
    return `${astree.filter(el => el.type !== 'unchanged').map(el => printActions[el.type](el)).join('\n')}`;
  };
  return buildDiff(ast, '');
};

export default render;
