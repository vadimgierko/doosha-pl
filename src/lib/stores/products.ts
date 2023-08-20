import type Stripe from 'stripe';
import { writable } from 'svelte/store';

export const products = writable<Stripe.Product[]>([]);

products.subscribe((p) => {
	console.log('products store was updated:', p);
});
