import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load({ params }) {
	const allProducts = await products.fetchAndUnreserve();

	const { category } = params;

	const categoryProducts = allProducts.filter((p) =>
		category === 'swiece' ? p.metadata.category === 'świece' : p.metadata.category === 'świeczniki'
	);

	return { products: categoryProducts, prices: await prices.fetch() };
}
