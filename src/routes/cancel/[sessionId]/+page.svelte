<script lang="ts">
	import { page } from '$app/stores';
	import { activeSession, resetSession } from '$lib/stores/activeSession';
	import { cart } from '$lib/stores/cart';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';

	const { sessionId } = $page.params;

	async function expireSessionAndUnreserveCart() {
		console.log('expiring canceled session & unreserving not purchased products...', sessionId);

		try {
			// expire session:
			const expiredSession = await fetch('/api/session/expire', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					sessionId: sessionId
				})
			}).then((data) => data.json());

			// unreserve products:
			const unreservedProducts: Stripe.Product[] = await fetch('/api/products/unreserve', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: $cart.map((r) => r.id) })
			}).then((data) => data.json());

			// if session was an active session stored in local storage => reset it:
			if ($activeSession) {
				if ($activeSession.id === expiredSession.id) {
					resetSession();
				}
			}

			console.log({ unreservedProducts });
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	onMount(() => expireSessionAndUnreserveCart());
</script>

<h1 style="text-align: center">Payment was canceled...</h1>
<div><a href="/cart">back to cart</a> | <a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
