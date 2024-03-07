const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Используем multer для обработки файлов
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());

// Обработчик POST-запроса для загрузки файла
app.post('/order', upload.single('file'), (req, res) => {
  // Проверяем, получен ли файл в запросе
  if (!req.file) {
    return res.status(400).send('Файл не был отправлен');
  }

  // Получаем содержимое файла
  const fileContent = fs.readFileSync(req.file.path, 'utf8');

  // Записываем содержимое файла в указанный JSON файл
  fs.writeFileSync('output.json', fileContent);

  // Отправляем ответ о успешном сохранении файла
  res.send('Файл успешно сохранен в JSON');
});


app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
