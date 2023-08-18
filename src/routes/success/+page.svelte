<script lang="ts">
	import { cart } from "../../stores";

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

	// reset cart:
	cart.set([]);
</script>

<h1>Thank you for your purchase!</h1>
<div><a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
