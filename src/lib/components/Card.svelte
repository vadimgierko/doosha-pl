<script lang="ts">
	import type Stripe from 'stripe';
	import { cart } from '$lib/stores/cart';
	import RemoveFromCartButton from '$lib/components/RemoveFromCartButton.svelte';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';

	export let product: Stripe.Product;
	export let price: Stripe.Price | undefined;

	$: isProductInCart = $cart.find((id) => id === product.id);
</script>

<div class="product-card">
	<div class="product-card-img">
		<a href={`/product/${product.id}`}
			><img width="100%" src={product.images[0]} alt={product.name} /></a
		>
	</div>
	<div class="product-card-header">
		<header>
			<a href={`/product/${product.id}`}
				><h3 class="product-card-title">
					<span style="margin-right: 1em">{product.name}</span>
					{#if price && price.unit_amount}
						<span>{price.unit_amount / 100},-</span>
					{/if}
				</h3></a
			>
		</header>
	</div>
	{#if isProductInCart}
		<RemoveFromCartButton id={product.id} />
	{:else}
		<AddToCartButton id={product.id} />
	{/if}
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
</style>
