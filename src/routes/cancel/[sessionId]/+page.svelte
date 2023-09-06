<script lang="ts">
	import { page } from '$app/stores';
	import { activeSession, resetSession } from '$lib/stores/activeSession';
	import { cart } from '$lib/stores/cart';
	import getProduct from '$lib/utils/getProduct.js';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';

	const { sessionId } = $page.params;

	// retrieve session & its line_items by sessionId:
	export let data;
	const { session, line_items, products } = data;

	$: console.log({ session, line_items });

	// helper functions (reusable for /success too):
	function areLineItemsSameAsInTheCart({
		cartIds,
		line_items_ids
	}: {
		cartIds: string[];
		line_items_ids: string[];
	}): boolean {
		const bool =
			cartIds.length === line_items_ids.length &&
			cartIds.every((id) => line_items_ids.includes(id)) &&
			line_items_ids.every((id) => cartIds.includes(id));

		console.log('areLineItemsSameAsInTheCart:', bool);

		return bool;
	}

	function areAllCandlesticksHaveSameSessionId(candlesticksInCart: Stripe.Product[]): boolean {
		const bool = candlesticksInCart.every(
			(p) => p.metadata.sessionId && p.metadata.sessionId === sessionId
		);

		console.log('areAllCandlesticksHaveSameSessionId:', bool);

		return bool;
	}

	async function expireSessionAndUnreserveCart() {
		const generalErrorMessage = 'Cannot proceed expiring session & unreserving cart.';

		if (!session) return console.error(`No session was fetched... ${generalErrorMessage}`);
		if (session.status === 'expired')
			return console.error(`Session with the id ${sessionId} is expired... ${generalErrorMessage}`);
		if (session.status === 'complete')
			return console.error(
				`Session with the id ${sessionId} is complete... ${generalErrorMessage}`
			);

		if (!line_items || !line_items.data.length)
			return console.error(
				`No line_items for session with the id ${sessionId} were provided... ${generalErrorMessage}`
			);

		const cartIds = $cart.map((r) => r.id);
		const line_items_ids = line_items.data.map((item) => item.price?.product) as string[];

		console.log({ cartIds, line_items_ids });

		if (!areLineItemsSameAsInTheCart({ cartIds, line_items_ids }))
			return console.error(`Line items are not same as in the cart... ${generalErrorMessage}`);

		const candlesticksInCart = (
			cartIds
				.map((id) => getProduct(id, products))
				.filter((p) => p !== undefined) as Stripe.Product[]
		).filter((p) => p.metadata.category === 'świeczniki');

		console.log({ candlesticksInCart });

		if (candlesticksInCart.length) {
			if (!areAllCandlesticksHaveSameSessionId(candlesticksInCart))
				return console.error(
					`Candlesticks in the cart have different session id... ${generalErrorMessage}`
				);
		}

		console.log(
			`Expiring canceled session with the id ${sessionId} & unreserving not purchased products...`
		);

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

<h1 style="text-align: center">Płatność została anulowana...</h1>
<div><a href="/koszyk">wróć do koszyka</a> | <a href="/sklep">wróc do sklepu</a></div>

<style>
	* {
		text-align: center;
	}
</style>
