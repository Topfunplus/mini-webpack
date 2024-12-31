const babel = require('@babel/core');

module.exports = function (source) {
  const options = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['> 1%', 'last 2 versions']
          }
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  };

  const result = babel.transformSync(source, options);
  return result.code;
} 