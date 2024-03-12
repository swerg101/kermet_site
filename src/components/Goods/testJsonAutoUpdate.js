// const http = require('http');
// const fs = require('fs');
//
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/sheets') {
//         console.log('request is accept!')
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             try {
//                 const data = JSON.parse(body);
//                 // Записываем данные в файл data.json
//                 fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
//                     if (err) {
//                         console.error(err);
//                         res.writeHead(500, { 'Content-Type': 'text/plain' });
//                         res.end('Internal Server Error');
//                     } else {
//                         res.writeHead(200, { 'Content-Type': 'text/plain' });
//                         res.end('File saved successfully');
//                     }
//                 });
//             } catch (error) {
//                 console.error(error);
//                 res.writeHead(400, { 'Content-Type': 'text/plain' });
//                 res.end('Bad Request');
//             }
//         });
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     }
// });
//
// const PORT = 3600;
// server.listen(PORT, () => {
//     console.log(`Сервер для принятия запросов от Google Sheets настроен на порту: ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3600;

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '100mb' })); // Установите здесь необходимый вам лимит

app.post('/sheets', async (req, res) => {
    try {
        console.log('request is processed')
        console.log(req)
        const data = req.body;

        app.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('File saved successfully');
            }
        });

        res.send('kermet.JSON is Update!');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Сервер для принятия запросов от Google Sheets настроен на порту: ${PORT}`);
});