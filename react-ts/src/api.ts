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
  await axios({
    method: 'post',
    url: restUrl,
    data: {
      item: itemData,
    },
  }).then((postAxiosTodoDataResponse) => {
    console.log(postAxiosTodoDataResponse.data)
  })
  // .then(getAxiosTodoData)
}

export const deleteAxiosTodoData = async (id: string) => {
  axios({
    method: 'delete',
    url: restUrl,
    data: {
      id,
    },
  }).then((deleteAxiosTodoDataResponse) => {
    console.log(deleteAxiosTodoDataResponse.data)
  })
  // .then(getAxiosTodoData)
}

export const patchAxiosTodoData = async (id: string) => {
  axios({
    method: 'patch',
    url: restUrl,
    data: {
      id,
      status: 'DONE',
    },
  }).then((patchAxiosTodoDataResponse) => {
    console.log(patchAxiosTodoDataResponse.data)
  })
  // .then(getAxiosTodoData)
}
