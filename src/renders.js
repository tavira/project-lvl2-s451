const buildDiffAsString = (ast) => {
  const isObject = obj => (!(obj instanceof Array)) && obj instanceof Object;

  const w = k => '  '.repeat(k);

  const printObject = (value, depth = 0) => `{\n${Object.keys(value).map(el => `${w(depth + 3)}${el}: ${value[el]}`)}\n${w(depth + 1)}}`;

  const printArray = (value) => {
    const values = value.map(el => `${el}`).join(', ').trim();
    return `[${values}]`;
  };

  const printProperty = (value, depth) => {
    if (isObject(value)) {
      return printObject(value, depth);
    }
    if (Array.isArray(value)) {
      return printArray(value);
    }
    return value;
  };

  const buildDiff = (astree, depth = 1) => {
    const printActions = {
      unchanged: (key, state) => `${w(depth)}  ${key}: ${printProperty(state.value, depth)}`,
      changed: (key, state) => `${w(depth)}+ ${key}: ${printProperty(state.valueAfter, depth)}\n${w(depth)}- ${key}: ${printProperty(state.value, depth)}`,
      deleted: (key, state) => `${w(depth)}- ${key}: ${printProperty(state.value, depth)}`,
      added: (key, state) => `${w(depth)}+ ${key}: ${printProperty(state.valueAfter, depth)}`,
      nested: (key, state) => `${w(depth)}  ${key}: ${buildDiff(state.children, depth + 2)}`,
    };

    return `{\n${Object.entries(astree).map(([key, value]) => printActions[value.state](key, value, depth)).join('\n')}\n${w(depth - 1)}}`;
  };
  return buildDiff(ast);
};

export default buildDiffAsString;
