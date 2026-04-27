import { useEffect } from "react";
import { useItemStore } from "../store/itemStore";
import { ItemCard } from "../components/ItemCard";
import LogoSvg from '../assets/logo.svg'

export function HomePage() {
    const { itens , removerItem, carregarItens } = useItemStore()

    useEffect(() => {
      carregarItens()
    }, [])
    return (
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-2">
            <img src={LogoSvg} alt="Logo" className="h-12 w-12" />
            <h1 className="text-2xl font-bold">Meu Inventário</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {itens.map(item => 
              <ItemCard 
              key={item.id} 
              item={item} 
              onDelete={() => removerItem(item.id)}></ItemCard>
            )}
          </div>
          {itens.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Nenhum item cadastrado
            </p>
          )}
        </div>
    )
}