import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="content">
                        <a className="contact_me" onClick={() => this.props.onShowEmployeeInfo()}>Наши сотрудники </a>
                        <h4>Последнее обновление даты: 11.03.2024 13:00 </h4>
                    </div>
                </div>
            </footer>
    )
  }
}

export default Footer
