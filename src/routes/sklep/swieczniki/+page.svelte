<script lang="ts">
	import CategoriesList from '$lib/components/CategoriesList.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import ProductsList from '$lib/components/ProductsList.svelte';
	import type { Category } from '$lib/interfaces/Category.js';
	import type { Order } from '$lib/interfaces/Order.js';
	import type { Sort } from '$lib/interfaces/Sort.js';
	import type Stripe from 'stripe';
	import { page } from '$app/stores';

	$: sort = $page.url.searchParams.get('sort')
		? ($page.url.searchParams.get('sort') as Sort)
		: 'price';
	$: order = $page.url.searchParams.get('order')
		? ($page.url.searchParams.get('order') as Order)
		: 'asc';

	export let data;

	const { products, prices } = data;

	function getPrice(productId: string) {
		const price = prices.find((p) => p.product === productId);
		return price;
	}

	function sortProducts(s: Sort, o: Order) {
		const productsWithPrices = products.map((p) => ({
			product: p,
			price: (getPrice(p.id) as Stripe.Price).unit_amount as number
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
		
		const sortedProductsIds = sortedProductsWithPrices.map(p => p.product.id)
		const sortedProducts = sortedProductsIds.map(id => (products.find(p => p.id === id) as Stripe.Product))

		return sortedProducts
	}

	// sort products when search params change:
	$: sortedProducts = sortProducts(sort, order)

	const basic = products.filter((p) => p.metadata.subcategory === 'basic');
	const wzory = products.filter((p) => p.metadata.subcategory === 'wzory');
	const napisy = products.filter((p) => p.metadata.subcategory === 'napisy');

	const subcategories: Category[] = [
		{
			imgSrc: basic[0].images[0],
			name: 'basic',
			slug: 'swieczniki/basic',
			title: 'Basic'
		},
		{
			imgSrc: wzory[0].images[0],
			name: 'wzory',
			slug: 'swieczniki/wzory',
			title: 'Wzory'
		},
		{
			imgSrc: napisy[0].images[0],
			name: 'napisy',
			slug: 'swieczniki/napisy',
			title: 'Napisy'
		}
	];
</script>

<h1 style="text-align: center;">
	Kategoria: Świeczniki ({products.length})
</h1>

<hr />

<h2 style="text-align: center;">Podkategorie ({subcategories.length})</h2>

<CategoriesList categories={subcategories} />

<hr />

<h2 style="text-align: center;">Wszystkie ({products.length})</h2>

<Filter />

<ProductsList products={sortedProducts} {prices} />
