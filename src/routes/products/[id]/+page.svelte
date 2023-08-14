<script>
	import { page } from '$app/stores';
	import { addToCart } from '../../../stores';

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
			<button on:click={() => addToCart(productId)}>Add to cart</button>
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
