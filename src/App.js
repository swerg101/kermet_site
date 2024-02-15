import './App.css';
import Header from "./components/Header/Header";
import Kermet from "./components/Goods/Kermet.json"
import Items from "./components/Items";
import React, {Component} from "react";
import Categories from "./components/Categories/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Footer from "./components/Footer";
import GoToCheckout from "./components/GoToCheckout";
import ShowContact from "./components/ShowContact";
import Cart from "./components/Cart";
import EmployeeInfo from "./components/EmployeeInfo/EmployeeInfo";

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

            goToOffer: false,

            showEmployeeInfo: false,


        }

        this.onOffer = this.onOffer.bind(this)

        this.state.currItems = this.state.items

        this.addToOrder = this.addToOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.chooseCategory = this.chooseCategory.bind(this)
        this.onShowItem = this.onShowItem.bind(this)
        this.deleteToOrder = this.deleteToOrder.bind(this)
        this.onShowFullOrder = this.onShowFullOrder.bind(this)


        this.onShowContact = this.onShowContact.bind(this)
        this.onShowEmployeeInfo = this.onShowEmployeeInfo.bind(this)


    }

    render() {
        return (

            <div>
                {/*Отрисовываем Шапку сайта*/}
                <Header
                    showContact={this.state.ShowContact}
                    onOffer={this.onOffer}
                    goToOffer={this.state.goToOffer}
                    onShowContact={this.onShowContact}
                    showFullOrder={this.state.showFullOrder}
                    onShowFullOrder={this.onShowFullOrder}
                    onShowEmployeeInfo={this.onShowEmployeeInfo}
                    showEmployeeInfo={this.state.showEmployeeInfo}
                />

                {/*Отрисовываем только Контактную информацию*/}
                {this.state.ShowContact && !this.state.showEmployeeInfo &&
                    <ShowContact onShowContact={this.onShowContact}/>
                }

                {/*Отрисовываем только информацию о работниках*/}
                {this.state.showEmployeeInfo &&
                    <EmployeeInfo />
                }

                {/*Отрисовываем только Полный каталог товаров*/}
                {!this.state.ShowContact &&
                    !this.state.showFullOrder &&
                    !this.state.showFullItem &&
                    !this.state.showEmployeeInfo &&
                    <>

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

                {/*Отрисовываем только Полную информацию о товаре*/}
                {!this.state.showFullOrder && this.state.showFullItem && !this.state.showEmployeeInfo &&
                    <ShowFullItem onShowItem={this.onShowItem} onAdd={this.addToOrder} item={this.state.fullItem}/>
                }

                {/*Отрисовываем только Полный список покупок*/}
                {this.state.showFullOrder && !this.state.showEmployeeInfo &&
                    <GoToCheckout onOffer={this.onOffer}
                                  goToOffer={this.state.goToOffer}
                                  orders={this.state.orders}
                                  onAdd={this.addToOrder}
                                  onToDelete={this.deleteToOrder}
                                  onShowFullOrder={this.onShowFullOrder}
                    />
                }

                {/*Отрисовываем Нижний элемент страницы*/}
                <Footer onShowEmployeeInfo={this.onShowEmployeeInfo}/>
            </div>


        )
    }


    onShowEmployeeInfo() {
        this.setState({showEmployeeInfo: !this.state.showEmployeeInfo})
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
            const newOrders = new Map(Array.from(this.state.orders.entries()).filter(([key, value]) => key.articul !== item.articul || value > 1));
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

    onOffer() {
        this.setState({goToOffer: !this.state.goToOffer})
    }


}

export default App;

