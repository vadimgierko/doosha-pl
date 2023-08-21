<script lang="ts">
	import { onMount } from 'svelte';
	import { cart, resetCart } from '$lib/stores/cart';
	import { products } from '$lib/stores/products.js';
	import { prices } from '$lib/stores/prices.js';
	import type Stripe from 'stripe';

	// TODO: CONVERT THIS REACT CODE & USE ITS LOGIC:

	// const { session_id } = router.query;
	// const { resetCart } = useCart();
	// const [session, setSession] = useState();

	// async function getSession(id) {
	// 	const s = await retrieveSession(id);
	// 	setSession(s);
	// }

	// useEffect(() => {
	// 	if (session_id) {
	// 		getSession(session_id);
	// 	}
	// }, [session_id]);

	// useEffect(() => {
	// 	if (session) {
	// 		resetCart();
	// 		// TODO: check if session is completed, then => update inventory()
	// 		console.log("session is retrieved on success page => update inventory!");
	// 	}
	// }, [session]);

	export let data;

	$: {
		console.log(
			'Fetching products & prices from Stripe: \nproducts:',
			data.products,
			'\nprices:',
			data.prices
		);
		// update products store:
		products.set(data.products);
		// update prices store:
		prices.set(data.prices);
	}

	onMount(() => {
		try {
			fetch('api/products/archive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: $cart })
			})
				.then((data) => data.json())
				.then((archivedProducts: Stripe.Product[]) => {
					console.log({ archivedProducts });
					// update products store with archived products:
					products.update((n) =>
						n.map((p) =>
							$cart.includes(p.id) ? archivedProducts.filter((a) => a.id === p.id)[0] : p
						)
					);
					resetCart();
				});
		} catch (error) {
			console.error(error);
			alert(error);
		}
	});
</script>

<h1>Thank you for your purchase!</h1>
<div><a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
