import { list } from './main';

/**
 * @유의할점
 * optional로 타입을 지정하게 되는 경우 빈값이나 undefinded 값이 넘어갈 수 있다
 * 서버에서 받는 값이 빈값에 대해 처리를 해줘야 오류가 나지 않는다.
 */
type Body = {
  id?: number;
  item?: string;
  status?: string;
};
const url: string = 'todo';

function fetchGet(): void {
  fetch(url, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}

export async function fetchDelete(
  li: HTMLLIElement,
  id: number,
): Promise<void> {
  const deleteBody: Body = {
    id: id,
  };

  await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(deleteBody),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (li !== null) li.remove();
    });
  fetchGet();
}

export async function fetchPost(input: HTMLInputElement) {
  const todos = input.value;
  const postBody: Body = {
    item: todos,
    status: 'NOT_DONE',
  };

  if (todos !== '') {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        list(todos);
        if (input.value !== null) input.value = '';
      });
    fetchGet();
  } else {
    alert('값을 입력하세요');
  }
}

export async function fetchPatch(
  input: HTMLInputElement,
  id: number,
): Promise<void> {
  const todos = input.value;
  const patchBody: Body = {
    id: id,
    item: todos,
    status: 'DONE',
  };

  await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(patchBody),
  })
    .then((res) => res.json())
    .then((result) => {
      if (input !== null) input.checked = true;
      console.log(result);
    });

  fetchGet();
}
