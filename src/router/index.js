import Vue from 'vue'
import VueRouter from 'vue-router'
import CommonLayout from '../components/CommonLayout.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: CommonLayout,
		children: [
			{
				path: '',
				component: () => import('@/views/Home.vue'),
			},
			{
				path: '/detail/:id',
				component: () => import('@/views/DetailView.vue'),
			},
			{
				path: '/user',
				component: () => import('@/views/UserPage.vue'),
			},
			{
				path: '/blog',
				name:'article',
				component: () => import('@/views/Blogs.vue'),
			},
			{
				path: '/blog/addArticle/:id',
				name: 'addArticle',
				component: () => import('@/views/AddArticle.vue'),
			},
			{
				path: '/spider',
				component: () => import('@/views/Spiders.vue'),
			},
			{
				path: '/todo',
				component: () => import('@/views/ToDo.vue'),
			},
		],
	},
	{
		path: '/login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/signup',
		component: () => import('@/views/SignUp.vue'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
