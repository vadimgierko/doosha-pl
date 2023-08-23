<script>
	import { page } from '$app/stores';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';
	import RemoveFromCartButton from '$lib/components/RemoveFromCartButton.svelte';
	import { cart } from '$lib/stores/cart';
	import logAndUpdateFetchedProductsAndPrices from '$lib/utils/logAndUpdateFetchedProductsAndPrices';

	export let data;

	const productId = $page.params.id;
	const { products, prices } = data;
	console.log({ products, prices });
	const product = products.find((p) => p.id === productId);
	console.log({ product });
	const price = prices.find((p) => p.product === productId);

	$: logAndUpdateFetchedProductsAndPrices(data);

	$: isProductInCart = product ? $cart.find((id) => id === product.id) : undefined;
	$: reservedUntil = product
		? product.metadata.sessionId
			? new Date(Number(product.metadata.timestamp))
			: null
		: null;
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
			{#if product.active}
				{#if reservedUntil}
					<p style="color:red">
						Product is reserved until {reservedUntil}
					</p>
				{:else if isProductInCart}
					<RemoveFromCartButton id={product.id} />
				{:else}
					<AddToCartButton id={product.id} />
				{/if}
			{:else}
				<p style="color:red">
					Product is archived (has been purchased)... Cannot buy this product.
				</p>
			{/if}
		</div>
	</div>
{:else}
	<p style="text-align:center">There is no such product with the id {productId}...</p>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: row;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		padding-left: 1em;
	}

	@media only screen and (max-width: 400px) {
		.container {
			flex-direction: column;
		}

		.product-details {
			margin-top: 1em;
			padding-left: 0;
		}
	}
</style>
