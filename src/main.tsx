import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import './styles.css';

type Product = { id: string; sku: string; name: string; category: string; price: number; unit: string; image?: string; stock: number };
type CartLine = { product: Product; quantity: number };

const products: Product[] = [
  { id: '1', sku: 'TL-001', name: '18X12 DIG WALL TILES PRE', category: 'Wall Tiles', price: 108.69, unit: 'sq.ft', stock: 120 },
  { id: '2', sku: 'TL-002', name: '18X12 DIG WALL TILES 2001 PRE', category: 'Wall Tiles', price: 260, unit: 'sq.ft', stock: 85 },
  { id: '3', sku: 'TL-003', name: '18X12 DIG WALL TILES 1968 PRE', category: 'Wall Tiles', price: 650, unit: 'sq.ft', stock: 64 },
  { id: '4', sku: 'TL-005', name: '18X12 DIG COOL ROOF TILES 2050 PRE', category: 'Roof Tiles', price: 2100, unit: 'box', stock: 42 },
  { id: '5', sku: 'TL-006', name: '18X12 DIG ELEVATION TILES 4052 PRE', category: 'Elevation', price: 5500, unit: 'box', stock: 28 },
  { id: '6', sku: 'TL-007', name: '18X12 DIG TILES 221487 PRE', category: 'Floor Tiles', price: 3250, unit: 'box', stock: 55 },
  { id: '7', sku: 'TL-072', name: '200X200 BATHROOM TILES PRE', category: 'Bathroom', price: 1200, unit: 'box', stock: 73 },
];

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = useMemo(() => products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const add = (product: Product) => setCart(current => { const found = current.find(x => x.product.id === product.id); return found ? current.map(x => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x) : [...current, { product, quantity: 1 }]; });
  const change = (id: string, delta: number) => setCart(current => current.map(x => x.product.id === id ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0));

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
        <div className="mr-auto"><div className="text-xl font-black tracking-tight">AVA <span className="text-indigo-600">SURFACE</span></div><div className="text-[10px] font-bold uppercase tracking-[.25em] text-slate-400">Online Store</div></div>
        <div className="hidden max-w-xl flex-1 md:flex"><div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3"><Search size={18} className="text-slate-400"/><input className="w-full bg-transparent py-2.5 text-sm outline-none" placeholder="Search tiles, SKU..." value={query} onChange={e => setQuery(e.target.value)} /></div></div>
        <button onClick={() => setCartOpen(true)} className="relative rounded-xl bg-slate-900 p-3 text-white"><ShoppingCart size={20}/>{cartCount > 0 && <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-indigo-600 px-1.5 py-0.5 text-center text-[10px] font-black">{cartCount}</span>}</button>
      </div>
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${category === c ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{c}</button>)}</div>
      <div className="px-4 pb-3 md:hidden"><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3"><Search size={18} className="text-slate-400"/><input className="w-full bg-transparent py-2.5 text-sm outline-none" placeholder="Search tiles, SKU..." value={query} onChange={e => setQuery(e.target.value)} /></div></div>
    </header>

    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><div className="mb-7"><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">AVA Surface Collection</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Find the right surface for your project.</h1><p className="mt-2 text-sm text-slate-500">Browse our tile collection and add products to your cart.</p></div>
      {filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">No products found.</div> : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(product => <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex h-48 items-center justify-center bg-slate-100"><div className="text-center"><div className="text-4xl font-black text-slate-300">{product.sku}</div><div className="mt-2 text-xs font-bold text-slate-400">AVA SURFACE</div></div></div><div className="p-4"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{product.category} · {product.sku}</p><h2 className="mt-1 min-h-12 text-sm font-black leading-5">{product.name}</h2><div className="mt-4 flex items-end justify-between gap-2"><div><div className="text-lg font-black">{money(product.price)}</div><div className="text-[11px] text-slate-400">per {product.unit} · {product.stock} available</div></div><button onClick={() => add(product)} className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white hover:bg-indigo-700"><Plus size={16} /></button></div></div></article>)}</div>}
    </main>

    {cartOpen && <div className="fixed inset-0 z-40"><div className="absolute inset-0 bg-slate-950/40" onClick={() => setCartOpen(false)}/><aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"><div className="flex items-center border-b border-slate-200 p-5"><h2 className="mr-auto text-xl font-black">Your Cart</h2><button onClick={() => setCartOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20}/></button></div>{cart.length === 0 ? <div className="p-8 text-center text-slate-500">Your cart is empty.</div> : <><div className="divide-y divide-slate-100">{cart.map(line => <div key={line.product.id} className="p-5"><div className="font-bold text-sm">{line.product.name}</div><div className="mt-1 text-xs text-slate-400">{line.product.sku} · {money(line.product.price)} / {line.product.unit}</div><div className="mt-3 flex items-center gap-3"><button onClick={() => change(line.product.id, -1)} className="rounded-lg border p-1"><Minus size={15}/></button><span className="w-8 text-center text-sm font-black">{line.quantity}</span><button onClick={() => change(line.product.id, 1)} className="rounded-lg border p-1"><Plus size={15}/></button><span className="ml-auto font-black">{money(line.product.price * line.quantity)}</span></div></div>)}</div><div className="border-t border-slate-200 p-5"><div className="flex justify-between text-sm"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p className="mt-2 text-xs text-slate-400">Handling and transport charges will be calculated during checkout.</p><button disabled className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-black text-white disabled:opacity-50">Proceed to Checkout</button></div></>}</aside></div>}
  </div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
