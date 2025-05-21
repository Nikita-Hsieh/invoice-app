import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceView from '../views/InvoiceView.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/invoice/:invoiceId',
		name: 'Invoice',
		component: InvoiceView,
	},
]

//deal with 404
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
