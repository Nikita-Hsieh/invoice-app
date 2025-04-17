<template>
	<div>
		<router-link
			class="invoice flex"
			:to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
		>
			<div class="left flex">
				<span class="tracking-number">#{{ invoice.invoceId }}</span>
				<span class="due-date">{{ invoice.paymentDueDate }}</span>
				<span class="name">{{ invoice.clientName }}</span>
			</div>
			<div class="right flex">
				<span class="price">{{ invoice.invoiceTotal }}</span>
				<div
					class="status-button flex"
					:class="{
						piad: invoice.invoicePaid,
						draft: invoice.invoiceDraft,
						pending: invoice.invoicePending,
					}"
				>
					<span v-if="invoice.invoicePaid">Paid</span>
					<span v-if="invoice.invoiceDraft">Draft</span>
					<span v-if="invoice.invoicePending">Pending</span>
				</div>
				<div class="icon">
					<img src="../assets/icon-arrow-right.svg" alt="" />
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'invoice',
	props: ['invoice'],
}
</script>

<style lang="scss" scoped>
.invoice {
	text-decoration: none;
	cursor: pointer;
	gap: 1rem;
	margin-bottom: 1rem;
	color: white;
	border-radius: 20px;
	padding: 28px 32px;
	background-color: #1e2139;
	align-items: center;

	span {
		font-size: 13px;
	}

	.left {
		align-items: center;
		flex-basis: 60%;
		gap: 1rem;

		span {
			flex: 1;
		}

		.tracking-number {
			text-transform: uppercase;
		}
	}

	.right {
		gap: 1rem;
		flex-basis: 40%;
		align-items: center;

		.price {
			flex: 1;
			font-size: 16px;
			font-weight: 600;
		}
	}
}
</style>
