import _ from 'lodash';
import jsyaml from 'js-yaml';
import ini from 'ini';

const parseIniStringToNumber = (obj) => {
  const innerObj = ini.parse(obj);

  const isNumber = x => /^[+-]?\d+(?:\.\d+)?$/.test(x);

  const traverse = o => Object.entries(o).reduce((acc, [key, value]) => {
    if (_.isPlainObject(value)) {
      return { ...acc, ...{ [key]: traverse(value) } };
    }
    if (isNumber(value)) {
      return { ...acc, ...{ [key]: +value } };
    }
    return { ...acc, ...{ [key]: value } };
  }, {});

  return traverse(innerObj);
};

export default (content, ext) => {
  const parseFn = {
    '.json': JSON.parse,
    '.yml': jsyaml.safeLoad,
    '.ini': parseIniStringToNumber,
  };
  return parseFn[ext](content);
};
