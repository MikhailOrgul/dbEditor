import TableItem from '../tableList/tableItem'
import { useState, useEffect } from 'react'


const TablesList = ({ onChangeHeader, onChangeIsCreateNewTable }) => {
    const [tables, setTables] = useState([])
    
    useEffect(() => {
        window.api.getTables()
            .then(data => setTables(data))
            .catch(err => console.log('[ERROR] ошибка получения таблиц', err.message))
    }, [])

    return(
        <div style={{ textAlign: 'center' }}>
            <h1>
                Список таблиц
            </h1>

            {tables.map((table, i) => (
                <TableItem key={i} table={table.table_name} />
            ))}

            <button 
                onClick={() => { 
                    onChangeHeader('Создание таблицы'); 
                    onChangeIsCreateNewTable(true) 
                }} 
                style={{ 
                    marginTop: '2%' 
                }}
            >Создать новую таблицу</button>
        </div>
    )
}

export default TablesList