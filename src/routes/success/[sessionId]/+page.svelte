<script lang="ts">
	import { onMount } from 'svelte';
	import { cart, resetCart } from '$lib/stores/cart';
	import type Stripe from 'stripe';
	import { resetSession } from '$lib/stores/activeSession';

	async function archiveProducts() {
		console.log('archiving purchased products...');

		try {
			const res = await fetch('/api/products/archive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: $cart })
			});

			const archivedProducts: Stripe.Product[] = await res.json();

			console.log({ archivedProducts });

			resetCart();
			resetSession();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	onMount(() => archiveProducts());
</script>

<h1>Thank you for your purchase!</h1>
<div><a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
