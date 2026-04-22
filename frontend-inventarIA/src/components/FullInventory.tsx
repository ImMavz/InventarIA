import { useState } from 'react';
import { InventoryTable } from './InventoryTable';

interface Props {
  products: any[];
  onAddClick: () => void; // Para recuperar el botón de añadir
  onProductDeleted: () => void; // <--- Añadido a la interface
  onEditClick: (product: any) => void; // Para abrir el nuevo modal
}

export const FullInventory = ({ products, onAddClick, onProductDeleted, onEditClick }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('none');

  const filteredProducts = [...products]
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filterType === 'a-z') return a.name.localeCompare(b.name);
      if (filterType === 'z-a') return b.name.localeCompare(a.name);
      if (filterType === 'price-high') return b.price - a.price;
      if (filterType === 'price-low') return a.price - b.price;
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-800/30 p-4 rounded-2xl border border-slate-700">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-3 text-slate-500">🔍</span>
          <input 
            type="text"
            placeholder="Buscar producto..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="none">Ordenar por...</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="price-high">Precio Máx</option>
            <option value="price-low">Precio Mín</option>
          </select>
          
          <button 
            onClick={onAddClick}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap"
          >
            + Añadir
          </button>
        </div>
      </div>

      <InventoryTable 
      products={filteredProducts}
      onProductDeleted={onProductDeleted}
      onEditClick={onEditClick} />
      
    </div>
  );
};