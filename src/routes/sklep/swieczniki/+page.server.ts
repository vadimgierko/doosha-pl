import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load() {
	const allProducts = await products.fetchAndUnreserve();

	const filteredProducts = allProducts.filter((p) => p.metadata.category === 'świeczniki');

	return { products: filteredProducts, prices: await prices.fetch() };
}
