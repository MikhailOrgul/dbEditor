const { 
    getAllTables, 
    getTableValues,
    saveTable
} = require('../model/tables')

//Получить список таблиц в БД
const handleGetAllTables = async () => {
    return await getAllTables()
}

//Данные о полях таблицы
const handlerGetTableValues = async (_event, tableName) => {
    return await getTableValues(tableName)
}

const handlerSaveTable = async (_event, obj) => {
    console.log('[OBJ CONTROLLER]', obj)
    return await saveTable(obj)
}

module.exports = { 
    handleGetAllTables,
    handlerGetTableValues,
    handlerSaveTable
}