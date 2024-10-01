import React, { useState } from 'react'
import { useLanguage } from './languageContext'

const Header = () => {
    const { language, toggleLanguage } = useLanguage();

    const translations = {
        en: {
            Languagetoggle: 'Switch language',
        },
        ge: { 
            Languagetoggle: 'ენის შეცვლა',
        }
    }

    return (
        <header>
            <button onClick={toggleLanguage}>{translations[language].Languagetoggle}</button>
        </header>
    )
}

export default Header
