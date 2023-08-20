<script lang="ts">
	import { removeFromCart } from '$lib/stores/cart';

	export let id: string;
</script>

<button on:click={() => removeFromCart(id)}>remove from cart</button>

<style>
	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(252, 52, 52);
		color: rgb(252, 52, 52);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(252, 52, 52);
		color: white;
	}
</style>
