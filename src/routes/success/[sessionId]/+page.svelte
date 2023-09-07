<script lang="ts">
	import { page } from '$app/stores';
	import { activeSession, resetSession } from '$lib/stores/activeSession';
	import { cart, resetCart } from '$lib/stores/cart';
	import getProduct from '$lib/utils/getProduct.js';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';

	// retrieve session & its line_items by sessionId:
	export let data;
	const { session, line_items, products } = data;

	const { sessionId } = $page.params;

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

	async function archiveCandleSticksResetCartAndActiveSession() {
		const generalErrorMessage =
			'Cannot proceed resetting session, clear cart & archiving purchased candlesticks.';

		if (!session) return console.error(`No session was fetched... ${generalErrorMessage}`);
		if (session.status === 'expired')
			return console.error(`Session with the id ${sessionId} is expired... ${generalErrorMessage}`);
		if (session.status === 'open')
			return console.error(`Session with the id ${sessionId} is open... ${generalErrorMessage}`);

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
			`Archiving purchased candlesticks, resetting active session with the id ${sessionId} & clearing the cart...`
		);

		try {
			// archive candlesticks:
			const res = await fetch('/api/products/archive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: candlesticksInCart.map((p) => p.id) })
			});

			const archivedProducts: Stripe.Product[] = await res.json();

			console.log({ archivedProducts });

			resetCart();

			// if session was an active session stored in local storage => reset it:
			if ($activeSession) {
				if ($activeSession.id === sessionId) {
					resetSession();
				}
			}
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	onMount(() => archiveCandleSticksResetCartAndActiveSession());
</script>

<h1>Dziękujemy za zakup!</h1>
<div><a href="/products">wróc do sklepu</a></div>

<style>
	* {
		text-align: center;
	}
</style>
