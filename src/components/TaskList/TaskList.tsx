import styles from './taskList.module.scss'

interface TaskListProps {
    doneTaskList?: boolean
}

function TaskList(props: TaskListProps) {
    const { doneTaskList } = props

    return (
        <div className='mb-2'>
            <h2 className={styles.title}>{doneTaskList ? 'Done' : 'To do'}</h2>
            <div className={styles.tasks}>
                <div className={styles.task}>
                    <input className={styles.taskCheckbox} type='checkbox' />
                    <span className={styles.taskName}>Learn Reactjs</span>
                    <div className={styles.taskActions}>
                        <button className={styles.taskBtn}>🖊️</button>
                        <button className={styles.taskBtn}>🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList
