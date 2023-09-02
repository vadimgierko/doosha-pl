<script>
	import SVGIcon from '$lib/components/SVGIcon.svelte';
	import { cart } from '$lib/stores/cart';
</script>

<nav>
	<a href="/" class="brand"><strong>doosha</strong></a>

	<div>
		<a href="/sklep">sklep</a> |
		<a href="/sklep/archiwum">archiwum</a> |
		<a class="icon" href="/koszyk">
			<SVGIcon src="/svg-icons/cart.svg" alt="ikona koszyka" />
			<span class="amount">({$cart.length})</span>
		</a>
		|
		<a class="icon" href="https://www.instagram.com/doos.ha/" target="_blank">
			<SVGIcon src="/svg-icons/instagram.svg" alt="ikona instagrama" />
		</a>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 1em 0;
		margin: 0 10%;
	}

	.brand {
		text-decoration: none;
		color: black;
	}

	.icon {
		vertical-align: -0.125em;
		text-decoration: none;
	}

	.amount {
		vertical-align: 0.125em;
	}
</style>
