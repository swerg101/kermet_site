import React from 'react';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, name: 'Джон_1', position: 'Фронтенд-мартышка', number: '+777777777777', email: 'aoaoaoo@gmail.com', photo: 'john-doe.jpg' },
                { id: 2, name: 'Джон_2', position: 'Фронтенд-мартышка', number: '+777777777777', email: 'aoaoaoo@gmail.com', photo: 'john-doe.jpg' },
                { id: 3, name: 'Джон_3', position: 'Фронтенд-мартышка', number: '+777777777777', email: 'aoaoaoo@gmail.com', photo: 'john-doe.jpg' },



            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Информация о сотрудниках</h1>
                <ul>
                    {this.state.employees.map(employee => (
                        <li key={employee.id}>
                            <img src="http://dummyimage.com/120" />
                            <br />
                            <strong>ФИО:</strong> {employee.name}<br />
                            <strong>Должность:</strong> {employee.position}<br />
                            <strong>Электронная почта</strong> {employee.email}<br />
                            <strong>Рабочий телефон</strong> {employee.number}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default EmployeeInfo;
