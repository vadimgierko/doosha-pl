<script lang="ts">
	import CategoryCard from '$lib/components/CategoryCard.svelte';
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
		}
	];
</script>

<h1 style="text-align:center">Sklep</h1>

<hr />

<div class="categories-list">
	{#each categories as category}
		<CategoryCard {category} />
	{/each}
</div>

<slot />

<style>
	.categories-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3em; /* Adjust the gap between cards as needed */
		max-width: 60%;
		margin: auto;
	}

	@media only screen and (max-width: 992px) {
		.categories-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2em; /* Adjust the gap between cards as needed */
			max-width: 75%;
			margin: auto;
		}
	}

	@media only screen and (max-width: 768px) {
		.categories-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1em; /* Adjust the gap between cards as needed */
			max-width: 85%;
			margin: auto;
		}
	}

	@media only screen and (max-width: 576px) {
		.categories-list {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			max-width: 100%;
		}
	}
</style>
