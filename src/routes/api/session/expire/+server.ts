import session from '$lib/server/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	console.log({ data });
	const { sessionId } = data;
	console.log({ sessionId });

	const expiredSession = await session.expire(sessionId);
	console.log({ expiredSession });

	return new Response(JSON.stringify(expiredSession), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
