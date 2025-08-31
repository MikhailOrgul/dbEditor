import CreateTableForm from "./createTable"

const TablesEditor = (
    {
        header, 
        onChangeHeader, 
        isCreateNewTable, 
        onChangeIsCreateNewTable,
        setPickedTable,
        tableColumns,
        pickedTable,
        isEditTable, 
        setIsEditTable,
        setTableColumns,
        setRefreshTableList,
        rows,
        setRows
    
    }) => {
    
    return(
        <div 
            style={{ 
                width: '70%', 
                textAlign: 'center', 
                border: '2px solid white',
                overflow: 'auto'
            }}
        >
            <h1 style={{}}>
                {header}
            </h1>
            { (isCreateNewTable || isEditTable) &&  
                <CreateTableForm
                    setRows={setRows}
                    rows={rows}
                    setRefreshTableList={setRefreshTableList}
                    setPickedTable={setPickedTable}
                    setTableColumns={setTableColumns} 
                    setIsEditTable={setIsEditTable}
                    pickedTable={pickedTable}
                    onChangeHeader={onChangeHeader} 
                    onChangeIsCreateNewTable={onChangeIsCreateNewTable} 
                    tableColumns={tableColumns} 
                />
            }
        </div>
    )
}

export default TablesEditor