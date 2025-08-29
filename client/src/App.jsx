import './App.css'
import { useState, useEffect } from 'react'
import TablesList from './components/tableList/tablesList'
import TablesEditor from './components/tableEditor/tablesEditor'

function App() {
    const [tableEditorHeader, setTableEditorHeader] = useState('Окно редактирования')
    const [isCreateNewTable, setIsCreateNewTable] = useState(false)

    return (
        <div className='main'>
            <TablesList onChangeHeader={setTableEditorHeader} onChangeIsCreateNewTable={setIsCreateNewTable}/>
            <TablesEditor header={tableEditorHeader} onChangeHeader={setTableEditorHeader} isCreateNewTable={isCreateNewTable} onChangeIsCreateNewTable={setIsCreateNewTable}/>
        </div>
    )
}

export default App