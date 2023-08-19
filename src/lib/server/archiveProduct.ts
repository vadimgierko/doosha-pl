import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

export async function archiveProduct(productId: string) {
	const archivedProduct = await stripe.products.update(productId, {
		active: false
	});

	return archivedProduct;
}
