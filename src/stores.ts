import type Stripe from 'stripe';
import { writable } from 'svelte/store';

interface CartRecord {
	product: Stripe.Product;
	price: number;
}

const initCart: CartRecord[] = [];

export const cart = writable(initCart);
