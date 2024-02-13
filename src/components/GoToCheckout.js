import React, {Component} from 'react';
import Order from "./Header/Order";
import EmailForm from "./EmailForm";

class GoToCheckout extends Component {

  render() {
    let totalPrice = 0;

    for (const [product, quantity] of this.props.orders) {
      const productPrice = product.price * quantity;
      totalPrice += productPrice;
    }

    return (
      <div>

        {!this.props.goToOffer &&
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

        {!this.props.goToOffer &&
            <>
              <h3>Итоговая сумма заказа: {totalPrice}р.</h3>
              <br/>
              <h2 className='go-to-offer-button' onClick={() => this.props.onOffer()}>Перейти к оформлению заказа</h2>
            </>
        }
        {this.props.goToOffer &&
          < EmailForm myList={this.props.orders} />
        }

      </div>
    )
  }

}

export default GoToCheckout;
