import "./reset.css";
import "./style.css";
import { worker } from "./mocks/browser";
import { response } from "msw";

worker.start({ onUnhandledRequest: "bypass" });

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
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

const form = document.querySelector<HTMLFormElement>(".toto-form");
const input = document.querySelector<HTMLInputElement>("input");
const itemList = document.querySelector<HTMLUListElement>(".item-list");

form?.addEventListener("submit", async (event) => {
  // body 설정
  const todos = input?.value;
  const postBody: Body = {
    item: todos,
    status: "NOT_DONE",
  };

  event.preventDefault();

  if (todos !== "") {
    await fetch("todo", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        list(todos);
        input!.value = "";
      });
    fetch("todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  } else {
    alert("값 입력하세요");
  }
});

function list(a: any) {
  // 리스트 그리기
  const id = document.querySelectorAll(".item-list li").length + 1;
  const li = document.createElement("li");
  li.className = "item";
  const label = document.createElement("label");
  label.setAttribute("for", id.toString());
  label.innerText = a;
  const span = document.createElement("span");
  span.setAttribute("class", "cancle");
  span.innerHTML = " &times;";
  const input = document.createElement("input");
  input.id = id.toString();
  input.type = "checkbox";
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(input);
  itemList?.append(li);

  // body 설정
  const todos = input?.value;
  const deleteBody: Body = {
    id: id,
  };
  const patchBody: Body = {
    id: id,
    item: todos,
    status: "DONE",
  };

  // 삭제버튼
  span.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("todo", {
      method: "DELETE",
      body: JSON.stringify(deleteBody),
    }).then((result) => {
      console.log(result);
      li.remove();
    });
    fetch("todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  });

  // check
  input.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("todo", {
      method: "PATCH",
      body: JSON.stringify(patchBody),
    })
      .then((response) => response.json())
      .then((result) => {
        input.checked = true;
        console.log(result);
      });
    fetch("todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  });
}
