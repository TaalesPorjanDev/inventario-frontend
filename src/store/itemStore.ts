import { create } from 'zustand'
import type { Item } from '../types/item'


interface ItemStore {
    items: Item[]
    adicionarItem: (item: Omit<Item, 'id'>) => void;
    removerItem: (id: string) => void;
    carregarItens: () => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  itens: [],
  adicionarItem(item) {},
  removerItem(id) {},
  carregarItens() {
   
  }
}))

