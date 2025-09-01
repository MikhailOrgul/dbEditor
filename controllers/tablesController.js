const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const { 
    getAllTables, 
    getTableValues,
    saveTable,
    dropTable
} = require('../model/tables')

//Получить список таблиц в БД
const handleGetAllTables = async () => {
    return await getAllTables()
}

//Данные о полях таблицы
const handlerGetTableValues = async (_event, tableName) => {
    return await getTableValues(tableName)
}

//Сохранить таблицу
const handlerSaveTable = async (_event, obj) => {
    return await saveTable(obj)
}

//Удалить таблицу
const handleDeleteTable = async (_event, tableName) => {
    return await dropTable(tableName)
} 

//Обновить .ENV
const settingsUpdate = (_event, settingsObj) => {
    const envPath = path.join(__dirname, '../', '.env')
    const envConfig = dotenv.parse(fs.readFileSync(envPath));

    for (const key in settingsObj) {
        if (settingsObj[key] !== '') {
            envConfig[key] = settingsObj[key];
        }
    }

    const updatedEnv = Object.entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync(envPath, updatedEnv);
}

module.exports = { 
    handleGetAllTables,
    handlerGetTableValues,
    handlerSaveTable,
    handleDeleteTable,
    settingsUpdate
}