import {Component} from "react";


export class Item extends Component{
    render(){
        return(
            <div className='item'>
                <h2 onClick={() => this.props.onShowItem(this.props.item)}>{this.props.item.title}</h2>
                <p>{this.props.item.description}</p>
                <b>{this.props.item.price}p.</b>
                <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>Добавить в корзину</div>
            </div>
        )
    }
}

export default Item
