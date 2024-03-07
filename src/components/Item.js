import {Component} from "react";


export class Item extends Component{
    render(){
        const itemStyle = {
            display: 'inline-block',
            marginRight: '15px'
        };
        const borderBottomStyle = {
            position: 'relative', // Изменение позиции на relative
            borderBottom: '1px solid #4682B4',
        };



        return(
            <div className="container_right">
                <li className='item' style={{position: 'relative'}}>
                    <div className="stolbec1">
                        <h2 style={itemStyle}
                            onClick={() => this.props.onShowItem(this.props.item)}>{this.props.item.title}</h2>
                    </div>
                    <div className="stolbec2">
                        <h3 style={itemStyle}>{this.props.item.price}p.</h3>
                    </div>
                    <div className="stolbec3">
                        <h3 style={itemStyle}>{this.props.item.ostatok} шт.</h3>
                    </div>
                    <div className="stolbec4">
                        <h4 className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>Добавить в
                            корзину</h4>
                    </div>
                    <div style={borderBottomStyle}></div>
                </li>
            </div>
        )
    }
}


export default Item
