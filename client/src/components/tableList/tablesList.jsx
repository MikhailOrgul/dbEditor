import TableItem from '../tableList/tableItem'
import { useState, useEffect } from 'react'

const TablesList = ({ onChangeHeader, onChangeIsCreateNewTable, setPickedTable, setIsEditTable, refreshTableList }) => {
    const [tables, setTables] = useState([])
    
    useEffect(() => {
        window.api.getTables()
            .then(data => setTables(data))
            .catch(err => console.log('[ERROR] ошибка получения таблиц', err.message))
    }, [refreshTableList])

    return(
        <div style={{ textAlign: 'center', width: '20%' }}>
            <h1>
                Список таблиц
            </h1>   

            {tables.map((table, i) => (
                <TableItem key={i} table={table} setPickedTable={setPickedTable} header={onChangeHeader} setIsEditTable={setIsEditTable}/>
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