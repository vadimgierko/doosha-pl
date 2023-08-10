<script>
	export let data;

	const { productId, product, price } = data;
</script>

<div class="container">
	<div>
		<img width="100%" src={product.images[0]} alt="{product.name}}" />
	</div>
	<div class="product-details">
		<h1 style="margin-top: 0">{product.name}</h1>
		<h2>{price.unit_amount ? price.unit_amount / 100 : ''},-</h2>
		<p style="color: grey">product id: {productId}</p>
		<p>{product.description}</p>
		<button>Add to cart</button>
	</div>
</div>

<style>
	.container {
		display: flex;
	}

	.product-details {
		display: flex;
		flex-direction: column;
		padding-left: 1em;
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
