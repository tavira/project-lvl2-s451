import jsyaml from 'js-yaml';

export default (content, ext) => {
  const parseFn = {
    '.json': JSON.parse,
    '.yml': jsyaml.safeLoad,
  };
  return parseFn[ext](content);
};
