import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load() {
	const archivedProducts = await products.fetchArchived();

	return { products: archivedProducts, prices: await prices.fetch() };
}
