import React, {Component} from 'react';
import {FaTrash} from "react-icons/fa";

class Order extends Component {
    render() {
        return (
            <div className='item'>
                <h2>{this.props.item.title}</h2>
                <p>{this.props.item.description}</p>
                <h4>{this.props.item.price}p.</h4>
                <h5>
                    количество: {this.props.counter}
                    <span onClick={() => this.props.onAdd(this.props.item)}> + </span>
                    <span onClick={() => this.props.onToDelete(this.props.item)}> -</span>
                </h5>

            </div>
        );
    }
}


export default Order;
