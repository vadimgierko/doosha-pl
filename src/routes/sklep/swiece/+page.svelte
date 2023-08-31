<script lang="ts">
	import ProductsList from '$lib/components/ProductsList.svelte';

	export let data;

	const { products, prices } = data;
</script>

<h1 style="text-align: center;">
	Kategoria: Świece ({products.length})
</h1>

<hr />

<ProductsList {products} {prices} />
