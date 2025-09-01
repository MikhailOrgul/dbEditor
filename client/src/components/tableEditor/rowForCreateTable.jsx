import { useEffect } from "react";

const CreateTableRow = ({ onDelete, row, onChange }) => {
    const handleInputChange = (field, value) => {
        onChange(row.id, field, value);
    }

    useEffect(() => {
        if (!row.data_type) {
            handleInputChange("data_type", "integer");
        }
    }, [row.data_type]);
    
    return(
        <tr>
            <td>
                <label>{row.id}</label>
            </td>
            <td>
                <input 
                    type='text' 
                    value={row.column_name === 'undefined' ? '' : row.column_name}
                    onChange={e => handleInputChange("column_name", e.target.value)}
                />
            </td>
            <td>
                <select 
                    value={row.data_type  ?? "integer"}
                    onChange={e => handleInputChange("data_type", e.target.value)}
                >
                    <option value="integer">INTEGER</option>
                    <option value="real">REAL</option>
                    <option value="character varying">VARCHAR</option>
                    <option value="date">DATE</option>
                </select>
            </td>
            <td>
                <input 
                    type="checkbox" 
                    checked={row.is_nullable ?? false}
                    onChange={e => handleInputChange("is_nullable", e.target.checked)}
                />
            </td>
            <td>
                <input 
                    type="checkbox" 
                    checked={row.unique  ?? false}
                    onChange={e => handleInputChange("unique", e.target.checked)}
                />
            </td>
            <td>
                <input 
                    type="checkbox" 
                    checked={row.primary_key ?? false}
                    onChange={e => handleInputChange("primary_key", e.target.checked)}
                />
            </td>
            <td>
                <button onClick={onDelete} style={{color: 'red'}}>X</button>
            </td>
        </tr>
    )
}

export default CreateTableRow