import { useState, useEffect } from 'react';
import api from '../api/api';

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface Props {
  product: Product | null;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditStockModal = ({ product, onClose, onUpdate }: Props) => {
  const [tempStock, setTempStock] = useState(0);

  useEffect(() => {
    if (product) setTempStock(product.stock);
  }, [product]);

  if (!product) return null;

  const handleSave = async () => {
    try {
      await api.patch(`/products/${product.id}/stock`, { quantity: tempStock });
      onUpdate();
      onClose();
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-3xl shadow-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-2">Ajustar Stock</h2>
        <p className="text-slate-400 text-sm mb-6">{product.name}</p>

        <div className="flex items-center justify-between bg-slate-900 rounded-2xl p-4 mb-8 border border-slate-700">
          <button 
            onClick={() => setTempStock(Math.max(0, tempStock - 1))}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-red-500/20 text-red-500 text-2xl font-bold transition-all"
          >
            -
          </button>
          
          <input 
            type="number"
            className="bg-transparent text-center text-3xl font-bold text-white w-20 outline-none"
            value={tempStock}
            onChange={(e) => setTempStock(Number(e.target.value))}
          />

          <button 
            onClick={() => setTempStock(tempStock + 1)}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-emerald-500 text-2xl font-bold transition-all"
          >
            +
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-slate-400 font-semibold">Cancelar</button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/40 transition-all"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};