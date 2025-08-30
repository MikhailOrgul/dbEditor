import CreateTableForm from "./createTable"

const TablesEditor = (
    {
        header, 
        onChangeHeader, 
        isCreateNewTable, 
        onChangeIsCreateNewTable,
        setPickedTable,
        tableColumns,
        isEditTable, 
        setIsEditTable,
        setTableColumns,
    
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
                    setPickedTable={setPickedTable}
                    setTableColumns={setTableColumns} 
                    setIsEditTable={setIsEditTable}
                    onChangeHeader={onChangeHeader} 
                    onChangeIsCreateNewTable={onChangeIsCreateNewTable} 
                    tableColumns={tableColumns} 
                />
            }
        </div>
    )
}

export default TablesEditor