import { useState } from 'react';
import useCartStore from '../../stores/CartStore';
import styles from './styles.module.css'
import subtract from '../../assets/Subtract.svg'
import plus from '../../assets/Plus Math.svg'
import closeIcon from '../../assets/close-icon.svg'
import { Produto } from '../../interfaces/interfaces';


export default function CarrinhoCard(  produto : Produto) {


    const { removeFromCart, updateQuantity } = useCartStore()
    const [quantidade, setQuantidade] = useState(produto.quantidade ?? 0)

    const aumentarQuantidade = () => {
        setQuantidade(prev => prev + 1);
        updateQuantity(produto.id, quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(prev => prev - 1);
            updateQuantity(produto.id , quantidade - 1);
        }
    }

    return(
        <div className={styles.card}>

            <div className={styles.produtoImage}>
                <img src={`http://localhost:8080/api/imagens/${produto.id}`} />
            </div>

            <div className={styles.about}>
                <div>
                    <h4>{produto.nome}</h4>
                    <p>Ref: {produto.id}</p> 
                </div>
                    
            </div>

            <div className={styles.priceContainer}>
                <div className={styles.quantidadeContainer}>
                    <h4>Quantidade:</h4>
                    <div className={styles.quantidadeBotao}>
                        <button className={styles.diminuirBotao} onClick={diminuirQuantidade}>
                            <img src={subtract} alt="Diminuir" />
                        </button>
                        <span>{quantidade}</span>
                        <button className={styles.aumentarBotao} onClick={aumentarQuantidade} disabled={quantidade >= (produto.qtdEstoque ?? 0)}>
                            <img src={plus} alt="Aumentar" />
                        </button>
                    </div>
                    <p>Não perca sua oportunidade! Há apenas mais <span>{produto.qtdEstoque ?? 0}</span> peças disponíveis!</p>
                </div>
                
                <p>R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                
            </div>

                <div className={styles.removeContainer}>
                    <button className={styles.removeButton} onClick={() => removeFromCart(produto.id)}>
                        <img src={closeIcon} alt="Remover" />
                    </button>
                </div>
        </div>
    )
}



