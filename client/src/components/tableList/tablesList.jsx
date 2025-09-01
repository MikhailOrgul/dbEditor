import TableItem from '../tableList/tableItem'
import { useState, useEffect } from 'react'
import SettingsButton from '../settings/settingsButton'

const TablesList = (
    { 
        onChangeHeader, 
        onChangeIsCreateNewTable, 
        setPickedTable, 
        setIsEditTable, 
        refreshTableList, 
        setRefreshTableList,
        setRows
        
    }) => {

    const [tables, setTables] = useState([])
    
    useEffect(() => {
        window.api.getTables()
            .then(data => { setTables(data) })
            .catch(err => {
                console.log('[ERROR] ошибка получения таблиц', err.message)
                toast(`Ошибка в получении столбцов таблицы, ${err.message}`)
            })
    }, [refreshTableList])

    return(
        <div style={{ textAlign: 'center', width: '20%' }}>
            <h1>
                Список таблиц
            </h1>   

            {tables.map((table, i) => (
                <TableItem 
                    key={i} 
                    table={table} 
                    setPickedTable={setPickedTable} 
                    header={onChangeHeader} 
                    setIsEditTable={setIsEditTable} 
                    setRefreshTableList={setRefreshTableList}
                />
            ))}

            <button 
                onClick={() => { 
                    onChangeHeader('Создание таблицы'); 
                    onChangeIsCreateNewTable(true) 
                    setPickedTable(null)
                    setRows([])
                }} 
                style={{ 
                    marginTop: '2%' 
                }}
            >Создать новую таблицу</button>
            <SettingsButton />
        </div>
    )
}

export default TablesList