import type Stripe from 'stripe';
import { writable } from 'svelte/store';

export const prices = writable<Stripe.Price[]>([]);

prices.subscribe((p) => {
	console.log('prices store was updated:', p);
});
