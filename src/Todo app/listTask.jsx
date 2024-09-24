import { useRef } from "react"

const Task = ({onFormSubmit, Task}) => {
    const TaskRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        if(TaskRef.current) {
            onFormSubmit(TaskRef.current.value)
        }else{
            console.log('please fill all the information')
        }
        
    }

    return <form onSubmit={onSubmit}>
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