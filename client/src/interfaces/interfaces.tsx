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


export type { Produto, Categoria };