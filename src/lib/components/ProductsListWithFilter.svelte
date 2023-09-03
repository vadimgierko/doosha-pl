<script lang="ts">
	import Filter from './Filter.svelte';
	import ProductsList from './ProductsList.svelte';
	import type { Order } from '$lib/interfaces/Order.js';
	import type { Sort } from '$lib/interfaces/Sort.js';
	import type Stripe from 'stripe';
	import { page } from '$app/stores';
	import getPrice from '$lib/utils/getPrice';

	export let products: Stripe.Product[];
	export let prices: Stripe.Price[];

	$: sort = $page.url.searchParams.get('sort')
		? ($page.url.searchParams.get('sort') as Sort)
		: 'price';
	$: order = $page.url.searchParams.get('order')
		? ($page.url.searchParams.get('order') as Order)
		: 'asc';

	function sortProducts(s: Sort, o: Order) {
		const productsWithPrices = products.map((p) => ({
			product: p,
			price: (getPrice(p.id, prices) as Stripe.Price).unit_amount as number
		}));

		const sortedProductsWithPrices =
			s === 'price'
				? [...productsWithPrices].sort((a, b) =>
						o === 'asc' ? a.price - b.price : b.price - a.price
				  )
				: [...productsWithPrices].sort((a, b) =>
						o === 'asc'
							? a.product.created - b.product.created
							: b.product.created - a.product.created
				  );

		const sortedProductsIds = sortedProductsWithPrices.map((p) => p.product.id);
		const sortedProducts = sortedProductsIds.map(
			(id) => products.find((p) => p.id === id) as Stripe.Product
		);

		return sortedProducts;
	}

	// sort products when search params change:
	$: sortedProducts = sortProducts(sort, order);
</script>

<Filter />
<ProductsList products={sortedProducts} {prices} />
