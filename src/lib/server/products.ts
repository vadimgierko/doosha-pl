import product from './product';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

// FETCH ACTIVE PRODUCTS BY DEFAULT
async function fetchActive(ids?: string[]) { // FETCH ACTIVE PRODUCTS BY DEFAULT
	const active = (await stripe.products.list({ ids, limit: 100, active: true })).data;

	return active;
}

async function fetchArchived() {
	const archived = (await stripe.products.list({ limit: 100, active: false })).data;

	return archived;
}

async function fetchAll() {
	const all = (await stripe.products.list({ limit: 100})).data;

	return all;
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

async function fetchAndUnreserve() { // FETCH ACTIVE PRODUCTS BY DEFAULT
	// do this everytime you load products
	const timestamp = Date.now();
	// console.log('fetch timestamp:', timestamp);
	const products = await fetchAll();

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
	archive,
	fetchActive,
	fetchAll,
	fetchAndUnreserve, // do this everytime you load products
	fetchArchived,
	reserve,
	unreserve	
};
