<script lang="ts">
	import { page } from '$app/stores';
	import ProductsListWithFilter from '$lib/components/ProductsListWithFilter.svelte';

	export let data;

	const { products, prices } = data;

	$: subcategoryproducts = products.filter(
		(p) => p.metadata.subcategory === $page.params.subcategory
	);
</script>

<header>
	<h1 style="text-align: center;">
		Kategoria: Świeczniki ({data.products.length})
	</h1>
	<hr />
	<h2 style="text-align: center;">
		Podkategoria: {$page.params.subcategory} ({subcategoryproducts.length})
	</h2>
</header>

<hr />

<ProductsListWithFilter products={subcategoryproducts} {prices} />
