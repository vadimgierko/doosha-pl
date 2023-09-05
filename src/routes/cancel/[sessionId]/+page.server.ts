import products from "$lib/server/products.js";
import session from "$lib/server/session";

export async function load({params}) {
    const {sessionId} = params

    return {
        session: await session.retrieve(sessionId),
        line_items: await session.fetchLineItems(sessionId),
        last20sessions: await session.fetchLast20Sessions(),
    }
}