import { createStore } from 'vuex'

export default createStore({
	state: {
		invoiceModal: false,
	},
	mutations: {
		TOGGLE_INVOICE(state) {
			state.invoiceModal = !state.invoiceModal
		},
	},
	actions: {},
	modules: {},
})
