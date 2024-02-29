const fs = require('fs');



const inputFilePath = "../Goods/Kermet.json";


const outputFilePath = 'MyCategories.json';

// Чтение исходного JSON файла
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // Удаление дубликатов
        const uniqueData = [];
        const keys = new Set();
        jsonData.forEach(item => {
            if (!keys.has(item.category)) {
                keys.add(item.category);
                uniqueData.push({
                    key: item.category,
                    name: item.category
                });
            }
        });

        // Запись данных в новый JSON файл
        fs.writeFile(outputFilePath, JSON.stringify(uniqueData, null, 2), (err) => {
            if (err) {
                console.error('Ошибка записи файла:', err);
                return;
            }
            console.log('Новый JSON файл успешно создан:', outputFilePath);
        });
    } catch (error) {
        console.error('Ошибка парсинга JSON:', error);
    }
});