interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    categoria: string;
    descricao?: string;
    qtdEstoque?: number;
    disponivel?: boolean;
    quantidade?: number;
}

interface Categoria {
    id: number;
    nome: string;
    produtos: Produto[];
}

interface FavoriteItem {
    id: number; // Geralmente o ID do produto é um número
    nome: string;
    preco: number;
}


export type { Produto, Categoria, FavoriteItem };