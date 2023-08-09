<script lang="ts">
	import type { Stripe } from 'stripe';

	export let product: Stripe.Product;
	export let price: number | string;
</script>

<div class="product-card">
	<div class="product-card-img">
		<a href={`/products/${product.id}`}
			><img width="100%" src={product.images[0]} alt={product.name} /></a
		>
	</div>
	<div>
		<a href={`/products/${product.id}`}
			><h3 class="product-card-title">
				<span style="margin-right: 1em">{product.name}</span><span>{price},-</span>
			</h3></a
		>
	</div>
	<button>Add to cart</button>
</div>

<style>
	.product-card {
		display: flex;
		flex-direction: column;
	}

	.product-card-title {
		display: flex;
		justify-content: space-between;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.product-card-img {
		width: 100%;
	}

	.product-card-title:hover,
	.product-card-img:hover {
		opacity: 0.8;
	}

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
