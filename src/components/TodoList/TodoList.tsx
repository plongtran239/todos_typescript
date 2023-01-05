import { useState } from 'react'

import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

    const doneTodos = todos.filter((todo) => todo.done)
    const notDoneTodos = todos.filter((todo) => !todo.done)

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])
    }

    const hanleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return { ...todo }
            })
        })
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id)
        if (findedTodo) {
            setCurrentTodo(findedTodo)
        }
    }

    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) {
                return { ...prev, name }
            } else {
                return null
            }
        })
    }

    const endEditTodo = () => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === (currentTodo as Todo).id) {
                    return currentTodo as Todo
                }
                return todo
            })
        })
        setCurrentTodo(null)
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null)
        }
        setTodos((prev) => {
            const findedIndexTodo = prev.findIndex((todo) => todo.id === id)
            if (findedIndexTodo > -1) {
                const result = [...prev]
                result.splice(findedIndexTodo, 1)
                return result
            }
            return prev
        })
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} endEditTodo={endEditTodo} />
                <TaskList
                    todos={notDoneTodos}
                    handleDoneTodo={hanleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    doneTaskList
                    todos={doneTodos}
                    handleDoneTodo={hanleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    )
}

export default TodoList
