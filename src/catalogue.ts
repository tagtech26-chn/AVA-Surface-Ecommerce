export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  accent: string;
  dimensions?: string;
  finish?: string;
  type?: string;
  pcsPerBox?: number;
  sqftPerBox?: number;
};

export const products: Product[] = [
  { id: '1', sku: 'TL-001', name: '18X12 DIG WALL TILES PRE', category: 'Wall Tiles', price: 108.69, unit: 'sq.ft', stock: 120, accent: 'linear-gradient(135deg,#d9c7ae,#8f7961)', dimensions: '18 × 12 in', finish: 'Premium', type: 'Digital Wall Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '2', sku: 'TL-002', name: '18X12 DIG WALL TILES 2001 PRE', category: 'Wall Tiles', price: 260, unit: 'sq.ft', stock: 85, accent: 'linear-gradient(135deg,#b9c0c5,#5e6870)', dimensions: '18 × 12 in', finish: 'Premium', type: 'Digital Wall Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '3', sku: 'TL-003', name: '18X12 DIG WALL TILES 1968 PRE', category: 'Wall Tiles', price: 650, unit: 'sq.ft', stock: 64, accent: 'linear-gradient(135deg,#e0d8c9,#a28c70)', dimensions: '18 × 12 in', finish: 'Premium', type: 'Digital Wall Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '4', sku: 'TL-005', name: '18X12 DIG COOL ROOF TILES 2050 PRE', category: 'Roof Tiles', price: 2100, unit: 'box', stock: 42, accent: 'linear-gradient(135deg,#c8d0c5,#637263)', dimensions: '18 × 12 in', finish: 'Cool Roof', type: 'Roof Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '5', sku: 'TL-006', name: '18X12 DIG ELEVATION TILES 4052 PRE', category: 'Elevation', price: 5500, unit: 'box', stock: 28, accent: 'linear-gradient(135deg,#bfc3c7,#54585d)', dimensions: '18 × 12 in', finish: 'Premium', type: 'Elevation Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '6', sku: 'TL-007', name: '18X12 DIG TILES 221487 PRE', category: 'Floor Tiles', price: 3250, unit: 'box', stock: 55, accent: 'linear-gradient(135deg,#d8c3b1,#876b58)', dimensions: '18 × 12 in', finish: 'Premium', type: 'Floor Tile', pcsPerBox: 6, sqftPerBox: 9 },
  { id: '7', sku: 'TL-072', name: '200X200 BATHROOM TILES PRE', category: 'Bathroom', price: 1200, unit: 'box', stock: 73, accent: 'linear-gradient(135deg,#d6e0e5,#728b98)', dimensions: '200 × 200 mm', finish: 'Premium', type: 'Bathroom Tile', pcsPerBox: 10, sqftPerBox: 4.31 },
];

export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
