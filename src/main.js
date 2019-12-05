import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import Edit from './components/Edit'
import Search from './components/Search'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/main', component: Main },
    { path: '/edit', component: Edit },
    { path: '/search', component: Search }
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
