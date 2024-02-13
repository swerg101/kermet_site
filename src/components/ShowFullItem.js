import React, {Component} from 'react';
import {AiFillBoxPlot} from "react-icons/ai";

class ShowFullItem extends Component {
  render() {
    return (
      <div className='full-item'>
        <h3 onClick={() => this.props.onShowItem(this.props.item)}>Назад к каталогу</h3>
        <h2>{this.props.item.title}</h2>
        <p>УРА, карточка товара</p>
        <p>{this.props.item.description}</p>
        <b>{this.props.item.price}p.</b>
        <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>Добавить в корзину</div>

      </div>
    );
  }
}

export default ShowFullItem;
