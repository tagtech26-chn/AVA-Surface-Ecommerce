# AVA Surface E-Commerce

Standalone e-commerce application for AVA Surface.

This repository is intentionally independent from `AVA-Surface-Billing-Final`.

## Scope

- Online product catalogue
- Customer accounts and delivery addresses
- Shopping cart
- Checkout
- Handling charges
- Transport charges
- GST/tax calculation
- Online payment workflow
- E-commerce order fulfilment

## Explicitly excluded

- POS manager approval
- POS credit-note workflow
- Cashier approval workflow

## Architecture

The e-commerce application will be developed and deployed independently. Shared business concepts such as products, customers, pricing and stock will be integrated through controlled APIs rather than by modifying the production billing repository.
