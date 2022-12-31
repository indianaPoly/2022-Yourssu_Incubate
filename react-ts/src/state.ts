import { atom } from 'recoil'

interface Todo {
  id: string
  item: string
  status: 'DONE' | 'NOT_DONE'
}

const initialTodoList: Todo[] = []

export const todoListState = atom({
  key: 'todoListState',
  default: initialTodoList,
})
