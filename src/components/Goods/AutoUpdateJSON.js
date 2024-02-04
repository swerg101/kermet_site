 //json-server --watch db.json --port 3000

const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');


const credentials = require('./ordinal-nucleus-413211-4d25f21e9f65.json');

async function convertSheetToJson() {
  try {

    const doc = new GoogleSpreadsheet('1H7CsrFlwKHSJRSx8x_birZtMeauFCukGfRptdrd4aaM');

    await doc.useServiceAccountAuth(credentials);


    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];


    const rows = await sheet.getRows();

    const jsonData = rows.slice(0).map(row => {
      return {
        "articul": parseInt(row['Артикул']),
        "title": row['Тип товара + бренд или производитель + модель + отличительные характеристики'],
        "name": row['Наименование торговой марки от производителя'],
        "description": row['Описание товара'],
        "brand": row['Бренд или производитель'],
        "inStock": row['Большевиков'],
        "gost": row["ГОСТ"],
        "price": parseFloat(row['Цена без НДС']),
        // "category": row["Категории]
      };
    });

    // Сохрание JSON
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('output.json', jsonString);

    console.log('Данные успешно сохранены в output.json');

  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

 convertSheetToJson()
