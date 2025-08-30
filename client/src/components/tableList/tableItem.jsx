const TableItem = ({ table, setPickedTable, header, setIsEditTable }) => {
    return (
        <li onClick={() => { setIsEditTable(true), setPickedTable({...table}); header(`Изменение таблицы ${table.table_name}`) }}>{table.table_name}</li>
    )
}

export default TableItem