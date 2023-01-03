import axios from 'axios'
// import { useRecoilState } from 'recoil'
// import { todoListState } from './state'

const restUrl: string = 'todo'
// const [todoListData, setTodoListData] = useRecoilState(todoListState)

// const getAxiosTodoData = () => {
//   axios({
//     method: 'get',
//     url: restUrl,
//   }).then((getAxiosTodoDataResponse) => {
//     setTodoListData(getAxiosTodoDataResponse.data)
//     console.log(todoListData)
//   })
// }

export const postAxiosTodoData = async (itemData: string) => {
  const response = await axios({
    method: 'post',
    url: restUrl,
    data: {
      item: itemData,
    },
  })
  console.log(response.data)
}

export const deleteAxiosTodoData = async (id: string) => {
  const response = await axios({
    method: 'delete',
    url: restUrl,
    data: {
      id,
    },
  })
  console.log(response.data)
}

export const patchAxiosTodoData = async (id: string) => {
  const response = await axios({
    method: 'patch',
    url: restUrl,
    data: {
      id,
      status: 'DONE',
    },
  })
  console.log(response.data)
}
