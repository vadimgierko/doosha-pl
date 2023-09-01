<script lang="ts">
	export let id: string;
</script>

<button on:click={() => alert(`Order archived product ${id} => not implemented yet...`)}>Zamów</button>

<style>
	button {
		background-color: transparent;
		/* border-radius: 0.5em; */
		border-color: rgb(83, 147, 207);
		padding: 0.5em 0;
		border-width: 1px;
	}

	button:hover {
		background-color: rgb(83, 147, 207);
		color: white;
	}
</style>
