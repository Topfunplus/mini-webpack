const Compiler = require('../lib/Compiler');
const config = require('../example/webpack.config.js');

const compiler = new Compiler(config);

// 注册插件
config.plugins.forEach(plugin => compiler.use(plugin));

// 开始编译
compiler.run().catch(console.error); 