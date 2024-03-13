import React, { Component } from 'react';

class ShowContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    async sendFormData(formBtn, formSendResult,  formData) {
        try {


            formBtn.textContent = 'Loading...';
            formBtn.disabled = true;

            const response = await fetch('https://www.nobilepater.ru/send-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                formSendResult.textContent = 'Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.';
                this.setState({ name: '', email: '', message: '' }); // Очищаем поля формы после успешной отправки
            } else {
                // Обработка ошибки
                throw new Error('Ошибка отправки данных');
            }
        } catch (error) {
            console.error(error.message);
            const formSendResult = document.querySelector('.form__send-result');
            formSendResult.textContent = 'Письмо не отправлено! Попробуйте позже.';
            formSendResult.style.color = 'red';
        } finally {
            formBtn.textContent = 'Связаться!';
            formBtn.disabled = false;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, email, message } = this.state;
        const formData = { name, email, message };

        const formBtn = document.querySelector('.form__btn');
        const formSendResult = document.querySelector('.form__send-result');

        this.sendFormData(formBtn, formSendResult,  formData);
    }

    render() {
        return (
            <body className="body">
            <div className="container_contact">
                <div className="contact">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="contact-form">
                                <label htmlFor="name">Ваше имя</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Введите имя"
                                />
                            </div>
                            <div className="contact-form">
                                <label htmlFor="email">Ваш Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Введите Email"
                                />
                            </div>
                        </div>
                        <div className="contact-form">
                            <label htmlFor="text">Ваше обращение</label>
                            <br />
                            <textarea
                                id="text"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                cols="60"
                                rows="8"
                            />
                        </div>
                        <button className="form__btn" type="submit">Связаться!</button>
                        <div className="form__send-result"></div>
                    </form>
                </div>
            </div>
            </body>
        );
    }
}

export default ShowContact;
