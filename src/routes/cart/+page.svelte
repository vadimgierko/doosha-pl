<script lang="ts">
	import { cart } from '../../stores';

	function removeFromCart(productId: string) {
		cart.update((n) => n.filter((r) => r.product.id !== productId));
	}
</script>

<h1 style="text-align:center">Cart ({$cart.length})</h1>

<hr />

{#if $cart.length === 0}
	<p style="text-align:center">Cart is empty...</p>
{:else}
	{#each $cart as record (record.product.id)}
		<div class="container">
			<div style="min-width:100px; max-width:100px">
				<img width="100%" src={record.product.images[0]} alt="{record.product.name}}" />
			</div>
			<div class="product-details">
				<h3>{record.product.name}</h3>
				<p><strong>{record.price},-</strong></p>
				<p />
				<p style="color: grey">{record.product.id}</p>
				<button on:click={() => removeFromCart(record.product.id)}>remove from cart</button>
			</div>
		</div>
	{/each}
{/if}

<style>
	.container {
		display: flex;
		margin-bottom: 1em;
		width: 100%;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-left: 1em;
	}

	h3,
	p {
		margin-top: 0;
		margin-bottom: 0.5em;
	}

	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(252, 52, 52);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(252, 52, 52);
		color: white;
	}
</style>
