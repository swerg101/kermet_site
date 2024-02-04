import './App.css';
import Header from "./components/Header/Header";
import Kermet from "./components/Goods/Кermet.json"
import Items from "./components/Items";
import React, {Component} from "react";
import Categories from "./components/Categories/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Footer from "./components/Footer";
import GoToCheckout from "./components/GoToCheckout";
import ShowContact from "./components/ShowContact";
import Cart from "./components/Cart";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: new Map(),
            currItems: [],
            items: Kermet,

            showFullItem: false,
            fullItem: {},

            showFullOrder: false,
            fullOrder: [],

            ShowContact: false,

        }

        this.state.currItems = this.state.items

        this.addToOrder = this.addToOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.chooseCategory = this.chooseCategory.bind(this)
        this.onShowItem = this.onShowItem.bind(this)
        this.deleteToOrder = this.deleteToOrder.bind(this)
        this.onShowFullOrder = this.onShowFullOrder.bind(this)


        this.onShowContact = this.onShowContact.bind(this)


    }

    render() {
        return (

            <div>

                {this.state.ShowContact && <ShowContact onShowContact={this.onShowContact}/>
                }
                {!this.state.ShowContact &&
                    !this.state.showFullOrder &&
                    !this.state.showFullItem &&

                    <>
                        <Header
                            orders={this.state.orders}
                            onDelete={this.deleteOrder}
                            onAdd={this.addToOrder}
                            onToDelete={this.deleteToOrder}
                            onShowFullOrder={this.onShowFullOrder}

                            onShowContact={this.onShowContact}
                        />
                        <Cart
                            orders={this.state.orders}
                            onDelete={this.deleteOrder}
                            onAdd={this.addToOrder}
                            onToDelete={this.deleteToOrder}
                            onShowFullOrder={this.onShowFullOrder}


                        />
                        <Categories chooseCategory={this.chooseCategory}/>
                        <Items onShowItem={this.onShowItem} items={this.state.currItems} onAdd={this.addToOrder}/>
                    </>

                }
                {!this.state.showFullOrder && this.state.showFullItem &&
                    <ShowFullItem onShowItem={this.onShowItem} onAdd={this.addToOrder} item={this.state.fullItem}/>
                }
                {this.state.showFullOrder &&
                    <GoToCheckout orders={this.state.orders}
                                  onAdd={this.addToOrder}
                                  onToDelete={this.deleteToOrder}
                                  onShowFullOrder={this.onShowFullOrder}
                    />
                }
                <Footer/>
            </div>


        )
    }


    onShowItem(item) {
        this.setState({fullItem: item})
        this.setState({showFullItem: !this.state.showFullItem})
    }


    onShowFullOrder() {
        this.setState({showFullOrder: !this.state.showFullOrder})
    }

    onShowContact() {
        this.setState({ShowContact: !this.state.ShowContact})
    }


    chooseCategory(category) {
        if (category === 'all') {
            this.setState({currItems: this.state.items})
            return
        }
        this.setState({
            currItems: this.state.items.filter(el => el.category === category)
        })
    }

    addToOrder(item) {
        this.setState({orders: this.state.orders.set(item, this.state.orders.has(item) ? this.state.orders.get(item) + 1 : 1)})
    }


    deleteToOrder(item) {
        if (item && this.state.orders.get(item) === 1) {
            const newOrders = new Map(Array.from(this.state.orders.entries()).filter(([key, value]) => key && key.articul !== item.articul));
            this.setState({orders: newOrders});
        } else {
            this.setState({orders: this.state.orders.set(item, this.state.orders.get(item) - 1)});
        }
    }


    deleteOrder(id) {
        this.setState({
            orders: new Map(Array.from(this.state.orders.keys()).filter(el => el.articul !== id))
        });
    }


}

export default App;
