import React, {Component} from 'react';
import Order from "./Header/Order";
import EmailForm from "./EmailForm";

class GoToCheckout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      goToOffer: false,
    }

    this.onOffer = this.onOffer.bind(this)
  }

  render() {
    return (
      <div>
        <h3 onClick={() => this.props.onShowFullOrder()}>Вернуться к покупкам</h3>
        {this.state.goToOffer &&
          <h3 onClick={() => this.onOffer()}>Вернуться к корзине товаров</h3>
        }

        {!this.state.goToOffer &&
          Array.from(this.props.orders.entries()).map(([key, value]) => {
            if (key) {
              return (
                <Order
                  key={key.articul}
                  item={key}
                  counter={value}
                  onAdd={this.props.onAdd}
                  onDelete={this.props.onDelete}
                  onToDelete={this.props.onToDelete}
                />

              );
            }
            return null;

          })
        }
        {!this.state.goToOffer &&

            <h2 onClick={() => this.onOffer()}>Перейти к оформлению заказа</h2>
        }
        {this.state.goToOffer &&
          < EmailForm myList={this.props.orders} />
        }

      </div>
    )
  }

  onOffer() {
    this.setState({goToOffer: !this.state.goToOffer})
  }
}

export default GoToCheckout;
