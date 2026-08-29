export type CheckoutLine = { price: number; quantity: number };

export type CheckoutCharges = {
  subtotal: number;
  discount: number;
  handlingCharge: number;
  transportCharge: number;
  taxableAmount: number;
  gst: number;
  grandTotal: number;
};

export function calculateCheckout(lines: CheckoutLine[], handlingCharge: number, transportCharge: number, discount = 0, gstRate = 18): CheckoutCharges {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const taxableAmount = Math.max(0, subtotal - discount + handlingCharge + transportCharge);
  const gst = taxableAmount * (gstRate / 100);
  return {
    subtotal,
    discount,
    handlingCharge,
    transportCharge,
    taxableAmount,
    gst,
    grandTotal: taxableAmount + gst,
  };
}
