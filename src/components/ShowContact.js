import React, {Component} from 'react';

class ShowContact extends Component {
    render() {
        return (
            <body className="body">
                <header className="header">
                    <div className="container">
                        <div className="content">
                            <img className="logo" src="logo2.png" alt="Лого" width="70" />
                                <h1>Связь с нами</h1>
                                <a className="contact_me"
                                   onClick={() => this.props.onShowContact()}>Каталог товаров</a>
                        </div>
                    </div>
                </header>


            <div className="container">

                <div className="contact">

                    <form>
                        <div className="row">
                            <div className="contact-form">
                                <label htmlFor="name">Ваше имя</label>
                                <input type="text" id="name"
                                       placeholder="Введите имя" />
                            </div>

                            <div className="contact-form">
                                <label htmlFor="email">Ваш Email</label>
                                <input type="email" id="email"
                                       placeholder="Введите Email" />
                            </div>
                        </div>
                        <div className="contact-form">
                            <label htmlFor="text">Ваше обращение</label>
                            <br />
                                <textarea id="text" cols="60" rows="8" />
                        </div>


                        <input type="submit" value="Связаться!" class="btn" />

                    </form>
                </div>

            </div>

        </body>
    );
    }
    }

    export default ShowContact;
