<script>
	import ScrollToTop from '$lib/layout/ScrollToTop.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Navbar from '$lib/layout/Navbar.svelte';

	const messages = [
		`
[PL] UWAGA! Niniejszy sklep funkcjonuje w trybie testowym i został stworzony od podstaw w technologiach Svelte, SvelteKit, TypeScript oraz Stripe w celach edukacyjnych oraz by wdrożyć i przetestować podstawowe funkcjonalności sklepów e-commerce, tj. płatności, koszyk itd.
Produkty, ceny i opisy służą jako wersja podglądowa sklepu. Płatności są w pełni funkcjonalne, aczkolwiek również w trybie testowym (wpisz dowolne testowe wartości w formularzu płatności i powinno zadziałać).
Jeśli są Państwo zainteresowani produktami, zapraszamy na działającą stronę sklepu (ostatecznie zrobioną w WordPressie), gdzie można złożyć zamówienie:
`,
		`
[EN] WARNING! This store is operating in test mode and was built from scratch using Svelte, SvelteKit, TypeScript, and Stripe for educational purposes, as well as to implement and test the core functionalities of e-commerce stores, such as payments, shopping cart, etc.
Products, prices, and descriptions are only preview versions of the store. Payments are fully functional, but also running in test mode (enter any test values in the payment form and it should work).
If you are interested in the products, please visit the live version of the store (ultimately built with WordPress), where you can place an actual order:
`
	];
</script>

<Navbar />

<main>
	<slot />

	<div id="messages">
		{#each messages as message}
			<p>
				{message}
				<a href="https://www.doosha.pl/" target="_blank">doosha.pl</a>
			</p>
		{/each}
	</div>

	<ScrollToTop />
</main>

<Footer />

<style>
	main {
		flex-grow: 1;
		margin: 0 10%;

		& #messages {
			margin: 20px 0;
			padding: 10px;
			border: 1px solid red;
			border-radius: 5px;
			background-color: #f8d7da;
			color: red;
		}
	}
</style>
