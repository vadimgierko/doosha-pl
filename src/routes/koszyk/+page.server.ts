import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load() {
	return { products: await products.fetchAndUnreserve(), prices: await prices.fetch() };
}
