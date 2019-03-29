import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildDiffAsString from './renders';
import buildAst from './ast';

const genDiff = (pathToFileBefore, pathToFileAfter) => {
  const readContent = pathToFile => fs.readFileSync(path.resolve(pathToFile), 'utf-8');

  const objectBefore = parse(readContent(pathToFileBefore), path.extname(pathToFileBefore));
  const objectAfter = parse(readContent(pathToFileAfter), path.extname(pathToFileAfter));

  const ast = buildAst(objectBefore, objectAfter);
  return buildDiffAsString(ast);
};

export default genDiff;
