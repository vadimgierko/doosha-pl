import prices from '$lib/server/prices';
import products from '$lib/server/products';

export async function load({ params }) {
	const allProducts = await products.fetchAndUnreserve();

	const { category } = params;

	const categoryProducts = allProducts.filter((p) =>
		category === 'swieczniki'
			? !p.metadata.productType
			: p.metadata.productType && p.metadata.productType === 'candles'
	);

	console.log(`${category} was fetched => ${categoryProducts.length}`);

	return { products: categoryProducts, prices: await prices.fetch() };
}
