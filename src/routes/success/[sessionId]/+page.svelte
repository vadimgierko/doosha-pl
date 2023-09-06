<script lang="ts">
	import { onMount } from 'svelte';
	import { cart, resetCart } from '$lib/stores/cart';
	import type Stripe from 'stripe';
	import { resetSession } from '$lib/stores/activeSession';

	export let data;

	const { products } = data;

	async function archiveCandleSticks() {
		console.log('archiving purchased candlesticks...');

		try {
			const candlesticksIds = products.filter((p) => !p.metadata.productType).map((p) => p.id);
			const candlesticksIdsFromTheCart = $cart
				.filter((r) => candlesticksIds.includes(r.id))
				.map((r) => r.id);
			const res = await fetch('/api/products/archive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: candlesticksIdsFromTheCart })
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

	onMount(() => archiveCandleSticks());
</script>

<h1>Dziękujemy za zakup!</h1>
<div><a href="/products">wróc do sklepu</a></div>

<style>
	* {
		text-align: center;
	}
</style>
