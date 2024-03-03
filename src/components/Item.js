import {Component} from "react";


export class Item extends Component{
    render(){
        const itemStyle = {
            display: 'inline-block',
            marginRight: '15px'
        };

        return(
            <div className="container_right">
                <li className='item'>
                    <h2 style={itemStyle} onClick={() => this.props.onShowItem(this.props.item)}>{this.props.item.title}</h2>
                    <h3 style={itemStyle}>{this.props.item.price}p.</h3>
                    <h3 style={itemStyle}>{this.props.item.ostatok} шт.</h3>
                    <h4 className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>Добавить в корзину</h4>
                </li>
            </div>
        )
    }
}




export default Item
