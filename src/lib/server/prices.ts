import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

async function fetch() {
	const prices = (await stripe.prices.list({ limit: 100 })).data;

	return prices;
}

export default {
	fetch
};
