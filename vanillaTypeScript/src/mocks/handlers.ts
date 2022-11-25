import { rest } from 'msw'

type Todo = {
    id: number
    item: string
    status: "DONE" | "NOT_DONE"
}

type Db = {
    TODOS: Todo[]
}

const DB: Db = {
    TODOS : []
}

export const handlers = [

    rest.get('/todo', async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ todos: DB.TODOS }))
    }), 

    rest.post('/todo', async (req, res, ctx) => {
      const todo = await req.json<Todo>()

      if (todo.item && todo.status) {
        DB.TODOS.push({ ...todo, id: DB.TODOS.length + 1 })
        return res(ctx.status(200), ctx.json({ message: "성공" }))
      }

      return res(ctx.status(400) ,ctx.json({ message: "잘못된 요청" }))
    }),
 
    rest.delete('/todo', async (req, res, ctx) => {
      const { id } = await req.json<{ id: number }>()

      if (id) {
        DB.TODOS = DB.TODOS.filter(todo => todo.id !== id)
        return res(ctx.status(200), ctx.json({ message: "성공" }))
      }

      return res(ctx.status(400) ,ctx.json({ message: "잘못된 요청" }))
    }),

    rest.patch('/todo', async (req, res, ctx) => {
      const todo = await req.json<Todo>()

      if (todo.id) {
        const index = DB.TODOS.findIndex(t => t.id === todo.id)
        if (index > -1) {
            DB.TODOS[index] = { ...DB.TODOS[index], ...todo }
            return res(ctx.status(200), ctx.json({ message: "성공" }))
        }
        return res(ctx.status(400), ctx.json({ message: "잘못된 id" }))
      }

      return res(ctx.status(400) ,ctx.json({ message: "잘못된 요청" }))
    })

]