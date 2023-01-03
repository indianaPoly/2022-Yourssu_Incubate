import React, { useState } from 'react'
import { postAxiosTodoData } from '../api'

const TodoForm = (): JSX.Element => {
  const [text, setText] = useState('')
  return (
    <form
      className="mt-5"
      onSubmit={(event) => {
        event.preventDefault()
        postAxiosTodoData(text)
      }}
    >
      <input
        id="todoFormInput"
        className="border border-grey-300 rounded-md h-10"
        placeholder="입력하세요."
        onChange={(event) => {
          setText(event.target.value)
        }}
      />
      <button
        type="submit"
        className="bg-slate-200 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded h-10"
      >
        추가하기
      </button>
    </form>
  )
}

export default TodoForm
