import { create } from "zustand";

import { api } from "../api/api";
import { Produto } from "../interfaces/interfaces";

interface FavoriteItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface FavoriteStore {
    favorites: FavoriteItem[];
    fetchFavorites: () => Promise<void>;
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const useFavoriteStore = create<FavoriteStore>((set, get) => (
    {
        favorites: [],
        fetchFavorites: async () => {
            try {
                const response = await api.get<FavoriteItem[]>('/all-pajamas')
                const data = response.data
                
                set({ favorites: data });
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
            }
        },
        addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
        removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((fav) => fav.id !== id) })),
        isFavorite: (id) => get().favorites.some((fav) => fav.id === id)         
    }
))

export default useFavoriteStore;