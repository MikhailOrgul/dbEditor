import CreateTableForm from "./createTable"

const TablesEditor = ({ header, onChangeHeader, isCreateNewTable, onChangeIsCreateNewTable }) => {
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
            { isCreateNewTable && <CreateTableForm onChangeHeader={onChangeHeader} onChangeIsCreateNewTable={onChangeIsCreateNewTable}/>}
        </div>
    )
}

export default TablesEditor