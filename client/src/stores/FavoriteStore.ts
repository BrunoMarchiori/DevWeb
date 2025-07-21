import { create } from "zustand";
import { api } from "../api/api";
import { FavoriteItem } from "../interfaces/interfaces";




interface FavoriteStore {
    favorites: FavoriteItem[];
    fetchFavorites: () => Promise<void>;
    addFavorite: (product: FavoriteItem) => Promise<void>;
    removeFavorite: (productId: number) => Promise<void>;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void; // Ação para limpar ao fazer logout
}

export const getAuthenticatedUserId = () => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
};


const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],

    // 1. BUSCAR FAVORITOS DO USUÁRIO LOGADO
    fetchFavorites: async () => {
        const userId = getAuthenticatedUserId();
        if (!userId) return; // Não faz nada se não houver usuário

        try {
            // Usa o endpoint que criamos no backend
            const response = await api.get<FavoriteItem[]>(`/produtos/favoritos/${userId}`);
            set({ favorites: response.data });
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
        }
    },

    // 2. ADICIONAR UM FAVORITO (com atualização otimista)
    addFavorite: async (product) => {
        const userId = getAuthenticatedUserId();
        if (!userId) return;

        // Atualização Otimista: Adiciona ao estado local imediatamente
        const previousFavorites = get().favorites;
        set({ favorites: [...previousFavorites, product] });

        try {
            // Envia a requisição para o backend
            await api.post(`/produtos/${product.id}/favoritar/${userId}`);
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            // Em caso de erro, reverte para o estado anterior
            set({ favorites: previousFavorites });
        }
    },

    // 3. REMOVER UM FAVORITO (com atualização otimista)
    removeFavorite: async (productId) => {
        const userId = getAuthenticatedUserId();
        if (!userId) return;

        // Atualização Otimista: Remove do estado local imediatamente
        const previousFavorites = get().favorites;
        set({ favorites: previousFavorites.filter((fav) => fav.id !== productId) });

        try {
            // Envia a requisição para o backend
            await api.delete(`/produtos/${productId}/desfavoritar/${userId}`);
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
            // Em caso de erro, reverte para o estado anterior
            set({ favorites: previousFavorites });
        }
    },

    // 4. VERIFICAR SE É FAVORITO (lógica local, está ótima)
    isFavorite: (productId) => {
        return get().favorites.some((fav) => fav.id === productId);
    },
    
    // 5. LIMPAR FAVORITOS (útil para o logout)
    clearFavorites: () => {
        set({ favorites: [] });
    }
}));

export default useFavoriteStore;