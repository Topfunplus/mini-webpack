<template>
  <div class="app">
    <header class="header">
      <h1>{{ title }}</h1>
      <nav>
        <a v-for="item in menuItems" :key="item.id" :class="{ active: currentPage === item.id }"
          @click="currentPage = item.id">
          {{ item.text }}
        </a>
      </nav>
    </header>

    <main class="main">
      <div v-if="currentPage === 'home'" class="home">
        <div class="hero">
          <h2>{{ hero.title }}</h2>
          <p>{{ hero.description }}</p>
          <button @click="currentPage = 'contact'">联系我们</button>
        </div>
        <div class="features">
          <div v-for="feature in features" :key="feature.id" class="feature-card">
            <div class="icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="currentPage === 'about'" class="about">
        <h2>关于我们</h2>
        <div class="team">
          <div v-for="member in team" :key="member.id" class="member-card">
            <div class="avatar">{{ member.avatar }}</div>
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="currentPage === 'contact'" class="contact">
        <h2>联系我们</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input v-model="form.name" type="text" placeholder="您的姓名">
          </div>
          <div class="form-group">
            <input v-model="form.email" type="email" placeholder="您的邮箱">
          </div>
          <div class="form-group">
            <textarea v-model="form.message" placeholder="请输入您的留言"></textarea>
          </div>
          <button type="submit">发送消息</button>
        </form>
      </div>
    </main>

    <footer class="footer">
      <p>© 2024 Mini Webpack Demo. Built with Vue.js</p>
    </footer>
  </div>
</template>

<script>
const componentOptions = {
  data: () => ({
    title: 'Mini Webpack Demo',
    currentPage: 'home',
    menuItems: [
      { id: 'home', text: '首页' },
      { id: 'about', text: '关于' },
      { id: 'contact', text: '联系' }
    ],
    hero: {
      title: '欢迎使用 Mini Webpack',
      description: '一个轻量级的模块打包工具，帮助你构建现代化的 Web 应用'
    },
    features: [
      { id: 1, icon: '🚀', title: '高性能', description: '优化的构建过程，快速的开发体验' },
      { id: 2, icon: '⚡️', title: '易扩展', description: '插件化架构，轻松扩展功能' },
      { id: 3, icon: '🎨', title: '现代化', description: '支持最新的 Web 开发技术' }
    ],
    team: [
      { id: 1, avatar: '👨‍💻', name: '张三', role: '前端工程师' },
      { id: 2, avatar: '👩‍💻', name: '李四', role: '后端工程师' },
      { id: 3, avatar: '👨‍🎨', name: '王五', role: 'UI 设计师' }
    ],
    form: {
      name: '',
      email: '',
      message: ''
    }
  }),
  methods: {
    async submitForm () {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('表单已提交！');
    }
  }
};

module.exports = componentOptions;
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 1px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

nav a:hover,
nav a.active {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.hero h2 {
  font-size: 2.5rem;
  color: #35495e;
  margin-bottom: 1rem;
  font-weight: 300;
}

.hero p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(66, 184, 131, 0.3);
}

button:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 184, 131, 0.4);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.team {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.member-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.member-card:hover {
  transform: translateY(-5px);
}

.avatar {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

input,
textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

textarea {
  height: 150px;
  resize: vertical;
}

.footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
}

h2 {
  color: #35495e;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 300;
  font-size: 2.2rem;
}

h3 {
  color: #42b883;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .main {
    padding: 1rem;
  }

  .hero {
    padding: 2rem 1rem;
  }

  .contact-form {
    padding: 2rem 1rem;
  }

  nav {
    flex-wrap: wrap;
  }

  nav a {
    padding: 0.5rem 1rem;
  }
}
</style>