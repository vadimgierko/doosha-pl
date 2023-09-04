# doosha-pl
 E-commerce site for doosha.pl - handmade ceramic products. Built with SvelteKit, TypeScript & Stripe.

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
