<script>
	import { cart } from '../stores';

	export let data;

	const { products, prices } = data;

	$: console.log('Fetching data: \nproducts:', products, '\nprices:', prices);
</script>

<nav>
	<strong>doosha store</strong>
	<div>
		<a href="/">home</a> |
		<a href="/products">products</a> |
		<a href="/cart">cart ({$cart.length})</a>
	</div>
</nav>

<main><slot /></main>

<footer style="text-align: center;">&copy; 2023 doosha.pl</footer>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 1em 0;
	}

	footer {
		padding: 1em 0;
	}

	main {
		flex-grow: 1;
	}

	nav,
	footer,
	main {
		margin: 0 10%;
	}
</style>
