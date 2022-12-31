import React from 'react'
import { patchAxiosTodoData } from '../api'

interface PatchBody {
  id?: string
}

const ItemInput = ({ id }: PatchBody) => {
  return (
    <input
      id={id}
      type="checkbox"
      onChange={(event) => {
        event.target.checked = true
        event.preventDefault()
        if (id !== undefined) patchAxiosTodoData(id)
        // 처리하고 나서 이벤트 view 변경해야됩니다.
      }}
    />
  )
}

export default ItemInput
