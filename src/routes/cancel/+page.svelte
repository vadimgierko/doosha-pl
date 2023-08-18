<script lang="ts">
	// TODO: CONVERT THIS REACT CODE & USE ITS LOGIC:

	// const { session_id } = router.query;
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
	// 		console.log("session is retrieved on cancel page => expire session!");

	// 		if (session.status === "open") {
	// 			expireSession(session_id);
	// 		} else {
	// 			console.log(
	// 				"no need to expire session, because it's expired already ;-)"
	// 			);
	// 		}
	// 	}
	// }, [session, session_id]);
</script>

<h1 style="text-align: center">Payment was canceled...</h1>
<div><a href="/cart">back to cart</a> | <a href="/products">back to store</a></div>

<style>
	* {
		text-align: center;
	}
</style>
