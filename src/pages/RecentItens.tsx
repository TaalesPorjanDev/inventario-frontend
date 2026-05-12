import { useItemStore } from '../store/itemStore';

export function RecentItens() {
  const { itens } = useItemStore();
  const itensRecentes = [...itens].reverse();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">Itens Recentes</h1>
        <p className="text-gray-500 text-sm mb-6">
          Gerencie suas últimas adições e alterações de inventário.
        </p>
        {itensRecentes.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex gap-4 mb-4"
          >
            <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
              📷
            </div>
            <div>
              <h3 className="font-semibold">{item.nome}</h3>
              <div className="flex gap-2 mt-1">
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
    </main>
  );
}
