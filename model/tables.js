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

const getTableValues = async (tableName) => {
    const query = `
        SELECT 
            c.column_name,
            c.ordinal_position AS id,
            c.data_type,
            c.is_nullable,
        CASE 
            WHEN pk_tc.constraint_type = 'PRIMARY KEY' THEN true
            ELSE false
        END AS primary_key,
        CASE 
            WHEN uq_tc.constraint_type = 'UNIQUE' THEN true
            ELSE false
        END AS unique
        FROM information_schema.columns c
        LEFT JOIN information_schema.key_column_usage pk_kcu
            ON c.table_name = pk_kcu.table_name
            AND c.column_name = pk_kcu.column_name
            AND c.table_schema = pk_kcu.table_schema
        LEFT JOIN information_schema.table_constraints pk_tc
            ON pk_kcu.constraint_name = pk_tc.constraint_name
            AND pk_tc.constraint_type = 'PRIMARY KEY'
            AND c.table_schema = pk_tc.table_schema
        LEFT JOIN information_schema.key_column_usage uq_kcu
            ON c.table_name = uq_kcu.table_name
            AND c.column_name = uq_kcu.column_name
            AND c.table_schema = uq_kcu.table_schema
        LEFT JOIN information_schema.table_constraints uq_tc
            ON uq_kcu.constraint_name = uq_tc.constraint_name
            AND uq_tc.constraint_type = 'UNIQUE'
            AND c.table_schema = uq_tc.table_schema
        WHERE c.table_name = '${tableName}'
        AND c.table_schema = 'public'
        ORDER BY c.ordinal_position;
    `
    try{
        const result = await pool.query(query)
        return result.rows
    } catch (err) {
        console.error('[ERROR] получение данных из таблицы', err)
    }
}

module.exports ={ 
    getAllTables, 
    createTable, 
    alterTableColumns, 
    dropTable,
    getTableValues,
    
}