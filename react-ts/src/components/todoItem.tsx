import React from 'react'
import { deleteAxiosTodoData } from '../api'
import TodoItemInput from './todoItemInput'

interface PropsTodoItem {
  id?: string
  item?: string
  status?: 'DONE' | 'NOT_DONE'
}

const TodoItem = ({ id, item, status }: PropsTodoItem): JSX.Element => {
  return (
    <li className="w-1/2 h-7 px-2 py-5 flex justify-between items-center bg-slate-200 rounded-2xl">
      <label htmlFor={id} className="font-semibold text-l">
        <button
          className="text-l"
          type="button"
          onClick={(event) => {
            event.preventDefault()
            if (id !== undefined) deleteAxiosTodoData(id)
          }}
        >
          🅇
        </button>{' '}
        {item}
      </label>
      {status === 'NOT_DONE' ? (
        <TodoItemInput id={id} />
      ) : (
        <input id={id} type="checkbox" checked />
      )}
    </li>
  )
}

export default TodoItem
