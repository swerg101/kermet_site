import React, {useState} from 'react';
import {FaShoppingCart} from "react-icons/fa";
import Order from "./Header/Order";


const showOrders = (props) => {
    let totalPrice = 0;

    for (const [product, quantity] of props.orders) {
        const productPrice = product.price * quantity;
        totalPrice += productPrice;
    }
    return (<div>
            {Array.from(props.orders.entries()).map(([key, value]) => {
                if (key) {
                    return (<Order
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
            <p className='summa'>Сумма заказа:{totalPrice}р.</p>
        </div>);
};


const showNothing = () => {
    return (<div className='empty'>
            <h2>Товаров нет</h2>
        </div>)
}

function Cart(props) {
    let [cartOpen, setCartOpen] = useState(false)

    return (<div>
            <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)}
                            className={`shop-cart-button ${cartOpen && 'active'}`}/>
            {cartOpen && (

                <div className="container">
                    <div className='shop-cart'>

                        {Array.from(props.orders.keys()).length > 0 ? showOrders(props) : showNothing()}

                        <h5 className='go-to-offer' onClick={() => {
                            props.onShowFullOrder();
                            setCartOpen(cartOpen => !cartOpen);
                        }}>
                            Перейти к оформлению
                        </h5>
                    </div>
                </div>)}
        </div>

    )
}

export default Cart;
