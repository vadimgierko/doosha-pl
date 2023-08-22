import { prices } from '$lib/stores/prices';
import { products } from '$lib/stores/products';
import type Stripe from 'stripe';

export default function logAndUpdateFetchedProductsAndPrices(data: {
	products: Stripe.Product[];
	prices: Stripe.Price[];
}) {
	console.log(
		'Fetching products & prices from Stripe: \nproducts:',
		data.products,
		'\nprices:',
		data.prices
	);
	// update products store:
	products.set(data.products);
	// update prices store:
	prices.set(data.prices);
}
