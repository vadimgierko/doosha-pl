<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import { products } from '$lib/stores/products';
	import logAndUpdateFetchedProductsAndPrices from '$lib/utils/logAndUpdateFetchedProductsAndPrices';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';

	export let data;

	function getPrice(productId: string) {
		const price = data.prices.find((p) => p.product === productId);
		return price;
	}

	$: logAndUpdateFetchedProductsAndPrices(data);

	//========== FILTER =============//

	$: searchParams = $page.url.searchParams;

	type Category = 'all' | 'candlesticks' | 'candles';
	const allowedCategories: Category[] = ['all', 'candlesticks', 'candles'];

	type Status = 'active' | 'reserved' | 'archived';
	const allowedStatuses: Status[] = ['active', 'reserved', 'archived'];

	let category: Category = 'all';
	let status: Status = 'active';

	onMount(() => {
		category = searchParams.get('category') ? (searchParams.get('category') as Category) : 'all';
		status = searchParams.get('status') ? (searchParams.get('status') as Status) : 'active';
	});

	$: {
		if (category !== 'all') {
			if (status !== 'active') {
				goto(`?category=${category}&status=${status}`);
			} else {
				goto(`?category=${category}`);
			}
		} else {
			if (status !== 'active') {
				goto(`?status=${status}`);
			} else {
				goto('/products');
			}
		}
	}

	$: console.log('category:', category, 'status:', status);

	$: filteredProducts = $products
		.filter((p) => {
			if (category === 'candles') {
				return p.metadata.productType && p.metadata.productType === 'candles' ? true : false;
			} else if (category === 'candlesticks') {
				return p.metadata.productType ? false : true;
			} else {
				return p;
			}
		})
		.filter((p) => {
			if (status === 'reserved') {
				return p.metadata.timestamp ? true : false;
			} else if (status === 'archived') {
				return p.active === false;
			} else if (status === 'active') {
				return p.active;
			}
		});
</script>

<header>
	<h1 style="text-align: center;">Products</h1>
</header>

<!-- <nav>
	<span>Category:</span>
	<a href={`?status=${status}`}>all</a> |
	<a href={`?category=candlesticks&status=${status}`}>candlesticks</a> |
	<a href={`?category=candles&status=${status}`}>candles</a>
	<span>Status:</span>
	<a href={`?category=${category}`}>active</a> |
	<a href={`?category=${category}&status=reserved`}>reserved</a> |
	<a href={`?category=${category}&status=archived`}>archived</a>
</nav> -->

<div id="filter">
	Category:
	<select bind:value={category}>
		{#each allowedCategories as c}
			<option value={c}>{c}</option>
		{/each}
	</select>
	Status:
	<select bind:value={status}>
		{#each allowedStatuses as s}
			<option value={s}>{s}</option>
		{/each}
	</select>
</div>

<div class="products-list">
	{#each filteredProducts as product}
		<Card {product} price={getPrice(product.id)} />
	{/each}
</div>

<style>
	#filter {
		text-align: center;
		margin-bottom: 1em;
	}

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
