import React, {Component} from 'react';

class ShowContact extends Component {
    render() {
        return (
            <body className="body">

            <div className="container_contact">

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
