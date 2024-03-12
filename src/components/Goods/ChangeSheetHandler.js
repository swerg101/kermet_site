const GoogleSheetsAPI = require('./GoogleSheetsAPI');
const http = require('http');

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/sheets') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Получаем тело POST запроса
        });
        req.on('end', () => {
            try {
                const requestData = JSON.parse(body); // Парсим тело запроса, если оно JSON

                // Проверяем наличие слова "Table_is_change!"
                if (requestData.message === "Table_is_change!") {
                    console.log("Данные таблицы были изменены, вносим изменения в нашу БД");

                    const googleSheetsAPI = new GoogleSheetsAPI();
                    googleSheetsAPI.getDataAndWriteToFile();

                } else {
                    console.log("Неверное сообщение в запросе.");
                    res.statusCode = 400;
                    res.end('Bad Request');
                }
            } catch (error) {
                console.error(`Ошибка разбора JSON: ${error.message}`);
                res.statusCode = 400;
                res.end('Bad Request');
            }
        });
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

const PORT = 3600; // Порт, на котором будет работать сервер
server.listen(PORT, () => {
    console.log(`Сервер для прослушивания изменений в таблице запущен на порту: ${PORT}`);
});
