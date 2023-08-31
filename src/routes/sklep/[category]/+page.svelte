<script lang="ts">
	import { page } from '$app/stores';
	import ProductsList from '$lib/components/ProductsList.svelte';

	export let data;

	const { products, prices } = data;
</script>

<header>
	<h2 style="text-align: center;">
		Kategoria: {$page.params.category === 'swieczniki' ? 'Świeczniki' : 'Świece'} ({data.products
			.length})
	</h2>
</header>

<hr />

<ProductsList {products} {prices} />
