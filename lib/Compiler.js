const fs = require('fs');
const path = require('path');
const Parser = require('./Parser');

class Compiler {
  constructor(options) {
    this.options = options;
    this.modules = new Map();
    this.hooks = {
      beforeCompile: [],
      afterCompile: [],
      emit: []
    };
    this.plugins = new Set();
    this.context = path.dirname(this.options.entry);
  }

  // 注册插件
  use (plugin) {
    this.plugins.add(plugin);
    plugin.apply(this);
  }

  // 添加钩子
  addHook (name, fn) {
    if (this.hooks[name]) {
      this.hooks[name].push(fn);
    }
  }

  // 运行钩子
  async runHooks (name) {
    for (const hook of this.hooks[name]) {
      await hook();
    }
  }

  // 开始编译
  async run () {
    await this.runHooks('beforeCompile');

    const entryModule = await this.buildModule(this.options.entry);
    this.modules.set(this.options.entry, entryModule);

    await this.runHooks('afterCompile');
    await this.emit();
  }

  // 构建模块
  async buildModule (filename) {
    const absolutePath = path.resolve(this.context, filename);
    const source = fs.readFileSync(absolutePath, 'utf-8');
    const parser = new Parser();

    // 根据文件扩展名获取对应的loader
    const loaders = this.options.module.rules
      .filter(rule => rule.test.test(filename))
      .map(rule => require(rule.loader));

    // 使用loader处理源码
    let processedSource = source;
    for (const loader of loaders) {
      processedSource = await loader(processedSource);
    }

    console.log('Processed source for', filename, ':', processedSource);

    // 解析源码中的依赖
    const result = parser.parse(processedSource);

    // 查找并处理 require 语句
    const requireRegex = /require\(['"](.*?)['"]\)/g;
    let match;

    while ((match = requireRegex.exec(result)) !== null) {
      const dependency = match[1];
      const dependencyPath = path.resolve(path.dirname(filename), dependency);

      // 如果依赖模块还没有被处理过，则递归处理
      if (!this.modules.has(dependencyPath)) {
        const dependencyModule = await this.buildModule(dependencyPath);
        this.modules.set(dependencyPath, dependencyModule);
      }
    }

    return result;
  }

  // 输出文件
  async emit () {
    await this.runHooks('emit');
    const outputPath = path.join(this.options.output.path, this.options.output.filename);
    fs.mkdirSync(this.options.output.path, { recursive: true });

    // 生成模块代码
    const moduleDefinitions = [];
    this.modules.forEach((module, filename) => {
      const relativePath = './' + path.relative(this.context, filename).replace(/\\/g, '/');
      moduleDefinitions.push(`
        '${relativePath}': function(require, module, exports) {
          ${module}
        }
      `);
    });

    // 生成 bundle
    const bundle = `
      (function() {
        var modules = {
          ${moduleDefinitions.join(',\n')}
        };

        var cache = {};

        function require(moduleId) {
          if (cache[moduleId]) {
            return cache[moduleId].exports;
          }

          var module = cache[moduleId] = {
            exports: {}
          };

          modules[moduleId].call(module.exports, require, module, module.exports);
          return module.exports;
        }

        // 加载 Vue
        window.Vue = Vue;

        // 执行入口文件
        var entryModule = require('./index.js');
        if (typeof entryModule === 'function') {
          entryModule();
        } else if (typeof entryModule.default === 'function') {
          entryModule.default();
        }
      })();
    `;

    fs.writeFileSync(outputPath, bundle);
  }
}

module.exports = Compiler; 