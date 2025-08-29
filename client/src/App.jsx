import './App.css'
import { useState, useEffect } from 'react'
import TablesList from './components/tableList/tablesList'
import TablesEditor from './components/tableEditor/tablesEditor'

function App() {
    const [tableEditorHeader, setTableEditorHeader] = useState('')
    return (
        <div className='main'>
            <TablesList onChangeHeader={setTableEditorHeader}/>
            <TablesEditor header={tableEditorHeader}/>
        </div>
    )
}

export default App
