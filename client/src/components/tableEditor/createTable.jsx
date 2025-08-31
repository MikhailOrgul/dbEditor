import { useState, useEffect } from "react"
import TableForCols from "./tableForCreating"

const CreateTableForm = (
    { 
        onChangeHeader, 
        onChangeIsCreateNewTable, 
        tableColumns, 
        setIsEditTable, 
        setTableColumns, 
        setPickedTable, 
        setRefreshTableList, 
        pickedTable, 
        rows, 
        setRows 
    }) => {
    
    const [tableName, setTableName] = useState('')

    useEffect(() => {
        if (tableColumns && tableColumns.length > 0) {
            setRows(tableColumns)
        }
    }, [tableColumns])

    const addRow = () => {
        const lastID = rows.length > 0 ? rows.at(-1).id+1 : 1
        console.log('[addRow]', lastID)
        setRows([...rows, { id: lastID }])
    }

    const deleteRow = (id) => {
        console.log('[deleteRow]', id)
        setRows(rows.filter(row => row.id != id))
    }

    const handleCancel =() => {
        setIsEditTable(false)
        onChangeIsCreateNewTable(false);
        onChangeHeader('Окно редактирования')
        setRows([])
        setTableColumns()
    }

    const handleSaveTable = () => {      
        window.api.getDataFromClientForm(tableName, rows)
            .then(() => {
                setRefreshTableList(prev => !prev)
                setPickedTable(null)
                onChangeIsCreateNewTable(false)
                setIsEditTable(false)
                onChangeHeader('Окно редактирования')        
            })
            .catch(err => console.error('[ERROR]', err.message))
    }

    return (
        <div style={{ paddingLeft: '2%', paddingRight: '3%', display: 'flex', flexDirection: "column" }}>
            <input 
                className="tableNameInput"
                placeholder="Имя таблицы" 
                value={pickedTable ? pickedTable.tableName : tableName}
                onChange={e => setTableName(e.target.value)}
                style={{ 
                    marginBottom: '1%',
                    textAlign: 'center',
            }}></input>

            <TableForCols 
                rows={rows} 
                onDelete={deleteRow}
                setRows={setRows}
            />

            <button 
                style={{ marginTop: '1vh' }} 
                onClick={addRow}
            >Добавить поле</button>

            <div 
                style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '1vh' }
                }>
                    <button 
                        style={{ width: '30%' }}
                        onClick={() => {handleSaveTable()}}
                    >Сохранить таблицу</button>

                    <button 
                        style={{ width: '30%' }}
                        onClick={handleCancel}
                    >Отмена</button>
            </div>
        </div>
    )
}

export default CreateTableForm