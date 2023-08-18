<script>
	import { page } from '$app/stores';
	import AddToCartButton from '$lib/AddToCartButton.svelte';
	import RemoveFromCartButton from '$lib/RemoveFromCartButton.svelte';
	import { cart, addToCart } from '../../../stores';

	export let data;

	const productId = $page.params.id;
	const product = data.products.find((p) => p.id === productId);
	const price = data.prices.find((p) => p.product === productId);

	$: product && price
		? console.log(
				'PRODUCT PAGE: \nproduct id:',
				productId,
				'\nproduct:',
				product,
				'\nprice:',
				price
		  )
		: console.error(`PRODUCT PAGE: There is no product data of id ${productId}...`);

	$: isProductInCart = product ? $cart.find((id) => id === product.id) : undefined;
</script>

{#if product && price && price.unit_amount}
	<div class="container">
		<div>
			<img width="100%" src={product.images[0]} alt="{product.name}}" />
		</div>
		<div class="product-details">
			<h1 style="margin-top: 0">{product.name}</h1>
			<h2>{price.unit_amount / 100},-</h2>
			<p style="color: grey">product id: {productId}</p>
			<p>{product.description}</p>
			{#if isProductInCart}
				<RemoveFromCartButton id={product.id} />
			{:else}
				<AddToCartButton id={product.id} />
			{/if}
		</div>
	</div>
{:else}
	<p style="text-align:center;">There is no such product with the id {productId}...</p>
{/if}

<style>
	.container {
		display: flex;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		padding-left: 1em;
	}
</style>
