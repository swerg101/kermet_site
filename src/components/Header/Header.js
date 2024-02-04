import {FaShoppingCart} from "react-icons/fa"
import {useState} from "react";
import Order from "./Order";
import image from "../../img/logo2.png";

function Header(props) {


    return (
      <header class="header">
        <div class="container">
          <div class="content">

            <img class="logo" src={image} alt="Лого" width="70" />
            <h1>Каталог товаров</h1>
            <a class="contact_me" onClick={() => props.onShowContact()}>Связаться с нами</a>

          </div>
        </div>
      </header>
    )
}

export default Header


