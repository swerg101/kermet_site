import React, {Component} from 'react';
import MyCategories from './MyCategories.json'
class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: MyCategories
    }
  }
  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el =>(
          <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
        ))}
      </div>
    );
  }
}

export default Categories;
