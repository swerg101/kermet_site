import './App.css';
import Header  from "./components/Header/Header";
import Kermet from "./components/Goods/Кermet.json"
import Items from "./components/Items";
import React, {Component} from "react";
import Categories from "./components/Categories/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Footer from "./components/Footer";

class App extends Component{
  constructor(props) {
      super(props);
      this.state = {
        orders: [],
        ordersCount:[],
        currItems: [],
        items: Kermet,
        showFullItem: false,
        fullItem: {}
      }

      this.state.currItems = this.state.items

      this.addToOrder = this.addToOrder.bind(this)
      this.deleteOrder = this.deleteOrder.bind(this)
      this.chooseCategory = this.chooseCategory.bind(this)
      this.onShowItem = this.onShowItem.bind(this)


  }
  render() {
    return(
      <div>
          <Header sitename="Test site on React" second_header="Two Header" orders={this.state.orders} onDelete={this.deleteOrder} ordersCounter={this.ordersCounter}/>
          {!this.state.showFullItem &&
            <>
            <Categories chooseCategory={this.chooseCategory}/>
            <Items onShowItem={this.onShowItem} items={this.state.currItems} onAdd={this.addToOrder}/>
            </>
          }
          {this.state.showFullItem && <ShowFullItem onShowItem={this.onShowItem} onAdd={this.addToOrder} item={this.state.fullItem}/> }
          <Footer  />
      </div>
    )
  }



  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category){
    if(category === 'all'){
      this.setState({ currItems: this.state.items })
      return
    }
    this.setState({
      currItems: this.state.items.filter(el => el.category === category)
    })
  }

  addToOrder(item){
    // let inArray = false
    // this.state.orders.forEach(el => {
    //   if (el.articul == item.articul)
    //     inArray = true
    // })
    // if (!inArray)
      this.setState({orders: [...this.state.orders, item]})
    }
  deleteOrder(id){
      this.setState({orders: this.state.orders.filter(el => el.articul != id )})
  }

}

export default App;
