import cssImport from 'postcss-import';
import cssNested from 'postcss-nested';
import cssVars from 'postcss-simple-vars';
import cssInlineComment from 'postcss-inline-comment';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

let cssProcessors = [
  cssImport,
  cssNested,
  cssVars,
  cssInlineComment(),
  autoprefixer({browsers: ['last 1 version']}),
  cssnano()
];

export {cssProcessors};