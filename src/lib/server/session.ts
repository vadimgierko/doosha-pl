import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

async function create(prices: string[], URL: string) {
	const session = await stripe.checkout.sessions.create({
		line_items: prices.map((p) => ({ price: p, quantity: 1 })), // stripe wants: [ { price: "1", quantity: 6 }, { price: "2", quantity: 3 } ]
		submit_type: 'pay',
		mode: 'payment',
		// HERE BELOW YOU CAN ADD ANY AVAILABLE PAYMENT METHODS TO AN ARRAY:
		payment_method_types: ['card', 'p24', 'blik'],
		billing_address_collection: 'auto',
		// COLLECT SHIPPING ADRESSES:
		shipping_address_collection: { allowed_countries: ['PL'] },
		// shipping_options: [
		//   { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
		// ],
		phone_number_collection: {
			enabled: true
		},
		currency: 'pln',
		// TODO: CHANGE IT TO ACCEPT ANY URL WE ARE IN:
		success_url: `${URL}/success/{CHECKOUT_SESSION_ID}`,
		cancel_url: `${URL}/cancel/{CHECKOUT_SESSION_ID}`,
		// FORCE SESSION EXPIRE AFTER 30 MINUTES:
		expires_at: Math.floor(Date.now() / 1000) + 3600 * 0.5 // Configured to expire after 30 minutes
		// description: "Test description", // single string
	});

	return session;
}

async function expire(sessionId: string) {
	const expiredSession = await stripe.checkout.sessions.expire(sessionId);

	return expiredSession;
}

export default {
	create,
	expire
};
