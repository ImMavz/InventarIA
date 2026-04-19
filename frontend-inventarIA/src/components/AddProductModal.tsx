import { useState, useEffect } from 'react';
import api from '../api/api';

interface Category {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const AddProductModal = ({ isOpen, onClose, onProductAdded }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    minStock: 5,
    categoryId: ''
  });

  // Cargar categorías cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      api.get('/categories')
        .then(res => {
          setCategories(res.data);
          // Seleccionar la primera categoría por defecto si hay
          if (res.data.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: res.data[0].id }));
          }
        })
        .catch(err => console.error("Error cargando categorías", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return alert("Por favor selecciona una categoría");
    
    try {
      await api.post('/products', formData);
      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📦</span> Nuevo Producto
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre del Producto</label>
            <input 
              type="text" 
              required
              placeholder="Ej. Teclado Mecánico"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Categoría</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Precio ($)</label>
              <input 
                type="number" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Stock Inicial</label>
              <input 
                type="number" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-900/30 transition-all"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};