class Parser {
  parse (source) {
    // 添加一些基本的源码处理
    const cleanSource = source
      .replace(/^\s+|\s+$/g, '') // 去除首尾空白
      .replace(/\n\s*\n/g, '\n'); // 合并多个空行

    console.log('Parser processing source:', cleanSource);
    return cleanSource;
  }
}

module.exports = Parser; 