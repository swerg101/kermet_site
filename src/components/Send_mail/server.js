
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');



const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());


// Настройка транспортера для отправки электронной почты
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'nobilepater.site@yandex.ru',
        pass: 'zchnhrolpibhuvxj'
    }
});


app.post('/send-email', async (req, res) => {
    try {
        const { fullName, phone, email, inn, deliveryAddress, myList } = req.body;
        let totalPrice = 0;
        let productList = '';

        console.log('request is processed')
        myList.forEach(item => {
            const key = item.key; // Получаем информацию о товаре из свойства key
            const value = item.value; // Получаем количество товара из свойства value

            totalPrice += key.price * value;
            productList += `Название товара: ${key.title}, Категория товара: ${key.category}, Описание товара: ${key.description}, Количество: ${value}, Цена за единицу: ${key.price}`;
            productList += `<br>`

        });

        console.log(productList);


        // Отправляем письмо
        console.log(transporter)
        await transporter.sendMail({

            from: 'nobilepater.site@yandex.ru', // Адрес отправителя
            to: 'dunaevspb@yandex.ru',   // Адрес получателя
            subject: `Заказ от ${fullName}`,
            html: `<p><strong>ФИО:</strong> ${fullName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Номер телефона:</strong> ${phone}</p>
                   <p><strong>ИНН:</strong> ${inn}</p>
                   <p><strong>Адрес доставки:</strong> ${deliveryAddress}</p>
                   <p><strong>Заказ:</strong><br>${productList}</p>
                   <h4><bold>Итоговая сумма заказа: ${totalPrice}р.</bold></h4>`,
        });

        res.send('Сообщение отправлено!');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Сервер запущен на порту ${PORT}`);
});

