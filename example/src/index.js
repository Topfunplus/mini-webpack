module.exports = function () {
  const App = require('./App.vue');

  new Vue({
    el: '#app',
    render: h => h(App)
  });
} 