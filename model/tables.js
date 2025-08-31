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

//Данные о полях таблицы
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
        
        result.rows.map((i) => {
            if(i.is_nullable === 'NO'){
                i.is_nullable = false
            } else if(i.is_nullable === 'YES') {
                i.is_nullable = true
            }
        })

        return result.rows
    } catch (err) {
        console.error('[ERROR] получение данных из таблицы', err)
    }
}

//Запись данных с клиента
const saveTable = async (dataObj) => {
    const generateQuerySQL = async () => {
        const { tableName, columns } = dataObj
        let columnsSQL = columns.map(column => {
            let columnParams = `"${column.column_name}" ${column.data_type.toUpperCase()} `

            if(!column.is_nullable) columnParams += ' NOT NULL'
            if(column.unique) columnParams += ' UNIQUE'

            return columnParams
        })
        
        let columnsPK = columns.filter(column => column.primary_key).map(column => `"${column.column_name}"`)
        if (columnsPK.length) columnsSQL.push(`PRIMARY KEY (${columnsPK.join(', ')})`)

        const query = `CREATE TABLE "${tableName}" \n(${columnsSQL});`
        return query
    }   
    
    const dropTable = async () => {
        const query = `DROP TABLE IF EXISTS "${dataObj.tableName}" CASCADE;`
        const sqlDrop = await pool.query(query)
        return sqlDrop        
    }
    try{
        await dropTable()
        await pool.query(await generateQuerySQL())
    } catch (err) {
        console.error(err)
    }
}

module.exports ={ 
    getAllTables, 
    saveTable,
    getTableValues,
}