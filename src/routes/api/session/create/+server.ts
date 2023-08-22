import session from '$lib/server/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const prices: string[] = data.prices;
	const URL = data.url;
	console.log('chekout prices:', prices);

	const newSession = await session.create(prices, URL);

	return new Response(JSON.stringify(newSession), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
