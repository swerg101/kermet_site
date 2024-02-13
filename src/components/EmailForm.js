import React, { Component } from 'react';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phoneNumber: '',
      orderSubmitted: false,
      myList: props.myList,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });

      if (response.ok) {
        console.log('Успешно отправлено');
        this.setState({ orderSubmitted: true });
      } else {
        console.error('Ошибка при отправке данных');
        alert('Произошла ошибка при отправке данных.');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      alert('Произошла ошибка при отправке данных.');
    }
  };
  inn;
  adress;

  render() {
    if (this.state.orderSubmitted) {
      // Если заказ был успешно отправлен, отображаем сообщение
      return (
        <div>
          <p>Заказ оформлен, в ближайшее время с вами свяжутся.</p>
        </div>
      );
    }

    // В противном случае отображаем форму
    return (
        <body className="body">
        <div className="container2">

          <div className="contact">
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="contact-form">
                  <label>
                    ФИО:
                    <input
                        type="text"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.handleChange}
                    />
                  </label>
                  <br/>
                </div>
                <div className="contact-form">
                  <label>
                    Адрес электронной почты:
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                  </label>
                  <br/>
                </div>
                <div className="contact-form">
                  <label>
                    Номер телефона:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                    />
                  </label>
                  <br/>

                </div>
                <div className="contact-form">
                  <label>
                    ИНН:
                    <input
                        type="inn"
                        name="inn"
                        value={this.state.inn} // я не ебал что в валуе писать
                        onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="contact-form">
                  <label>
                    Адрес доставки:
                    <input
                        type="adress"
                        name="delivery adress"
                        value={this.state.adress} // я не ебал что в валуе писать
                        onChange={this.handleChange}
                    />
                  </label>
                  <br/>

                  <button type="submit">Отправить</button>
                </div>
              </form>

            </div>
          </div>
        </div>
        </body>

    );
  }
}

export default EmailForm;
