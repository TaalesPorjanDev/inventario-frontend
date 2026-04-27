import { useEffect } from 'react';
import { useItemStore } from '../store/itemStore';
import { ItemCard } from '../components/ItemCard';



export function HomePage() {
  const { itens, removerItem, carregarItens } = useItemStore();

  useEffect(() => {
    carregarItens();
  }, []);
  
  return (
    <div className="container mx-auto p-4 pt-20"> {/* pt-20 para não ficar atrás do menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={() => removerItem(item.id)}
          />
        ))}
      </div>
      {itens.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Nenhum item cadastrado
        </p>
      )}
    </div>
  );
}