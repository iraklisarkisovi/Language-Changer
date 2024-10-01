import React from 'react'
import './App.css';
import { useLanguage } from './languageContext';

function PageNotFound() {
    const { language } = useLanguage();

    const translations = {
        en: {
            paragraph: 'page not found :('
        },
        ge: {
            paragraph: 'გვრტდი ვრ მოძებნა :('
        }
    }

  return (
 
        <div className='errorNotif'>
            <h1>404</h1>
            <p>{translations[language].paragraph}</p>
        </div>
 
  )
}

export default PageNotFound
