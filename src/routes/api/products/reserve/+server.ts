import products from '$lib/server/products';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { ids, sessionId, timestamp } = data;

	const reservedProducts = await products.reserve(ids, sessionId, timestamp);

	return new Response(JSON.stringify(reservedProducts), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
