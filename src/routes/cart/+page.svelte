<script lang="ts">
	import type Stripe from 'stripe';
	import { cart } from '$lib/stores/cart';
	import { products as productsStore } from '$lib/stores/products';
	import { page } from '$app/stores';
	import RemoveFromCartButton from '$lib/components/RemoveFromCartButton.svelte';
	import logAndUpdateFetchedProductsAndPrices from '$lib/utils/logAndUpdateFetchedProductsAndPrices';

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

	$: logAndUpdateFetchedProductsAndPrices(data);

	async function checkout() {
		// TODO:
		// before redirecting for payment,
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

		// 2. check if products are not in the another session:
		const areAllProductsNotReserved = cartProductsAndPrices.every((p) => {
			const metadata = p.product.metadata;

			if (Object.keys(metadata).length === 0 || !metadata.sessionId) {
				return true;
			}

			return false;
		});

		if (!areAllProductsNotReserved) {
			const reservedProducts = cartProductsAndPrices.filter((p) => p.product.metadata.sessionId);

			const message = `Some of products in the cart are reserved at the moment: ${reservedProducts
				.map((p) => p.product.name)
				.join(', ')}. Remove them or wait until they will be unreserved to proceed checkout.`;

			console.error(message);
			return alert(message);
		}

		console.log('All the products in cart are not reserved & available! Proceed checkout...');

		try {
			// 3. create checkout session:
			console.log('creating a new session...');

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
				.then(async (data) => {
					// session object:
					const session: Stripe.Checkout.Session = data;
					console.log({ session });

					// 4. reserve products:
					console.log('reserving products...');

					await fetch('/api/products/reserve', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							ids: $cart,
							sessionId: session.id,
							timestamp: Date.now() + 31 * 60 * 1000 // session.expires_at
						})
					})
						.then((data) => data.json())
						.then((reservedProducts: Stripe.Product[]) => {
							console.log({ reservedProducts });
							// update products store with archived products:
							productsStore.update((n) =>
								n.map((p) =>
									$cart.includes(p.id) ? reservedProducts.filter((a) => a.id === p.id)[0] : p
								)
							);
						});

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
