import './App.css'
import { useState, useEffect } from 'react'
import TablesList from './components/tableList/tablesList'
import TablesEditor from './components/tableEditor/tablesEditor'

function App() {
    const [tableEditorHeader, setTableEditorHeader] = useState('Окно редактирования')
    const [isCreateNewTable, setIsCreateNewTable] = useState(false)
    const [isEditTable, setIsEditTable] = useState(false)
    const [pickedTable, setPickedTable] = useState(null)
    const [tableColumns, setTableColumns] = useState()

    console.log(pickedTable)

    useEffect(() => {
        if (!pickedTable) return;
        console.log('[INFO] pickedTabl.table_name', pickedTable.table_name)

        window.api.getDataFromTable(pickedTable.table_name)
            .then(data => {
                setTableColumns(data)
            })
            .catch(err => console.error('[ERROR] ошибка получения значений таблиц', err.message))
        }, [pickedTable])
    
    return (
        <div className='main'>
            <TablesList 
                onChangeHeader={setTableEditorHeader} 
                onChangeIsCreateNewTable={setIsCreateNewTable}
                setIsEditTable={setIsEditTable}
                setPickedTable={setPickedTable}
            />
            
            <TablesEditor
                setTableColumns={setTableColumns} 
                header={tableEditorHeader} 
                onChangeHeader={setTableEditorHeader} 
                isCreateNewTable={isCreateNewTable}
                setIsEditTable={setIsEditTable}
                isEditTable={isEditTable} 
                onChangeIsCreateNewTable={setIsCreateNewTable}
                pickedTable={pickedTable}
                tableColumns={tableColumns}
            />
        </div>
    )
}

export default App