import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load({ params }) {
	const { category } = params;

	const allProducts = await products.fetchAndUnreserve();

	const categoryProducts = allProducts.filter((p) =>
		category === 'swieczniki'
			? !p.metadata.productType
			: p.metadata.productType && p.metadata.productType === 'candles'
	);

	return { products: categoryProducts, prices: await prices.fetch() };
}
