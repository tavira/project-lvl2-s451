import jsyaml from 'js-yaml';
import ini from 'ini';

export default (content, ext) => {
  const parseFn = {
    '.json': JSON.parse,
    '.yml': jsyaml.safeLoad,
    '.ini': ini.parse,
  };
  return parseFn[ext](content);
};
