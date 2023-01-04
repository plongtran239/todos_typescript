import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

function TodoList() {
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput />
                <TaskList />
                <TaskList doneTaskList />
            </div>
        </div>
    )
}

export default TodoList
