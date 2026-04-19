export const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Inventario', icon: '📦' },
    { name: 'Asistente de IA', icon: '🤖' },
    { name: 'Ajustes', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-slate-950 min-h-screen p-4 border-r border-slate-800">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">I</div>
        <span className="text-xl font-bold text-white tracking-wider">InventarIA</span>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};