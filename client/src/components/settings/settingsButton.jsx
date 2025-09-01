import { useState } from 'react'
import SettingsForm from './settingsForm'

const SettingsButton = () => {
    const [ isSettingsFormOpen, setIsSettingsFormOpen ] = useState(false) 
    const [ isSettingsButtonVisible, setIsSettingsButtonVisible] = useState(true)

    return (
        <div>
            {isSettingsFormOpen && <SettingsForm setIsSettingsFormOpen={setIsSettingsFormOpen} setIsSettingsButtonVisible={setIsSettingsButtonVisible}/>}
            {isSettingsButtonVisible && <button 
                style={{ marginTop:'3%' }}
                onClick={() => { setIsSettingsFormOpen(prev => !prev); setIsSettingsButtonVisible(prev => !prev)}}
            >
                Настройки
            </button>}
        </div>
    )
}

export default SettingsButton