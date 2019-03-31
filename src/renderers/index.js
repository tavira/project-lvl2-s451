import renderTree from './renderTree';
import renderPlain from './renderPlain';

const renderDiff = (ast, format) => {
  const renderActions = {
    tree: renderTree,
    plain: renderPlain,
    json: JSON.stringify,
  };
  return renderActions[format](ast);
};

export default renderDiff;
