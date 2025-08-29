import { useState } from "react"
import TableForCols from "./tableForCreating"

const CreateTableForm = ({ onChangeHeader, onChangeIsCreateNewTable }) => {
    const [rows, setRows] = useState([{ id: 1 }])

    const addRow = () => {
        const lastID = rows.length > 0 ? rows.at(-1).id+1 : 1
        console.log(lastID)
        setRows([...rows, { id: lastID }])
    }

    const deleteRow = (id) => {
        console.log('[deleteRow]', id)
        setRows(rows.filter(row => row.id != id))
    }

    return (
        <div style={{ paddingLeft: '2%', paddingRight: '3%', display: 'flex', flexDirection: "column" }}>
            <input 
                placeholder="Имя таблицы" 
                style={{ 
                    marginBottom: '1%',
                    textAlign: 'center',
            }}></input>

            <TableForCols 
                rows={rows} 
                onDelete={deleteRow}
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
                    >Сохранить таблицу</button>

                    <button 
                        style={{ width: '30%' }}
                        onClick={() => { 
                            onChangeIsCreateNewTable(false);
                            onChangeHeader('Окно редактирования')
                        }}
                    >Отмена</button>
            </div>
        </div>
    )
}

export default CreateTableForm