import { create } from 'zustand'
import type { Item } from '../types/item'


interface ItemStore {
    itens: Item[]
    adicionarItem: (item: Omit<Item, 'id'>) => void;
    removerItem: (id: string) => void;
    carregarItens: () => void;
    atualizarItem: (id: string, dadosAtualizados: Omit<Item, 'id'>) => void;
}

export const useItemStore = create<ItemStore>((set,get) => ({
  itens: [],
  
  adicionarItem(item) {
    const novoId = Date.now().toString()
    const itemCompleto = {...item, id: novoId }
    const listaAtual = get().itens
    const novaLista = [...listaAtual, itemCompleto]
    set({itens: novaLista})
    localStorage.setItem("itens", JSON.stringify(novaLista))
  },
  
  removerItem(id) {
    
    // pegar a lista atual de itens usando get().itens
    const listaAtual = get().itens

    // filtrar a lista mantendo itens cujo id seja diferente do id recebido
    const novaLista = listaAtual.filter(item => item.id !== id)

    // atualizar a store com a nova lista filtrada
    set({itens: novaLista})

    // salvar a nova lista no localStore
    localStorage.setItem('itens', JSON.stringify(novaLista))
  },
  
  carregarItens() {
    const itens = localStorage.getItem('itens')
    if(itens !== null) {
      set({itens: JSON.parse(itens)})
    } else {
      set({itens: []})
    }
  },

  atualizarItem(id, dadosAtualizados) {
    const listaAtualizada = get().itens
    const novaLista = listaAtualizada.map(itemAtual => 
      itemAtual.id === id ? {...dadosAtualizados, id} : itemAtual 
    )
    set({ itens: novaLista})
    localStorage.setItem('itens', JSON.stringify(novaLista))
    }
}))

