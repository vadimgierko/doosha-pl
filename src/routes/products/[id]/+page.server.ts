import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
	const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

	const product = await stripe.products.retrieve(params.id)

	return { product };
}