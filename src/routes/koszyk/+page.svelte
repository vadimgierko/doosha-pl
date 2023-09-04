<script lang="ts">
	import type Stripe from 'stripe';
	import { cart } from '$lib/stores/cart';
	import { activeSession, saveSession } from '$lib/stores/activeSession';
	import { page } from '$app/stores';
	import RemoveFromCartButton from '$lib/components/RemoveFromCartButton.svelte';
	import getProduct from '$lib/utils/getProduct.js';
	import getPrice from '$lib/utils/getPrice.js';

	export let data;

	const { products, prices } = data;

	$: cartProductsAndPrices = $cart
		.map((record) => ({
			product: getProduct(record.id, products),
			price: getPrice(record.id, prices),
			qty: record.qty
		}))
		.filter((record) => record.product !== undefined && record.price !== undefined) as {
		product: Stripe.Product;
		price: Stripe.Price;
		qty: number;
	}[];

	async function checkout() {
		// TODO:
		// 0. fetch products once again !!!

		// 1. check if products are available (active: true):
		const areAllProductsActive = cartProductsAndPrices.every((p) => p.product.active === true);

		if (!areAllProductsActive) {
			const unavailableProducts = cartProductsAndPrices.filter((p) => p.product.active !== true);

			const message = `Some of products in the cart are not available at the moment: ${unavailableProducts
				.map((p) => p.product.name)
				.join(', ')}. Remove them to proceed checkout.`;

			console.error(message);
			return alert(message);
		}

		// 2. check if CANDLESTICKS products are not in the another session (because they are singular products):
		const areCandlescticksNotReserved = cartProductsAndPrices
			.filter((p) => p.product.metadata.category === 'świeczniki')
			.every((p) => (p.product.metadata.sessionId ? false : true));

		if (!areCandlescticksNotReserved) {
			const reservedCandlesticks = cartProductsAndPrices.filter(
				(p) => p.product.metadata.sessionId
			);

			const message = `Some of products in the cart are reserved at the moment: ${reservedCandlesticks
				.map((p) => p.product.name)
				.join(', ')}. Remove them or wait until they will be unreserved to proceed checkout.`;

			console.error(message);
			return alert(message);
		}

		console.log('All candlesticks in cart are not reserved & available! Proceed checkout...');

		try {
			// 3. create checkout session:
			console.log('creating a new session...');

			const session: Stripe.Checkout.Session = await fetch('/api/session/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prices: cartProductsAndPrices.map((p) => ({ id: p.price.id, qty: p.qty })),
					url: $page.url.origin // we need to pass this for dynamic /success & /cancel URLs defined checkout API route
				})
			}).then((data) => data.json());

			console.log({ session });

			const timestamp = Date.now() + 31 * 60 * 1000;

			// 4. reserve candlesticks:
			console.log('reserving candlesticks...');

			const candlesticksIdsFromCart = cartProductsAndPrices
				.filter((r) => r.product.metadata.category === 'świeczniki')
				.map((r) => r.product.id);

			const reservedCandlesticks: Stripe.Product[] = await fetch('/api/products/reserve', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ids: candlesticksIdsFromCart,
					sessionId: session.id,
					timestamp: timestamp // session.expires_at
				})
			}).then((data) => data.json());

			console.log({ reservedCandlesticks });

			if (session.url) {
				console.log('new session object:', session);
				// save session in local storage:
				saveSession({
					id: session.id,
					url: session.url,
					timestamp: timestamp
				});
				// redirect to stripe checkout:
				window.location.assign(session.url);
			} else {
				alert("Checkout session wasn't created because of some kind of error...");
			}
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
</script>

<h1 style="text-align:center">Cart ({$cart.length})</h1>

<hr />

{#if $cart.length === 0}
	<p style="text-align:center">Cart is empty...</p>
{:else}
	{#each cartProductsAndPrices as { product, price, qty }}
		<div class="container">
			<div style="min-width:100px; max-width:100px">
				<a href={`/products/${product.id}`}>
					<img class="product-img" width="100%" src={product.images[0]} alt={product.name} />
				</a>
			</div>
			<div class="product-details">
				<header class="product-title">
					<a href={`/products/${product.id}`}><h3>{product.name}</h3> </a>
				</header>

				<p>
					kategoria: <a
						href={`/sklep/${product.metadata.category === 'świece' ? 'swiece' : 'swieczniki'}`}
						>{product.metadata.category}</a
					>
				</p>

				{#if price.unit_amount}
					<p><strong>{price.unit_amount / 100},-</strong></p>
				{/if}

				{#if !product.active}
					<span style="color:red"
						>(Product is not available at the moment... Remove it to proceed tho checkout.)</span
					>
				{/if}

				<!-- IF THE PRODUCT IS A CANDLESTICK -->
				{#if product.metadata.category === 'świeczniki' && product.metadata.timestamp}
					<span style="color:red"
						>(Product is reserved until {new Date(Number(product.metadata.timestamp))})</span
					>
				{/if}

				<p style="color: grey">{product.id}</p>

				<!-- IF THE PRODUCT IS CANDLES => ADD - + BUTTONS -->
				{#if product.metadata.category === 'świece'}
					<div style="margin-bottom: 0.5em;">
						<button
							on:click={() => {
								if (qty > 1) {
									cart.update((records) =>
										records.map((r) => (r.id === product.id ? { ...r, qty: r.qty - 1 } : r))
									);
								}
							}}>-</button
						>
						{qty}
						<button
							on:click={() =>
								cart.update((records) =>
									records.map((r) => (r.id === product.id ? { ...r, qty: r.qty + 1 } : r))
								)}>+</button
						>
					</div>
				{/if}

				<RemoveFromCartButton id={product.id} />
			</div>
		</div>
	{/each}

	<div>
		<hr />

		<p style="text-align: end;">
			<strong>Sum:</strong>
			{cartProductsAndPrices.reduce(
				(sum, p) => (p.price.unit_amount ? sum + (p.price.unit_amount * p.qty) / 100 : sum / 100),
				0
			)},-
		</p>

		<button class="checkout-button" on:click={() => checkout()}>go to checkout</button>

		{#if $activeSession && $activeSession.timestamp && $activeSession.timestamp > Date.now()}
			<hr />
			<p style="text-align:center;color:green">
				You have not finished purchase valid until {new Date(Number($activeSession.timestamp))}.
				Press the button below to continue previous checkout.
			</p>

			<button
				class="checkout-button"
				on:click={() => ($activeSession ? window.location.assign($activeSession.url) : {})}
				>continue previous checkout</button
			>
		{/if}
	</div>
{/if}

<style>
	.container {
		display: flex;
		margin-bottom: 1em;
		width: 100%;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-left: 1em;
	}

	h3,
	p {
		margin-top: 0;
		margin-bottom: 0.5em;
	}

	.checkout-button {
		width: 100%;
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(219, 218, 218);
		padding: 0.5em 0;
		border-width: 1px;
	}

	.checkout-button:hover {
		background-color: rgb(211, 198, 178);
		color: white;
	}

	.product-title a {
		text-decoration: none;
		color: black;
	}

	.product-title:hover,
	.product-img:hover {
		opacity: 0.8;
	}
</style>
