interface Props {
  currentView: 'dashboard' | 'inventory';
  setView: (view: 'dashboard' | 'inventory') => void;
}

export const Sidebar = ({ currentView, setView }: Props) => {
  const menuItems: { name: string; id: 'dashboard' | 'inventory'; icon: string }[] = [
    { name: 'Dashboard', id: 'dashboard', icon: '📊' },
    { name: 'Inventario', id: 'inventory', icon: '📦' },
  ];

  return (
    <aside className="w-64 bg-slate-950 min-h-screen p-4 border-r border-slate-800">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">I</div>
        <span className="text-xl font-bold text-white tracking-wider">InventarIA</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)} // <--- navegación
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              currentView === item.id 
                ? 'bg-blue-600/10 text-blue-400' 
                : 'text-gray-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};