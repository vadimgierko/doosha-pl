import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load() {
	// we are fetching & not unreserving products here !!!
	return { products: await products.fetch(), prices: await prices.fetch() };
}
