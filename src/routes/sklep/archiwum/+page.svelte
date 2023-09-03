<script lang="ts">
	import ProductsListWithFilter from '$lib/components/ProductsListWithFilter.svelte';

	export let data;

	const { products, prices } = data;
</script>

<h1 style="text-align: center;">
	Kategoria: Archiwum - produkty dostępne na zamówienie ({products.length})
</h1>

<hr />

<ProductsListWithFilter {products} {prices} />
