import { archiveProduct } from '$lib/server/archiveProduct';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { ids } = data;

	const archivedProducts = await Promise.all(ids.map(async (id: string) => archiveProduct(id)));

	return new Response(JSON.stringify(archivedProducts), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
