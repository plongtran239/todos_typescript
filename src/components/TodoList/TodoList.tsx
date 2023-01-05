import { useState, useEffect } from 'react'

import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

type handleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: handleNewTodos) => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = handleNewTodos(todosObj)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

    const doneTodos = todos.filter((todo) => todo.done)
    const notDoneTodos = todos.filter((todo) => !todo.done)

    useEffect(() => {
        const todosString = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todosString || '[]')
        setTodos(todosObj)
    }, [])

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])
        syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
    }

    const hanleDoneTodo = (id: string, done: boolean) => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return { ...todo }
            })
        }
        setTodos(handler)
        syncReactToLocal(handler)
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
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === (currentTodo as Todo).id) {
                    return currentTodo as Todo
                }
                return todo
            })
        }
        setTodos(handler)
        setCurrentTodo(null)
        syncReactToLocal(handler)
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null)
        }
        const handler = (todosObj: Todo[]) => {
            const findedIndexTodo = todosObj.findIndex((todo) => todo.id === id)
            if (findedIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(findedIndexTodo, 1)
                return result
            }
            return todosObj
        }
        setTodos(handler)
        syncReactToLocal(handler)
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
