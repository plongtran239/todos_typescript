import styles from './taskInput.module.scss'
import AddIcon from '@mui/icons-material/Add'

function TaskInput() {
    return (
        <div className='mb-2'>
            <h1 className={styles.title}>TODOS</h1>
            <form className={styles.form}>
                <input type='text' placeholder='Write your todo...' />
                <button type='submit'>
                    <AddIcon fontSize='large' />
                </button>
            </form>
        </div>
    )
}

export default TaskInput
