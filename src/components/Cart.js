import React, {Component, useState} from 'react';
import {FaShoppingCart} from "react-icons/fa";
import Order from "./Header/Order";

const showOrders = (props) => {
    return (
        <div>
            {Array.from(props.orders.entries()).map(([key, value]) => {
                if (key) {
                    return (
                        <Order
                            key={key.articul}
                            item={key}
                            counter={value}
                            onAdd={props.onAdd}
                            onDelete={props.onDelete}
                            onToDelete={props.onToDelete}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};


const showNothing = () => {
    return (
        <div className='empty'>
            <h2>Товаров нет</h2>
        </div>
    )
}

function Cart(props){
    let [cartOpen, setCartOpen] = useState(false)

    return(
        <div>
            <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />
            {cartOpen && (
                <div className='shop-cart'>
                    <h5 onClick={() => {
                        props.onShowFullOrder();
                        setCartOpen(cartOpen => !cartOpen);
                    }}>
                        Перейти к оформлению
                    </h5>

                    {Array.from(props.orders.keys()).length > 0 ? showOrders(props) : showNothing()}
                </div>
            )}
        </div>

    )
}

export default Cart;
