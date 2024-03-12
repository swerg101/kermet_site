const { google } = require('googleapis');
const fs = require('fs');

class GoogleSheetsAPI {
  constructor() {
    // Загрузка ключей для авторизации
    this.keys = JSON.parse(fs.readFileSync('./credentials.json'));
    console.log('ok')

    // Указываем область доступа, в данном случае это таблицы
    this.scopes = ['https://www.googleapis.com/auth/spreadsheets'];

    // Создаем клиент Google Sheets
    this.client = new google.auth.JWT(
        this.keys.client_email,
        null,
        this.keys.private_key,
        this.scopes
    );
  }

  async authorize() {
    return new Promise((resolve, reject) => {
      this.client.authorize((err, tokens) => {
        if (err) {
          console.error('Ошибка авторизации:', err);
          reject(err);
          return;
        }
        console.log('Успешная авторизация');
        resolve(tokens);
      });
    });
  }

  async getDataAndWriteToFile() {
    try {
      await this.authorize();
      const sheets = google.sheets({ version: 'v4', auth: this.client });
      const spreadsheetId = '1H7CsrFlwKHSJRSx8x_birZtMeauFCukGfRptdrd4aaM';

      // Пример запроса данных из таблицы
      const res = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId,
      });

      const sheetsData = res.data.sheets;
      if (sheetsData.length) {
        // Находим первый лист
        const firstSheet = sheetsData[0];

        // Получаем название первого листа
        const sheetName = firstSheet.properties.title;

        // Получаем данные со всего первого листа
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: `${sheetName}!A1:Z`,
        });

        const rows = response.data.values;
        if (rows.length) {
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
      } else {
        console.log('Нет данных в таблице.');
      }
    } catch (error) {
      console.error('Ошибка при получении данных из таблицы:', error);
    }
  }
}

module.exports = GoogleSheetsAPI;
