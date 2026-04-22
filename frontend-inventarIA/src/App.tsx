import { useEffect, useState } from 'react';
import api from './api/api';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { InventoryTable } from './components/InventoryTable';
import { TopLowStock } from './components/TopLowStock';
import { FullInventory } from './components/FullInventory';
import { AddProductModal } from './components/AddProductModal';
import { EditStockModal } from './components/EditStockModal';
import { AiConsultant } from './components/AiConsultant';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'dashboard' | 'inventory' | 'ai'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fetchProducts = () => {
    api.get('/products').then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // LÓGICA PARA EL DASHBOARD: Los 5 con más stock
  const topStockProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5);
    return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar currentView={view} setView={setView} />

      <main className="flex-1 p-8">
        {view === 'dashboard' ? (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
              <p className="text-slate-400">Resumen de inventario crítico</p>
            </header>            
            <StatsCards products={products} />            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <TopLowStock products={products} />
              </div>
              <div className="lg:col-span-2">
                <InventoryTable 
                  products={topStockProducts} 
                  onProductDeleted={fetchProducts}
                  onEditClick={(p) => setEditingProduct(p)}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-white">Inventario Completo</h1>
            </header>
            <FullInventory 
              products={products} 
              onAddClick={() => setIsModalOpen(true)} 
              onProductDeleted={fetchProducts}
              onEditClick={(p) => setEditingProduct(p)}
            />
          </>
        )}

        {/* --- MODALES GLOBALES (Fuera de la condición) --- */}
        
        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onProductAdded={fetchProducts} 
        />

        <EditStockModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onUpdate={fetchProducts}
        />
      {view === 'ai' && <AiConsultant products={products} />}
      </main>
    </div>
  );
}

export default App;