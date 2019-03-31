import _ from 'lodash';

const stringifyArray = (arr) => {
  const items = arr.map(el => `${el}`).join(', ').trim();
  return `[${items}]`;
};

const stringify = (prop) => {
  if (_.isPlainObject(prop)) {
    return '[complex value]';
  }
  if (Array.isArray(prop)) {
    return stringifyArray(prop);
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
    const actions = {
      deleted: el => `Property '${elParentName}${el.key}' was removed`,
      added: el => `Property '${elParentName}${el.key}' was added with value: ${stringify(el.valueAfter)}`,
      changed: el => `Property '${elParentName}${el.key}' was updated. From ${stringify(el.valueBefore)} to ${stringify(el.valueAfter)}`,
      parent: el => buildDiff(el.children, `${elParentName}${el.key}.`),
    };
    return `${astree.filter(el => el.type !== 'unchanged').map(el => actions[el.type](el)).join('\n')}`;
  };
  return buildDiff(ast, '');
};

export default render;
