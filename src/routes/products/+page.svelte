<script lang="ts">
	import type { Stripe } from 'stripe';
	import Card from './Card.svelte';

	export let data;
	const { products, prices } = data;

	function getPrice(productId: string) {
		const price = prices.find((p) => p.product === productId);
		return price;
	}
</script>

<h1 style="text-align: center;">Products</h1>

<div class="products-list">
	{#each products as product}
		<Card {product} price={getPrice(product.id)} />
	{/each}
	{#each products as product}
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
