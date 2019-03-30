import _ from 'lodash';

const areKeysObjects = (obj1, obj2) => (_.isPlainObject(obj1) && _.isPlainObject(obj2));
const isKeyExistsInTwoObjects = (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key));
const hasKeyIdentityValues = (obj1, obj2, key) => (obj1[key] === obj2[key]);
const isAddedKey = (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key);
const isDeletedKey = (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key);

const buildAst = (objectBefore, objectAfter) => {
  const unionKeysBeforeAfter = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  return unionKeysBeforeAfter.map((key) => {
    const handleKeysActions = [
      {
        check: () => (isKeyExistsInTwoObjects(objectBefore, objectAfter, key)
                        && areKeysObjects(objectBefore[key], objectAfter[key])),
        handle: () => ({
          key, type: 'parent', children: buildAst(objectBefore[key], objectAfter[key]),
        }),
      },
      {
        check: () => (isKeyExistsInTwoObjects(objectBefore, objectAfter, key)
                        && !hasKeyIdentityValues(objectBefore, objectAfter, key)),
        handle: () => ({
          key, type: 'changed', valueBefore: objectBefore[key], valueAfter: objectAfter[key],
        }),
      },
      {
        check: () => (isKeyExistsInTwoObjects(objectBefore, objectAfter, key)
                        && hasKeyIdentityValues(objectBefore, objectAfter, key)),
        handle: () => ({
          key, type: 'unchanged', valueBefore: objectBefore[key], valueAfter: objectAfter[key],
        }),
      },
      {
        check: () => (isAddedKey(objectBefore, objectAfter, key)),
        handle: () => ({
          key, type: 'added', valueAfter: objectAfter[key],
        }),
      },
      {
        check: () => (isDeletedKey(objectBefore, objectAfter, key)),
        handle: () => ({
          key, type: 'deleted', valueBefore: objectBefore[key],
        }),
      },
    ];

    const { handle } = handleKeysActions.find(({ check }) => check());
    return handle();
  });
};

export default buildAst;
