import { createStore } from 'vuex'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase/firebaseinit'

export default createStore({
	state: {
		invoiceData: [],
		invoiceModal: null,
		modalActive: null,
		invoicesLoaded: null,
		currentInvoiceArray: null,
	},
	mutations: {
		TOGGLE_INVOICE(state) {
			state.invoiceModal = !state.invoiceModal
		},
		TOGGLE_MODAL(state) {
			state.modalActive = !state.modalActive
		},
		SET_INVOICE_DATA(state, payload) {
			state.invoiceData.push(payload)
		},
		INVOICES_LOADED(state) {
			state.invoicesLoaded = true
		},
		SET_CURRENT_INVOICE(state, payload) {
			state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
				return invoice.invoiceId === payload
			})
		},
	},
	actions: {
		async GET_INVOICES({ commit, state }) {
			const querySnapshot = await getDocs(collection(db, 'invoices'))

			querySnapshot.forEach((doc) => {
				if (!state.invoiceData.some((invoice) => invoice.docID == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
					}
					commit('SET_INVOICE_DATA', data)
				}
			})
			commit('INVOICES_LOADED')
		},
	},
	modules: {},
})
