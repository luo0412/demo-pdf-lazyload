import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home'),
		meta: {
			keepAlive: false // 需要被缓存
		}
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/Home'),
		meta: {
			keepAlive: false // 需要被缓存
		}
	},
	{
		path: '/pdf',
		name: 'pdf',
		component: () => import('@/views/Pdf'),
		meta: {
			keepAlive: false // 需要被缓存
		}
	},
	

]
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router