module.exports = () => {
  const App = require('./App.vue');

  new Vue({
    el: '#app',
    render: h => h(App)
  });
} 