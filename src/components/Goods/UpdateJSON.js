const { google } = require('googleapis');
const fs = require('fs');

// Загрузка ключей для авторизации
const keys = JSON.parse(fs.readFileSync('./ordinal-nucleus-413211-4d25f21e9f65.json'));

// Указываем область доступа, в данном случае это таблицы
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

// Создаем клиент Google Sheets
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    scopes
);

// Авторизуемся и получаем доступ к таблице
client.authorize(function(err, tokens) {
  if (err) {
    console.error('Ошибка авторизации:', err);
    return;
  }
  console.log('Успешная авторизация');
  // Теперь можно делать запросы к Google Sheets API
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Пример запроса данных из таблицы
  sheets.spreadsheets.get({
    spreadsheetId: '1H7CsrFlwKHSJRSx8x_birZtMeauFCukGfRptdrd4aaM',
  }, (err, res) => {
    if (err) return console.log('Ошибка при получении данных из таблицы:', err);
    const sheetsData = res.data.sheets;
    if (sheetsData.length) {
      // Находим первый лист
      const firstSheet = sheetsData[0];

      // Получаем название первого листа
      const sheetName = firstSheet.properties.title;

      // Получаем данные со всего первого листа
      sheets.spreadsheets.values.get({
        spreadsheetId: '1H7CsrFlwKHSJRSx8x_birZtMeauFCukGfRptdrd4aaM',
        range: `${sheetName}!A1:Z`,
      }, (err, res) => {
        if (err) return console.log('Ошибка при получении данных:', err);
        const rows = res.data.values;
        if (rows.length) {
          console.log('Данные:');
          const jsonData = rows.slice(1).map(row => {
            return {
              "articul": parseInt(row[0]),
              "category": row[1],
              "title": row[2],
              "description": row[3],
              "brand": row[4],
              "units": row[5],
              "price": row[6],
              "ostatok": parseInt(row[8])
            };
          });

          const jsonString = JSON.stringify(jsonData, null, 2);

          // Записываем данные в файл
          fs.writeFileSync('Kermet.json', jsonString);

          console.log('Данные записаны в Kermet.json');
        } else {
          console.log('Нет данных.');
        }
      });
    } else {
      console.log('Нет данных в таблице.');
    }
  });
});
