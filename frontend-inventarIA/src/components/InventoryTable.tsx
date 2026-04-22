import api from '../api/api';

interface Props {
  products: any[];
  onProductDeleted: () => void;
  onEditClick: (product: any) => void;
}

export const InventoryTable = ({ products, onProductDeleted, onEditClick }: Props) => {

  // 1. RECUPERAMOS LA FUNCIÓN DE BORRADO REAL
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`⚠️ ¿Estás seguro de borrar "${name}"?`);
    
    if (confirmed) {
      try {
        // Borramos en el servidor
        await api.delete(`/products/${id}`);
        // Si sale bien, avisamos a App.tsx para que pida la lista nueva
        onProductDeleted();
        alert("Producto eliminado");
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("No se pudo eliminar el producto");
      }
    }
  };

  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700">
              <th className="px-4 py-4 font-bold">Producto</th>
              <th className="px-4 py-4 font-bold text-center">Stock</th>
              <th className="px-4 py-4 font-bold text-right">Precio</th>
              <th className="px-4 py-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-slate-700/20 transition-all">
                <td className="px-4 py-4">
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.category?.name || 'General'}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.stock <= (product.minStock || 5) ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {product.stock} unidades
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-emerald-400 font-mono font-bold">
                  ${product.price.toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onEditClick(product)}
                      className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
                      title="Editar Stock"
                    >
                      ✏️
                    </button>
                    
                    {/* 2. CONECTAMOS EL BOTÓN A LA FUNCIÓN REAL */}
                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-red-600 hover:text-white transition-all"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};