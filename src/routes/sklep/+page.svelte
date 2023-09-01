<script lang="ts">
	import CategoriesList from '$lib/components/CategoriesList.svelte';
	import type { Category } from '$lib/interfaces/Category';

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
			imgSrc: '/candle.jpeg',
			name: 'archiwum',
			slug: 'archiwum',
			title: 'Archiwum (dostępne na zamówienie)'
		}
	];
</script>

<h1 style="text-align:center">Sklep</h1>

<hr />

<CategoriesList {categories} />
