import { useEffect, useState } from 'react';
import api from './api/api';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { InventoryTable } from './components/InventoryTable';
import { TopLowStock } from './components/TopLowStock';
import { AddProductModal } from './components/AddProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = () => {
    api.get('/products').then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
            <p className="text-slate-400">Bienvenido Joseph</p>
          </div>
          {/* Al hacer clic, abrimos el modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg font-semibold"
          >
            + Añadir Producto
          </button>
        </header>

        <StatsCards products={products} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TopLowStock products={products} />
          </div>
          <div className="lg:col-span-2">
            <InventoryTable products={products} />
          </div>
        </div>

        {/* El Modal */}
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