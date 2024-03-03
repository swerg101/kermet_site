import React, {useState} from "react";
import image from "../../img/logo2.png";

function Header(props) {
    return (<header className="header">
        <div className="container">
            <div className="content">
                {/*Страница сотрудников*/}
                {props.showEmployeeInfo &&
                    <>
                        <h3 className='btn' onClick={() => props.onShowEmployeeInfo()}>Вернуться на предыдущую страницу</h3>
                        <h1 className='dick-pussy-morzh'>Наши сотрудники</h1>
                        <a className="contact_me" onClick={props.onShowContact}>Связаться с нами</a>
                    </>

                }
                {/*Котактная информация*/}
                {props.showContact && !props.showEmployeeInfo && <>
                    <h3 className='btn' onClick={() => {
                        props.onShowContact()
                    }}>Вернуться на предыдущую страницу</h3>
                    <h1 className="dick-pussy-morzh">Связь с нами</h1>

                    <img className="logo" src={image} alt="Лого" width="70"/>

                </>}
                {/*оформление заказа*/}
                {props.goToOffer && !props.showContact && !props.showEmployeeInfo && <>
                    <table>
                        <h2 className='btn' onClick={() => {
                            props.onShowFullOrder();
                            props.onOffer()
                        }}>Вернуться к покупкам</h2>
                        <h2 className='btn' onClick={props.onOffer}>Вернуться к корзине товаров</h2>

                    </table>
                    <h1 className="dick-pussy-morzh">Оформление заказа</h1>

                    <img className="logo" src={image} alt="Лого" width="70"/>

                </>}
                {/*Каталог товаров*/}
                {!props.goToOffer && !props.showFullOrder && !props.showContact && !props.showEmployeeInfo && <>
                    <h1 className="dick-pussy-morzh">Каталог товаров</h1>
                    <img className="logo" src={image} alt="Лого" width="70"/>
                    <a className="contact_me" className='btn' onClick={props.onShowContact}>Связаться с нами</a>
                </>

                }
                {/*  отрисовываю страницу перехода к корзине */}
                {!props.goToOffer && props.showFullOrder && !props.showContact && !props.showEmployeeInfo && <>

                    <h3 className='btn' onClick={() => {
                        props.onShowFullOrder()
                    }}>Вернуться к покупкам</h3>
                    <h1 className="dick-pussy-morzh">Корзина товаров</h1>
                    <img className="logo" src={image} alt="Лого" width="70"/>
                    <a className='btn' className="contact_me" onClick={props.onShowContact}>Связаться с нами</a>
                </>}

            </div>
        </div>
    </header>);
}


export default Header
