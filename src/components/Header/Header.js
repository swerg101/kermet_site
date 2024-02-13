
import React, {useState} from "react";
import image from "../../img/logo2.png";

function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div className="content">
                    {props.goToOffer &&
                        <>
                            <h3 onClick={() => {props.onShowFullOrder(); props.onOffer()}}>Вернуться к покупкам</h3>
                            <h3 onClick={props.onOffer}>Вернуться к корзине товаров</h3>

                        </>
                    }
                    {!props.goToOffer && !props.showFullOrder &&
                        <h1>Каталог товаров</h1>
                    }
                    {!props.goToOffer && props.showFullOrder &&
                        <>
                            <h3 onClick={() => {props.onShowFullOrder()}}>Вернуться к покупкам</h3>
                            <h1>Список заказов</h1>
                        </>
                    }
                    <img className="logo" src={image} alt="Лого" width="70"/>
                    <a className="contact_me" onClick={props.onShowContact}>Связаться с нами</a>
                </div>
            </div>
        </header>
    );
}



export default Header


