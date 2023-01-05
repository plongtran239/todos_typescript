import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
    doneTaskList?: boolean
    todos: Todo[]
    handleDoneTodo: (id: string, done: boolean) => void
    startEditTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

function TaskList(props: TaskListProps) {
    const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

    const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        handleDoneTodo(idTodo, event.target.checked)
    }

    return (
        <div className='mb-2'>
            <h2 className={styles.title}>{doneTaskList ? 'Done' : 'To do'}</h2>
            <div className={styles.tasks}>
                {todos.map((todo) => (
                    <div className={styles.task} key={todo.id}>
                        <input
                            className={styles.taskCheckbox}
                            type='checkbox'
                            checked={todo.done}
                            onChange={onChangeCheckbox(todo.id)}
                        />
                        <span className={`${styles.taskName} ${todo.done && styles.taskNameDone}`}>{todo.name}</span>
                        <div className={styles.taskActions}>
                            <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                                🖊️
                            </button>
                            <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList
