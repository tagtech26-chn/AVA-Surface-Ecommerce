export type OrderRequest = {
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  subtotal: number;
  discount: number;
  handlingCharge: number;
  transportCharge: number;
  gst: number;
  grandTotal: number;
};

export type CreatedOrder = OrderRequest & {
  id: string;
  orderNumber: string;
  status: string;
  paymentReference?: string | null;
};

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5080';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function createOrder(order: OrderRequest) {
  return request<CreatedOrder>('/api/ecommerce/orders', { method: 'POST', body: JSON.stringify(order) });
}

export function confirmPayment(orderId: string, paymentReference: string) {
  return request<{ orderId: string; orderNumber: string; status: string; paymentReference: string }>(`/api/ecommerce/orders/${orderId}/payment`, { method: 'POST', body: JSON.stringify({ paymentReference }) });
}
