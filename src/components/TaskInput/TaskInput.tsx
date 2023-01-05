import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

import styles from './taskInput.module.scss'

interface TaskInputProps {
    currentTodo: Todo | null
    addTodo: (name: string) => void
    editTodo: (name: string) => void
    endEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
    const { addTodo, currentTodo, editTodo, endEditTodo } = props

    const [name, setName] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentTodo) {
            endEditTodo()
            if (name) setName('')
        } else {
            addTodo(name)
            setName('')
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (currentTodo) {
            editTodo(value)
        } else {
            setName(value)
        }
    }

    return (
        <div className='mb-2'>
            <h1 className={styles.title}>TODOS</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Write your todo...'
                    value={currentTodo ? currentTodo.name : name}
                    onChange={onChangeInput}
                />
                <button type='submit'>
                    {currentTodo ? <CheckIcon fontSize='large' /> : <AddIcon fontSize='large' />}
                </button>
            </form>
        </div>
    )
}

TaskInput.propTypes = {
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    endEditTodo: PropTypes.func.isRequired
}

export default TaskInput
