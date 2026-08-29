import { calculateCheckout } from './checkout';

const result = calculateCheckout([{ price: 100, quantity: 2 }], 50, 100, 20, 18);

if (result.subtotal !== 200) throw new Error('Subtotal calculation failed');
if (result.taxableAmount !== 330) throw new Error('Taxable amount calculation failed');
if (result.gst !== 59.4) throw new Error('GST calculation failed');
if (result.grandTotal !== 389.4) throw new Error('Grand total calculation failed');
