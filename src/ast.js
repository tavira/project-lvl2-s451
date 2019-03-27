import _ from 'lodash';

const isObject = obj => (!(obj instanceof Array)) && obj instanceof Object;

const buildAst = (objectBefore, objectAfter) => {
  const root = {};

  const unionKeysBeforeAfter = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  const combined = unionKeysBeforeAfter.reduce((acc, key) => {
    if (_.has(objectBefore, key) && _.has(objectAfter, key)) {
      if (isObject(objectBefore[key]) && isObject(objectAfter[key])) {
        const prop = {
          [key]: {
            children: buildAst(objectBefore[key], objectAfter[key]),
            state: 'nested',
          },
        };
        return { ...acc, ...prop };
      }
      if ((isObject(objectBefore[key]) && !isObject(objectAfter[key]))
        || (!isObject(objectBefore[key]) && isObject(objectAfter[key]))) {
        const prop = {
          [key]: {
            value: objectBefore[key],
            valueAfter: objectAfter[key],
            state: 'changed',
          },
        };
        return { ...acc, ...prop };
      }
      if (objectBefore[key] === objectAfter[key]) {
        const prop = {
          [key]: {
            value: objectBefore[key],
            state: 'unchanged',
          },
        };
        return { ...acc, ...prop };
      }
      const prop = {
        [key]: {
          value: objectBefore[key],
          valueAfter: objectAfter[key],
          state: 'changed',
        },
      };
      return { ...acc, ...prop };
    }
    if (!_.has(objectBefore, key) && _.has(objectAfter, key)) {
      const prop = {
        [key]: {
          valueAfter: objectAfter[key],
          state: 'added',
        },
      };
      return { ...acc, ...prop };
    }

    const prop = {
      [key]: {
        value: objectBefore[key],
        state: 'deleted',
      },
    };
    return { ...acc, ...prop };
  }, root);

  return combined;
};

export default buildAst;
