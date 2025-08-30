import CreateTableRow from './rowForCreateTable'

const TableForCols = ({ rows, onDelete, setRows }) => {
    const handleRowChange = (id, field, value) => {
        setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
    }
    
    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width:'100%' }}>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Имя поля
                        </th>
                        <th>
                            Тип данных
                        </th>
                        <th>
                            NOT NULL
                        </th>
                        <th>
                            UNIQUE
                        </th>
                        <th>
                            PK
                        </th>
                        <th>
                            Удалить
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <CreateTableRow row={row} key={row.id} onChange={handleRowChange} onDelete={() => onDelete(row.id) }/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableForCols