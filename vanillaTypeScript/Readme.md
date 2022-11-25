# 과제2 투두리스트 만들기 (w. 바닐라 타입스크립트)

## 체크리스트

### 인풋

- [O] 입력창 에 입력을 하면, `[POST] /todo` 요청과 함께 투두 리스트에 보여줍니다.
- [O] 입력창 에 입력이 성공하면, 입력창의 내용을 지워 줍니다.

### 투두 리스트

- [O] 페이지가 로드 되면, `[GET] /todo` 요청과 함께 투두 리스트를 불러 옵니다.

### 아이템

- [ ] `x` 표시를 누르면 `[DELETE] /todo` 요청과 함께 아이템을 삭제 합니다.
- [ ] checkbox 를 클릭 하면 그에 따른 상태 변화를 `[PATCH] /todo` 를 통해 수정 해줍니다.

### 공통

- [ ] 모든 서버 요청 이후에는, 화면에 반영을 해줘야 합니다.

---

## API

### [GET] /todo

- **응답 예시**

```ts
{
  todos: [
    {
      id: 0,
      item: "TODO1",
      status: "DONE",
    },
  ];
}
```

### [POST] /todo

- **파라미터**

```ts
- Body: {
    item: string,
    stauts: "DONE" | "NOT_DONE"
}
```

- **응답 예시**

```ts
{
  message: "성공";
}
```

### [DELETE] /todo

- **파라미터**

```ts
- Body: {
    id: number
}
```

- **응답 예시**

```ts
{
  message: "성공";
}
```

### [PATCH] /todo

- **파라미터**

```ts
- Body: {
    id: number,
    item: string | null,
    stauts: "DONE" | "NOT_DONE"
}
```

- **응답 예시**

```ts
{
  message: "성공";
}
```
