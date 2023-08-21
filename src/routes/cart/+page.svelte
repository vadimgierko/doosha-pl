<script lang="ts">
	import type Stripe from 'stripe';
	import { cart } from '$lib/stores/cart';
	import {products as productsStore} from "$lib/stores/products";
	import { prices as pricesStore } from '$lib/stores/prices.js';
	import { page } from '$app/stores';
	import RemoveFromCartButton from '$lib/components/RemoveFromCartButton.svelte';

	console.log('page:', $page);

	export let data;

	const { products, prices } = data;

	function getProduct(productId: string) {
		const product = products.find((p) => p.id === productId);
		return product;
	}

	function getPrice(productId: string) {
		const price = prices.find((p) => p.product === productId);
		return price;
	}

	$: cartProductsAndPrices = $cart
		.map((id) => ({
			product: getProduct(id),
			price: getPrice(id)
		}))
		.filter((record) => record.product !== undefined && record.price !== undefined) as {
		product: Stripe.Product;
		price: Stripe.Price;
	}[];

	$: {
		console.log(
			'Fetching products & prices from Stripe: \nproducts:',
			data.products,
			'\nprices:',
			data.prices
		);
		// update products store:
		productsStore.set(data.products);
		// update prices store:
		pricesStore.set(data.prices);
	}

	async function checkout() {
		// TODO:
		// before redirecting for payment,
		// 0. fetch products

		// 1. check if products are available (active: true):
		const areAllProductsAvailable = cartProductsAndPrices.every((p) => p.product.active === true);

		if (areAllProductsAvailable) {
			console.log('all products in cart are available! Proceed checkout...');

			// 2. if true, check if they're not in the another session
			// 3. if true, add session id to metadata of products

			// 4. create checkout session:
			try {
				await fetch('/api/checkout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						prices: cartProductsAndPrices.map((p) => p.price.id),
						url: $page.url.origin // we need to pass this for dynamic /success & /cancel URLs defined checkout API route
					})
				})
					.then((data) => data.json())
					.then((data) => {
						// session object:
						const session = data;

						if (session.url) {
							console.log('new session object:', session);
							// redirect to stripe checkout:
							window.location.replace(session.url);
						} else {
							alert("Checkout session wasn't created because of some kind of error...");
						}
					});
			} catch (error) {
				console.error(error);
				alert(error);
			}
		} else {
			const unavailableProducts = cartProductsAndPrices.filter((p) => p.product.active !== true);

			console.error(
				`Some of products in the cart are not available at the moment: ${unavailableProducts
					.map((p) => p.product.name)
					.join(', ')}. Remove them to proceed checkout.`
			);
			alert(
				`Some of products in the cart are not available at the moment: ${unavailableProducts
					.map((p) => p.product.name)
					.join(', ')}. Remove them to proceed checkout.`
			);
		}
	}
</script>

<h1 style="text-align:center">Cart ({$cart.length})</h1>

<hr />

{#if $cart.length === 0}
	<p style="text-align:center">Cart is empty...</p>
{:else}
	{#each cartProductsAndPrices as { product, price }}
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

				{#if price.unit_amount}
					<p><strong>{price.unit_amount / 100},-</strong></p>
				{/if}

				{#if !product.active}
					<span style="color:red"
						>(Product is not available at the moment... Remove it to proceed tho checkout.)</span
					>
				{/if}

				<p style="color: grey">{product.id}</p>
				<RemoveFromCartButton id={product.id} />
			</div>
		</div>
	{/each}

	<div>
		<hr />

		<p style="text-align: end;">
			<strong>Sum:</strong>
			{cartProductsAndPrices.reduce(
				(sum, p) => (p.price.unit_amount ? sum + p.price.unit_amount / 100 : sum / 100),
				0
			)},-
		</p>

		<button class="checkout-button" on:click={() => checkout()}>go to checkout</button>
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

	a {
		text-decoration: none;
		color: black;
	}

	.product-title:hover,
	.product-img:hover {
		opacity: 0.8;
	}
</style>
