<script lang="ts">
	import CategoriesList from '$lib/components/CategoriesList.svelte';
	import type { Category } from '$lib/interfaces/Category';

	export let data;

	const archivedProducts = data.products.filter((p) => !p.active);
	const archivedProductImageSrc = archivedProducts.length
		? archivedProducts[0].images[0]
		: '/candle.jpeg';

	const categories: Category[] = [
		{
			imgSrc: '/candleholder.jpeg',
			name: 'świeczniki',
			slug: 'swieczniki',
			title: 'Świeczniki'
		},
		{
			imgSrc: '/candle.jpeg',
			name: 'świece',
			slug: 'swiece',
			title: 'Świece'
		},
		{
			imgSrc: archivedProductImageSrc,
			name: 'archiwum',
			slug: 'archiwum',
			title: 'Archiwum (dostępne na zamówienie)'
		}
	];
</script>

<h1 style="text-align:center">Sklep</h1>

<hr />

<CategoriesList {categories} />
