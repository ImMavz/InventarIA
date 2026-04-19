interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  category: { name: string };
}

// Definimos que este componente ahora recibe "products" como una propiedad (Prop)
interface Props {
  products: Product[];
}

export const InventoryTable = ({ products }: Props) => {
  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Detalle de Inventario</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-xs uppercase bg-slate-900/50 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold">Producto</th>
              <th className="px-6 py-4 font-semibold">Categoría</th>
              <th className="px-6 py-4 font-semibold">Precio</th>
              <th className="px-6 py-4 font-semibold text-center">Stock</th>
              <th className="px-6 py-4 font-semibold text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                <td className="px-6 py-4">
                   <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                     {product.category.name}
                   </span>
                </td>
                <td className="px-6 py-4 text-emerald-400 font-mono">${product.price}</td>
                <td className="px-6 py-4 text-center">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  {product.stock <= product.minStock ? (
                    <span className="px-3 py-1 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
                      ⚠️ Crítico
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                      ✓ Estable
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No hay productos registrados.
          </div>
        )}
      </div>
    </div>
  );
};