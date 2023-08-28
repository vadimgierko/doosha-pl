<h1 style="text-align:center">Sklep</h1>

<div class="products-list">
	<div class="product-card">
		<div class="product-card-header">
			<header>
				<a href={`/sklep/swieczniki`}><h2 class="product-card-title">Świeczniki</h2></a>
			</header>
		</div>
		<div class="product-card">
			<div class="product-card-img">
				<a href={`/sklep/swieczniki`}
					><img width="100%" src="candleholder.jpeg" alt="kategoria świeczniki" /></a
				>
			</div>
		</div>
	</div>

	<div class="product-card">
		<div class="product-card-header">
			<header>
				<a href={`/sklep/swieczki`}><h2 class="product-card-title">Świeczki</h2></a>
			</header>
		</div>
		<div class="product-card-img">
			<a href={`/sklep/swieczki`}><img width="100%" src="candle.jpeg" alt="kategoria świeczki" /></a
			>
		</div>
	</div>
</div>

<style>
	.products-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3em; /* Adjust the gap between cards as needed */
		max-width: 60%;
		margin: auto;
	}

	@media only screen and (max-width: 992px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2em; /* Adjust the gap between cards as needed */
			max-width: 75%;
			margin: auto;
		}
	}

	@media only screen and (max-width: 768px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1em; /* Adjust the gap between cards as needed */
			max-width: 85%;
			margin: auto;
		}
	}

	@media only screen and (max-width: 576px) {
		.products-list {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			max-width: 100%;
		}
	}

	.product-card {
		display: flex;
		flex-direction: column;
	}

	.product-card-title {
		text-align: center;
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
