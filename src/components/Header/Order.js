import React, {Component} from 'react';
import {FaTrash} from "react-icons/fa";

class Order extends Component {

    render() {

        return (

            <div className='item'>

                <h2>{this.props.item.title}</h2>
                <p>{this.props.item.description}</p>
                <b>{this.props.item.price}p.</b>
                <p onClick={ () => this.props.onAdd(this.props.item)}>+</p>
                <p onClick={ () => this.props.onToDelete(this.props.item)}>-</p>
                <p>количество</p>
                <p>{this.props.counter}</p>
                {/*<FaTrash className='delete-icon'  onClick={() => this.props.onDelete(this.props.item.articul) } />*/}

            </div>
        );
    }
}

export default Order;
