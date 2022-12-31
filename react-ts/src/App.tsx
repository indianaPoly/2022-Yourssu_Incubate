import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './components/item'
import TodoForm from './components/todoForm'

const App = () => {
  interface Todo {
    id: string
    item: string
    status: 'DONE' | 'NOT_DONE'
  }
  interface ArrayItem {
    todos: Todo[]
  }
  const [todoList, setTodoList] = useState<ArrayItem>()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'todo',
    }).then((getAxiosTodoDataResponse) => {
      setTodoList(getAxiosTodoDataResponse.data)
      console.log(todoList)
    })
  }, [])

  return (
    <div className="w-full h-screen bg-gray-400">
      <div className="flex-col justify-center items-center flex w-full h-full">
        <h1 className="font-extrabold text-3xl mt-5">Yourssu Todo List</h1>
        <h3 className="font-extrabold text-3xl mt-5">
          할 일 {todoList && todoList.todos.length}개 남음
        </h3>
        <TodoForm />
        <ul className="flex-col justify-start items-center flex w-full h-full gap-2 mt-5">
          {todoList &&
            todoList.todos.map((a: Todo) => {
              return <Item {...a} />
            })}
        </ul>
      </div>
    </div>
  )
}

export default App
