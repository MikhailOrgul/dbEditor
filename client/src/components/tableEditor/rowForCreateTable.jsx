const CreateTableRow = ({ onDelete }) => {
    return(
        <tr>
            <td>
                <input type="text" />
            </td>
            <td>
                <select name="" id="">
                    <option>INTEGER</option>
                    <option>REAL</option>
                    <option>TEXT</option>
                    <option>DATE</option>
                </select>
            </td>
            <td>
                <input type="checkbox" name="isNotNull"/>
            </td>
            <td>
                <input type="checkbox" name="isUnique"/>
            </td>
            <td>
                <button onClick={onDelete} style={{color: 'red'}}>X</button>
            </td>
        </tr>
    )
}

export default CreateTableRow