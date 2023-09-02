<script>
	import ScrollToTop from '$lib/layout/ScrollToTop.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Navbar from '$lib/layout/Navbar.svelte';
</script>

<Navbar />

<main>
	<slot />
	<ScrollToTop />
</main>

<Footer />

<style>
	main {
		flex-grow: 1;
		margin: 0 10%;
	}
</style>
