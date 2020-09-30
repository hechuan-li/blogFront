import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/less/reset.css'
import './assets/less/common.css'
import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.baseURL = 'http://192.168.1.200:3000'
//请求拦截，每次发送请求前，都要把token写入请求头
axios.interceptors.request.use(function(config) {
	// 在发送请求之前判断是否有token，并把token写入请求头
	let token = Cookie.get('token')

	if (token) {
		console.log('准备写入请求头')
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)

Vue.prototype.$axios = axios
Vue.prototype.$Cookie = Cookie

//登陆拦截，用于验证用户是否登陆并获得token
router.beforeEach((to, from, next) => {
	let token = Cookie.get('token')
	// console.log(token)
	if (token) {
		store.commit('changeSignState', 1)
		next()
	} else {
		if (to.path === '/login') {
			next()
		} else if (to.path === '/signup') {
			next()
		} else {
			next({ path: '/login' })
		}
	}
})

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
