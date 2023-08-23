<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { products } from '$lib/stores/products.js';
	import logAndUpdateFetchedProductsAndPrices from '$lib/utils/logAndUpdateFetchedProductsAndPrices';

	export let data;

	function getPrice(productId: string) {
		const price = data.prices.find((p) => p.product === productId);
		return price;
	}

	$: logAndUpdateFetchedProductsAndPrices(data);
</script>

<h2 style="text-align: center;">
	Active ({$products.filter((p) => p.active === true && !p.metadata.timestamp).length})
</h2>

<div class="products-list">
	{#each $products.filter((p) => p.active === true && !p.metadata.timestamp) as product}
		<Card {product} price={getPrice(product.id)} />
	{/each}
</div>

<style>
	.products-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 3em; /* Adjust the gap between cards as needed */
	}

	@media only screen and (max-width: 992px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}

	@media only screen and (max-width: 768px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}

	@media only screen and (max-width: 576px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}
</style>
