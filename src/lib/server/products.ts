import product from './product';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

async function fetch(ids?: string[]) {
	const products = (await stripe.products.list({ ids })).data;

	return products;
}

async function reserve(ids: string[], sessionId: string, timestamp: number) {
	const archivedProducts = await Promise.all(
		ids.map(async (id: string) => product.reserve(id, sessionId, timestamp))
	);

	return archivedProducts;
}

async function unreserve(ids: string[]) {
	const unreservedProducts = await Promise.all(
		ids.map(async (id: string) => product.unreserve(id))
	);

	return unreservedProducts;
}

async function archive(ids: string[]) {
	const archivedProducts = await Promise.all(ids.map(async (id: string) => product.archive(id)));

	return archivedProducts;
}

async function fetchAndUnreserve() {
	// do this everytime you load products
	const timestamp = Date.now();
	// console.log('fetch timestamp:', timestamp);
	const products = await fetch();

	const productsNotToReserve = products.filter(
		(p) =>
			!p.metadata.timestamp || (p.metadata.timestamp && Number(p.metadata.timestamp) > timestamp)
	);

	const productsToUnreserve = products.filter(
		(p) => p.metadata.timestamp && Number(p.metadata.timestamp) < timestamp
	);

	const idsToUnreserve = productsToUnreserve.map((p) => p.id);

	const unreservedProducts = await unreserve(idsToUnreserve);

	return [...productsNotToReserve, ...unreservedProducts];
}

export default {
	fetch,
	fetchAndUnreserve, // do this everytime you load products
	reserve,
	unreserve,
	archive
};
