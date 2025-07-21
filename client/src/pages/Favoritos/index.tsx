import useFavoriteStore from '../../stores/FavoriteStore'
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import carrinhoNaoClicado from '../../assets/carrinho-de-compras-cinza-icon.svg'
import favoritoClicado from '../../assets/full-heart.svg'
import emptyFavorite from '../../assets/no-favorites.png'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/api'
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Navigation } from 'swiper/modules';
import FavoritoCard from '../../components/favoritosCard'
import { Produto } from '../../interfaces/interfaces';


export default function Favoritos() {

    const { favorites, fetchFavorites, addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
    const navigate = useNavigate() 
    const [ carrinhoAtivo, setCarrinhoAtivo] = useState(false)

    useEffect(() => {
        fetchFavorites();
    }, []);

    function handleClick() {
        setCarrinhoAtivo(true)
        navigate('/carrinho')
    }

    function shoppingButton() {
        navigate('/')
    }

    return(
        <div className={styles.pageContainer}>
            <div className={styles.nav}>
                <button onClick={handleClick} className={styles.carrinhoBotao}>
                    <img src={carrinhoAtivo ? carrinhoClicado : carrinhoNaoClicado} alt="" />
                    Carrinho
                </button>
                <button className={styles.favoritoBotao}>
                    <img src={favoritoClicado} alt="" />
                    Favoritos
                </button>
            </div>
            
            <div className={styles.box}>
                <div className={styles.favoritecart}>
                    {favorites.length > 0 ? (
                       
                        (favorites.map((produto) => (
                                               <FavoritoCard produto={produto} key={produto.id}></FavoritoCard>
                                           ))
                                        )
                        
                    ) : (
                        <div className={styles.emptyFavorites}>
                            <img src={emptyFavorite} alt="" />
                            <p className={styles.emptyFavoriteText}>Você ainda não possui favoritos.</p>
                            <p>Faça login e adicione um item aos seus favoritos clicando no ícone de coração.</p>
                            <button onClick={shoppingButton}>Conheça nossos produtos</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}