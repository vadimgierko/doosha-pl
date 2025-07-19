# doosha-pl
 E-commerce MVP site (fully functional, but not so pretty - I am not a designer) for a real-world e-commerce site doosha.pl - handmade ceramic products.
 
 Built with Svelte, SvelteKit, TypeScript & Stripe.

## setup

- vsc: `npm run dev -- --start`
- gh codespaces: `npm run dev -- --host`

## products metadata

```
{
  category: "świeczniki" | "świece",
  subcategory: "basic" | "wzory" | "napisy", // only for "świeczniki"
  sessionId?: string, // only for reserved "świeczniki"
  timestamp: number, // only for reserved "świeczniki"
}
```

## ⚠️ Warning ⚠️

This store is operating in test mode and was built from scratch using Svelte, SvelteKit, TypeScript, and Stripe for educational purposes, as well as to implement and test the core functionalities of e-commerce stores, such as payments, shopping cart, etc.

Products, prices, and descriptions are only preview versions of the store. 

Payments are fully functional, but also running in test mode (enter any test values in the payment form and it should work).

If you are interested in the products, please visit the live version of the store (ultimately built with WordPress), where you can place an actual order: https://www.doosha.pl/

