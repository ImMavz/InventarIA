interface Product {
  id: string;
  name: string;
  stock: number;
  minStock: number;
}

interface Props {
  products: Product[];
}

export const TopLowStock = ({ products }: Props) => {
  // 1. Filtramos los que están en bajo stock
  // 2. Ordenamos de menor a mayor stock
  // 3. Tomamos los primeros 5
  const lowStockProducts = [...products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-red-500/20 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚨</span>
        <h3 className="text-lg font-bold text-white">Prioridad de Reabastecimiento (5 productos o menos)</h3>
      </div>
      
      <div className="space-y-3">
        {lowStockProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between bg-slate-900/40 p-3 rounded-xl border border-slate-700">
            <div>
              <p className="text-sm font-medium text-white">{product.name}</p>
              <p className="text-xs text-slate-500">Mínimo requerido: {product.minStock}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${product.stock === 0 ? 'text-red-500' : 'text-orange-400'}`}>
                {product.stock} unidades
              </p>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full ${product.stock === 0 ? 'bg-red-500' : 'bg-orange-400'}`} 
                  style={{ width: `${Math.min((product.stock / product.minStock) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        {lowStockProducts.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-2">Todo el inventario está en niveles óptimos. ✨</p>
        )}
      </div>
    </div>
  );
};