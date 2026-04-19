interface Props {
  products: any[];
}

export const StatsCards = ({ products }: Props) => {
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  const stats = [
    { name: 'Total Unidades', value: totalStock, icon: '📦', color: 'text-blue-400' },
    { name: 'Bajo Stock', value: lowStockCount, icon: '⚠️', color: 'text-red-400' },
    { name: 'Valor Total', value: `$${totalValue.toLocaleString()}`, icon: '💰', color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.name}</span>
          </div>
          <div className="text-3xl font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};