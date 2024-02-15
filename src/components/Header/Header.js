
import React, {useState} from "react";
import image from "../../img/logo2.png";

function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div className="content">
                    {props.showEmployeeInfo &&
                        <>
                            <h3 onClick={() => props.onShowEmployeeInfo()}>Вернуться на предыдущую страницу</h3>
                            <h2>Наши сотрудники</h2>
                        </>

                    }
                    {props.showContact && !props.showEmployeeInfo &&
                        <>
                            <h3 onClick={() => {props.onShowContact()}}>Вернуться на предыдущую страницу</h3>
                            <h2>Связь с нами</h2>
                        </>
                    }
                    {props.goToOffer && !props.showContact && !props.showEmployeeInfo &&
                        <>
                            <h3 onClick={() => {props.onShowFullOrder(); props.onOffer()}}>Вернуться к покупкам</h3>
                            <h3 onClick={props.onOffer}>Вернуться к корзине товаров</h3>

                        </>
                    }
                    {!props.goToOffer && !props.showFullOrder && !props.showContact && !props.showEmployeeInfo &&
                        <h1>Каталог товаров</h1>
                    }
                    {!props.goToOffer && props.showFullOrder && !props.showContact && !props.showEmployeeInfo &&
                        <>
                            <h3 onClick={() => {props.onShowFullOrder()}}>Вернуться к покупкам</h3>
                            <h1>Список заказов</h1>
                        </>
                    }
                    <img className="logo" src={image} alt="Лого" width="70"/>

                    {!props.showContact && !props.showEmployeeInfo &&
                        <a className="contact_me" onClick={props.onShowContact}>Связаться с нами</a>
                    }

                </div>
            </div>
        </header>
    );
}



export default Header
