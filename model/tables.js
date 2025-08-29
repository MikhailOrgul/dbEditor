const pool = require('./db')

//Получить список таблиц в БД
const getAllTables = async () => { 
    const query = await pool.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';
    `)
    return query.rows
}

//Создане таблицы
const createTable = async (dataObj) => {
    const query = (`
        CREATE TABLE ${dataObj.tableName} (
            ${dataObj.cols}
            PRIMARY KEY (${dataObj.primaryKeyCol})
        )
    `)

    try{
        await pool.query(query)
    } catch(err) {
        console.error('[ERROR] создание таблицы', err)
    }
    
}

//Изменение таблицы
const alterTableColumns = async (dataObj) => {
    const query = `
        ALTER TABLE ${dataObj.tableName} ${dataObj.method} ${dataObj.col} ${dataObj.dataType}
    `
    try{
        await pool.query(query)
    } catch (err) {
        console.error('[ERROR] изменение таблицы', err)
    }
}

//Удаление таблицы
const dropTable = async (tableName) => {
    const query = `DROP TABLE ${tableName}`
    try{
        await pool.query(query)
    } catch (err) {
        console.error('[ERROR] удаление таблицы', err)
    }
}

module.exports ={ 
    getAllTables, 
    createTable, 
    alterTableColumns, 
    dropTable, 
}