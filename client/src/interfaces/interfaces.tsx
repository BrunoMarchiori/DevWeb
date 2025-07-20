interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    categoria: string;
    descricao?: string;
    qtdEstoque?: number;
}

interface Categoria {
    id: number;
    nome: string;
    produtos: Produto[];
}


export type { Produto, Categoria };