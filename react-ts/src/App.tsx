import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoItem from './components/todoItem'
import TodoForm from './components/todoForm'

interface Item {
  id: string
  item: string
  status: 'DONE' | 'NOT_DONE'
}
interface Items {
  todos: Item[]
}

const App = () => {
  const [itemList, setItemList] = useState<Items>()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'todo',
    }).then((getAxiosTodoDataResponse) => {
      setItemList(getAxiosTodoDataResponse.data)
    })
  }, [])

  return (
    <div className="w-full h-screen bg-gray-400">
      <div className="flex-col justify-center items-center flex w-full h-full">
        <h1 className="font-extrabold text-3xl mt-5">Yourssu Todo List</h1>
        <h3 className="font-extrabold text-3xl mt-5">
          할 일 {itemList && itemList.todos.length}개 남음
        </h3>
        <TodoForm />
        <ul className="flex-col justify-start items-center flex w-full h-full gap-2 mt-5">
          {itemList &&
            itemList.todos.map((todo: Item) => {
              return <TodoItem {...todo} />
            })}
        </ul>
      </div>
    </div>
  )
}

export default App
