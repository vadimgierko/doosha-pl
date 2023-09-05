<script lang="ts">
	import { page } from '$app/stores';
	import { activeSession, resetSession } from '$lib/stores/activeSession';
	import { cart } from '$lib/stores/cart';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';

	const { sessionId } = $page.params;

	// retrieve session & its line_items by sessionId:
	export let data;
	const { session, line_items, last20sessions } = data;

	$: console.log({ session, line_items });
	$: console.log(
		'last expired sessions:',
		last20sessions.data.filter((s) => s.status === 'expired')
	);

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

		const areLineItemsSameAsInTheCart: boolean =
			cartIds.length === line_items_ids.length &&
			cartIds.every((id) => line_items_ids.includes(id)) &&
			line_items_ids.every((id) => cartIds.includes(id));

		console.log({ areLineItemsSameAsInTheCart });

		// if session is fetched, not expired or complete & got line items, proceed:
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

<h1 style="text-align: center">Payment was canceled...</h1>
<div><a href="/cart">back to cart</a> | <a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
