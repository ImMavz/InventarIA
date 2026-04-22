import { useState } from 'react';
import api from '../api/api'; // Tu instancia de Axios que ya usas

export const AiConsultant = ({ products }: { products: any[] }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return;
    setLoading(true);
    
    try {
      // 1. Preparamos el contexto igual que antes
      const inventoryContext = products.map(p => 
        `- ${p.name}: Stock ${p.stock}, Precio $${p.price}`
      ).join('\n');

      // 2. Llamamos a NUESTRO backend, no a Google directamente
      const res = await api.post('/ai/consult', { 
        prompt: prompt,
        context: inventoryContext 
      });

      setResponse(res.data.response);
    } catch (error) {
      setResponse("Error al conectar con el servidor de IA.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Consultor de IA</h1>
        <p className="text-slate-400">Analiza tu stock y recibe consejos estratégicos</p>
      </header>

      <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
        <div className="mb-6">
          <label className="text-slate-300 text-sm font-medium mb-2 block">¿Qué quieres saber hoy?</label>
          <div className="flex gap-3">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: ¿Qué productos debería comprar pronto?"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={askAI}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-6 py-3 rounded-2xl font-bold transition-all"
            >
              {loading ? 'Pensando...' : 'Preguntar'}
            </button>
          </div>
        </div>

        {response && (
          <div className="bg-slate-900/50 border border-blue-500/30 rounded-2xl p-6 text-slate-200 leading-relaxed">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🤖</span>
              <span className="font-bold text-blue-400 uppercase tracking-widest text-xs">Análisis de la IA</span>
            </div>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {['¿Qué falta?', 'Consejo de precios', 'Resumen de stock'].map((suggestion) => (
          <button 
            key={suggestion}
            onClick={() => setPrompt(suggestion)}
            className="p-4 bg-slate-800/30 border border-slate-700 rounded-2xl text-slate-400 hover:text-white hover:border-blue-500 transition-all text-sm"
          >
            "{suggestion}"
          </button>
        ))}
      </div>
    </div>
  );
};