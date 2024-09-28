import { useRef } from "react"

const Task = ({onFormSubmit, Task, Person}) => {
    const TaskRef = useRef()
    const PersonRef = useRef()

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
                placeholder="person name"
                ref={PersonRef}
                defaultValue={Person}
            />
            <input
                type="text"
                placeholder="task"
                ref={TaskRef}
                defaultValue={Task}
            />
            
            <button>Submit</button>
        </form>
}

export default Task