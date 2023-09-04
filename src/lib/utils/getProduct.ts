import type Stripe from 'stripe';

export default function getProduct(productId: string, products: Stripe.Product[]) {
	const product = products.find((p) => p.id === productId);
	return product;
}
