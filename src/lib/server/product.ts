import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

async function fetch(id: string) {
	const product = await stripe.products.retrieve(id);

	return product;
}

async function archive(productId: string) {
	const archivedProduct = await stripe.products.update(productId, {
		active: false,
		metadata: ''
	});

	return archivedProduct;
}

async function reserve(productId: string, sessionId: string, timestamp: number) {
	const reservedProduct = await stripe.products.update(productId, {
		metadata: { sessionId, timestamp }
	});

	return reservedProduct;
}

async function unreserve(productId: string) {
	const unreservedProduct = await stripe.products.update(productId, {
		metadata: '' // to clear metadata or some of its keys => add empty string to it
	});

	return unreservedProduct;
}

export default {
	fetch,
	archive,
	reserve,
	unreserve
};
