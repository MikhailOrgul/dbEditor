import CreateTableForm from "./createTable"

const TablesEditor = ({ header }) => {
    return(
        <div style={{ width: '70%', textAlign: 'center' }}>
            <h1 style={{}}>
                {header}
            </h1>
            <CreateTableForm />
        </div>
    )
}

export default TablesEditor