import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

export async function load() {
	const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

	const products = (await stripe.products.list()).data;
	const prices = (await stripe.prices.list()).data;

	return { products, prices };
}