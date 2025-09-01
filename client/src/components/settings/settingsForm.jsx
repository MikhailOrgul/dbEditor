import { useState } from "react"
import { toast } from 'react-toastify'

const SettingsForm = ({ setIsSettingsFormOpen, setIsSettingsButtonVisible }) => {
    const [ settings, setSettings ] = useState({DB_NAME: '', DB_PASSWORD: '', DB_LOGIN: '', DB_PORT: '', DB_HOST: ''})

    const handleSaveSettingsButton = () => {
        window.api.updateENV(settings)
            .then(() => {
                setIsSettingsFormOpen(prev => !prev)
                setIsSettingsButtonVisible(prev => !prev)
            })
            .catch(err => {
                console.log(err.message)
                toast(`Ошибка\n${err.message}`)
            })
    }

    const handleOnChange = (field, value) => {
        setSettings(prev => ({...prev, [field]: value}))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '3%', border: '0.1em solid white' }}>
            <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '5%'}}>
                <label htmlFor="dbName" style={{ marginLeft: '10%' }}>Имя БД</label>
                <input 
                    id="dbName" 
                    style={{ marginRight: '10%' }}
                    onChange={e => handleOnChange('DB_NAME', e.target.value)}
                ></input>
            </div>
            <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <label htmlFor="dbPassword" style={{ marginLeft: '10%' }}>Пароль БД</label>
                <input 
                    id="dbPassword" 
                    style={{ marginRight: '10%' }}
                    onChange={e => handleOnChange('DB_PASSWORD', e.target.value)}
                ></input>
            </div>
            <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <label htmlFor="dbLogin" style={{ marginLeft: '10%' }}>Логин БД</label>
                <input 
                    id="dbLogin" 
                    style={{ marginRight: '10%' }}
                    onChange={e => handleOnChange('DB_LOGIN', e.target.value)}
                ></input>
            </div>
            <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <label htmlFor="dbPort" style={{ marginLeft: '10%' }}>Порт БД</label>
                <input 
                    id="dbPort" 
                    style={{ marginRight: '10%' }}
                    onChange={e => handleOnChange('DB_PORT', e.target.value)}
                ></input>
            </div>
            <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <label htmlFor="dbHost" style={{ marginLeft: '10%' }}>Хост БД</label>
                <input 
                    id="dbHost" 
                    style={{ marginRight: '10%' }}
                    onChange={e => handleOnChange('DB_HOST', e.target.value)}
                ></input>
            </div>
            <button 
                style={{ marginTop: '3%', marginRight: '10%', marginLeft: '10%' }}
                onClick={handleSaveSettingsButton}
            >
                Сохранить
            </button>
            <button
                style={{ marginTop: '3%', marginRight: '10%', marginLeft: '10%', marginBottom: '5%' }}
                onClick={() => {setIsSettingsFormOpen(prev => !prev); setIsSettingsButtonVisible(prev => !prev)}}
            >
                Отмена
            </button>
        </div>
    )
}

export default SettingsForm