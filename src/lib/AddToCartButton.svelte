<script lang="ts">
	import { addToCart } from '../stores';

	export let id: string;
</script>

<button on:click={() => addToCart(id)}>add to cart</button>

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
