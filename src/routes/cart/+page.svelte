<script lang="ts">
	import type Stripe from 'stripe';
	import { cart, removeFromCart } from '../../stores';

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
		.map((record) => ({
			product: getProduct(record.id),
			price: getPrice(record.id),
			qty: record.qty
		}))
		.filter((record) => record.product !== undefined && record.price !== undefined) as {
		product: Stripe.Product;
		price: Stripe.Price;
		qty: number;
	}[];
</script>

<h1 style="text-align:center">Cart ({$cart.length})</h1>

<hr />

{#if $cart.length === 0}
	<p style="text-align:center">Cart is empty...</p>
{:else}
	{#each cartProductsAndPrices as { product, price, qty }}
		<div class="container">
			<div style="min-width:100px; max-width:100px">
				<img width="100%" src={product.images[0]} alt={product.name} />
			</div>
			<div class="product-details">
				<h3>{product.name}</h3>
				{#if price.unit_amount}
					<p><strong>{price.unit_amount / 100},-</strong></p>
				{/if}
				<p />
				<p style="color: grey">{product.id}</p>
				<div>
					<button
						on:click={() => {
							if (qty > 0) {
								cart.update((records) =>
									records.map((r) => (r.id === product.id ? { ...r, qty: r.qty - 1 } : r))
								);
							}
						}}>-</button
					>{qty}<button
						on:click={() => {
							if (qty < Number(product.metadata.qty)) {
								cart.update((records) =>
									records.map((r) => (r.id === product.id ? { ...r, qty: r.qty + 1 } : r))
								);
							}
						}}>+</button
					>
				</div>
				<button on:click={() => removeFromCart(product.id)}>remove from cart</button>
			</div>
		</div>
	{/each}
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

	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(252, 52, 52);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(252, 52, 52);
		color: white;
	}
</style>
