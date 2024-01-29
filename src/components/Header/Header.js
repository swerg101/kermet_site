import {FaShoppingCart} from "react-icons/fa"
import {useState} from "react";
import Order from "./Order";

const showOrders = (props) => {
  let summa = 0
  props.orders.forEach(el => summa += Number.parseFloat(el.price))

  return( <div>
    {props.orders.map(el => (
      <Order key = {el.articul} item = {el} onDelete={props.onDelete}/>
    ))}

     <p className='summa'>Итого: {new Intl.NumberFormat().format(summa)}р.</p>
  </div>
  )
}

const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Товаров нет</h2>
    </div>
  )
}
function Header(props){
  let [cartOpen, setCartOpen] = useState(false)

    return(
        <header>
           <div>
             <span className='logo'>Test_site</span>
             <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />
               {cartOpen && (
                   <div className='shop-cart'>
                        <h5 >Перейти к оформлению</h5>
                       {props.orders.length > 0 ? showOrders(props) : showNothing()}
                   </div>
               )}

             <ul className='nav'>
               <li>One</li>
               <li>Two</li>
               <li>three</li>
             </ul>
           </div>
        </header>
    )
}

export default Header
