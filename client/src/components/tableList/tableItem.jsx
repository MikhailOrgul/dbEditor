import { toast } from "react-toastify"

const TableItem = (
    { 
        table, 
        setPickedTable, 
        header, 
        setIsEditTable, 
        setRefreshTableList,
    }) => {

    const handleClickDeleteTable = (table) => {
        window.api.deleteTable(table)
            .then()
            .catch(err => {
                console.error('[ERROR]', err.message)
                toast(`Ошибка\n${err.message}`)
            })
    }

    return (
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', border: '0.1em solid grey'}}>
            <li 
                style={{
                    marginLeft:'3%'
                }}
                onClick={() => { setIsEditTable(true), setPickedTable(table.table_name); header(`Изменение таблицы "${table.table_name}"`)} 
            }>{table.table_name}</li>
            <button 
                style={{ backgroundColor: 'black', color: 'red', alignSelf: 'stretch', marginRight: '3%', height: '3em'}}
                onClick={() => { 
                    handleClickDeleteTable(table.table_name)
                    setRefreshTableList(prev => !prev) 
                }}
            >X</button>
        </div>
    )
}

export default TableItem