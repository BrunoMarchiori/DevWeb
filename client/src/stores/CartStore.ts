import { create } from "zustand";
import { persist } from "zustand/middleware"; // <-- 1. Importar o middleware
import { Produto } from "../interfaces/interfaces";

// A interface do Produto deve incluir a quantidade para o carrinho
interface ProdutoCarrinho extends Produto {
  quantidade: number;
}

interface CartStore {
  cart: ProdutoCarrinho[]; // <-- Usamos a nova interface
  addToCart: (item: Produto) => void;
  removeFromCart: (id: number) => void; // <-- Mudado para number para consistência
  updateQuantity: (id: number, quantidade: number) => void; // <-- Mudado para number
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  // <-- 2. Envolver toda a lógica com `persist()`
  persist(
    (set, get) => ({
      cart: [],

      // <-- 3. Lógica de addToCart melhorada
      addToCart: (item) => {
        const { cart } = get();
        const itemExistente = cart.find((p) => p.id === item.id);

        if (itemExistente) {
          // Se o item já existe, atualiza a quantidade
          get().updateQuantity(item.id, itemExistente.quantidade + 1);
        } else {
          // Se não existe, adiciona com quantidade 1
          set((state) => ({
            cart: [...state.cart, { ...item, quantidade: 1 }],
          }));
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantidade) => {
        // Se a quantidade for 0 ou menos, remove o item
        if (quantidade <= 0) {
          get().removeFromCart(id);
        } else {
          set((state) => ({
            cart: state.cart.map((p) =>
              p.id === id ? { ...p, quantidade } : p
            ),
          }));
        }
      },
      
      clearCart: () => set({ cart: [] }),
    }),
    {
      // <-- 4. Opções de configuração para a persistência
      name: "carrinho-storage", // Nome da chave que aparecerá no localStorage
    }
  )
);

export default useCartStore;