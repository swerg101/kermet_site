import {Component} from "react";
import {Item} from "./Item";

export class Items extends Component {
    render() {
        return (
            <div className="container_right">
                {this.props.items.map(el => (
                    <Item onShowItem={this.props.onShowItem} key={el.articul} item={el} onAdd={this.props.onAdd} />
                ))}
            </div>
        );
    }
}
export default Items
