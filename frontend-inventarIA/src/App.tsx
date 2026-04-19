import { useEffect, useState } from 'react';
import api from './api/api';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { InventoryTable } from './components/InventoryTable';
import { TopLowStock } from './components/TopLowStock';
import { FullInventory } from './components/FullInventory';
import { AddProductModal } from './components/AddProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState<'dashboard' | 'inventory'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = () => {
    api.get('/products').then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar currentView={view} setView={setView} />

      <main className="flex-1 p-8">
        {view === 'dashboard' ? (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
            </header>
            <StatsCards products={products} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1"><TopLowStock products={products} /></div>
              <div className="lg:col-span-2"><InventoryTable products={products} /></div>
            </div>
          </>
        ) : (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-white">Inventario Completo</h1>
              <p className="text-slate-400">Gestiona y filtra todos tus productos</p>
            </header>
            <FullInventory 
              products={products} 
              onAddClick={() => setIsModalOpen(true)} 
            />
          </>
        )}
        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onProductAdded={fetchProducts} 
        />
      </main>
    </div>
  );
}

export default App;