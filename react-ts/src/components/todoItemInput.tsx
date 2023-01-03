import React from 'react'
import { patchAxiosTodoData } from '../api'

interface PropsTodoItemInput {
  id?: string
}

const TodoItemInput = ({ id }: PropsTodoItemInput): JSX.Element => {
  return (
    <input
      id={id}
      type="checkbox"
      onChange={(event) => {
        event.target.checked = true
        event.preventDefault()
        if (id !== undefined) patchAxiosTodoData(id)
      }}
    />
  )
}

export default TodoItemInput
