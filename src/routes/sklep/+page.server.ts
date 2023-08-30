import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load() {
	const allProducts = await products.fetchAndUnreserve();

	return { products: allProducts, prices: await prices.fetch() };
}
