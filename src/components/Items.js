import {Component} from "react";
import {Item} from "./Item";

export class Items extends Component{
    render() {
        return(
            <main>

                <body className="body">
                <div className="container_items">
                    {this.props.items.map(
                        el => (<Item onShowItem={this.props.onShowItem} key={el.articul} item={el} onAdd={this.props.onAdd}/>
                        ))}
                </div>
                </body>
            </main>
        )
    }
}
export default Items
