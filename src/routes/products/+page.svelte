<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import { products } from '$lib/stores/products';
	import logAndUpdateFetchedProductsAndPrices from '$lib/utils/logAndUpdateFetchedProductsAndPrices';

	export let data;

	function getPrice(productId: string) {
		const price = data.prices.find((p) => p.product === productId);
		return price;
	}

	$: logAndUpdateFetchedProductsAndPrices(data);

	//========== FILTER =============//
	type Category = 'all' | 'candlesticks' | 'candles';
	const allowedCategories: Category[] = ['all', 'candlesticks', 'candles'];

	type Status = 'active' | 'reserved' | 'archived';
	const allowedStatuses: Status[] = ['active', 'reserved', 'archived'];

	$: category = $page.url.searchParams.get('category')
		? ($page.url.searchParams.get('category') as string)
		: 'all';
	$: status = $page.url.searchParams.get('status')
		? ($page.url.searchParams.get('status') as string)
		: 'active';

	function updateCategory(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		const target = e.target as HTMLSelectElement;
		const c = target.value;
		if (c !== 'all') {
			if (status !== 'active') {
				goto(`?category=${c}&status=${status}`);
			} else {
				goto(`?category=${c}`);
			}
		} else {
			if (status !== 'active') {
				goto(`?status=${status}`);
			} else {
				goto('/products');
			}
		}
	}

	function updateStatus(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		const target = e.target as HTMLSelectElement;
		const s = target.value;
		if (category !== 'all') {
			if (s !== 'active') {
				goto(`?category=${category}&status=${s}`);
			} else {
				goto(`?category=${category}`);
			}
		} else {
			if (s !== 'active') {
				goto(`?status=${s}`);
			} else {
				goto('/products');
			}
		}
	}

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
	<div>
		Category:
		<select value={category} on:change={(e) => updateCategory(e)}>
			{#each allowedCategories as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</div>
	<div>
		Status:
		<select value={status} on:change={(e) => updateStatus(e)}>
			{#each allowedStatuses as s}
				<option value={s}>{s}</option>
			{/each}
		</select>
	</div>
</div>

<div class="products-list">
	{#each filteredProducts as product}
		<Card {product} price={getPrice(product.id)} />
	{/each}
</div>

<style>
	#filter {
		justify-content: center;
		display: flex;
		margin-bottom: 1em;
	}

	#filter div:not(:last-child) {
		margin-right: 1em;
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

		#filter {
			display: block;
			text-align: center;
		}

		#filter div:not(:last-child) {
			margin-right: 0;
		}
	}
</style>
