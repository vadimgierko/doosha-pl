<script lang="ts">
	import { products } from '$lib/stores/products.js';
</script>

<h1 style="text-align: center;">Archived Products</h1>

<div class="products-list">
	{#each $products.filter((p) => p.active === false) as product}
		<div class="product-card">
			<div class="product-card-img">
				<a href={`/products/${product.id}`}
					><img width="100%" src={product.images[0]} alt={product.name} /></a
				>
			</div>
			<div class="product-card-header">
				<header>
					<a href={`/products/${product.id}`}
						><h3 class="product-card-title">
							<span style="margin-right: 1em">{product.name}</span>
						</h3></a
					>
				</header>
			</div>
		</div>
	{/each}
</div>

<style>
	.products-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 3em; /* Adjust the gap between cards as needed */
	}

	@media only screen and (max-width: 992px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}

	@media only screen and (max-width: 768px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}

	@media only screen and (max-width: 576px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			gap: 3em; /* Adjust the gap between cards as needed */
		}
	}

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
</style>
