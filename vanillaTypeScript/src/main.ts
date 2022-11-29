import './reset.css';
import './style.css';
import { worker } from './mocks/browser';

worker.start({ onUnhandledRequest: 'bypass' });

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <div class="wrapper">
      <h1 class="title">Yourssu Todo List</h1>
      <form class="toto-form">
        <input placeholder="Write Your tood.." />
        <button type="submit">Submit</button>
      </form>
      <ul class="item-list">
      </ul>
    </div>
  </main>
`;

type Body = {
  id?: number;
  item?: string;
  status?: string;
};
const url: string = 'todo';

const form = document.querySelector<HTMLFormElement>('.toto-form');
const input = document.querySelector<HTMLInputElement>('input');
const itemList = document.querySelector<HTMLUListElement>('.item-list');

form?.addEventListener('submit', submit);

async function submit(event: SubmitEvent): Promise<void> {
  if (input !== null) {
    const todos: string = input.value;
    const postBody: Body = {
      item: todos,
      status: 'NOT_DONE',
    };

    event.preventDefault();

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
          alert('값 넣기 성공');
        });
      fetchGet();
    } else {
      alert('값 입력하세요');
    }
  }
}

function list(todo: string) {
  const id = document.querySelectorAll('.item-list li').length + 1;
  const li = document.createElement('li');
  li.className = 'item';
  const label = document.createElement('label');
  label.setAttribute('for', id.toString());
  label.innerText = todo;
  const span = document.createElement('span');
  span.setAttribute('class', 'cancle');
  span.innerHTML = ' &times;';
  deleteEvent(span, li, id);
  const input = document.createElement('input');
  input.id = id.toString();
  input.type = 'checkbox';
  patchEvent(input, id);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(input);
  itemList?.append(li);
}

function deleteEvent(
  span: HTMLSpanElement,
  li: HTMLLIElement,
  id: number,
): void {
  if (span !== null)
    span.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      fetchDelete(li, id);
    });
}

async function fetchDelete(li: HTMLLIElement, id: number): Promise<void> {
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
      li?.remove();
      alert('삭제 성공');
    });
  fetchGet();
}

function fetchGet(): void {
  fetch(url, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.todos);
    });
}

function patchEvent(input: HTMLInputElement, id: number): void {
  if (input !== null)
    input.addEventListener('click', (e) => {
      e.preventDefault();
      fetchPatch(input, id);
    });
}

async function fetchPatch(input: HTMLInputElement, id: number): Promise<void> {
  const todos: string = input.value;
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
