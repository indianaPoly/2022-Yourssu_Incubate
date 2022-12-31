# **<React + TypeScript> todoList**

## **사용 라이브러리**

- 스타일 라이브러리: `tailwindCSS`
- 통신 라이브러리: `axios`
- 전역 상태 라이브러리: `recoil`

---

## **파일구조**

```bash
├── component
│   ├── item.tsx
│   ├── itemInput.tsx
│   └── todoForm.tsx
├── state.ts
├── api.ts
└── app.tsx
```

---

## **컴포넌트 설계기준 및 상태 로직**

### **app.tsx**

- todolist 화면 디자인
- useEffect를 통해 렌더링시 get을 통한 데이터 가져오기 및 화면에 그리기

### **state.ts**

- Recoil을 통해 todoList 저장가능하도록 작성

### **api.ts**

- 서버와 통신하는 함수 작성 (post, delete, patch)

### **Component**

_TodoForm_

- 서버에 값을 보내기에 컴포넌트로 나눠 제작
- input의 onChange속성으로 실시간으로 변경되는 value 값을 state에 저장
- submit을 하여 state의 값을 postAxiosTodoData 함수를 통해 서버로 전송
- submit 실행 후 입력창 reset

_Item_

- 데이터에 따라 만들어지고 삭제되기 때문에 컴포넌트로 나눠 제작
- id, item, stauts를 props로 받아와 데이터를 화면에 그림
- id값을 props로 받아 deleteAxiosTodoData 함수의 인자로 넘김
- status 값에 따라 ItemInput check 여부를 화면에 그림

_ItemInput_

- 서버의 값을 수정하기에 컴포넌트로 나눠 제작
- id값을 props로 받아 patchAxiosTodoData 함수의 인자로 넘김

---

## **체크리스트**

_컴포넌트_

- [O] 컴포넌트 단위로 개발을 해봅시다.
- [ ] 서버요청시 `로딩`, `성공`에 따른 UI/UX를 구현 해봅시다.
- [O] 필수 - 컴포넌트 설계 하실 때 / 상태 로직을 작성을 하실 때 나름의 기준을 만들어 봐요:)

_인풋_

- [O] 입력창 에 입력을 하면, `[POST] /todo` 요청과 함께 투두 리스트에 보여줍니다.
- [O] 입력창 에 입력이 성공하면, 입력창의 내용을 지워 줍니다.

_투두 리스트_

- [O] 매 서버요청 마다, `[GET] /todo` 요청과 함께 투두 리스트를 불러 옵니다.

_아이템_

- [O] `x` 표시를 누르면 `[DELETE] /todo` 요청과 함께 아이템을 삭제 합니다.
- [O] checkbox 를 클릭 하면 그에 따른 상태 변화를 `[PATCH] /todo` 를 통해 수정 해줍니다.

---

## **API**

_[GET] /todo_

- **응답 예시**

```jsx
{
  todos: [
    {
      id: '1234-4567',
      item: 'TODO1',
      status: 'DONE',
    },
  ]
}
```

_[POST] /todo_

- **파라미터**

```jsx
Body: {
	item: string,
	stauts: "DONE" | "NOT_DONE"
}
```

- **응답 예시**

```jsx
{
  message: '성공'
}
```

_[DELETE] /todo_

- **파라미터**

```jsx
Body: {
  id: number
}
```

- **응답 예시**

```jsx
{
  message: '성공'
}
```

_[PATCH] /todo_

- **파라미터**

```jsx
Body: {
	id: string,
	item: string | null,
	stauts: "DONE" | "NOT_DONE"
}
```

- **응답 예시**

```jsx
{
  message: '성공'
}
```
