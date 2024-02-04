const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/sheets', (req, res) => {
  const jsonData = req.body;

  // Произведите необходимую обработку данных
  // Например, сохраните их в файл
  fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));

  res.send('Данные успешно сохранены локально');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
