<script lang="ts">
	import type { Category } from '$lib/interfaces/Category';

	export let category: Category;
</script>

<div class="category-card">
	<div class="category-card">
		<div class="category-card-img">
			<a href={`/sklep/${category.slug}`}
				><img width="100%" src={category.imgSrc} alt={`kategoria ${category.name}`} /></a
			>
		</div>
	</div>
	<header>
		<a href={`/sklep/${category.slug}`}><h2 class="category-card-title">{category.title}</h2></a>
	</header>
</div>

<style>
	.category-card {
		display: flex;
		flex-direction: column;
	}

	.category-card-title {
		text-align: center;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.category-card-img {
		width: 100%;
	}

	.category-card-title:hover,
	.category-card-img:hover {
		opacity: 0.8;
	}
</style>
