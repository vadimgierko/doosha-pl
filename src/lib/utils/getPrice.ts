import type Stripe from 'stripe';

export default function getPrice(productId: string, prices: Stripe.Price[]) {
	const price = prices.find((p) => p.product === productId);
	return price;
}
