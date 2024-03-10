import React, { useState } from 'react';

const EmailForm = (props) => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        inn: '',
        deliveryAddress: ''
    });
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {

        event.preventDefault();
        const formBtn = document.querySelector('.form__btn');
        const formSendResult = document.querySelector('.form__send-result');
        formSendResult.textContent = '';

        const form = event.target; // Получаем ссылку на элемент формы
        const formData = new FormData(form);
        const formDataObject = {};

        formData.forEach((value, key) => {
            formDataObject[key] = value.trim().replace(/\s+/g, ' ');
        });

        const validationErrors = validateForm(formDataObject);
        displayErrors(validationErrors);
        if (validationErrors.length > 0) return;

        sendFormData(form, formBtn, formSendResult);

    };

    const sendFormData = async (form, formBtn, formSendResult) => {

        try {
            formBtn.textContent = 'Loading...';
            formBtn.disabled = true;

            const formDataObject = {
                ...formData,
                myList: Array.from(props.myList, ([key, value]) => ({ key, value }))
            };

            console.log(formDataObject)
            const response = await fetch('https://nobilepater.ru:443/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });
            console.log(response)
            if (response.ok) {
                formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
                form.reset();
            } else if (response.status === 422) {
                const errors = await response.json();
                console.log(errors);
                throw new Error('Ошибка валидации данных');
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error.message);
            formSendResult.textContent = 'Письмо не отправлено! Попробуйте позже.';
            formSendResult.style.color = 'red';
        }finally {
            formBtn.textContent = 'Отправить';
            formBtn.disabled = false;
        }

    };

    return (
        <div className="container2">
            <div className="contact">
                <form id="form" onSubmit={submitForm}>
                    <div className="contact-form">
                        <label>
                            ФИО:
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="form__error" data-for="fullName"></div>
                    </div>
                    <div className="contact-form">
                        <label>
                            Адрес электронной почты:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="form__error" data-for="email"></div>
                    </div>
                    <div className="contact-form">
                        <label>
                            Номер телефона:
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="form__error" data-for="phone"></div>
                    </div>
                    <div className="contact-form">
                        <label>
                            ИНН:
                            <input
                                type="text"
                                name="inn"
                                value={formData.inn}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="form__error" data-for="inn"></div>
                    </div>
                    <div className="contact-form">
                        <label>
                            Адрес доставки:
                            <input
                                type="text"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="form__error" data-for="deliveryAddress"></div>
                    </div>
                    <button className="form__btn" type="submit">Отправить</button>
                    <div className="form__send-result"></div>
                </form>
            </div>
        </div>
    );
};


const displayErrors = (errors) => {
    const errorElements = document.querySelectorAll('.form__error');
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });

    if (errors.length < 1) return;

    errors.forEach((error) => {
        const { field, message } = error;
        const errorElement = document.querySelector(`[data-for="${field}"]`);
        if (errorElement) {
            errorElement.textContent = message
            errorElement.style.color = 'green';
        }
    });
};

const validateForm = (formData) => {
    const { fullName, email, phone, inn } = formData;

    const phoneRegex = /^\+[0-9]{5,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = [];

    if (!fullName) {
        errors.push({ field: 'fullName', message: 'Пожалуйста, введите ваше ФИО.' });
    } else if (fullName.length < 5 || fullName.length > 20) {
        errors.push({ field: 'fullName', message: 'Пожалуйста, введите корректные данные. Пример: Быков Иван Петрович' });
    }

    if (!phone) {
        errors.push({ field: 'phone', message: 'Пожалуйста, введите номер телефона.' });
    } else if (!phoneRegex.test(phone)) {
        errors.push({ field: 'phone', message: 'Пожалуйста, введите корректный номер телефона. Пример: +375257851204' });
    }

    if (!email) {
        errors.push({ field: 'email', message: 'Пожалуйста, введите адрес электронной почты.' });
    } else if (!emailRegex.test(email) || (email.length < 5 || email.length > 100)) {
        errors.push({ field: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты. Пример: frontend@gmail.com' });
    }

    if (!inn) {
        errors.push({ field: 'inn', message: 'Пожалуйста, введите ИНН.' });
    } else if (inn.length !== 12 && inn.length !== 10) {
        errors.push({ field: 'inn', message: 'В ИНН должно быть или 12, или 10 символов.' });
    }

    return errors;
};



export default EmailForm;
