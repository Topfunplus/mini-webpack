const fs = require('fs');
const path = require('path');
const Plugin = require('../lib/Plugin');
const http = require('http');

class HtmlPlugin extends Plugin {
  constructor(options = {}) {
    super();
    this.options = options;
  }

  apply (compiler) {
    compiler.addHook('emit', async () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${this.options.title || 'Mini Webpack App'}</title>
            <script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="${compiler.options.output.filename}"></script>
          </body>
        </html>
      `;

      // 确保输出目录存在
      fs.mkdirSync(compiler.options.output.path, { recursive: true });

      fs.writeFileSync(
        path.join(compiler.options.output.path, 'index.html'),
        html
      );

      // 启动开发服务器
      if (this.options.devServer) {
        this.startDevServer(compiler.options.output.path);
      }
    });
  }

  startDevServer (root, port = 3000) {
    const server = http.createServer((req, res) => {
      const filePath = path.join(root, req.url === '/' ? 'index.html' : req.url);

      try {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath);
        const contentType = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
        }[ext] || 'text/plain';

        res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
        res.end(content);
      } catch (err) {
        res.statusCode = 404;
        res.end('Not found');
      }
    });

    // 添加错误处理和端口检测
    const tryListen = (retryPort) => {
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`端口 ${retryPort} 已被占用，尝试端口 ${retryPort + 1}`);
          tryListen(retryPort + 1);
        }
      });

      server.listen(retryPort, () => {
        console.log(`开发服务器运行在 http://localhost:${retryPort}`);
      });
    };

    tryListen(port);
  }
}

module.exports = HtmlPlugin; 