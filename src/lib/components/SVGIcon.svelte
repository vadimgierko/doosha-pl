<script lang="ts">
	// pass the path to svg file stored in /static/svg-icons:
	export let src: string;
	export let alt: string;
</script>

<img {src} {alt} />
