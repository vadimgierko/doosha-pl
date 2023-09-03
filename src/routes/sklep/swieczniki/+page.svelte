<script lang="ts">
	import CategoriesList from '$lib/components/CategoriesList.svelte';
	import type { Category } from '$lib/interfaces/Category.js';
	import ProductsListWithFilter from '$lib/components/ProductsListWithFilter.svelte';

	export let data;
	const { products, prices } = data;

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

<ProductsListWithFilter {products} {prices} />
