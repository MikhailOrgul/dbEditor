import TableForCols from "./tableForCreating"

const CreateTableForm = () => {
    
    
    return (
        <div style={{  display: 'flex', flexDirection: "column" }}>
            <input placeholder="Имя таблицы"></input>
            <TableForCols />
            <button style={{ marginTop: '1vh' }}>Добавить поле</button>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '1vh' }}>
                <button style={{ width: '30%' }}>Сохранить таблицу</button>
                <button style={{ width: '30%' }}>Отмена</button>
            </div>
        </div>
    )
}

export default CreateTableForm