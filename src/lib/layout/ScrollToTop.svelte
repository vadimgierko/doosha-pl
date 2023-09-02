<script lang="ts">
	import { browser } from '$app/environment';

	let display: 'none' | 'block' = 'none';

	if (browser) {
		window.addEventListener('scroll', () => {
			if (window.scrollY >= 20) {
				display = 'block';
			} else {
				display = 'none';
			}
		});
	}
</script>

<button
	style={`display:${display}`}
	on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button
>

<style>
	button {
		position: fixed; /* Fixed/sticky position */
		bottom: 20px; /* Place the button at the bottom of the page */
		right: 10%; /* Place the button 30px from the right */
		z-index: 99; /* Make sure it does not overlap */
		border: none; /* Remove borders */
		outline: none; /* Remove outline */
		background-color: rgba(232, 206, 177, 0.8); /* Set a background color */
		color: white; /* Text color */
		cursor: pointer; /* Add a mouse pointer on hover */
		padding: 15px; /* Some padding */
		border-radius: 10px; /* Rounded corners */
		font-size: 18px; /* Increase font size */
	}

	button:hover {
		background-color: rgba(232, 206, 177, 1);
	}
</style>
