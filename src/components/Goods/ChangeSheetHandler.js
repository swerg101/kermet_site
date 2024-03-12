const GoogleSheetsAPI = require('./GoogleSheetsAPI');
const http = require('http');

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/sheets') {
        console.log("Данные таблицы были изменены, вносим изменения в нашу БД");
        const googleSheetsAPI = new GoogleSheetsAPI();
        googleSheetsAPI.getDataAndWriteToFile();

    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

const PORT = 3600; // Порт, на котором будет работать сервер
server.listen(PORT, () => {
    console.log(`Сервер для прослушивания изменений в таблице запущен на порту: ${PORT}`);
});
