import './App.css'
import { useState, useEffect } from 'react'
import TablesList from './components/tableList/tablesList'
import TablesEditor from './components/tableEditor/tablesEditor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [tableEditorHeader, setTableEditorHeader] = useState('Окно редактирования')
    const [isCreateNewTable, setIsCreateNewTable] = useState(false)
    const [isEditTable, setIsEditTable] = useState(false)
    const [pickedTable, setPickedTable] = useState(null)
    const [tableColumns, setTableColumns] = useState()
    const [refreshTableList, setRefreshTableList] = useState(false)
    const [rows, setRows] = useState([{ id: 1, column_name: "", data_type: "", is_nullable: false, primary_key: false, unique: false}])

    useEffect(() => {
        if (!pickedTable) return;

        window.api.getDataFromTable(pickedTable)
            .then(data => {
                setTableColumns(data)
            })
            .catch(err => {
                console.error('[ERROR] ошибка получения значений таблиц', err.message)
                toast(`Ошибка в получении столбцов таблицы, ${err.message}`)
            })
    }, [pickedTable])
    
    return (
        <div className='main'>
            <TablesList 
                setRows={setRows}
                refreshTableList={refreshTableList}
                onChangeHeader={setTableEditorHeader} 
                onChangeIsCreateNewTable={setIsCreateNewTable}
                setIsEditTable={setIsEditTable}
                setPickedTable={setPickedTable}
                setRefreshTableList={setRefreshTableList}
            />
            
            <TablesEditor
                setRows={setRows}
                rows={rows}
                setRefreshTableList={setRefreshTableList} 
                setPickedTable={setPickedTable}
                pickedTable={pickedTable}
                setTableColumns={setTableColumns} 
                header={tableEditorHeader} 
                onChangeHeader={setTableEditorHeader} 
                isCreateNewTable={isCreateNewTable}
                setIsEditTable={setIsEditTable}
                isEditTable={isEditTable} 
                onChangeIsCreateNewTable={setIsCreateNewTable}
                tableColumns={tableColumns}
            />
            <ToastContainer />
        </div>
    )
}

export default App