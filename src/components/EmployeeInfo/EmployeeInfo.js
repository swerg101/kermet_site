import React from 'react';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, name: 'Благородная Екатерина Владимировна', position: 'Генеральный директор', number: '+7 (911) 037-15-45', email: 'blagorodnaya78@mail.ru', photo: require('./image/Director.png') },
                { id: 2, name: 'Панина Яна Владимировна', position: 'Заместитель генерального директора', number: '+7 (921) 416-28-66', email: 'nobilepater@yandex.ru', photo: require('./image/Yana.jpeg') },
                { id: 3, name: 'Ева-Стефания Егоровна', position: 'Глава службы безопасности', number: '+7 (777) 777-77-77', email: 'aoaoaoo@gmail.com', photo: require('./image/Dog.jpg') },

            ]
        };
    }

    render() {
        return (
            <div className="container_center">
                <h1>Информация о сотрудниках</h1>
                <ul>
                    {this.state.employees.map(employee => (
                        <li key={employee.id}>
                            <img src={employee.photo} width={345}/>
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