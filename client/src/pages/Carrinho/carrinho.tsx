//import CarrinhoCard from "../../components/carrinhoCard";
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import favoritoClicado from '../../assets/full-heart.svg'
import favoritoNaoClicado from '../../assets/empty-Heart.svg'
import emptyCart from '../../assets/empty-cart.png'
import useCartStore from "../../stores/CartStore";
import styles from './carrinho.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CarrinhoCard from '../../components/carrinhoCard';
//import DadosCard from "../../components/dadosCard/dadosCard";
//import CartContext from "../../context/CartContext";



export default function Carrinho() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { cart } = useCartStore()
    const navigate = useNavigate() 
    const [favoritoAtivo, setFavoritoAtivo] = useState(false)
    const [total, setTotal] = useState(0)
    

    useEffect(() => {
        const novoTotal = cart.reduce(
            (total, produto) => {
                
                return total + produto.preco * (produto.quantidade ?? 1)
        },0)
        setTotal(parseFloat(novoTotal.toFixed(2)))
    },[cart])

    function handleClick() {
        setFavoritoAtivo(true)
        navigate('/favoritos')
    }

    function shoppingButton() {
        navigate('/pijamas?gender=Todos')
    }

    return (
        <>

        <div className={styles.nav}>
            <button className={styles.carrinhoBotao}>
                <img src={carrinhoClicado} alt="" />
                Carrinho
            </button>
            <button className={styles.favoritoBotao} onClick={handleClick}>
                <img src={favoritoAtivo ? favoritoClicado : favoritoNaoClicado} alt="" />
                Favoritos
            </button>
        </div>
        
        <div className={styles.box}>
            <div className={styles.cardcart}>
                {cart.length > 0 ? (
                    cart.map((produto) => (
                        <CarrinhoCard {...produto} quantidade={produto.quantidade ?? 1} key={produto.id} /> 
                    ))
                ) : (
                    <div className={styles.emptyCart}>
                        <img src={emptyCart} alt="" />
                        <p className={styles.emptyCartText}>O seu carrinho está vazio.</p>
                        <p>Parece que você não adicionou nada ao seu carrinho ainda.</p>
                        <button onClick={shoppingButton}>Conheça nossos produtos</button>
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <>
                    <div className={styles.comprar}>
                        <div className={styles.total}>
                            <h2>Total: </h2>
                            <p>R${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                            <button onClick={() => { modalIsOpen ? setIsOpen(false) : setIsOpen(true)}}>COMPRE TUDO</button>
                    </div>
                </>
            )}
        </div>
        
        </>
)}