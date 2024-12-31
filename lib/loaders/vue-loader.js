module.exports = function (source) {
  const template = source.match(/<template>([\s\S]*)<\/template>/)?.[1] || '';
  const script = source.match(/<script>([\s\S]*)<\/script>/)?.[1] || '';
  const style = source.match(/<style>([\s\S]*)<\/style>/)?.[1] || '';

  const processedTemplate = template
    .trim()
    .replace(/'/g, "\\'")
    .replace(/\n/g, ' ');

  const processedScript = script
    .trim()
    .replace(/const\s+componentOptions\s+=\s+/, '')
    .replace(/module\.exports\s+=\s+componentOptions;?/, '');

  return `
    var options = ${processedScript};
    options.template = '${processedTemplate}';

    // 添加样式
    (function() {
      const style = document.createElement('style');
      style.textContent = \`${style.trim()}\`;
      document.head.appendChild(style);
    })();

    module.exports = options;
  `;
} 