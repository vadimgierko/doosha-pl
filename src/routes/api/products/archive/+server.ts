import products from '$lib/server/products';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { ids } = data;

	const archivedProducts = await products.archive(ids);

	return new Response(JSON.stringify(archivedProducts), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
