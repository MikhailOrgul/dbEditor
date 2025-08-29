import CreateTableRow from './rowForCreateTable'

const TableForCols = () => {
    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width:'100%' }}>
                <thead>
                    <tr>
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
                            Удалить
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <CreateTableRow />
                </tbody>
            </table>
        </div>
    )
}

export default TableForCols