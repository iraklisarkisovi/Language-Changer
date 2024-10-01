import { useRef } from "react"
import { useLanguage } from "./languageContext";

const Task = ({onFormSubmit, Task, Person}) => {
    const TaskRef = useRef()
    const PersonRef = useRef()

    const { language } = useLanguage();
 
    const translations = {
      en: {
        Languagetoggle3: 'Submit',
        placeholder: 'Task name',
        placeholder2: 'Your name'
      },
      ge: {
        Languagetoggle3: 'ინფორმაციის შეყვანა',
        placeholder: 'ტასკის სახელი',
        placeholder2: 'თქვენი სახელი'
        
      }
    };
  

    const onSubmit = (e) => {
        e.preventDefault()
        if(TaskRef.current && PersonRef.current) {
            onFormSubmit(TaskRef.current.value, PersonRef.current.value)
        }else{
            console.log('please fill all the information')
        }
        
    }

    return <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder={translations[language].placeholder2}
                ref={PersonRef}
                defaultValue={Person}
            />
            <input
                type="text"
                placeholder={translations[language].placeholder}
                ref={TaskRef}
                defaultValue={Task}
            />
            
            <button>{translations[language].Languagetoggle3}</button>
        </form>
}

export default Task