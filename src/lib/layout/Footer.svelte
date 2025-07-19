<script>
	import SVGIcon from '$lib/components/SVGIcon.svelte';

	const d = new Date();
	const currentYear = d.getFullYear();
</script>

<footer style="text-align: center;">
	<hr />
	<p class="text-center">
		developed by Vadim Gierko &copy; 2023-{currentYear}
		|
		<!-- GLOBE ICON WWW LINK -->
		<a class="icon" href="https://vadimgierko.com" target="_blank">
			<SVGIcon src="/svg-icons/globe.svg" alt="ikona kuli ziemskiej reprezentująca stronę www" />
		</a>
		|
		<!-- GITHUB ICON LINK -->
		<a class="icon" href="https://github.com/vadimgierko" target="_blank">
			<SVGIcon src="/svg-icons/github.svg" alt="ikona logo github" />
		</a>
		|
		<!-- REPO LINK -->
		<a class="icon" href="https://github.com/vadimgierko/doosha-pl" target="_blank">
			[see code]
		</a>
	</p>
</footer>

<style>
	footer {
		margin: 0 10%;
		padding: 1em 0;
		margin-top: 1em;
	}
</style>
