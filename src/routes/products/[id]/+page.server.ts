import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

export async function load({ params }) {
	const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

	const productId = params.id;
	const product = await stripe.products.retrieve(params.id);
	const priceId = product.default_price;
	const price = await stripe.prices.retrieve(priceId as string);

	return {
		product,
		productId,
		price
	};
}
