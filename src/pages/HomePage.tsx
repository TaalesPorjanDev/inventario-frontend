import { useEffect } from 'react';
import { useState } from 'react';
import { useItemStore } from '../store/itemStore';
import { ItemCard } from '../components/ItemCard';
import { useToastStore } from '../store/toastStore';

export function HomePage() {
  const { itens, removerItem, carregarItens } = useItemStore();
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('');
  const { showToast } = useToastStore();

  useEffect(() => {
    carregarItens();
  }, []);

  const itensFiltrados = itens.filter((item) => {
    const mathCategoria = filtroCategoria === '' || item.categoria === filtroCategoria;
    const matchLocal = filtroLocal === '' || item.local === filtroLocal;
    return mathCategoria && matchLocal;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 pt-20">
        
        <aside className="flex justify-between items-end mb-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                name="categoria"
                id="categoria"
                value={filtroCategoria}
                onChange={(event) => setFiltroCategoria(event.target.value)}
                className="border border-gray-200 rounded-md px-2 py-1.5 text-sm w-36 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                <option value="Eletrodomésticos">Eletrodomésticos</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Móveis">Móveis</option>
                <option value="Decoração">Decoração</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Localização
              </label>
              <select
                name="localizacao"
                id="localizacao"
                value={filtroLocal}
                onChange={(event) => setFiltroLocal(event.target.value)}
                className="border border-gray-200 rounded-md px-2 py-1.5 text-sm w-36 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                <option value="Sala">Sala</option>
                <option value="Quarto">Quarto</option>
                <option value="Cozinha">Cozinha</option>
                <option value="Escritório">Escritório</option>
                <option value="Garagem">Garagem</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            
          </div>
          <p className="text-sm text-gray-500 mb-4 hidden md:block">
              {itensFiltrados.length} itens no total
            </p>
        </aside>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {itensFiltrados.map((item) => (
            <li key={item.id}>
            <ItemCard
              item={item}
              onDelete={() => {
                removerItem(item.id)
                showToast("Item Removido com sucesso", "success")
              }}
             /> 
            </li>
          ))}
        </ul>
        {itensFiltrados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum item cadastrado
          </p>
        )}
      </div>
    </main>
  );
}
