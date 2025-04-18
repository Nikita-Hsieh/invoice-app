import { createStore } from 'vuex'
import {
	collection,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore'
import db from '../firebase/firebaseinit'

export default createStore({
	state: {
		invoiceData: [],
		invoiceModal: null,
		modalActive: null,
		invoicesLoaded: null,
		currentInvoiceArray: null,
		editInvoice: null,
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
			state.currentInvoiceArray = state.invoiceData.filter(
				(invoice) => invoice.invoiceId === payload
			)
		},
		TOGGLE_EDIT_INVOICE(state) {
			state.editInvoice = !state.editInvoice
		},
		DELETE_INVOICE(state, payload) {
			state.invoiceData = state.invoiceData.filter(
				(invoice) => invoice.docId !== payload
			)
		},
		UPDATE_STATUS_TO_PAID(state, payload) {
			state.invoiceData.forEach((invoice) => {
				if (invoice.docId === payload) {
					invoice.invoicePaid = true
					invoice.invoicePending = false
				}
			})
		},
		UPDATE_STATUS_TO_PENDING(state, payload) {
			state.invoiceData.forEach((invoice) => {
				if (invoice.docId === payload) {
					invoice.invoicePaid = false
					invoice.invoicePending = true
					invoice.invoiceDraft = false
				}
			})
		},
	},
	actions: {
		async GET_INVOICES({ commit, state }) {
			const querySnapshot = await getDocs(collection(db, 'invoices'))
			querySnapshot.forEach((docItem) => {
				if (
					!state.invoiceData.some((invoice) => invoice.docId === docItem.id)
				) {
					const data = {
						docId: docItem.id,
						...docItem.data(),
					}
					commit('SET_INVOICE_DATA', data)
				}
			})
			commit('INVOICES_LOADED')
		},
		async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
			commit('DELETE_INVOICE', docId)
			await dispatch('GET_INVOICES')
			commit('TOGGLE_INVOICE')
			commit('TOGGLE_EDIT_INVOICE')
			commit('SET_CURRENT_INVOICE', routeId)
		},
		async DELETE_INVOICE({ commit }, docId) {
			const invoiceRef = doc(db, 'invoices', docId)
			await deleteDoc(invoiceRef)
			commit('DELETE_INVOICE', docId)
		},
		async UPDATE_STATUS_TO_PAID({ commit }, docId) {
			const invoiceRef = doc(db, 'invoices', docId)
			await updateDoc(invoiceRef, {
				invoicePaid: true,
				invoicePending: false,
			})
			commit('UPDATE_STATUS_TO_PAID', docId)
		},
		async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
			const invoiceRef = doc(db, 'invoices', docId)
			await updateDoc(invoiceRef, {
				invoicePaid: false,
				invoicePending: true,
				invoiceDraft: false,
			})
			commit('UPDATE_STATUS_TO_PENDING', docId)
		},
	},
	modules: {},
})
