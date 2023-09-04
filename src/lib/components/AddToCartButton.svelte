<script lang="ts">
	import type { CartRecord } from '$lib/interfaces/CartRecord';
	import { addToCart } from '$lib/stores/cart';

	export let id: string;
	export let category: CartRecord['category'];
</script>

<button on:click={() => addToCart({ id, category })}>add to cart</button>

<style>
	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(219, 218, 218);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(211, 198, 178);
		color: white;
	}
</style>
