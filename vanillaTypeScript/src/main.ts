import './reset.css';
import './style.css';
import { worker } from './mocks/browser';
import { fetchDelete, fetchPatch, fetchPost } from './api';

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

const form = document.querySelector<HTMLFormElement>('.toto-form');
const input = document.querySelector<HTMLInputElement>('input');
const itemList = document.querySelector<HTMLUListElement>('.item-list');

form?.addEventListener('submit', submitEvent);

async function submitEvent(event: SubmitEvent): Promise<void> {
  if (input !== null) {
    event.preventDefault();
    fetchPost(input);
  }
}

export function list(todo: string) {
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

function patchEvent(input: HTMLInputElement, id: number): void {
  if (input !== null)
    input.addEventListener('click', (e) => {
      e.preventDefault();
      fetchPatch(input, id);
    });
}
