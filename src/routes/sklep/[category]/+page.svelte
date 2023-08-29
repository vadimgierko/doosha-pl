<script lang="ts">
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/ProductCard.svelte';

	export let data;
	const { products } = data;
	const { category } = $page.params;

	function getPrice(productId: string) {
		const price = data.prices.find((p) => p.product === productId);
		return price;
	}

	$: console.log({ category });
</script>

<header>
	<h1 style="text-align: center;">{category === 'swieczniki' ? 'Świeczniki' : 'Świeczki'}</h1>
</header>

<div class="products-list">
	{#each products as product}
		<ProductCard {product} price={getPrice(product.id)} />
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
