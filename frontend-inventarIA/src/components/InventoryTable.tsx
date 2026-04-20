import api from '../api/api';

interface Props {
  products: any[];
  onProductDeleted?: () => void; 
}

export const InventoryTable = ({ products, onProductDeleted }: Props) => {
  
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`⚠️ ¿Estás seguro de que deseas eliminar "${name}"?`);
    
    if (confirmed) {
      try {
        await api.delete(`/products/${id}`);
        if (onProductDeleted) onProductDeleted();
        alert("Producto eliminado");
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Detalle de Inventario</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-xs uppercase bg-slate-900/50 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold">Producto</th>
              <th className="px-6 py-4 font-semibold text-center">Stock</th>
              <th className="px-6 py-4 font-semibold text-right">Precio</th>
              <th className="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                <td className="px-6 py-4 text-center">{product.stock}</td>
                <td className="px-6 py-4 text-right text-emerald-400 font-mono">${product.price}</td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleDelete(product.id, product.name)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all mx-auto flex items-center justify-center"
                  >
                    —
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};