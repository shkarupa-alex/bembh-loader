const path = require('path');
const bemBHLoader = path.join(__dirname, '..', '..', 'index.js');

const levels = [
  'test/levels/blocks.base',
  'test/levels/blocks.plugins',
  'test/levels/blocks.common',
  'test/levels/blocks.project',
];

const techMap = {
  styles: ['css', 'scss'],
  scripts: ['js', 'babel.js'],
  html: ['bh.js'],
};

module.exports = (entry) => {
  return {
    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [{
        test: /\.bemjson\.js$/,
        use: [
          {
            loader: bemBHLoader,
            options: {},
          },
          {
            loader: '@intervolga/bemdeps-loader',
            options: {
              levels: levels,
              techMap: techMap,
            },
          },
          {
            loader: '@intervolga/bemdecl-loader',
            options: {
              levels: levels,
            },
          },
          '@intervolga/bemjson-loader',
          '@intervolga/eval-loader',
        ],
      }],
    },

    target: 'node',
  };
};
