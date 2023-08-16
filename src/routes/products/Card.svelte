<script lang="ts">
	import type Stripe from 'stripe';
	import { addToCart } from '../../stores';

	export let product: Stripe.Product;
	export let price: Stripe.Price | undefined;
</script>

<div class="product-card">
	<div class="product-card-img">
		<a href={`/products/${product.id}`}
			><img width="100%" src={product.images[0]} alt={product.name} /></a
		>
	</div>
	<div>
		<a href={`/products/${product.id}`}
			><h3 class="product-card-title">
				<span style="margin-right: 1em">{product.name}</span>
				{#if price && price.unit_amount}
					<span>{price.unit_amount / 100},-</span>
				{/if}
			</h3></a
		>
	</div>
	<button on:click={() => addToCart(product.id)} disabled={Number(product.metadata.qty) === 0}
		>Add to cart</button
	>
</div>

<style>
	.product-card {
		display: flex;
		flex-direction: column;
	}

	.product-card-title {
		display: flex;
		justify-content: space-between;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.product-card-img {
		width: 100%;
	}

	.product-card-title:hover,
	.product-card-img:hover {
		opacity: 0.8;
	}

	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(219, 218, 218);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(211, 198, 178);
		color: white;
	}
</style>
