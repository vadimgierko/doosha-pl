import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initCart: string[] = [];

export const cart = writable(initCart);
export const CART_NAME = 'doosha-cart';

export function addToCart(id: string) {
	cart.update((n) => [...n, id]);
	console.log('product with the id:', id, 'was added to cart.');
}

export function removeFromCart(id: string) {
	cart.update((n) => n.filter((i) => i !== id));
	console.log('product with the id:', id, 'was removed from cart.');
}

// NOTE: TO WORK WITH LOCAL STORAGE WE NEED TO CHECK IF WE ARE IN BROWSER ENV:
if (browser) {
	// get init cart items ids saved in local storage:
	const localStorageCart = localStorage.getItem(CART_NAME);
	console.log('Cart saved in local stroage:', localStorageCart);

	// if exists, populate cart storage:
	if (localStorageCart) {
		cart.set(JSON.parse(localStorageCart));
	}

	// when cart items are updated => log it & update local storage:
	cart.subscribe((ids) => {
		console.log('cart ids update:', ids);
		// update local storage:
		localStorage[CART_NAME] = JSON.stringify(ids);
	});
}
