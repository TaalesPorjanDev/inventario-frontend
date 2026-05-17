import { useItemStore } from '../store/itemStore';

export function RecentItens() {
  const { itens } = useItemStore();
  const itensRecentes = [...itens].reverse();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">Itens Recentes</h1>
        <p className="text-gray-500 text-sm mb-6">
          Gerencie suas últimas adições e alterações de inventário.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-6 mt-6">
          {itensRecentes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-3 flex gap-4 items-start max-w-xs"
            >
              <div className="h-14 w-14 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0 text-xl">
                📷
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.nome}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="inline-flex px-2 py-1 border border-gray-200 rounded-full text-xs text-[#505f76] whitespace-nowrap">
                    {item.categoria}
                  </span>
                  <span className="inline-flex px-2 py-1 border border-gray-200 rounded-full text-xs text-[#505f76] whitespace-nowrap">
                    {item.local}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
