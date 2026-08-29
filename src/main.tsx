import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-slate-400">AVA Surface</p>
        <h1 className="mt-3 text-4xl font-black">Online Store</h1>
        <p className="mt-4 text-slate-300">E-commerce foundation is ready. Catalogue, cart, checkout and payment will be built here.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
);
