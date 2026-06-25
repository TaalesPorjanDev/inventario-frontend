import { create } from 'zustand';
import api from '../services/api';
import type { Item } from '../types/item';

interface ItemStore {
  itens: Item[];
  loading: boolean;
  hasLoaded: boolean;
  adicionarItem: (item: Omit<Item, 'id'>) => Promise<void>;
  removerItem: (id: string) => Promise<void>;
  carregarItens: () => Promise<void>;
  atualizarItem: (id: string, dadosAtualizados: Omit<Item, 'id'>) => Promise<void>;
  limparItens: () => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  itens: [],
  loading: false,
  hasLoaded: false,

  async adicionarItem(item) {
    const { data } = await api.post<{ item: Item }>('/items', item);
    set((state) => ({ itens: [...state.itens, data.item] }));
  },

  async removerItem(id) {
    await api.delete(`/items/${id}`);
    set((state) => ({ itens: state.itens.filter((item) => item.id !== id) }));
  },

  async carregarItens() {
    set({ loading: true });

    try {
      const { data } = await api.get<{ items: Item[] }>('/items');
      set({ itens: data.items, hasLoaded: true });
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
      set({ hasLoaded: true });
    } finally {
      set({ loading: false });
    }
  },

  async atualizarItem(id, dadosAtualizados) {
    const { data } = await api.put<{ item: Item }>(`/items/${id}`, dadosAtualizados);
    set((state) => ({
      itens: state.itens.map((item) => (item.id === id ? data.item : item)),
    }));
  },

  limparItens() {
    set({ itens: [], loading: false, hasLoaded: false });
  },
}));
