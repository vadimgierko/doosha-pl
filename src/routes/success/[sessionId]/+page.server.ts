import prices from '$lib/server/prices';
import products from '$lib/server/products';
import session from '$lib/server/session';

export async function load({ params }) {
	const { sessionId } = params;

	return {
		// we are fetching & not unreserving products here !!!
		products: await products.fetchAll(),
		prices: await prices.fetch(),
		session: session.retrieve(sessionId)
	};
}
