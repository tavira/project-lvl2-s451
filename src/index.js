import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './ast';
import renderDiff from './renderers';

const genDiff = (pathToFileBefore, pathToFileAfter, format) => {
  const readContent = pathToFile => fs.readFileSync(path.resolve(pathToFile), 'utf-8');

  const contentBefore = readContent(pathToFileBefore);
  const contentAfter = readContent(pathToFileAfter);
  const extnameFileBefore = path.extname(pathToFileBefore);

  const objectBefore = parse(contentBefore, extnameFileBefore);
  const objectAfter = parse(contentAfter, path.extname(pathToFileAfter));

  const ast = buildAst(objectBefore, objectAfter);
  return renderDiff(ast, format);
};

export default genDiff;
