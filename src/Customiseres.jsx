import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from './languageContext';

function Customiseres() {
  const { language } = useLanguage();

  const translations = {
      en: {
          paragraph: 'You will be able to redact your task here in the future updates!',
          back: 'Back'
      },
      ge: {
          paragraph: 'თქვენ მოახერხებთ ცვლილებების შეტანას მომავალ განახლებაში!',
          back: 'უკან დაბრუნება'
      }
  }

  return (
    <div>   
      <h1>{translations[language].paragraph}</h1>
      <Link to={"/"}>{translations[language].back}</Link>
    </div>
  )
}

export default Customiseres
