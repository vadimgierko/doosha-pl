import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { CartRecord } from '$lib/interfaces/CartRecord';

const initCart: CartRecord[] = [];

export const cart = writable(initCart);
const CART_NAME = 'doosha-cart';

export function addToCart({ id, category }: { id: string; category: CartRecord['category'] }) {
	cart.update((n) => [...n, { id, category, qty: 1 }]);
	console.log('product with the id:', id, 'was added to cart.');
}

export function removeFromCart(id: string) {
	cart.update((records) => records.filter((r) => r.id !== id));
	console.log('product with the id:', id, 'was removed from cart.');
}

export function resetCart() {
	cart.set(initCart);
}

// NOTE: TO WORK WITH LOCAL STORAGE WE NEED TO CHECK IF WE ARE IN BROWSER ENV:
if (browser) {
	// get init cart items ids saved in local storage:
	const localStorageCart = localStorage.getItem(CART_NAME);
	console.log('Cart saved in local storage:', localStorageCart);

	// if exists, populate cart storage:
	if (localStorageCart) {
		cart.set(JSON.parse(localStorageCart));
	}

	// when cart items are updated => log it & update local storage:
	cart.subscribe((records) => {
		console.log('cart records update:', records);
		// update local storage:
		localStorage[CART_NAME] = JSON.stringify(records);
	});
}
